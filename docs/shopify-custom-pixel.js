// Shopify Admin > Settings > Customer events > Add custom pixel > paste this whole file > Save > Connect.
// It reports the checkout steps (they happen on Shopify's pages, where the site code can't see them).
// Replace 681193369492594 with your Meta Pixel ID (the same one used on the site).
const PIXEL_ID = "681193369492594";

!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', PIXEL_ID);

const ids = (c) => (c.lineItems || []).map((i) => i.variant && i.variant.id).filter(Boolean);

analytics.subscribe('payment_info_submitted', (event) => {
  const c = event.data.checkout;
  fbq('track', 'AddPaymentInfo', {
    content_type: 'product', content_ids: ids(c),
    value: c.totalPrice.amount, currency: c.totalPrice.currencyCode,
  });
});

analytics.subscribe('checkout_completed', (event) => {
  const c = event.data.checkout;
  fbq('track', 'Purchase', {
    content_type: 'product', content_ids: ids(c),
    num_items: (c.lineItems || []).reduce((n, i) => n + i.quantity, 0),
    value: c.totalPrice.amount, currency: c.totalPrice.currencyCode,
  }, { eventID: (c.order && c.order.id) || c.token });
});
