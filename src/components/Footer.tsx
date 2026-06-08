import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-[var(--cream)]/70 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12" dir="rtl">

        {/* Brand */}
        <div>
          <p className="font-cairo text-2xl font-light text-[var(--cream)] mb-1">
            زهور الفخامة
          </p>
          <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-[var(--blue)] mb-6">
            Luxury Blooms
          </p>
          <p className="text-[var(--cream)]/50 leading-loose text-sm">
            بوتيك زهور بطابع هادئ ومترف، نُنسّق باقات راقية لكل المناسبات بدقة وذوق رفيع.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--blue)] mb-6">روابط</p>
          <ul className="flex flex-col gap-3">
            {[
              { ar: 'الرئيسية', href: '/' },
              { ar: 'المتجر', href: '/products' },
              { ar: 'عن الماركة', href: '/#about' },
              { ar: 'خدمة الفعاليات', href: '/#events' },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-[var(--cream)]/60 hover:text-[var(--blue)] transition-colors"
                >
                  {l.ar}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--blue)] mb-6">تواصل</p>
          <ul className="flex flex-col gap-3 text-sm text-[var(--cream)]/60">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--blue)] flex-shrink-0" />
              <span>الدوحة، قطر</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--blue)] flex-shrink-0" />
              <a
                href="https://wa.me/97412345678"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--blue)] transition-colors"
              >
                واتساب · ٧٤١٢ ٣٤٥ ٦٧٨
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--blue)] flex-shrink-0" />
              <span>يومياً ٩ ص — ١٠ م</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--cream)]/10 py-6 px-6 text-center text-[10px] text-[var(--cream)]/30 tracking-[0.3em] uppercase">
        © {new Date().getFullYear()} Luxury Blooms · All rights reserved
      </div>
    </footer>
  );
}
