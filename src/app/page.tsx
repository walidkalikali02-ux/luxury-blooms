import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getSupabase } from '@/lib/supabase';
import type { Product } from '@/lib/supabase';

/* ─── data ──────────────────────────────── */

async function getFeatured(): Promise<Product[]> {
  try {
    const sb = getSupabase();
    if (!sb) return [];
    const { data, error } = await sb
      .from('products').select('*')
      .eq('is_featured', true).eq('in_stock', true).limit(6);
    if (error) throw error;
    return data || [];
  } catch { return []; }
}

const PLACEHOLDERS: Product[] = [
  { id:1, name_ar:'باقة الورد الملكي',    name_en:'Royal Rose Bouquet', description_ar:'', description_en:'', price:250, currency:'QAR', image_url:'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=1000&fit=crop', category:'باقات الورود',    in_stock:true, is_featured:true, created_at:'' },
  { id:2, name_ar:'ترتيب الأوركيد',       name_en:'Luxury Orchid',      description_ar:'', description_en:'', price:380, currency:'QAR', image_url:'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=800&h=1000&fit=crop', category:'الباقات الملكية', in_stock:true, is_featured:true, created_at:'' },
  { id:3, name_ar:'إكليل العروس',         name_en:'Bridal Crown',       description_ar:'', description_en:'', price:550, currency:'QAR', image_url:'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop', category:'زهور عروس',      in_stock:true, is_featured:true, created_at:'' },
  { id:4, name_ar:'باقة الياسمين',        name_en:'Jasmine Bouquet',    description_ar:'', description_en:'', price:180, currency:'QAR', image_url:'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=800&h=1000&fit=crop', category:'باقات الورود',    in_stock:true, is_featured:true, created_at:'' },
  { id:5, name_ar:'تشكيلة الأزرق الهادئ', name_en:'Calm Blue Edit',     description_ar:'', description_en:'', price:650, currency:'QAR', image_url:'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&h=1000&fit=crop', category:'الباقات الملكية', in_stock:true, is_featured:true, created_at:'' },
  { id:6, name_ar:'صندوق الزهور الفاخر',  name_en:'Floral Gift Box',    description_ar:'', description_en:'', price:420, currency:'QAR', image_url:'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=1000&fit=crop', category:'هدايا فاخرة',    in_stock:true, is_featured:true, created_at:'' },
];

const STATS = [
  { num: '+٥٠٠',  label: 'باقة مُسلَّمة' },
  { num: 'يومياً', label: 'زهور طازجة'   },
  { num: '+٢٠٠',  label: 'عميل موثوق'   },
  { num: '٢٤h',   label: 'توصيل سريع'   },
];

const TICKER = [
  'زهور طازجة يومياً', 'Fresh Flowers Daily',
  'باقات مخصصة',       'Bespoke Arrangements',
  'توصيل في نفس اليوم','Same-Day Delivery',
  'أعراس وفعاليات',    'Weddings & Events',
  'جودة بلا حدود',     'Luxury Blooms',
];

/* ─── page ──────────────────────────────── */

