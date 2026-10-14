"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { t, type Locale } from "@/lib/i18n";

export default function Header({ locale }: { locale: Locale }) {
  const d = t(locale);
  const { cart, setOpen } = useCart();
  const path = usePathname() || `/${locale}`;
  const other: Locale = locale === "ar" ? "en" : "ar";
  const switchHref = path.replace(/^\/(ar|en)/, `/${other}`);
  const count = cart?.totalQuantity ?? 0;

  return (
    <header className="header">
      <div className="wrap header-row">
        <Link href={`/${locale}`} className="logo">
          {d.brand}
          <small>Glow</small>
        </Link>
        <nav className="nav" aria-label={locale === "ar" ? "الرئيسية" : "Main"}>
          <Link href={`/${locale}/shop`}>{d.nav.shop}</Link>
          <Link href={`/${locale}/shop?c=devices`}>{d.nav.devices}</Link>
          <Link href={`/${locale}/shop?c=skincare`}>{d.nav.skincare}</Link>
          <Link href={`/${locale}/shop?c=masks`}>{d.nav.masks}</Link>
          <Link href={`/${locale}/about`}>{d.nav.about}</Link>
        </nav>
        <div className="header-actions">
          <Link href={switchHref} className="lang" lang={other} hrefLang={other}>
            {d.switchLang}
          </Link>
          <button className="cart-btn" onClick={() => setOpen(true)} aria-label={`${d.cart} (${count})`}>
            {d.cart}
            <span className="cart-count" aria-hidden="true">{count}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
