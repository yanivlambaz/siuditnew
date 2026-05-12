// Larger composite illustration scenes for hero / care moments / contact panels.

function SceneDefs({ id }) {
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
        <stop offset="0%" stopColor="#04122e" />
        <stop offset="100%" stopColor="#1f6bff" />
      </linearGradient>
      <linearGradient id={`${id}-skin`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fde7d4" />
        <stop offset="100%" stopColor="#f4d2b2" />
      </linearGradient>
      <linearGradient id={`${id}-uniform`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#dbeafe" />
      </linearGradient>
      <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#5fd1f0" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#5fd1f0" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-glow-warm`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fde7d4" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#fde7d4" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

// A modern stylized portrait of a nurse with a soft caring backdrop.
// Used as a large hero secondary visual.
export function NursePortraitScene({ id = "nurse-portrait", className = "" }) {
  return (
    <svg
      viewBox="0 0 480 600"
      xmlns="http://www.w3.org/2000/svg"
      className={["h-full w-full", className].join(" ")}
      role="img"
      aria-label="אחות מוסמכת"
    >
      <SceneDefs id={id} />

      <rect width="480" height="600" rx="40" fill={`url(#${id}-blue-soft)`} />
      <circle cx="380" cy="120" r="180" fill={`url(#${id}-glow)`} />
      <circle cx="80" cy="500" r="200" fill={`url(#${id}-glow-warm)`} />

      <circle cx="380" cy="80" r="6" fill="#5fd1f0" />
      <circle cx="420" cy="160" r="4" fill="#1f6bff" opacity="0.7" />
      <circle cx="60" cy="120" r="5" fill="#5fd1f0" opacity="0.7" />
      <circle cx="100" cy="80" r="3" fill="#1f6bff" opacity="0.6" />

      {/* Nurse silhouette */}
      <g>
        {/* shoulders / uniform */}
        <path
          d="M120 600 V490 C120 420 170 380 240 380 C310 380 360 420 360 490 V600 Z"
          fill={`url(#${id}-uniform)`}
        />
        {/* uniform shadow for depth */}
        <path
          d="M120 600 V490 C120 470 124 454 130 440 V600 Z"
          fill="#bfdbfe"
          opacity="0.5"
        />
        <path
          d="M360 600 V490 C360 470 356 454 350 440 V600 Z"
          fill="#bfdbfe"
          opacity="0.5"
        />

        {/* uniform collar */}
        <path
          d="M210 384 L240 420 L270 384 Z"
          fill={`url(#${id}-blue)`}
        />
        {/* badge */}
        <rect x="290" y="430" width="38" height="18" rx="3" fill={`url(#${id}-blue)`} />
        <rect x="296" y="436" width="20" height="3" rx="1" fill="white" />
        <rect x="296" y="441" width="14" height="2" rx="1" fill="white" opacity="0.7" />

        {/* stethoscope around neck */}
        <path
          d="M200 396 C190 420 184 450 184 482 C184 506 200 524 224 524"
          stroke={`url(#${id}-navy)`}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M280 396 C290 420 296 450 296 482 C296 506 280 524 256 524"
          stroke={`url(#${id}-navy)`}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="240" cy="540" r="22" fill={`url(#${id}-navy)`} />
        <circle cx="240" cy="540" r="13" fill={`url(#${id}-blue-soft)`} />
        <circle cx="240" cy="540" r="5" fill="white" />

        {/* neck */}
        <rect x="218" y="324" width="44" height="56" rx="14" fill={`url(#${id}-skin)`} />
        <rect x="218" y="368" width="44" height="14" fill="#f4d2b2" opacity="0.6" />

        {/* head */}
        <ellipse cx="240" cy="280" rx="76" ry="86" fill={`url(#${id}-skin)`} />

        {/* hair (modern bun back) */}
        <path
          d="M168 252 C168 196 200 168 240 168 C280 168 312 196 312 252 C312 232 296 218 280 218 L200 218 C184 218 168 232 168 252 Z"
          fill="#3f2a18"
        />
        {/* hair sides */}
        <path
          d="M170 268 C168 280 170 296 178 308 C172 296 172 282 174 268 Z"
          fill="#3f2a18"
        />
        <path
          d="M310 268 C312 280 310 296 302 308 C308 296 308 282 306 268 Z"
          fill="#3f2a18"
        />

        {/* nurse cap */}
        <path
          d="M200 192 L240 168 L280 192 L264 212 L216 212 Z"
          fill="white"
          stroke="#dbeafe"
          strokeWidth="1.5"
        />
        <path
          d="M236 184 V200 M228 192 H244"
          stroke="#1f6bff"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* eyes */}
        <ellipse cx="218" cy="284" rx="4.5" ry="6" fill="#0a1f44" />
        <ellipse cx="262" cy="284" rx="4.5" ry="6" fill="#0a1f44" />
        <circle cx="219" cy="282" r="1.4" fill="white" />
        <circle cx="263" cy="282" r="1.4" fill="white" />

        {/* eyebrows */}
        <path
          d="M208 268 C214 264 222 264 228 268"
          stroke="#3f2a18"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M252 268 C258 264 266 264 272 268"
          stroke="#3f2a18"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* nose */}
        <path
          d="M240 296 V310 C240 314 236 318 232 318"
          stroke="#d9b289"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* smile */}
        <path
          d="M222 332 C230 340 250 340 258 332"
          stroke="#0a1f44"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* cheek blush */}
        <ellipse cx="200" cy="316" rx="10" ry="5" fill="#f4a89a" opacity="0.55" />
        <ellipse cx="280" cy="316" rx="10" ry="5" fill="#f4a89a" opacity="0.55" />
      </g>
    </svg>
  );
}

