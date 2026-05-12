import Link from "next/link";
import { FileCheck2, Building2, Shield, HeartHandshake, Scale, Landmark } from "lucide-react";
import Container from "./ui/Container";
import {
  ORG_ADDRESS_DISPLAY,
  ORG_LEGAL_NAME,
  ORG_PLACEMENT_LICENSE_NO,
  ORG_PLACEMENT_LICENSE_URL,
} from "../lib/orgInfo";

/**
 * Reusable E-E-A-T / licensing strip — calmer, institutional tone.
 * @param {{ compact?: boolean }} props
 */
export default function LicensingTrustSection({ compact = false }) {
  return (
    <section
      className={[
        "border-y border-slate-200/80 bg-gradient-to-b from-[#f8fafc] to-white",
        compact ? "py-10 sm:py-12" : "py-14 sm:py-16",
      ].join(" ")}
    >
      <Container size="wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1851d8]/90">רישוי · שקיפות · גבולות מקצועיים</p>
          <h2 className="mt-3 text-balance text-[22px] font-extrabold tracking-tight text-[#0a1f44] sm:text-[28px]">
            סמכות קלינית — בלי סלוגנים חלולים
          </h2>
          <p className="mt-4 text-pretty text-[15px] leading-[1.75] text-slate-600">
            השיבוץ נעשה לאחר בדיקת רישיון אחות בתוקף מול משרד הבריאות, התאמת ניסיון למצב הטיפולי, ותיעוד מה נכלל במסגרת ההוראה הרפואית.
            אנחנו לא מחליפים רופאים, לא מבטיחים תוצאות רפואיות, ולא מצמצמים את המציאות לשורת מכירה אחת.
          </p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BLOCKS.map((b) => (
            <li
              key={b.title}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-start shadow-sm ring-1 ring-slate-100"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eff6ff] text-[#1f6bff] ring-1 ring-blue-100/80">
                <b.icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <div>
                <h3 className="text-[15px] font-extrabold text-[#0a1f44]">{b.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">{b.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f0fdf4] text-emerald-700 ring-1 ring-emerald-100">
              <Landmark className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <div className="min-w-0 text-start">
              <h3 className="text-[15px] font-extrabold text-[#0a1f44]">רישיון השמה — משרד העבודה</h3>
              <p className="mt-2 text-[14px] leading-[1.75] text-slate-600">
                <strong className="font-semibold text-[#0a1f44]">{ORG_LEGAL_NAME}</strong> הינה חברה מפוקחת ובעלת{" "}
                <strong className="font-semibold text-[#0a1f44]">רישיון לשכה פרטית (השמה)</strong> ממשרד העבודה,{" "}
                <strong className="font-semibold text-[#0a1f44]">מס׳ {ORG_PLACEMENT_LICENSE_NO}</strong>.
              </p>
              <p className="mt-2 text-[13.5px]">
                <a
                  href={ORG_PLACEMENT_LICENSE_URL}
                  className="font-bold text-[#1f6bff] underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  לצפייה ברישיון במאגר הלשכות הפרטיות — אתר משרד העבודה
                </a>
              </p>
              <p className="mt-3 text-[13px] text-slate-500">
                כתובת רשומה: <span className="font-medium text-slate-700">{ORG_ADDRESS_DISPLAY}</span>
              </p>
            </div>
          </div>
        </div>

        {!compact ? (
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-slate-200/80 pt-8 text-[13px] font-semibold text-slate-600">
            <Link href="/team" className="text-[#1f6bff] underline-offset-4 hover:underline">
              איך בנוי הצוות המקצועי ←
            </Link>
            <span className="hidden text-slate-300 sm:inline">|</span>
            <Link href="/about" className="text-[#1f6bff] underline-offset-4 hover:underline">
              מי אנחנו ולמה זה משנה ←
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

const BLOCKS = [
  {
    icon: FileCheck2,
    title: "אימות רישוי",
    body: "רישיון אחות בתוקף ורלוונטיות ניסיון לסוג הפנייה — לפני כל שיבוץ לטיפול בבית או בבית חולים.",
  },
  {
    icon: Scale,
    title: "טיפול לפי הוראה",
    body: "ההיקף נקבע לפי הנחיות רפואיות ופרוטוקול; השקיפות כלפי המשפחה והגורם המטפל היא חלק מהמודל.",
  },
  {
    icon: Building2,
    title: "פריסה ארצית מבוקרת",
    body: "תיאום לוגיסטי בין בתי חולים אזוריים לבין הבית — עם רצף טיפולי, במיוחד אחרי שחרור.",
  },
  {
    icon: Shield,
    title: "פרטיות ודיסקרטיות",
    body: "מידע רפואי ומשפחתי מנוהל ברגישות; המטרה היא להקל על העומס — לא לחשוף אותו.",
  },
  {
    icon: HeartHandshake,
    title: "שפה אנושית",
    body: "מענה שמסביר מה צפוי בלילה הראשון, מה שואלים ברופא, ומתי לפנות לחירום — בלי להפחיד ובלי למזער.",
  },
];
