'use client';

import Image from 'next/image';
import type { Product } from '@/lib/supabase';

export default function ProductCard({ product }: { product: Product }) {
  const message = encodeURIComponent(
    `مرحباً، أريد الطلب:\n*${product.name_ar}*\nالسعر: ${product.price} ${product.currency}`,
  );
  const waUrl = `https://wa.me/97412345678?text=${message}`;

  return (
    <article
      className="group relative flex flex-col overflow-hidden border border-[var(--line)] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[var(--blue)]/45"
      data-surface
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-blue-ghost">
        <Image
          src={
            product.image_url ||
            'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=800&fit=crop'
          }
          alt={product.name_en}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,24,47,0.18)] via-transparent to-transparent" />

        {product.is_featured && (
          <span className="absolute left-3 top-3 border border-white/20 bg-[rgba(31,95,255,0.92)] px-2.5 py-1 text-[9px] tracking-[0.3em] text-cream shadow-[0_10px_26px_rgba(31,95,255,0.2)]">
            مميز
          </span>
        )}

        {!product.in_stock && (
          <span className="absolute left-3 top-3 border border-white/20 bg-[rgba(7,24,47,0.9)] px-2.5 py-1 text-[9px] tracking-[0.3em] text-cream">
            نفذ
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5" dir="rtl">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] tracking-[0.32em] uppercase text-blue">
            {product.category}
          </p>
          <span className="h-px flex-1 bg-[var(--line)]" />
        </div>

        <h3 className="font-display text-lg leading-tight text-charcoal transition-colors group-hover:text-blue-deep">
          {product.name_ar}
        </h3>

        <p className="text-[11px] leading-6 text-[var(--charcoal)]/46">
          {product.name_en}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-light text-charcoal">
              {product.price.toLocaleString()}
            </span>
            <span className="text-xs tracking-[0.25em] uppercase text-blue">
              {product.currency}
            </span>
          </div>
          <a
            href={product.in_stock ? waUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center border border-[var(--blue)]/18 bg-[rgba(244,248,255,0.78)] px-4 py-2 text-[10px] tracking-[0.32em] uppercase text-charcoal transition-colors hover:border-blue hover:text-blue ${
              !product.in_stock ? 'pointer-events-none opacity-35' : ''
            }`}
          >
            اطلب
          </a>
        </div>
      </div>
    </article>
  );
}
