// Premium medical illustration system.
// Unified palette: navy #0a1f44, blue #1f6bff, cyan #5fd1f0, soft mist #cdf3ff.
// Single style: rounded line + soft gradient fills + subtle highlights.

function GradientDefs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-blue`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1f6bff" />
        <stop offset="100%" stopColor="#5fd1f0" />
      </linearGradient>
      <linearGradient id={`${id}-blue-soft`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dbeafe" />
        <stop offset="100%" stopColor="#cdf3ff" />
      </linearGradient>
      <linearGradient id={`${id}-navy`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0a1f44" />
        <stop offset="100%" stopColor="#1f6bff" />
      </linearGradient>
      <linearGradient id={`${id}-glass`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
      </linearGradient>
      <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#5fd1f0" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#5fd1f0" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function frame(id, children, viewBox = "0 0 240 240") {
  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      role="img"
      aria-hidden
    >
      <GradientDefs id={id} />
      {children}
    </svg>
  );
}

export function HomeCareIllustration({ id = "ill-home" }) {
  return frame(
    id,
    <>
      <circle cx="120" cy="120" r="110" fill={`url(#${id}-glow)`} />
      <rect
        x="34"
        y="86"
        width="172"
        height="118"
        rx="20"
        fill="white"
        stroke="#dbeafe"
        strokeWidth="1.5"
      />
      <path
        d="M28 92 L120 28 L212 92"
        stroke={`url(#${id}-blue)`}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M44 92 L120 38 L196 92 L196 100 L120 46 L44 100 Z"
        fill={`url(#${id}-blue-soft)`}
        opacity="0.6"
      />
      <rect x="78" y="120" width="36" height="60" rx="6" fill={`url(#${id}-blue-soft)`} />
      <rect x="78" y="120" width="36" height="60" rx="6" fill="none" stroke="#bfdbfe" strokeWidth="1.5" />
      <rect x="86" y="138" width="8" height="20" rx="2" fill="white" />
      <rect x="98" y="138" width="8" height="20" rx="2" fill="white" />
      <circle cx="148" cy="138" r="20" fill={`url(#${id}-blue)`} />
      <path
        d="M144 138 H152 M148 134 V142"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="130" y="170" width="44" height="10" rx="3" fill="#dbeafe" />
      <circle cx="60" cy="68" r="6" fill="#5fd1f0" opacity="0.7" />
      <circle cx="190" cy="60" r="4" fill="#1f6bff" opacity="0.5" />
      <circle cx="200" cy="180" r="5" fill="#5fd1f0" opacity="0.6" />
    </>
  );
}

export function HospitalIllustration({ id = "ill-hospital" }) {
  return frame(
    id,
    <>
      <circle cx="120" cy="120" r="110" fill={`url(#${id}-glow)`} />
      <rect x="46" y="56" width="148" height="148" rx="14" fill="white" stroke="#dbeafe" strokeWidth="1.5" />
      <rect x="46" y="56" width="148" height="36" rx="14" fill={`url(#${id}-navy)`} />
      <rect x="46" y="80" width="148" height="14" fill={`url(#${id}-navy)`} />
      <circle cx="120" cy="74" r="11" fill="white" />
      <path d="M120 67 V81 M113 74 H127" stroke="#1f6bff" strokeWidth="3" strokeLinecap="round" />
      <rect x="68" y="108" width="22" height="28" rx="3" fill="#dbeafe" />
      <rect x="98" y="108" width="22" height="28" rx="3" fill={`url(#${id}-blue-soft)`} />
      <rect x="128" y="108" width="22" height="28" rx="3" fill="#dbeafe" />
      <rect x="158" y="108" width="22" height="28" rx="3" fill={`url(#${id}-blue-soft)`} />
      <rect x="68" y="144" width="22" height="28" rx="3" fill={`url(#${id}-blue-soft)`} />
      <rect x="98" y="144" width="22" height="28" rx="3" fill="#dbeafe" />
      <rect x="128" y="144" width="22" height="28" rx="3" fill={`url(#${id}-blue-soft)`} />
      <rect x="158" y="144" width="22" height="28" rx="3" fill="#dbeafe" />
      <rect x="106" y="174" width="28" height="30" rx="2" fill={`url(#${id}-blue)`} />
      <circle cx="118" cy="190" r="1.5" fill="white" />
      <circle cx="38" cy="200" r="6" fill="#5fd1f0" opacity="0.6" />
      <circle cx="206" cy="40" r="5" fill="#1f6bff" opacity="0.5" />
    </>
  );
}

