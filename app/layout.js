import { Suspense } from "react";
import { Heebo } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import { safePrimarySiteGraphJsonLdString } from "./lib/seo";
import CookieConsentManager from "./_components/cookies/CookieConsentManager";
import AttributionCapture from "./_components/AttributionCapture";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata = {
  title: "סיעודית · שירות אחיות 24/7 | אחות פרטית לבית ולבית חולים",
  description:
    "אחיות מוסמכות משרד הבריאות לליווי בבית ובבית חולים: ניטור, ניהול תרופות לפי הוראה, המשכיות אחרי שחרור ושקט למשפחה. מענה מהיר ופריסה ארצית.",
  metadataBase: new URL("https://siudit.co.il"),
  verification: {
    google: "Nyo7xi4uWrKpm2tUF26bCt-WphJ_0-OvMCwiio9sHwY",
  },
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

        {/* Google Consent Mode v2 defaults — must run before GTM loads */}
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  functionality_storage:'granted',
  security_storage:'granted',
  wait_for_update:500
});
try{
  var raw = localStorage.getItem('siudit_cookie_consent_v1');
  if(raw){
    var c = JSON.parse(raw);
    if(c && c.version === 1){
      var m = c.marketing ? 'granted' : 'denied';
      gtag('consent','update',{
        analytics_storage: c.analytics ? 'granted' : 'denied',
        ad_storage: m,
        ad_user_data: m,
        ad_personalization: m
      });
    }
  }
}catch(e){}
`}
        </Script>

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
        <Suspense fallback={null}>
          <AttributionCapture />
        </Suspense>
        <CookieConsentManager />
      </body>
    </html>
  );
}
