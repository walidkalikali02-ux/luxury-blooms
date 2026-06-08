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
  {
    id: 1,
    name_ar: 'باقة الورد الملكي',
    name_en: 'Royal Rose Bouquet',
    description_ar: '',
    description_en: '',
    price: 250,
    currency: 'QAR',
    image_url: 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=1000&fit=crop',
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
    image_url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=800&h=1000&fit=crop',
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
    image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop',
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
    image_url: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=800&h=1000&fit=crop',
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
    image_url: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&h=1000&fit=crop',
    category: 'الباقات الملكية',
    in_stock: true,
    is_featured: true,
    created_at: '',
  },
  {
    id: 6,
    name_ar: 'صندوق الزهور',
    name_en: 'Floral Gift Box',
    description_ar: '',
    description_en: '',
    price: 420,
    currency: 'QAR',
    image_url: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=1000&fit=crop',
    category: 'هدايا فاخرة',
    in_stock: true,
    is_featured: true,
    created_at: '',
  },
];

const collections = [
  {
    ar: 'باقات الورد',
    en: 'Signature bouquets',
    img: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=900&h=1100&fit=crop',
  },
  {
    ar: 'تنسيقات المناسبات',
    en: 'Event arrangements',
    img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=900&h=1100&fit=crop',
  },
  {
    ar: 'زهور العروس',
    en: 'Bridal flowers',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&h=1100&fit=crop',
  },
];

const highlights = [
  {
    title: 'تنسيق شخصي',
    text: 'نصمم كل باقة لتناسب المناسبة والذوق والمشهد النهائي المطلوب.',
  },
  {
    title: 'جودة يومية',
    text: 'نختار الزهور الطازجة بعناية ونحافظ على حضورها النقي حتى التسليم.',
  },
  {
    title: 'توصيل هادئ',
    text: 'خدمة سريعة ومنظمة مع تجربة شراء مختصرة وواضحة من البداية للنهاية.',
  },
];

const quoteBlocks = [
  {
    title: 'Blue calm',
    text: 'We keep the palette light, the typography refined, and the product the focus.',
  },
  {
    title: 'Crafted daily',
    text: 'Every bouquet is assembled with the same discipline, freshness, and quiet luxury.',
  },
];

const marqueeItems = [
  'زهور طازجة يومياً',
  'Fresh Flowers Daily',
  'توصيل سريع للدوحة',
  'باقات مخصصة',
  'Bespoke Arrangements',
  'أعراس وفعاليات',
  'Wedding & Events',
  'زهور فاخرة',
  'Luxury Blooms',
];

