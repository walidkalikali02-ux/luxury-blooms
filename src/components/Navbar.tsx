'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { ar: 'الرئيسية',   href: '/'        },
    { ar: 'المتجر',     href: '/products' },
    { ar: 'عن الماركة', href: '/#about'   },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[var(--cream)]/95 backdrop-blur-sm border-b border-[var(--line)]">

      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-24 flex items-center justify-between">

        {/* Desktop nav links (right side in RTL = start) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[11px] tracking-[0.25em] uppercase text-[var(--navy)]/70 hover:text-[var(--navy)] transition-colors"
            >
              {l.ar}
            </Link>
          ))}
        </div>

        {/* Logo — center */}
        <Link href="/" className="flex flex-col items-center leading-none absolute left-1/2 -translate-x-1/2">
          <span className="font-cairo text-[1.35rem] sm:text-[1.5rem] font-light tracking-wide text-[var(--navy)]">
            زهور الفخامة
          </span>
          <span className="mt-1.5 flex items-center gap-1.5 font-inter text-[7px] sm:text-[8px] text-[var(--blue-deep)] tracking-[0.42em] uppercase">
            <span className="h-px w-2 bg-[var(--blue)]" />
            Luxury Blooms
            <span className="h-px w-2 bg-[var(--blue)]" />
          </span>
        </Link>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-[10px] tracking-[0.25em] uppercase text-[var(--navy)]/70 hover:text-[var(--navy)] border border-[var(--line)] px-3 py-1.5 hover:border-[var(--navy)] transition-colors">
            EN
          </button>
          <a
            href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--navy)]/70 hover:text-[var(--navy)] transition-colors"
            aria-label="WhatsApp"
          >
            <WaIcon />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-1 text-[var(--navy)] hover:text-[var(--blue-deep)] transition-colors"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="relative block w-5 h-5">
            <span
              className="absolute left-0 top-1/2 block h-px w-5 bg-current transition-transform duration-300"
              style={{ transform: menuOpen ? 'translateY(0) rotate(45deg)' : 'translateY(-4px)' }}
            />
            <span
              className="absolute left-0 top-1/2 block h-px w-5 bg-current transition-opacity duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="absolute left-0 top-1/2 block h-px w-5 bg-current transition-transform duration-300"
              style={{ transform: menuOpen ? 'translateY(0) rotate(-45deg)' : 'translateY(4px)' }}
            />
          </span>
        </button>

      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden border-t border-[var(--line)] bg-[var(--cream)] transition-[max-height,opacity] duration-300 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 py-7 space-y-5" dir="rtl">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm tracking-[0.2em] uppercase text-[var(--navy)]/80 hover:text-[var(--navy)] transition-colors"
            >
              {l.ar}
            </Link>
          ))}
          <div className="pt-2 border-t border-[var(--line)]">
            <a
              href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark inline-flex"
            >
              <WaIcon />
              اطلب الآن
            </a>
          </div>
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
