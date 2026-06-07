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
    const { data, error } = await sb.from('products').select('*').eq('is_featured', true).eq('in_stock', true).limit(3);
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

const placeholders: Product[] = [
  { id: 1, name_ar: 'باقة الورد الملكي', name_en: 'Royal Rose Bouquet', description_ar: 'باقة فاخرة من أجمل الورود الحمراء والبيضاء', description_en: 'Luxurious red and white roses', price: 250, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=1000&fit=crop', category: 'باقات الورود', in_stock: true, is_featured: true, created_at: '' },
  { id: 2, name_ar: 'ترتيب الأوركيد الفاخر', name_en: 'Luxury Orchid Arrangement', description_ar: 'تشكيلة راقية من زهور الأوركيد النادرة', description_en: 'Rare orchid collection', price: 380, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=800&h=1000&fit=crop', category: 'الباقات الملكية', in_stock: true, is_featured: true, created_at: '' },
  { id: 3, name_ar: 'إكليل العروس الفاخر', name_en: 'Bridal Crown Bouquet', description_ar: 'باقة العروس الأحلام من أبيض الزهور', description_en: 'Dream bridal bouquet', price: 550, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop', category: 'زهور عروس', in_stock: true, is_featured: true, created_at: '' },
];

const collections = [
  { ar: 'باقات الورود', en: 'Rose Bouquets', img: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=800&h=1000&fit=crop' },
  { ar: 'الباقات الملكية', en: 'Royal Arrangements', img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=800&h=1000&fit=crop' },
  { ar: 'زهور عروس', en: 'Bridal Flowers', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop' },
];

const highlights = [
  { num: '01', title: 'تنسيق شخصي', text: 'نصمم كل باقة لتناسب المناسبة والذوق والمشهد النهائي المطلوب.' },
  { num: '02', title: 'جودة يومية', text: 'نختار الزهور الطازجة بعناية ونحافظ على حضورها النقي حتى التسليم.' },
  { num: '03', title: 'توصيل هادئ', text: 'خدمة سريعة ومنظمة مع تجربة شراء مختصرة وواضحة من البداية للنهاية.' },
];

export default async function HomePage() {
  const featured = await getFeatured();
  const products = featured.length ? featured : placeholders;

  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────── */}
        <section className="bg-white pt-[72px]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center py-16 lg:py-24">

              <div dir="rtl">
                <div className="fade-up flex items-center gap-3 mb-8">
                  <span className="h-px w-8 bg-[var(--navy)]" />
                  <span className="eyebrow font-arabic">Boutique Florals · الدوحة</span>
                </div>

                <h1 className="fade-up-2 font-display text-[clamp(4.2rem,9.5vw,8.5rem)] leading-[0.87] text-[var(--text)]">
                  زهور
                  <span className="block italic text-[var(--navy)]">هادئة</span>
                  وفاخرة
                </h1>

                <p className="fade-up-3 mt-8 max-w-md font-arabic text-base leading-8 text-[var(--text-muted)]">
                  واجهة نقية، ألوان محكومة، وباقات مصممة لتناسب أرقى المناسبات بذوق هادئ ومعبّر.
                </p>

                <div className="fade-up-4 mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/products"
                    className="btn-navy inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-arabic text-sm font-medium"
                  >
                    تصفح المنتجات
                    <ArrowIcon />
                  </Link>
                  <a
                    href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-arabic text-sm font-medium"
                  >
                    تواصل عبر واتساب
                  </a>
                </div>

                <div className="mt-14 grid grid-cols-3 gap-6 max-w-sm">
                  {[['+500', 'باقة مُسلَّمة'], ['100%', 'زهور طازجة'], ['24h', 'توصيل سريع']].map(([num, label]) => (
                    <div key={num} className="border-t border-[var(--border)] pt-4">
                      <p className="font-display text-3xl leading-none text-[var(--navy)]">{num}</p>
                      <p className="mt-1.5 font-arabic text-xs text-[var(--text-muted)]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] img-zoom bg-[var(--off-white)]">
                  <Image
                    src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=1200&h=1600&fit=crop"
                    alt="Luxury floral arrangement"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/20 to-transparent" />
                </div>

                <div className="absolute -bottom-5 right-6 bg-white border border-[var(--border)] rounded-2xl px-5 py-4 shadow-[0_8px_30px_rgba(11,37,69,0.08)]" dir="rtl">
                  <p className="font-display text-xl leading-none text-[var(--navy)]">تصاميم مخصصة</p>
                  <p className="font-arabic text-xs text-[var(--text-muted)] mt-1.5">لكل مناسبة ولون</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Brand bar ────────────────────────── */}
        <section className="border-y border-[var(--border)] bg-[var(--off-white)] py-4">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
              {['زهور طازجة يومياً', 'تصاميم فردية', 'تغليف فاخر', 'توصيل في نفس اليوم', 'خدمة واتساب'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 font-arabic text-xs text-[var(--text-muted)] whitespace-nowrap">
                  <span className="h-1 w-1 rounded-full bg-[var(--navy)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Collections ──────────────────────── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="mb-12 flex items-end justify-between gap-6" dir="rtl">
              <div>
                <p className="eyebrow font-arabic">Collections</p>
                <h2 className="mt-3 font-display text-[clamp(2.4rem,4.5vw,4.5rem)] leading-none text-[var(--text)]">
                  تصنيفات مختارة
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden sm:inline-flex font-arabic text-sm text-[var(--text-muted)] hover:text-[var(--navy)] transition-colors"
              >
                عرض الكل ←
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {collections.map((col, idx) => (
                <Link
                  key={col.ar}
                  href={`/products?category=${encodeURIComponent(col.ar)}`}
                  className={`lux-card group relative overflow-hidden rounded-2xl ${idx === 1 ? 'md:translate-y-8' : ''}`}
                >
                  <div className="relative aspect-[3/4] img-zoom">
                    <Image src={col.img} alt={col.en} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/70 via-[var(--navy)]/10 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white" dir="rtl">
                    <p className="eyebrow font-arabic text-white/60">Selected range</p>
                    <h3 className="mt-2 font-display text-[2.4rem] leading-none">{col.ar}</h3>
                    <p className="mt-1.5 font-arabic text-sm text-white/75">{col.en}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why us ───────────────────────────── */}
        <section className="bg-[var(--off-white)] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] items-start" dir="rtl">

              <div className="lg:sticky lg:top-28">
                <p className="eyebrow font-arabic">Why us</p>
                <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,4.2rem)] leading-[1.02] text-[var(--text)]">
                  تجربة شراء أبسط،<br />
                  <span className="italic text-[var(--navy)]">وصورة نهائية أرقى</span>
                </h2>
                <p className="mt-5 font-arabic text-base leading-8 text-[var(--text-muted)] max-w-sm">
                  صممنا المتجر ليكون خفيفاً، سهل التصفح، ومركزاً على المنتج. لا ضوضاء بصرية، لا عناصر زائدة.
                </p>
              </div>

              <div>
                {highlights.map((item, i) => (
                  <div
                    key={item.num}
                    className={`flex items-start gap-6 py-7 ${i < highlights.length - 1 ? 'border-b border-[var(--border)]' : ''}`}
                  >
                    <span className="font-display text-2xl leading-none text-[var(--navy)] opacity-40 shrink-0 w-8">
                      {item.num}
                    </span>
                    <div>
                      <p className="font-display text-2xl leading-none text-[var(--text)]">{item.title}</p>
                      <p className="mt-2.5 font-arabic text-sm leading-7 text-[var(--text-muted)]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured products ─────────────────── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="mb-12 flex items-end justify-between gap-6" dir="rtl">
              <div>
                <p className="eyebrow font-arabic">Featured</p>
                <h2 className="mt-3 font-display text-[clamp(2.4rem,4.5vw,4.5rem)] leading-none text-[var(--text)]">
                  مختارات مميزة
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden sm:inline-flex font-arabic text-sm text-[var(--text-muted)] hover:text-[var(--navy)] transition-colors"
              >
                استكشاف المتجر ←
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────── */}
        <section className="bg-[var(--navy)] py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-10 text-center" dir="rtl">
            <p className="eyebrow font-arabic text-white/40">Private orders</p>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,5.5vw,5.5rem)] leading-[0.92] text-white">
              ترتيبات خاصة<br />
              <span className="italic">لمناسباتك الأهم</span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl font-arabic text-base leading-8 text-white/65">
              إذا احتجت باقة مخصصة، أو لوناً محدداً، أو خدمة سريعة في يوم المناسبة، نرتب لك التفاصيل مباشرة عبر واتساب.
            </p>
            <a
              href="https://wa.me/97412345678?text=مرحباً، أريد طلب ترتيب خاص"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-white rounded-full px-8 py-4 font-arabic text-sm font-medium text-[var(--navy)] hover:bg-[var(--off-white)] transition-colors"
            >
              <WaIcon />
              اطلب ترتيباً خاصاً
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <a
        href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-wa fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3 font-arabic text-sm font-medium shadow-lg"
      >
        <WaIcon />
        اطلب الآن
      </a>
    </>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
