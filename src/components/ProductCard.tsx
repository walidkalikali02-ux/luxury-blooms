'use client';

import Image from 'next/image';
import type { Product } from '@/lib/supabase';

export default function ProductCard({ product }: { product: Product }) {
  const msg = encodeURIComponent(
    `مرحباً، أريد الطلب:\n*${product.name_ar}*\nالسعر: ${product.price} ${product.currency}`
  );
  const waUrl = `https://wa.me/97412345678?text=${msg}`;

  return (
    <div className="card-lift group flex flex-col bg-white">

      {/* Image container — tall 4:5 ratio */}
      <div className="relative img-wrap bg-[#F2EDE5]" style={{ aspectRatio: '4/5' }}>
        <Image
          src={product.image_url || 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=800&h=1000&fit=crop'}
          alt={product.name_en}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Top badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {product.is_featured && (
            <span className="bg-white/95 text-[#C49A2E] text-[9px] font-arabic font-semibold px-3 py-1.5 tracking-[0.2em] uppercase shadow-sm">
              مميز
            </span>
          )}
          {!product.in_stock && (
            <span className="bg-[#0F0F0F]/85 text-white text-[9px] font-arabic px-3 py-1.5 tracking-[0.15em]">
              نفذت الكمية
            </span>
          )}
        </div>

        {/* Hover overlay with WA button */}
        <div className="absolute inset-0 bg-[#0F0F0F]/0 group-hover:bg-[#0F0F0F]/30 transition-all duration-500 flex items-center justify-center">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => !product.in_stock && e.preventDefault()}
            className={`reveal-overlay btn-wa flex items-center gap-2 px-5 py-2.5 text-sm font-arabic font-semibold opacity-0 group-hover:opacity-100 transition-all duration-400 rounded-sm translate-y-2 group-hover:translate-y-0 ${!product.in_stock ? 'pointer-events-none' : ''}`}
          >
            <WaIcon /> اطلب الآن
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 pb-5 px-1 flex flex-col gap-1" dir="rtl">
        <span className="text-[#C49A2E] text-[9px] font-arabic tracking-[0.25em] uppercase">
          {product.category}
        </span>
        <h3 className="font-arabic text-[15px] font-semibold text-[#0F0F0F] leading-snug">
          {product.name_ar}
        </h3>
        <p className="font-display italic text-xs text-[#9A9390]">
          {product.name_en}
        </p>
        <div className="flex items-center justify-between mt-3">
          <p className="font-arabic text-base font-bold text-[#0F0F0F]">
            {product.price.toLocaleString()}
            <span className="text-[#9A9390] text-xs font-normal mr-1">{product.currency}</span>
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[#C49A2E] text-xs font-arabic hover:text-[#8B6914] transition-colors ${!product.in_stock ? 'opacity-30 pointer-events-none' : ''}`}
          >
            اطلب ←
          </a>
        </div>
      </div>
    </div>
  );
}

function WaIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
