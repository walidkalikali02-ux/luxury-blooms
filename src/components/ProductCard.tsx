'use client';

import Image from 'next/image';
import type { Product } from '@/lib/supabase';

export default function ProductCard({ product }: { product: Product }) {
  const msg = encodeURIComponent(
    `مرحباً، أريد الطلب:\n*${product.name_ar}*\nالسعر: ${product.price} ${product.currency}`
  );
  const waUrl = `https://wa.me/97412345678?text=${msg}`;

  return (
    <article className="product-card group">
      <div className="relative aspect-[4/5] bg-[var(--cream-dark)] overflow-hidden img-zoom">
        <Image
          src={product.image_url || 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=1000&fit=crop'}
          alt={product.name_en}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {product.is_featured && (
          <span className="absolute top-4 left-4 z-10 text-[10px] tracking-[0.3em] uppercase text-[var(--navy)] bg-[var(--cream)] px-3 py-1.5">
            Featured
          </span>
        )}
        {!product.in_stock && (
          <span className="absolute top-4 left-4 z-10 text-[10px] tracking-[0.3em] uppercase text-[var(--cream)] bg-[var(--navy)] px-3 py-1.5">
            Sold out
          </span>
        )}
      </div>

      <div className="p-5" dir="rtl">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--blue-deep)] mb-2">
          {product.category}
        </p>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-cairo text-lg font-light text-[var(--navy)] leading-tight">
            {product.name_ar}
          </h3>
          <p className="font-inter text-sm font-medium text-[var(--blue-deep)] whitespace-nowrap">
            {product.price.toLocaleString()}
            <span className="ms-1 text-[9px] tracking-[0.2em] text-[var(--navy)]/40">
              {product.currency}
            </span>
          </p>
        </div>
        <p className="text-[11px] text-[var(--navy)]/40 mt-1 mb-4 leading-relaxed">
          {product.name_en}
        </p>

        <a
          href={product.in_stock ? waUrl : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase border border-[var(--navy)] text-[var(--navy)] px-3 py-1.5 hover:bg-[var(--navy)] hover:text-[var(--cream)] transition-all duration-200 ${
            !product.in_stock ? 'pointer-events-none opacity-30' : ''
          }`}
        >
          اطلب الآن
          <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
    </svg>
  );
}
