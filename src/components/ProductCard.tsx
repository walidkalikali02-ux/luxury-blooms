'use client';

import Image from 'next/image';
import type { Product } from '@/lib/supabase';

export default function ProductCard({ product }: { product: Product }) {
  const msg = encodeURIComponent(
    `مرحباً، أريد الطلب:\n*${product.name_ar}*\nالسعر: ${product.price} ${product.currency}`
  );
  const waUrl = `https://wa.me/97412345678?text=${msg}`;

  return (
    <article className="lux-card group overflow-hidden rounded-2xl">
      <div className="relative img-zoom aspect-[4/5] bg-[var(--off-white)]">
        <Image
          src={product.image_url || 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=1000&fit=crop'}
          alt={product.name_en}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {product.is_featured && (
          <span className="absolute top-4 left-4 z-10 bg-white/96 rounded-full px-3 py-1 text-[9px] font-arabic font-medium tracking-[0.2em] text-[var(--navy)] border border-[var(--border)]">
            مميز
          </span>
        )}
        {!product.in_stock && (
          <span className="absolute top-4 left-4 z-10 bg-white/96 rounded-full px-3 py-1 text-[9px] font-arabic tracking-[0.18em] text-[var(--text-muted)] border border-[var(--border)]">
            غير متوفر
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <a
            href={product.in_stock ? waUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-navy w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-arabic text-sm font-medium ${
              !product.in_stock ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            <WaIcon />
            اطلب الآن
          </a>
        </div>
      </div>

      <div className="p-5" dir="rtl">
        <p className="eyebrow font-arabic">{product.category}</p>
        <h3 className="mt-2 font-display text-[1.75rem] leading-none text-[var(--text)]">
          {product.name_ar}
        </h3>
        <p className="mt-1 font-arabic text-xs text-[var(--text-muted)]">{product.name_en}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-arabic text-base font-semibold text-[var(--navy)]">
            {product.price.toLocaleString()}
            <span className="mr-1 text-xs font-normal text-[var(--text-muted)]">{product.currency}</span>
          </p>
          {!product.in_stock && (
            <span className="font-arabic text-xs text-[var(--text-muted)]">غير متوفر</span>
          )}
        </div>
      </div>
    </article>
  );
}

function WaIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
