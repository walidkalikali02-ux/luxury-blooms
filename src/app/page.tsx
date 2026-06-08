import Image from 'next/image';
import Link from 'next/link';
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

const PLACEHOLDERS: Product[] = [
  {
    id: 1,
    name_ar: 'باقة الورد الملكي',
    name_en: 'Royal Rose Bouquet',
    description_ar: '',
    description_en: '',
    price: 250,
    currency: 'QAR',
    image_url:
      'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=800&fit=crop',
    category: 'باقات الورود',
    in_stock: true,
    is_featured: true,
    created_at: '',
  },
  {
    id: 2,
    name_ar: 'ترتيب الأوركيد',
    name_en: 'Luxury Orchid',
    description_ar: '',
    description_en: '',
    price: 380,
    currency: 'QAR',
    image_url:
      'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=800&h=800&fit=crop',
    category: 'الباقات الملكية',
    in_stock: true,
    is_featured: true,
    created_at: '',
  },
  {
    id: 3,
    name_ar: 'إكليل العروس',
    name_en: 'Bridal Crown',
    description_ar: '',
    description_en: '',
    price: 550,
    currency: 'QAR',
    image_url:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=800&fit=crop',
    category: 'زهور عروس',
    in_stock: true,
    is_featured: true,
    created_at: '',
  },
  {
    id: 4,
    name_ar: 'باقة الياسمين',
    name_en: 'Jasmine Bouquet',
    description_ar: '',
    description_en: '',
    price: 180,
    currency: 'QAR',
    image_url:
      'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=800&h=800&fit=crop',
    category: 'باقات الورود',
    in_stock: true,
    is_featured: true,
    created_at: '',
  },
  {
    id: 5,
    name_ar: 'تشكيلة الأزرق الهادئ',
    name_en: 'Calm Blue Edit',
    description_ar: '',
    description_en: '',
    price: 650,
    currency: 'QAR',
    image_url:
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&h=800&fit=crop',
    category: 'الباقات الملكية',
    in_stock: true,
    is_featured: true,
    created_at: '',
  },
  {
    id: 6,
    name_ar: 'صندوق الزهور الفاخر',
    name_en: 'Floral Gift Box',
    description_ar: '',
    description_en: '',
    price: 420,
    currency: 'QAR',
    image_url:
      'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=800&fit=crop',
    category: 'هدايا فاخرة',
    in_stock: true,
    is_featured: true,
    created_at: '',
  },
];

const STATS = [
  { num: '+٥٠٠', label: 'باقة مُسلَّمة' },
  { num: '+٢٠٠', label: 'عميل موثوق' },
  { num: 'يومياً', label: 'زهور طازجة' },
  { num: '٢٤h', label: 'توصيل سريع' },
];

const HERO_FEATURES = [
  'زهور مختارة يومياً من أفضل المزارع',
  'تنسيق هادئ بطابع أزرق فاخر',
  'تغليف أنيق يليق بالهدايا والمناسبات',
  'توصيل سريع داخل قطر',
];

const STORY_POINTS = [
  'نبدأ من الزهرة نفسها، لا من الباقة النهائية.',
  'نوازن بين اللون، الملمس، والفراغ بصياغة دقيقة.',
  'نغلف كل طلب بروح هادئة واهتمام واضح بالتفاصيل.',
  'نقدّم تجربة شراء تبدو شخصية، مرتبة، وسهلة.',
];

const SERVICE_CARDS = [
  {
    label: 'باقات يومية',
    value: 'اختيارات جاهزة للهدايا والزيارات',
  },
  {
    label: 'تنسيق مناسبات',
    value: 'حلول مخصصة للأعراس والفعاليات',
  },
  {
    label: 'توصيل سريع',
    value: 'وصول منظم داخل الدوحة في الوقت المحدد',
  },
];

