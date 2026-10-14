import Link from "next/link";
import { getProducts, sized } from "@/lib/shopify";
import { isLocale, t } from "@/lib/i18n";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";


// The hero shows the LED mask: the product that best says "glow".
const HERO_HANDLE = "wireless-led-mask-7-color-led-face-mask-photon-skin-firming-anti-aging-rejuvenation-beauty-mask-machine";
const HERO_IMAGE_INDEX = 6;
const FEATURED = [
  "kodo-2026-high-end-customization-ice-laser-hair-removal-laser-epilator-permanent-ipl-painless-photoepilator-4-in-1-face-and-body",
  "pdrn-pink-collagen-capsule-cream-with-niacinamide-cream-for-uneven-skin-tone-lightweight-face-moisturizer-original-korean-cream",
  "bio-collagen-collagen-face-mask-face-barrier-repair-soothing-ampoule-essence-moisturizing-refined-pores-mask-korean-skin-care",
  "mini-portable-humidifier-facial-steamer-device-beauty-spray-hydrating-apparatus-cold-spray-apparatus-rechargeable-nano-spray",
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale);
  const products = await getProducts();
  const hero = products.find((p) => p.handle === HERO_HANDLE) ?? products[0];
  const featured = FEATURED.map((h) => products.find((p) => p.handle === h)).filter(Boolean).slice(0, 4);
  const heroImg = hero?.images[HERO_IMAGE_INDEX] ?? hero?.images[0];

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>{d.heroTitle}</h1>
            <p>{d.heroBody}</p>
            <div className="hero-ctas">
              <Link href={`/${locale}/shop`} className="btn btn-solid">{d.heroCta}</Link>
              <Link href={`/${locale}/shop?c=devices`} className="btn btn-ghost">{d.heroSecondary}</Link>
            </div>
          </div>
          <div className="orb-stage" aria-hidden="true">
            <div className="orb" />
            {heroImg && (
              <div className="orb-product">
                <img src={sized(heroImg.url, 900)} alt="" width={900} height={900} fetchPriority="high" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>{d.featured}</h2>
            <Link href={`/${locale}/shop`} className="link">{d.viewAll}</Link>
          </div>
          <div className="grid">
            {featured.map((p) => <ProductCard key={p!.handle} product={p!} locale={locale} />)}
          </div>
        </div>
      </section>

      <section className="wrap">
        <div className="why">
          <h2>{d.whyTitle}</h2>
          <ul className="why-list">
            {d.why.map((w) => (
              <li key={w.t}><h3>{w.t}</h3><p>{w.d}</p></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
