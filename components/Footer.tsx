import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function Footer({ locale }: { locale: Locale }) {
  const d = t(locale);
  const f = d.footer;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href={`/${locale}`} className="logo">{d.brand}<small>Glow</small></Link>
            <p className="note" style={{ marginTop: 12, maxWidth: "34ch" }}>{f.tagline}</p>
          </div>
          <div>
            <h3>{d.nav.shop}</h3>
            <ul>
              <li><Link href={`/${locale}/shop?c=devices`}>{d.nav.devices}</Link></li>
              <li><Link href={`/${locale}/shop?c=skincare`}>{d.nav.skincare}</Link></li>
              <li><Link href={`/${locale}/shop?c=masks`}>{d.nav.masks}</Link></li>
              <li><Link href={`/${locale}/about`}>{d.nav.about}</Link></li>
            </ul>
          </div>
          <div>
            <h3>{f.help}</h3>
            <ul>
              <li><Link href={`/${locale}/faq`}>{d.faqLink}</Link></li>
              <li><Link href={`/${locale}/shipping`}>{f.shipping}</Link></li>
              <li><Link href={`/${locale}/returns`}>{f.returns}</Link></li>
              <li><Link href={`/${locale}/contact`}>{f.contact}</Link></li>
              <li><Link href={`/${locale}/privacy`}>{f.privacy}</Link></li>
              <li><Link href={`/${locale}/terms`}>{f.terms}</Link></li>
            </ul>
          </div>
        </div>
        <p className="footer-legal">© {new Date().getFullYear()} {f.company} <bdi dir="ltr">{site.company.office}</bdi>.</p>
      </div>
    </footer>
  );
}
