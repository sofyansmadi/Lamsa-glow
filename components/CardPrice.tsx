"use client";

import { formatPrice, t, type Locale } from "@/lib/i18n";
import type { Variant } from "@/lib/shopify";
import { useMarket } from "./MarketProvider";
import { JORDAN_ONLY } from "@/lib/content";

/** "From" price for a product card, in the shopper's currency. */
export default function CardPrice({ variants, locale, handle }: { variants: Variant[]; locale: Locale; handle?: string }) {
  const { prices } = useMarket();
  const jod = handle ? JORDAN_ONLY[handle]?.jod : undefined;
  if (jod) return <span className="card-price">{locale === "ar" ? `${jod} دينار` : `${jod} JOD`}</span>;
  const list = variants.map((v) => prices?.[v.id]?.price ?? v.price);
  const min = list.reduce((m, p) => (Number(p.amount) < Number(m.amount) ? p : m), list[0]);
  const multiple = new Set(list.map((p) => p.amount)).size > 1;
  return (
    <span className="card-price">
      {multiple ? `${t(locale).from} ` : ""}
      {formatPrice(min.amount, min.currencyCode, locale)}
    </span>
  );
}
