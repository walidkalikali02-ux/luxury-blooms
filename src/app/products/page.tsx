'use client';

import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getSupabase } from '@/lib/supabase';
import type { Product } from '@/lib/supabase';

const seeds: Product[] = [
  { id: 1, name_ar: 'باقة الورد الملكي', name_en: 'Royal Rose Bouquet', description_ar: '', description_en: '', price: 250, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=1000&fit=crop', category: 'باقات الورود', in_stock: true, is_featured: true, created_at: '' },
  { id: 2, name_ar: 'ترتيب الأوركيد', name_en: 'Luxury Orchid', description_ar: '', description_en: '', price: 380, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc40?w=800&h=1000&fit=crop', category: 'الباقات الملكية', in_stock: true, is_featured: true, created_at: '' },
  { id: 3, name_ar: 'إكليل العروس', name_en: 'Bridal Crown', description_ar: '', description_en: '', price: 550, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop', category: 'زهور عروس', in_stock: true, is_featured: true, created_at: '' },
  { id: 4, name_ar: 'باقة الياسمين', name_en: 'Evening Jasmine', description_ar: '', description_en: '', price: 180, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=800&h=1000&fit=crop', category: 'باقات الورود', in_stock: true, is_featured: false, created_at: '' },
  { id: 5, name_ar: 'تشكيلة الأزرق', name_en: 'Calm Blue', description_ar: '', description_en: '', price: 650, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&h=1000&fit=crop', category: 'الباقات الملكية', in_stock: true, is_featured: false, created_at: '' },
  { id: 6, name_ar: 'صندوق الزهور', name_en: 'Floral Gift Box', description_ar: '', description_en: '', price: 420, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=1000&fit=crop', category: 'هدايا فاخرة', in_stock: false, is_featured: false, created_at: '' },
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

  useEffect(() => {
    let active = true;
    async function load() {
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
        if (active) setProducts(data || []);
      } catch {
        if (active) setProducts(seeds);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [cat, sort]);

  const visible = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((p) => {
      const matchCat = cat === 'الكل' || p.category === cat;
      const matchSearch = !search || p.name_ar.includes(search) || p.name_en.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [products, cat, search]);

  return (
    <>
      <Navbar />

      <main className="pt-24">

        {/* ════════ Header ════════ */}
        <section className="bg-[var(--navy)] text-[var(--cream)] py-24 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--blue)] to-transparent" />
          <div className="max-w-7xl mx-auto px-6" dir="rtl">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-[var(--blue)]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--blue)]">
                The Collection · 2026
              </span>
            </div>
            <h1 className="font-cairo text-5xl md:text-7xl font-light leading-[1.1] tracking-tight mb-6 max-w-3xl">
              متجر الزهور
            </h1>
            <p className="text-[var(--cream)]/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              تصفّح تشكيلتنا الكاملة من الباقات الهادئة والراقية، مع فلترة بسيطة وترتيب واضح.
            </p>
          </div>
        </section>

        {/* ════════ Filter bar ════════ */}
        <div className="sticky top-24 z-30 bg-[var(--cream)]/95 backdrop-blur-sm border-b border-[var(--line)]">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between" dir="rtl">

              <div className="flex flex-wrap gap-1">
                {cats.map((value) => (
                  <button
                    key={value}
                    onClick={() => setCat(value)}
                    className={`text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border transition-all duration-200 ${
                      cat === value
                        ? 'bg-[var(--navy)] text-[var(--cream)] border-[var(--navy)]'
                        : 'border-[var(--line)] text-[var(--navy)] hover:border-[var(--navy)]'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <label className="relative block min-w-[14rem]">
                  <span className="sr-only">Search</span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="ابحث..."
                    className="w-full bg-transparent border border-[var(--line)] px-3 py-1.5 pr-8 text-sm text-[var(--navy)] outline-none transition-colors placeholder:text-[var(--navy)]/40 focus:border-[var(--navy)]"
                  />
                  <SearchIcon />
                </label>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent border border-[var(--line)] px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase text-[var(--navy)] outline-none transition-colors focus:border-[var(--navy)]"
                >
                  {sorts.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ════════ Grid ════════ */}
        <section className="py-16 max-w-7xl mx-auto px-6">

          <div className="flex items-center justify-between mb-10" dir="rtl">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--blue-deep)]">
              {visible.length.toString().padStart(2, '0')} منتج · {cat}
            </p>
            <span className="hidden sm:block flex-1 mx-6 h-px bg-[var(--line)]" />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse border border-[var(--line)] bg-white">
                  <div className="aspect-[4/5] bg-[var(--cream-dark)]" />
                  <div className="p-5 space-y-3">
                    <div className="h-2 w-16 bg-[var(--cream-dark)]" />
                    <div className="h-5 w-3/4 bg-[var(--cream-dark)]" />
                    <div className="h-3 w-1/2 bg-[var(--cream-dark)]" />
                  </div>
                </div>
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="mx-auto max-w-xl border border-[var(--line)] bg-white px-8 py-20 text-center" dir="rtl">
              <p className="font-cairo text-6xl font-light text-[var(--blue-deep)]">0</p>
              <h3 className="mt-4 font-cairo text-2xl font-light text-[var(--navy)]">لا توجد منتجات مطابقة</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--navy)]/60">
                غيّر التصنيف أو كلمة البحث للوصول إلى خيارات أكثر.
              </p>
              <button
                onClick={() => { setSearch(''); setCat('الكل'); }}
                className="btn-ghost-dark mt-8"
              >
                إعادة الضبط
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <a
        href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-wa fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 px-5 py-3 text-sm font-medium shadow-[0_12px_30px_rgba(37,211,102,0.3)]"
      >
        <WaIcon />
        واتساب
      </a>

      <Footer />
    </>
  );
}

function SearchIcon() {
  return (
    <svg className="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--navy)]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