export default async function HomePage() {
  const featured = await getFeatured();
  const products = featured.length ? featured : PLACEHOLDERS;

  return (
    <>
      <Navbar />

      <main>

        {/* ═══ HERO ══════════════════════════════════════
            Light background — matching Doha Roastery's
            clean white aesthetic with dark text.
        ══════════════════════════════════════════════ */}
        <section className="bg-[var(--off)] pt-[68px] overflow-hidden">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 lg:py-28
                          grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ── text column ── */}
            <div dir="rtl" className="flex flex-col gap-6 order-2 lg:order-1">

              <div className="fade-up flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--blue)]" />
                <span className="label text-[9px] text-[var(--blue)]">Atelier Floral · الدوحة</span>
              </div>

              <h1 className="fade-up-2 font-cairo font-light
                             text-[clamp(2.8rem,7vw,5.2rem)]
                             leading-[1.1] tracking-tight text-[var(--ink)]">
                زهور فاخرة
                <br />
                تُنسَّق يومياً
                <br />
                <span className="text-[var(--blue)]">في الدوحة</span>
              </h1>

              <p className="fade-up-3 text-base sm:text-lg leading-loose text-[var(--muted)] max-w-lg">
                باقات راقية مُصمَّمة بدقّة لتعبّر عن أرقى المناسبات — بذوق هادئ
                وألوان محكومة تدوم في الذاكرة.
              </p>

              <div className="fade-up-4 flex flex-wrap gap-3 pt-1">
                <Link href="/products" className="btn-blue">
                  تسوّق الآن <Arrow />
                </Link>
                <Link href="/#events" className="btn-outline">
                  خدمة الفعاليات
                </Link>
              </div>

              {/* quick features */}
              <div className="fade-up-4 grid grid-cols-3 gap-3 pt-3 border-t border-[var(--line)]">
                {[
                  ['زهور يومية',   'Fresh daily'],
                  ['تنسيق خاص',   'Bespoke'],
                  ['توصيل سريع',  'Fast delivery'],
                ].map(([ar, en]) => (
                  <div key={ar} className="text-center py-3 px-2 rounded-lg bg-white border border-[var(--line)]">
                    <p className="font-cairo font-light text-sm text-[var(--ink)]">{ar}</p>
                    <p className="label text-[8px] text-[var(--muted)] mt-1">{en}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── image column ── */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:max-w-none
                              rounded-2xl overflow-hidden zoom">
                <Image
                  src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=900&h=1200&fit=crop"
                  alt="Luxury blue floral arrangement"
                  fill priority
                  className="object-cover"
                />
              </div>
              {/* floating badge */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6
                              bg-white rounded-xl shadow-lg px-4 py-3 text-right
                              border border-[var(--line)]" dir="rtl">
                <p className="label text-[8px] text-[var(--blue)]">Fresh today</p>
                <p className="font-cairo font-light text-base text-[var(--ink)] mt-0.5">
                  تشكيلة الأزرق الهادئ
                </p>
                <p className="label text-[8px] text-[var(--muted)] mt-1">650 QAR</p>
              </div>
            </div>

          </div>
        </section>

        {/* ═══ MARQUEE ═══════════════════════════════ */}
        <div className="bg-[var(--blue)] py-3.5 marquee-wrap select-none">
          <div className="marquee-inner">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-5">
                <span className="label text-[10px] text-white/85 whitespace-nowrap">{t}</span>
                <span className="h-1 w-1 rounded-full bg-white/40 shrink-0" />
              </span>
            ))}
          </div>
        </div>

        {/* ═══ STATS BAR ═════════════════════════════ */}
        <section className="bg-white border-b border-[var(--line)]">
          <div className="mx-auto max-w-7xl divide-x divide-[var(--line)] rtl:divide-x-reverse
                          grid grid-cols-2 md:grid-cols-4">
            {STATS.map(s => (
              <div key={s.label} className="flex flex-col items-center py-10 px-4 gap-2" dir="rtl">
                <span className="font-cairo font-light text-[clamp(2rem,4vw,3rem)]
                                 text-[var(--ink)] leading-none">
                  {s.num}
                </span>
                <span className="label text-[9px] text-[var(--muted)]">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FEATURED PRODUCTS ═════════════════════ */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">

            <div className="mb-12 flex items-end justify-between gap-4" dir="rtl">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-8 bg-[var(--blue)]" />
                  <span className="label text-[9px] text-[var(--blue)]">Our Selection</span>
                </div>
                <h2 className="font-cairo font-light
                               text-[clamp(2rem,4vw,3.2rem)]
                               text-[var(--ink)] leading-none">
                  مختاراتنا المميزة
                </h2>
              </div>
              <Link href="/products"
                className="hidden sm:inline-flex items-center gap-1.5 label text-[9px]
                           text-[var(--blue)] hover:text-[var(--blue-2)] transition-colors">
                عرض الكل <Arrow />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map(p => <ProductCard key={p.id} product={p} />)}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link href="/products" className="btn-outline">عرض الكل <Arrow /></Link>
            </div>
          </div>
        </section>

        {/* ═══ ABOUT / STORY ═════════════════════════ */}
        <section id="about" className="bg-[var(--off)] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8
                          grid md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* image */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden zoom
                            order-2 md:order-1">
              <Image
                src="https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=900&h=1200&fit=crop"
                alt="About our atelier" fill
                className="object-cover"
              />
              <span className="absolute bottom-0 left-0 h-12 w-12 bg-[var(--blue)] rounded-tr-xl" />
            </div>

            {/* text */}
            <div className="order-1 md:order-2" dir="rtl">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-[var(--blue)]" />
                <span className="label text-[9px] text-[var(--blue)]">Our Story</span>
              </div>
              <h2 className="font-cairo font-light
                             text-[clamp(1.9rem,4vw,3.2rem)]
                             text-[var(--ink)] leading-tight mb-6">
                قصة بدأت بشغف
                <br />
                <span className="text-[var(--blue)]">لتقديم الأجمل</span>
              </h2>
              <p className="text-sm sm:text-base text-[var(--muted)] leading-loose mb-4">
                نختار كل زهرة بعناية فائقة، ونُنسّقها بأيدي مصمّمين متخصّصين لتصل إليك
                في أبهى حُلّتها. نؤمن بأن الزهور لغة هادئة قادرة على التعبير عمّا
                تعجز الكلمات عن قوله.
              </p>
              <p className="text-sm sm:text-base text-[var(--muted)] leading-loose mb-8">
                من حفل صغير إلى ترتيب عرس كامل، نقدّم لك خدمة شخصية تعكس ذوقك الراقي.
              </p>
              <Link href="/products" className="btn-blue">
                اكتشف المجموعة <Arrow />
              </Link>
            </div>

          </div>
        </section>

        {/* ═══ WHY US ════════════════════════════════ */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">

            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-3 mb-3">
                <span className="h-px w-8 bg-[var(--blue)]" />
                <span className="label text-[9px] text-[var(--blue)]">Why Us</span>
                <span className="h-px w-8 bg-[var(--blue)]" />
              </div>
              <h2 className="font-cairo font-light
                             text-[clamp(1.9rem,4vw,3rem)]
                             text-[var(--ink)]">
                لماذا تختارنا؟
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5" dir="rtl">
              {[
                { n:'٠١', t:'تنسيق شخصي', d:'نصمم كل باقة لتناسب المناسبة والذوق والمشهد النهائي المطلوب.' },
                { n:'٠٢', t:'جودة يومية',  d:'نختار الزهور الطازجة بعناية ونحافظ على حضورها حتى التسليم.' },
                { n:'٠٣', t:'توصيل سريع',  d:'خدمة منظمة مع تجربة شراء واضحة ومختصرة من البداية للنهاية.' },
              ].map(item => (
                <div key={item.n} className="card p-6 sm:p-7">
                  <p className="font-cairo font-light text-3xl text-[var(--blue)] mb-4 leading-none">
                    {item.n}
                  </p>
                  <p className="font-cairo font-medium text-base text-[var(--ink)] mb-3">{item.t}</p>
                  <p className="text-sm text-[var(--muted)] leading-loose">{item.d}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ═══ EVENTS — the one dark section ════════ */}
        <section id="events"
          className="bg-[var(--ink)] py-20 md:py-28 relative overflow-hidden">

          <div className="pointer-events-none absolute inset-0
                          bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(29,78,216,0.12),transparent)]" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8
                          grid md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* text */}
            <div dir="rtl">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-[var(--blue)]" />
                <span className="label text-[9px] text-[#93C5FD]">For Events</span>
              </div>
              <h2 className="font-cairo font-light
                             text-[clamp(1.9rem,4vw,3.2rem)]
                             text-white leading-tight mb-6">
                خدمة الفعاليات
                <br />
                <span className="text-[#93C5FD]">والأعراس</span>
              </h2>
              <p className="text-sm sm:text-base text-white/55 leading-loose mb-8 max-w-md">
                نُنسّق ديكورات الزهور للأعراس، حفلات الخطوبة، والفعاليات الخاصة.
                تواصل معنا لتخصيص باقة استشارية تعكس رؤيتك الكاملة.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الفعاليات"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-blue">
                  تواصل معنا <Arrow />
                </a>
                <Link href="/products" className="btn-outline-light">
                  تصفح المجموعة
                </Link>
              </div>
            </div>

            {/* image */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden zoom">
              <Image
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&h=1200&fit=crop"
                alt="Wedding flowers" fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[var(--blue)]/12" />
              <span className="absolute top-0 right-0 h-10 w-10 bg-[var(--blue)] rounded-bl-xl" />
            </div>

          </div>
        </section>

        {/* ═══ CTA BAND ══════════════════════════════ */}
        <section className="bg-[var(--blue)] py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-5 text-center" dir="rtl">
            <h2 className="font-cairo font-light
                           text-[clamp(1.8rem,4vw,2.8rem)]
                           text-white mb-4 leading-snug">
              هل تبحث عن باقة مميزة؟
            </h2>
            <p className="text-sm sm:text-base text-white/65 leading-loose mb-8">
              فريقنا جاهز لمساعدتك في تصميم باقة تناسب مناسبتك تماماً.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
                target="_blank" rel="noopener noreferrer"
                className="btn-outline-light">
                تحدّث مع فريقنا <Arrow />
              </a>
              <Link href="/products" className="btn-outline-light">
                تصفّح المتجر
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* floating WhatsApp */}
      <a href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
        target="_blank" rel="noopener noreferrer"
        className="btn-wa fixed bottom-5 left-5 z-50 shadow-[0_6px_24px_rgba(37,211,102,.28)]">
        <WaIcon />
        <span className="hidden sm:inline">اطلب الآن</span>
      </a>
    </>
  );
}

/* ─── icons ─────────────────────────────── */

function Arrow() {
  return (
    <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 5l7 7-7 7"/>
    </svg>
  );
}

function WaIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
