export default function FadeIn({
  children,
  className = "",
  as: Tag = "div",
}) {
  return <Tag className={className}>{children}</Tag>;
}

export function Stagger({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
