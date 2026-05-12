export default function Container({
  className = "",
  size = "default",
  children,
}) {
  const sizes = {
    sm: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  };
  return (
    <div
      className={[
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        sizes[size] ?? sizes.default,
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
