import Link from "next/link";
import SiteHeader from "../_components/SiteHeader";
import SiteFooter from "../_components/SiteFooter";
import WhatsAppFab from "../_components/WhatsAppFab";
import MobileStickyCTA from "../_components/MobileStickyCTA";
import DeferredClientEngagement from "../_components/DeferredClientEngagement";
import Container from "../_components/ui/Container";
import { absoluteUrl, canonicalPath } from "../lib/seo";
import { publicWhatsappHref } from "../lib/contactUrls";
import { orgTelHref } from "../lib/orgPhone";

/** נשמר ללא שינוי לעומת הדף הקודם — SEO זהה */
export const metadata = {
  title: "מדיניות פרטיות · תקנון עוגיות | סיעוד פרימיום",
  description:
    "מדיניות הפרטיות של סיעוד פרימיום: איסוף מידע, עוגיות ומעקב, שיתוף עם צדדים שלישיים, זכויות נושאי מידע ופרטי התקשרות.",
  alternates: canonicalPath("/privacy-policy"),
  robots: { index: true, follow: true },
  openGraph: {
    url: absoluteUrl("/privacy-policy"),
    locale: "he_IL",
    title: "מדיניות פרטיות | סיעוד פרימיום",
    description: "תקנון פרטיות ושימוש ב-Cookies — סיעוד פרימיום",
  },
};

