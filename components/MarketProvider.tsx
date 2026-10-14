"use client";

// Picks the shopper's country (detected by Cloudflare, or chosen by her) and loads prices in that
// country's currency from Shopify. Only countries enabled in Shopify Markets are offered; until more
// are enabled, everything stays in the store's default market and the baked-in prices are shown.
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { API_VERSION, storeDomain, storefrontToken, isLive, type Money } from "@/lib/shopify";

export const DEFAULT_COUNTRY = "AE";
const KEY = "lamsa-country";

export type Country = { isoCode: string; currency: string };
type LivePrice = { price: Money; compareAtPrice: Money | null };

type Ctx = {
  country: string;
  countries: Country[];
  setCountry: (iso: string) => void;
  prices: Record<string, LivePrice> | null;
};

const MarketContext = createContext<Ctx>({ country: DEFAULT_COUNTRY, countries: [], setCountry: () => {}, prices: null });

async function storefront<T>(query: string): Promise<T> {
  const res = await fetch(`https://${storeDomain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": storefrontToken },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}

async function detectCountry(): Promise<string | null> {
  try {
    const text = await (await fetch("/cdn-cgi/trace")).text();
    return /^loc=([A-Z]{2})$/m.exec(text)?.[1] ?? null;
  } catch {
    return null;
  }
}

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountryState] = useState(DEFAULT_COUNTRY);
  const [countries, setCountries] = useState<Country[]>([]);
  const [prices, setPrices] = useState<Record<string, LivePrice> | null>(null);

  // Work out which countries Shopify sells to, then which one this shopper is in.
  useEffect(() => {
    if (!isLive) return;
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch {}
    Promise.all([
      storefront<{ localization: { availableCountries: { isoCode: string; currency: { isoCode: string } }[] } }>(
        `{ localization { availableCountries { isoCode currency { isoCode } } } }`
      ),
      saved ? Promise.resolve(saved) : detectCountry(),
    ])
      .then(([d, wanted]) => {
        const list = d.localization.availableCountries.map((c) => ({ isoCode: c.isoCode, currency: c.currency.isoCode }));
        setCountries(list);
        const has = (iso: string | null) => !!iso && list.some((c) => c.isoCode === iso);
        setCountryState(has(wanted) ? wanted! : has(DEFAULT_COUNTRY) ? DEFAULT_COUNTRY : list[0]?.isoCode ?? DEFAULT_COUNTRY);
      })
      .catch(() => {});
  }, []);

  // Prices baked into the pages are for the default market; fetch the rest live.
  useEffect(() => {
    if (!isLive || country === DEFAULT_COUNTRY) { setPrices(null); return; }
    let live = true;
    storefront<{ products: { nodes: { variants: { nodes: ({ id: string } & LivePrice)[] } }[] } }>(
      `query @inContext(country: ${country}) { products(first: 100) { nodes { variants(first: 50) { nodes {
        id price { amount currencyCode } compareAtPrice { amount currencyCode }
      } } } } }`
    )
      .then((d) => {
        if (!live) return;
        const map: Record<string, LivePrice> = {};
        for (const p of d.products.nodes) for (const v of p.variants.nodes) map[v.id] = { price: v.price, compareAtPrice: v.compareAtPrice };
        setPrices(map);
      })
      .catch(() => live && setPrices(null));
    return () => { live = false; };
  }, [country]);

  const setCountry = useCallback((iso: string) => {
    setCountryState(iso);
    try { localStorage.setItem(KEY, iso); } catch {}
  }, []);

  return <MarketContext.Provider value={{ country, countries, setCountry, prices }}>{children}</MarketContext.Provider>;
}

export const useMarket = () => useContext(MarketContext);

/** The variant's price in the shopper's currency, falling back to the baked-in price. */
export function useVariantPrice(v: { id: string; price: Money; compareAtPrice: Money | null }): LivePrice {
  const { prices } = useMarket();
  return prices?.[v.id] ?? { price: v.price, compareAtPrice: v.compareAtPrice };
}
