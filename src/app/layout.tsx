import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "زهور الفخامة | Luxury Blooms",
  description: "أرقى محل زهور فاخر في قطر | The finest luxury flower boutique in Qatar",
  keywords: "زهور, ورد, باقات, فاخر, قطر, flowers, luxury, bouquet, Qatar",
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
      <body className="min-h-full flex flex-col antialiased bg-white text-[#1c1c1c]">
        {children}
      </body>
    </html>
  );
}
