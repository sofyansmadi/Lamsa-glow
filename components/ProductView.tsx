"use client";

import { useEffect, useMemo, useState } from "react";
import { plainId, track } from "@/lib/pixel";
import { useCart } from "./CartProvider";
import { useVariantPrice } from "./MarketProvider";
import { formatPrice, optionLabel, optionValueLabel, t, type Locale } from "@/lib/i18n";
import { realCompareAt, sized, type Product } from "@/lib/shopify";

type Copy = { name: string; blurb: string; points: string[] } | null;

export default function ProductView({ product, copy, locale }: { product: Product; copy: Copy; locale: Locale }) {
  const d = t(locale);
  const { add, busy } = useCart();
  const first = product.variants.find((v) => v.availableForSale) ?? product.variants[0];
  const [selected, setSelected] = useState<Record<string, string>>(
    Object.fromEntries(first.selectedOptions.map((o) => [o.name, o.value]))
  );
  const [imageIndex, setImageIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const variant = useMemo(
    () => product.variants.find((v) => v.selectedOptions.every((o) => selected[o.name] === o.value)) ?? first,
    [product.variants, selected, first]
  );
  const choosable = product.options.filter((o) => o.values.length > 1);
  const live = useVariantPrice(variant);
  // In stock overall, but Shopify can't ship it to the shopper's chosen country yet.
  const shipsHere = live.availableForSale !== false;
  const was = realCompareAt({ ...variant, ...live });
  const img = product.images[imageIndex];

  useEffect(() => {
    track("ViewContent", {
      content_type: "product", content_ids: [plainId(variant.id)], content_name: product.title,
      value: Number(live.price.amount), currency: live.price.currencyCode,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const availableFor = (name: string, value: string) =>
    product.variants.some(
      (v) => v.availableForSale && v.selectedOptions.every((o) => (o.name === name ? o.value === value : selected[o.name] === o.value))
    );

  async function onAdd() {
    const ok = await add(variant.id, 1);
    if (ok) { setJustAdded(true); setTimeout(() => setJustAdded(false), 2000); }
  }

  return (
    <div className="pdp">
      <div>
        <div className="gallery-main">
          {img && <img src={sized(img.url, 1000)} alt={copy?.name ?? product.title} width={1000} height={1000} />}
        </div>
        {product.images.length > 1 && (
          <div className="thumbs">
            {product.images.map((im, i) => (
              <button key={im.url} className="thumb" aria-current={i === imageIndex} onClick={() => setImageIndex(i)} aria-label={`${i + 1}`}>
                <img src={sized(im.url, 160)} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pdp-info">
        <h1>{copy?.name ?? product.title}</h1>
        <div className="price">
          {formatPrice(live.price.amount, live.price.currencyCode, locale)}
          {was && <s>{formatPrice(was.amount, was.currencyCode, locale)}</s>}
        </div>
        {copy && <p className="blurb">{copy.blurb}</p>}

        {choosable.map((o) => (
          <fieldset key={o.name} className="option-group">
            <legend>{optionLabel(o.name, locale)}</legend>
            <div className="swatches">
              {o.values.map((v) => (
                <button
                  key={v}
                  type="button"
                  className="swatch"
                  aria-pressed={selected[o.name] === v}
                  data-unavailable={!availableFor(o.name, v)}
                  onClick={() => setSelected((s) => ({ ...s, [o.name]: v }))}
                >
                  <bdi>{optionValueLabel(v, locale)}</bdi>
                </button>
              ))}
            </div>
          </fieldset>
        ))}

        <button className="btn btn-solid btn-block" disabled={!variant.availableForSale || !shipsHere || busy} onClick={onAdd}>
          {!variant.availableForSale ? d.soldOut : !shipsHere ? d.notInCountry : busy ? d.adding : justAdded ? d.added : d.addToCart}
        </button>
        <p className="note">{d.shippingLine}</p>
        <ul className="trust-strip">{d.trustStrip.map((x) => <li key={x}>{x}</li>)}</ul>

        {copy ? (
          <section>
            <h2 className="visually-hidden">{d.details}</h2>
            <ul className="points">{copy.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </section>
        ) : (
          <div className="blurb" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        )}
      </div>
    </div>
  );
}
