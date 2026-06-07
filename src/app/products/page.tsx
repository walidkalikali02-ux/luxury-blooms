'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getSupabase } from '@/lib/supabase';
import type { Product } from '@/lib/supabase';

const seeds: Product[] = [
  { id: 1, name_ar: 'باقة الورد الملكي', name_en: 'Royal Rose Bouquet', description_ar: 'باقة فاخرة من أجمل الورود الحمراء والبيضاء', description_en: 'Luxurious red and white roses', price: 250, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=1000&fit=crop', category: 'باقات الورود', in_stock: true, is_featured: true, created_at: '' },
  { id: 2, name_ar: 'ترتيب الأوركيد الفاخر', name_en: 'Luxury Orchid Arrangement', description_ar: 'تشكيلة راقية من زهور الأوركيد النادرة', description_en: 'Rare orchid collection', price: 380, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=800&h=1000&fit=crop', category: 'الباقات الملكية', in_stock: true, is_featured: true, created_at: '' },
  { id: 3, name_ar: 'إكليل العروس الفاخر', name_en: 'Bridal Crown Bouquet', description_ar: 'باقة العروس الأحلام من أبيض الزهور', description_en: 'Dream bridal bouquet', price: 550, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop', category: 'زهور عروس', in_stock: true, is_featured: true, created_at: '' },
  { id: 4, name_ar: 'باقة الياسمين المسائي', name_en: 'Evening Jasmine', description_ar: 'عطر الياسمين في باقة سحرية', description_en: 'Magical jasmine fragrance', price: 180, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=800&h=1000&fit=crop', category: 'باقات الورود', in_stock: true, is_featured: false, created_at: '' },
  { id: 5, name_ar: 'تشكيلة الذهب والأزرق', name_en: 'Gold & Blue Collection', description_ar: 'تشكيلة مستوحاة من الفن الإسلامي', description_en: 'Islamic art inspired', price: 650, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&h=1000&fit=crop', category: 'الباقات الملكية', in_stock: true, is_featured: false, created_at: '' },
  { id: 6, name_ar: 'صندوق الهدايا الزهري', name_en: 'Floral Gift Box', description_ar: 'صندوق هدايا فاخر بزهور مجففة وطازجة', description_en: 'Luxury gift box', price: 420, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=1000&fit=crop', category: 'هدايا فاخرة', in_stock: false, is_featured: false, created_at: '' },
];

const cats = ['الكل', 'باقات الورود', 'الباقات الملكية', 'زهور عروس', 'هدايا فاخرة'];

const sorts = [
  { label: 'الأحدث', value: 'newest' },
  { label: 'السعر ↑', value: 'price_asc' },
  { label: 'السعر ↓', value: 'price_desc' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState('الكل');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const sb = getSupabase();
      if (!sb) throw new Error();
      let q = sb.from('products').select('*');
      if (cat !== 'الكل') q = q.eq('category', cat);
      if (sort === 'price_asc') q = q.order('price', { ascending: true });
      else if (sort === 'price_desc') q = q.order('price', { ascending: false });
      else q = q.order('created_at', { ascending: false });
      const { data, error } = await q;
      if (error) throw error;
      setProducts(data || []);
    } catch {
      setProducts(seeds);
    } finally {
      setLoading(false);
    }
  }, [cat, sort]);

  useEffect(() => { load(); }, [load]);

  const visible = products.filter((p) => {
    const matchCat = cat === 'الكل' || p.category === cat;
    const q = search.toLowerCase();
    const matchQ = !search || p.name_ar.includes(search) || p.name_en.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <>
      <Navbar />

      {/* ── Editorial header ── */}
      <div className="relative overflow-hidden bg-[var(--bg-sub)] border-b border-[var(--border)]" style={{ paddingTop: 80 }}>
        {/* Large decorative text */}
        <span className="absolute -bottom-10 left-10 font-display text-[200px] text-black/[0.02] leading-none select-none pointer-events-none hidden lg:block">
          FLOWERS
        </span>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10">
          <div dir="rtl" className="text-center lg:text-right">
            <p className="font-arabic text-[11px] text-[var(--accent)] tracking-[0.4em] uppercase mb-4">
              المجموعة الكاملة
            </p>
            <h1 className="font-display text-5xl sm:text-6xl text-[var(--primary)] leading-tight">
              متجر الزهور
            </h1>
            <p className="font-arabic text-sm text-[var(--text-sub)] mt-4 max-w-md mx-auto lg:mx-0 leading-relaxed">
              اكتشف تشكيلتنا الفاخرة من الباقات المنسقة بعناية لتناسب كل مناسباتك الخاصة
            </p>
          </div>

          {/* Quick hero image */}
          <div className="hidden lg:block relative w-56 h-64 arch-top overflow-hidden shrink-0 shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1487530811015-780780b22c28?w=400&h=500&fit=crop"
              alt="flowers"
              fill className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="sticky z-30 bg-white/90 backdrop-blur-md border-b border-[var(--border)] shadow-sm" style={{ top: 80 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between" dir="rtl">

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 flex-1">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`font-arabic text-xs px-5 py-2 rounded-full transition-all border ${
                    cat === c
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-md'
                      : 'bg-transparent text-[var(--text-sub)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--primary)]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-56">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ابحث عن باقة..."
                  className="w-full font-arabic text-sm text-[var(--primary)] placeholder:text-[var(--text-sub)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none bg-white px-4 py-2 pr-10 rounded-full transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-sub)] text-sm pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </span>
              </div>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="font-arabic text-xs text-[var(--text-sub)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none bg-white px-4 py-2 cursor-pointer rounded-full shrink-0 transition-colors"
              >
                {sorts.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Product grid ── */}
      <section className="py-16 bg-[var(--bg-main)] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {!loading && (
            <p className="font-arabic text-xs text-[var(--text-sub)] mb-8 flex items-center gap-2" dir="rtl">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] inline-block"></span>
              عرض {visible.length} منتجات
            </p>
          )}

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-[var(--bg-sub)] arch-top" style={{ aspectRatio: '4/5' }} />
                  <div className="pt-4 space-y-3 flex flex-col items-center">
                    <div className="h-2 bg-[var(--bg-sub)] rounded w-1/4" />
                    <div className="h-5 bg-[var(--bg-sub)] rounded w-3/4" />
                    <div className="h-3 bg-[var(--bg-sub)] rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="text-center py-28" dir="rtl">
              <p className="text-5xl text-[var(--accent)] mb-6">✧</p>
              <h3 className="font-display text-2xl text-[var(--primary)] mb-3">لا توجد منتجات مطابقة</h3>
              <p className="font-arabic text-sm text-[var(--text-sub)] mb-8">حاول تغيير خيارات البحث أو التصنيف</p>
              <button
                onClick={() => { setSearch(''); setCat('الكل'); }}
                className="btn-ghost font-arabic text-sm font-semibold px-8 py-3.5 rounded-full inline-block"
              >
                عرض كل المنتجات
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {visible.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Sticky WA */}
      <a
        href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 btn-wa flex items-center gap-2 px-5 py-3.5 shadow-xl font-arabic text-sm font-semibold rounded-full"
      >
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg> اطلب
      </a>

      <Footer />
    </>
  );
}
