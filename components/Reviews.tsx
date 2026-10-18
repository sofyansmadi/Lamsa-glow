import { t, type Locale } from "@/lib/i18n";
import reviews from "@/data/reviews.json";

type Review = { name: string; country?: string; rating: number; textAr?: string; textEn?: string; date?: string; consent?: boolean };

const flag = (cc?: string) =>
  cc && /^[A-Za-z]{2}$/.test(cc) ? String.fromCodePoint(...cc.toUpperCase().split("").map((c) => 127397 + c.charCodeAt(0))) : "";

export default function Reviews({ locale }: { locale: Locale }) {
  const d = t(locale);
  const list = (reviews as Review[]).filter((r) => r.consent === true && r.rating >= 1 && r.rating <= 5 && (locale === "ar" ? r.textAr || r.textEn : r.textEn || r.textAr));
  if (!list.length) return null;
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head"><h2>{d.reviewsTitle}</h2></div>
        <div className="reviews">
          {list.map((r, i) => (
            <figure key={i} className="review">
              <div className="stars" role="img" aria-label={`${r.rating}/5`}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
              <blockquote>{locale === "ar" ? r.textAr ?? r.textEn : r.textEn ?? r.textAr}</blockquote>
              <figcaption><span aria-hidden="true">{flag(r.country)}</span> {r.name}</figcaption>
            </figure>
          ))}
        </div>
        <p className="note">{d.reviewsNote}</p>
      </div>
    </section>
  );
}