export function HeartCareIllustration({ id = "ill-heart" }) {
  return frame(
    id,
    <>
      <circle cx="120" cy="120" r="110" fill={`url(#${id}-glow)`} />
      <path
        d="M120 192 C70 160 40 132 40 100 C40 78 58 60 80 60 C96 60 110 70 120 84 C130 70 144 60 160 60 C182 60 200 78 200 100 C200 132 170 160 120 192 Z"
        fill={`url(#${id}-blue)`}
      />
      <path
        d="M120 192 C70 160 40 132 40 100 C40 78 58 60 80 60 C96 60 110 70 120 84 C130 70 144 60 160 60 C182 60 200 78 200 100"
        fill="none"
        stroke={`url(#${id}-glass)`}
        strokeOpacity="0.8"
        strokeWidth="1.5"
      />
      <path
        d="M60 122 H94 L102 100 L116 144 L130 110 L138 122 H180"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="62" cy="68" r="6" fill="#5fd1f0" opacity="0.7" />
      <circle cx="186" cy="62" r="4" fill="white" opacity="0.6" />
      <circle cx="190" cy="178" r="5" fill="#5fd1f0" opacity="0.6" />
      <circle cx="44" cy="162" r="3" fill="#1f6bff" opacity="0.5" />
    </>
  );
}

export function ShieldPlusIllustration({ id = "ill-shield" }) {
  return frame(
    id,
    <>
      <circle cx="120" cy="120" r="110" fill={`url(#${id}-glow)`} />
      <path
        d="M120 30 L184 56 V112 C184 156 156 188 120 204 C84 188 56 156 56 112 V56 L120 30 Z"
        fill={`url(#${id}-blue)`}
      />
      <path
        d="M120 30 L184 56 V112 C184 156 156 188 120 204"
        stroke={`url(#${id}-glass)`}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M120 50 L168 70 V112 C168 144 148 170 120 184 C92 170 72 144 72 112 V70 L120 50 Z"
        fill="white"
        fillOpacity="0.18"
      />
      <path
        d="M120 84 V148 M88 116 H152"
        stroke="white"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <circle cx="56" cy="64" r="5" fill="#5fd1f0" opacity="0.7" />
      <circle cx="200" cy="180" r="6" fill="#1f6bff" opacity="0.5" />
      <circle cx="34" cy="160" r="4" fill="#5fd1f0" opacity="0.6" />
    </>
  );
}

export function MoonNightIllustration({ id = "ill-moon" }) {
  return frame(
    id,
    <>
      <circle cx="120" cy="120" r="110" fill={`url(#${id}-glow)`} />
      <circle cx="120" cy="120" r="80" fill={`url(#${id}-navy)`} />
      <circle cx="120" cy="120" r="80" fill="none" stroke={`url(#${id}-glass)`} strokeOpacity="0.4" strokeWidth="1.5" />
      <path
        d="M132 80 C112 90 100 108 100 130 C100 152 116 170 138 174 C124 184 106 184 90 176 C72 166 60 146 60 124 C60 96 84 72 112 72 C119 72 126 75 132 80 Z"
        fill="white"
        fillOpacity="0.95"
      />
      <circle cx="160" cy="80" r="2" fill="white" />
      <circle cx="180" cy="100" r="1.5" fill="white" />
      <circle cx="170" cy="150" r="2" fill="#5fd1f0" />
      <circle cx="186" cy="140" r="1.2" fill="white" opacity="0.7" />
      <path
        d="M40 140 H80"
        stroke="#5fd1f0"
        strokeOpacity="0.6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M186 70 L200 70 M193 63 V77"
        stroke="#5fd1f0"
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  );
}

export function SyringeOncologyIllustration({ id = "ill-syringe" }) {
  return frame(
    id,
    <>
      <circle cx="120" cy="120" r="110" fill={`url(#${id}-glow)`} />
      <g transform="rotate(-30 120 120)">
        <rect x="40" y="108" width="124" height="24" rx="6" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
        <rect x="44" y="112" width="80" height="16" rx="3" fill={`url(#${id}-blue-soft)`} opacity="0.6" />
        <rect x="44" y="112" width="40" height="16" rx="3" fill={`url(#${id}-blue)`} opacity="0.5" />
        <rect x="160" y="100" width="14" height="40" rx="4" fill={`url(#${id}-blue)`} />
        <rect x="174" y="116" width="34" height="8" rx="2" fill="#0a1f44" />
        <rect x="208" y="118" width="2" height="4" fill="#0a1f44" />
        <rect x="32" y="100" width="10" height="40" rx="3" fill={`url(#${id}-navy)`} />
      </g>
      <circle cx="76" cy="68" r="6" fill="#5fd1f0" opacity="0.7" />
      <circle cx="180" cy="170" r="8" fill="#1f6bff" opacity="0.4" />
      <circle cx="60" cy="180" r="5" fill="#5fd1f0" opacity="0.6" />
      <circle cx="200" cy="60" r="4" fill="#1f6bff" opacity="0.5" />
    </>
  );
}

