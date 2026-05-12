"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  buildIsraelOutlinePath,
  CITY_COORDINATES_WGS84,
  projectLonLat,
  separateOverlappingPins,
} from "../../lib/israelMapProjection";

const VB_W = 100;
const VB_H = 210;

function useMediaQueryMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 639px)");
    const fn = () => setM(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return m;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

/**
 * @param {{ slug: string, name: string, region: string }[]} cities
 * @param {string} regionFilter הכל or region name
 * @param {{ slug: string }[]} filteredSorted — active search/region results
 */
export default function CitiesInteractiveMap({ cities, regionFilter, filteredSorted }) {
  const router = useRouter();
  const gid = useId().replace(/:/g, "");
  const wrapRef = useRef(null);
  const isMobile = useMediaQueryMobile();
  const reducedMotion = usePrefersReducedMotion();

  const outlineD = useMemo(() => buildIsraelOutlinePath(), []);

  const pinsBase = useMemo(() => {
    const list = [];
    for (const c of cities) {
      const ll = CITY_COORDINATES_WGS84[c.slug];
      if (!ll) continue;
      const [lat, lon] = ll;
      const p = projectLonLat(lon, lat);
      list.push({ slug: c.slug, name: c.name, x: p.x, y: p.y });
    }
    const minDist = isMobile ? 8.5 : 4;
    return separateOverlappingPins(list, minDist);
  }, [cities, isMobile]);

  const [hoverSlug, setHoverSlug] = useState(null);
  const [touchPreviewSlug, setTouchPreviewSlug] = useState(null);

  const activeSlug = hoverSlug ?? touchPreviewSlug;

  const tooltipPin = useMemo(() => pinsBase.find((p) => p.slug === activeSlug), [pinsBase, activeSlug]);

  const isDimmed = useCallback(
    (slug) => {
      const c = cities.find((x) => x.slug === slug);
      if (!c) return true;
      if (regionFilter !== "הכל" && c.region !== regionFilter) return true;
      return !filteredSorted.some((x) => x.slug === slug);
    },
    [cities, regionFilter, filteredSorted],
  );

  const go = useCallback(
    (slug) => {
      router.push(`/cities/${slug}`);
    },
    [router],
  );

  /* Tap outside clears mobile preview caption */
  useEffect(() => {
    if (!touchPreviewSlug) return;
    function onDoc(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setTouchPreviewSlug(null);
    }
    document.addEventListener("touchstart", onDoc, { passive: true });
    return () => document.removeEventListener("touchstart", onDoc);
  }, [touchPreviewSlug]);

  const transitionMs = reducedMotion ? 0 : 220;

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[min(100%,380px)] md:max-w-[400px]">
      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="h-auto w-full max-h-[min(58vh,440px)] touch-manipulation select-none"
          role="img"
          aria-label="מפת ישראל — ערי שירות; לחצו על נקודה"
        >
          <title>מפת פריסה ארצית</title>
          <defs>
            <linearGradient id={`citiesMapFill-${gid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8f1ff" />
              <stop offset="55%" stopColor="#f4f9ff" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
            <filter id={`cityPinShadow-${gid}`} x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="0.6" stdDeviation="0.65" floodColor="#0f172a" floodOpacity="0.22" />
            </filter>
            <filter id={`cityPinGlow-${gid}`} x="-60%" y="-60%" width="220%" height="220%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.1" floodColor="#29b6f6" floodOpacity="0.35" />
            </filter>
          </defs>

          <path
            d={outlineD}
            fill={`url(#citiesMapFill-${gid})`}
            stroke={isMobile ? "rgba(148,163,184,0.55)" : "rgba(100,116,139,0.65)"}
            strokeWidth={isMobile ? 0.35 : 0.42}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {pinsBase.map((pin) => {
            const dim = isDimmed(pin.slug) ? 0.38 : 1;
            const active = activeSlug === pin.slug;
            const r = active ? (isMobile ? 3.1 : 3.45) : isMobile ? 2.35 : 2.65;
            return (
              <g
                key={pin.slug}
                opacity={dim}
                style={{
                  transition: `opacity ${transitionMs}ms ease`,
                }}
              >
                <circle
                  role="link"
                  tabIndex={0}
                  aria-label={`${pin.name} — אחות פרטית זמינה, לחיצה לדף העיר`}
                  cx={pin.x}
                  cy={pin.y}
                  r={r + (active ? 0.85 : 0)}
                  fill="none"
                  stroke="#1f6bff"
                  strokeOpacity={active ? 0.35 : 0}
                  strokeWidth="1.2"
                  style={{
                    transition: `r ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1), stroke-opacity ${transitionMs}ms ease`,
                  }}
                />
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r={r}
                  fill={active ? "#1f6bff" : "#0c4a6e"}
                  stroke="#ffffff"
                  strokeWidth={isMobile ? 0.75 : 0.85}
                  filter={active ? `url(#cityPinGlow-${gid})` : `url(#cityPinShadow-${gid})`}
                  className="cursor-pointer outline-none"
                  style={{
                    transition: `r ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1), fill ${transitionMs}ms ease`,
                  }}
                  onPointerDown={(e) => {
                    if (e.pointerType === "touch") setTouchPreviewSlug(pin.slug);
                  }}
                  onMouseEnter={() => setHoverSlug(pin.slug)}
                  onMouseLeave={() => setHoverSlug((cur) => (cur === pin.slug ? null : cur))}
                  onClick={() => go(pin.slug)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      go(pin.slug);
                    }
                  }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tooltip — subtle, medical tone */}
      {tooltipPin && !isMobile ? (
        <div
          className="pointer-events-none absolute z-10 min-w-[160px] max-w-[220px] rounded-xl border border-slate-200/90 bg-white/95 px-3 py-2.5 text-center shadow-[0_10px_30px_-10px_rgba(15,23,42,0.22)] backdrop-blur-md transition-opacity duration-200"
          style={{
            left: `${(tooltipPin.x / VB_W) * 100}%`,
            top: `${(tooltipPin.y / VB_H) * 100}%`,
            transform: "translate(-50%, calc(-100% - 14px))",
          }}
        >
          <p className="text-[13.5px] font-extrabold text-[#0a1f44]">{tooltipPin.name}</p>
          <p className="mt-0.5 text-[11.5px] font-semibold text-emerald-700/95">אחות פרטית זמינה</p>
        </div>
      ) : null}

      {isMobile ? (
        <p className="mt-3 px-1 text-center text-[12px] leading-snug text-slate-600">
          {tooltipPin ? (
            <>
              <span className="font-bold text-[#0a1f44]">{tooltipPin.name}</span>
              <span className="mx-1 text-slate-400">·</span>
              <span className="font-semibold text-emerald-700">אחות פרטית זמינה</span>
              <span className="mt-1 block text-[11.5px] text-slate-500">מגע מציג פרטים · לחיצה נכנסת לעמוד העיר</span>
            </>
          ) : (
            <>לחצו על נקודה — שם העיר וזמינות יופיעו כאן</>
          )}
        </p>
      ) : (
        <p className="mt-3 text-center text-[12.5px] text-slate-500">
          {tooltipPin ? (
            <span className="font-medium text-slate-600">לחיצה לעמוד מלא ב{tooltipPin.name}</span>
          ) : (
            <>רחפו על נקודה לפרטים · לחיצה לכניסה</>
          )}
        </p>
      )}
    </div>
  );
}
