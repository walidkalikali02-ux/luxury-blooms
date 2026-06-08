import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getSupabase } from "@/lib/supabase";
import type { Product } from "@/lib/supabase";

/* ── data ─────────────────────────────────── */

async function getFeatured(): Promise<Product[]> {
  try {
    const sb = getSupabase();
    if (!sb) return [];
    const { data, error } = await sb
      .from("products")
      .select("*")
      .eq("is_featured", true)
      .eq("in_stock", true)
      .limit(6);
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

const PLACEHOLDERS: Product[] = [
  { id: 1, name_ar: "باقة الورد الملكي",     name_en: "Royal Rose Bouquet", description_ar: "", description_en: "", price: 250, currency: "QAR", image_url: "https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=800&fit=crop", category: "باقات الورود",    in_stock: true,  is_featured: true, created_at: "" },
  { id: 2, name_ar: "ترتيب الأوركيد",        name_en: "Luxury Orchid",      description_ar: "", description_en: "", price: 380, currency: "QAR", image_url: "https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=800&h=800&fit=crop", category: "الباقات الملكية", in_stock: true,  is_featured: true, created_at: "" },
  { id: 3, name_ar: "إكليل العروس",          name_en: "Bridal Crown",       description_ar: "", description_en: "", price: 550, currency: "QAR", image_url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=800&fit=crop", category: "زهور عروس",      in_stock: true,  is_featured: true, created_at: "" },
  { id: 4, name_ar: "باقة الياسمين",         name_en: "Evening Jasmine",    description_ar: "", description_en: "", price: 180, currency: "QAR", image_url: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=800&h=800&fit=crop", category: "باقات الورود",    in_stock: true,  is_featured: true, created_at: "" },
  { id: 5, name_ar: "تشكيلة الأزرق الهادئ",  name_en: "Calm Blue Edit",     description_ar: "", description_en: "", price: 650, currency: "QAR", image_url: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&h=800&fit=crop", category: "الباقات الملكية", in_stock: true,  is_featured: true, created_at: "" },
  { id: 6, name_ar: "صندوق الزهور الفاخر",   name_en: "Floral Gift Box",    description_ar: "", description_en: "", price: 420, currency: "QAR", image_url: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=800&fit=crop", category: "هدايا فاخرة",    in_stock: true,  is_featured: true, created_at: "" },
];

const STATS = [
  { num: "+٥٠٠",   label: "باقة مُسلَّمة" },
  { num: "+٢٠٠",   label: "عميل موثوق" },
  { num: "يومياً", label: "زهور طازجة" },
  { num: "٢٤h",    label: "توصيل سريع" },
];

const HERO_FEATURES = [
  "زهور طازجة تُختار يومياً",
  "تنسيق فردي لكل باقة",
  "تغليف فاخر بالأزرق",
  "توصيل سريع داخل قطر",
];

const STORY_POINTS = [
  "نختار كل زهرة بعناية فائقة من أفضل المزارع",
  "نُنسّقها بأيدي مصمّمين متخصّصين في الأتيليه",
  "نحافظ على طزاجتها حتى تصل بين يديك",
  "خدمة شخصية تعكس ذوقك الراقي",
];

const TICKER = [
  "زهور طازجة يومياً",     "Fresh Daily",
  "تغليف أزرق فاخر",       "Signature Blue",
  "تنسيق خاص",             "Bespoke Atelier",
  "توصيل في نفس اليوم",    "Same-day Delivery",
  "أعراس وفعاليات",        "Weddings & Events",
];

/* ── page ─────────────────────────────────── */

export default async function HomePage() {
  const featured = await getFeatured();
  const products = featured.length ? featured : PLACEHOLDERS;

  return (
    <>
      <Navbar />

      <main className="pt-20 md:pt-24">
        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-32 -right-32 h-[36rem] w-[36rem] rounded-full bg-[var(--blue)]/8 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-[var(--blue-light)]/12 blur-[110px]" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--blue)] to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
            <div dir="rtl" className="flex flex-col gap-6">
              <div className="fade-up flex items-center gap-3">
                <span className="h-px w-12 bg-blue" />
                <span className="text-[10px] tracking-[0.48em] uppercase text-blue">
                  Blue Blooms Atelier · الدوحة
                </span>
              </div>

              <h1 className="fade-up-2 font-display text-[clamp(2.8rem,7vw,5.6rem)] font-medium leading-[1.05] text-charcoal">
                زهور فاخرة
                <br />
                بطابع أزرق
                <br />
                <span className="text-blue">هادئ ومترف</span>
              </h1>

              <p className="fade-up-3 max-w-xl text-base leading-loose text-[var(--charcoal)]/70 sm:text-lg">
                باقات مُصمَّمة بدقّة لتعبّر عن أرقى المناسبات، بذوق هادئ وألوان
                محكومة تدوم في الذاكرة طويلاً.
              </p>

              <div className="fade-up-3 mt-2 flex flex-col gap-2.5">
                {HERO_FEATURES.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 text-sm text-[var(--charcoal)]/65"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="fade-up-4 mt-4 flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-blue px-8 py-4 text-[11px] tracking-[0.32em] uppercase text-cream font-medium hover:bg-blue-deep transition-colors shadow-[0_18px_44px_rgba(31,95,255,0.22)]"
                >
                  تسوّق الآن
                </Link>
                <Link
                  href="/#events"
                  className="inline-flex items-center gap-2 border border-[var(--blue)]/30 bg-white px-8 py-4 text-[11px] tracking-[0.32em] uppercase text-charcoal hover:border-blue hover:text-blue transition-colors"
                >
                  خدمة الفعاليات
                </Link>
              </div>
            </div>

            {/* image column */}
            <div className="relative">
              <div
                data-surface
                className="relative aspect-[4/5] overflow-hidden bg-blue-ghost border border-[var(--line)]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=900&h=1200&fit=crop"
                  alt="Luxury blue floral arrangement"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,24,47,0.35)] via-transparent to-transparent" />
                <span className="absolute top-3 right-3 h-5 w-5 border-t border-r border-[var(--cream)]/70" />
                <span className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-[var(--cream)]/70" />
              </div>

              <div
                data-surface
                className="absolute -bottom-6 left-0 sm:-left-6 bg-white border border-[var(--line)] px-5 py-4 max-w-[15rem]"
                dir="rtl"
              >
                <p className="text-[9px] tracking-[0.42em] uppercase text-blue">
                  Signature
                </p>
                <p className="mt-1 font-display text-xl text-charcoal">
                  تشكيلة الأزرق الهادئ
                </p>
                <p className="mt-1 text-[10px] tracking-[0.28em] uppercase text-[var(--charcoal)]/45">
                  650 QAR
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            MARQUEE
        ════════════════════════════════════════ */}
        <div className="bg-charcoal py-3.5 marquee-wrap select-none border-y border-[var(--blue)]/30">
          <div className="marquee-inner">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-5">
                <span className="text-[10px] tracking-[0.42em] uppercase text-[var(--cream)]/85 whitespace-nowrap">
                  {t}
                </span>
                <span className="h-1 w-1 rounded-full bg-blue flex-shrink-0" />
              </span>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════
            STATS BAR
        ════════════════════════════════════════ */}
        <section className="border-b border-[var(--line)] bg-[rgba(244,248,255,0.6)] backdrop-blur-sm">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--line)] rtl:divide-x-reverse">
            {STATS.map((s) => (
              <div key={s.label} className="text-center py-10 px-4" dir="rtl">
                <p className="font-display text-3xl font-medium text-charcoal mb-2">
                  {s.num}
                </p>
                <p className="text-[10px] tracking-[0.4em] uppercase text-blue">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            FEATURED PRODUCTS
        ════════════════════════════════════════ */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12" dir="rtl">
            <div>
              <p className="text-[10px] tracking-[0.42em] uppercase text-blue mb-3">
                Our Selection · مختاراتنا
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-medium text-charcoal leading-tight">
                باقات مميزة
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-flex items-center gap-2 text-[10px] tracking-[0.32em] uppercase text-charcoal border-b border-charcoal pb-1 hover:text-blue hover:border-blue transition-colors"
            >
              عرض الكل
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {products.slice(0, 6).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/products"
              className="inline-block text-[10px] tracking-[0.32em] uppercase text-charcoal border-b border-charcoal pb-1 hover:text-blue hover:border-blue transition-colors"
            >
              عرض الكل
            </Link>
          </div>
        </section>

        {/* ════════════════════════════════════════
            ABOUT STORY — dark
        ════════════════════════════════════════ */}
        <section id="about" className="relative bg-charcoal overflow-hidden">
          <div className="pointer-events-none absolute top-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[var(--blue)]/18 blur-[140px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-[22rem] w-[22rem] rounded-full bg-[var(--blue-light)]/12 blur-[120px]" />

          <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-16 items-center">
            <div className="hidden md:flex flex-col items-center justify-center gap-6">
              <span className="w-px h-24 bg-blue/40" />
              <span className="font-display text-blue text-7xl select-none leading-none">
                ❀
              </span>
              <span className="w-px h-24 bg-blue/40" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-blue/60 [writing-mode:vertical-rl]">
                Since 2020
              </span>
            </div>

            <div dir="rtl">
              <p className="text-[10px] tracking-[0.5em] uppercase text-blue-light mb-4">
                Our Story · قصتنا
              </p>
              <p className="font-display text-cream text-2xl md:text-3xl leading-[1.4] mb-8">
                بدأت رحلتنا بشغف لتقديم الأجمل، نختار كل زهرة بعناية ونُنسّقها
                بأيدي مصمّمين متخصّصين.
              </p>
              <p className="text-[var(--cream)]/55 leading-loose text-sm mb-6">
                نؤمن بأن الزهور لغة هادئة قادرة على التعبير عمّا تعجز الكلمات
                عن قوله. من باقة صغيرة إلى تنسيق عرس كامل، نُقدّم لك خدمة شخصية
                تعكس ذوقك الراقي بكل تفاصيله.
              </p>
              <p className="text-[var(--cream)]/55 leading-loose text-sm">
                كل تصميم هو قصة، وكل زهرة كلمة في تلك القصة.
              </p>

              <div className="mt-10 flex items-center gap-4">
                <span className="h-px w-10 bg-blue" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-blue-light">
                  Blue Blooms — Since 2020
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            PROMISE — split panel
        ════════════════════════════════════════ */}
        <section
          className="py-20 md:py-28 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center"
          dir="rtl"
        >
          <div>
            <p className="text-[10px] tracking-[0.42em] uppercase text-blue mb-3">
              Our Promise · وعدنا
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-medium text-charcoal leading-tight mb-6">
              تجربة شراء أبسط،
              <br />
              صورة نهائية أرقى
            </h2>
            <p className="text-base text-[var(--charcoal)]/65 leading-loose mb-8 max-w-md">
              صممنا تجربتنا لتكون خفيفة، واضحة، ومركزة على المنتج. لا ضوضاء
              بصرية، لا عناصر زائدة — فقط زهور تظهر بثقة.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-charcoal px-8 py-4 text-[11px] tracking-[0.32em] uppercase text-cream hover:bg-charcoal-light transition-colors"
            >
              اكتشف المجموعة
            </Link>
          </div>

          <div
            data-surface
            className="relative bg-white border border-[var(--line)] p-10 overflow-hidden"
          >
            <span className="absolute top-0 right-0 h-12 w-12 border-t border-r border-blue" />
            <span className="absolute bottom-0 left-0 h-12 w-12 border-b border-l border-blue" />
            <div className="relative z-10 space-y-5">
              {STORY_POINTS.map((point, i) => (
                <div key={point} className="flex items-start gap-4">
                  <span className="mt-0.5 font-display text-sm text-blue tracking-widest">
                    0{i + 1}
                  </span>
                  <p className="text-sm text-[var(--charcoal)]/75 leading-loose">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            EVENTS — dark image split
        ════════════════════════════════════════ */}
        <section id="events" className="relative bg-charcoal overflow-hidden">
          <div className="pointer-events-none absolute top-1/3 right-0 h-[26rem] w-[26rem] rounded-full bg-[var(--blue)]/15 blur-[130px]" />

          <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
            <div dir="rtl">
              <p className="text-[10px] tracking-[0.5em] uppercase text-blue-light mb-4">
                For Events · للفعاليات
              </p>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-medium text-cream leading-tight mb-6">
                خدمة الفعاليات
                <br />
                <span className="text-blue-light">والأعراس</span>
              </h2>
              <p className="text-[var(--cream)]/60 text-base leading-loose mb-10 max-w-lg sm:text-lg">
                نُنسّق ديكورات الزهور للأعراس، حفلات الخطوبة، والفعاليات الخاصة.
                تواصل معنا لتخصيص باقة استشارية تعكس رؤيتك الكاملة.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الفعاليات"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue px-8 py-4 text-[11px] tracking-[0.32em] uppercase text-cream font-medium hover:bg-blue-light transition-colors shadow-[0_18px_44px_rgba(31,95,255,0.28)]"
                >
                  تواصل معنا
                </a>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 border border-[var(--cream)]/30 px-8 py-4 text-[11px] tracking-[0.32em] uppercase text-cream hover:border-blue-light hover:text-blue-light transition-colors"
                >
                  تصفّح المجموعة
                </Link>
              </div>
            </div>

            <div
              data-surface
              className="relative aspect-[4/5] overflow-hidden border border-[var(--blue)]/30"
            >
              <Image
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&h=1200&fit=crop"
                alt="Wedding flowers"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,24,47,0.55)] via-transparent to-transparent" />
              <span className="absolute top-3 right-3 h-5 w-5 border-t border-r border-blue-light" />
              <span className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-blue-light" />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CONTACT
        ════════════════════════════════════════ */}
        <section
          id="contact"
          className="py-20 md:py-28 max-w-7xl mx-auto px-6"
          dir="rtl"
        >
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.42em] uppercase text-blue mb-3">
              Contact · تواصل معنا
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-medium text-charcoal">
              نحن في خدمتك
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { label: "الموقع",      val: "الدوحة، قطر",       sub: "Doha, Qatar" },
              { label: "واتساب",      val: "+٩٧٤ ٧٤١٢ ٣٤٥٦",   sub: "WhatsApp 24/7" },
              { label: "ساعات العمل", val: "يومياً ٩ ص — ١٠ م", sub: "Daily 9 AM — 10 PM" },
            ].map((c) => (
              <div
                key={c.label}
                data-surface
                className="border border-[var(--line)] bg-white p-6 md:p-8 text-center transition-all hover:-translate-y-1 hover:border-[var(--blue)]/55"
              >
                <p className="text-[10px] tracking-[0.42em] uppercase text-blue mb-3">
                  {c.label}
                </p>
                <p className="font-display text-xl text-charcoal mb-2">
                  {c.val}
                </p>
                <p className="text-[10px] tracking-[0.32em] uppercase text-[var(--charcoal)]/40">
                  {c.sub}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* floating WhatsApp */}
      <a
        href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 text-sm font-medium rounded-full shadow-[0_8px_28px_rgba(37,211,102,.32)] hover:bg-[#1ebe5c] transition-colors"
        aria-label="WhatsApp"
      >
        <WaIcon />
        <span className="hidden sm:inline">اطلب الآن</span>
      </a>
    </>
  );
}

function WaIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
