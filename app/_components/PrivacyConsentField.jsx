"use client";

import Link from "next/link";

/**
 * תיבת סימון חובה להסכמה למדיניות פרטיות לפני שליחת ליד.
 * @param {{ id?: string }} props
 */
export default function PrivacyConsentField({ id = "privacy-consent" }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 px-3.5 py-3.5 ring-1 ring-slate-100/90">
      <input
        id={id}
        name="privacyConsent"
        type="checkbox"
        value="1"
        required
        className="peer mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-[#1f6bff] shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6bff]/35 focus-visible:ring-offset-2"
      />
      <label htmlFor={id} className="cursor-pointer text-[13px] font-medium leading-relaxed text-slate-700">
        אני מאשר/ת את{" "}
        <Link
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="font-extrabold text-[#1851d8] underline decoration-[#1f6bff]/35 underline-offset-[0.22em] transition hover:text-[#1f6bff]"
          onClick={(e) => e.stopPropagation()}
        >
          מדיניות הפרטיות
        </Link>
      </label>
    </div>
  );
}
