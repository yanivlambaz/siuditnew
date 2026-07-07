import Image from "next/image";

export default function BrandLockup({ compact = false, theme = "light", className = "" }) {
  return (
    <span
      className={[
        "inline-flex shrink-0 items-center rounded-2xl",
        theme === "dark" ? "bg-white/96 p-2 shadow-sm ring-1 ring-white/15" : "",
        className,
      ].join(" ")}
    >
      <Image
        src="/images/siudit-logo-mark.png"
        alt="סיעודית - שירותי אחיות עד הבית 24/7"
        width={490}
        height={390}
        priority={!compact}
        sizes={compact ? "60px" : "(max-width: 640px) 74px, 84px"}
        className={[
          "block h-auto w-auto object-contain",
          compact ? "max-h-[46px] max-w-[118px]" : "max-h-[58px] max-w-[150px] sm:max-h-[64px] sm:max-w-[170px]",
        ].join(" ")}
      />
    </span>
  );
}
