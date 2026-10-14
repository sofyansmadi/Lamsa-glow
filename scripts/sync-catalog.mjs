// Pulls the current catalog from Shopify into data/catalog.json.
// The refresh workflow commits the file only when something changed, and that push redeploys the site.
import { readFileSync, writeFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.production", import.meta.url), "utf8")
    .split("\n").filter((l) => l && !l.startsWith("#")).map((l) => l.split("=").map((s) => s.trim()))
);
const domain = env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

const query = `query Products @inContext(country: AE) { products(first: 100, sortKey: CREATED_AT) { nodes {
  id handle title productType tags descriptionHtml
  images(first: 8) { nodes { url altText width height } }
  options { name values }
  variants(first: 50) { nodes {
    id title availableForSale
    price { amount currencyCode }
    compareAtPrice { amount currencyCode }
    selectedOptions { name value }
  } }
} } }`;

const res = await fetch(`https://${domain}/api/2025-07/graphql.json`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token },
  body: JSON.stringify({ query }),
});
const json = await res.json();
if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors ?? res.status));

const products = json.data.products.nodes.map((p) => ({
  ...p,
  images: p.images.nodes.map((i) => ({ ...i, altText: i.altText ?? "" })),
  variants: p.variants.nodes,
}));
if (!products.length) throw new Error("Shopify returned no products; keeping the old snapshot.");

writeFileSync(new URL("../data/catalog.json", import.meta.url), JSON.stringify(products, null, 2) + "\n");
console.log(`Saved ${products.length} products.`);
