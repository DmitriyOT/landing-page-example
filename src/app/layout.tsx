import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dell Technologies — Ноутбуки, ПК, Серверы и Решения для Бизнеса",
  description:
    "Откройте мир технологий Dell. Премиальные ноутбуки XPS, игровые системы Alienware, бизнес-решения Latitude, серверы PowerEdge. Бесплатная доставка и поддержка.",
  keywords: [
    "Dell",
    "ноутбук",
    "XPS",
    "Alienware",
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
      "Откройте мир технологий Dell. Премиальные ноутбуки, игровые системы, бизнес-решения и серверы.",
    url: "https://www.dell.com/ru-ru",
    siteName: "Dell Technologies",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dell Technologies — Технологии будущего уже сегодня",
    description: "Премиальные ноутбуки, игровые системы, бизнес-решения и серверы Dell.",
  },
};

// Analytics IDs — replace with your actual IDs
const GTM_ID = "GTM-XXXXXXX";
const YM_ID = "XXXXXXXXX";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>

        {/* Yandex Metrica with Webvisor */}
        <Script id="ym-script" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(${YM_ID}, "init", {
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true,
  webvisor:true,
  trackHash:true
});`}
        </Script>
      </head>
      <body className={`${geistSans.variable} antialiased bg-white text-gray-900`}>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Yandex Metrica noscript fallback */}
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YM_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>

        {children}
      </body>
    </html>
  );
}
