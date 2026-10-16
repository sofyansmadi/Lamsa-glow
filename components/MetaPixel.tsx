"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PIXEL_ID, track } from "@/lib/pixel";

// Loads the Meta Pixel once and sends PageView on first load and on every client-side navigation.
export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!PIXEL_ID || window.fbq) return;
    /* eslint-disable */
    (function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); });
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement; t.async = true; t.src = v;
      const s = b.getElementsByTagName(e)[0]; s.parentNode!.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq!("init", PIXEL_ID);
  }, []);

  useEffect(() => { track("PageView"); }, [pathname]);

  return null;
}
