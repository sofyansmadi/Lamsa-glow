# Lamsa Glow

The storefront for Lamsa, a brand of LAMSA LTD. Arabic and English, prices in AED.
Shopify runs products, stock, checkout, payments and supplier fulfilment in the background;
this site is the shop window customers see.

## Run it locally

```bash
npm install
cp .env.example .env.local   # paste your Storefront API token into it
npm run dev                  # http://localhost:3000
```

Without a token the site still runs on `data/catalog.json` (a snapshot of the catalog),
but the bag and checkout stay off.

## Where things live

| What | File |
| --- | --- |
| Product names, descriptions and categories, in both languages | `lib/content.ts` |
| Contact email, delivery time, return window, company details | `lib/site.ts` |
| About, shipping, returns, privacy, terms and contact pages | `lib/pages.ts` |
| Interface text (buttons, menus, footer) | `lib/i18n.ts` |
| Colours and layout | `app/globals.css` |

Prices, stock, images and variants always come from Shopify. A new product added in Shopify shows up
automatically; add an entry for it in `lib/content.ts` to give it an Arabic name, category and description.

## Deploy (free, on Cloudflare Workers)

The site builds to plain static files (`npm run build` writes them to `out/`) and is served by
Cloudflare Workers static assets on the free plan, which allows shops and commercial sites.
`wrangler.jsonc` holds the config. The Cloudflare project is linked to this repo, so every push to
`main` rebuilds and redeploys on its own.

Live: https://lamsa-glow.sofyansmadi0.workers.dev (add a custom domain under the project's Domains tab).

### Keep products fresh

Products, prices and photos are baked in at build time; the bag and checkout always talk to Shopify live,
so customers pay the real current price either way. `.github/workflows/refresh.yml` runs every 6 hours,
pulls the catalog into `data/catalog.json` with `scripts/sync-catalog.mjs`, and commits it only when
something changed. That push triggers a redeploy. To refresh right away, run "Refresh products" from the
Actions tab.

The public Storefront values live in `.env.production`. They're meant to be public; never put the private token there.
