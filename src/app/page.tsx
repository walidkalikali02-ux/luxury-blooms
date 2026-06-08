import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getSupabase } from "@/lib/supabase";
import type { Product } from "@/lib/supabase";

/* ── data ─────────────────────────── */

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
  {
    id: 1,
    name_ar: "باقة الورد الملكي",
    name_en: "Royal Rose Bouquet",
    description_ar: "",
    description_en: "",
    price: 250,
    currency: "QAR",
    image_url:
      "https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=800&fit=crop",
    category: "باقات الورود",
    in_stock: true,
    is_featured: true,
    created_at: "",
  },
  {
    id: 2,
    name_ar: "ترتيب الأوركيد",
    name_en: "Luxury Orchid",
    description_ar: "",
    description_en: "",
    price: 380,
    currency: "QAR",
    image_url:
      "https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=800&h=800&fit=crop",
    category: "الباقات الملكية",
    in_stock: true,
    is_featured: true,
    created_at: "",
  },
  {
    id: 3,
    name_ar: "إكليل العروس",
    name_en: "Bridal Crown",
    description_ar: "",
    description_en: "",
    price: 550,
    currency: "QAR",
    image_url:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=800&fit=crop",
    category: "زهور عروس",
    in_stock: true,
    is_featured: true,
    created_at: "",
  },
  {
    id: 4,
    name_ar: "باقة الياسمين",
    name_en: "Jasmine Bouquet",
    description_ar: "",
    description_en: "",
    price: 180,
    currency: "QAR",
    image_url:
      "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=800&h=800&fit=crop",
    category: "باقات الورود",
    in_stock: true,
    is_featured: true,
    created_at: "",
  },
  {
    id: 5,
    name_ar: "تشكيلة الأزرق الهادئ",
    name_en: "Calm Blue Edit",
    description_ar: "",
    description_en: "",
    price: 650,
    currency: "QAR",
    image_url:
      "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&h=800&fit=crop",
    category: "الباقات الملكية",
    in_stock: true,
    is_featured: true,
    created_at: "",
  },
  {
    id: 6,
    name_ar: "صندوق الزهور الفاخر",
    name_en: "Floral Gift Box",
    description_ar: "",
    description_en: "",
    price: 420,
    currency: "QAR",
    image_url:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=800&fit=crop",
    category: "هدايا فاخرة",
    in_stock: true,
    is_featured: true,
    created_at: "",
  },
];

const STATS = [
  { num: "+٥٠٠", label: "باقة مُسلَّمة" },
  { num: "+٢٠٠", label: "عميل موثوق" },
  { num: "يومياً", label: "زهور طازجة" },
  { num: "٢٤h", label: "توصيل سريع" },
];

const HERO_FEATURES = [
  "زهور طازجة تُختار يومياً",
  "تنسيق فردي لكل باقة",
  "تغليف فاخر وأنيق",
  "توصيل سريع داخل قطر",
];

const STORY_POINTS = [
  "نختار كل زهرة بعناية فائقة من أفضل المزارع",
  "نُنسّقها بأيدي مصمّمين متخصّصين",
  "نحافظ على طزاجتها حتى تصل إليك",
  "خدمة شخصية تعكس ذوقك الراقي",
];

/* ── page ─────────────────────────── */

