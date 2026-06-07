'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-md border-b border-[#E5DDD0] shadow-[0_1px_20px_rgba(0,0,0,0.04)]'
          : 'bg-white/0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between" style={{ height: 70 }}>

          {/* Logo */}
          <Link href="/" className="group flex flex-col items-start leading-none">
            <span className="font-arabic font-semibold text-[17px] text-[#0F0F0F] tracking-wide group-hover:text-[#C49A2E] transition-colors">
              زهور الفخامة
            </span>
            <span className="font-display italic text-[10px] text-[#C49A2E] tracking-[0.3em] uppercase">
              Luxury Blooms
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {[
              { ar: 'الرئيسية', href: '/' },
              { ar: 'المنتجات', href: '/products' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="gold-underline font-arabic text-sm text-[#4A4540] hover:text-[#0F0F0F] transition-colors"
              >
                {l.ar}
              </Link>
            ))}

            <a
              href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa flex items-center gap-2 px-5 py-2.5 text-sm font-arabic font-semibold rounded-sm"
            >
              <WaIcon />
              اطلب الآن
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#0F0F0F]"
            aria-label="Menu"
          >
            <span className="block w-5 h-px bg-current mb-1.5 transition-all" style={{ transform: menuOpen ? 'rotate(45deg) translate(1px, 10px)' : 'none' }} />
            <span className="block w-5 h-px bg-current mb-1.5" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-5 h-px bg-current" style={{ transform: menuOpen ? 'rotate(-45deg) translate(1px, -10px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#E5DDD0] py-6 space-y-4 bg-white">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block font-arabic text-base text-[#0F0F0F]">الرئيسية</Link>
            <Link href="/products" onClick={() => setMenuOpen(false)} className="block font-arabic text-base text-[#0F0F0F]">المنتجات</Link>
            <a
              href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
              target="_blank" rel="noopener noreferrer"
              className="btn-wa inline-flex items-center gap-2 px-5 py-2.5 text-sm font-arabic font-semibold rounded-sm"
            >
              <WaIcon /> اطلب الآن
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

function WaIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
