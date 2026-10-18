import Link from "next/link";
import { getProducts, sized } from "@/lib/shopify";
import { isLocale, t } from "@/lib/i18n";
import ProductCard from "@/components/ProductCard";
import Reviews from "@/components/Reviews";
import Results from "@/components/Results";
import { notFound } from "next/navigation";


// The hero shows the LED mask: the product that best says "glow".
const HERO_HANDLE = "wireless-led-mask-7-color-led-face-mask-photon-skin-firming-anti-aging-rejuvenation-beauty-mask-machine";
const HERO_IMAGE_INDEX = 0;
const FEATURED = [
  "wireless-led-mask-7-color-led-face-mask-photon-skin-firming-anti-aging-rejuvenation-beauty-mask-machine",
  "30ml-salmon-pdrn-pink-peptide-glow-facial-serum-dark-spot-care-even-skin-tone-collagen-firming-brightening-face-essence",
  "mini-portable-humidifier-facial-steamer-device-beauty-spray-hydrating-apparatus-cold-spray-apparatus-rechargeable-nano-spray",
  "5pcs-bio-collagen-face-mask-deep-moisturizing-hydrating-overnight-hydrogel-facial-mask-vc-whitening-anti-aging-skincare",
];

// One picture per world: [product handle prefix, image index]. Chosen for clean, label-free shots.
const WORLDS = [
  { key: "devices", handle: "ipl-hair-removal", image: 0 },
  { key: "skincare", handle: "2026-new-micro", image: 0 },
  { key: "masks", handle: "60pcs-box-crystal", image: 0 },
] as const;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale);
  const products = await getProducts();
  const hero = products.find((p) => p.handle === HERO_HANDLE) ?? products[0];
  const featured = FEATURED.map((h) => products.find((p) => p.handle === h || p.handle.startsWith(h.slice(0, 30)))).filter(Boolean).slice(0, 4);
  const worlds = WORLDS.map((w) => ({ ...w, img: products.find((p) => p.handle.startsWith(w.handle))?.images }))
    .map((w) => ({ ...w, img: w.img?.[w.image] ?? w.img?.[0] }));
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
                <img src="/hero.webp" alt="" width={1200} height={1100} fetchPriority="high" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head"><h2>{d.worldsTitle}</h2></div>
          <div className="worlds">
            {worlds.map((w) => (
              <Link key={w.key} href={`/${locale}/shop?c=${w.key}`} className="world">
                {w.img && <img src={sized(w.img.url, 700)} alt="" width={700} height={700} loading="lazy" />}
                <span className="world-text">
                  <strong>{d.worlds[w.key].t}</strong>
                  <span>{d.worlds[w.key].d}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto">
        <div className="wrap">
          <p className="manifesto-line">{d.manifesto}</p>
          <p className="manifesto-body">{d.manifestoBody}</p>
          <Link href={`/${locale}/about`} className="link link-light">{d.nav.about}</Link>
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

      <section className="section">
        <div className="wrap">
          <div className="section-head"><h2>{d.howTitle}</h2></div>
          <ol className="how">
            {d.how.map((h, i) => (
              <li key={h.t}><span className="how-n">{i + 1}</span><h3>{h.t}</h3><p>{h.d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <Results locale={locale} />
      <Reviews locale={locale} />

      <section className="wrap">
        <h2 className="visually-hidden">{d.whyTitle}</h2>
        <ul className="promise">
          {d.why.map((w) => (
            <li key={w.t}><h3>{w.t}</h3><p>{w.d}</p></li>
          ))}
        </ul>
      </section>
    </>
  );
}
