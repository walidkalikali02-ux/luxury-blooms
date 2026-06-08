import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "بلو بلومز | Blue Blooms Atelier",
  description: "بوتيك زهور فاخر بطابع أزرق هادئ في قطر",
  keywords: "زهور, ورد, باقات, فاخر, قطر, flowers, luxury, bouquet, Qatar, blue, floral, atelier",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-cream text-charcoal font-cairo">
        {children}
      </body>
    </html>
  );
}
