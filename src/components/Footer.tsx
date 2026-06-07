import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#f8f7f4] border-t border-[#e8e4de]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="mb-5">
              <h3 className="font-arabic text-xl font-semibold text-[#1c1c1c] leading-tight">زهور الفخامة</h3>
              <p className="font-display text-[10px] text-[#b89a2f] tracking-[0.3em] uppercase mt-0.5">Luxury Blooms</p>
            </div>
            <p className="font-arabic text-sm text-[#4a4a4a] leading-relaxed">
              أرقى محل زهور فاخر، نقدم أجمل الباقات المصنوعة يدوياً بأعلى معايير الجودة.
            </p>
            <p className="font-display text-xs text-[#9a9a9a] italic mt-2 leading-relaxed">
              The finest luxury flower boutique, handcrafted with the highest standards.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-arabic text-sm font-semibold text-[#1c1c1c] mb-5 tracking-wide">
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {[
                { ar: 'الرئيسية', href: '/' },
                { ar: 'المنتجات', href: '/products' },
                { ar: 'اطلب عبر واتساب', href: 'https://wa.me/97412345678' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-arabic text-sm text-[#4a4a4a] hover:text-[#b89a2f] transition-colors"
                  >
                    {link.ar}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-arabic text-sm font-semibold text-[#1c1c1c] mb-5 tracking-wide">
              تواصل معنا
            </h4>
            <a
              href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار عن الزهور الفاخرة"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center gap-2.5 text-white px-5 py-2.5 rounded-sm text-sm font-arabic font-semibold"
            >
              <WaIcon />
              واتساب / WhatsApp
            </a>
            <p className="font-arabic text-sm text-[#9a9a9a] mt-4">
              الدوحة، قطر 🇶🇦
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-[#e8e4de] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-arabic text-xs text-[#9a9a9a]">
            © {new Date().getFullYear()} زهور الفخامة. جميع الحقوق محفوظة.
          </p>
          <p className="font-display text-xs text-[#c0bbb3] italic">
            Luxury Blooms · Doha, Qatar
          </p>
        </div>
      </div>
    </footer>
  );
}

function WaIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
