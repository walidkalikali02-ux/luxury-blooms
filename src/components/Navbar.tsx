'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled
          ? 'shadow-[0_1px_0_0_var(--border),0_8px_24px_rgba(10,15,31,0.04)]'
          : 'border-b border-[var(--border)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-[78px]">

          {/* Left: links */}
          <div className="hidden md:flex items-center gap-9">
            <Link href="/" className="font-arabic text-[13px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors duration-200">
              الرئيسية
            </Link>
            <Link href="/products" className="font-arabic text-[13px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors duration-200">
              المنتجات
            </Link>
          </div>

          {/* Center: logo */}
          <Link href="/" className="flex flex-col items-center leading-none col-start-2">
            <span className="font-display text-[1.75rem] sm:text-[1.85rem] text-[var(--ink)] tracking-[0.01em]">
              زهور الفخامة
            </span>
            <span className="mt-1 flex items-center gap-2 font-mono text-[8px] text-[var(--blue)] tracking-[0.42em] uppercase">
              <span className="h-px w-3 bg-[var(--blue)]/40" />
              Luxury Blooms
              <span className="h-px w-3 bg-[var(--blue)]/40" />
            </span>
          </Link>

          {/* Right: CTA */}
          <div className="hidden md:flex items-center justify-end col-start-3">
            <a
              href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-blue inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-arabic text-[13px] font-medium"
            >
              <WaIcon />
              اطلب الآن
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--ink)] col-start-1 justify-self-start"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="relative block w-5">
              <span
                className="block h-px w-5 bg-current transition-transform duration-300"
                style={{ transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'translateY(-4px)' }}
              />
              <span
                className="block h-px w-5 bg-current transition-opacity duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-px w-5 bg-current transition-transform duration-300"
                style={{ transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'translateY(4px)' }}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden border-t border-[var(--border)] bg-white transition-[max-height,opacity] duration-300 ${
          menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 py-6 space-y-5">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block font-arabic text-base text-[var(--ink)]">
            الرئيسية
          </Link>
          <Link href="/products" onClick={() => setMenuOpen(false)} className="block font-arabic text-base text-[var(--ink)]">
            المنتجات
          </Link>
          <a
            href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-blue inline-flex items-center gap-2 px-5 py-3 rounded-full font-arabic text-sm font-medium"
          >
            <WaIcon />
            اطلب الآن
          </a>
        </div>
      </div>
    </nav>
  );
}

function WaIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
