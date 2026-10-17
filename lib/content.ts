// Store-facing copy for each product, in both languages.
// Shopify keeps prices, stock, images and variants; this file keeps the words.
// A product missing here still shows, using its Shopify title and description.

import type { Locale } from "./i18n";

export type Category = "devices" | "skincare" | "masks";

type Copy = { name: string; blurb: string; points: string[] };

export type ProductCopy = {
  category: Category;
  ar: Copy;
  en: Copy;
};

export const productCopy: Record<string, ProductCopy> = {
  "ipl-hair-removal-laser-epilator-for-women-500-000-flash-depilator-pulses-permanent-laser-epilator-painless-hair-removal": {
    category: "devices",
    ar: {
      name: "جهاز لمسة IPL لإزالة الشعر المنزلية",
      blurb: "جهاز يعتمد الضوء النبضي المكثّف لإزالة الشعر في البيت على راحتك، للوجه والجسم.",
      points: [
        "500 ألف ومضة تكفي لاستخدام طويل",
        "5 مستويات طاقة لتختاري المناسب لبشرتك",
        "وضعان: ومضة مفردة أو ومضات متتالية",
        "حساس أمان: يشتغل فقط عند ملامسة الجلد",
        "للساقين، الذراعين، الإبطين، الوجه ومنطقة البكيني",
      ],
    },
    en: {
      name: "Lamsa IPL Home Hair Removal Device",
      blurb: "An intense pulsed light device for removing hair at home, for face and body.",
      points: [
        "500,000 flashes for long-term use",
        "5 energy levels to suit your skin",
        "Two modes: single flash or continuous flash",
        "Safety sensor: only flashes when in contact with skin",
        "Legs, arms, underarms, face and bikini line",
      ],
    },
  },
  "kodo-2026-high-end-customization-ice-laser-hair-removal-laser-epilator-permanent-ipl-painless-photoepilator-4-in-1-face-and-body": {
    category: "devices",
    ar: {
      name: "جهاز IPL لإزالة الشعر 4 في 1",
      blurb: "إزالة الشعر، وتجديد البشرة، وعلاج الحبوب، وتبريد مهدّئ في جهاز واحد للاستخدام في البيت.",
      points: [
        "900 ألف ومضة تكفي لسنوات من الاستخدام",
        "8 مستويات طاقة لتختاري الأريح لبشرتك",
        "للوجه والجسم: الساقين، الذراعين، الإبطين، ومنطقة البكيني",
        "خاصية تبريد تخفّف الإحساس أثناء الجلسة",
      ],
    },
    en: {
      name: "4-in-1 IPL Hair Removal Device",
      blurb: "Hair removal, skin rejuvenation, acne care and a cooling mode in one handheld device for home use.",
      points: [
        "900,000 flashes for years of use",
        "8 energy levels so you can pick what feels comfortable",
        "Face and body: legs, arms, underarms and bikini line",
        "Cooling mode to soften the sensation during a session",
      ],
    },
  },
  "kodo-2026-new-laser-hair-removal-dropshipping-hot-sell-laser-epilator-permanent-ipl-painless-photoepilator-bikini-face-and-body": {
    category: "devices",
    ar: {
      name: "جهاز IPL المحمول لإزالة الشعر",
      blurb: "إزالة الشعر مع وضع مخصص للعناية بالحبوب، بتصميم خفيف سهل الحمل.",
      points: [
        "900 ألف ومضة",
        "8 مستويات طاقة",
        "وضعان: إزالة الشعر (HR) والعناية بالحبوب (FR)",
        "فولتية عالمية 100–240 فولت",
      ],
    },
    en: {
      name: "Portable IPL Hair Removal Device",
      blurb: "Hair removal plus a dedicated acne-care mode, in a light, portable design.",
      points: [
        "900,000 flashes",
        "8 energy levels",
        "Two modes: hair removal (HR) and acne care (FR)",
        "Universal 100–240V voltage",
      ],
    },
  },
  "5pcs-bio-collagen-face-mask-deep-moisturizing-hydrating-overnight-hydrogel-facial-mask-vc-whitening-anti-aging-skincare": {
    category: "masks",
    ar: {
      name: "ماسك الكولاجين الليلي، 5 قطع",
      blurb: "ماسك هيدروجل يرطّب بشرتك وأنتِ نايمة، لتصحي على بشرة ناعمة ومشرقة.",
      points: [
        "ترطيب عميق طوال الليل",
        "يساعد على تنعيم مظهر الخطوط الرفيعة",
        "يساعد على توحيد لون البشرة",
        "5 ماسكات تكفي أسبوعاً كاملاً",
      ],
    },
    en: {
      name: "Bio-Collagen Overnight Mask, 5 pcs",
      blurb: "A hydrogel mask that hydrates while you sleep, so you wake up to softer, brighter-looking skin.",
      points: [
        "Deep overnight hydration",
        "Helps smooth the look of fine lines",
        "Helps even out skin tone",
        "5 masks for a full week",
      ],
    },
  },
  "bio-collagen-collagen-face-mask-face-barrier-repair-soothing-ampoule-essence-moisturizing-refined-pores-mask-korean-skin-care": {
    category: "masks",
    ar: {
      name: "ماسك الكولاجين لإصلاح حاجز البشرة",
      blurb: "ماسك جل لطيف بدون عطر، يرطّب ويهدّئ حتى البشرة الحساسة.",
      points: [
        "خالٍ من العطور والكحول",
        "يرطّب ويمنح البشرة امتلاءً ومرونة",
        "يساعد على تنقية المسام",
        "4 ماسكات بالعبوة، بخمسة ألوان",
      ],
    },
    en: {
      name: "Bio-Collagen Barrier Repair Mask",
      blurb: "A gentle, fragrance-free gel mask that hydrates and soothes, even sensitive skin.",
      points: [
        "Fragrance-free and alcohol-free",
        "Hydrates for plumper, more elastic skin",
        "Helps refine the look of pores",
        "4 masks per pack, in five colours",
      ],
    },
  },
  "wireless-led-mask-7-color-led-face-mask-photon-skin-firming-anti-aging-rejuvenation-beauty-mask-machine": {
    category: "devices",
    ar: {
      name: "ماسك LED بسبعة ألوان، لاسلكي",
      blurb: "جلسات ضوء من 10 إلى 30 دقيقة في البيت، لبشرة أنعم وأكثر إشراقاً.",
      points: [
        "الضوء الأحمر لدعم مرونة البشرة",
        "الضوء الأزرق لتهدئة البشرة",
        "الضوء الأصفر لإشراقة أوضح",
        "لاسلكي وقابل للشحن",
      ],
    },
    en: {
      name: "7-Colour LED Face Mask, Wireless",
      blurb: "10 to 30 minute light sessions at home, for smoother, brighter-looking skin.",
      points: [
        "Red light to support skin elasticity",
        "Blue light to calm the skin",
        "Yellow light for a brighter look",
        "Wireless and rechargeable",
      ],
    },
  },
  "60pcs-box-crystal-collagen-eye-mask-anti-dark-circles-remove-eye-bags-firming-moisturizing-eye-patches-gel-pads-eyes-skin-care": {
    category: "masks",
    ar: {
      name: "لصقات الكولاجين للعين",
      blurb: "لصقات جل تنعش منطقة تحت العين وتخفّف مظهر الانتفاخ والهالات.",
      points: [
        "تخفّف مظهر الهالات والانتفاخ",
        "ترطّب المنطقة الحساسة حول العين",
        "خالية من العطور والكحول",
        "سهلة الاستخدام في أي وقت",
      ],
    },
    en: {
      name: "Crystal Collagen Eye Patches",
      blurb: "Gel patches that refresh the under-eye area and soften the look of puffiness and dark circles.",
      points: [
        "Softens the look of dark circles and puffiness",
        "Hydrates the delicate eye area",
        "Fragrance-free and alcohol-free",
        "Easy to use any time",
      ],
    },
  },
  "pdrn-pink-collagen-capsule-cream-with-niacinamide-cream-for-uneven-skin-tone-lightweight-face-moisturizer-original-korean-cream": {
    category: "skincare",
    ar: {
      name: "كريم الكبسولات PDRN بالنياسيناميد",
      blurb: "مرطّب خفيف يمتص بسرعة، يرطّب ويساعد على توحيد لون البشرة بدون ملمس دهني.",
      points: [
        "ترطيب يدوم طوال اليوم",
        "النياسيناميد يساعد على تفتيح مظهر البقع",
        "يدعم حاجز البشرة",
        "قاعدة مثالية قبل المكياج",
      ],
    },
    en: {
      name: "PDRN Capsule Cream with Niacinamide",
      blurb: "A light, fast-absorbing moisturiser that hydrates and helps even out skin tone, with no greasy feel.",
      points: [
        "All-day hydration",
        "Niacinamide helps fade the look of dark spots",
        "Supports the skin barrier",
        "A smooth base under make-up",
      ],
    },
  },
  "30ml-salmon-pdrn-pink-peptide-glow-facial-serum-dark-spot-care-even-skin-tone-enhance-elasticity-smoothing-firming-adenosine": {
    category: "skincare",
    ar: {
      name: "سيروم PDRN الوردي بالببتيدات، 30 مل",
      blurb: "سيروم خفيف بالورد والببتيدات لبشرة أكثر إشراقاً وتوحّداً.",
      points: [
        "يساعد على توحيد لون البشرة",
        "ترطيب بخلاصة الورد",
        "الببتيدات تدعم مرونة البشرة",
        "يمتص بسرعة تحت المرطّب أو المكياج",
      ],
    },
    en: {
      name: "PDRN Pink Peptide Glow Serum, 30 ml",
      blurb: "A lightweight rose and peptide serum for brighter, more even-looking skin.",
      points: [
        "Helps even out skin tone",
        "Rose extract for hydration",
        "Peptides support skin elasticity",
        "Absorbs quickly under moisturiser or make-up",
      ],
    },
  },
  "540-needles-derma-roller-microneedling-roller-dermaroller-beauty-skin-care-tool-for-lip-boost-hair-face-scalp-beard-0-2mm": {
    category: "devices",
    ar: {
      name: "ديرما رولر 540 إبرة",
      blurb: "أداة يدوية تساعد السيروم على الامتصاص بشكل أفضل، للوجه وفروة الرأس واللحية.",
      points: [
        "مقاسات 0.25 و0.5 مم مناسبة للوجه",
        "مقاسات 1 مم وأكثر للجسم وفروة الرأس",
        "بدون بطاريات أو شحن",
        "عقّميه قبل وبعد كل استخدام",
      ],
    },
    en: {
      name: "540-Needle Derma Roller",
      blurb: "A manual tool that helps serums absorb better, for face, scalp and beard.",
      points: [
        "0.25 and 0.5 mm sizes suit the face",
        "1 mm and above for body and scalp",
        "No batteries or charging",
        "Sanitise before and after each use",
      ],
    },
  },
  "2026-new-micro-molecule-anti-aging-serum-kit-korean-collagen-hyaluronic-acid-hydrate-firm-skin-reduce-fine-lines-shrink-pores": {
    category: "skincare",
    ar: {
      name: "مجموعة سيروم الكولاجين والهيالورونيك",
      blurb: "سيروم يومي بأسلوب كوري يرطّب بعمق ويمنح البشرة مظهراً أنعم وأكثر امتلاءً.",
      points: [
        "حمض الهيالورونيك لترطيب عميق",
        "الكولاجين يساعد على تنعيم مظهر الخطوط",
        "يساعد على تقليل مظهر المسام",
        "مناسب لكل أنواع البشرة",
      ],
    },
    en: {
      name: "Collagen & Hyaluronic Acid Serum Kit",
      blurb: "A daily Korean-style serum that hydrates deeply for smoother, plumper-looking skin.",
      points: [
        "Hyaluronic acid for deep hydration",
        "Collagen helps smooth the look of fine lines",
        "Helps minimise the look of pores",
        "Suits all skin types",
      ],
    },
  },
  "derma-pen-dr-pen-m7-micro-needle-wireless-wired-tattoo-pmu-beauty-device-derma-stamp-face-skin-care-ultima-m7-microneedling": {
    category: "devices",
    ar: {
      name: "ديرما بن Dr. Pen M7",
      blurb: "جهاز ميكرونيدلنغ احترافي بعمق إبرة قابل للتعديل.",
      points: [
        "عمق إبرة قابل للتعديل",
        "يُستخدم مع رؤوس إبر معقّمة تُستبدل بعد كل جلسة",
        "يُنصح باستشارة مختص قبل الاستخدام",
        "قابس بريطاني (UK)",
      ],
    },
    en: {
      name: "Dr. Pen M7 Derma Pen",
      blurb: "A professional microneedling pen with adjustable needle depth.",
      points: [
        "Adjustable needle depth",
        "Use with sterile cartridges, replaced after every session",
        "Speak to a professional before first use",
        "UK plug",
      ],
    },
  },
  "mini-portable-humidifier-facial-steamer-device-beauty-spray-hydrating-apparatus-cold-spray-apparatus-rechargeable-nano-spray": {
    category: "devices",
    ar: {
      name: "بخاخ النانو المرطّب للوجه",
      blurb: "رذاذ بارد ناعم ينعش بشرتك في أي مكان، بحجم الجيب.",
      points: [
        "رذاذ نانو ناعم وبارد",
        "قابل للشحن",
        "مناسب للسفر والمكتب",
        "بأربعة ألوان",
      ],
    },
    en: {
      name: "Nano Mist Facial Sprayer",
      blurb: "A fine, cool mist that refreshes your skin anywhere, small enough for your pocket.",
      points: [
        "Fine, cool nano mist",
        "Rechargeable",
        "Made for travel and the office",
        "Four colours",
      ],
    },
  },
  "2-tools-6-bottles-korean-moisturizing-renewal-set-firming-anti-fine-lines-daily-skin-care-essence": {
    category: "skincare",
    ar: {
      name: "مجموعة التجديد الكورية للترطيب",
      blurb: "روتين يومي متكامل: 6 عبوات وأداتان لبشرة مرطّبة وأكثر تماسكاً.",
      points: [
        "6 عبوات سيروم وأداتان",
        "ترطيب يومي",
        "يساعد على تنعيم مظهر الخطوط الرفيعة",
        "عروض عند شراء أكثر من عبوة",
      ],
    },
    en: {
      name: "Korean Moisturising Renewal Set",
      blurb: "A complete daily routine: 6 bottles and 2 tools for hydrated, firmer-looking skin.",
      points: [
        "6 serum bottles and 2 tools",
        "Daily hydration",
        "Helps smooth the look of fine lines",
        "Multi-buy offers available",
      ],
    },
  },
  "hyaluronic-acid-serum-anti-aging-moisturizing-shrink-pores-hydrating-whitening-essence-for-microneedle-instruments-skin-care": {
    category: "skincare",
    ar: {
      name: "سيروم الهيالورونيك للميكرونيدلنغ",
      blurb: "سيروم بخمس تركيبات، مصمم للاستخدام مع الديرما رولر والديرما بن.",
      points: [
        "خمس تركيبات للاختيار",
        "يرطّب ويساعد على تقليل مظهر المسام",
        "مناسب بعد جلسات الميكرونيدلنغ",
        "حاصل على شهادة CPNP",
      ],
    },
    en: {
      name: "Hyaluronic Serum for Microneedling",
      blurb: "A serum in five formulas, made to use with derma rollers and derma pens.",
      points: [
        "Five formulas to choose from",
        "Hydrates and helps minimise the look of pores",
        "Suited to after microneedling sessions",
        "CPNP certified",
      ],
    },
  },
  "hyaluronic-acid-face-serum-essence-skin-repair-rejuvenation-firming-moisturizing-hydrating-anti-aging": {
    category: "skincare",
    ar: {
      name: "سيروم الهيالورونيك للترطيب",
      blurb: "سيروم مرطّب خفيف بحجمين، للاستخدام اليومي.",
      points: [
        "ترطيب خفيف للاستخدام اليومي",
        "متوفر بحجم 10 و50 مل",
        "مناسب لكل أنواع البشرة",
        "يمتص بسرعة",
      ],
    },
    en: {
      name: "Hyaluronic Hydrating Serum",
      blurb: "A light hydrating serum in two sizes, for everyday use.",
      points: [
        "Light everyday hydration",
        "Available in 10 ml and 50 ml",
        "Suits all skin types",
        "Absorbs quickly",
      ],
    },
  },
};

export function copyFor(handle: string, locale: Locale) {
  const c = productCopy[handle];
  return c ? { ...c[locale], category: c.category } : null;
}
