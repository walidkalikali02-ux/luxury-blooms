'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const links = [
  { ar: 'الرئيسية',   href: '/'         },
  { ar: 'المتجر',     href: '/products' },
  { ar: 'عن الماركة', href: '/#about'   },
  { ar: 'الفعاليات',  href: '/#events'  },
  { ar: 'تواصل',      href: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[var(--cream)]/95 backdrop-blur-sm border-b border-[var(--blue)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-24 flex items-center justify-between">

        {/* logo */}
        <Link href="/" className="flex items-center">
          <div className="flex flex-col leading-none">
            <span className="font-cairo text-[1.45rem] font-light tracking-wide text-charcoal">
              زهور الفخامة
            </span>
            <span className="mt-1 flex items-center gap-2 text-[8px] tracking-[0.45em] uppercase text-blue">
              <span className="h-px w-3 bg-blue" />
              Luxury Blooms
            </span>
          </div>
        </Link>

        {/* center nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="text-xs tracking-widest uppercase text-charcoal hover:text-blue transition-colors">
              {l.ar}
            </Link>
          ))}
        </nav>

        {/* right side */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-xs tracking-widest uppercase text-charcoal-light hover:text-blue transition-colors border border-blue/40 px-2 py-1">
            EN
          </button>
          <a href="https://wa.me/97412345678" target="_blank" rel="noopener noreferrer"
            className="text-charcoal hover:text-blue transition-colors p-1.5"
            aria-label="واتساب">
            <WaIcon />
          </a>
          <a href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
            target="_blank" rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase text-charcoal hover:text-blue border border-blue/40 hover:border-blue px-3 py-1.5 transition-all">
            اطلب الآن
          </a>
        </div>

        {/* mobile hamburger */}
        <button onClick={() => setOpen(v => !v)}
          className="md:hidden text-charcoal hover:text-blue transition-colors p-1.5"
          aria-label="القائمة">
          <span className="relative block w-6 h-5">
            <span className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ${open ? 'top-1/2 rotate-45' : 'top-1'}`} />
            <span className={`absolute left-0 top-1/2 block h-px w-6 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ${open ? 'top-1/2 -rotate-45' : 'bottom-1'}`} />
          </span>
        </button>
      </div>

      {/* mobile drawer */}
      <div className={`md:hidden overflow-hidden border-t border-[var(--blue)]/30 bg-cream transition-[max-height,opacity] duration-300 ${
        open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col gap-5 px-6 py-7" dir="rtl">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-sm tracking-widest uppercase text-charcoal hover:text-blue transition-colors">
              {l.ar}
            </Link>
          ))}
          <div className="pt-3 border-t border-[var(--blue)]/30">
            <a href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
              target="_blank" rel="noopener noreferrer"
              className="inline-block bg-charcoal text-cream px-6 py-3 text-xs tracking-widest uppercase hover:bg-charcoal-light transition-colors">
              اطلب الآن
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function WaIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