// A modern caring scene: caregiver holding a senior's hand.
// Used in the dedicated emotional "Care Scene" section.
export function CareMomentScene({ id = "care-moment", className = "" }) {
  return (
    <svg
      viewBox="0 0 720 480"
      xmlns="http://www.w3.org/2000/svg"
      className={["h-full w-full", className].join(" ")}
      role="img"
      aria-label="רגע של אכפתיות"
    >
      <SceneDefs id={id} />

      <rect width="720" height="480" rx="40" fill="white" />

      {/* layered background washes */}
      <circle cx="600" cy="120" r="220" fill={`url(#${id}-glow)`} />
      <circle cx="120" cy="380" r="220" fill={`url(#${id}-glow-warm)`} />
      <rect x="40" y="40" width="640" height="400" rx="32" fill={`url(#${id}-blue-soft)`} opacity="0.4" />

      {/* drifting medical motifs */}
      <circle cx="100" cy="80" r="8" fill="#5fd1f0" opacity="0.5" />
      <circle cx="640" cy="100" r="6" fill="#1f6bff" opacity="0.5" />
      <circle cx="660" cy="380" r="9" fill="#5fd1f0" opacity="0.4" />
      <path
        d="M80 380 L100 380 M90 370 V390"
        stroke="#1f6bff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M580 60 L600 60 M590 50 V70"
        stroke="#5fd1f0"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Holding hands composition centered */}
      <g transform="translate(160 140)">
        {/* senior hand (warmer) */}
        <path
          d="M0 140 C0 100 28 80 64 80 H220 C232 80 240 88 240 100 V120 C240 140 224 160 200 168 L120 200 C100 208 80 200 64 188 L20 160 C8 154 0 148 0 140 Z"
          fill={`url(#${id}-skin)`}
        />
        {/* senior hand wrinkles */}
        <path
          d="M40 130 C48 132 56 132 64 132 M60 144 C68 146 76 146 84 146 M80 158 C88 160 96 160 104 160"
          stroke="#d9b289"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        {/* senior fingers */}
        <ellipse cx="220" cy="86" rx="14" ry="10" fill={`url(#${id}-skin)`} />
        <ellipse cx="248" cy="92" rx="14" ry="10" fill={`url(#${id}-skin)`} />
        <ellipse cx="270" cy="104" rx="12" ry="9" fill={`url(#${id}-skin)`} />

        {/* nurse hand (lighter) coming from above */}
        <path
          d="M120 0 C160 0 200 16 220 50 C234 74 232 96 220 116 L196 138 C176 154 152 156 132 144 L80 110 C68 102 60 90 60 76 C60 56 76 28 100 12 C108 6 114 0 120 0 Z"
          fill="#fde7d4"
        />
        {/* nurse hand highlight */}
        <path
          d="M80 60 C100 40 130 30 160 36"
          stroke="#fff8ed"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.6"
          fill="none"
        />
        {/* nurse fingers wrapping */}
        <ellipse cx="80" cy="120" rx="14" ry="10" fill="#fde7d4" />
        <ellipse cx="56" cy="116" rx="12" ry="9" fill="#fde7d4" />
        <ellipse cx="40" cy="100" rx="10" ry="8" fill="#fde7d4" />

        {/* pulse line over the hands as concept */}
        <path
          d="M-20 220 H40 L52 196 L72 244 L92 200 L108 220 H160"
          stroke={`url(#${id}-blue)`}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
        />

        {/* heart accent above */}
        <g transform="translate(280 -10)">
          <path
            d="M0 30 C-22 14 -36 2 -36 -14 C-36 -26 -28 -34 -16 -34 C-8 -34 -2 -30 0 -24 C2 -30 8 -34 16 -34 C28 -34 36 -26 36 -14 C36 2 22 14 0 30 Z"
            fill={`url(#${id}-blue)`}
          />
          <circle cx="0" cy="0" r="48" fill="none" stroke={`url(#${id}-blue)`} strokeOpacity="0.3" strokeDasharray="3 6" strokeWidth="1.5" />
        </g>
      </g>

      {/* sparkle accents */}
      <path
        d="M120 200 L132 200 M126 194 V206"
        stroke="#1f6bff"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M620 280 L632 280 M626 274 V286"
        stroke="#5fd1f0"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Decorative line-art doctor / nurse figure used in dark contact panel as a watermark.
export function ContactPanelArt({ id = "contact-art", className = "" }) {
  return (
    <svg
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
      className={["h-full w-full", className].join(" ")}
      role="img"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-cyan`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5fd1f0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1f6bff" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      <circle cx="160" cy="160" r="148" fill="none" stroke="url(#contact-art-cyan)" strokeOpacity="0.25" strokeWidth="1" />
      <circle cx="160" cy="160" r="116" fill="none" stroke={`url(#${id}-cyan)`} strokeOpacity="0.35" strokeWidth="1" />
      <circle cx="160" cy="160" r="80" fill="none" stroke={`url(#${id}-cyan)`} strokeOpacity="0.5" strokeWidth="1" />

      <g stroke={`url(#${id}-cyan)`} strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M40 200 H88 L100 168 L120 232 L138 184 L150 208 H200" />
      </g>

      <g transform="translate(160 160)">
        <circle cx="0" cy="-30" r="22" fill="none" stroke={`url(#${id}-cyan)`} strokeWidth="2" />
        <path
          d="M-44 60 C-44 28 -22 8 0 8 C22 8 44 28 44 60"
          fill="none"
          stroke={`url(#${id}-cyan)`}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M-12 -38 L-12 -22 L-28 -22 L-28 -10 L-12 -10 L-12 6 L0 6 L0 -10 L16 -10 L16 -22 L0 -22 L0 -38 Z"
          fill="#5fd1f0"
          fillOpacity="0.18"
          stroke="#5fd1f0"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
      </g>

      <circle cx="60" cy="60" r="4" fill="#5fd1f0" opacity="0.6" />
      <circle cx="260" cy="80" r="3" fill="#5fd1f0" opacity="0.5" />
      <circle cx="270" cy="240" r="5" fill="#5fd1f0" opacity="0.5" />
      <circle cx="50" cy="240" r="4" fill="#5fd1f0" opacity="0.55" />
    </svg>
  );
}
