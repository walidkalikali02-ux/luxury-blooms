import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#071c3a] text-white">
      {/* Gold top border */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#c9a227] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#c9a227] text-4xl">✿</span>
              <div>
                <h3 className="font-arabic text-2xl font-bold text-white">زهور الفخامة</h3>
                <p className="text-[#c9a227] text-xs font-english tracking-[0.25em] uppercase">Luxury Blooms</p>
              </div>
            </div>
            <p className="text-white/60 font-arabic text-sm leading-relaxed">
              أرقى محل زهور فاخر، نقدم أجمل الباقات المصنوعة يدوياً بأعلى معايير الجودة والأناقة.
            </p>
            <p className="text-white/40 font-english text-xs mt-2 leading-relaxed">
              The finest luxury flower boutique, offering handcrafted bouquets with the highest standards of quality and elegance.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#c9a227] font-arabic text-base font-semibold mb-5 tracking-wide">
              روابط سريعة <span className="text-white/30 text-xs">/ Quick Links</span>
            </h4>
            <ul className="space-y-3">
              {[
                { ar: 'الرئيسية', en: 'Home', href: '/' },
                { ar: 'المنتجات', en: 'Products', href: '/products' },
                { ar: 'اطلب عبر واتساب', en: 'Order via WhatsApp', href: 'https://wa.me/97412345678' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#c9a227] transition-colors font-arabic text-sm flex items-center gap-2 group"
                  >
                    <span className="text-[#c9a227] group-hover:translate-x-1 transition-transform">←</span>
                    {link.ar}
                    <span className="text-white/30 text-xs">/ {link.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#c9a227] font-arabic text-base font-semibold mb-5 tracking-wide">
              تواصل معنا <span className="text-white/30 text-xs">/ Contact Us</span>
            </h4>
            <div className="space-y-4">
              <a
                href="https://wa.me/97412345678"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex items-center gap-3 px-5 py-3 rounded-xl text-white font-arabic text-sm font-semibold w-fit"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                واتساب / WhatsApp
              </a>
              <p className="text-white/50 font-arabic text-sm">
                قطر 🇶🇦 — الدوحة
              </p>
              <p className="text-white/30 text-xs font-english">Doha, Qatar</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 font-arabic text-sm text-center">
            © {new Date().getFullYear()} زهور الفخامة. جميع الحقوق محفوظة.
          </p>
          <p className="text-white/20 font-english text-xs text-center">
            © {new Date().getFullYear()} Luxury Blooms. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
