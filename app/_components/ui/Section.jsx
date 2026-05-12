import Container from "./Container";

export default function Section({
  id,
  as: Tag = "section",
  className = "",
  containerClassName = "",
  size = "default",
  spacing = "default",
  children,
  ...props
}) {
  const spacings = {
    tight: "py-14 sm:py-[4.25rem]",
    default: "py-20 sm:py-[5.5rem] md:py-[6.75rem]",
    loose: "py-24 sm:py-[6.75rem] md:py-[7.75rem]",
  };

  return (
    <Tag
      id={id}
      className={[
        "relative scroll-mt-nav",
        spacings[spacing] ?? spacings.default,
        className,
      ].join(" ")}
      {...props}
    >
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </Tag>
  );
}
