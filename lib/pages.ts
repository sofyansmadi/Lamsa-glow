import { site } from "./site";
import type { Locale } from "./i18n";

type Block = { h?: string; p?: string[]; ul?: string[] };
type Page = { title: string; blocks: Block[] };

const c = site.company;
const email = site.contactEmail;

export const pages: Record<string, Record<Locale, Page>> = {
  about: {
    ar: {
      title: "قصتنا",
      blocks: [
        { p: [
          "«لمسة» كلمة صغيرة تحمل الكثير: لمسة عناية في الصباح، لمسة دلال في المساء، ولمسة ثقة ترافقك طوال اليوم.",
          "من هنا بدأت لمسة: علامة تجمع عالم الفتاة في مكان واحد. أجهزة جمال ذكية تنقل روتين الصالون إلى بيتك، ومنتجات عناية بالبشرة لكل يوم، وماسكات تمنحك دقائق تخصك وحدك.",
        ] },
        { h: "ما نؤمن به", ul: [
          "الاهتمام بنفسك ليس رفاهية، بل عادة تستحقينها كل يوم",
          "الجمال يبدأ من الراحة: منتجات سهلة الاستخدام تناسب يومك",
          "أينما كنتِ في العالم، يجب أن يصلك ما تحبين",
        ] },
        { h: "من وراء لمسة", p: [`لمسة علامة تجارية تابعة لشركة ${c.name}، المسجلة في إنجلترا وويلز برقم ${c.number}.`] },
      ],
    },
    en: {
      title: "Our story",
      blocks: [
        { p: [
          "Lamsa means “touch” in Arabic. A touch of care in the morning, a touch of pampering at night, and a touch of confidence that stays with you all day.",
          "That’s where Lamsa began: one brand that brings a girl’s whole world together. Smart beauty devices that bring the salon routine home, skincare for every day, and masks that give you a few minutes that are yours alone.",
        ] },
        { h: "What we believe", ul: [
          "Caring for yourself isn’t a luxury; it’s a habit you deserve every day",
          "Beauty starts with ease: products that fit into your day",
          "Wherever you are in the world, what you love should reach you",
        ] },
        { h: "Who’s behind Lamsa", p: [`Lamsa is a brand of ${c.name}, a company registered in England and Wales (Company No. ${c.number}).`] },
      ],
    },
  },
  shipping: {
    ar: {
      title: "الشحن والتوصيل",
      blocks: [
        { p: [
          "نشحن إلى معظم دول العالم. أدخلي عنوانك في صفحة الدفع وستظهر لك تكلفة الشحن ومدته قبل أن تدفعي.",
          `تصل معظم الطلبات خلال ${site.shippingDays.ar} من تأكيد الطلب، وقد تختلف المدة حسب البلد.`,
          "بعد شحن طلبك، نرسل لك رقم التتبّع على بريدك الإلكتروني.",
        ] },
        { h: "الجمارك والرسوم", p: ["في بعض الدول قد تفرض الجمارك رسوماً أو ضرائب عند الاستلام. هذه الرسوم يحددها بلد الوصول، ولا تدخل ضمن سعر الطلب."] },
        { h: "إذا تأخر طلبك", p: [`راسلينا على ${email} مع رقم الطلب، وسنتابع مع شركة الشحن.`] },
      ],
    },
    en: {
      title: "Shipping & delivery",
      blocks: [
        { p: [
          "We ship to most countries worldwide. Enter your address at checkout to see the shipping cost and delivery time before you pay.",
          `Most orders arrive within ${site.shippingDays.en} of confirmation; times vary by country.`,
          "Once your order ships, we email you a tracking number.",
        ] },
        { h: "Customs and duties", p: ["Some countries charge import duties or taxes on delivery. These are set by the destination country and aren’t included in your order total."] },
        { h: "If your order is late", p: [`Email ${email} with your order number and we’ll chase the carrier.`] },
      ],
    },
  },
  returns: {
    ar: {
      title: "الاسترجاع والاستبدال",
      blocks: [
        { h: "منتج تالف أو غير مطابق", p: [
          `إذا وصلك المنتج تالفاً أو مختلفاً عن الوصف، راسلينا خلال ${site.returnDays} يوماً من الاستلام مع صور، وسنستبدله أو نعيد لك المبلغ دون أي تكلفة عليكِ.`,
        ] },
        { h: "إذا غيّرتِ رأيك", p: [
          `يمكنك إرجاع المنتج خلال ${site.returnDays} يوماً من الاستلام إذا كان مغلّفاً ولم يُفتح. تكلفة شحن الإرجاع عليكِ، ونعيد لك ثمن المنتج بعد وصوله إلينا.`,
          "لأسباب صحية، لا نقبل إرجاع منتجات العناية والأجهزة بعد فتحها أو استخدامها، إلا إذا كانت معيبة.",
        ] },
        { h: "كيف تُرجعين طلبك", p: [`أرسلي لنا على ${email} رقم الطلب وسبب الإرجاع، وسنرد عليكِ بالخطوات.`] },
      ],
    },
    en: {
      title: "Returns & exchanges",
      blocks: [
        { h: "Damaged or not as described", p: [
          `If your item arrives damaged or different from its description, email us within ${site.returnDays} days of delivery with photos and we’ll replace or refund it at no cost to you.`,
        ] },
        { h: "Changed your mind", p: [
          `You can return an item within ${site.returnDays} days of delivery if it’s sealed and unopened. Return shipping is on you, and we refund the item once it reaches us.`,
          "For hygiene reasons we can’t take back opened or used skincare or devices unless they’re faulty.",
        ] },
        { h: "How to return", p: [`Email ${email} with your order number and the reason, and we’ll reply with the steps.`] },
      ],
    },
  },
  faq: {
    ar: {
      title: "الأسئلة الشائعة",
      blocks: [
        { h: "كم يستغرق التوصيل؟", p: [`عادةً ${site.shippingDays.ar} من تأكيد الطلب، وتختلف المدة حسب البلد. تظهر التكلفة والمدة في صفحة الدفع قبل أن تدفعي.`] },
        { h: "هل أستطيع تتبّع طلبي؟", p: ["نعم. نرسل لك رقم التتبّع على بريدك الإلكتروني بعد شحن الطلب."] },
        { h: "هل الدفع آمن؟", p: ["تدفعين عبر صفحة دفع مشفّرة من Shopify. بيانات البطاقة تعالجها Shopify مباشرة ولا تصلنا."] },
        { h: "ماذا لو وصلني المنتج تالفاً؟", p: [`راسلينا خلال ${site.returnDays} يوماً من الاستلام مع صور، وسنستبدله أو نعيد لك المبلغ. التفاصيل في صفحة الاسترجاع.`] },
        { h: "هل الأجهزة مناسبة لكل بشرة؟", p: ["لا. أجهزة IPL والإبر الدقيقة لا تناسب كل أنواع البشرة أو الحالات الصحية. اقرئي دليل الاستخدام، وإذا كانت لديكِ حالة صحية أو كنتِ حاملاً أو تستخدمين أدوية للبشرة، استشيري طبيباً قبل الاستخدام."] },
        { h: "هل النتائج مضمونة؟", p: ["لا نعد بنتائج محددة. تختلف النتائج من شخص لآخر حسب نوع البشرة والشعر وانتظام الاستخدام."] },
        { h: "كيف أتواصل معكم؟", p: [`راسلينا على ${email} ونرد خلال يوم إلى يومي عمل.`] },
      ],
    },
    en: {
      title: "FAQ",
      blocks: [
        { h: "How long does delivery take?", p: [`Usually ${site.shippingDays.en} from confirmation; it varies by country. The cost and time are shown at checkout before you pay.`] },
        { h: "Can I track my order?", p: ["Yes. We email you a tracking number once your order ships."] },
        { h: "Is payment secure?", p: ["You pay on an encrypted Shopify checkout. Card details are handled directly by Shopify and never reach us."] },
        { h: "What if my item arrives damaged?", p: [`Email us within ${site.returnDays} days of delivery with photos and we’ll replace or refund it. Details are on the Returns page.`] },
        { h: "Are the devices suitable for every skin?", p: ["No. IPL and microneedling devices aren’t suitable for every skin type or health condition. Read the manual, and if you have a medical condition, are pregnant, or use prescription skin treatments, speak to a doctor first."] },
        { h: "Are results guaranteed?", p: ["We don’t promise specific results. Results vary from person to person depending on skin, hair and how regularly you use the product."] },
        { h: "How do I reach you?", p: [`Email ${email} and we’ll reply within one to two business days.`] },
      ],
    },
  },
  privacy: {
    ar: {
      title: "سياسة الخصوصية",
      blocks: [
        { p: [`يدير هذا الموقع شركة ${c.name}، ${c.office}.`] },
        { h: "ما الذي نجمعه", ul: ["اسمك وعنوانك وبريدك الإلكتروني ورقم هاتفك عند الطلب", "تفاصيل الطلب", "بيانات الدفع تعالجها Shopify مباشرة، ولا تصلنا أرقام البطاقات"] },
        { h: "لماذا", ul: ["لتجهيز طلبك وشحنه", "للتواصل معكِ بخصوص طلبك", "للالتزام بالقوانين المحاسبية والضريبية"] },
        { h: "مع من نشاركها", p: ["مع Shopify (منصة المتجر والدفع)، وشركات الشحن، والشركاء الذين يجهّزون طلبك، وبالقدر اللازم فقط."] },
        { h: "حقوقك", p: [`يمكنك طلب نسخة من بياناتك أو تعديلها أو حذفها في أي وقت عبر ${email}.`] },
      ],
    },
    en: {
      title: "Privacy policy",
      blocks: [
        { p: [`This site is operated by ${c.name}, ${c.office}.`] },
        { h: "What we collect", ul: ["Your name, address, email and phone when you order", "Your order details", "Payment details are handled directly by Shopify; we never see card numbers"] },
        { h: "Why", ul: ["To prepare and ship your order", "To contact you about your order", "To meet accounting and tax obligations"] },
        { h: "Who we share it with", p: ["Shopify (our store and checkout platform), carriers, and the partners who prepare your order, only as far as needed."] },
        { h: "Your rights", p: [`You can ask for a copy of your data, a correction, or deletion at any time at ${email}.`] },
      ],
    },
  },
  terms: {
    ar: {
      title: "الشروط والأحكام",
      blocks: [
        { p: [`يدير هذا المتجر شركة ${c.name}، المسجلة في إنجلترا وويلز برقم ${c.number}. بشرائك من الموقع، فإنك توافقين على هذه الشروط.`] },
        { h: "الأسعار والدفع", p: ["تظهر الأسعار وتكلفة الشحن والضرائب، إن وجدت، في صفحة الدفع قبل تأكيد الطلب."] },
        { h: "استخدام الأجهزة", p: ["اقرئي دليل الاستخدام قبل أول استخدام. أجهزة IPL والميكرونيدلنغ لا تناسب كل أنواع البشرة أو الحالات الصحية؛ إذا كانت لديكِ حالة صحية أو كنتِ حاملاً، استشيري طبيباً قبل الاستخدام."] },
        { h: "القانون", p: ["تخضع هذه الشروط لقوانين إنجلترا وويلز، دون المساس بأي حقوق تمنحك إياها قوانين حماية المستهلك في بلدك."] },
      ],
    },
    en: {
      title: "Terms & conditions",
      blocks: [
        { p: [`This shop is operated by ${c.name}, registered in England and Wales (Company No. ${c.number}). By ordering, you agree to these terms.`] },
        { h: "Prices and payment", p: ["Prices, shipping and any taxes are shown at checkout before you confirm your order."] },
        { h: "Using the devices", p: ["Read the manual before first use. IPL and microneedling devices aren't suitable for every skin type or health condition; if you have a medical condition or are pregnant, speak to a doctor first."] },
        { h: "Law", p: ["These terms are governed by the laws of England and Wales, without affecting any rights your local consumer law gives you."] },
      ],
    },
  },
  contact: {
    ar: {
      title: "تواصلي معنا",
      blocks: [
        { p: [`راسلينا على ${email}، ونرد خلال يوم إلى يومي عمل.`, "إذا كان سؤالك عن طلب، اكتبي رقم الطلب."] },
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