export function RehabIllustration({ id = "ill-rehab" }) {
  return frame(
    id,
    <>
      <circle cx="120" cy="120" r="110" fill={`url(#${id}-glow)`} />
      <path
        d="M40 178 L96 130 L130 156 L200 88"
        stroke={`url(#${id}-blue)`}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M40 178 L96 130 L130 156 L200 88 L200 178 Z"
        fill={`url(#${id}-blue-soft)`}
        opacity="0.5"
      />
      <circle cx="40" cy="178" r="7" fill={`url(#${id}-navy)`} />
      <circle cx="96" cy="130" r="7" fill={`url(#${id}-blue)`} />
      <circle cx="130" cy="156" r="7" fill={`url(#${id}-blue)`} />
      <circle cx="200" cy="88" r="9" fill={`url(#${id}-navy)`} />
      <path d="M196 88 L200 92 L208 80" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M196 178 H44" stroke="#0a1f44" strokeOpacity="0.15" strokeWidth="1" />
      <path d="M48 100 V174" stroke="#0a1f44" strokeOpacity="0.15" strokeWidth="1" />
      <circle cx="190" cy="50" r="5" fill="#5fd1f0" opacity="0.6" />
      <circle cx="56" cy="68" r="4" fill="#1f6bff" opacity="0.5" />
    </>
  );
}

export function NurseHandshakeIllustration({ id = "ill-hands" }) {
  return frame(
    id,
    <>
      <circle cx="120" cy="120" r="110" fill={`url(#${id}-glow)`} />
      <path
        d="M120 84 C110 70 88 64 70 76 C50 90 50 116 64 134 L120 188 L176 134 C190 116 190 90 170 76 C152 64 130 70 120 84 Z"
        fill={`url(#${id}-blue)`}
      />
      <path
        d="M120 84 C110 70 88 64 70 76 C50 90 50 116 64 134 L120 188"
        stroke={`url(#${id}-glass)`}
        strokeOpacity="0.6"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M88 128 C88 116 96 108 108 108 H132 C144 108 152 116 152 128"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="120" cy="100" r="8" fill="white" />
      <circle cx="120" cy="100" r="3" fill={`url(#${id}-blue)`} />
      <circle cx="58" cy="62" r="6" fill="#5fd1f0" opacity="0.7" />
      <circle cx="190" cy="64" r="4" fill="white" opacity="0.7" />
      <circle cx="40" cy="170" r="5" fill="#1f6bff" opacity="0.5" />
      <circle cx="200" cy="170" r="6" fill="#5fd1f0" opacity="0.6" />
    </>
  );
}

export function PulseChartIllustration({ id = "ill-pulse" }) {
  return frame(
    id,
    <>
      <circle cx="120" cy="120" r="110" fill={`url(#${id}-glow)`} />
      <rect x="32" y="64" width="176" height="112" rx="14" fill="white" stroke="#dbeafe" strokeWidth="1.5" />
      <rect x="32" y="64" width="176" height="28" rx="14" fill={`url(#${id}-navy)`} />
      <rect x="32" y="80" width="176" height="12" fill={`url(#${id}-navy)`} />
      <circle cx="46" cy="78" r="3" fill="#5fd1f0" />
      <circle cx="56" cy="78" r="3" fill="white" opacity="0.4" />
      <circle cx="66" cy="78" r="3" fill="white" opacity="0.4" />
      <path
        d="M44 140 H72 L82 116 L96 168 L110 124 L120 152 L132 132 H196"
        stroke={`url(#${id}-blue)`}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="132" cy="132" r="5" fill="#5fd1f0" />
      <circle cx="132" cy="132" r="9" fill="none" stroke="#5fd1f0" strokeOpacity="0.4" />
      <rect x="32" y="156" width="176" height="20" rx="2" fill="#f7f9fc" />
      <rect x="44" y="162" width="34" height="8" rx="2" fill={`url(#${id}-blue-soft)`} />
      <rect x="84" y="162" width="22" height="8" rx="2" fill="#dbeafe" />
      <rect x="112" y="162" width="40" height="8" rx="2" fill={`url(#${id}-blue-soft)`} />
      <rect x="158" y="162" width="38" height="8" rx="2" fill="#dbeafe" />
      <circle cx="220" cy="50" r="6" fill="#5fd1f0" opacity="0.6" />
      <circle cx="22" cy="194" r="5" fill="#1f6bff" opacity="0.5" />
    </>
  );
}

