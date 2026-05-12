import Link from "next/link";

export default function SeoBreadcrumbs({ items }) {
  return (
    <nav aria-label="שביל ניווט" className="text-[13px] text-slate-500">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => (
          <li key={it.href} className="flex items-center gap-2">
            {i > 0 ? <span className="text-slate-300" aria-hidden>/</span> : null}
            {i === items.length - 1 ? (
              <span className="font-semibold text-[#0a1f44]">{it.name}</span>
            ) : (
              <Link href={it.href} className="transition hover:text-[#1f6bff]">
                {it.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
