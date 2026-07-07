import LegalPageLayout, {
  LegalSection,
  LegalP,
  LegalList,
} from "../_components/legal/LegalPageLayout";
import { absoluteUrl, canonicalPath } from "../lib/seo";
import { ORG_EMAIL, ORG_LEGAL_NAME } from "../lib/orgInfo";
import { orgPhoneDisplayIl } from "../lib/orgPhone";

const LAST_UPDATED = "יולי 2026";

export const metadata = {
  title: "הצהרת נגישות | Siudit",
  description:
    "הצהרת הנגישות של אתר Siudit ומידע על נגישות האתר ודרכי יצירת קשר בנושא נגישות.",
  alternates: canonicalPath("/accessibility"),
  robots: { index: true, follow: true },
  openGraph: {
    url: absoluteUrl("/accessibility"),
    locale: "he_IL",
    title: "הצהרת נגישות | Siudit",
    description:
      "הצהרת הנגישות של אתר Siudit ומידע על נגישות האתר ודרכי יצירת קשר בנושא נגישות.",
  },
};

export default function AccessibilityPage() {
  const phone = orgPhoneDisplayIl();

  return (
    <LegalPageLayout title="הצהרת נגישות" lastUpdated={LAST_UPDATED} current="/accessibility">
      <LegalSection id="commitment" title="המחויבות שלנו לנגישות">
        <LegalP className="text-[16px] font-medium text-[#0a1f44]">
          אנו ב-Siudit רואים חשיבות רבה בכך שהאתר יהיה נגיש ושמיש עבור כלל המשתמשים, לרבות אנשים עם
          מוגבלות, ופועלים לשיפור מתמשך של נגישות האתר וחוויית השימוש בו.
        </LegalP>
      </LegalSection>

      <LegalSection id="measures" title="אמצעי הנגישות באתר">
        <LegalP>במסגרת פיתוח האתר יושמו, בין היתר, המאפיינים הבאים:</LegalP>
        <LegalList
          items={[
            "עיצוב רספונסיבי המותאם למגוון מסכים ומכשירים",
            "מבנה HTML סמנטי ושימוש בתגיות ותפקידים (ARIA) היכן שנדרש",
            "אפשרות ניווט באמצעות מקלדת ורכיבי ממשק נגישים",
            "סימון פוקוס נראה לרכיבים אינטראקטיביים",
            "טקסט חלופי לתמונות בעלות משמעות, וסימון תמונות דקורטיביות כמוסתרות מקוראי מסך",
            "טיפוגרפיה קריאה וניגודי צבע שנועדו לתמוך בקריאוּת",
            "התאמת אנימציות למשתמשים שהגדירו העדפת תנועה מופחתת (prefers-reduced-motion)",
            "תמיכה בכיווניות עברית (RTL)",
          ]}
        />
      </LegalSection>

      <LegalSection id="status" title="מצב הנגישות והסתייגויות">
        <LegalP>
          אנו שואפים להתאים את האתר לעקרונות הנגישות המקובלים ולשפרו באופן שוטף. יחד עם זאת, נכון למועד
          פרסום הצהרה זו האתר טרם עבר בדיקת נגישות פורמלית או הסמכה, וייתכן שקיימים חלקים או רכיבים
          שאינם נגישים במלואם. אנו פועלים לאיתור ולתיקון של ליקויים אלה ככל שיתגלו.
        </LegalP>
      </LegalSection>

      <LegalSection id="feedback" title="פנייה בנושא נגישות">
        <LegalP>
          אם נתקלת בקושי בנגישות האתר, או אם ברצונך להעיר בנושא, נשמח לקבל את פנייתך ולטפל בה בהקדם.
          ניתן לפנות אלינו בערוצים הבאים:
        </LegalP>
        <LegalList
          items={[`טלפון: ${phone}`, `דוא״ל: ${ORG_EMAIL}`]}
        />
        <LegalP>בפנייתך נודה אם תתאר את הבעיה, העמוד שבו נתקלת בה וסוג המכשיר והדפדפן שבהם השתמשת.</LegalP>
      </LegalSection>

      <LegalSection id="details" title="פרטי ההצהרה">
        <LegalList
          items={[`הגורם המפעיל: ${ORG_LEGAL_NAME}`, `מועד עדכון אחרון: ${LAST_UPDATED}`]}
        />
      </LegalSection>
    </LegalPageLayout>
  );
}
