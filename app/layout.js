import { Heebo } from "next/font/google";
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safePrimarySiteGraphJsonLdString() }}
        />
        {children}
      </body>
    </html>
  );
}
