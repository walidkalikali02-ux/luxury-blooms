'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getSupabase } from '@/lib/supabase';
import type { Product } from '@/lib/supabase';

const allPlaceholderProducts: Product[] = [
  {
    id: 1,
    name_ar: 'باقة الورد الملكي',
    name_en: 'Royal Rose Bouquet',
    description_ar: 'باقة فاخرة من أجمل الورود الحمراء والبيضاء، مثالية للمناسبات الخاصة والهدايا الراقية',
    description_en: 'Luxurious bouquet of the finest red and white roses',
    price: 250, currency: 'QAR',
    image_url: 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=600&h=600&fit=crop',
    category: 'باقات الورود', in_stock: true, is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name_ar: 'ترتيب الأوركيد الفاخر',
    name_en: 'Luxury Orchid Arrangement',
    description_ar: 'تشكيلة راقية من زهور الأوركيد النادرة في تصميم عصري يجمع الفخامة بالأناقة',
    description_en: 'Elegant collection of rare orchids in a modern design',
    price: 380, currency: 'QAR',
    image_url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=600&h=600&fit=crop',
    category: 'الباقات الملكية', in_stock: true, is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name_ar: 'إكليل العروس الفاخر',
    name_en: 'Bridal Crown Bouquet',
    description_ar: 'باقة العروس الأحلام، مصنوعة من أبيض الزهور وأجمل الخضرة',
    description_en: 'The dream bridal bouquet, crafted from the whitest flowers',
    price: 550, currency: 'QAR',
    image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=600&fit=crop',
    category: 'زهور عروس', in_stock: true, is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name_ar: 'باقة الياسمين المسائي',
    name_en: 'Evening Jasmine Bouquet',
    description_ar: 'عطر الياسمين الأبيض في باقة سحرية تفوح بأجمل العطور الطبيعية',
    description_en: 'White jasmine fragrance in a magical bouquet',
    price: 180, currency: 'QAR',
    image_url: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&h=600&fit=crop',
    category: 'باقات الورود', in_stock: true, is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    name_ar: 'تشكيلة الذهب والأزرق',
    name_en: 'Gold & Blue Collection',
    description_ar: 'تشكيلة مستوحاة من الفن العربي الإسلامي بألوان الذهبي والأزرق',
    description_en: 'A collection inspired by Islamic Arabic art in gold and blue',
    price: 650, currency: 'QAR',
    image_url: 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=600&h=600&fit=crop',
    category: 'الباقات الملكية', in_stock: true, is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    name_ar: 'صندوق الهدايا الزهري',
    name_en: 'Floral Gift Box',
    description_ar: 'صندوق هدايا فاخر يضم زهوراً مجففة وطازجة مع شوكولاتة بلجيكية',
    description_en: 'Luxury gift box with dried and fresh flowers plus Belgian chocolate',
    price: 420, currency: 'QAR',
    image_url: 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=600&h=600&fit=crop',
    category: 'هدايا فاخرة', in_stock: false, is_featured: false,
    created_at: new Date().toISOString(),
  },
];

const categoryFilters = [
  { ar: 'الكل', en: 'All' },
  { ar: 'باقات الورود', en: 'Rose Bouquets' },
  { ar: 'الباقات الملكية', en: 'Royal' },
  { ar: 'زهور عروس', en: 'Bridal' },
  { ar: 'هدايا فاخرة', en: 'Gifts' },
];

