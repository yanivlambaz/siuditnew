import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";

/**
 * @param {{ title: string, links: { href: string, label: string }[], icon?: typeof Layers }} props
 */
export default function TopicClusterCard({ title, links, icon: Icon = Layers }) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-slate-100">
      <div className="flex items-center gap-2 text-[#0a1f44]">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-[#1f6bff] ring-1 ring-blue-100">
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </span>
        <h3 className="text-[17px] font-extrabold tracking-tight">{title}</h3>
      </div>
      <ul className="mt-5 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex items-start justify-between gap-3 rounded-xl px-1 py-1.5 text-[14.5px] font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#0a1f44]"
            >
              <span className="leading-snug">{l.label}</span>
              <ArrowLeft className="mt-0.5 h-4 w-4 shrink-0 text-[#1f6bff] opacity-60 transition group-hover:-translate-x-0.5 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
