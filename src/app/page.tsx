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
      <section className="flex flex-col lg:flex-row min-h-screen pt-[70px] overflow-hidden">

        {/* Left — editorial text */}
        <div className="flex-none w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-20 lg:py-0 relative">

          {/* Big decorative number */}
          <span className="absolute top-8 left-8 lg:top-16 lg:left-16 font-display text-[120px] lg:text-[160px] font-light text-[#F2EDE5] leading-none select-none pointer-events-none">
            ✦
          </span>

          <div className="relative z-10">
            <p className="fade-up font-display italic text-[11px] text-[#C49A2E] tracking-[0.4em] uppercase mb-8">
              Qatar · Luxury Floral Boutique
            </p>

            {/* Large Arabic display */}
            <h1 className="fade-up-2 font-arabic font-light text-[#0F0F0F] leading-[1.1] mb-3" style={{ fontSize: 'clamp(52px, 7vw, 88px)' }}>
              زهور
            </h1>
            <h1 className="fade-up-2 font-arabic font-bold text-[#0F0F0F] leading-[1.1] mb-6" style={{ fontSize: 'clamp(52px, 7vw, 88px)' }}>
              الفخامة
            </h1>

            {/* English display */}
            <p className="fade-up-3 font-display italic text-[#C49A2E] leading-none mb-8" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
              Luxury Blooms
            </p>

            <span className="fade-up-3 gold-rule mb-8 block" />

            <p className="fade-up-3 font-arabic text-[#4A4540] text-base leading-relaxed max-w-sm mb-2" dir="rtl">
              أرقى الباقات الزهرية المصنوعة يدوياً، مستوحاة من جمال الطبيعة والفن العربي الأصيل
            </p>
            <p className="fade-up-3 font-display italic text-sm text-[#9A9390] leading-relaxed max-w-sm mb-12">
              Exquisite handcrafted floral arrangements inspired by nature and authentic Arabic artistry.
            </p>

            {/* CTAs */}
            <div className="fade-up-4 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary font-arabic text-sm font-semibold px-7 py-3.5 rounded-sm">
                تصفح المجموعة
              </Link>
              <a
                href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
                target="_blank" rel="noopener noreferrer"
                className="btn-ghost font-arabic text-sm font-semibold px-7 py-3.5 rounded-sm flex items-center gap-2"
              >
                <WaIcon /> اطلب الآن
              </a>
            </div>

            {/* Stats strip */}
            <div className="fade-up-4 flex gap-10 mt-14 pt-8 border-t border-[#E5DDD0]">
              {[
                { n: '500+', ar: 'باقة', en: 'Designs' },
                { n: '24h', ar: 'توصيل', en: 'Delivery' },
                { n: '100%', ar: 'طازج', en: 'Fresh' },
              ].map((s) => (
                <div key={s.n}>
                  <p className="font-display text-2xl font-light text-[#0F0F0F]">{s.n}</p>
                  <p className="font-arabic text-xs text-[#9A9390] mt-0.5">{s.ar}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — dramatic image */}
        <div className="flex-1 relative min-h-[55vw] lg:min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=1400&h=1800&fit=crop"
            alt="Luxury flowers"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay on left edge */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />

          {/* Floating tag */}
          <div className="absolute bottom-10 right-10 bg-white/95 backdrop-blur-sm px-6 py-4 shadow-xl" dir="rtl">
            <p className="font-display italic text-[10px] text-[#C49A2E] tracking-[0.3em] uppercase mb-1">New Arrival</p>
            <p className="font-arabic text-sm font-semibold text-[#0F0F0F]">تشكيلة الربيع الفاخرة</p>
            <p className="font-display italic text-xs text-[#9A9390]">Spring Luxury Collection</p>
          </div>
        </div>
      </section>

      {/* ════════════════ MARQUEE STRIP ════════════════ */}
      <div className="bg-[#0F0F0F] overflow-hidden py-4 select-none">
        <div className="marquee-inner flex gap-0 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center shrink-0">
              {['زهور طازجة يومياً', 'صناعة يدوية', 'توصيل في نفس اليوم', 'فخامة لا مثيل لها', 'Fresh Daily', 'Handcrafted', 'Same Day Delivery', 'Luxury Florals'].map((t) => (
                <span key={t} className="inline-flex items-center">
                  <span className="font-arabic text-xs text-white/60 tracking-[0.2em] px-6">{t}</span>
                  <span className="text-[#C49A2E] text-xs">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════ COLLECTIONS ════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Section label */}
          <div className="flex items-center gap-6 mb-14">
            <span className="gold-rule" />
            <div>
              <p className="font-display italic text-[10px] text-[#C49A2E] tracking-[0.35em] uppercase mb-1">Collections</p>
              <h2 className="font-arabic text-2xl font-semibold text-[#0F0F0F]">تصنيفاتنا</h2>
            </div>
          </div>

          {/* 4-column portrait grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {collections.map((col) => (
              <Link
                key={col.ar}
                href={`/products?category=${encodeURIComponent(col.ar)}`}
                className="reveal-card group relative img-wrap overflow-hidden cursor-pointer"
                style={{ aspectRatio: '3/4' }}
              >
                <Image src={col.img} alt={col.en} fill className="object-cover" />
                {/* Dark gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Text always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-5" dir="rtl">
                  <p className="font-arabic text-sm font-semibold text-white leading-tight">{col.ar}</p>
                  <p className="font-display italic text-xs text-white/60 mt-0.5">{col.en}</p>
                  {/* Arrow — reveal on hover */}
                  <p className="reveal-overlay font-display text-sm text-[#C49A2E] mt-2">تصفح ←</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ EDITORIAL PRODUCT FEATURE ════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-6 mb-14">
            <span className="gold-rule" />
            <div>
              <p className="font-display italic text-[10px] text-[#C49A2E] tracking-[0.35em] uppercase mb-1">The Edit</p>
              <h2 className="font-arabic text-2xl font-semibold text-[#0F0F0F]">المنتجات المميزة</h2>
            </div>
            <div className="flex-1" />
            <Link href="/products" className="hidden sm:block font-display italic text-sm text-[#9A9390] hover:text-[#0F0F0F] transition-colors">
              View all →
            </Link>
          </div>

          {/* Asymmetric editorial grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Large feature */}
            {p1 && (
              <div className="lg:col-span-3">
                <div className="card-lift group bg-white relative img-wrap overflow-hidden" style={{ aspectRatio: '4/5' }}>
                  <Image
                    src={p1.image_url || ''}
                    alt={p1.name_en}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8" dir="rtl">
                    <span className="text-[#C49A2E] text-[9px] tracking-[0.25em] uppercase font-arabic">{p1.category}</span>
                    <h3 className="font-arabic text-2xl font-semibold text-white mt-1">{p1.name_ar}</h3>
                    <p className="font-display italic text-sm text-white/70 mb-4">{p1.name_en}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-arabic text-xl font-bold text-white">
                        {p1.price.toLocaleString()} <span className="text-sm font-normal text-white/60">{p1.currency}</span>
                      </span>
                      <a
                        href={`https://wa.me/97412345678?text=${encodeURIComponent(`مرحباً، أريد الطلب: ${p1.name_ar}\nالسعر: ${p1.price} ${p1.currency}`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn-wa flex items-center gap-2 px-5 py-2.5 text-sm font-arabic font-semibold rounded-sm"
                      >
                        <WaIcon /> اطلب
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Two stacked */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {[p2, p3].filter(Boolean).map((p) => p && (
                <div key={p.id} className="card-lift group bg-white relative img-wrap overflow-hidden flex-1" style={{ minHeight: 280 }}>
                  <Image src={p.image_url || ''} alt={p.name_en} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5" dir="rtl">
                    <span className="text-[#C49A2E] text-[9px] tracking-[0.2em] uppercase font-arabic">{p.category}</span>
                    <h3 className="font-arabic text-base font-semibold text-white mt-0.5">{p.name_ar}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-arabic text-base font-bold text-white">
                        {p.price.toLocaleString()} <span className="text-xs text-white/50">{p.currency}</span>
                      </span>
                      <a
                        href={`https://wa.me/97412345678?text=${encodeURIComponent(`مرحباً، أريد الطلب: ${p.name_ar}\nالسعر: ${p.price} ${p.currency}`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="text-[#C49A2E] text-xs font-arabic hover:text-[#e8b83a] transition-colors"
                      >
                        اطلب ←
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link href="/products" className="btn-ghost font-arabic text-sm font-semibold px-7 py-3 rounded-sm inline-block">
              عرض الكل
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ MANIFESTO ════════════════ */}
      <section className="py-28 px-6 bg-white border-y border-[#E5DDD0]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="gold-rule mx-auto mb-8 block" />
          <blockquote className="font-display italic text-[#0F0F0F] leading-tight mb-6" style={{ fontSize: 'clamp(28px, 4.5vw, 56px)' }}>
            &ldquo;Every bouquet tells a story of beauty, care, and timeless elegance.&rdquo;
          </blockquote>
          <p className="font-arabic text-lg text-[#4A4540] leading-relaxed" dir="rtl">
            كل باقة تحكي قصة جمال ورعاية وأناقة خالدة
          </p>
          <span className="gold-rule mx-auto mt-8 block" />
        </div>
      </section>

      {/* ════════════════ PROMISE STRIP ════════════════ */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {[
              { icon: '🌷', ar: 'زهور طازجة يومياً', en: 'Fresh Daily', sub: 'أجود الزهور' },
              { icon: '✦', ar: 'صناعة يدوية', en: 'Handcrafted', sub: 'بعناية وإبداع' },
              { icon: '🚚', ar: 'توصيل سريع', en: 'Same Day', sub: 'داخل قطر' },
              { icon: '💎', ar: 'جودة فاخرة', en: 'Luxury Quality', sub: 'معايير راقية' },
            ].map((item) => (
              <div key={item.ar} className="flex flex-col items-center" dir="rtl">
                <span className="text-3xl mb-4">{item.icon}</span>
                <p className="font-arabic text-sm font-semibold text-[#0F0F0F] mb-0.5">{item.ar}</p>
                <p className="font-display italic text-[10px] text-[#C49A2E] tracking-[0.2em] uppercase mb-2">{item.en}</p>
                <p className="font-arabic text-xs text-[#9A9390]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ WHATSAPP CTA ════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display italic text-[10px] text-[#C49A2E] tracking-[0.4em] uppercase mb-5">Order Now</p>
          <h2 className="font-arabic text-3xl lg:text-4xl font-light text-[#0F0F0F] mb-3" dir="rtl">
            اطلب عبر واتساب مباشرةً
          </h2>
          <p className="font-display italic text-[#9A9390] text-lg mb-10">
            Speak directly with our floral designers
          </p>
          <a
            href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
            target="_blank" rel="noopener noreferrer"
            className="btn-wa inline-flex items-center gap-3 px-10 py-4 font-arabic text-base font-semibold rounded-sm shadow-lg"
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
        className="fixed bottom-6 left-6 z-50 btn-wa flex items-center gap-2 px-4 py-3 shadow-xl font-arabic text-sm font-semibold rounded-sm"
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
