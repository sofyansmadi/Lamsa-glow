import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProducts } from "@/lib/shopify";
import { isLocale, t } from "@/lib/i18n";
import ProductCard from "@/components/ProductCard";
import ShopGrid from "@/components/ShopGrid";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: t(locale).shopTitle } : {};
}

export default async function Shop({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale);
  const products = await getProducts();
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head"><h1 style={{ fontSize: "var(--step-3)" }}>{d.shopTitle}</h1></div>
        <Suspense fallback={<div className="grid">{products.map((p) => <ProductCard key={p.handle} product={p} locale={locale} />)}</div>}>
          <ShopGrid products={products} locale={locale} />
        </Suspense>
      </div>
    </section>
  );
}
