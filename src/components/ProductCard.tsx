'use client';

import Image from 'next/image';
import type { Product } from '@/lib/supabase';

export default function ProductCard({ product }: { product: Product }) {
  const msg   = encodeURIComponent(`مرحباً، أريد الطلب:\n*${product.name_ar}*\nالسعر: ${product.price} ${product.currency}`);
  const waUrl = `https://wa.me/97412345678?text=${msg}`;

  return (
    <article className="product-card group flex flex-col">

      {/* image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden zoom shrink-0 bg-[var(--off)]">
        <Image
          src={product.image_url || 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=1000&fit=crop'}
          alt={product.name_en}
          fill
          className="object-cover"
          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
        />
        {product.is_featured && (
          <span className="absolute top-3 right-3 label text-[9px] bg-[var(--blue)] text-white px-2.5 py-1 rounded-sm">
            مميز
          </span>
        )}
        {!product.in_stock && (
          <span className="absolute top-3 right-3 label text-[9px] bg-[var(--ink)] text-white px-2.5 py-1 rounded-sm">
            نفذ
          </span>
        )}
      </div>

      {/* info */}
      <div className="flex flex-1 flex-col p-4 sm:p-5" dir="rtl">

        <p className="label text-[9px] text-[var(--blue)] mb-2">{product.category}</p>

        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-cairo font-light text-[1.05rem] text-[var(--ink)] leading-snug flex-1">
            {product.name_ar}
          </h3>
          <p className="font-inter text-sm font-medium text-[var(--ink)] whitespace-nowrap shrink-0 pt-0.5">
            {product.price.toLocaleString()}
            <span className="ms-1 text-[9px] font-normal text-[var(--muted)]">{product.currency}</span>
          </p>
        </div>

        <p className="text-[10px] text-[var(--muted)] mb-5 leading-relaxed">{product.name_en}</p>

        <div className="mt-auto">
          <a
            href={product.in_stock ? waUrl : undefined}
            target="_blank" rel="noopener noreferrer"
            className={`btn-outline text-[9px] py-2 px-3 ${!product.in_stock ? 'pointer-events-none opacity-30' : ''}`}
          >
            اطلب الآن
            <Arrow />
          </a>
        </div>
      </div>
    </article>
  );
}

function Arrow() {
  return (
    <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 5l7 7-7 7"/>
    </svg>
  );
}
