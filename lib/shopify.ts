// Shopify Storefront API client.
// With SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN set, products come live
// from Shopify. Without them, the site falls back to data/catalog.json so it
// still builds and renders (checkout stays disabled until the token is set).

import snapshot from "../data/catalog.json";

export type Money = { amount: string; currencyCode: string };
export type Image = { url: string; altText: string; width: number; height: number };
export type Variant = {
  id: string;
  title: string;
  price: Money;
  compareAtPrice: Money | null;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
};
export type Product = {
  id: string;
  handle: string;
  title: string;
  productType: string;
  tags: string[];
  descriptionHtml: string;
  images: Image[];
  options: { name: string; values: string[] }[];
  variants: Variant[];
};

export const API_VERSION = "2025-07";
export const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
export const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "";
export const isLive = Boolean(storeDomain && storefrontToken);

export async function storefront<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(`https://${storeDomain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`Shopify responded ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors.map((e: { message: string }) => e.message).join("; "));
  return json.data as T;
}

const PRODUCT_FIELDS = `
  id handle title productType tags descriptionHtml
  images(first: 8) { nodes { url altText width height } }
  options { name values }
  variants(first: 50) { nodes {
    id title availableForSale
    price { amount currencyCode }
    compareAtPrice { amount currencyCode }
    selectedOptions { name value }
  } }
`;

type RawProduct = Omit<Product, "images" | "variants"> & {
  images: { nodes: Image[] };
  variants: { nodes: Variant[] };
};

const normalize = (p: RawProduct): Product => ({
  ...p,
  images: p.images.nodes.map((i) => ({ ...i, altText: i.altText ?? "" })),
  variants: p.variants.nodes,
});

export async function getProducts(): Promise<Product[]> {
  if (!isLive) return snapshot as Product[];
  try {
    const data = await storefront<{ products: { nodes: RawProduct[] } }>(
      `query Products @inContext(country: AE) { products(first: 100) { nodes { ${PRODUCT_FIELDS} } } }`
    );
    return data.products.nodes.map(normalize);
  } catch (e) {
    console.error("Falling back to catalog snapshot:", e);
    return snapshot as Product[];
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!isLive) return (snapshot as Product[]).find((p) => p.handle === handle) ?? null;
  try {
    const data = await storefront<{ product: RawProduct | null }>(
      `query Product($handle: String!) @inContext(country: AE) { product(handle: $handle) { ${PRODUCT_FIELDS} } }`,
      { handle }
    );
    return data.product ? normalize(data.product) : null;
  } catch (e) {
    console.error("Falling back to catalog snapshot:", e);
    return (snapshot as Product[]).find((p) => p.handle === handle) ?? null;
  }
}

/** Shopify's CDN resizes on request; ask for the width we actually render. */
export const sized = (url: string, width: number) =>
  `${url}${url.includes("?") ? "&" : "?"}width=${width}`;

/** Lowest current price across variants. */
export const minPrice = (p: Product) =>
  p.variants.reduce((m, v) => (Number(v.price.amount) < Number(m.amount) ? v.price : m), p.variants[0].price);

/** Only show a "was" price when it really is higher than the current one. */
export const realCompareAt = (v: Variant) =>
  v.compareAtPrice && Number(v.compareAtPrice.amount) > Number(v.price.amount) ? v.compareAtPrice : null;
