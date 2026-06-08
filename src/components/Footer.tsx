import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white/55">
      <div className="hairline" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12" dir="rtl">

        {/* brand */}
        <div>
          <p className="font-cairo text-xl font-light text-white mb-1">زهور الفخامة</p>
          <p className="label text-[8px] text-[#93C5FD] mb-6">Luxury Blooms · Doha</p>
          <p className="text-sm text-white/40 leading-loose max-w-xs">
            بوتيك زهور بطابع هادئ ومترف، نُنسّق باقات راقية لكل المناسبات.
          </p>
        </div>

        {/* links */}
        <div>
          <p className="label text-[9px] text-[#93C5FD] mb-6">روابط</p>
          <ul className="flex flex-col gap-3.5 text-sm">
            {([
              ['الرئيسية',       '/'],
              ['المتجر',         '/products'],
              ['عن الماركة',     '/#about'],
              ['خدمة الفعاليات', '/#events'],
            ] as [string, string][]).map(([label, href]) => (
              <li key={href}>
                <Link href={href}
                  className="text-white/45 hover:text-[#93C5FD] transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div>
          <p className="label text-[9px] text-[#93C5FD] mb-6">تواصل</p>
          <ul className="flex flex-col gap-4 text-sm text-white/45">
            {([
              ['الدوحة، قطر',          null],
              ['واتساب · ٧٤١٢ ٣٤٥ ٦٧٨', 'https://wa.me/97412345678'],
              ['يومياً ٩ ص — ١٠ م',    null],
            ] as [string, string | null][]).map(([text, href]) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-2 h-1 w-1 rounded-full bg-[var(--blue)] shrink-0" />
                {href
                  ? <a href={href} target="_blank" rel="noopener noreferrer"
                      className="hover:text-[#93C5FD] transition-colors">{text}</a>
                  : <span>{text}</span>
                }
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06] py-5 text-center label text-[8px] text-white/20 tracking-widest">
        © {new Date().getFullYear()} Luxury Blooms · All rights reserved
      </div>
    </footer>
  );
}
