import { site } from "./site";
import type { Locale } from "./i18n";

type Block = { h?: string; p?: string[]; ul?: string[] };
type Page = { title: string; blocks: Block[] };

const c = site.company;
const email = site.contactEmail;

export const pages: Record<string, Record<Locale, Page>> = {
  about: {
    ar: {
      title: "عن لمسة",
      blocks: [
        { p: [
          "لمسة متجر أونلاين لأجهزة التجميل ومنتجات العناية بالبشرة، بنختار منتجاته لعميلاتنا بالخليج.",
          "قبل ما نعرض أي منتج، بنطلب منه عينة ونجرّبه بنفسنا. اللي ما بيعجبنا ما بنبيعه.",
        ] },
        { h: "مين ورا لمسة", p: [`لمسة علامة تجارية تابعة لشركة ${c.name}، المسجلة في إنجلترا وويلز برقم ${c.number}.`] },
      ],
    },
    en: {
      title: "About Lamsa",
      blocks: [
        { p: [
          "Lamsa is an online shop for beauty devices and skincare, chosen for customers across the Gulf.",
          "Before we list anything, we order a sample and try it ourselves. If we don't like it, we don't sell it.",
        ] },
        { h: "Who runs Lamsa", p: [`Lamsa is a brand of ${c.name}, a company registered in England and Wales (Company No. ${c.number}).`] },
      ],
    },
  },
  shipping: {
    ar: {
      title: "الشحن والتوصيل",
      blocks: [
        { p: [
          "بنشحن لدول الخليج: الإمارات، السعودية، الكويت، قطر، البحرين، وعُمان.",
          `أغلب الطلبات بتوصل خلال ${site.shippingDays.ar} من تأكيد الطلب. مدة التوصيل وتكلفته بتظهر قبل ما تدفعي.`,
          "بعد ما يتشحن طلبك، بنبعتلك رقم تتبّع على الإيميل.",
        ] },
        { h: "إذا تأخر طلبك", p: [`راسلينا على ${email} برقم الطلب، وبنتابع مع شركة الشحن.`] },
      ],
    },
    en: {
      title: "Shipping & delivery",
      blocks: [
        { p: [
          "We ship across the GCC: UAE, Saudi Arabia, Kuwait, Qatar, Bahrain and Oman.",
          `Most orders arrive within ${site.shippingDays.en} of confirmation. You'll see the delivery time and cost before you pay.`,
          "Once your order ships, we email you a tracking number.",
        ] },
        { h: "If your order is late", p: [`Email ${email} with your order number and we'll chase the carrier.`] },
      ],
    },
  },
  returns: {
    ar: {
      title: "الاسترجاع والاستبدال",
      blocks: [
        { h: "منتج تالف أو غير مطابق", p: [
          `إذا وصلك المنتج تالف أو مختلف عن الوصف، راسلينا خلال ${site.returnDays} يوم من الاستلام مع صور، وبنرجّعلك المبلغ أو نبدّله بدون أي تكلفة عليكِ.`,
        ] },
        { h: "إذا غيّرتي رأيك", p: [
          `بتقدري ترجّعي المنتج خلال ${site.returnDays} يوم من الاستلام إذا كان مغلّف وما انفتح. تكلفة شحن الإرجاع عليكِ، وبنرجّعلك ثمن المنتج بعد ما يوصلنا.`,
          "لأسباب صحية، ما بنقدر نقبل إرجاع منتجات العناية بالبشرة والأجهزة اللي انفتحت أو انستخدمت، إلا إذا كانت تالفة.",
        ] },
        { h: "كيف ترجّعي", p: [`ابعتيلنا على ${email} رقم الطلب وسبب الإرجاع، وبنرد عليكِ بالخطوات.`] },
      ],
    },
    en: {
      title: "Returns & exchanges",
      blocks: [
        { h: "Damaged or not as described", p: [
          `If your item arrives damaged or different from its description, email us within ${site.returnDays} days of delivery with photos and we'll refund or replace it at no cost to you.`,
        ] },
        { h: "Changed your mind", p: [
          `You can return an item within ${site.returnDays} days of delivery if it's sealed and unopened. Return shipping is on you, and we refund the item once it reaches us.`,
          "For hygiene reasons we can't take back opened or used skincare or devices unless they're faulty.",
        ] },
        { h: "How to return", p: [`Email ${email} with your order number and the reason, and we'll reply with the steps.`] },
      ],
    },
  },
  privacy: {
    ar: {
      title: "سياسة الخصوصية",
      blocks: [
        { p: [`هاد الموقع تديره شركة ${c.name}، ${c.office}.`] },
        { h: "شو بنجمع", ul: ["اسمك وعنوانك وإيميلك ورقمك، لما تطلبي", "تفاصيل الطلب", "بيانات الدفع بتتعامل معها Shopify مباشرة، وما بتوصلنا أرقام البطاقات"] },
        { h: "ليش", ul: ["لتجهيز طلبك وشحنه", "للتواصل معكِ بخصوص الطلب", "للالتزام بالقوانين المحاسبية والضريبية"] },
        { h: "مع مين بنشاركها", p: ["مع Shopify (منصة المتجر والدفع)، وشركات الشحن، والموردين اللي بيجهّزوا طلبك، وبس بالقدر اللازم."] },
        { h: "حقوقك", p: [`بتقدري تطلبي نسخة من بياناتك أو تعديلها أو حذفها بأي وقت على ${email}.`] },
      ],
    },
    en: {
      title: "Privacy policy",
      blocks: [
        { p: [`This site is operated by ${c.name}, ${c.office}.`] },
        { h: "What we collect", ul: ["Your name, address, email and phone when you order", "Your order details", "Payment details are handled directly by Shopify; we never see card numbers"] },
        { h: "Why", ul: ["To prepare and ship your order", "To contact you about your order", "To meet accounting and tax obligations"] },
        { h: "Who we share it with", p: ["Shopify (our store and checkout platform), carriers, and the suppliers who fulfil your order, only as far as needed."] },
        { h: "Your rights", p: [`You can ask for a copy of your data, a correction, or deletion at any time at ${email}.`] },
      ],
    },
  },
  terms: {
    ar: {
      title: "الشروط والأحكام",
      blocks: [
        { p: [`هاد المتجر تديره شركة ${c.name}، المسجلة في إنجلترا وويلز برقم ${c.number}. بشرائك من الموقع، بتوافقي على هالشروط.`] },
        { h: "الأسعار والدفع", p: ["الأسعار بالدرهم الإماراتي. الشحن والضرائب، إن وجدت، بتظهر بصفحة الدفع قبل ما تأكدي الطلب."] },
        { h: "استخدام الأجهزة", p: ["اقرئي دليل الاستخدام قبل أول استخدام. أجهزة IPL والميكرونيدلنغ مش مناسبة لكل أنواع البشرة أو الحالات الصحية؛ إذا عندك أي حالة صحية أو حامل، استشيري طبيب قبل الاستخدام."] },
        { h: "القانون", p: ["تخضع هالشروط لقوانين إنجلترا وويلز، بدون ما يأثر هاد على أي حقوق بتعطيكِ إياها قوانين حماية المستهلك ببلدك."] },
      ],
    },
    en: {
      title: "Terms & conditions",
      blocks: [
        { p: [`This shop is operated by ${c.name}, registered in England and Wales (Company No. ${c.number}). By ordering, you agree to these terms.`] },
        { h: "Prices and payment", p: ["Prices are in UAE dirhams. Shipping and any taxes are shown at checkout before you confirm your order."] },
        { h: "Using the devices", p: ["Read the manual before first use. IPL and microneedling devices aren't suitable for every skin type or health condition; if you have a medical condition or are pregnant, speak to a doctor first."] },
        { h: "Law", p: ["These terms are governed by the laws of England and Wales, without affecting any rights your local consumer law gives you."] },
      ],
    },
  },
  contact: {
    ar: {
      title: "تواصلي معنا",
      blocks: [
        { p: [`راسلينا على ${email}، وبنرد خلال يوم إلى يومين عمل.`, "إذا سؤالك عن طلب، اكتبي رقم الطلب."] },
        { h: "الشركة", p: [`${c.name}، ${c.office}. رقم الشركة: ${c.number}.`] },
      ],
    },
    en: {
      title: "Contact us",
      blocks: [
        { p: [`Email ${email} and we'll reply within one to two business days.`, "If it's about an order, include your order number."] },
        { h: "Company", p: [`${c.name}, ${c.office}. Company No. ${c.number}.`] },
      ],
    },
  },
};
