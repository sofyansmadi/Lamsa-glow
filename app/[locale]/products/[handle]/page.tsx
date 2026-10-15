import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, getProducts, sized } from "@/lib/shopify";
import { isLocale, locales } from "@/lib/i18n";
import { copyFor } from "@/lib/content";
import LiveProduct from "@/components/LiveProduct";


export async function generateStaticParams() {
  const products = await getProducts();
  return locales.flatMap((locale) => products.map((p) => ({ locale, handle: p.handle })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; handle: string }> }): Promise<Metadata> {
  const { locale, handle } = await params;
  if (!isLocale(locale)) return {};
  const p = await getProduct(handle);
  if (!p) return {};
  const c = copyFor(handle, locale);
  return {
    title: c?.name ?? p.title,
    description: c?.blurb,
    openGraph: p.images[0] ? { images: [sized(p.images[0].url, 1200)] } : undefined,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string; handle: string }> }) {
  const { locale, handle } = await params;
  if (!isLocale(locale)) notFound();
  const product = await getProduct(handle);
  if (!product) notFound();
  return (
    <div className="wrap">
      <LiveProduct handle={handle} initial={product} locale={locale} />
    </div>
  );
}
