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
  { ar: 'باقات الورود', en: 'Rose Bouquets', img: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=800&h=1000&fit=crop' },
  { ar: 'الباقات الملكية', en: 'Royal Arrangements', img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=800&h=1000&fit=crop' },
  { ar: 'زهور عروس', en: 'Bridal Flowers', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop' },
];

export default async function HomePage() {
  const featured = await getFeatured();
  const products = featured.length ? featured : placeholders;

  return (
    <>
      <Navbar />

      {/* ════════════════ HERO (FULL BLEED EDITORIAL) ════════════════ */}
      <section className="relative min-h-screen pt-[80px] overflow-hidden bg-[var(--bg-main)]">
        
        {/* Full Width Image Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=1920&h=1080&fit=crop"
            alt="Luxury floral arrangement"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-main)] via-[var(--bg-main)]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-[var(--bg-main)]/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 min-h-[calc(100vh-80px)] flex flex-col justify-center">
          
          <div className="max-w-2xl" dir="rtl">
            
            {/* Label */}
            <div className="fade-up flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-[var(--accent)]" />
              <span className="font-arabic text-xs text-[var(--accent)] tracking-[0.3em] uppercase">
                بوتيك الزهور الفاخر — قطر
              </span>
            </div>

            {/* Headline */}
            <h1 className="fade-up-2 font-display text-[var(--primary)] leading-[0.95] mb-8" style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}>
              فنُّ الورد
              <span className="block mt-2 italic text-[var(--accent)] font-light">في أبهى تجلياته</span>
            </h1>

            {/* Description */}
            <p className="fade-up-3 font-arabic text-[var(--text-sub)] text-lg leading-relaxed max-w-lg mb-12">
              نصنع لك تجربة فريدة من الفخامة والأناقة، حيث تلتقي الحرفية العالية بجمال الطبيعة في باقات تروي قصصاً من العاطفة والتميز.
            </p>

            {/* CTAs */}
            <div className="fade-up-4 flex flex-wrap items-center gap-6">
              <Link href="/products" className="btn-primary font-arabic text-sm font-semibold px-10 py-4 rounded-full inline-flex items-center gap-3">
                <span>اكتشف التشكيلة</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              
              <a
                href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
                target="_blank" rel="noopener noreferrer"
                className="font-arabic text-sm text-[var(--primary)] hover:text-[var(--accent)] transition-colors flex items-center gap-2 border-b border-[var(--primary)] hover:border-[var(--accent)] pb-1"
              >
                تواصل عبر واتساب
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="font-arabic text-[10px] text-[var(--text-sub)] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--text-sub)] to-transparent" />
        </div>
      </section>

      {/* ════════════════ MARQUEE STRIP ════════════════ */}
      <div className="bg-[var(--primary)] overflow-hidden py-5 select-none border-y border-[var(--primary)]">
        <div className="marquee-inner flex gap-0 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center shrink-0">
              {['زهور طازجة يومياً', 'صناعة يدوية', 'توصيل في نفس اليوم', 'فخامة لا مثيل لها', 'Fresh Daily', 'Handcrafted', 'Same Day Delivery', 'Luxury Florals'].map((t) => (
                <span key={t} className="inline-flex items-center">
                  <span className="font-arabic text-xs text-white/70 tracking-[0.2em] px-10">{t}</span>
                  <span className="text-[var(--accent)] text-[8px]">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════ FEATURED COLLECTIONS (STAGGERED) ════════════════ */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20" dir="rtl">
            <span className="font-arabic text-[10px] text-[var(--accent)] tracking-[0.4em] uppercase mb-4 block">
              Our Collections
            </span>
            <h2 className="font-display text-5xl lg:text-6xl text-[var(--primary)] leading-[0.95]">
              تصنيفاتنا المميزة
            </h2>
          </div>

          {/* Staggered 3-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {collections.map((col, idx) => (
              <Link
                key={col.ar}
                href={`/products?category=${encodeURIComponent(col.ar)}`}
                className={`reveal-card group relative overflow-hidden cursor-pointer ${idx === 1 ? 'md:mt-16' : ''}`}
              >
                {/* Image Container with Aspect Ratio */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image 
                    src={col.img} 
                    alt={col.en} 
                    fill 
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/95 via-[var(--primary)]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10" dir="rtl">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-arabic text-[10px] text-[var(--accent)] tracking-[0.3em] uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {col.en}
                    </p>
                    <h3 className="font-display text-3xl lg:text-4xl text-white leading-tight mb-4">
                      {col.ar}
                    </h3>
                    <div className="flex items-center gap-2 text-white/70 text-sm font-arabic">
                      <span>تصفح المجموعة</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ EDITORIAL PRODUCT FEATURE ════════════════ */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 bg-[var(--bg-sub)]">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6" dir="rtl">
            <div>
              <span className="font-arabic text-[10px] text-[var(--accent)] tracking-[0.4em] uppercase mb-3 block">
                Curated Selection
              </span>
              <h2 className="font-display text-4xl lg:text-5xl text-[var(--primary)]">
                مختاراتنا المميزة
              </h2>
            </div>
            <Link href="/products" className="font-arabic text-sm text-[var(--primary)] hover:text-[var(--accent)] transition-colors flex items-center gap-2 border-b border-[var(--primary)] hover:border-[var(--accent)] pb-1">
              عرض كل المنتجات
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {products.map((p) => p && (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ MANIFESTO (DARK CINEMATIC) ════════════════ */}
      <section className="relative py-40 px-6 bg-[var(--primary)] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-[var(--accent)]/20 rounded-full opacity-50" />
        <div className="absolute bottom-40 left-32 w-48 h-48 border border-[var(--accent)]/10 rounded-full opacity-30" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[var(--accent)] rounded-full opacity-60" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Decorative Icon */}
          <div className="mb-12 flex justify-center">
            <div className="w-16 h-16 border border-[var(--accent)]/30 rounded-full flex items-center justify-center">
              <span className="text-[var(--accent)] text-2xl">✧</span>
            </div>
          </div>

          <blockquote className="font-display text-white leading-[1.15] mb-10" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }} dir="rtl">
            "في كل بتلةٍ نرسمها، نُهديكَ لحظةً من الجمال تَعِيشُها بين أحضان الطبيعة الفاخرة"
          </blockquote>

          <div className="flex items-center justify-center gap-4 text-[var(--accent)]/60">
            <span className="w-12 h-px bg-[var(--accent)]/30" />
            <span className="font-display text-sm tracking-widest uppercase">Luxury Blooms</span>
            <span className="w-12 h-px bg-[var(--accent)]/30" />
          </div>
        </div>
      </section>

      {/* ════════════════ PROMISE STRIP (MINIMAL) ════════════════ */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-white border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {[
              { num: '01', title: 'طازجة', sub: 'يومياً' },
              { num: '02', title: 'يدوية', sub: 'الصنع' },
              { num: '03', title: 'سريع', sub: 'التوصيل' },
              { num: '04', title: 'فاخر', sub: 'الجودة' },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-4" dir="rtl">
                <span className="font-display text-3xl text-[var(--accent)]/30 font-light">{item.num}</span>
                <div>
                  <p className="font-display text-xl text-[var(--primary)]">{item.title}</p>
                  <p className="font-arabic text-xs text-[var(--text-sub)]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ WHATSAPP CTA (ELEGANT) ════════════════ */}
      <section className="py-32 px-6 bg-[var(--bg-sub)]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-arabic text-[10px] text-[var(--accent)] tracking-[0.4em] uppercase mb-6 block">
            Contact Us
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-[var(--primary)] mb-8" dir="rtl">
            لنبدأ حواراً
            <span className="block mt-2 italic text-[var(--accent)]">عن جمالك المُفضّل</span>
          </h2>
          <p className="font-arabic text-[var(--text-sub)] leading-relaxed mb-10 max-w-lg mx-auto">
            فريقنا متاح دائماً لتقديم استشارة شخصية، والإجابة على استفساراتك، 
            أو مساعدتك في اختيار الباقة المثالية لمناسبتك.
          </p>
          <a
            href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
            target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3 px-12 py-5 font-arabic text-base font-semibold rounded-full"
          >
            <WaIconLg />
            <span>ابدأ المحادثة الآن</span>
          </a>
        </div>
      </section>

      <Footer />

      {/* Sticky WA button */}
      <a
        href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 btn-wa flex items-center gap-2 px-6 py-3.5 shadow-2xl font-arabic text-sm font-semibold rounded-full hover:scale-105 transition-transform"
      >
        <WaIconLg />
        <span>اطلب الآن</span>
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
