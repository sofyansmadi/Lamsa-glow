"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { API_VERSION, storeDomain, storefrontToken, isLive, type Money } from "@/lib/shopify";
import type { Locale } from "@/lib/i18n";
import { useMarket } from "./MarketProvider";

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    image: { url: string } | null;
    product: { handle: string; title: string };
  };
  cost: { totalAmount: Money };
};
export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: Money };
  lines: { nodes: CartLine[] };
};

const CART_FIELDS = `
  id checkoutUrl totalQuantity
  cost { subtotalAmount { amount currencyCode } }
  lines(first: 50) { nodes {
    id quantity
    cost { totalAmount { amount currencyCode } }
    merchandise { ... on ProductVariant {
      id title image { url }
      product { handle title }
    } }
  } }
`;

async function call<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://${storeDomain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": storefrontToken },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}

type Ctx = {
  cart: Cart | null;
  open: boolean;
  setOpen: (v: boolean) => void;
  busy: boolean;
  error: string | null;
  add: (variantId: string, quantity?: number) => Promise<boolean>;
  update: (lineId: string, quantity: number) => Promise<void>;
  enabled: boolean;
};

const CartContext = createContext<Ctx | null>(null);
const KEY = "lamsa-cart-id";

export function CartProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { country } = useMarket();
  const language = locale === "ar" ? "AR" : "EN";
  const ctx = `@inContext(country: ${country}, language: ${language})`;

  // Keep the bag's currency and checkout country in step with the shopper's country.
  useEffect(() => {
    if (!isLive || !cart?.id) return;
    call<{ cartBuyerIdentityUpdate: { cart: Cart | null } }>(
      `mutation B($id: ID!) ${ctx} { cartBuyerIdentityUpdate(cartId: $id, buyerIdentity: { countryCode: ${country} }) { cart { ${CART_FIELDS} } } }`,
      { id: cart.id }
    ).then((d) => d.cartBuyerIdentityUpdate.cart && setCart(d.cartBuyerIdentityUpdate.cart)).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, cart?.id]);

  useEffect(() => {
    if (!isLive) return;
    let id: string | null = null;
    try { id = localStorage.getItem(KEY); } catch {}
    if (!id) return;
    call<{ cart: Cart | null }>(`query C($id: ID!) ${ctx} { cart(id: $id) { ${CART_FIELDS} } }`, { id })
      .then((d) => {
        if (d.cart) setCart(d.cart);
        else try { localStorage.removeItem(KEY); } catch {}
      })
      .catch(() => {});
  }, [ctx]);

  const add = useCallback(
    async (variantId: string, quantity = 1) => {
      if (!isLive) { setError("unavailable"); setOpen(true); return false; }
      setBusy(true); setError(null);
      try {
        const lines = [{ merchandiseId: variantId, quantity }];
        let next: Cart;
        let warnings: { code: string }[] = [];
        if (cart) {
          const d = await call<{ cartLinesAdd: { cart: Cart; warnings: { code: string }[] } }>(
            `mutation A($id: ID!, $lines: [CartLineInput!]!) ${ctx} { cartLinesAdd(cartId: $id, lines: $lines) { cart { ${CART_FIELDS} } warnings { code } } }`,
            { id: cart.id, lines }
          );
          next = d.cartLinesAdd.cart;
          warnings = d.cartLinesAdd.warnings;
        } else {
          const d = await call<{ cartCreate: { cart: Cart; warnings: { code: string }[] } }>(
            `mutation N($lines: [CartLineInput!]!) ${ctx} { cartCreate(input: { lines: $lines, buyerIdentity: { countryCode: ${country} } }) { cart { ${CART_FIELDS} } warnings { code } } }`,
            { lines }
          );
          next = d.cartCreate.cart;
          warnings = d.cartCreate.warnings;
          try { localStorage.setItem(KEY, next.id); } catch {}
        }
        setCart(next); setOpen(true);
        if (warnings.some((w) => /STOCK|NOT_AVAILABLE|UNAVAILABLE/.test(w.code))) {
          // Shopify keeps the line at a price of 0; take it out so the bag never shows a free item.
          const dead = next.lines.nodes.filter((l) => Number(l.cost.totalAmount.amount) === 0).map((l) => l.id);
          if (dead.length) {
            const r = await call<{ cartLinesRemove: { cart: Cart } }>(
              `mutation R($id: ID!, $ids: [ID!]!) ${ctx} { cartLinesRemove(cartId: $id, lineIds: $ids) { cart { ${CART_FIELDS} } } }`,
              { id: next.id, ids: dead }
            );
            setCart(r.cartLinesRemove.cart);
          }
          setError("country");
          return false;
        }
        return true;
      } catch {
        setError("unavailable"); setOpen(true);
        return false;
      } finally { setBusy(false); }
    },
    [cart, ctx]
  );

  const update = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setBusy(true);
      try {
        const d = quantity > 0
          ? await call<{ cartLinesUpdate: { cart: Cart } }>(
              `mutation U($id: ID!, $lines: [CartLineUpdateInput!]!) ${ctx} { cartLinesUpdate(cartId: $id, lines: $lines) { cart { ${CART_FIELDS} } } }`,
              { id: cart.id, lines: [{ id: lineId, quantity }] }
            ).then((r) => r.cartLinesUpdate.cart)
          : await call<{ cartLinesRemove: { cart: Cart } }>(
              `mutation R($id: ID!, $ids: [ID!]!) ${ctx} { cartLinesRemove(cartId: $id, lineIds: $ids) { cart { ${CART_FIELDS} } } }`,
              { id: cart.id, ids: [lineId] }
            ).then((r) => r.cartLinesRemove.cart);
        setCart(d);
      } catch { setError("unavailable"); }
      finally { setBusy(false); }
    },
    [cart, ctx]
  );

  return (
    <CartContext.Provider value={{ cart, open, setOpen, busy, error, add, update, enabled: isLive }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
}
