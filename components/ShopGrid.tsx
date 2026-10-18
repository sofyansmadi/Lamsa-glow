"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { fetchLiveProducts, isLive, type Product } from "@/lib/shopify";
import { productCopy, isJordanOnly, type Category } from "@/lib/content";
import { useMarket } from "./MarketProvider";
import { t, type Locale } from "@/lib/i18n";
import ProductCard from "./ProductCard";

const cats: ("all" | Category)[] = ["all", "devices", "skincare", "masks"];

// Shows the catalog baked into the page first, then swaps in the live list from Shopify so new,
// removed or edited products appear without waiting for the next site build.
export default function ShopGrid({ products, locale }: { products: Product[]; locale: Locale }) {
  const d = t(locale);
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const { country } = useMarket();
  const [list, setList] = useState(products);
  const built = new Set(products.map((p) => p.handle));

  useEffect(() => {
    if (!isLive) return;
    fetchLiveProducts().then((live) => live.length && setList(live)).catch(() => {});
  }, []);

  const raw = params.get("c");
  const active = (cats as string[]).includes(raw ?? "") ? (raw as Category) : "all";
  // Jordan sees only the Jordan product; everyone else never sees it.
  const visible = list.filter((p) => (country === "JO" ? isJordanOnly(p.handle) : !isJordanOnly(p.handle)));
  const shown = visible.filter((p) => active === "all" || productCopy[p.handle]?.category === active);

  return (
    <>
      <div className="tabs" role="group" aria-label={d.shopTitle}>
        {cats.map((c) => (
          <button
            key={c}
            className="tab"
            aria-pressed={active === c}
            onClick={() => router.replace(c === "all" ? path : `${path}?c=${c}`, { scroll: false })}
          >
            {d.categories[c]}
          </button>
        ))}
      </div>
      <div className="grid">
        {shown.map((p) => <div key={p.handle}><ProductCard product={p} locale={locale} prebuilt={built.has(p.handle)} /></div>)}
      </div>
    </>
  );
}
