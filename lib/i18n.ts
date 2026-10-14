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
    nav: { shop: "المتجر", devices: "الأجهزة", skincare: "العناية", masks: "الماسكات", about: "عن لمسة" },
    switchLang: "English",
    heroTitle: "عناية تحسّين فيها",
    heroBody:
      "أجهزة تجميل وعناية بالبشرة نختارها ونجرّبها قبل ما تنعرض، وتوصلك لباب البيت في الخليج.",
    heroCta: "تسوّقي الآن",
    heroSecondary: "شوفي الأجهزة",
    categories: { all: "الكل", devices: "الأجهزة", skincare: "العناية", masks: "الماسكات" },
    shopTitle: "كل المنتجات",
    from: "من",
    addToCart: "أضيفي للسلة",
    adding: "جاري الإضافة…",
    added: "انضافت للسلة",
    soldOut: "نفدت الكمية",
    cart: "السلة",
    cartEmpty: "سلتك فاضية. تصفّحي المنتجات وأضيفي اللي يعجبك.",
    subtotal: "المجموع",
    checkout: "إتمام الطلب",
    checkoutNote: "الشحن والضريبة بيتحسبوا بصفحة الدفع.",
    remove: "إزالة",
    close: "إغلاق",
    qty: "الكمية",
    checkoutUnavailable: "الدفع مش متاح حالياً. جرّبي بعد شوي أو راسلينا.",
    whyTitle: "ليش لمسة",
    why: [
      { t: "منتجات مجرّبة", d: "نطلب عينات من كل منتج ونجرّبه قبل ما نعرضه." },
      { t: "دفع آمن", d: "الدفع عبر صفحة دفع Shopify المشفّرة." },
      { t: "استرجاع خلال 14 يوم", d: "إذا وصلك المنتج تالف أو مش مطابق، بنرجّعلك أو نبدّله." },
    ],
    featured: "الأكثر طلباً",
    viewAll: "كل المنتجات",
    details: "التفاصيل",
    shippingLine: "الشحن لدول الخليج. مدة التوصيل بتظهر بصفحة الدفع.",
    footer: {
      tagline: "أجهزة تجميل وعناية بالبشرة، مختارة بعناية.",
      help: "المساعدة",
      shipping: "الشحن والتوصيل",
      returns: "الاسترجاع والاستبدال",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      contact: "تواصلي معنا",
      company:
        "لمسة علامة تجارية تابعة لشركة لمسة المحدودة (LAMSA LTD)، المسجلة في إنجلترا وويلز برقم 17517932. العنوان المسجل:",
    },
    notFound: "ما لقينا هالصفحة.",
    backHome: "ارجعي للرئيسية",
  },
  en: {
    brand: "Lamsa",
    nav: { shop: "Shop", devices: "Devices", skincare: "Skincare", masks: "Masks", about: "About" },
    switchLang: "العربية",
    heroTitle: "Care you can feel",
    heroBody:
      "Beauty devices and skincare we sample and test before we list them, delivered to your door across the Gulf.",
    heroCta: "Shop now",
    heroSecondary: "See the devices",
    categories: { all: "All", devices: "Devices", skincare: "Skincare", masks: "Masks" },
    shopTitle: "All products",
    from: "From",
    addToCart: "Add to bag",
    adding: "Adding…",
    added: "Added to bag",
    soldOut: "Sold out",
    cart: "Bag",
    cartEmpty: "Your bag is empty. Browse the shop and add what you like.",
    subtotal: "Subtotal",
    checkout: "Checkout",
    checkoutNote: "Shipping and tax are calculated at checkout.",
    remove: "Remove",
    close: "Close",
    qty: "Quantity",
    checkoutUnavailable: "Checkout isn't available right now. Try again shortly or contact us.",
    whyTitle: "Why Lamsa",
    why: [
      { t: "Tested products", d: "We order samples of every product and try it before we list it." },
      { t: "Secure payment", d: "You pay on Shopify's encrypted checkout." },
      { t: "14-day returns", d: "If your order arrives damaged or not as described, we refund or replace it." },
    ],
    featured: "Most loved",
    viewAll: "All products",
    details: "Details",
    shippingLine: "We ship across the GCC. Delivery time is shown at checkout.",
    footer: {
      tagline: "Beauty devices and skincare, carefully chosen.",
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
