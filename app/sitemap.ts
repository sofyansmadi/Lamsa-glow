import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/domain";
import { locales } from "@/lib/i18n";
import { pages } from "@/lib/pages";
import { getProducts } from "@/lib/shopify";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const paths = [
    "",
    "/shop",
    ...Object.keys(pages).map((p) => `/${p}`),
    ...products.map((p) => `/products/${p.handle}`),
  ];
  return locales.flatMap((l) => paths.map((p) => ({ url: `${SITE_URL}/${l}${p}` })));
}
