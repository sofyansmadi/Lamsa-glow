// Meta (Facebook/Instagram) Pixel helpers. Everything here is a no-op until NEXT_PUBLIC_META_PIXEL_ID is set.
export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

type Fbq = (...args: unknown[]) => void;
declare global {
  interface Window { fbq?: Fbq }
}

// Shopify GIDs look like gid://shopify/ProductVariant/123456; Meta wants the plain id.
export const plainId = (gid: string) => gid.split("/").pop() || gid;

export function track(event: string, params?: Record<string, unknown>) {
  if (!PIXEL_ID || typeof window === "undefined" || !window.fbq) return;
  try { window.fbq("track", event, params); } catch {}
}
