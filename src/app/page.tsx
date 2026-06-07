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
  { num: '01', ar: 'باقات الورود',    en: 'Rose Bouquets',       img: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=900&h=1200&fit=crop' },
  { num: '02', ar: 'الباقات الملكية', en: 'Royal Arrangements',  img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=900&h=1200&fit=crop' },
  { num: '03', ar: 'زهور العروس',     en: 'Bridal Flowers',      img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&h=1200&fit=crop' },
];

const highlights = [
  { num: '01', title: 'تنسيق شخصي', en: 'Personal',  text: 'نصمم كل باقة لتناسب المناسبة والذوق والمشهد النهائي المطلوب.' },
  { num: '02', title: 'جودة يومية', en: 'Daily',     text: 'نختار الزهور الطازجة بعناية ونحافظ على حضورها النقي حتى التسليم.' },
  { num: '03', title: 'توصيل هادئ', en: 'Effortless', text: 'خدمة سريعة ومنظمة مع تجربة شراء مختصرة وواضحة من البداية للنهاية.' },
];

const marqueeItems = [
  'زهور طازجة يومياً',
  'تصاميم فردية',
  'تغليف فاخر',
  'توصيل في نفس اليوم',
  'خدمة واتساب',
  'تنسيق شخصي',
  'باقات حصرية',
];

export default async function HomePage() {
  const featured = await getFeatured();
  const products = featured.length ? featured : placeholders;

  return (
    <>
      <Navbar />

      <main>
        {/* ════════ Hero ════════ */}
        <section className="bg-white pt-[78px]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center pt-14 lg:pt-20 pb-16 lg:pb-24">

              <div dir="rtl">
                <div className="fade-up flex items-center gap-3">
                  <span className="h-px w-10 bg-[var(--blue)]" />
                  <span className="eyebrow">Atelier · الدوحة</span>
                </div>

                <h1 className="fade-up-2 mt-8 font-display font-light text-[clamp(4.5rem,11vw,10rem)] leading-[0.86] tracking-[-0.01em] text-[var(--ink)]">
                  بوتيك
                  <span className="block">الزهور</span>
                  <span className="block italic font-normal text-[var(--blue)]">الفاخرة</span>
                </h1>

                <p className="fade-up-3 mt-10 max-w-md font-arabic text-[15px] leading-[1.9] text-[var(--text)]">
                  واجهة نقية، تفاصيل محكومة، وباقات مصممة بهدوء وذوق رفيع لتعبّر عن أرقى المناسبات.
                </p>

                <div className="fade-up-4 mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href="/products"
                    className="btn-blue inline-flex items-center gap-3 rounded-full px-8 py-3.5 font-arabic text-sm font-medium"
                  >
                    تصفح المجموعة
                    <ArrowIcon />
                  </Link>
                  <a
                    href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-arabic text-sm text-[var(--ink)] underline underline-offset-8 decoration-[var(--border-mid)] hover:decoration-[var(--blue)] transition-colors"
                  >
                    تواصل عبر واتساب
                  </a>
                </div>

                <div className="fade-up-5 mt-16 grid grid-cols-3 gap-8 max-w-md">
                  {[['+500', 'باقة مُسلَّمة'], ['100%', 'زهور طازجة'], ['24h', 'توصيل']].map(([num, label]) => (
                    <div key={num}>
                      <span className="rule" />
                      <p className="mt-4 font-display text-[2.2rem] leading-none text-[var(--ink)]">{num}</p>
                      <p className="mt-2 font-arabic text-xs text-[var(--muted)]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: image */}
              <div className="relative fade-up-3">
                <div className="absolute -top-4 right-0 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--muted)]">
                  Nº 001 — Signature
                </div>
                <div className="relative overflow-hidden img-zoom aspect-[3/4] bg-[var(--cream)]">
                  <Image
                    src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=1200&h=1600&fit=crop"
                    alt="Luxury floral arrangement"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white border border-[var(--border)] px-5 py-4 shadow-[0_12px_40px_rgba(10,15,31,0.08)]" dir="rtl">
                  <p className="eyebrow text-[var(--blue)]">Bespoke</p>
                  <p className="mt-2 font-display text-xl leading-none text-[var(--ink)]">تصاميم مخصصة</p>
                  <p className="mt-1.5 font-arabic text-[11px] text-[var(--muted)]">لكل مناسبة ولون</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ Marquee ════════ */}
        <section className="border-y border-[var(--border)] bg-[var(--cream)] overflow-hidden py-5">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3 font-arabic text-sm text-[var(--ink)] whitespace-nowrap">
                {item}
                <Diamond />
              </span>
            ))}
          </div>
        </section>

        {/* ════════ Collections ════════ */}
        <section className="bg-white py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="mb-14 grid lg:grid-cols-2 gap-8 items-end" dir="rtl">
              <div>
                <p className="eyebrow">Collections</p>
                <h2 className="mt-4 font-display font-light text-[clamp(2.6rem,5vw,5rem)] leading-[0.95] text-[var(--ink)]">
                  تصنيفات
                  <span className="italic text-[var(--blue)]"> مختارة</span>
                </h2>
              </div>
              <div className="lg:text-left">
                <p className="font-arabic text-[15px] leading-8 text-[var(--muted)] max-w-md lg:ml-auto">
                  ثلاث مجموعات تعكس الذوق الهادئ والدقة في الترتيب.
                </p>
                <Link
                  href="/products"
                  className="mt-5 inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                >
                  <span className="h-px w-8 bg-current" />
                  View all
                </Link>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {collections.map((col, idx) => (
                <Link
                  key={col.ar}
                  href={`/products?category=${encodeURIComponent(col.ar)}`}
                  className={`group ${idx === 1 ? 'md:translate-y-10' : ''}`}
                >
                  <div className="relative overflow-hidden img-zoom aspect-[3/4] bg-[var(--cream)] border border-[var(--border)]">
                    <Image src={col.img} alt={col.en} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/55 via-transparent to-transparent" />
                    <span className="absolute top-5 left-5 font-mono text-[11px] tracking-[0.3em] text-white">
                      {col.num}
                    </span>
                  </div>
                  <div className="pt-5 flex items-baseline justify-between gap-4" dir="rtl">
                    <div>
                      <h3 className="font-display text-[1.85rem] leading-none text-[var(--ink)] group-hover:text-[var(--blue)] transition-colors duration-300">
                        {col.ar}
                      </h3>
                      <p className="mt-1.5 font-arabic text-xs text-[var(--muted)]">{col.en}</p>
                    </div>
                    <ArrowIcon className="h-4 w-4 text-[var(--ink)] -rotate-90 lg:rotate-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ Manifesto / Why us ════════ */}
        <section className="bg-[var(--cream)] py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">

            <div className="text-center max-w-3xl mx-auto" dir="rtl">
              <p className="eyebrow">Maison Manifesto</p>
              <h2 className="mt-6 font-display font-light text-[clamp(2.4rem,5vw,5rem)] leading-[1.02] text-[var(--ink)]">
                تجربة شراء أبسط،
                <br />
                <span className="italic text-[var(--blue)]">وصورة نهائية أرقى.</span>
              </h2>
              <p className="mx-auto mt-8 max-w-xl font-arabic text-[15px] leading-[1.9] text-[var(--muted)]">
                صممنا المتجر ليكون خفيفاً، سهل التصفح، ومركّزاً على المنتج. لا ضوضاء بصرية، لا عناصر زائدة — فقط زهور تظهر بثقة.
              </p>
            </div>

            <div className="mt-20 grid gap-px bg-[var(--border)] md:grid-cols-3 border border-[var(--border)]">
              {highlights.map((item) => (
                <div key={item.num} className="bg-[var(--cream)] p-8 lg:p-10" dir="rtl">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs tracking-[0.28em] text-[var(--blue)]">{item.num}</span>
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--hint)]">{item.en}</span>
                  </div>
                  <p className="mt-8 font-display text-[2rem] leading-none text-[var(--ink)]">{item.title}</p>
                  <p className="mt-4 font-arabic text-sm leading-[1.85] text-[var(--muted)]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ Featured products ════════ */}
        <section className="bg-white py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="mb-14 flex items-end justify-between gap-6" dir="rtl">
              <div>
                <p className="eyebrow">Selection</p>
                <h2 className="mt-4 font-display font-light text-[clamp(2.6rem,5vw,5rem)] leading-[0.95] text-[var(--ink)]">
                  مختارات
                  <span className="italic text-[var(--blue)]"> مميزة</span>
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
              >
                Shop all
                <span className="h-px w-8 bg-current" />
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════ CTA ════════ */}
        <section className="relative bg-[var(--blue)] py-28 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
          <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-10 text-center" dir="rtl">
            <p className="eyebrow text-white/50">Private orders</p>
            <h2 className="mt-6 font-display font-light text-[clamp(2.8rem,6vw,6.5rem)] leading-[0.92] text-white">
              ترتيبات خاصة
              <br />
              <span className="italic">لمناسباتك الأهم</span>
            </h2>
            <p className="mx-auto mt-10 max-w-xl font-arabic text-base leading-[1.9] text-white/75">
              باقة مخصصة، لون محدد، أو خدمة سريعة في يوم المناسبة — نرتب لك التفاصيل مباشرة عبر واتساب.
            </p>
            <a
              href="https://wa.me/97412345678?text=مرحباً، أريد طلب ترتيب خاص"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex items-center gap-3 bg-white rounded-full px-9 py-4 font-arabic text-sm font-medium text-[var(--blue)] hover:bg-[var(--cream)] transition-colors"
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
        className="btn-wa fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3 font-arabic text-sm font-medium shadow-[0_12px_30px_rgba(37,211,102,0.3)]"
      >
        <WaIcon />
        اطلب الآن
      </a>
    </>
  );
}

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function Diamond() {
  return (
    <svg className="h-1.5 w-1.5 text-[var(--blue)]" viewBox="0 0 8 8" fill="currentColor">
      <path d="M4 0L8 4L4 8L0 4Z" />
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
