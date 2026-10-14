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

## Deploy (free, on Cloudflare Pages)

The site builds to plain static files (`npm run build` writes them to `out/`), so it needs no server
and no paid plan. Cloudflare Pages' free plan allows shops and commercial sites.

1. Sign up free at [dash.cloudflare.com](https://dash.cloudflare.com).
2. Workers & Pages > Create > Pages > Connect to Git, and pick this repo.
3. Framework preset: **Next.js (Static HTML Export)**. Build command `npm run build`, output directory `out`.
4. Save and deploy. Every push to `main` redeploys on its own.
5. Custom domain: Pages project > Custom domains > add your domain.

### Keep products fresh

Products, prices and photos are baked in at build time. The bag and checkout always talk to Shopify live,
so customers pay the real current price either way. To pull catalog changes in automatically:

1. Pages project > Settings > Builds > Deploy hooks > add one named `refresh` and copy the URL.
2. In GitHub: repo Settings > Secrets and variables > Actions > New secret named `CF_DEPLOY_HOOK`, paste the URL.

`.github/workflows/refresh.yml` then rebuilds every 6 hours. To refresh right away, run it from the Actions tab.

The public Storefront values live in `.env.production`. They're meant to be public; never put the private token there.
