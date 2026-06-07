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
  } catch { return []; }
}

const placeholders: Product[] = [
  { id: 1, name_ar: 'باقة الورد الملكي', name_en: 'Royal Rose Bouquet', description_ar: 'باقة فاخرة من أجمل الورود الحمراء والبيضاء', description_en: 'Luxurious red and white roses', price: 250, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=1000&fit=crop', category: 'باقات الورود', in_stock: true, is_featured: true, created_at: '' },
  { id: 2, name_ar: 'ترتيب الأوركيد الفاخر', name_en: 'Luxury Orchid Arrangement', description_ar: 'تشكيلة راقية من زهور الأوركيد النادرة', description_en: 'Rare orchid collection', price: 380, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=800&h=1000&fit=crop', category: 'الباقات الملكية', in_stock: true, is_featured: true, created_at: '' },
  { id: 3, name_ar: 'إكليل العروس الفاخر', name_en: 'Bridal Crown Bouquet', description_ar: 'باقة العروس الأحلام من أبيض الزهور', description_en: 'Dream bridal bouquet', price: 550, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop', category: 'زهور عروس', in_stock: true, is_featured: true, created_at: '' },
];

const collections = [
  { ar: 'باقات الورود', en: 'Rose Bouquets', img: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=600&h=800&fit=crop' },
  { ar: 'الباقات الملكية', en: 'Royal Arrangements', img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=600&h=800&fit=crop' },
  { ar: 'زهور عروس', en: 'Bridal Flowers', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=800&fit=crop' },
  { ar: 'هدايا فاخرة', en: 'Luxury Gifts', img: 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=600&h=800&fit=crop' },
];

export default async function HomePage() {
  const featured = await getFeatured();
  const products = featured.length ? featured : placeholders;
  const [p1, p2, p3] = products;

  return (
    <>
      <Navbar />

      {/* ════════════════ HERO ════════════════ */}
      <section className="flex flex-col lg:flex-row min-h-screen pt-[80px] overflow-hidden bg-[var(--bg-main)]">

        {/* Right — dramatic arched image (visual balance on right in LTR, but RTL content means text is on right, image on left. Wait, dir="rtl" applies to content. Flex-row defaults to LTR visual order. Let's force flex-row-reverse for RTL visually) */}
        <div className="flex-none w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-20 lg:py-0 relative z-10" dir="rtl">

          <div className="relative">
            <p className="fade-up font-arabic text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-8">
              قطر · بوتيك الزهور الفاخر
            </p>

            {/* Large Arabic display */}
            <h1 className="fade-up-2 font-display text-[var(--primary)] leading-[1.1] mb-2" style={{ fontSize: 'clamp(64px, 8vw, 110px)' }}>
              زهور
            </h1>
            <h1 className="fade-up-2 font-display text-[var(--primary)] leading-[1.1] mb-8" style={{ fontSize: 'clamp(64px, 8vw, 110px)' }}>
              الفخامة
            </h1>

            {/* English display */}
            <p className="fade-up-3 font-arabic text-[var(--text-sub)] text-lg mb-8 tracking-widest uppercase" style={{ fontSize: 'clamp(14px, 2vw, 18px)' }}>
              Luxury Blooms
            </p>

            <span className="fade-up-3 gold-rule mb-8 block" />

            <p className="fade-up-3 font-arabic text-[var(--primary)] text-base leading-relaxed max-w-sm mb-4">
              أرقى الباقات الزهرية المصنوعة يدوياً، مستوحاة من جمال الطبيعة والفن العربي الأصيل
            </p>

            {/* CTAs */}
            <div className="fade-up-4 flex flex-wrap gap-4 mt-10">
              <Link href="/products" className="btn-primary font-arabic text-sm font-semibold px-8 py-3.5 rounded-full">
                تصفح المجموعة
              </Link>
              <a
                href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
                target="_blank" rel="noopener noreferrer"
                className="btn-ghost font-arabic text-sm font-semibold px-8 py-3.5 rounded-full flex items-center gap-2"
              >
                <WaIcon /> اطلب الآن
              </a>
            </div>
          </div>
        </div>

        {/* Left — Image with Arch Mask */}
        <div className="flex-1 relative min-h-[70vw] lg:min-h-full flex items-end justify-center p-6 lg:p-12">
          <div className="relative w-full max-w-[500px] aspect-[3/4] lg:aspect-[4/5] arch-top overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=1400&h=1800&fit=crop"
              alt="Luxury flowers"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/40 to-transparent" />
            
            {/* Floating elegant badge */}
            <div className="absolute bottom-8 right-8 left-8 text-center bg-white/90 backdrop-blur-md px-6 py-5 arch-top" dir="rtl">
              <p className="font-arabic text-[10px] text-[var(--accent)] tracking-[0.2em] mb-2">تشكيلة جديدة</p>
              <p className="font-display text-2xl text-[var(--primary)]">لمسة الأندلس</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ MARQUEE STRIP ════════════════ */}
      <div className="bg-[var(--bg-sub)] border-y border-[var(--border)] overflow-hidden py-5 select-none">
        <div className="marquee-inner flex gap-0 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center shrink-0">
              {['زهور طازجة يومياً', 'صناعة يدوية', 'توصيل في نفس اليوم', 'فخامة لا مثيل لها', 'Fresh Daily', 'Handcrafted', 'Same Day Delivery', 'Luxury Florals'].map((t) => (
                <span key={t} className="inline-flex items-center">
                  <span className="font-arabic text-xs text-[var(--primary)] tracking-[0.2em] px-8">{t}</span>
                  <span className="text-[var(--accent)] text-xs">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════ COLLECTIONS ════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16" dir="rtl">
            <span className="gold-rule mx-auto mb-4 block" />
            <h2 className="font-display text-4xl text-[var(--primary)] mb-3">تصنيفاتنا</h2>
            <p className="font-arabic text-xs text-[var(--text-sub)] tracking-[0.2em] uppercase">Collections</p>
          </div>

          {/* 4-column portrait grid with arch top */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {collections.map((col) => (
              <Link
                key={col.ar}
                href={`/products?category=${encodeURIComponent(col.ar)}`}
                className="reveal-card group relative img-wrap overflow-hidden arch-top cursor-pointer bg-[var(--bg-sub)]"
                style={{ aspectRatio: '3/4' }}
              >
                <Image src={col.img} alt={col.en} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-center" dir="rtl">
                  <p className="font-display text-2xl text-white mb-1">{col.ar}</p>
                  <p className="font-arabic text-[10px] text-[var(--accent)] tracking-[0.2em] uppercase">{col.en}</p>
                  <p className="reveal-overlay font-arabic text-xs text-white/80 mt-4">تصفح المجموعة ←</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ EDITORIAL PRODUCT FEATURE ════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[var(--bg-sub)]">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-16" dir="rtl">
            <div>
              <span className="gold-rule mb-4 block" />
              <h2 className="font-display text-4xl text-[var(--primary)]">المنتجات المميزة</h2>
            </div>
            <Link href="/products" className="hidden sm:inline-flex items-center gap-2 font-arabic text-sm text-[var(--primary)] hover:text-[var(--accent)] transition-colors">
              عرض الكل ←
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((p) => p && (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="text-center mt-12 sm:hidden">
            <Link href="/products" className="btn-ghost font-arabic text-sm font-semibold px-8 py-3.5 rounded-full inline-block">
              عرض الكل
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ MANIFESTO ════════════════ */}
      <section className="py-32 px-6 bg-white border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[var(--accent)] text-4xl mb-8 block">✦</span>
          <blockquote className="font-display text-[var(--primary)] leading-tight mb-8" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
            "كل باقة تحكي قصة جمال ورعاية وأناقة خالدة، مستلهمة من تراثنا العربي."
          </blockquote>
          <p className="font-arabic text-[11px] text-[var(--text-sub)] tracking-[0.3em] uppercase">
            Every bouquet tells a story of beauty, care, and timeless elegance.
          </p>
        </div>
      </section>

      {/* ════════════════ PROMISE STRIP ════════════════ */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[var(--primary)] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { icon: '❀', ar: 'زهور طازجة', en: 'Fresh Daily', sub: 'أجود الأنواع' },
              { icon: '✍', ar: 'صناعة يدوية', en: 'Handcrafted', sub: 'بعناية وإبداع' },
              { icon: '✧', ar: 'توصيل سريع', en: 'Same Day', sub: 'داخل قطر' },
              { icon: '♛', ar: 'جودة فاخرة', en: 'Luxury Quality', sub: 'معايير راقية' },
            ].map((item) => (
              <div key={item.ar} className="flex flex-col items-center" dir="rtl">
                <span className="text-3xl text-[var(--accent)] mb-4">{item.icon}</span>
                <p className="font-display text-xl text-white mb-1">{item.ar}</p>
                <p className="font-arabic text-[10px] text-[var(--accent)] tracking-[0.2em] uppercase mb-3">{item.en}</p>
                <p className="font-arabic text-xs text-white/60">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ WHATSAPP CTA ════════════════ */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-arabic text-[10px] text-[var(--accent)] tracking-[0.4em] uppercase mb-5">Order Now</p>
          <h2 className="font-display text-4xl lg:text-5xl text-[var(--primary)] mb-6" dir="rtl">
            اطلب عبر واتساب مباشرةً
          </h2>
          <p className="font-arabic text-[var(--text-sub)] text-sm mb-10">
            تحدث مباشرة مع مصممي الزهور لدينا لاختيار باقتك المثالية
          </p>
          <a
            href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
            target="_blank" rel="noopener noreferrer"
            className="btn-wa inline-flex items-center gap-3 px-10 py-4 font-arabic text-base font-semibold rounded-full"
          >
            <WaIconLg /> ابدأ المحادثة
          </a>
        </div>
      </section>

      <Footer />

      {/* Sticky WA button */}
      <a
        href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 btn-wa flex items-center gap-2 px-5 py-3.5 shadow-xl font-arabic text-sm font-semibold rounded-full"
      >
        <WaIconLg /> اطلب
      </a>
    </>
  );
}

function WaIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

function WaIconLg() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}