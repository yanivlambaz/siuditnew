import Link from "next/link";
import LegalPageLayout, {
  LegalSection,
  LegalP,
  LegalList,
} from "../_components/legal/LegalPageLayout";
import { absoluteUrl, canonicalPath } from "../lib/seo";
import {
  ORG_LEGAL_NAME,
  ORG_EMAIL,
  ORG_ADDRESS_DISPLAY,
  ORG_PLACEMENT_LICENSE_NO,
} from "../lib/orgInfo";
import { orgPhoneDisplayIl } from "../lib/orgPhone";

const LAST_UPDATED = "יולי 2026";

export const metadata = {
  title: "תנאי שימוש | Siudit",
  description: "תנאי השימוש באתר Siudit ובשירותים המוצעים באמצעותו.",
  alternates: canonicalPath("/terms"),
  robots: { index: true, follow: true },
  openGraph: {
    url: absoluteUrl("/terms"),
    locale: "he_IL",
    title: "תנאי שימוש | Siudit",
    description: "תנאי השימוש באתר Siudit ובשירותים המוצעים באמצעותו.",
  },
};

export default function TermsPage() {
  const phone = orgPhoneDisplayIl();

  return (
    <LegalPageLayout title="תנאי שימוש" lastUpdated={LAST_UPDATED} current="/terms">
      <LegalSection id="intro" title="כללי">
        <LegalP className="text-[16px] font-medium text-[#0a1f44]">
          תנאי שימוש אלה מסדירים את השימוש באתר Siudit ובשירותים המוצעים באמצעותו. השימוש באתר מהווה
          הסכמה לתנאים אלה. אם אינך מסכים להם, אנא הימנע משימוש באתר.
        </LegalP>
        <LegalP>התנאים מנוסחים בלשון זכר מטעמי נוחות בלבד ומתייחסים לכל המגדרים כאחד.</LegalP>
      </LegalSection>

      <LegalSection id="purpose" title="מהות האתר והשירות">
        <LegalP>
          האתר משמש להצגת מידע אודות שירותי סיעוד וליווי אישי, ומאפשר יצירת קשר והשארת פנייה לצורך
          תיאום והתאמה של אחים, אחיות ומטפלים פרטיים לבית ולבית חולים. הגורם המפעיל, {ORG_LEGAL_NAME},
          פועל כלשכה פרטית (השמה) ומחזיק ברישיון ממשרד העבודה (מס׳ רישיון {ORG_PLACEMENT_LICENSE_NO}).
        </LegalP>
        <LegalP>
          האתר אינו מהווה נותן שירות רפואי ישיר ואינו מספק אבחון או טיפול רפואי. השירות נועד לתאם
          ולחבר בין פונים לבין אנשי מקצוע בתחום הסיעוד והטיפול.
        </LegalP>
      </LegalSection>

      <LegalSection id="use" title="שימוש באתר">
        <LegalP>בעת השימוש באתר הנך מתחייב:</LegalP>
        <LegalList
          items={[
            "לעשות שימוש באתר בהתאם לדין ולתנאים אלה",
            "למסור מידע נכון, מדויק ועדכני",
            "להימנע משימוש לרעה באתר או בשירותים",
            "להימנע מניסיונות גישה בלתי מורשית למערכות האתר",
            "להימנע מכל פעילות זדונית העלולה לפגוע באתר, במשתמשיו או בצדדים שלישיים",
          ]}
        />
      </LegalSection>

      <LegalSection id="requests" title="השארת פנייה ובקשת שירות">
        <LegalP>
          השארת פנייה באתר אינה מהווה התחייבות למתן שירות מיידי או לזמינות מיידית של איש מקצוע. לצורך
          מתן מענה מתאים ייתכן שנידרש לפרטים נוספים.
        </LegalP>
        <LegalP>
          זמינות השירות, היקפו ומועדיו עשויים להשתנות בהתאם למיקום, לעיתוי, לזמינות אנשי המקצוע ולאופי
          השירות המבוקש.
        </LegalP>
      </LegalSection>

      <LegalSection id="medical" title="מידע כללי ואינו תחליף לייעוץ מקצועי">
        <LegalP>
          התכנים באתר הם מידע כללי בלבד ואינם מהווים ייעוץ רפואי, סיעודי, משפטי או מקצועי אחר, ואינם
          מחליפים התייעצות פרטנית עם איש מקצוע מוסמך בהתאם לנסיבות המקרה. אין להסתמך על התכנים באתר
          לצורך קבלת החלטות רפואיות. שירותי הסיעוד עצמם ניתנים על ידי אנשי מקצוע בהתאם להוראות
          ולהכשרתם.
        </LegalP>
      </LegalSection>

      <LegalSection id="third-parties" title="קישורים ושירותי צד שלישי">
        <LegalP>
          האתר עשוי לכלול קישורים לאתרים ולשירותים של צדדים שלישיים (כגון WhatsApp וכלי Google). איננו
          אחראים לתוכן, לזמינות או למדיניות הפרטיות של שירותים אלה, והשימוש בהם כפוף לתנאיהם.
        </LegalP>
      </LegalSection>

      <LegalSection id="ip" title="קניין רוחני">
        <LegalP>
          כל הזכויות בתכני האתר — לרבות טקסטים, עיצוב, מיתוג, לוגו, גרפיקה, תמונות, תוכנה וקוד מקור
          וכל חומר קנייני אחר — שמורות לגורם המפעיל או למי מטעמו. אין להעתיק, לשכפל, להפיץ, לפרסם או
          לעשות שימוש מסחרי בתכנים ללא הסכמה מראש ובכתב.
        </LegalP>
      </LegalSection>

      <LegalSection id="liability" title="הגבלת אחריות">
        <LegalP>
          האתר והתכנים בו ניתנים כמות שהם (AS IS). במידה המרבית המותרת על פי דין, לא נישא באחריות לכל
          נזק ישיר או עקיף הנובע מהשימוש באתר, מהסתמכות על תכניו או מאי-זמינותו. אין באמור כדי לגרוע
          מזכויות שאינן ניתנות להתניה על פי דין.
        </LegalP>
      </LegalSection>

      <LegalSection id="privacy" title="פרטיות">
        <LegalP>
          השימוש באתר ומסירת מידע כפופים גם ל
          <Link
            href="/privacy-policy"
            className="font-bold text-[#1851d8] underline underline-offset-2 hover:text-[#1f6bff]"
          >
            מדיניות הפרטיות
          </Link>{" "}
          שלנו.
        </LegalP>
      </LegalSection>

      <LegalSection id="law" title="דין וסמכות שיפוט">
        <LegalP>
          על תנאים אלה ועל השימוש באתר יחולו דיני מדינת ישראל בלבד. סמכות השיפוט הבלעדית בכל עניין
          הנוגע לתנאים ולאתר תהא נתונה לבתי המשפט המוסמכים במחוז תל אביב.
        </LegalP>
      </LegalSection>

      <LegalSection id="changes" title="שינויים בתנאים">
        <LegalP>
          אנו רשאים לעדכן תנאים אלה מעת לעת. תוקף השינוי יחול ממועד פרסומו באתר, ומועד העדכון האחרון
          מופיע בראש עמוד זה.
        </LegalP>
      </LegalSection>

      <LegalSection id="contact" title="יצירת קשר">
        <LegalP>בכל שאלה בנוגע לתנאי השימוש ניתן לפנות אלינו:</LegalP>
        <LegalList
          items={[
            `טלפון: ${phone}`,
            `דוא״ל: ${ORG_EMAIL}`,
            `כתובת: ${ORG_ADDRESS_DISPLAY}`,
          ]}
        />
      </LegalSection>
    </LegalPageLayout>
  );
}
