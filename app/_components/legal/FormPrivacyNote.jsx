import Link from "next/link";

/**
 * Concise privacy acknowledgment shown near a form's submit action.
 * Covers service-request processing only — this is NOT a mandatory checkbox
 * and NOT optional marketing consent.
 */
export default function FormPrivacyNote({ className = "" }) {
  return (
    <p
      className={[
        "text-center text-[11.5px] leading-snug text-slate-500",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      שליחת הטופס מהווה אישור לכך שקראתי את{" "}
      <Link
        href="/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[#1851d8] underline underline-offset-2 hover:text-[#1f6bff]"
      >
        מדיניות הפרטיות
      </Link>{" "}
      ואני מסכים/ה לשימוש במידע בהתאם לאמור בה.
    </p>
  );
}
