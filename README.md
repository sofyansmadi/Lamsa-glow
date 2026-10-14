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

## Deploy

Import the repo on [Vercel](https://vercel.com/new), add the two variables from `.env.example`,
and deploy. Pages refresh from Shopify every 10 minutes.
