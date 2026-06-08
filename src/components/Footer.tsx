import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto bg-charcoal text-[var(--cream)]/72">
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--blue)] to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_0.8fr_0.8fr]" dir="rtl">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col leading-none">
            <span className="font-display text-3xl font-medium text-cream">
              بلو بلومز
            </span>
            <span className="mt-2 text-[8px] tracking-[0.48em] uppercase text-blue-light">
              Blue Blooms Atelier · Doha
            </span>
          </div>
          <p className="max-w-md text-sm leading-8 text-[var(--cream)]/54">
            بوتيك زهور بطابع أزرق هادئ، نصنع باقات راقية ومرتبة بعناية لتناسب
            الهدايا والمناسبات واللحظات التي تستحق حضوراً أجمل.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="mb-2 text-[10px] tracking-[0.42em] uppercase text-blue">
            الروابط
          </p>
          {[
            ['الرئيسية', '/'],
            ['المتجر', '/products'],
            ['عن الماركة', '/#about'],
            ['خدمة الفعاليات', '/#events'],
            ['تواصل', '/#contact'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="w-fit text-sm transition-colors hover:text-blue-light"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="mb-2 text-[10px] tracking-[0.42em] uppercase text-blue">
            تواصل
          </p>
          <p className="text-sm">الدوحة، قطر</p>
          <p className="text-sm">info@blueblooms.qa</p>
          <a
            href="https://wa.me/97412345678"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:text-blue-light"
          >
            واتساب · +٩٧٤ ٧٤١٢ ٣٤٥٦
          </a>
          <p className="text-sm">يومياً ٩ ص — ١٠ م</p>
        </div>
      </div>

      <div className="border-t border-[var(--cream)]/10 px-6 py-6 text-center text-xs tracking-[0.28em] text-[var(--cream)]/34">
        © {new Date().getFullYear()} بلو بلومز · Blue Blooms Atelier · جميع
        الحقوق محفوظة
      </div>
    </footer>
  );
}