export default async function HomePage() {
  const featured = await getFeatured();
  const products = featured.length ? featured : placeholders;

  return (
    <>
      <Navbar />

      <main>
        <section className="relative min-h-screen overflow-hidden bg-white pt-20">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1800&h=1200&fit=crop"
              alt="Luxury flower arrangement"
              fill
              priority
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/54" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
          </div>

          <div className="absolute top-0 right-0 h-[38vw] w-[38vw] rounded-full bg-[var(--primary)]/8 blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-14 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div dir="rtl">
                <div className="fade-up mb-6 flex items-center gap-4">
                  <span className="h-px w-12 bg-[var(--primary)]/35" />
                  <span className="eyebrow font-arabic">Welcome to Luxury Blooms</span>
                </div>

                <h1 className="fade-up-2 font-display text-[clamp(3.3rem,8vw,6.8rem)] leading-[0.92] text-[var(--text-main)]">
                  زهور
                  <span className="block text-[var(--primary)]">بأجواء</span>
                  <span className="block text-[var(--text-main)]">هادئة وفاخرة</span>
                </h1>

                <p className="fade-up-3 mt-6 max-w-xl font-arabic text-base leading-8 text-[var(--text-sub)] sm:text-lg">
                  مستوحى من صفاء المتاجر الراقية، لكن مخصص للزهور: أبيض واسع، أزرق أنيق، وترتيب يضع جمال الباقة في المقدمة.
                </p>

                <div className="fade-up-4 mt-9 flex flex-wrap items-center gap-4">
                  <Link href="/products" className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-arabic text-sm font-semibold">
                    تصفح التشكيلة
                    <ChevronIcon />
                  </Link>
                  <a
                    href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-arabic text-sm font-semibold"
                  >
                    تواصل معنا
                  </a>
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-3">
                  {[
                    ['01', 'زهور يومية'],
                    ['02', 'تنسيق خاص'],
                    ['03', 'توصيل سريع'],
                  ].map(([num, label]) => (
                    <div key={num} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg-sub)] px-4 py-4">
                      <p className="font-display text-2xl leading-none text-[var(--primary)]">{num}</p>
                      <p className="mt-2 font-arabic text-sm text-[var(--text-sub)]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="hero-panel overflow-hidden rounded-[2rem] p-4 sm:p-5">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=1200&h=1400&fit=crop"
                      alt="Luxury blue floral arrangement"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(16,36,63,0.28)] via-transparent to-white/10" />

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="surface max-w-xs rounded-[1.25rem] px-4 py-3 text-right" dir="rtl">
                        <p className="eyebrow font-arabic">Fresh selection</p>
                        <p className="mt-1 font-display text-2xl text-[var(--primary)]">Blue Signature</p>
                        <p className="mt-1 font-arabic text-sm text-[var(--text-sub)]">Bouquets made for elegant gifting.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {['زهور طازجة', 'تغليف راقٍ', 'ألوان زرقاء هادئة', 'خدمة واتساب سريعة'].map((item) => (
                      <div key={item} className="rounded-[1.25rem] border border-[var(--border)] bg-white px-4 py-3 font-arabic text-sm text-[var(--text-sub)]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-[var(--primary)] overflow-hidden py-3.5 select-none">
          <div className="marquee-track flex whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex shrink-0 items-center">
                {marqueeItems.map((item) => (
                  <span key={`${item}-${i}`} className="inline-flex items-center">
                    <span className="px-5 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-white/80 font-light">
                      {item}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/50" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <section className="border-y border-[var(--border)] bg-[var(--bg-sub)]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-arabic text-xs text-[var(--text-sub)]">
              {['زهور طازجة يومياً', 'تصميمات فردية', 'تغليف فاخر', 'توصيل في نفس اليوم'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell bg-white py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="mb-10 flex items-end justify-between gap-6" dir="rtl">
              <div>
                <p className="eyebrow font-arabic">Collections</p>
                <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,4.2rem)] leading-none text-[var(--text-main)]">
                  تصنيفات مختارة
                </h2>
              </div>
              <Link href="/products" className="hidden sm:inline-flex font-arabic text-sm text-[var(--primary)] transition-colors hover:text-[var(--primary-strong)]">
                عرض جميع المنتجات
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {collections.map((col, idx) => (
                <Link
                  key={col.ar}
                  href={`/products?category=${encodeURIComponent(col.ar)}`}
                  className={`lux-card group relative overflow-hidden rounded-[2rem] ${idx === 1 ? 'md:translate-y-8' : ''}`}
                >
                  <div className="relative aspect-[4/5]">
                    <Image src={col.img} alt={col.en} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(16,36,63,0.76)] via-[rgba(16,36,63,0.1)] to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white" dir="rtl">
                    <p className="eyebrow font-arabic text-white/70">Selected range</p>
                    <h3 className="mt-2 font-display text-[2.2rem] leading-none">{col.ar}</h3>
                    <p className="mt-2 font-arabic text-sm text-white/80">{col.en}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--primary)] py-20 lg:py-24 text-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]" dir="rtl">
              <div>
                <p className="eyebrow font-arabic text-white/70">Poetic notes</p>
                <h2 className="mt-3 font-display text-[clamp(2.4rem,4vw,4.6rem)] leading-none">
                  الزهور عندنا لا تُعرض فقط
                  <span className="block text-white/75">بل تُنسّق كأنها قطعة فنية</span>
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                  <p className="font-display text-2xl text-white">تناغم بصري</p>
                  <p className="mt-3 font-arabic text-sm leading-7 text-white/75">
                    لوحة زرقاء هادئة تمنح المتجر شخصية مميزة، مع مساحات بيضاء نظيفة تمنح المنتج حضوره الكامل.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                  <p className="font-display text-2xl text-white">دقة في التفاصيل</p>
                  <p className="mt-3 font-arabic text-sm leading-7 text-white/75">
                    كل زر، صورة، ومسافة محسوبة لتبدو الواجهة مرتبة ومتحكمة دون أن تفقد دفء البوتيك.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]" dir="rtl">
              <div className="max-w-xl">
                <p className="eyebrow font-arabic">Why us</p>
                <h2 className="mt-3 font-display text-[clamp(2.1rem,3.8vw,4rem)] leading-none text-[var(--text-main)]">
                  تجربة شراء أبسط، وصورة نهائية أرقى
                </h2>
                <p className="mt-5 font-arabic text-base leading-8 text-[var(--text-sub)]">
                  صممنا الواجهة لتكون خفيفة، سهلة التصفح، ومركزة على المنتج. لا ضوضاء بصرية، لا عناصر زائدة، فقط زهور تظهر بثقة.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item.title} className="lux-card rounded-[1.5rem] p-5">
                    <p className="font-display text-2xl text-[var(--primary)]">{item.title}</p>
                    <p className="mt-3 font-arabic text-sm leading-7 text-[var(--text-sub)]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell bg-white py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="mb-10 flex items-end justify-between gap-6" dir="rtl">
              <div>
                <p className="eyebrow font-arabic">Featured</p>
                <h2 className="mt-3 font-display text-[clamp(2.1rem,4vw,4rem)] leading-none text-[var(--text-main)]">
                  مختارات مميزة
                </h2>
              </div>
              <Link href="/products" className="hidden sm:inline-flex font-arabic text-sm text-[var(--primary)] transition-colors hover:text-[var(--primary-strong)]">
                استكشاف المتجر
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg-sub)] py-20 lg:py-24">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-10 text-center" dir="rtl">
            <div className="space-y-6">
              <p className="eyebrow font-arabic">Editorial quote</p>
              <blockquote className="font-display text-[clamp(2rem,3.8vw,4rem)] leading-[1.1] text-[var(--text-main)]">
                &quot;في كل باقة، نحاول أن نحافظ على الشيء الأهم:
                <span className="block text-[var(--primary)]">أن يبدو الجمال هادئاً، نقيّاً، ومقصوداً.&quot;</span>
              </blockquote>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 text-right">
              {quoteBlocks.map((item) => (
                <div key={item.title} className="surface rounded-[1.5rem] p-6" dir="rtl">
                  <p className="font-display text-2xl text-[var(--primary)]">{item.title}</p>
                  <p className="mt-3 font-arabic text-sm leading-7 text-[var(--text-sub)]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--border)] bg-[var(--bg-sub)] py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]" dir="rtl">
              <div>
                <p className="eyebrow font-arabic">Small notes</p>
                <h2 className="mt-3 font-display text-[clamp(2.1rem,3.8vw,4rem)] leading-none text-[var(--text-main)]">
                  أربعة وعود بسيطة
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-4">
                {[
                  ['01', 'طازجة'],
                  ['02', 'يدوية'],
                  ['03', 'سريعة'],
                  ['04', 'أنيقة'],
                ].map(([num, label]) => (
                  <div key={num} className="surface rounded-[1.4rem] p-4">
                    <p className="font-display text-2xl text-[var(--primary)]">{num}</p>
                    <p className="mt-2 font-arabic text-sm text-[var(--text-sub)]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell bg-[var(--primary)] py-20 text-white lg:py-24">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-10 text-center" dir="rtl">
            <p className="eyebrow font-arabic text-white/70">Private orders</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,4.6rem)] leading-none">
              ترتيبات خاصة لمناسباتك الأهم
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-arabic text-base leading-8 text-white/78 sm:text-lg">
              إذا احتجت باقة مخصصة، أو لوناً محدداً، أو خدمة سريعة في يوم المناسبة، نرتب لك التفاصيل مباشرة عبر واتساب.
            </p>
            <a
              href="https://wa.me/97412345678?text=مرحباً، أريد طلب ترتيب خاص"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-arabic text-sm font-semibold text-[var(--primary)] transition-transform hover:-translate-y-0.5"
            >
              <WaIconDark />
              اطلب ترتيباً خاصاً
            </a>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-24">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="surface rounded-[2rem] p-6 lg:p-8" dir="rtl">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="eyebrow font-arabic">Subscribe</p>
                  <h2 className="mt-3 font-display text-[clamp(2rem,3.5vw,3.5rem)] leading-none text-[var(--text-main)]">
                    اشترك ليصلك الجديد قبل الجميع
                  </h2>
                  <p className="mt-4 font-arabic text-sm leading-7 text-[var(--text-sub)]">
                    عروض موسمية، باقات محدودة، وتحديثات عن وصول التشكيلات الجديدة.
                  </p>
                </div>

                <form className="flex w-full flex-col gap-3 sm:min-w-[28rem] sm:flex-row">
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="w-full rounded-full border border-[var(--border)] bg-white px-5 py-3 font-arabic text-sm text-[var(--text-main)] outline-none placeholder:text-[var(--text-sub)] focus:border-[var(--primary)]"
                  />
                  <button className="btn-primary rounded-full px-6 py-3.5 font-arabic text-sm font-semibold">
                    اشتراك
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a
        href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-wa fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-3 text-xs sm:text-sm font-medium shadow-[0_12px_30px_rgba(37,211,102,0.3)]"
      >
        <WaIcon />
        <span className="hidden sm:inline">اطلب الآن</span>
      </a>
    </>
  );
}

function ChevronIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function WaIconDark() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
