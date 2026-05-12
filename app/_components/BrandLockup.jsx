export default function BrandLockup({ compact = false, theme = "light", className = "" }) {
  const isLight = theme === "light";
  const titleColor = isLight ? "text-[#0a1f44]" : "text-white";
  const subColor = isLight ? "text-slate-500" : "text-slate-300";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className={`relative grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#0a1f44] via-[#1f6bff] to-[#5fd1f0] shadow-[0_10px_30px_-12px_rgba(31,107,255,0.55)] ring-1 ring-white/40 ${
          compact ? "h-9 w-9" : "h-11 w-11"
        }`}
        aria-hidden
      >
        <svg
          className={`text-white ${compact ? "h-[18px] w-[18px]" : "h-[22px] w-[22px]"}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 3v18M3 12h18"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="1.4"
          />
        </svg>
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={`truncate font-extrabold tracking-tight ${titleColor} ${
            compact ? "text-[15px]" : "text-[17px]"
          }`}
        >
          סיעוד פרימיום
        </span>
        <span
          className={`truncate font-medium ${subColor} ${
            compact ? "text-[10.5px]" : "text-[11.5px]"
          }`}
        >
          אחות פרטית · זמינות 24/7
        </span>
      </span>
    </span>
  );
}
