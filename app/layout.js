import { Heebo } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import { safePrimarySiteGraphJsonLdString } from "./lib/seo";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata = {
  title: "סיעוד פרימיום · אחות פרטית לבית ולבית חולים | זמינות 24/7",
  description:
    "אחיות מוסמכות משרד הבריאות לליווי בבית ובבית חולים: ניטור, ניהול תרופות לפי הוראה, המשכיות אחרי שחרור ושקט למשפחה. מענה מהיר ופריסה ארצית.",
  metadataBase: new URL("https://siudit.co.il"),
};

export const viewport = {
  themeColor: "#0a1f44",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="min-h-screen text-slate-900 antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TVWCZL96"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TVWCZL96');
`}
        </Script>
        {/* End Google Tag Manager */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safePrimarySiteGraphJsonLdString() }}
        />
        {children}
      </body>
    </html>
  );
}
