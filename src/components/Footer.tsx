import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-white">
      {/* Big serif sign-off */}
      <div className="border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-20 lg:py-28 text-center" dir="rtl">
          <p className="eyebrow">Maison florale</p>
          <p className="mt-6 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92] text-[var(--ink)]">
            زهور
            <span className="italic text-[var(--blue)]"> الفخامة</span>
          </p>
          <p className="mt-6 font-arabic text-sm text-[var(--muted)]">
            الدوحة، قطر · صناعة باقات الزهور بدقة وذوق
          </p>
        </div>
      </div>

      {/* Links + meta */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 items-start" dir="rtl">

          <div>
            <p className="eyebrow mb-5">روابط</p>
            <ul className="space-y-3">
              {[{ ar: 'الرئيسية', href: '/' }, { ar: 'المنتجات', href: '/products' }].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-arabic text-sm text-[var(--text)] hover:text-[var(--blue)] transition-colors"
                  >
                    {l.ar}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">تواصل</p>
            <a
              href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
              target="_blank"
              rel="noopener noreferrer"
              className="font-arabic text-sm text-[var(--text)] hover:text-[var(--blue)] transition-colors"
            >
              واتساب · ٧٤١٢ ٣٤٥ ٦٧٨
            </a>
          </div>

          <div className="md:text-left">
            <p className="eyebrow mb-5">العنوان</p>
            <p className="font-arabic text-sm text-[var(--text)]">الدوحة، قطر</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-arabic text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} زهور الفخامة. جميع الحقوق محفوظة.
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--hint)]">
            White · Cobalt · Blooms
          </p>
        </div>
      </div>
    </footer>
  );
}
