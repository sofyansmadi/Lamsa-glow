import Link from "next/link";
import { formatPrice, t, type Locale } from "@/lib/i18n";
import { minPrice, sized, type Product } from "@/lib/shopify";
import { copyFor } from "@/lib/content";

export default function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const d = t(locale);
  const c = copyFor(product.handle, locale);
  const price = minPrice(product);
  const multiple = new Set(product.variants.map((v) => v.price.amount)).size > 1;
  const img = product.images[0];
  return (
    <Link href={`/${locale}/products/${product.handle}`} className="card">
      <div className="card-media">
        {img && <img src={sized(img.url, 600)} alt="" loading="lazy" width={600} height={600} />}
      </div>
      {c && <span className="card-cat">{d.categories[c.category]}</span>}
      <span className="card-name">{c?.name ?? product.title}</span>
      <span className="card-price">
        {multiple ? `${d.from} ` : ""}
        {formatPrice(price.amount, price.currencyCode, locale)}
      </span>
    </Link>
  );
}
