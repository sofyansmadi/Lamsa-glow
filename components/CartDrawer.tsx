"use client";

import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";
import { formatPrice, optionValueLabel, t, type Locale } from "@/lib/i18n";
import { sized } from "@/lib/shopify";
import { productCopy } from "@/lib/content";

export default function CartDrawer({ locale }: { locale: Locale }) {
  const d = t(locale);
  const { cart, open, setOpen, update, busy, error, enabled } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  if (!open) return null;
  const lines = cart?.lines.nodes ?? [];

  return (
    <>
      <div className="scrim" onClick={() => setOpen(false)} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="drawer-head">
          <h2 id="cart-title">{d.cart}</h2>
          <button ref={closeRef} className="icon-btn" onClick={() => setOpen(false)} aria-label={d.close}>✕</button>
        </div>
        <div className="drawer-body">
          {(error || !enabled) && <p className="alert" role="status">{d.checkoutUnavailable}</p>}
          {lines.length === 0 && enabled && !error && <p className="note">{d.cartEmpty}</p>}
          {lines.map((l) => {
            const name = productCopy[l.merchandise.product.handle]?.[locale].name ?? l.merchandise.product.title;
            return (
              <div className="line" key={l.id}>
                {l.merchandise.image ? <img src={sized(l.merchandise.image.url, 160)} alt="" /> : <span />}
                <div>
                  <div className="line-name">{name}</div>
                  {l.merchandise.title !== "Default Title" && <div className="line-variant"><bdi>{l.merchandise.title.split(" / ").map((v) => optionValueLabel(v, locale)).join(" / ")}</bdi></div>}
                  <div className="stepper" aria-label={d.qty}>
                    <button disabled={busy} onClick={() => update(l.id, l.quantity - 1)} aria-label="−">−</button>
                    <span>{l.quantity}</span>
                    <button disabled={busy} onClick={() => update(l.id, l.quantity + 1)} aria-label="+">+</button>
                  </div>
                </div>
                <div>{formatPrice(l.cost.totalAmount.amount, l.cost.totalAmount.currencyCode, locale)}</div>
              </div>
            );
          })}
        </div>
        {cart && lines.length > 0 && (
          <div className="drawer-foot">
            <div className="row">
              <strong>{d.subtotal}</strong>
              <strong>{formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode, locale)}</strong>
            </div>
            <p className="note">{d.checkoutNote}</p>
            <a className="btn btn-solid btn-block" href={`${cart.checkoutUrl}${cart.checkoutUrl.includes("?") ? "&" : "?"}locale=${locale}`}>
              {d.checkout}
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