export default async function HomePage() {
  const featured = await getFeatured();
  const products = featured.length ? featured : PLACEHOLDERS;

  const heroProduct = products[0];
  const secondaryProduct = products[1] ?? products[0];
  const tertiaryProduct = products[2] ?? products[0];

  return (
    <>
      <Navbar />

      <main className="pt-24">
        <section className="relative overflow-hidden">
          <FlowerBackground
            id="hero-flower"
            className="pointer-events-none absolute inset-0 h-full w-full text-[var(--blue)] opacity-[0.12]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,95,255,0.16),transparent_28%),radial-gradient(circle_at_15%_20%,rgba(95,136,255,0.12),transparent_26%),linear-gradient(180deg,rgba(244,248,255,0.86),rgba(244,248,255,0.98))]" />

          <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-end gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:py-14">
            <div className="max-w-3xl" dir="rtl">
              <div className="fade-up mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-blue" />
                <span className="text-[10px] tracking-[0.5em] uppercase text-blue">
                  Blue Blooms Atelier · Doha
                </span>
              </div>

              <h1 className="fade-up-2 font-display text-[clamp(3.2rem,10vw,6.8rem)] leading-[0.92] tracking-tight text-charcoal">
                زهور فاخرة
                <br />
                بطابع أزرق
                <br />
                هادئ
              </h1>

              <p className="fade-up-3 mt-6 max-w-xl text-base leading-8 text-[var(--charcoal)]/64 sm:text-lg">
                ننسق باقات معاصرة للهدايا، للمناسبات، ولحظات الاحتفاء اليومية.
                تركيزنا على التوازن، الطزاجة، والحضور البصري الذي يظل
                متماسكاً حتى آخر تفصيلة.
              </p>

              <div className="fade-up-3 mt-8 flex flex-col gap-2">
                {HERO_FEATURES.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-[var(--charcoal)]/62"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="fade-up-4 mt-10 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center bg-blue px-7 py-4 text-[10px] tracking-[0.38em] uppercase text-cream transition-colors hover:bg-blue-light"
                >
                  تسوّق الآن
                </Link>
                <Link
                  href="/#events"
                  className="inline-flex items-center justify-center border border-[var(--line)] bg-white px-7 py-4 text-[10px] tracking-[0.38em] uppercase text-charcoal transition-colors hover:border-blue hover:text-blue"
                >
                  خدمة الفعاليات
                </Link>
              </div>

              <div className="fade-up-4 mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="border border-[var(--line)] bg-[rgba(255,255,255,0.78)] p-4"
                    data-surface
                  >
                    <p className="font-display text-2xl text-charcoal">{stat.num}</p>
                    <p className="mt-2 text-[10px] tracking-[0.32em] uppercase text-blue">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative" dir="rtl">
              <div className="absolute -right-4 top-10 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(31,95,255,0.18),transparent_70%)] blur-2xl" />
              <div className="absolute -left-8 bottom-16 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(95,136,255,0.16),transparent_70%)] blur-2xl" />

              <div className="fade-up-2 relative ml-auto max-w-[28rem] border border-[var(--line)] bg-white p-3" data-surface>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={heroProduct.image_url}
                    alt={heroProduct.name_en}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width:1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,24,47,0.28)] via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 border border-white/20 bg-[rgba(7,24,47,0.62)] px-3 py-2 text-[9px] tracking-[0.35em] text-cream">
                    Signature Piece
                  </div>
                  <div className="absolute bottom-4 right-4 border border-white/20 bg-[rgba(255,255,255,0.78)] px-4 py-3">
                    <p className="text-[10px] tracking-[0.32em] uppercase text-blue">
                      {heroProduct.category}
                    </p>
                    <p className="mt-1 font-display text-2xl text-charcoal">
                      {heroProduct.price.toLocaleString()} {heroProduct.currency}
                    </p>
                  </div>
                </div>
              </div>

              <div className="fade-up-3 -mt-10 grid gap-4 sm:grid-cols-2">
                <div className="border border-[var(--line)] bg-white p-4" data-surface>
                  <p className="text-[10px] tracking-[0.35em] uppercase text-blue">
                    {secondaryProduct.category}
                  </p>
                  <p className="mt-3 font-display text-2xl leading-tight text-charcoal">
                    {secondaryProduct.name_ar}
                  </p>
                  <p className="mt-2 text-sm text-[var(--charcoal)]/54">
                    {secondaryProduct.name_en}
                  </p>
                </div>

                <div className="border border-[var(--line)] bg-[rgba(255,255,255,0.74)] p-4" data-surface>
                  <div className="relative mb-3 aspect-[5/4] overflow-hidden border border-[var(--line)] bg-blue-ghost">
                    <Image
                      src={tertiaryProduct.image_url}
                      alt={tertiaryProduct.name_en}
                      fill
                      className="object-cover"
                      sizes="(max-width:1024px) 50vw, 18vw"
                    />
                  </div>
                  <p className="text-[10px] tracking-[0.35em] uppercase text-blue">
                    Ready to Gift
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--charcoal)]/58">
                    ترتيب سريع وباقة متزنة تصل جاهزة للتقديم.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative border-y border-[var(--line)] bg-[rgba(255,255,255,0.68)]">
            <div className="marquee-wrap">
              <div className="marquee-inner py-4 text-[10px] tracking-[0.45em] uppercase text-blue">
                {[
                  'Blue Blooms',
                  'Fresh daily stems',
                  'Wedding floral styling',
                  'Luxury gifting',
                  'Doha delivery',
                  'Blue Blooms',
                  'Fresh daily stems',
                  'Wedding floral styling',
                  'Luxury gifting',
                  'Doha delivery',
                ].map((item, index) => (
                  <span key={`${item}-${index}`} className="px-8">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24" dir="rtl">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.45em] uppercase text-blue">
                Selected bouquets
              </p>
              <h2 className="mt-3 font-display text-4xl text-charcoal sm:text-5xl">
                مختاراتنا
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden border-b border-[var(--charcoal)]/30 pb-0.5 text-[10px] tracking-[0.35em] uppercase text-charcoal transition-colors hover:border-blue hover:text-blue md:inline-block"
            >
              عرض الكل
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/products"
              className="inline-block border-b border-[var(--charcoal)]/30 pb-0.5 text-[10px] tracking-[0.35em] uppercase text-charcoal transition-colors hover:border-blue hover:text-blue"
            >
              عرض الكل
            </Link>
          </div>
        </section>

        <section id="about" className="relative overflow-hidden bg-charcoal">
          <FlowerBackground
            id="about-flower"
            className="pointer-events-none absolute inset-0 h-full w-full text-[var(--blue)] opacity-[0.08]"
          />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:py-24">
            <div className="hidden items-center justify-center lg:flex">
              <div className="flex h-72 w-72 items-center justify-center border border-white/10 bg-white/5">
                <span className="font-display text-8xl text-blue">✿</span>
              </div>
            </div>

            <div dir="rtl">
              <p className="text-[10px] tracking-[0.45em] uppercase text-blue">
                Our story · قصتنا
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-cream sm:text-5xl">
                نرتب الزهور كأنها لغة
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-[var(--cream)]/74">
                نحن نهتم بوضوح التكوين أكثر من الزخرفة الزائدة. كل باقة تُراجع
                بصرياً قبل التسليم لتبدو متوازنة، ناعمة، ومناسبة للمناسبة التي
                صُممت من أجلها.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {STORY_POINTS.map((point) => (
                  <div key={point} className="border border-white/10 bg-white/5 p-5">
                    <p className="text-sm leading-7 text-[var(--cream)]/66">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:items-stretch lg:py-24">
          <div className="border border-[var(--line)] bg-white p-7 sm:p-10" data-surface dir="rtl">
            <p className="text-[10px] tracking-[0.45em] uppercase text-blue">
              Why us · لماذا نحن
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
              تجربة شراء مرتبة،
              <br />
              وصورة نهائية أنيقة
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--charcoal)]/62">
              صممنا الموقع حول الباقة نفسها: مساحة بيضاء كافية، إيقاع هادئ،
              وتركيز على التفاصيل التي تساعد العميل على الاختيار بسرعة دون
              ازدحام بصري.
            </p>

            <div className="mt-8 space-y-4">
              {SERVICE_CARDS.map((card) => (
                <div
                  key={card.label}
                  className="border border-[var(--line)] bg-[rgba(244,248,255,0.66)] p-5 transition-colors hover:border-blue"
                >
                  <p className="text-[10px] tracking-[0.35em] uppercase text-blue">
                    {card.label}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--charcoal)]/68">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            id="events"
            className="relative overflow-hidden border border-[var(--line)] bg-charcoal"
          >
            <FlowerBackground
              id="events-flower"
              className="pointer-events-none absolute inset-0 h-full w-full text-[var(--blue)] opacity-[0.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(7,24,47,0.24)] via-transparent to-[rgba(7,24,47,0.5)]" />
            <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-10" dir="rtl">
              <div>
                <p className="text-[10px] tracking-[0.45em] uppercase text-blue">
                  Events · للفعاليات
                </p>
                <h2 className="mt-4 max-w-md font-display text-4xl leading-tight text-cream sm:text-5xl">
                  تنسيق الأعراس والفعاليات
                </h2>
                <p className="mt-6 max-w-lg text-base leading-8 text-[var(--cream)]/68">
                  من الطاولات الصغيرة إلى المشاهد الكبيرة، نبني لغة لونية هادئة
                  تحافظ على الفخامة دون ضجيج.
                </p>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                <a
                  href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الفعاليات"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue px-6 py-4 text-[10px] tracking-[0.38em] uppercase text-cream transition-colors hover:bg-blue-light"
                >
                  تواصل معنا
                </a>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center border border-white/15 bg-white/5 px-6 py-4 text-[10px] tracking-[0.38em] uppercase text-cream transition-colors hover:border-blue hover:text-blue"
                >
                  تصفح المجموعة
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24" dir="rtl">
          <div className="mb-12 text-center">
            <p className="text-[10px] tracking-[0.45em] uppercase text-blue">
              Contact · تواصل معنا
            </p>
            <h2 className="mt-3 font-display text-4xl text-charcoal sm:text-5xl">
              نحن في خدمتك
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: 'الموقع', val: 'الدوحة، قطر', sub: 'Doha, Qatar' },
              { label: 'واتساب', val: '+٩٧٤ ٧٤١٢ ٣٤٥٦', sub: 'WhatsApp 24/7' },
              { label: 'ساعات العمل', val: 'يومياً ٩ ص — ١٠ م', sub: 'Daily 9 AM — 10 PM' },
            ].map((item) => (
              <div key={item.label} className="border border-[var(--line)] bg-white p-8 text-center" data-surface>
                <p className="text-[10px] tracking-[0.45em] uppercase text-blue">
                  {item.label}
                </p>
                <p className="mt-4 font-display text-2xl text-charcoal">{item.val}</p>
                <p className="mt-3 text-[10px] tracking-[0.32em] uppercase text-[var(--charcoal)]/44">
                  {item.sub}
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
        className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 border border-white/20 bg-[#25D366] px-5 py-3 text-sm font-medium text-white shadow-[0_10px_28px_rgba(37,211,102,0.32)] transition-colors hover:bg-[#1ebe5c]"
        aria-label="WhatsApp"
      >
        <WaIcon />
        <span className="hidden sm:inline">اطلب الآن</span>
      </a>
    </>
  );
}

function FlowerBackground({
  className = '',
  id = 'flower-tile',
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
            <circle r="8" />
            <ellipse cy="-24" rx="9" ry="18" />
            <ellipse cy="24" rx="9" ry="18" />
            <ellipse cx="-24" rx="18" ry="9" />
            <ellipse cx="24" rx="18" ry="9" />
            <ellipse cx="-17" cy="-17" rx="7" ry="14" transform="rotate(-45)" />
            <ellipse cx="17" cy="17" rx="7" ry="14" transform="rotate(-45)" />
            <ellipse cx="17" cy="-17" rx="7" ry="14" transform="rotate(45)" />
            <ellipse cx="-17" cy="17" rx="7" ry="14" transform="rotate(45)" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} opacity="0.8" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
