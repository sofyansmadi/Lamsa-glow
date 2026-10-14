import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pages } from "@/lib/pages";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) => Object.keys(pages).map((page) => ({ locale, page })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; page: string }> }): Promise<Metadata> {
  const { locale, page } = await params;
  return isLocale(locale) && pages[page] ? { title: pages[page][locale].title } : {};
}

export default async function InfoPage({ params }: { params: Promise<{ locale: string; page: string }> }) {
  const { locale, page } = await params;
  if (!isLocale(locale) || !pages[page]) notFound();
  const p = pages[page][locale];
  return (
    <article className="wrap prose">
      <h1>{p.title}</h1>
      {p.blocks.map((b, i) => (
        <section key={i}>
          {b.h && <h2>{b.h}</h2>}
          {b.p?.map((x) => <p key={x}>{x}</p>)}
          {b.ul && <ul>{b.ul.map((x) => <li key={x}>{x}</li>)}</ul>}
        </section>
      ))}
    </article>
  );
}
