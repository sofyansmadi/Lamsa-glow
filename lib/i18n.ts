export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

export const dir = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

const dict = {
  ar: {
    brand: "لمسة",
    nav: { shop: "المتجر", devices: "الأجهزة", skincare: "العناية", masks: "الماسكات", about: "قصتنا" },
    switchLang: "English",
    announce: "نشحن لكل دول العالم",
    shipTo: "البلد والعملة",
    notInCountry: "غير متوفر لبلدك حالياً",
    notInCountryLong: "هذا المنتج غير متوفر للشحن إلى البلد المختار حالياً. جرّبي بلداً آخر أو راسلينا.",
    heroTitle: "توهّجك على بُعد لمسة",
    heroBody:
      "أجهزة الجمال والعناية بالبشرة التي تحبها كل فتاة، في مكان واحد. من روتينك الصباحي إلى جلسة الدلال المسائية، لمسة معك أينما كنتِ.",
    heroCta: "تسوّقي المجموعة",
    heroSecondary: "اكتشفي الأجهزة",
    worldsTitle: "عالمك، بكل تفاصيله",
    worlds: {
      devices: { t: "الأجهزة", d: "روتين الصالون، في بيتك." },
      skincare: { t: "العناية", d: "سيرومات وكريمات لبشرة مرتاحة ومشرقة." },
      masks: { t: "الماسكات", d: "دقائق لكِ وحدك، كل يوم." },
    },
    manifesto: "لكل فتاة تعرف أن الاهتمام بنفسها ليس رفاهية.",
    manifestoBody: "لمسة وُلدت لتجمع عالم الفتاة في مكان واحد: أدوات جمال ذكية، وعناية يومية، ولحظات صغيرة تخصك وحدك.",
    categories: { all: "الكل", devices: "الأجهزة", skincare: "العناية", masks: "الماسكات" },
    shopTitle: "مجموعة لمسة",
    from: "من",
    addToCart: "أضيفي للسلة",
    adding: "جارٍ الإضافة…",
    added: "أُضيفت للسلة",
    soldOut: "نفدت الكمية",
    cart: "السلة",
    cartEmpty: "سلتك فارغة. تصفّحي المجموعة وأضيفي ما يعجبك.",
    subtotal: "المجموع",
    checkout: "إتمام الطلب",
    checkoutNote: "الشحن والضرائب تُحسب في صفحة الدفع.",
    remove: "إزالة",
    close: "إغلاق",
    qty: "الكمية",
    checkoutUnavailable: "الدفع غير متاح حالياً. حاولي بعد قليل أو راسلينا.",
    whyTitle: "وعد لمسة",
    why: [
      { t: "شحن لكل العالم", d: "نوصل طلبك إلى باب بيتك أينما كنتِ، مع رقم تتبّع." },
      { t: "دفع آمن", d: "تدفعين عبر صفحة دفع مشفّرة، وبيانات بطاقتك لا تصلنا أبداً." },
      { t: "استرجاع خلال 14 يوماً", d: "إذا وصلك المنتج تالفاً أو غير مطابق، نستبدله أو نعيد لك المبلغ." },
      { t: "نسمعك", d: "فريقنا يرد على رسائلك بالعربية والإنجليزية." },
    ],
    howTitle: "كيف تطلبين من لمسة",
    how: [
      { t: "اختاري منتجك", d: "تصفّحي المجموعة واقرئي التفاصيل. كل منتج معه وصف واضح لما يقدّمه." },
      { t: "ادفعي بأمان", d: "صفحة دفع مشفّرة من Shopify. بيانات بطاقتك لا تصلنا." },
      { t: "تابعي شحنتك", d: "نرسل لك رقم التتبّع بعد الشحن، ونرد على أي سؤال عن طلبك." },
    ],
    trustStrip: ["دفع مشفّر وآمن", "رقم تتبّع لكل طلب", "استرجاع خلال 14 يوماً"],
    reviewsTitle: "آراء عميلاتنا",
    reviewsNote: "آراء حقيقية من عميلات اشترين من لمسة. النتائج تختلف من شخص لآخر.",
    resultsTitle: "تجارب حقيقية",
    resultsNote: "صور حقيقية بموافقة أصحابها. النتائج تختلف من شخص لآخر، وليست وعداً بنتيجة.",
    before: "قبل",
    after: "بعد",
    faqLink: "الأسئلة الشائعة",
    featured: "المفضّلة لدينا",
    viewAll: "كل المجموعة",
    details: "التفاصيل",
    shippingLine: "شحن لكل دول العالم. مدة التوصيل وتكلفته تظهر في صفحة الدفع.",
    footer: {
      tagline: "عالم الفتاة في مكان واحد: أجهزة جمال، عناية بالبشرة، ولحظات لكِ وحدك.",
      help: "المساعدة",
      shipping: "الشحن والتوصيل",
      returns: "الاسترجاع والاستبدال",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      contact: "تواصلي معنا",
      company:
        "لمسة علامة تجارية تابعة لشركة لمسة المحدودة (LAMSA LTD)، المسجلة في إنجلترا وويلز برقم 17517932. العنوان المسجل:",
    },
    notFound: "لم نجد هذه الصفحة.",
    backHome: "العودة للرئيسية",
  },
  en: {
    brand: "Lamsa",
    nav: { shop: "Shop", devices: "Devices", skincare: "Skincare", masks: "Masks", about: "Our story" },
    switchLang: "العربية",
    announce: "We ship worldwide",
    shipTo: "Country and currency",
    notInCountry: "Not available in your country yet",
    notInCountryLong: "This item can't ship to the selected country yet. Try another country or contact us.",
    heroTitle: "Your glow is one touch away",
    heroBody:
      "The beauty devices and skincare every girl loves, all in one place. From your morning routine to your evening pamper, Lamsa goes wherever you are.",
    heroCta: "Shop the collection",
    heroSecondary: "Explore devices",
    worldsTitle: "Your world, every detail",
    worlds: {
      devices: { t: "Devices", d: "The salon routine, at home." },
      skincare: { t: "Skincare", d: "Serums and creams for calm, radiant skin." },
      masks: { t: "Masks", d: "A few minutes just for you, every day." },
    },
    manifesto: "For every girl who knows caring for herself isn't a luxury.",
    manifestoBody: "Lamsa means \u201ctouch\u201d in Arabic. We bring a girl\u2019s whole world together: smart beauty tools, everyday care, and small moments that are yours alone.",
    categories: { all: "All", devices: "Devices", skincare: "Skincare", masks: "Masks" },
    shopTitle: "The Lamsa collection",
    from: "From",
    addToCart: "Add to bag",
    adding: "Adding…",
    added: "Added to bag",
    soldOut: "Sold out",
    cart: "Bag",
    cartEmpty: "Your bag is empty. Browse the collection and add what you love.",
    subtotal: "Subtotal",
    checkout: "Checkout",
    checkoutNote: "Shipping and taxes are calculated at checkout.",
    remove: "Remove",
    close: "Close",
    qty: "Quantity",
    checkoutUnavailable: "Checkout isn't available right now. Try again shortly or contact us.",
    whyTitle: "The Lamsa promise",
    why: [
      { t: "Worldwide shipping", d: "We deliver to your door wherever you are, with tracking." },
      { t: "Secure payment", d: "You pay on an encrypted checkout, and your card details never reach us." },
      { t: "14-day returns", d: "If your order arrives damaged or not as described, we replace or refund it." },
      { t: "We listen", d: "Our team answers your messages in Arabic and English." },
    ],
    howTitle: "How ordering from Lamsa works",
    how: [
      { t: "Choose your piece", d: "Browse the collection and read the details. Every product has a clear description of what it does." },
      { t: "Pay securely", d: "An encrypted Shopify checkout. Your card details never reach us." },
      { t: "Track your parcel", d: "We email your tracking number once it ships, and answer any question about your order." },
    ],
    trustStrip: ["Encrypted, secure payment", "Tracking on every order", "14-day returns"],
    reviewsTitle: "What our customers say",
    reviewsNote: "Real reviews from customers who bought from Lamsa. Results vary from person to person.",
    resultsTitle: "Real experiences",
    resultsNote: "Real photos shared with their owners’ consent. Results vary from person to person and are not a promise.",
    before: "Before",
    after: "After",
    faqLink: "FAQ",
    featured: "Our favourites",
    viewAll: "The full collection",
    details: "Details",
    shippingLine: "We ship worldwide. Delivery time and cost are shown at checkout.",
    footer: {
      tagline: "A girl\u2019s world in one place: beauty devices, skincare, and moments just for you.",
      help: "Help",
      shipping: "Shipping & delivery",
      returns: "Returns & exchanges",
      privacy: "Privacy policy",
      terms: "Terms & conditions",
      contact: "Contact us",
      company:
        "Lamsa is a brand of LAMSA LTD, a company registered in England and Wales (Company No. 17517932). Registered office:",
    },
    notFound: "We couldn't find that page.",
    backHome: "Back to home",
  },
} as const;

