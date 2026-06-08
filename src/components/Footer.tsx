import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-white/60">

      {/* Top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--blue)] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12" dir="rtl">

        {/* Brand */}
        <div>
          <p className="font-cairo text-2xl font-light text-white mb-1">
            زهور الفخامة
          </p>
          <p className="font-inter text-[9px] tracking-[0.48em] uppercase text-[var(--blue-light)] mb-6">
            Luxury Blooms · Doha
          </p>
          <p className="text-white/40 leading-loose text-sm max-w-xs">
            بوتيك زهور بطابع هادئ ومترف، نُنسّق باقات راقية لكل المناسبات بدقة وذوق رفيع.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="text-[9px] tracking-[0.42em] uppercase text-[var(--blue-light)] mb-6">روابط</p>
          <ul className="flex flex-col gap-3.5">
            {[
              { ar: 'الرئيسية',     href: '/'        },
              { ar: 'المتجر',       href: '/products' },
              { ar: 'عن الماركة',   href: '/#about'   },
              { ar: 'خدمة الفعاليات', href: '/#events' },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-white/50 hover:text-[var(--blue-light)] transition-colors"
                >
                  {l.ar}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[9px] tracking-[0.42em] uppercase text-[var(--blue-light)] mb-6">تواصل</p>
          <ul className="flex flex-col gap-4 text-sm text-white/50">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--blue)] flex-shrink-0" />
              <span>الدوحة، قطر</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--blue)] flex-shrink-0" />
              <a
                href="https://wa.me/97412345678"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--blue-light)] transition-colors"
              >
                واتساب · ٧٤١٢ ٣٤٥ ٦٧٨
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--blue)] flex-shrink-0" />
              <span>يومياً ٩ ص — ١٠ م</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06] py-6 px-6 text-center text-[9px] text-white/25 tracking-[0.35em] uppercase">
        © {new Date().getFullYear()} Luxury Blooms · All rights reserved
      </div>
    </footer>
  );
}
