"use client";

/**
 * תפיסת שגיאות ברמת השורש (כולל כשל ב-layout).
 * חובה: תגי html ו-body — מחליפים את עטיפת השורש בעת שגיאה.
 */
export default function GlobalError({ error, reset }) {
  return (
    <html lang="he" dir="rtl">
      <body className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
        <h1 className="text-xl font-extrabold text-[#0a1f44]">אירעה שגיאה בטעינת האתר</h1>
        <p className="mt-3 max-w-md text-[15px] text-slate-600">
          נסו לרענן את הדף. אם אתם מפתחים: הריצו מתיקיית הפרויקט{" "}
          <code className="rounded bg-slate-100 px-1">npm run clean</code> ואז{" "}
          <code className="rounded bg-slate-100 px-1">npm run dev</code>.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-full bg-[#0a1f44] px-6 py-3 font-bold text-white"
        >
          נסו שוב
        </button>
        {process.env.NODE_ENV === "development" && error?.digest ? (
          <p className="mt-4 font-mono text-[11px] text-slate-400">{error.digest}</p>
        ) : null}
      </body>
    </html>
  );
}