export type Dict = (typeof dict)["ar"] | (typeof dict)["en"];
export const t = (l: Locale): Dict => dict[l];

const optionNames: Record<string, string> = {
  Color: "اللون",
  Quantity: "الكمية",
  "Needle Size": "حجم الإبرة",
  "NET WT": "الخيار",
  "Net-weight": "الحجم",
  Type: "النوع",
  "Plug Type": "نوع القابس",
};
export const optionLabel = (name: string, l: Locale) =>
  l === "ar" ? optionNames[name] ?? name : name === "NET WT" ? "Option" : name;

const valueRules: [RegExp, string][] = [
  [/^(\d+) Pieces? \(Buy (\d+) Get (\d+) Free\)$/i, "$1 قطع (اشتري $2 واحصلي على $3 مجاناً)"],
  [/^1 Piece$/i, "قطعة واحدة"],
  [/^(\d+) Pieces$/i, "$1 قطع"],
  [/^1 Box \+ Eye Cream$/i, "علبة + كريم عين"],
  [/^1 Box$/i, "علبة واحدة"],
  [/^(\d+) Boxes$/i, "$1 علب"],
  [/^Standard$/i, "عادي"],
  [/^Purple$/i, "بنفسجي"], [/^Green$/i, "أخضر"], [/^Yellow$/i, "أصفر"], [/^Pink$/i, "وردي"],
  [/^Blue$/i, "أزرق"], [/^White$/i, "أبيض"], [/^Black$/i, "أسود"],
  [/^Hyaluronic acid$/i, "هيالورونيك"], [/^Rose$/i, "ورد"], [/^Nicotinamide$/i, "نياسيناميد"],
  [/^Astaxanthin$/i, "أستازانثين"], [/^Proxylane$/i, "بروكسيلان"],
];
export function optionValueLabel(value: string, l: Locale) {
  if (l !== "ar") return value;
  for (const [re, out] of valueRules) if (re.test(value)) return value.replace(re, out);
  return value;
}

export function formatPrice(amount: string | number, currency: string, l: Locale) {
  return new Intl.NumberFormat(l === "ar" ? "ar-AE" : "en-AE", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(Number(amount));
}
