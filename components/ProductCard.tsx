import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { sized, type Product } from "@/lib/shopify";
import CardPrice from "./CardPrice";
import { copyFor } from "@/lib/content";

export default function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const d = t(locale);
  const c = copyFor(product.handle, locale);
  const img = product.images[0];
  return (
    <Link href={`/${locale}/products/${product.handle}`} className="card">
      <div className="card-media">
        {img && <img src={sized(img.url, 600)} alt="" loading="lazy" width={600} height={600} />}
      </div>
      {c && <span className="card-cat">{d.categories[c.category]}</span>}
      <span className="card-name">{c?.name ?? product.title}</span>
      <CardPrice variants={product.variants} locale={locale} />
    </Link>
  );
}
