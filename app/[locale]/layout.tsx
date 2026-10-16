import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { dir, isLocale, locales, t } from "@/lib/i18n";
import { CartProvider } from "@/components/CartProvider";
import { MarketProvider } from "@/components/MarketProvider";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import MetaPixel from "@/components/MetaPixel";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return {
    title: { default: `${d.brand} Glow`, template: `%s | ${d.brand} Glow` },
    description: d.heroBody,
    alternates: { languages: { ar: "/ar", en: "/en" } },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@300;500;600;700&family=Readex+Pro:wght@300;400;500&display=swap"
        />
        <link rel="preconnect" href="https://cdn.shopify.com" />
        {process.env.NEXT_PUBLIC_META_DOMAIN_VERIFY && (
          <meta name="facebook-domain-verification" content={process.env.NEXT_PUBLIC_META_DOMAIN_VERIFY} />
        )}
      </head>
      <body>
        <MarketProvider>
        <MetaPixel />
        <CartProvider locale={locale}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
          <CartDrawer locale={locale} />
        </CartProvider>
        </MarketProvider>
      </body>
    </html>
  );
}
