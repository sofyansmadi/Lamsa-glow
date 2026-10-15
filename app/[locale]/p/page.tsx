"use client";

import { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import LiveProduct from "@/components/LiveProduct";

// Page for products added in Shopify after the last site build: /ar/p?h=<handle>.
function Inner() {
  const { locale } = useParams<{ locale: string }>();
  const handle = useSearchParams().get("h") ?? "";
  return <LiveProduct handle={handle} initial={null} locale={(isLocale(locale) ? locale : "ar") as Locale} />;
}

export default function LivePage() {
  return <div className="wrap"><Suspense><Inner /></Suspense></div>;
}
