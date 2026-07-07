import SiteHeader from "./_components/SiteHeader";
import SiteFooter from "./_components/SiteFooter";
import WhatsAppFab from "./_components/WhatsAppFab";
import ScrollProgress from "./_components/ScrollProgress";
import MobileStickyCTA from "./_components/MobileStickyCTA";
import DeferredClientEngagement from "./_components/DeferredClientEngagement";
import Hero from "./_components/sections/Hero";
import TrustStrip from "./_components/sections/TrustStrip";
import NurseMatchingFlow from "./_components/matching/NurseMatchingFlow";
import Reimbursement from "./_components/sections/Reimbursement";
import ServicesBento from "./_components/sections/ServicesBento";
import HomeVsHospital from "./_components/sections/HomeVsHospital";
import CareScene from "./_components/sections/CareScene";
import ProcessTimeline from "./_components/sections/ProcessTimeline";
import WhyUs from "./_components/sections/WhyUs";
import Testimonials from "./_components/sections/Testimonials";
import ContactSection from "./_components/sections/ContactSection";
import FinalCTA from "./_components/sections/FinalCTA";
import Faq from "./_components/sections/Faq";
import MedicalTrustBlock from "./_components/MedicalTrustBlock";
import LicensingTrustSection from "./_components/LicensingTrustSection";
import TopicPillarSection from "./_components/TopicPillarSection";
import { getFaqJsonLd } from "./_components/sections/faqData";
import { absoluteUrl, canonicalPath } from "./lib/seo";
import { publicWhatsappHref } from "./lib/contactUrls";
import { orgTelHref } from "./lib/orgPhone";
import { serializeJsonLd } from "./lib/serializeJsonLd";

export const metadata = {
  title: "סיעודית · שירות אחיות 24/7 | אחות פרטית לבית ולבית חולים",
  description:
    "אחיות מוסמכות משרד הבריאות לליווי בבית ובבית חולים: ניטור, ניהול תרופות לפי הוראה, המשכיות אחרי שחרור ושקט למשפחה. מענה מהיר ופריסה ארצית.",
  alternates: canonicalPath("/"),
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: absoluteUrl("/"),
    title: "סיעודית · שירות אחיות 24/7",
    description:
      "ליווי קליני מקצועי בבית ובבית חולים, דפי עיר ומדריכים — עם דגש על רישוי, ניסיון ותיאום מהיר.",
  },
  robots: { index: true, follow: true },
};

export default function HomePage() {
  const whatsappHref = publicWhatsappHref();
  const faqJsonLd = getFaqJsonLd();

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />

      <ScrollProgress />
      <SiteHeader />

      <main id="top">
        {/* Conversion-first hierarchy */}
        <Hero whatsappHref={whatsappHref} telHref={orgTelHref()} />
        <TrustStrip />
        <NurseMatchingFlow />
        <ServicesBento />
        <ProcessTimeline />
        <WhyUs />
        <HomeVsHospital />
        <CareScene
          imageSrc="/images/siudit-bedside-nurse-care.png"
          imageAlt="אחות מוסמכת מלווה קשיש מרותק למיטה בבית — קרבה אנושית ותיעוד רפואי"
        />
        <Testimonials />
        <Reimbursement />
        <ContactSection />
        <Faq />
        <FinalCTA />

        {/* SEO content layer — kept below the primary conversion experience */}
        <MedicalTrustBlock />
        <LicensingTrustSection compact />
        <TopicPillarSection />
      </main>

      <SiteFooter />

      <WhatsAppFab href={whatsappHref} />
      <DeferredClientEngagement whatsappHref={whatsappHref} siteMode="home" />
      <MobileStickyCTA whatsappHref={whatsappHref} availabilityHref="#matching" />
    </div>
  );
}