export function StethoscopeIllustration({ id = "ill-steth" }) {
  return frame(
    id,
    <>
      <circle cx="120" cy="120" r="110" fill={`url(#${id}-glow)`} />
      <path
        d="M70 50 V90 C70 124 96 148 120 148 C144 148 170 124 170 90 V50"
        stroke={`url(#${id}-blue)`}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="62" y="44" width="16" height="14" rx="3" fill={`url(#${id}-navy)`} />
      <rect x="162" y="44" width="16" height="14" rx="3" fill={`url(#${id}-navy)`} />
      <path
        d="M120 148 V174 C120 188 132 200 146 200 C160 200 172 188 172 174 V162"
        stroke={`url(#${id}-blue)`}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="172" cy="156" r="18" fill={`url(#${id}-navy)`} />
      <circle cx="172" cy="156" r="10" fill={`url(#${id}-blue-soft)`} />
      <circle cx="172" cy="156" r="4" fill="white" />
      <circle cx="58" cy="180" r="6" fill="#5fd1f0" opacity="0.6" />
      <circle cx="208" cy="80" r="5" fill="#1f6bff" opacity="0.5" />
      <circle cx="38" cy="92" r="4" fill="#5fd1f0" opacity="0.5" />
    </>
  );
}

export function CalendarHeartIllustration({ id = "ill-calendar" }) {
  return frame(
    id,
    <>
      <circle cx="120" cy="120" r="110" fill={`url(#${id}-glow)`} />
      <rect x="42" y="60" width="156" height="148" rx="16" fill="white" stroke="#dbeafe" strokeWidth="1.5" />
      <rect x="42" y="60" width="156" height="40" rx="16" fill={`url(#${id}-blue)`} />
      <rect x="42" y="84" width="156" height="16" fill={`url(#${id}-blue)`} />
      <rect x="68" y="46" width="10" height="28" rx="3" fill={`url(#${id}-navy)`} />
      <rect x="162" y="46" width="10" height="28" rx="3" fill={`url(#${id}-navy)`} />
      <g transform="translate(120 158)">
        <path
          d="M0 32 C-26 14 -42 0 -42 -16 C-42 -28 -32 -38 -20 -38 C-12 -38 -4 -34 0 -28 C4 -34 12 -38 20 -38 C32 -38 42 -28 42 -16 C42 0 26 14 0 32 Z"
          fill={`url(#${id}-blue)`}
        />
      </g>
      <circle cx="68" cy="120" r="6" fill={`url(#${id}-blue-soft)`} />
      <circle cx="92" cy="120" r="6" fill={`url(#${id}-blue-soft)`} />
      <circle cx="148" cy="120" r="6" fill={`url(#${id}-blue-soft)`} />
      <circle cx="172" cy="120" r="6" fill={`url(#${id}-blue-soft)`} />
      <circle cx="208" cy="50" r="5" fill="#5fd1f0" opacity="0.6" />
      <circle cx="34" cy="200" r="4" fill="#1f6bff" opacity="0.5" />
    </>
  );
}

export function PeopleCommunityIllustration({ id = "ill-people" }) {
  return frame(
    id,
    <>
      <circle cx="120" cy="120" r="110" fill={`url(#${id}-glow)`} />
      <circle cx="120" cy="92" r="28" fill={`url(#${id}-navy)`} />
      <path
        d="M68 200 C68 168 90 148 120 148 C150 148 172 168 172 200 Z"
        fill={`url(#${id}-blue)`}
      />
      <circle cx="60" cy="100" r="22" fill={`url(#${id}-blue)`} />
      <path
        d="M22 200 C22 176 38 158 60 158"
        stroke={`url(#${id}-blue)`}
        strokeWidth="32"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="180" cy="100" r="22" fill={`url(#${id}-blue)`} />
      <path
        d="M218 200 C218 176 202 158 180 158"
        stroke={`url(#${id}-blue)`}
        strokeWidth="32"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="120" cy="84" r="6" fill="white" />
      <circle cx="60" cy="100" r="5" fill="white" />
      <circle cx="180" cy="100" r="5" fill="white" />
      <circle cx="46" cy="46" r="5" fill="#5fd1f0" opacity="0.6" />
      <circle cx="200" cy="50" r="4" fill="#1f6bff" opacity="0.5" />
    </>
  );
}
