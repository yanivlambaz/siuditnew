import { ShieldCheck, Stethoscope, FileCheck2, AlertCircle } from "lucide-react";
import Container from "./ui/Container";

const LINES = [
  {
    icon: ShieldCheck,
    title: "רישוי משרד הבריאות",
    text: "שיבוץ לאחיות בעלות רישיון תקף וניסיון קליני שנבדק בהתאם לסוג הפנייה.",
  },
  {
    icon: Stethoscope,
    title: "בהוראה רפואית בלבד",
    text: "אין החלפת רופא או מתן אבחנות; הפעולות במסגרת ההנחיה והפרוטוקול שנקבעו לכם.",
  },
  {
    icon: FileCheck2,
    title: "שקיפות ותיעוד",
    text: "כשצריך — תיעוד תצפית והנגשת מידע למשפחה ולגורם המטפל, כדי לשמור קו אחיד.",
  },
  {
    icon: AlertCircle,
    title: "חירום רפואי",
    text: "בחולשה פתאומית, כאב חד, קושי נשימתי או חשש לתרופה — פנו לחירום / צוות המחלקה.",
  },
];

export default function MedicalTrustBlock({ className = "" }) {
  return (
    <section className={["border-y border-slate-200/75 bg-white py-14 sm:py-16", className].filter(Boolean).join(" ")}>
      <Container size="wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#1851d8]">E-E-A-T רפואי</p>
          <h2 className="mt-3 text-balance text-[26px] font-extrabold tracking-tight text-[#0a1f44] sm:text-[32px]">
            סמכות מקצועית — בלי לטשטש גבולות
          </h2>
          <p className="mt-4 text-pretty text-[16px] leading-[1.72] text-slate-600">
            סיעוד פרימיום פועל בפריסה ארצית בישראל ומתמקד בליווי סיעודי־קליני למשפחות: בבית, בבית חולים ולאורך שחרור.
            התאמה אישית, ניסיון צוות, ודיסקרטיות — תוך שמירה על כללי מקצוע הסיעוד ודין רישוי האחות.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LINES.map((row) => {
            const Icon = row.icon;
            return (
            <li
              key={row.title}
              className="rounded-2xl border border-slate-200/80 bg-[#f7f9fc] p-5 text-start shadow-sm"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#1f6bff] ring-1 ring-slate-200/80">
                <Icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <h3 className="mt-4 text-[15px] font-extrabold text-[#0a1f44]">{row.title}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.65] text-slate-600">{row.text}</p>
            </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
