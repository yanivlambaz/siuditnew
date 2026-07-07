import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Landmark, MessageCircle } from "lucide-react";
import BrandLockup from "./BrandLockup";
import Container from "./ui/Container";
import CookiePreferencesButton from "./legal/CookiePreferencesButton";
import { cities } from "../_data/cities";
import { orgTelHref, orgPhoneDisplayIl } from "../lib/orgPhone";
import { publicWhatsappHref } from "../lib/contactUrls";
import {
  ORG_ADDRESS_DISPLAY,
  ORG_EMAIL,
  ORG_LEGAL_NAME,
  ORG_PLACEMENT_LICENSE_NO,
  ORG_PLACEMENT_LICENSE_URL,
} from "../lib/orgInfo";

export default function SiteFooter() {
  const waHref = publicWhatsappHref();
  return (
    <footer className="relative overflow-hidden bg-[#04122e] text-slate-300">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(900px circle at 80% -20%, rgba(95,209,240,0.18), transparent 60%), radial-gradient(700px circle at 0% 110%, rgba(31,107,255,0.18), transparent 55%)",
        }}
      />

      <Container size="wide" className="relative py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <BrandLockup theme="dark" />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-slate-300/90">
              ליווי סיעוד פרטי ארצי: אחיות מוסמכות לבית ולבית חולים, עם דגש על רישוי, רצף טיפולי, ושיח אנושי כשהלחץ גבוה.
              <span className="mt-2 block text-[13px] font-medium text-slate-400">
                {ORG_LEGAL_NAME} · שירות בכל הארץ
              </span>
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FooterContact icon={Phone} title="טלפון">
                <a href={orgTelHref()} className="hover:text-white">{orgPhoneDisplayIl()}</a>
              </FooterContact>
              <FooterContact icon={MessageCircle} title="WhatsApp">
                <a
                  href={waHref}
                  className="font-semibold hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp מיידי
                </a>
              </FooterContact>
              <FooterContact icon={Clock} title="זמינות">
                24/7 · כל ימות השנה
              </FooterContact>
              <FooterContact icon={MapPin} title="כתובת רשומה">
                <span className="leading-snug">{ORG_ADDRESS_DISPLAY}</span>
                <span className="mt-1.5 block text-[12px] font-normal text-slate-400">
                  שירות בכל הארץ · תיאום לפי עיר ובית חולים
                </span>
              </FooterContact>
              <FooterContact icon={Mail} title="דוא״ל">
                <a href={`mailto:${ORG_EMAIL}`} className="break-all hover:text-white">
                  {ORG_EMAIL}
                </a>
              </FooterContact>
              <div className="sm:col-span-2">
                <FooterContact icon={Landmark} title="רישיון השמה · משרד העבודה">
                  <span className="block leading-snug">
                    {ORG_LEGAL_NAME} — לשכה פרטית מפוקחת · מס׳ רישיון {ORG_PLACEMENT_LICENSE_NO}
                  </span>
                  <a
                    href={ORG_PLACEMENT_LICENSE_URL}
                    className="mt-2 inline-block font-semibold text-cyan-300/95 underline-offset-2 hover:text-white hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    לצפייה ברישיון במאגר הלשכות הפרטיות (gov.il)
                  </a>
                </FooterContact>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/60">
              ניווט
            </h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li><Link href="/about" className="text-slate-300 transition hover:text-white">אודות</Link></li>
              <li><Link href="/team" className="text-slate-300 transition hover:text-white">הצוות המקצועי</Link></li>
              <li><Link href="/services" className="text-slate-300 transition hover:text-white">שירותים</Link></li>
              <li><Link href="/cities" className="text-slate-300 transition hover:text-white">ערים</Link></li>
              <li><Link href="/hospitals" className="text-slate-300 transition hover:text-white">בתי חולים</Link></li>
              <li><Link href="/guides" className="text-slate-300 transition hover:text-white">מדריכים ומפת נושאים</Link></li>
              <li><Link href="/blog" className="text-slate-300 transition hover:text-white">בלוג מקצועי</Link></li>
              <li><Link href="/#process" className="text-slate-300 transition hover:text-white">איך זה עובד</Link></li>
              <li><Link href="/#faq" className="text-slate-300 transition hover:text-white">שאלות נפוצות</Link></li>
              <li><Link href="/#contact" className="text-slate-300 transition hover:text-white">יצירת קשר</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/60">
              שירות בכל הארץ
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-[15px]">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/cities/${c.slug}`}
                    className="text-slate-300 transition hover:text-white"
                  >
                    אחות פרטית ב{c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav
          aria-label="קישורים משפטיים"
          className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-8 text-[13px]"
        >
          <Link href="/privacy-policy" className="text-slate-300 transition hover:text-white">
            מדיניות פרטיות
          </Link>
          <Link href="/terms" className="text-slate-300 transition hover:text-white">
            תנאי שימוש
          </Link>
          <Link href="/accessibility" className="text-slate-300 transition hover:text-white">
            הצהרת נגישות
          </Link>
          <CookiePreferencesButton className="rounded text-slate-300 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40" />
        </nav>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 text-[13px] text-slate-400 sm:flex-row sm:items-center">
          <div className="max-w-2xl space-y-2">
            <span suppressHydrationWarning>
              © {new Date().getFullYear()} סיעודית · {ORG_LEGAL_NAME} · שירותי אחות פרטית בישראל. כל הזכויות שמורות.
            </span>
            <p className="text-[12.5px] leading-relaxed text-slate-500">
              רישיון לשכה פרטית (השמה) ממשרד העבודה · מס׳ {ORG_PLACEMENT_LICENSE_NO}.{" "}
              <a
                href={ORG_PLACEMENT_LICENSE_URL}
                className="font-semibold text-cyan-300/90 underline-offset-4 hover:text-white hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                לצפייה ברישיון באתר משרד העבודה
              </a>
              .
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span>זמינים עכשיו</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterContact({ icon: Icon, title, children }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-white">
        <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">{title}</div>
        <div className="mt-0.5 text-[14px] font-medium text-slate-200">{children}</div>
      </div>
    </div>
  );
}
