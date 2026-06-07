import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSupabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/supabase';

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = getSupabase();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .eq('in_stock', true)
      .limit(3);
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

const placeholderProducts: Product[] = [
  {
    id: 1,
    name_ar: 'باقة الورد الملكي',
    name_en: 'Royal Rose Bouquet',
    description_ar: 'باقة فاخرة من أجمل الورود الحمراء والبيضاء، مثالية للمناسبات الخاصة',
    description_en: 'Luxurious bouquet of the finest red and white roses, perfect for special occasions',
    price: 250,
    currency: 'QAR',
    image_url: 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=600&h=600&fit=crop',
    category: 'باقات الورود',
    in_stock: true,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name_ar: 'ترتيب الأوركيد الفاخر',
    name_en: 'Luxury Orchid Arrangement',
    description_ar: 'تشكيلة راقية من زهور الأوركيد النادرة في تصميم عصري يجمع الفخامة بالأناقة',
    description_en: 'Elegant collection of rare orchids in a modern design combining luxury and grace',
    price: 380,
    currency: 'QAR',
    image_url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=600&h=600&fit=crop',
    category: 'الباقات الملكية',
    in_stock: true,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name_ar: 'إكليل العروس الفاخر',
    name_en: 'Bridal Crown Bouquet',
    description_ar: 'باقة العروس الأحلام، مصنوعة من أبيض الزهور وأجمل الخضرة',
    description_en: 'The dream bridal bouquet, crafted from the whitest flowers and finest greenery',
    price: 550,
    currency: 'QAR',
    image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=600&fit=crop',
    category: 'زهور عروس',
    in_stock: true,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts();
  const displayProducts = featured.length > 0 ? featured : placeholderProducts;

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-[72px] min-h-screen flex flex-col lg:flex-row">

        {/* Left: text */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-24 lg:py-0" dir="rtl">
          <p className="font-display text-xs text-[#b89a2f] tracking-[0.35em] uppercase mb-6">
            Qatar · Luxury Floral Boutique
          </p>

          <h1 className="font-arabic text-5xl sm:text-6xl lg:text-7xl font-light text-[#1c1c1c] leading-[1.15] mb-6">
            زهور<br />
            <em className="font-display not-italic italic text-[#b89a2f]">الفخامة</em>
          </h1>

          <p className="font-display text-2xl sm:text-3xl text-[#1c1c1c] italic font-light tracking-wide mb-8">
            Luxury Blooms
          </p>

          <div className="w-10 h-px bg-[#b89a2f] mb-8" />

          <p className="font-arabic text-base text-[#4a4a4a] leading-relaxed max-w-sm mb-2">
            أرقى الباقات الزهرية المصنوعة يدوياً، مستوحاة من الطبيعة والفن العربي الأصيل
          </p>
          <p className="font-display text-sm text-[#9a9a9a] italic leading-relaxed max-w-sm mb-12">
            Exquisite handcrafted arrangements inspired by nature and authentic Arabic art
          </p>

          <div className="flex flex-row gap-4" dir="rtl">
            <Link href="/products" className="btn-gold font-arabic text-sm font-semibold px-7 py-3 rounded-sm">
              تصفح المنتجات
            </Link>
            <a
              href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline font-arabic text-sm font-semibold px-7 py-3 rounded-sm flex items-center gap-2"
            >
              <WaIcon />
              واتساب
            </a>
          </div>
        </div>

        {/* Right: image */}
        <div className="flex-1 relative min-h-[50vh] lg:min-h-screen bg-[#f8f7f4]">
          <Image
            src="https://images.unsplash.com/photo-1487530811015-780780b22c28?w=1200&h=1400&fit=crop"
            alt="Luxury flowers"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-white/5" />
        </div>
      </section>

      {/* ── Thin gold divider ── */}
      <div className="h-px bg-[#e8e4de] mx-8 sm:mx-14 lg:mx-20" />

      {/* ── Categories ── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" dir="rtl">
            <p className="font-display text-xs text-[#b89a2f] tracking-[0.35em] uppercase mb-3">Collections</p>
            <h2 className="font-arabic text-3xl font-light text-[#1c1c1c]">تصنيفاتنا</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { emoji: '🌹', ar: 'باقات الورود', en: 'Rose Bouquets' },
              { emoji: '💐', ar: 'الباقات الملكية', en: 'Royal Arrangements' },
              { emoji: '🌸', ar: 'زهور عروس', en: 'Bridal Flowers' },
              { emoji: '🎁', ar: 'هدايا فاخرة', en: 'Luxury Gifts' },
            ].map((cat) => (
              <Link
                key={cat.ar}
                href={`/products?category=${encodeURIComponent(cat.ar)}`}
                className="luxury-card border border-[#e8e4de] p-8 text-center hover:border-[#b89a2f]/50 group bg-white"
              >
                <div className="text-4xl mb-5 group-hover:scale-105 transition-transform">{cat.emoji}</div>
                <h3 className="font-arabic text-sm font-semibold text-[#1c1c1c] mb-1">{cat.ar}</h3>
                <p className="font-display text-xs text-[#9a9a9a] italic">{cat.en}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#f8f7f4]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14" dir="rtl">
            <div>
              <p className="font-display text-xs text-[#b89a2f] tracking-[0.35em] uppercase mb-3">Featured</p>
              <h2 className="font-arabic text-3xl font-light text-[#1c1c1c]">المنتجات المميزة</h2>
            </div>
            <Link href="/products" className="font-display text-sm text-[#9a9a9a] hover:text-[#1c1c1c] italic transition-colors hidden sm:block">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12 sm:hidden">
            <Link href="/products" className="btn-outline font-arabic text-sm font-semibold px-7 py-3 rounded-sm inline-block">
              عرض الكل
            </Link>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" dir="rtl">
            <p className="font-display text-xs text-[#b89a2f] tracking-[0.35em] uppercase mb-3">Why Us</p>
            <h2 className="font-arabic text-3xl font-light text-[#1c1c1c]">لماذا نحن؟</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: '🌷', ar: 'زهور طازجة', en: 'Fresh Daily', desc: 'نختار أجود الزهور يومياً' },
              { icon: '✋', ar: 'صناعة يدوية', en: 'Handcrafted', desc: 'كل باقة مصنوعة يدوياً بعناية' },
              { icon: '🚚', ar: 'توصيل سريع', en: 'Same Day', desc: 'توصيل في نفس اليوم بقطر' },
              { icon: '💎', ar: 'جودة فاخرة', en: 'Luxury Quality', desc: 'معايير فاخرة في كل تفصيل' },
            ].map((item) => (
              <div key={item.ar} className="text-center" dir="rtl">
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="font-arabic text-sm font-semibold text-[#1c1c1c] mb-1">{item.ar}</h3>
                <p className="font-display text-xs text-[#b89a2f] italic mb-3">{item.en}</p>
                <p className="font-arabic text-sm text-[#4a4a4a] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA ── */}
      <section className="py-20 px-6 bg-[#f8f7f4] border-t border-b border-[#e8e4de]">
        <div className="max-w-2xl mx-auto text-center" dir="rtl">
          <p className="font-display text-xs text-[#b89a2f] tracking-[0.35em] uppercase mb-5">Order Now</p>
          <h2 className="font-arabic text-3xl font-light text-[#1c1c1c] mb-3">اطلب عبر واتساب</h2>
          <p className="font-display text-lg italic text-[#9a9a9a] mb-8">Order directly via WhatsApp</p>
          <p className="font-arabic text-sm text-[#4a4a4a] leading-relaxed mb-10">
            تواصل معنا مباشرة للحصول على تجربة طلب شخصية ومتميزة
          </p>
          <a
            href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex items-center gap-3 text-white px-8 py-3.5 rounded-sm font-arabic font-semibold text-base"
          >
            <WaIcon large />
            ابدأ الطلب الآن
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

function WaIcon({ large }: { large?: boolean }) {
  const size = large ? 'w-5 h-5' : 'w-4 h-4';
  return (
    <svg className={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
