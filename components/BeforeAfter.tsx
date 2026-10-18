"use client";
import { useState } from "react";

export type Result = { id: string; labelAr?: string; labelEn?: string; before: string; after: string; weeks?: number; consent?: boolean };

export default function BeforeAfter({ items, locale, labels }: { items: Result[]; locale: "ar" | "en"; labels: { before: string; after: string } }) {
  return (
    <div className="ba-list">
      {items.map((r) => <One key={r.id} r={r} locale={locale} labels={labels} />)}
    </div>
  );
}

function One({ r, locale, labels }: { r: Result; locale: "ar" | "en"; labels: { before: string; after: string } }) {
  const [pos, setPos] = useState(50);
  const label = locale === "ar" ? r.labelAr ?? r.labelEn : r.labelEn ?? r.labelAr;
  return (
    <figure className="ba">
      <div className="ba-stage" dir="ltr">
        <img src={r.after} alt={labels.after} loading="lazy" />
        <div className="ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={r.before} alt={labels.before} loading="lazy" />
        </div>
        <span className="ba-tag ba-tag-l">{labels.before}</span>
        <span className="ba-tag ba-tag-r">{labels.after}</span>
        <div className="ba-handle" style={{ left: `${pos}%` }} aria-hidden="true" />
        <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label={`${labels.before} / ${labels.after}`} />
      </div>
      {label && <figcaption>{label}{r.weeks ? ` · ${r.weeks} ${locale === "ar" ? "أسابيع" : "weeks"}` : ""}</figcaption>}
    </figure>
  );
}
