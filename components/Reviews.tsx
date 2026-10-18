import { t, type Locale } from "@/lib/i18n";
import reviews from "@/data/reviews.json";

type Review = { name?: string; product?: string; country?: string; rating?: number; textAr?: string; textEn?: string; date?: string; consent?: boolean };

const flag = (cc?: string) =>
  cc && /^[A-Za-z]{2}$/.test(cc) ? String.fromCodePoint(...cc.toUpperCase().split("").map((c) => 127397 + c.charCodeAt(0))) : "";

export default function Reviews({ locale, product }: { locale: Locale; product?: string }) {
  const d = t(locale);
  const list = (reviews as Review[]).filter((r) => r.consent === true && (r.rating === undefined || (r.rating >= 1 && r.rating <= 5)) && (!product || r.product === product) && (locale === "ar" ? r.textAr || r.textEn : r.textEn || r.textAr));
  if (!list.length) return null;
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head"><h2>{d.reviewsTitle}</h2></div>
        <div className="reviews">
          {list.map((r, i) => (
            <figure key={i} className="review">
              {r.rating !== undefined && <div className="stars" role="img" aria-label={`${r.rating}/5`}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>}
              <blockquote>{locale === "ar" ? r.textAr ?? r.textEn : r.textEn ?? r.textAr}</blockquote>
              <figcaption><span aria-hidden="true">{flag(r.country)}</span> {r.name ?? d.anonCustomer}</figcaption>
            </figure>
          ))}
        </div>
        <p className="note">{d.reviewsNote}</p>
      </div>
    </section>
  );
}