const sortOptions = [
  { ar: 'الأحدث', value: 'newest' },
  { ar: 'السعر: الأقل أولاً', value: 'price_asc' },
  { ar: 'السعر: الأعلى أولاً', value: 'price_desc' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [sortBy, setSortBy] = useState('newest');
  const [search, setSearch] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = getSupabase();
      if (!supabase) throw new Error('not configured');
      let query = supabase.from('products').select('*');
      if (activeCategory !== 'الكل') query = query.eq('category', activeCategory);
      if (sortBy === 'price_asc') query = query.order('price', { ascending: true });
      else if (sortBy === 'price_desc') query = query.order('price', { ascending: false });
      else query = query.order('created_at', { ascending: false });
      const { data, error } = await query;
      if (error) throw error;
      setProducts(data || []);
    } catch {
      setProducts(allPlaceholderProducts);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, sortBy]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const clientFiltered = products.filter((p) => {
    const matchCat = activeCategory === 'الكل' || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !search ||
      p.name_ar.includes(search) ||
      p.name_en.toLowerCase().includes(q) ||
      p.description_ar.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <>
      <Navbar />

      {/* Page header */}
      <div className="pt-[72px] bg-white border-b border-[#e8e4de]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14" dir="rtl">
          <p className="font-display text-xs text-[#b89a2f] tracking-[0.35em] uppercase mb-4">
            Collections
          </p>
          <h1 className="font-arabic text-4xl sm:text-5xl font-light text-[#1c1c1c]">
            متجر الزهور الفاخر
          </h1>
          <p className="font-display text-base text-[#9a9a9a] italic mt-2">
            Luxury Flower Store
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-[72px] z-30 bg-white/98 backdrop-blur-sm border-b border-[#e8e4de]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between" dir="rtl">

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="بحث..."
                className="pr-9 pl-4 py-2 border border-[#e8e4de] focus:outline-none focus:border-[#b89a2f] font-arabic text-sm bg-white text-[#1c1c1c] w-52 rounded-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a9a9a] text-sm">◎</span>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categoryFilters.map((cat) => (
                <button
                  key={cat.ar}
                  onClick={() => setActiveCategory(cat.ar)}
                  className={`px-4 py-1.5 text-xs font-arabic font-medium transition-all border rounded-sm ${
                    activeCategory === cat.ar
                      ? 'bg-[#1c1c1c] text-white border-[#1c1c1c]'
                      : 'bg-white text-[#4a4a4a] border-[#e8e4de] hover:border-[#1c1c1c]'
                  }`}
                >
                  {cat.ar}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-[#e8e4de] focus:outline-none focus:border-[#b89a2f] font-arabic text-xs text-[#4a4a4a] bg-white px-3 py-2 cursor-pointer rounded-sm"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.ar}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products */}
      <section className="py-16 bg-[#f8f7f4] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Count */}
          {!loading && clientFiltered.length > 0 && (
            <p className="font-arabic text-xs text-[#9a9a9a] mb-8" dir="rtl">
              {clientFiltered.length} منتج
            </p>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border border-[#e8e4de] animate-pulse">
                  <div className="h-72 bg-[#f0ede8]" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-[#f0ede8] rounded w-1/4" />
                    <div className="h-4 bg-[#f0ede8] rounded w-3/4" />
                    <div className="h-3 bg-[#f0ede8] rounded w-1/2" />
                    <div className="h-3 bg-[#f0ede8] rounded" />
                    <div className="h-8 bg-[#f0ede8] rounded-sm mt-4 w-1/3 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          ) : clientFiltered.length === 0 ? (
            <div className="text-center py-24" dir="rtl">
              <div className="text-5xl mb-6">🌸</div>
              <h3 className="font-arabic text-xl font-light text-[#1c1c1c] mb-3">لا توجد منتجات</h3>
              <p className="font-display text-sm text-[#9a9a9a] italic mb-8">No products found</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('الكل'); }}
                className="btn-outline font-arabic text-sm px-6 py-2.5 rounded-sm"
              >
                عرض الكل
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientFiltered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating WhatsApp */}
      <div className="fixed bottom-6 left-6 z-50">
        <a
          href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp flex items-center gap-2 text-white px-4 py-2.5 shadow-lg font-arabic text-sm font-semibold rounded-sm"
        >
          <WaIcon />
          اطلب الآن
        </a>
      </div>

      <Footer />
    </>
  );
}

function WaIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