export default function PrivacyPolicyPage() {
  const whatsappHref = publicWhatsappHref();

  const listMuted = "ms-5 list-disc space-y-2 marker:text-[#1851d8]";

  return (
    <div className="relative min-h-screen overflow-x-clip bg-white">
      <SiteHeader />

      <main id="top" className="pb-20 pt-8 sm:pb-28 sm:pt-12">
        <Container size="wide">
          <article className="mx-auto max-w-2xl rounded-2xl bg-white px-4 py-2 sm:px-6">
            <header className="mb-10 text-center sm:mb-12">
              <h1 className="text-balance text-[2rem] font-extrabold leading-tight tracking-tight text-[#0a1f44] sm:text-[2.5rem]">
                מדיניות פרטיות
              </h1>
              <p className="mt-4 text-[17px] font-semibold leading-relaxed text-slate-700 sm:text-lg">
                סיעוד פרימיום | siudit.co.il
              </p>
              <div className="mt-8 sm:mt-10">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-[14px] font-bold text-[#0a1f44] shadow-sm transition hover:border-slate-300 hover:bg-white"
                >
                  חזרה לעמוד הבית
                </Link>
              </div>
            </header>

            <div className="space-y-10 text-[15px] leading-[1.85] text-slate-700 sm:text-[15.5px] sm:leading-[1.8]">
              <section aria-labelledby="s-kelali">
                <h2 id="s-kelali" className="mb-4 text-xl font-extrabold text-[#0a1f44] sm:text-2xl">
                  כללי
                </h2>
                <p>
                  מדיניות פרטיות זו תחול בכל מקרה בו תגלוש ו/או תשאיר פרטים באמצעות אחד הדפים שלנו, לרבות דף זה או כל דף אחר באתר שלנו, וכן בכל מקרה בו תשאיר לנו פרטים אודותיך בכל אחד מאמצעי ההתקשרות איתנו, לרבות דוא&quot;ל, טלפון, וואטסאפ וכדומה.
                </p>
                <p className="mt-4">
                  האמור במדיניות פרטיות זו כתוב בלשון זכר מטעמי נוחות בלבד אך מתייחס לשני המינים.
                </p>
                <p className="mt-4">מדיניות פרטיות זו מפרטת איזה מידע נאסף אודותיך בכל אחת מדרכי ההתקשרות שלך איתנו.</p>
                <p className="mt-4">
                  אנא קרא את מדיניות הפרטיות בעיון. גלישתך באתר וביצוע פעולות בו מהווה הסכמה לאמור במדיניות פרטיות זו.
                </p>
                <p className="mt-4">המידע אותו אנו אוספים אודותיך כפוף למדיניות פרטיות זו ולדיני מדינת ישראל.</p>
              </section>

              <section aria-labelledby="s-consent">
                <h2 id="s-consent" className="mb-4 text-xl font-extrabold text-[#0a1f44] sm:text-2xl">
                  הסכמתך לאיסוף המידע
                </h2>
                <p>
                  המידע אשר יימסר לנו על ידך הינו מידע הנמסר מרצונך ובהסכמתך המלאה וידוע לך כי לא חלה עליך כל חובה חוקית למסור את המידע.
                </p>
                <p className="mt-4">אם אינך מסכים למדיניות פרטיות זו, אתה מתבקש שלא לעשות שימוש באתר.</p>
              </section>

              <section aria-labelledby="s-types">
                <h2 id="s-types" className="mb-4 text-xl font-extrabold text-[#0a1f44] sm:text-2xl">
                  סוגי מידע שנאסף
                </h2>
                <p className="font-semibold text-[#0a1f44]">מידע שנמסר על ידך:</p>
                <ul className={`${listMuted} mt-4`}>
                  <li>שם מלא</li>
                  <li>טלפון</li>
                  <li>כתובת דוא&quot;ל</li>
                  <li>עיר מגורים</li>
                  <li>פרטים שנמסרו בטפסי יצירת קשר או פניות</li>
                  <li>העדפות תוכן ושיווק</li>
                </ul>
                <p className="mt-6 font-semibold text-[#0a1f44]">מידע הנאסף באופן אוטומטי:</p>
                <ul className={`${listMuted} mt-4`}>
                  <li>כתובת IP</li>
                  <li>סוג דפדפן ומערכת הפעלה</li>
                  <li>עמודים שנצפו ומשך גלישה</li>
                  <li>הקלקות ומקורות תנועה</li>
                  <li>מידע אנליטי וכלי מדידה כגון Google Analytics ו-Google Tag Manager</li>
                  <li>מידע טכני לצורך אבטחה ושיפור השירות</li>
                </ul>
              </section>

              <section aria-labelledby="s-uses">
                <h2 id="s-uses" className="mb-4 text-xl font-extrabold text-[#0a1f44] sm:text-2xl">
                  השימושים אשר יעשו עם המידע שלך
                </h2>
                <p className="mb-4">אנו עשויים להשתמש במידע לצורך:</p>
                <ul className={listMuted}>
                  <li>יצירת קשר ומתן מענה לפניותיך</li>
                  <li>תיאום שירותי סיעוד, אחים ואחיות פרטיים</li>
                  <li>מתן שירות ותמיכה</li>
                  <li>שליחת מידע תפעולי</li>
                  <li>שיפור חוויית המשתמש באתר</li>
                  <li>ניתוח שימושים באתר</li>
                  <li>שליחת עדכונים ותכנים מקצועיים</li>
                  <li>עמידה בדרישות הדין</li>
                  <li>אבטחת האתר והשירותים</li>
                </ul>
              </section>

              <section aria-labelledby="s-third">
                <h2 id="s-third" className="mb-4 text-xl font-extrabold text-[#0a1f44] sm:text-2xl">
                  שיתוף מידע עם צדדים שלישיים
                </h2>
                <p className="mb-4">
                  המידע עשוי להיות מועבר לספקי שירות טכנולוגיים ותפעוליים לצורך תפעול האתר והשירותים, לרבות:
                </p>
                <ul className={listMuted}>
                  <li>שירותי אחסון ושרתים</li>
                  <li>מערכות CRM</li>
                  <li>שירותי דיוור</li>
                  <li>שירותי פרסום ומדידה כגון Google ו-Meta</li>
                </ul>
                <p className="mt-4">כל צד שלישי מחויב לשמירה על סודיות ואבטחת מידע בהתאם לדין.</p>
              </section>

              <section aria-labelledby="s-cookies">
                <h2 id="s-cookies" className="mb-4 text-xl font-extrabold text-[#0a1f44] sm:text-2xl">
                  שימוש בקובצי Cookie
                </h2>
                <p className="mb-4">האתר עושה שימוש בקובצי Cookies ובטכנולוגיות דומות לצורך:</p>
                <ul className={listMuted}>
                  <li>ניתוח תעבורה באתר</li>
                  <li>התאמת חוויית משתמש</li>
                  <li>מדידה ופרסום</li>
                  <li>שמירת העדפות משתמש</li>
                </ul>
                <p className="mt-4">
                  באפשרותך לשנות את הגדרות הדפדפן ולחסום שימוש ב-Cookies, אולם ייתכן שחלק מהשירותים באתר לא יפעלו באופן מלא.
                </p>
              </section>

              <section aria-labelledby="s-security">
                <h2 id="s-security" className="mb-4 text-xl font-extrabold text-[#0a1f44] sm:text-2xl">
                  שמירת מידע ואבטחתו
                </h2>
                <p className="mb-4">החברה נוקטת באמצעי אבטחה מקובלים לצורך שמירה על המידע האישי, לרבות:</p>
                <ul className={listMuted}>
                  <li>בקרת הרשאות</li>
                  <li>הגבלת גישה למידע</li>
                  <li>אמצעי אבטחה טכנולוגיים</li>
                  <li>ניטור ותיעוד גישה</li>
                </ul>
                <p className="mt-4">עם זאת, אין באפשרותנו להבטיח הגנה מוחלטת מפני חדירות או גישה בלתי מורשית.</p>
              </section>

              <section aria-labelledby="s-rights">
                <h2 id="s-rights" className="mb-4 text-xl font-extrabold text-[#0a1f44] sm:text-2xl">
                  זכויותיך לפי החוק
                </h2>
                <p className="mb-4">הנך זכאי:</p>
                <ul className={listMuted}>
                  <li>לעיין במידע אודותיך</li>
                  <li>לבקש תיקון מידע</li>
                  <li>לבקש מחיקת מידע בכפוף לדין</li>
                  <li>להתנגד לשימוש במידע לצרכי שיווק</li>
                </ul>
                <p className="mt-4">
                  לצורך מימוש זכויותיך ניתן לפנות אלינו בפרטי ההתקשרות המופיעים מטה.
                </p>
              </section>

              <section aria-labelledby="s-contact-us">
                <h2 id="s-contact-us" className="mb-4 text-xl font-extrabold text-[#0a1f44] sm:text-2xl">
                  יצירת קשר
                </h2>
                <p className="mb-4">בכל שאלה או בקשה בנושא פרטיות ניתן לפנות אלינו:</p>
                <p>טלפון: 073-850-0503</p>
                <p className="mt-2">דוא&quot;ל: info@siudit.co.il</p>
                <p className="mt-2">כתובת: מצדה 9, בני ברק</p>
              </section>

              <section aria-labelledby="s-validity">
                <h2 id="s-validity" className="mb-4 text-xl font-extrabold text-[#0a1f44] sm:text-2xl">
                  תוקף מדיניות הפרטיות
                </h2>
                <p>
                  מדיניות פרטיות זו תקפה ממועד פרסומה באתר. אנו רשאים לעדכן את המדיניות מעת לעת בהתאם לצורך ולדרישות הדין.
                </p>
              </section>

              <section aria-labelledby="s-notice">
                <h2 id="s-notice" className="mb-4 text-xl font-extrabold text-[#0a1f44] sm:text-2xl">
                  שימו לב
                </h2>
                <p>החברה פועלת כחוק ובעלת רישיון השמה ממשרד העבודה.</p>
                <p className="mt-4">
                  האתר והשירותים מיועדים לנשים וגברים כאחד, וכל שימוש בלשון זכר או נקבה נעשה מטעמי נוחות בלבד.
                </p>
              </section>
            </div>
          </article>
        </Container>
      </main>

      <SiteFooter />
      <WhatsAppFab href={whatsappHref} telHref={orgTelHref()} />
      <DeferredClientEngagement whatsappHref={whatsappHref} siteMode="standard" />
      <MobileStickyCTA whatsappHref={whatsappHref} />
    </div>
  );
}
