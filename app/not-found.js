import Link from "next/link";
import SiteHeader from "./_components/SiteHeader";
import SiteFooter from "./_components/SiteFooter";

export const metadata = {
  title: "העמוד לא נמצא | סיעוד פרימיום",
  description: "הכתובת שביקשתם אינה קיימת או הועברה.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-sm font-bold text-[#1f6bff]">404</p>
        <h1 className="mt-2 text-2xl font-black text-[#0a1f44]">העמוד לא נמצא</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
          ייתכן שהקישור פג תוקף או שהעמוד הוסר. אפשר לחזור לעמוד הבית או לבחור מסלול מהתפריט.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex justify-center rounded-2xl bg-[#0a1f44] px-6 py-3.5 text-[15px] font-extrabold text-white transition hover:bg-[#142a52]"
          >
            עמוד הבית
          </Link>
          <Link
            href="/cities"
            className="inline-flex justify-center rounded-2xl border-2 border-[#0a1f44] px-6 py-3.5 text-[15px] font-extrabold text-[#0a1f44] transition hover:bg-slate-50"
          >
            ערים ופריסה
          </Link>
          <Link
            href="/services"
            className="inline-flex justify-center rounded-2xl border border-slate-200 px-6 py-3.5 text-[15px] font-bold text-slate-700 transition hover:bg-slate-50"
          >
            שירותים
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
