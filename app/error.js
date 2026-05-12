"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * גבול שגיאה ברמת הקטע — אם רכיב נתקע, עדיין אפשר לרענן ולחזור לפעילות.
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <div
      dir="rtl"
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-white px-4 py-16 text-center"
    >
      <h1 className="text-xl font-extrabold text-[#0a1f44]">משהו השתבש בטעינת העמוד</h1>
      <p className="max-w-md text-[15px] leading-relaxed text-slate-600">
        נסו לרענן. אם הבעיה נמשכת, הריצו מהתיקייה של הפרויקט:{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px]">npm&nbsp;run&nbsp;clean</code>
        <span className="mx-1">ואז</span>
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px]">npm&nbsp;run&nbsp;dev</code>
        .
      </p>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-[#0a1f44] px-6 py-3 text-[15px] font-bold text-white transition hover:bg-[#142a52]"
        >
          נסו שוב
        </button>
        <Link
          href="/"
          className="rounded-full border-2 border-[#0a1f44] px-6 py-3 text-[15px] font-bold text-[#0a1f44] transition hover:bg-slate-50"
        >
          לעמוד הבית
        </Link>
      </div>
    </div>
  );
}
