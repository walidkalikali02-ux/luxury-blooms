'use client';

import Image from 'next/image';
import type { Product } from '@/lib/supabase';

export default function ProductCard({ product }: { product: Product }) {
  const msg   = encodeURIComponent(`مرحباً، أريد الطلب:\n*${product.name_ar}*\nالسعر: ${product.price} ${product.currency}`);
  const waUrl = `https://wa.me/97412345678?text=${msg}`;

  return (
    <article className="group bg-white border border-[var(--blue)]/20 hover:border-[var(--blue)]/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex flex-col">

      {/* image — square aspect like reference */}
      <div className="relative aspect-square bg-cream-dark overflow-hidden">
        <Image
          src={product.image_url || 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=800&fit=crop'}
          alt={product.name_en}
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
        />
        {product.is_featured && (
          <span className="absolute top-2 right-2 text-[9px] tracking-widest uppercase bg-blue text-cream px-2 py-1">
            مميز
          </span>
        )}
        {!product.in_stock && (
          <span className="absolute top-2 right-2 text-[9px] tracking-widest uppercase bg-charcoal text-cream px-2 py-1">
            نفذ
          </span>
        )}
      </div>

      {/* info */}
      <div className="p-4 flex flex-col flex-1" dir="rtl">

        {/* category */}
        <p className="text-[10px] tracking-widest uppercase text-blue mb-1">
          {product.category}
        </p>

        {/* name */}
        <h3 className="text-sm font-medium text-charcoal leading-snug mb-1 hover:text-blue transition-colors line-clamp-2">
          {product.name_ar}
        </h3>

        {/* english subtitle */}
        <p className="text-[10px] text-charcoal/40 mb-3 leading-relaxed">
          {product.name_en}
        </p>

        {/* footer row */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-light text-charcoal">
              {product.price.toLocaleString()}
            </span>
            <span className="text-sm text-blue">{product.currency}</span>
          </div>
          <a
            href={product.in_stock ? waUrl : undefined}
            target="_blank" rel="noopener noreferrer"
            className={`text-[10px] tracking-widest uppercase border border-charcoal text-charcoal px-3 py-1.5 hover:bg-charcoal hover:text-cream transition-all duration-200 ${
              !product.in_stock ? 'opacity-30 pointer-events-none' : ''
            }`}
          >
            اطلب
          </a>
        </div>
      </div>
    </article>
  );
}
