export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className = "",
}) {
  const isDark = tone === "dark";
  const alignClass =
    align === "start"
      ? "text-start"
      : align === "end"
      ? "text-end"
      : "text-center mx-auto";

  return (
    <div className={[alignClass, "max-w-3xl", className].join(" ")}>
      {eyebrow ? (
        <p
          className={[
            "animate-rise-1 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.18em]",
            isDark
              ? "bg-white/10 text-white/90 ring-1 ring-white/15"
              : "bg-blue-50 text-[#1851d8] ring-1 ring-blue-100/80",
          ].join(" ")}
        >
          <span
            className={[
              "h-1.5 w-1.5 rounded-full",
              isDark ? "bg-cyan-300" : "bg-[#1f6bff]",
            ].join(" ")}
          />
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={[
          "animate-rise-2 mt-5 text-balance text-[30px] font-extrabold leading-[1.12] tracking-tight sm:text-[40px] md:text-[48px]",
          isDark ? "text-white" : "text-[#0a1f44]",
        ].join(" ")}
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          className={[
            "animate-rise-3 mt-5 text-pretty text-[16px] leading-[1.72] sm:text-[17.5px]",
            isDark ? "text-slate-300" : "text-slate-600",
            align === "center" ? "mx-auto max-w-2xl" : "",
          ].join(" ")}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
