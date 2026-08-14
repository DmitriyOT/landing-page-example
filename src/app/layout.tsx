import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/cookie-consent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dell Technologies — Ноутбуки, ПК, Серверы и Решения для Бизнеса",
  description:
    "Откройте мир технологий Dell. Премиальные ноутбуки XPS, рабочие станции Precision, бизнес-решения Latitude, серверы PowerEdge. Бесплатная доставка и поддержка.",
  keywords: [
    "Dell",
    "ноутбук",
    "XPS",
    "Precision",
    "Latitude",
    "сервер",
    "PowerEdge",
    "компьютер",
    "технологии",
  ],
  icons: {
    icon: "https://i.dell.com/is/image/DellContent/content/dam/ss2/products/laptops/xps/15-9530.png?fmt=png-alpha&pscan=auto&scl=1&wid=64&hei=64",
  },
  openGraph: {
    title: "Dell Technologies — Технологии будущего уже сегодня",
    description:
      "Откройте мир технологий Dell. Премиальные ноутбуки, рабочие станции, бизнес-решения и серверы.",
    url: "https://www.dell.com/ru-ru",
    siteName: "Dell Technologies",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dell Technologies — Технологии будущего уже сегодня",
    description: "Премиальные ноутбуки, рабочие станции, бизнес-решения и серверы Dell.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased bg-white text-gray-900`}
      >
        {children}
        {/* Cookie consent banner + modal — scripts load ONLY after consent */}
        <CookieConsent />
      </body>
    </html>
  );
}
