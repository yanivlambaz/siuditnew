"use client";

import { useState } from "react";

const fieldBase =
  "peer block w-full rounded-2xl border border-slate-200 bg-white px-5 pt-6 pb-2 text-[15px] font-medium text-slate-900 placeholder-transparent shadow-[0_1px_2px_rgba(15,23,42,0.03)] outline-none transition-all duration-200 focus:border-[#1f6bff] focus:ring-4 focus:ring-blue-100/80 hover:border-slate-300";

export function FloatingInput({
  id,
  label,
  className = "",
  type = "text",
  ...props
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder={label}
        className={[fieldBase, className].join(" ")}
        {...props}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute right-5 top-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[14px] peer-placeholder-shown:font-medium peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-[#1f6bff]"
      >
        {label}
      </label>
    </div>
  );
}

export function Input({ className = "", ...props }) {
  return <input className={[fieldBase, className].join(" ")} {...props} />;
}

export function Select({ className = "", children, ...props }) {
  return (
    <select className={[fieldBase, "appearance-none", className].join(" ")} {...props}>
      {children}
    </select>
  );
}

export function Field({ label, htmlFor, children, hint }) {
  return (
    <div className="space-y-1.5">
      {label ? (
        <label className="block text-[13px] font-bold text-slate-700" htmlFor={htmlFor}>
          {label}
        </label>
      ) : null}
      {children}
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}
