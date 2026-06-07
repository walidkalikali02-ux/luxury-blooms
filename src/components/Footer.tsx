import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-sub)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2 max-w-xl">
            <p className="font-display text-3xl text-[var(--primary)] leading-none">
              زهور الفخامة
            </p>
            <p className="mt-3 eyebrow font-arabic">
              Luxury Blooms
            </p>
            <p className="mt-5 font-arabic text-sm leading-7 text-[var(--text-sub)]">
              بوتيك زهور بطابع هادئ ومترف، يجمع بين النقاء البصري والدقة في الترتيب والتوصيل.
            </p>
          </div>

          <div>
            <p className="eyebrow font-arabic mb-5">روابط</p>
            <ul className="space-y-3">
              {[{ ar: 'الرئيسية', href: '/' }, { ar: 'المنتجات', href: '/products' }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-arabic text-sm text-[var(--text-sub)] transition-colors hover:text-[var(--primary)]">
                    {l.ar}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow font-arabic mb-5">تواصل</p>
            <a
              href="https://wa.me/97412345678?text=مرحباً، أريد الاستفسار"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-3 font-arabic text-sm font-semibold"
            >
              <WaIcon />
              واتساب
            </a>
            <p className="mt-5 font-arabic text-xs text-[var(--text-sub)]">
              الدوحة، قطر
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-arabic text-xs text-[var(--text-sub)]">
            © {new Date().getFullYear()} زهور الفخامة. جميع الحقوق محفوظة.
          </p>
          <p className="font-display text-sm text-[var(--primary)]">
            White canvas · Blue precision · Luxury restraint
          </p>
        </div>
      </div>
    </footer>
  );
}

function WaIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
