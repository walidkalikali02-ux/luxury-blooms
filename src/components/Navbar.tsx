'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  { ar: 'الرئيسية', href: '/' },
  { ar: 'المتجر', href: '/products' },
  { ar: 'عن الماركة', href: '/#about' },
  { ar: 'الفعاليات', href: '/#events' },
  { ar: 'تواصل', href: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[var(--line)] bg-[color:rgba(244,248,255,0.82)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 md:h-24 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center border border-[var(--blue)]/20 bg-white text-blue shadow-[0_10px_30px_rgba(31,95,255,0.08)]">
            <span className="absolute inset-2 rounded-full border border-[var(--blue)]/18" />
            <span className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-[var(--blue)]/30" />
            <span className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-[var(--blue)]/30" />
            <span className="relative text-sm leading-none">✿</span>
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[1.55rem] font-medium tracking-tight text-charcoal">
              بلو بلومز
            </span>
            <span className="mt-1 flex items-center gap-2 text-[8px] tracking-[0.48em] uppercase text-blue">
              <span className="h-px w-4 bg-blue" />
              Blue Blooms Atelier
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] tracking-[0.32em] uppercase text-[var(--charcoal)]/76 transition-colors hover:text-blue"
            >
              {link.ar}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button className="border border-[var(--blue)]/20 bg-white px-3 py-2 text-[10px] tracking-[0.32em] uppercase text-charcoal transition-colors hover:border-blue hover:text-blue">
            EN
          </button>
          <a
            href="https://wa.me/97412345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-[var(--blue)]/20 bg-white px-4 py-2 text-[10px] tracking-[0.32em] uppercase text-charcoal transition-colors hover:border-blue hover:text-blue"
          >
            اطلب الآن
          </a>
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center border border-[var(--blue)]/20 bg-white text-charcoal transition-colors hover:border-blue hover:text-blue"
          aria-label="القائمة"
        >
          <span className="relative block h-5 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ${
                open ? 'top-1/2 rotate-45' : 'top-1'
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-px w-6 bg-current transition-opacity duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ${
                open ? 'top-1/2 -rotate-45' : 'bottom-1'
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden border-t border-[var(--line)] bg-[rgba(244,248,255,0.96)] transition-[max-height,opacity] duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-5 px-6 py-7" dir="rtl">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm tracking-[0.28em] uppercase text-[var(--charcoal)] transition-colors hover:text-blue"
            >
              {link.ar}
            </Link>
          ))}
          <div className="pt-3 border-t border-[var(--line)]">
            <a
              href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-charcoal px-6 py-3 text-xs tracking-[0.32em] uppercase text-cream transition-colors hover:bg-charcoal-light"
            >
              اطلب الآن
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