export default async function HomePage() {
  const featured = await getFeatured();
  const products = featured.length ? featured : PLACEHOLDERS;

  return (
    <>
      <Navbar />

      <main className="pt-24">
        {/* ════════════════════════════════════════
            HERO — dark charcoal, min-h-[90vh]
        ════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] bg-charcoal flex items-end overflow-hidden">
          <FlowerBackground
            id="hero-flower"
            className="absolute inset-0 w-full h-full text-blue opacity-30"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-[var(--charcoal)]/70 to-[var(--charcoal)]/30" />

          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue to-transparent" />

          <div
            className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24"
            dir="rtl"
          >
            <div className="fade-up flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-blue" />
              <span className="text-blue text-xs tracking-[0.5em] uppercase">
                Luxury Blooms · الدوحة
              </span>
            </div>

            <h1 className="fade-up-2 text-5xl md:text-7xl font-light text-cream leading-[1.1] tracking-tight mb-6 max-w-3xl">
              زهور فاخرة
              <br />
              تُنسَّق يومياً
              <br />
              في الدوحة
            </h1>

            <p className="fade-up-3 text-[var(--cream)]/60 text-lg font-light max-w-lg mb-10 leading-relaxed">
              باقات راقية مُصمَّمة بدقّة لتعبّر عن أرقى المناسبات، بذوق هادئ
              وألوان محكومة تدوم في الذاكرة.
            </p>

            <div className="fade-up-3 flex flex-col gap-2 mb-12">
              {HERO_FEATURES.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-3 text-[var(--cream)]/50 text-sm"
                >
                  <span className="w-1 h-1 rounded-full bg-blue flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="fade-up-4 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-block bg-blue text-cream px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-blue-light transition-colors"
              >
                تسوّق الآن
              </Link>
              <Link
                href="/#events"
                className="inline-block border border-[var(--cream)]/30 text-cream px-8 py-4 text-sm tracking-widest uppercase hover:border-blue hover:text-blue transition-colors"
              >
                خدمة الفعاليات
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--cream)]/20 scroll-hint">
            <span className="text-[10px] tracking-widest">SCROLL</span>
            <span className="w-px h-10 bg-blue/30" />
          </div>
        </section>

        {/* ════════════════════════════════════════
            STATS BAR
        ════════════════════════════════════════ */}
        <section className="bg-cream-dark border-y border-[var(--blue)]/20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--blue)]/20 rtl:divide-x-reverse">
            {STATS.map((s) => (
              <div key={s.label} className="text-center py-8 px-4" dir="rtl">
                <p className="text-2xl font-light text-charcoal mb-1">
                  {s.num}
                </p>
                <p className="text-[10px] tracking-widest uppercase text-blue">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            FEATURED PRODUCTS
        ════════════════════════════════════════ */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12" dir="rtl">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-blue mb-3">
                Our Selection · مختاراتنا
              </p>
              <h2 className="text-4xl font-light text-charcoal">باقات مميزة</h2>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-block text-xs tracking-widest uppercase text-charcoal border-b border-charcoal pb-0.5 hover:text-blue hover:border-blue transition-colors"
            >
              عرض الكل
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.slice(0, 6).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/products"
              className="inline-block text-xs tracking-widest uppercase text-charcoal border-b border-charcoal pb-0.5 hover:text-blue hover:border-blue transition-colors"
            >
              عرض الكل
            </Link>
          </div>
        </section>

        {/* ════════════════════════════════════════
            ABOUT QUOTE — dark
        ════════════════════════════════════════ */}
        <section id="about" className="relative bg-charcoal overflow-hidden">
          <FlowerBackground
            id="about-flower"
            className="absolute inset-0 w-full h-full text-blue opacity-10"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
            <div className="hidden md:flex flex-col items-center justify-center gap-6">
              <span className="w-px h-24 bg-blue/30" />
              <span className="text-blue text-7xl select-none leading-none">
                ❀
              </span>
              <span className="w-px h-24 bg-blue/30" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--blue)]/50 [writing-mode:vertical-rl]">
                Since 2020
              </span>
            </div>

            <div dir="rtl">
              <p className="text-xs tracking-[0.5em] uppercase text-blue mb-4">
                Our Story · قصتنا
              </p>
              <p className="text-[var(--cream)]/80 text-xl md:text-2xl font-light leading-relaxed mb-8">
                بدأت رحلتنا بشغف لتقديم الأجمل، نختار كل زهرة بعناية ونُنسّقها
                بأيدي مصمّمين متخصّصين لتصل إليك في أبهى حُلّتها.
              </p>
              <p className="text-[var(--cream)]/50 leading-loose text-sm mb-8">
                نؤمن بأن الزهور لغة هادئة قادرة على التعبير عمّا تعجز الكلمات عن
                قوله. من باقة صغيرة إلى تنسيق عرس كامل، نُقدّم لك خدمة شخصية
                تعكس ذوقك الراقي بكل تفاصيله.
              </p>
              <p className="text-[var(--cream)]/50 leading-loose text-sm">
                كل تصميم هو قصة، وكل زهرة كلمة في تلك القصة.
              </p>

              <div className="mt-10 flex items-center gap-4">
                <span className="h-px w-8 bg-blue" />
                <span className="text-blue text-xs tracking-widest uppercase">
                  Luxury Blooms — Since 2020
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            OUR PROMISE — split panel
        ════════════════════════════════════════ */}
        <section
          className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center"
          dir="rtl"
        >
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-blue mb-3">
              Our Promise · وعدنا
            </p>
            <h2 className="text-4xl font-light text-charcoal mb-6">
              تجربة شراء أبسط،
              <br />
              صورة نهائية أرقى
            </h2>
            <p className="text-[var(--charcoal)]/60 leading-relaxed mb-8">
              صممنا تجربتنا لتكون خفيفة، واضحة، ومركزة على المنتج. لا ضوضاء
              بصرية، لا عناصر زائدة — فقط زهور تظهر بثقة.
            </p>
            <Link
              href="/products"
              className="inline-block bg-charcoal text-cream px-8 py-4 text-sm tracking-widest uppercase hover:bg-charcoal-light transition-colors"
            >
              اكتشف المجموعة
            </Link>
          </div>

          <div className="relative bg-cream-dark border border-[var(--blue)]/20 p-10 overflow-hidden">
            <FlowerBackground
              id="panel-flower"
              className="absolute inset-0 w-full h-full text-blue opacity-20"
            />
            <div className="relative z-10 space-y-5">
              {STORY_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-4">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue flex-shrink-0" />
                  <p className="text-sm text-[var(--charcoal)]/70 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            EVENTS — dark with image
        ════════════════════════════════════════ */}
        <section id="events" className="relative bg-charcoal overflow-hidden">
          <FlowerBackground
            id="events-flower"
            className="absolute inset-0 w-full h-full text-blue opacity-20"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
            <div dir="rtl">
              <p className="text-xs tracking-[0.5em] uppercase text-blue mb-4">
                For Events · للفعاليات
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-cream leading-tight mb-6">
                خدمة الفعاليات
                <br />
                والأعراس
              </h2>
              <p className="text-[var(--cream)]/60 text-lg font-light leading-relaxed mb-10 max-w-lg">
                نُنسّق ديكورات الزهور للأعراس، حفلات الخطوبة، والفعاليات الخاصة.
                تواصل معنا لتخصيص باقة استشارية تعكس رؤيتك الكاملة.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الفعاليات"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue text-cream px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-blue-light transition-colors"
                >
                  تواصل معنا
                </a>
                <Link
                  href="/products"
                  className="inline-block border border-[var(--cream)]/30 text-cream px-8 py-4 text-sm tracking-widest uppercase hover:border-blue hover:text-blue transition-colors"
                >
                  تصفّح المجموعة
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&h=1200&fit=crop"
                alt="Wedding flowers"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[var(--charcoal)]/20" />
              <span className="absolute top-3 right-3 h-5 w-5 border-t border-r border-blue" />
              <span className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-blue" />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CONTACT
        ════════════════════════════════════════ */}
        <section
          id="contact"
          className="py-24 max-w-7xl mx-auto px-6"
          dir="rtl"
        >
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase text-blue mb-3">
              Contact · تواصل معنا
            </p>
            <h2 className="text-4xl font-light text-charcoal">نحن في خدمتك</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "الموقع", val: "الدوحة، قطر", sub: "Doha, Qatar" },
              { label: "واتساب", val: "+٩٧٤ ٧٤١٢ ٣٤٥٦", sub: "WhatsApp 24/7" },
              {
                label: "ساعات العمل",
                val: "يومياً ٩ ص — ١٠ م",
                sub: "Daily 9 AM — 10 PM",
              },
            ].map((c) => (
              <div
                key={c.label}
                className="border border-[var(--blue)]/20 bg-white p-8 text-center hover:border-blue/60 transition-colors"
              >
                <p className="text-[10px] tracking-widest uppercase text-blue mb-3">
                  {c.label}
                </p>
                <p className="text-lg font-light text-charcoal mb-2">{c.val}</p>
                <p className="text-[10px] tracking-widest uppercase text-[var(--charcoal)]/40">
                  {c.sub}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <a
        href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 text-sm font-medium rounded-full shadow-[0_8px_28px_rgba(37,211,102,.32)] hover:bg-[#1ebe5c] transition-colors"
        aria-label="WhatsApp"
      >
        <WaIcon /> <span className="hidden sm:inline">اطلب الآن</span>
      </a>
    </>
  );
}

/* ── decorative tiled flower SVG ─────────── */

function FlowerBackground({
  className = "",
  id = "flower-tile",
}: {
  className?: string;
  id?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      fill="currentColor"
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="240"
          height="240"
          patternUnits="userSpaceOnUse"
        >
          <g transform="translate(120, 120)">
            <circle r="9" />
            <ellipse cy="-26" rx="9" ry="20" />
            <ellipse cy="26" rx="9" ry="20" />
            <ellipse cx="-26" rx="20" ry="9" />
            <ellipse cx="26" rx="20" ry="9" />
            <ellipse cx="-18" cy="-18" rx="8" ry="16" transform="rotate(-45)" />
            <ellipse cx="18" cy="18" rx="8" ry="16" transform="rotate(-45)" />
            <ellipse cx="18" cy="-18" rx="8" ry="16" transform="rotate(45)" />
            <ellipse cx="-18" cy="18" rx="8" ry="16" transform="rotate(45)" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
