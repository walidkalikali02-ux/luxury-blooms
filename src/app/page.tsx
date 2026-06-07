import Link from 'next/link';
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
      .limit(6);
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

const categories = [
  { icon: '🌹', ar: 'باقات الورود', en: 'Rose Bouquets', color: 'from-red-900/20 to-rose-900/10' },
  { icon: '💐', ar: 'الباقات الملكية', en: 'Royal Arrangements', color: 'from-[#0d2b55]/20 to-[#1a3f7a]/10' },
  { icon: '🌸', ar: 'زهور عروس', en: 'Bridal Flowers', color: 'from-pink-900/20 to-pink-800/10' },
  { icon: '🎁', ar: 'هدايا فاخرة', en: 'Luxury Gifts', color: 'from-[#c9a227]/20 to-amber-900/10' },
];

const placeholderProducts: Product[] = [
  {
    id: 1,
    name_ar: 'باقة الورد الملكي',
    name_en: 'Royal Rose Bouquet',
    description_ar: 'باقة فاخرة من أجمل الورود الحمراء والبيضاء، مثالية للمناسبات الخاصة والهدايا الراقية',
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
    description_ar: 'باقة العروس الأحلام، مصنوعة من أبيض الزهور وأجمل الخضرة لتكتمل جمال يومك',
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
  const featuredProducts = await getFeaturedProducts();
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : placeholderProducts;

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-20">

        {/* Arabic geometric background */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="arabesque" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="30" fill="none" stroke="#c9a227" strokeWidth="0.5" />
                <circle cx="40" cy="40" r="20" fill="none" stroke="#c9a227" strokeWidth="0.5" />
                <line x1="10" y1="40" x2="70" y2="40" stroke="#c9a227" strokeWidth="0.3" />
                <line x1="40" y1="10" x2="40" y2="70" stroke="#c9a227" strokeWidth="0.3" />
                <line x1="19" y1="19" x2="61" y2="61" stroke="#c9a227" strokeWidth="0.3" />
                <line x1="61" y1="19" x2="19" y2="61" stroke="#c9a227" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#arabesque)" />
          </svg>
        </div>

        <div className="absolute top-1/4 left-10 w-48 h-48 rounded-full bg-[#c9a227]/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 rounded-full bg-[#1a3f7a]/30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center" dir="rtl">
          {/* Ornament */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-[#c9a227]/40 text-2xl">◈</span>
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#c9a227]" />
            <span className="text-[#c9a227] text-3xl">✿</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#c9a227]" />
            <span className="text-[#c9a227]/40 text-2xl">◈</span>
          </div>

          <p className="text-[#c9a227] font-english text-sm tracking-[0.4em] uppercase mb-4 opacity-80">
            Luxury Floral Boutique · Qatar
          </p>

          <h1 className="font-arabic text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-4">
            زهور الفخامة
          </h1>
          <h2 className="font-english text-xl sm:text-2xl lg:text-3xl text-[#c9a227] italic font-light tracking-widest mb-8">
            Luxury Blooms
          </h2>

          <p className="font-arabic text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-3">
            أرقى الباقات الزهرية المصنوعة يدوياً، مستوحاة من روعة الطبيعة وجمال الفن العربي الأصيل
          </p>
          <p className="font-english text-sm text-white/40 max-w-xl mx-auto italic mb-12">
            Exquisite handcrafted floral arrangements inspired by the magnificence of nature and authentic Arabic art
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4" dir="rtl">
            <Link
              href="/products"
              className="btn-gold text-[#071c3a] px-8 py-4 rounded-full font-arabic text-base font-bold tracking-wide shadow-xl"
            >
              ✦ تصفح المنتجات ✦
            </Link>
            <a
              href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-white px-8 py-4 rounded-full font-arabic text-base font-bold flex items-center gap-3 shadow-xl"
            >
              <WhatsAppSVG />
              اطلب عبر واتساب
            </a>
          </div>

          <div className="mt-20 flex justify-center animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-[#c9a227]/40 flex items-start justify-center pt-2">
              <div className="w-1 h-3 bg-[#c9a227]/60 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 section-cream arabic-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" dir="rtl">
            <div className="ornament-divider mb-6">
              <span className="font-arabic text-2xl font-bold text-[#0d2b55]">تصنيفاتنا</span>
            </div>
            <p className="text-[#0d2b55]/50 font-english text-sm tracking-widest uppercase">Our Collections</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.ar}
                href={`/products?category=${encodeURIComponent(cat.ar)}`}
                className={`luxury-card bg-gradient-to-br ${cat.color} border border-[#0d2b55]/10 rounded-2xl p-6 text-center hover:border-[#c9a227]/40 group`}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="font-arabic text-base font-bold text-[#0d2b55] mb-1">{cat.ar}</h3>
                <p className="font-english text-xs text-[#0d2b55]/50 italic">{cat.en}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" dir="rtl">
            <div className="ornament-divider mb-4">
              <span className="font-arabic text-2xl font-bold text-[#0d2b55]">المنتجات المميزة</span>
            </div>
            <p className="text-[#0d2b55]/50 font-english text-sm tracking-widest uppercase">Featured Products</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="btn-gold text-[#071c3a] px-8 py-4 rounded-full font-arabic text-base font-bold inline-block"
            >
              عرض جميع المنتجات ✦
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-[#0d2b55] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <polygon points="30,5 55,20 55,50 30,65 5,50 5,20" fill="none" stroke="#c9a227" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geo)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" dir="rtl">
            <div className="ornament-divider mb-4">
              <span className="font-arabic text-2xl font-bold text-white">لماذا نحن؟</span>
            </div>
            <p className="text-[#c9a227]/70 font-english text-sm tracking-widest uppercase">Why Choose Us</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🌷', ar: 'زهور طازجة', en: 'Fresh Flowers', desc: 'نختار أجود أنواع الزهور يومياً للحفاظ على الطزاجة والجمال' },
              { icon: '✋', ar: 'صناعة يدوية', en: 'Handcrafted', desc: 'كل باقة مصنوعة يدوياً بعناية وإبداع فريد' },
              { icon: '🚚', ar: 'توصيل سريع', en: 'Fast Delivery', desc: 'نوصل طلباتك في نفس اليوم داخل قطر' },
              { icon: '💎', ar: 'جودة فاخرة', en: 'Luxury Quality', desc: 'معايير فاخرة في كل تفصيل من تفاصيل منتجاتنا' },
            ].map((item) => (
              <div key={item.ar} className="text-center p-6" dir="rtl">
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3 className="font-arabic text-lg font-bold text-[#c9a227] mb-2">{item.ar}</h3>
                <p className="font-english text-xs text-[#c9a227]/50 italic mb-3">{item.en}</p>
                <p className="font-arabic text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-gradient-to-r from-[#25d366] via-[#20b954] to-[#128c7e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center" dir="rtl">
          <div className="flex items-center justify-center mb-6">
            <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>
          <h2 className="font-arabic text-3xl sm:text-4xl font-black text-white mb-3">
            اطلب الآن عبر واتساب
          </h2>
          <p className="font-english text-lg text-white/80 italic mb-2">Order Now via WhatsApp</p>
          <p className="font-arabic text-white/70 text-base mb-8">
            تواصل معنا مباشرة واحصل على خدمة شخصية متميزة لاختيار باقتك المثالية
          </p>
          <a
            href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#128c7e] px-10 py-4 rounded-full font-arabic text-lg font-black shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all inline-block"
          >
            ابدأ الطلب الآن ←
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

function WhatsAppSVG() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
