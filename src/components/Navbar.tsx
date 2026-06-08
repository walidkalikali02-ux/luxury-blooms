'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { ar: 'الرئيسية',    href: '/'         },
  { ar: 'المتجر',      href: '/products' },
  { ar: 'عن الماركة',  href: '/#about'   },
  { ar: 'الفعاليات',   href: '/#events'  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[var(--ink)] border-b border-[var(--line-dark)]">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">

        {/* left links — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.slice(0, 2).map(l => (
            <Link key={l.href} href={l.href}
              className="label text-white/55 hover:text-white transition-colors">
              {l.ar}
            </Link>
          ))}
        </nav>

        {/* logo */}
        <Link href="/"
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="font-cairo text-[1.35rem] font-light tracking-wide text-white leading-none">
            زهور الفخامة
          </span>
          <span className="label text-[7px] text-[var(--sky)] flex items-center gap-2">
            <span className="h-px w-4 bg-[var(--blue)]" />
            Luxury Blooms
            <span className="h-px w-4 bg-[var(--blue)]" />
          </span>
        </Link>

        {/* right links — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.slice(2).map(l => (
            <Link key={l.href} href={l.href}
              className="label text-white/55 hover:text-white transition-colors">
              {l.ar}
            </Link>
          ))}
          <a href="https://wa.me/97412345678" target="_blank" rel="noopener noreferrer"
            className="text-white/55 hover:text-white transition-colors" aria-label="واتساب">
            <WaIcon />
          </a>
        </nav>

        {/* hamburger — mobile */}
        <button onClick={() => setOpen(v => !v)}
          className="md:hidden text-white p-1" aria-label="القائمة">
          <span className="relative flex h-5 w-5 flex-col justify-between">
            {[0, 1, 2].map(i => (
              <span key={i} className={`block h-px w-5 bg-current transition-all duration-300 ${
                open && i === 0 ? 'translate-y-[8px] rotate-45' :
                open && i === 1 ? 'opacity-0' :
                open && i === 2 ? '-translate-y-[10px] -rotate-45' : ''
              }`} />
            ))}
          </span>
        </button>
      </div>

      {/* mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 border-t border-[var(--line-dark)] bg-[var(--ink-2)] ${open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-5 px-6 py-7" dir="rtl">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="label text-sm text-white/70 hover:text-white transition-colors tracking-normal normal-case text-base">
              {l.ar}
            </Link>
          ))}
          <div className="pt-3 border-t border-[var(--line-dark)]">
            <a href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-blue inline-flex gap-2">
              <WaIcon /> اطلب الآن
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function WaIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
