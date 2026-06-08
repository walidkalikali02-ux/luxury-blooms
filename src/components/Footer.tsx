import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-[var(--cream)]/70 mt-auto">

      {/* top hairline */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--blue)] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12" dir="rtl">

        {/* brand column */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col leading-none">
            <span className="font-cairo text-2xl font-light text-cream">
              زهور الفخامة
            </span>
            <span className="mt-1.5 text-[8px] tracking-[0.45em] uppercase text-blue-light">
              Luxury Blooms · Doha
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[var(--cream)]/50 max-w-xs">
            بوتيك زهور بطابع هادئ ومترف، نُنسّق باقات راقية لكل المناسبات.
          </p>
        </div>

        {/* links column */}
        <div className="flex flex-col gap-3">
          <p className="text-xs tracking-widest uppercase text-blue mb-2">روابط</p>
          {([
            ['الرئيسية',       '/'],
            ['المتجر',         '/products'],
            ['عن الماركة',     '/#about'],
            ['خدمة الفعاليات', '/#events'],
            ['تواصل',          '/#contact'],
          ] as [string, string][]).map(([label, href]) => (
            <Link key={href} href={href}
              className="text-sm hover:text-blue-light transition-colors w-fit">
              {label}
            </Link>
          ))}
        </div>

        {/* contact column */}
        <div className="flex flex-col gap-3">
          <p className="text-xs tracking-widest uppercase text-blue mb-2">تواصل</p>
          <p className="text-sm">الدوحة، قطر</p>
          <p className="text-sm">info@luxuryblooms.qa</p>
          <a href="https://wa.me/97412345678" target="_blank" rel="noopener noreferrer"
            className="text-sm hover:text-blue-light transition-colors">
            واتساب · +٩٧٤ ٧٤١٢ ٣٤٥٦
          </a>
          <p className="text-sm">يومياً ٩ ص — ١٠ م</p>
        </div>
      </div>

      <div className="border-t border-[var(--cream)]/10 py-6 px-6 text-center text-xs text-[var(--cream)]/30 tracking-widest">
        © {new Date().getFullYear()} زهور الفخامة · Luxury Blooms · جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
