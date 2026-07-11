import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-assistant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "חן דגן | פלנינג ואסטרטגיה שיווקית",
  description:
    "מזהה את המתח שמאחורי ההתנהגות ובונה ממנו כיוון מסרים. תיק עבודות עם פירוקי בריף, מקרי בוחן של לקוחות אמיתיים ותהליך עבודה מלא.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={assistant.variable} suppressHydrationWarning>
      <head>
        <script
          // מסמן שה JS פעיל לפני הציור הראשון: בלי זה אפקט החשיפה היה מסתיר תוכן למי שאין לו JS
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }}
        />
      </head>
      <body>
        {/* פילטר הרפרקציה של הזכוכית: מוגדר פעם אחת, מופעל רק בכרומיום */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.008"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="3" result="soft" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="soft"
              scale="48"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
        <Script id="refraction-probe" strategy="afterInteractive">
          {`try{var c=!!window.chrome&&CSS.supports('backdrop-filter','url(#x)');document.documentElement.classList.toggle('has-refraction',c);}catch(e){}`}
        </Script>
        <div className="bg-scene" aria-hidden="true" />
        <div className="bg-grain" aria-hidden="true" />
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
