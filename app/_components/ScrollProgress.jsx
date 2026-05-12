"use client";

import { useEffect, useState } from "react";

/** Lightweight scroll indicator — no animation library. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const read = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(1, Math.max(0, el.scrollTop / max)));
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read, { passive: true });
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-gradient-to-l from-[#1f6bff] via-[#5fd1f0] to-[#1f6bff]"
      style={{
        transform: `scaleX(${progress})`,
        transformOrigin: "right center",
        willChange: "transform",
      }}
    />
  );
}
