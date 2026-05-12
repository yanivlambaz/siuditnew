export default function Card({
  as: Tag = "div",
  hoverable = true,
  padding = "md",
  tone = "light",
  className = "",
  children,
  ...props
}) {
  const paddings = {
    none: "",
    sm: "p-6",
    md: "p-7 sm:p-8",
    lg: "p-8 sm:p-12",
  };

  const tones = {
    light:
      "bg-white/95 ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-22px_rgba(15,23,42,0.18)]",
    soft:
      "bg-gradient-to-br from-white to-[#f7f9fc] ring-1 ring-slate-200/60 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_18px_40px_-24px_rgba(15,23,42,0.14)]",
    dark:
      "bg-[#0a1f44] text-white ring-1 ring-white/10 shadow-[0_30px_80px_-30px_rgba(10,31,68,0.6)]",
    glass:
      "bg-white/60 backdrop-blur-xl ring-1 ring-white/60 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.18)]",
  };

  const classes = [
    "relative overflow-hidden rounded-3xl",
    tones[tone] ?? tones.light,
    paddings[padding] ?? paddings.md,
    hoverable
      ? "transition-[transform,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_28px_70px_-28px_rgba(15,23,42,0.22)] motion-reduce:hover:translate-y-0"
      : "",
    className,
  ].join(" ");

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
