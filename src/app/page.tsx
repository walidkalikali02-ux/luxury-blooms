import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getSupabase } from '@/lib/supabase';
import type { Product } from '@/lib/supabase';

async function getFeatured(): Promise<Product[]> {
  try {
    const sb = getSupabase();
    if (!sb) return [];
    const { data, error } = await sb
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .eq('in_stock', true)
      .limit(6);
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

const placeholders: Product[] = [
  { id: 1, name_ar: 'باقة الورد الملكي',    name_en: 'Royal Rose Bouquet',      description_ar: '', description_en: '', price: 250, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=1000&fit=crop', category: 'باقات الورود',    in_stock: true,  is_featured: true, created_at: '' },
  { id: 2, name_ar: 'ترتيب الأوركيد',       name_en: 'Luxury Orchid',           description_ar: '', description_en: '', price: 380, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=800&h=1000&fit=crop', category: 'الباقات الملكية', in_stock: true,  is_featured: true, created_at: '' },
  { id: 3, name_ar: 'إكليل العروس',         name_en: 'Bridal Crown',            description_ar: '', description_en: '', price: 550, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop', category: 'زهور عروس',      in_stock: true,  is_featured: true, created_at: '' },
  { id: 4, name_ar: 'باقة الياسمين',        name_en: 'Jasmine Bouquet',         description_ar: '', description_en: '', price: 180, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=800&h=1000&fit=crop', category: 'باقات الورود',    in_stock: true,  is_featured: true, created_at: '' },
  { id: 5, name_ar: 'تشكيلة الأزرق الهادئ', name_en: 'Calm Blue Edit',          description_ar: '', description_en: '', price: 650, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&h=1000&fit=crop', category: 'الباقات الملكية', in_stock: true,  is_featured: true, created_at: '' },
  { id: 6, name_ar: 'صندوق الزهور',         name_en: 'Floral Gift Box',         description_ar: '', description_en: '', price: 420, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=1000&fit=crop', category: 'هدايا فاخرة',    in_stock: true,  is_featured: true, created_at: '' },
];

const stats = [
  { num: '+٥٠٠', label: 'باقة مُسلَّمة'  },
  { num: 'يومياً', label: 'زهور طازجة'   },
  { num: '+٢٠٠', label: 'عميل موثوق'    },
  { num: '٢٤h',  label: 'توصيل سريع'   },
];

export default async function HomePage() {
  const featured = await getFeatured();
  const products  = featured.length ? featured : placeholders;

  return (
    <>
      <Navbar />

      <main className="pt-24">

        {/* ══════════════════════════════════
            HERO
        ══════════════════════════════════ */}
        <section className="relative min-h-[92vh] bg-[var(--navy)] flex items-end overflow-hidden">

          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1800&h=1200&fit=crop"
              alt="Luxury flower arrangement"
              fill
              priority
              className="object-cover opacity-50"
            />
          </div>

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)] via-[var(--navy)]/65 to-[var(--navy)]/20" />

          {/* Top hairline */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--blue)] to-transparent" />

          {/* Vertical side label — desktop only */}
          <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-4">
            <span className="text-[9px] tracking-[0.55em] uppercase text-[var(--blue)]/40 [writing-mode:vertical-rl]">
              Luxury · Blooms · 2026
            </span>
            <div className="h-14 w-px bg-[var(--blue)]/25" />
          </div>

          {/* Hero content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-28">
            <div dir="rtl" className="space-y-5 max-w-3xl">

              <div className="fade-up flex items-center gap-4">
                <span className="h-px w-10 sm:w-12 bg-[var(--blue)]" />
                <span className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-[var(--blue)]">
                  Atelier Floral · الدوحة
                </span>
              </div>

              <h1 className="fade-up-2 font-cairo font-light text-[clamp(2.4rem,8vw,5rem)] leading-[1.12] tracking-tight text-[var(--cream)]">
                زهور فاخرة
                <br />
                تُنسَّق بعناية في الدوحة
              </h1>

              <p className="fade-up-3 font-light text-[var(--cream)]/75 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl">
                باقات راقية مصمَّمة بدقّة لتعبّر عن أرقى المناسبات، بذوق هادئ وألوان محكومة.
              </p>

              <div className="fade-up-4 flex flex-wrap items-center gap-3 pt-2">
                <Link href="/products" className="btn-primary text-xs sm:text-sm">
                  تسوّق الآن
                  <ArrowIcon className="w-3 h-3" />
                </Link>
                <Link href="/#events" className="btn-ghost-light text-xs sm:text-sm">
                  خدمة الفعاليات
                </Link>
              </div>

            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[var(--cream)]/30 scroll-hint">
            <span className="text-[8px] tracking-[0.4em] uppercase">Scroll</span>
            <ChevronDownIcon />
          </div>
        </section>

        {/* ══════════════════════════════════
            STATS BAR
        ══════════════════════════════════ */}
        <section className="bg-[var(--cream-dark)] border-y border-[var(--line)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--line)]">
            {stats.map((s) => (
              <div key={s.label} className="text-center py-8 sm:py-10 px-3 sm:px-6" dir="rtl">
                <p className="font-cairo font-light text-2xl sm:text-3xl md:text-4xl text-[var(--navy)] mb-1.5">
                  {s.num}
                </p>
                <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[var(--blue-deep)]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════
            FEATURED PRODUCTS
        ══════════════════════════════════ */}
        <section className="py-14 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            <div className="flex items-end justify-between mb-10 md:mb-12" dir="rtl">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-8 bg-[var(--blue)]" />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--blue-deep)]">
                    Our Selection
                  </span>
                </div>
                <h2 className="font-cairo font-light text-3xl sm:text-4xl md:text-5xl text-[var(--navy)]">
                  مختاراتنا
                </h2>
              </div>
              <Link href="/products" className="hidden sm:inline-flex btn-ghost-dark shrink-0">
                عرض الكل
                <ArrowIcon className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-8 sm:hidden text-center">
              <Link href="/products" className="btn-ghost-dark">
                عرض الكل
                <ArrowIcon className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* hairline divider */}
        <div className="hairline max-w-7xl mx-auto px-4 sm:px-6" />

        {/* ══════════════════════════════════
            ABOUT / STORY
        ══════════════════════════════════ */}
        <section id="about" className="py-14 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Image — shows below text on mobile */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] bg-[var(--cream-dark)] overflow-hidden img-zoom order-2 md:order-1">
              <Image
                src="https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=900&h=1200&fit=crop"
                alt="About our atelier"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="order-1 md:order-2" dir="rtl">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-[var(--blue)]" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--blue-deep)]">
                  Our Story
                </span>
              </div>
              <h2 className="font-cairo font-light text-3xl sm:text-4xl md:text-5xl text-[var(--navy)] leading-tight mb-5">
                قصة بدأت بشغف
                <br />
                <span className="text-[var(--blue-deep)]">لتقديم الأجمل</span>
              </h2>
              <p className="text-[var(--navy)]/60 leading-loose mb-4 text-sm sm:text-base">
                نختار كل زهرة بعناية فائقة، ونُنسّقها بأيدي مصمّمين متخصّصين لتصل إليك
                في أبهى حُلّتها. نؤمن بأن الزهور لغة هادئة قادرة على التعبير عمّا
                تعجز الكلمات عن قوله.
              </p>
              <p className="text-[var(--navy)]/60 leading-loose mb-8 text-sm sm:text-base">
                من حفل صغير إلى ترتيب عرس كامل، نُقدّم لك خدمة شخصية تعكس ذوقك الراقي.
              </p>
              <Link href="/products" className="btn-ghost-dark">
                اكتشف المجموعة
                <ArrowIcon className="w-3 h-3" />
              </Link>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════
            EVENTS / WEDDINGS
        ══════════════════════════════════ */}
        <section id="events" className="bg-[var(--cream-dark)] py-14 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="relative bg-[var(--cream)] border border-[var(--line)] p-6 sm:p-10 md:p-16 overflow-hidden">

              {/* Decorative ornaments */}
              <div className="absolute -top-10 -right-10 w-48 sm:w-64 h-48 sm:h-64 text-[var(--blue)] opacity-[0.08] pointer-events-none">
                <FlowerOrnament />
              </div>
              <div className="absolute -bottom-12 -left-12 w-56 sm:w-72 h-56 sm:h-72 text-[var(--blue)] opacity-[0.05] pointer-events-none">
                <FlowerOrnament />
              </div>

              <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center">

                {/* Text */}
                <div dir="rtl">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-px w-8 bg-[var(--blue)]" />
                    <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--blue-deep)]">
                      For Events
                    </span>
                  </div>
                  <h2 className="font-cairo font-light text-3xl sm:text-4xl md:text-5xl text-[var(--navy)] leading-tight mb-5">
                    خدمة الفعاليات
                    <br />
                    <span className="text-[var(--blue-deep)]">والأعراس</span>
                  </h2>
                  <p className="text-[var(--navy)]/60 leading-loose mb-8 text-sm sm:text-base max-w-md">
                    نُنسّق ديكورات الزهور للأعراس، حفلات الخطوبة، والفعاليات الخاصة.
                    تواصل معنا لتخصيص باقة استشارية.
                  </p>
                  <a
                    href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن خدمة الفعاليات"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dark"
                  >
                    تواصل معنا
                    <ArrowIcon className="w-3 h-3" />
                  </a>
                </div>

                {/* Image */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[4/5] bg-[var(--cream-dark)] overflow-hidden img-zoom">
                  <Image
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&h=1200&fit=crop"
                    alt="Wedding flower service"
                    fill
                    className="object-cover"
                  />
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-wa fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 px-4 sm:px-5 py-3 text-xs sm:text-sm font-medium shadow-[0_12px_30px_rgba(37,211,102,0.3)]"
      >
        <WaIcon />
        <span className="hidden sm:inline">اطلب الآن</span>
      </a>
    </>
  );
}

/* ── Shared icons ─────────────────────────────────────── */

function ArrowIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function FlowerOrnament() {
  return (
    <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
      <circle cx="100" cy="100" r="18" />
      <ellipse cx="100" cy="55"  rx="22" ry="38" />
      <ellipse cx="100" cy="145" rx="22" ry="38" />
      <ellipse cx="55"  cy="100" rx="38" ry="22" />
      <ellipse cx="145" cy="100" rx="38" ry="22" />
      <ellipse cx="68"  cy="68"  rx="22" ry="32" transform="rotate(-45 68 68)"   />
      <ellipse cx="132" cy="132" rx="22" ry="32" transform="rotate(-45 132 132)" />
      <ellipse cx="132" cy="68"  rx="22" ry="32" transform="rotate(45 132 68)"   />
      <ellipse cx="68"  cy="132" rx="22" ry="32" transform="rotate(45 68 132)"   />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
