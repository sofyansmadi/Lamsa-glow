"use client";

import { useMemo } from "react";
import { t, type Locale } from "@/lib/i18n";
import { useMarket } from "./MarketProvider";

/** Country and currency picker. Hidden until Shopify sells to more than one country. */
export default function CountrySelect({ locale }: { locale: Locale }) {
  const { country, countries, setCountry } = useMarket();
  const options = useMemo(() => {
    const names = new Intl.DisplayNames([locale], { type: "region" });
    return countries
      .map((c) => ({ ...c, name: names.of(c.isoCode) ?? c.isoCode }))
      .sort((a, b) => a.name.localeCompare(b.name, locale));
  }, [countries, locale]);
  if (options.length < 2) return null;
  const current = options.find((o) => o.isoCode === country);
  return (
    <label className="country">
      <span className="visually-hidden">{t(locale).shipTo}</span>
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        {options.map((o) => (
          <option key={o.isoCode} value={o.isoCode}>{`${o.name} (${o.currency})`}</option>
        ))}
      </select>
      <span className="country-face" aria-hidden="true">{current?.currency ?? ""}</span>
    </label>
  );
}
