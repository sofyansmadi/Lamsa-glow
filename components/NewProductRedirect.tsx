"use client";

import { useEffect } from "react";

// A product link that 404s is usually a product added after the last build: open its live page.
export default function NewProductRedirect() {
  useEffect(() => {
    const m = location.pathname.match(/^\/(ar|en)\/products\/([^/?#]+)/);
    if (m) location.replace(`/${m[1]}/p?h=${m[2]}`);
  }, []);
  return null;
}
