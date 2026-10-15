import Link from "next/link";
import NewProductRedirect from "@/components/NewProductRedirect";

export default function NotFound() {
  return (
    <div className="wrap prose" style={{ textAlign: "center" }}>
      <NewProductRedirect />
      <h1>404</h1>
      <p>We couldn&apos;t find that page. · ما لقينا هالصفحة.</p>
      <p style={{ marginTop: 24 }}><Link href="/ar" className="btn btn-solid">الرئيسية</Link> <Link href="/en" className="btn btn-ghost">Home</Link></p>
    </div>
  );
}
