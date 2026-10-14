"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Product } from "@/lib/shopify";
import { productCopy, type Category } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";

const cats: ("all" | Category)[] = ["all", "devices", "skincare", "masks"];

export default function ShopGrid({ products, locale, cards }: { products: Product[]; locale: Locale; cards: Record<string, React.ReactNode> }) {
  const d = t(locale);
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const raw = params.get("c");
  const active = (cats as string[]).includes(raw ?? "") ? (raw as Category) : "all";
  const shown = products.filter((p) => active === "all" || productCopy[p.handle]?.category === active);

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
      <div className="grid">{shown.map((p) => <div key={p.handle}>{cards[p.handle]}</div>)}</div>
    </>
  );
}
