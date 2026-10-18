import { t, type Locale } from "@/lib/i18n";
import results from "@/data/results.json";
import BeforeAfter, { type Result } from "./BeforeAfter";

export default function Results({ locale }: { locale: Locale }) {
  const d = t(locale);
  const items = (results as Result[]).filter((r) => r.consent === true && r.before && r.after);
  if (!items.length) return null;
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head"><h2>{d.resultsTitle}</h2></div>
        <BeforeAfter items={items} locale={locale} labels={{ before: d.before, after: d.after }} />
        <p className="note">{d.resultsNote}</p>
      </div>
    </section>
  );
}
