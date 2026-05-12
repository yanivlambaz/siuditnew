"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";

const CitiesInteractiveMap = dynamic(() => import("./CitiesInteractiveMap"), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto flex min-h-[280px] w-full max-w-[min(100%,380px)] items-center justify-center rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-50/90 to-white md:max-w-[400px]"
      aria-hidden
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <div className="h-10 w-10 rounded-full bg-slate-200/80 motion-safe:animate-pulse" />
        <p className="text-[12.5px] font-semibold text-slate-500">טוען מפה…</p>
      </div>
    </div>
  ),
});

function normalizeSearch(s) {
  return String(s || "")
    .trim()
    .toLowerCase();
}

export default function CitiesDirectoryClient({ cities }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("הכל");

  const regions = useMemo(() => {
    const s = new Set(cities.map((c) => c.region).filter(Boolean));
    return ["הכל", ...Array.from(s).sort((a, b) => a.localeCompare(b, "he"))];
  }, [cities]);

  const filtered = useMemo(() => {
    const q = normalizeSearch(query);
    return cities.filter((c) => {
      if (region !== "הכל" && c.region !== region) return false;
      if (!q) return true;
      const blob = [c.name, c.region, ...(c.hospitals || [])].join(" ").toLowerCase();
      return blob.includes(q);
    });
  }, [cities, query, region]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => a.name.localeCompare(b.name, "he")),
    [filtered],
  );

  return (
    <section id="cities-explorer" className="scroll-mt-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-start">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-[#f8fbff] via-white to-[#eff6ff] p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
            <h2 className="text-xl font-extrabold text-[#0a1f44] sm:text-2xl">מפת כיסוי אינטראקטיבית</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600">
              לחצו על נקודה במפה או הרחיבו חיפוש לפי אזור ושם בית חולים. המפה להמחשה גיאוגרפית — כל נקודה מובילה לדף עיר
              מלא עם מדריך מקומי, שאלות נפוצות וטופס יצירת קשר.
            </p>
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3 sm:p-4">
              <CitiesInteractiveMap cities={cities} regionFilter={region} filteredSorted={sorted} />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">חיפוש עיר, אזור או בית חולים</span>
              <Search
                className="pointer-events-none absolute end-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                type="search"
                dir="rtl"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="חיפוש לפי עיר, אזור או בית חולים…"
                className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pe-11 ps-4 text-[15px] font-medium text-[#0a1f44] shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#1f6bff]/50 focus:ring-4 focus:ring-[#1f6bff]/12"
              />
            </label>
            <p className="shrink-0 text-[13px] font-semibold text-slate-500 tabular-nums">
              {sorted.length} תוצאות
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {regions.map((r) => {
              const on = region === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRegion(r)}
                  className={[
                    "rounded-full px-3.5 py-1.5 text-[13px] font-bold transition",
                    on
                      ? "bg-[#0a1f44] text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-[#1f6bff]/35",
                  ].join(" ")}
                >
                  {r}
                </button>
              );
            })}
          </div>

          <ul className="grid gap-4 sm:grid-cols-2" role="list">
            {sorted.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/cities/${c.slug}`}
                  className="flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1f6bff]/35 hover:shadow-md"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eff6ff] text-[#1f6bff]">
                    <MapPin className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[17px] font-extrabold text-[#0a1f44]">אחות פרטית ב{c.name}</span>
                    <span className="mt-1 block text-[13px] text-slate-500">{c.region}</span>
                    {c.hospitals?.length ? (
                      <span className="mt-2 block text-[12.5px] leading-snug text-slate-600">
                        בתי חולים מרכזיים: {c.hospitals.slice(0, 2).join(" · ")}
                        {c.hospitals.length > 2 ? "…" : ""}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {sorted.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-center text-[14px] text-slate-600">
              לא נמצאו ערים התואמות לחיפוש. נסו מילה אחרת או בחרו אזור אחר — או{" "}
              <Link href="/guides" className="font-bold text-[#1f6bff] hover:underline">
                עברו למדריך הארצי
              </Link>
              .
            </p>
          ) : null}
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-[#0a1f44] p-6 text-white shadow-lg lg:sticky lg:top-28">
          <h3 className="text-lg font-extrabold leading-snug">צריכים התאמה לעיר אחרת?</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-200">
            גם כשאין מיקום מדויק ברשימה, הרבה פניות מסתיימות בשיבוץ תוך שעות — עם התאמת שפה, ניסיון קליני והקשר לבית החולים
            הרלוונטי.
          </p>
          <ul className="mt-5 space-y-3 text-[13px] font-semibold text-slate-100">
            <li className="flex gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#5fd1f0]" aria-hidden />
              שיבוץ אחרי שיחת היכרות קצרה
            </li>
            <li className="flex gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#5fd1f0]" aria-hidden />
              ליווי תכל׳ס — מהמחלקה ועד הבית
            </li>
            <li className="flex gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#5fd1f0]" aria-hidden />
              העדפה לאותה אחות כשאפשר
            </li>
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/services"
              className="inline-flex justify-center rounded-2xl bg-white px-4 py-3 text-center text-[14px] font-extrabold text-[#0a1f44] transition hover:bg-[#e2e8f0]"
            >
              כל דפי השירותים
            </Link>
            <Link
              href="/hospitals"
              className="inline-flex justify-center rounded-2xl border border-white/35 bg-transparent px-4 py-3 text-center text-[14px] font-extrabold text-white transition hover:bg-white/10"
            >
              לפי בית חולים
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
