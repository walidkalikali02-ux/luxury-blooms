'use client';

import Image from 'next/image';
import type { Product } from '@/lib/supabase';

export default function ProductCard({ product }: { product: Product }) {
  const msg   = encodeURIComponent(`مرحباً، أريد الطلب:\n*${product.name_ar}*\nالسعر: ${product.price} ${product.currency}`);
  const waUrl = `https://wa.me/97412345678?text=${msg}`;

  return (
    <article className="product-card group flex flex-col">

      {/* Image */}
      <div className="relative w-full aspect-[4/5] bg-[var(--cream-dark)] overflow-hidden img-zoom shrink-0">
        <Image
          src={product.image_url || 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=1000&fit=crop'}
          alt={product.name_en}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {product.is_featured && (
          <span className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[var(--navy)] bg-[var(--cream)] px-2.5 sm:px-3 py-1 sm:py-1.5">
            Featured
          </span>
        )}
        {!product.in_stock && (
          <span className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[var(--cream)] bg-[var(--navy)] px-2.5 sm:px-3 py-1 sm:py-1.5">
            Sold out
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 sm:p-5" dir="rtl">

        {/* Category */}
        <p className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[var(--blue-deep)] mb-2">
          {product.category}
        </p>

        {/* Name + price row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-cairo font-light text-base sm:text-lg text-[var(--navy)] leading-snug flex-1">
            {product.name_ar}
          </h3>
          <p className="font-inter text-sm font-medium text-[var(--blue-deep)] whitespace-nowrap shrink-0">
            {product.price.toLocaleString()}
            <span className="ms-0.5 text-[9px] tracking-[0.15em] text-[var(--navy)]/40">
              {product.currency}
            </span>
          </p>
        </div>

        <p className="text-[10px] sm:text-[11px] text-[var(--navy)]/40 mb-4 leading-relaxed">
          {product.name_en}
        </p>

        {/* CTA */}
        <div className="mt-auto">
          <a
            href={product.in_stock ? waUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] tracking-[0.22em] uppercase border border-[var(--navy)] text-[var(--navy)] px-3 py-1.5 hover:bg-[var(--navy)] hover:text-[var(--cream)] transition-all duration-200 ${
              !product.in_stock ? 'pointer-events-none opacity-30' : ''
            }`}
          >
            اطلب الآن
            <ArrowIcon />
          </a>
        </div>
      </div>

    </article>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
    </svg>
  );
}
