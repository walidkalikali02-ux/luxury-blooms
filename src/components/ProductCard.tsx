'use client';

import Image from 'next/image';
import type { Product } from '@/lib/supabase';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappMessage = encodeURIComponent(
    `مرحباً، أريد الطلب:\n*${product.name_ar}* - ${product.name_en}\nالسعر: ${product.price} ${product.currency}`
  );
  const whatsappUrl = `https://wa.me/97412345678?text=${whatsappMessage}`;

  return (
    <div className="luxury-card bg-white border border-[#e8e4de] flex flex-col group">

      {/* Image */}
      <div className="relative h-72 overflow-hidden bg-[#f8f7f4]">
        <Image
          src={product.image_url || 'https://images.unsplash.com/photo-1487530811015-780780b22c28?w=600&h=600&fit=crop'}
          alt={product.name_en}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {product.is_featured && (
            <span className="bg-white text-[#b89a2f] text-[10px] font-arabic font-semibold px-2.5 py-1 tracking-wider uppercase">
              مميز
            </span>
          )}
          {!product.in_stock && (
            <span className="bg-[#1c1c1c] text-white text-[10px] font-arabic px-2.5 py-1 tracking-wider">
              نفذت الكمية
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1" dir="rtl">
        <p className="font-arabic text-[10px] text-[#b89a2f] tracking-[0.2em] uppercase mb-2">
          {product.category}
        </p>

        <h3 className="font-arabic text-base font-semibold text-[#1c1c1c] leading-snug mb-0.5">
          {product.name_ar}
        </h3>
        <p className="font-display text-xs text-[#9a9a9a] italic mb-3">
          {product.name_en}
        </p>

        <p className="font-arabic text-sm text-[#4a4a4a] leading-relaxed line-clamp-2 flex-1 mb-5">
          {product.description_ar}
        </p>

        {/* Price + Order */}
        <div className="flex items-center justify-between pt-4 border-t border-[#e8e4de]">
          <div>
            <span className="font-arabic text-lg font-bold text-[#1c1c1c]">
              {product.price.toLocaleString()}
            </span>
            <span className="font-arabic text-xs text-[#9a9a9a] mr-1">{product.currency}</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-whatsapp text-white px-4 py-2 text-xs font-arabic font-semibold flex items-center gap-1.5 rounded-sm ${!product.in_stock ? 'opacity-40 pointer-events-none' : ''}`}
          >
            <WaIcon />
            اطلب الآن
          </a>
        </div>
      </div>
    </div>
  );
}

function WaIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
