'use client';

import Image from 'next/image';
import type { Product } from '@/lib/supabase';

export default function ProductCard({ product }: { product: Product }) {
  const msg = encodeURIComponent(
    `مرحباً، أريد الطلب:\n*${product.name_ar}*\nالسعر: ${product.price} ${product.currency}`
  );
  const waUrl = `https://wa.me/97412345678?text=${msg}`;

  return (
    <article className="group">
      <div className="relative img-zoom aspect-[4/5] bg-[var(--cream)] overflow-hidden border border-[var(--border)] rounded-sm">
        <Image
          src={product.image_url || 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=1000&fit=crop'}
          alt={product.name_en}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/55 via-[var(--ink)]/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {product.is_featured && (
          <span className="absolute top-4 left-4 z-10 font-mono text-[9px] tracking-[0.28em] uppercase text-white bg-[var(--blue)] px-2.5 py-1">
            Featured
          </span>
        )}
        {!product.in_stock && (
          <span className="absolute top-4 left-4 z-10 font-mono text-[9px] tracking-[0.28em] uppercase text-[var(--ink)] bg-white/95 px-2.5 py-1 border border-[var(--border)]">
            Sold out
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <a
            href={product.in_stock ? waUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-blue w-full inline-flex items-center justify-center gap-2 px-5 py-3 font-arabic text-sm font-medium ${
              !product.in_stock ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            <WaIcon />
            اطلب الآن
          </a>
        </div>
      </div>

      <div className="pt-5" dir="rtl">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-[1.7rem] leading-[1.05] text-[var(--ink)]">
            {product.name_ar}
          </h3>
          <p className="font-mono text-sm font-medium text-[var(--blue)] whitespace-nowrap">
            {product.price.toLocaleString()}
            <span className="ml-1 text-[10px] tracking-[0.15em] text-[var(--muted)]">{product.currency}</span>
          </p>
        </div>
        <p className="mt-1 font-arabic text-xs text-[var(--muted)]">
          {product.name_en} · <span className="text-[var(--hint)]">{product.category}</span>
        </p>
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
