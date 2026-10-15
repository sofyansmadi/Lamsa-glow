"use client";

import { useEffect, useState } from "react";
import { fetchLiveProduct, isLive, type Product } from "@/lib/shopify";
import { copyFor } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";
import ProductView from "./ProductView";

// Renders a product with its current Shopify data: photos, options and stock edited in Shopify
// show up immediately, and products added after the last build still get a working page.
export default function LiveProduct({ handle, initial, locale }: { handle: string; initial: Product | null; locale: Locale }) {
  const [product, setProduct] = useState(initial);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!isLive || !handle) return;
    fetchLiveProduct(handle).then((p) => (p ? setProduct(p) : !initial && setMissing(true))).catch(() => {});
  }, [handle, initial]);

  if (missing) return <p className="prose" style={{ textAlign: "center" }}>{t(locale).notFound}</p>;
  if (!product) return <div className="pdp" aria-busy="true" style={{ minHeight: "60vh" }} />;
  const c = copyFor(product.handle, locale);
  return <ProductView key={product.handle} product={product} copy={c ? { name: c.name, blurb: c.blurb, points: c.points } : null} locale={locale} />;
}
