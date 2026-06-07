'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
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
  { id: 5, name_ar: 'تشكيلة الأزرق الهادئ', name_en: 'Calm Blue Collection', description_ar: 'تشكيلة مستوحاة من أجواء البحر والسماء', description_en: 'Inspired by sea and sky tones', price: 650, currency: 'QAR', image_url: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&h=1000&fit=crop', category: 'الباقات الملكية', in_stock: true, is_featured: false, created_at: '' },
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
    return () => {
      active = false;
    };
  }, [cat, sort]);

  const visible = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((product) => {
      const matchCat = cat === 'الكل' || product.category === cat;
      const matchSearch = !search || product.name_ar.includes(search) || product.name_en.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [products, cat, search]);

  return (
    <>
      <Navbar />

      <main className="pt-20">
        <section className="section-shell bg-white border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-14 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end" dir="rtl">
              <div className="max-w-2xl">
                <p className="eyebrow font-arabic">Collection</p>
                <h1 className="mt-4 font-display text-[clamp(3rem,7vw,5.8rem)] leading-[0.92] text-[var(--text-main)]">
                  متجر الزهور
                </h1>
                <p className="mt-6 max-w-xl font-arabic text-base leading-8 text-[var(--text-sub)] sm:text-lg">
                  تصفح تشكيلتنا المحدثة من الباقات الهادئة والراقية، مع فلترة بسيطة وترتيب واضح وسرعة في الوصول إلى ما تريده.
                </p>
              </div>

              <div className="surface hidden rounded-[2rem] p-3 lg:block">
                <div className="relative h-60 w-52 overflow-hidden rounded-[1.5rem]">
                  <Image
                    src="https://images.unsplash.com/photo-1487530811015-780780b22c28?w=600&h=700&fit=crop"
                    alt="flowers"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-20 z-30 border-b border-[var(--border)] bg-white/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" dir="rtl">
              <div className="flex flex-wrap gap-2">
                {cats.map((value) => (
                  <button
                    key={value}
                    onClick={() => setCat(value)}
                    className={`rounded-full border px-4 py-2 font-arabic text-xs transition-colors ${
                      cat === value
                        ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                        : 'border-[var(--border)] bg-white text-[var(--text-sub)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="relative block min-w-[16rem]">
                  <span className="sr-only">Search products</span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="ابحث عن باقة..."
                    className="w-full rounded-full border border-[var(--border)] bg-white px-4 py-2.5 pr-10 font-arabic text-sm text-[var(--text-main)] outline-none transition-colors placeholder:text-[var(--text-sub)] focus:border-[var(--primary)]"
                  />
                  <SearchIcon />
                </label>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-full border border-[var(--border)] bg-white px-4 py-2.5 font-arabic text-xs text-[var(--text-sub)] outline-none transition-colors focus:border-[var(--primary)]"
                >
                  {sorts.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg-sub)] py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="mb-8 flex items-center justify-between gap-4" dir="rtl">
              <p className="font-arabic text-sm text-[var(--text-sub)]">
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-[var(--primary)]" />
                عرض {visible.length} منتج
              </p>
            </div>

            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white">
                    <div className="aspect-[4/5] bg-[var(--bg-soft)]" />
                    <div className="space-y-3 p-5">
                      <div className="h-3 w-20 rounded-full bg-[var(--bg-soft)]" />
                      <div className="h-6 w-3/4 rounded-full bg-[var(--bg-soft)]" />
                      <div className="h-4 w-1/2 rounded-full bg-[var(--bg-soft)]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : visible.length === 0 ? (
              <div className="surface mx-auto max-w-2xl rounded-[2rem] px-6 py-16 text-center" dir="rtl">
                <p className="font-display text-4xl text-[var(--primary)]">0</p>
                <h3 className="mt-4 font-display text-3xl text-[var(--text-main)]">لا توجد منتجات مطابقة</h3>
                <p className="mt-4 font-arabic text-sm leading-7 text-[var(--text-sub)]">
                  غيّر التصنيف أو كلمة البحث للوصول إلى خيارات أكثر.
                </p>
                <button
                  onClick={() => {
                    setSearch('');
                    setCat('الكل');
                  }}
                  className="btn-ghost mt-8 inline-flex rounded-full px-6 py-3 font-arabic text-sm font-semibold"
                >
                  إعادة الضبط
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visible.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <a
        href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-wa fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3 font-arabic text-sm font-semibold"
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
    <svg className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-sub)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
