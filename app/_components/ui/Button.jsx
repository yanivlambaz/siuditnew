"use client";

const base =
  "group/btn relative inline-flex items-center justify-center font-semibold tracking-tight rounded-full overflow-hidden transition-all duration-300 will-change-transform select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/60 disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

const sizes = {
  sm: "px-5 h-10 text-sm",
  md: "px-6 h-12 text-[15px]",
  lg: "px-8 h-14 text-base sm:text-[17px]",
  xl: "px-10 h-16 text-lg",
};

const variants = {
  primary:
    "text-white bg-[#0a1f44] hover:bg-[#142a52] shadow-[0_10px_30px_-10px_rgba(10,31,68,0.55)] hover:shadow-[0_22px_48px_-12px_rgba(10,31,68,0.65)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  gradient:
    "text-white bg-[length:200%_auto] bg-[linear-gradient(120deg,#1f6bff_0%,#5fd1f0_50%,#1f6bff_100%)] hover:bg-[position:100%_center] shadow-[0_14px_40px_-10px_rgba(31,107,255,0.55)] hover:shadow-[0_22px_55px_-12px_rgba(31,107,255,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  secondary:
    "text-[#0a1f44] bg-white border border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-8px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_40px_-14px_rgba(15,23,42,0.22)] hover:-translate-y-0.5 hover:border-slate-300 active:translate-y-0 active:scale-[0.99]",
  ghost: "text-[#0a1f44] hover:bg-slate-100/80 active:bg-slate-200/60",
  whatsapp:
    "text-white bg-[#25D366] hover:bg-[#1eb858] shadow-[0_14px_40px_-10px_rgba(37,211,102,0.5)] hover:shadow-[0_22px_55px_-12px_rgba(37,211,102,0.65)] hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "text-white border border-white/40 bg-white/5 hover:bg-white/10 hover:border-white/60 backdrop-blur",
};

const shineByVariant = {
  primary: "via-white/15",
  gradient: "via-white/30",
  secondary: "via-[#1f6bff]/10",
  whatsapp: "via-white/30",
  outline: "via-white/15",
};

export default function Button({
  as: Tag = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes = [
    base,
    sizes[size] ?? sizes.md,
    variants[variant] ?? variants.primary,
    className,
  ].join(" ");

  const shineTint = shineByVariant[variant] ?? "via-white/25";
  const showShine = variant !== "ghost";

  return (
    <Tag className={classes} {...props}>
      {showShine ? (
        <span
          aria-hidden
          className={[
            "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full",
            shineTint,
          ].join(" ")}
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </Tag>
  );
}
