/**
 * Querschnitt einer Gipskühldecke – als Bild-Ersatz, solange es kein Projektfoto gibt.
 * Gleiche Bildsprache wie das Prinzip-Diagramm (Linien, Eis-/Wärmefarben).
 */
const REGISTERS = Array.from({ length: 14 }, (_, i) => 44 + i * 24)

export default function GipsDiagram({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex flex-col overflow-hidden bg-ink-900 ${className}`}>
      <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
      <div aria-hidden className="absolute -bottom-24 left-1/2 size-[26rem] -translate-x-1/2 rounded-full bg-ice-500/15 blur-[90px]" />
      <svg
        viewBox="0 0 400 410"
        preserveAspectRatio="xMidYMid meet"
        className="relative min-h-0 w-full flex-1"
        role="img"
        aria-label="Querschnitt einer Gipskühldecke: Unter der Rohdecke hängt eine Unterkonstruktion, darauf liegen Kühl- und Heizregister über einer geschlossenen Gipsplatte. Der Raum darunter wird gleichmässig temperiert."
      >
        <defs>
          <pattern id="gips-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="9" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
          </pattern>
          <linearGradient id="gips-field" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6fc0ec" stopOpacity="0.3" />
            <stop offset="1" stopColor="#6fc0ec" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Rohdecke */}
        <rect x="0" y="56" width="400" height="44" fill="#22272e" />
        <rect x="0" y="56" width="400" height="44" fill="url(#gips-hatch)" />
        <line x1="0" y1="100.5" x2="400" y2="100.5" stroke="rgba(255,255,255,0.14)" />

        {/* Abhängung + Unterkonstruktion */}
        {[60, 200, 340].map((x) => (
          <g key={x}>
            <line x1={x} y1="100" x2={x} y2="168" stroke="#8d96a1" strokeWidth="2" />
            <rect x={x - 5} y="160" width="10" height="6" rx="1" fill="#8d96a1" />
          </g>
        ))}
        <rect x="20" y="168" width="360" height="6" rx="1.5" fill="#6b7480" />

        {/* Register (Rohre im Schnitt) auf Wärmeleitblech */}
        {REGISTERS.map((x, i) => (
          <circle key={x} cx={x} cy="186" r="5.5" fill={i % 2 ? '#cde9f7' : '#6fc0ec'} />
        ))}
        <rect x="28" y="192" width="344" height="3" rx="1" fill="#b3bac3" />

        {/* Gipsplatte – geschlossen von Wand zu Wand */}
        <rect x="0" y="195" width="400" height="15" fill="#eef0f2" />
        <line x1="0" y1="210.5" x2="400" y2="210.5" stroke="rgba(0,0,0,0.25)" />

        {/* Temperiertes Raumfeld */}
        <rect x="0" y="211" width="400" height="171" fill="url(#gips-field)" />
        <g fill="none" stroke="#cde9f7" strokeWidth="2.5" strokeLinecap="round">
          <path d="M90 262 Q200 248 310 262" opacity="0.75" />
          <path d="M70 298 Q200 284 330 298" opacity="0.45" />
          <path d="M50 334 Q200 320 350 334" opacity="0.2" />
        </g>

        {/* Wohnraum: Sofa, Stehleuchte, Pflanze */}
        <g fill="none" stroke="#b3bac3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="78" y="334" width="112" height="24" rx="7" />
          <rect x="64" y="352" width="140" height="22" rx="7" />
          <path d="M76 374 V381 M192 374 V381" />
          <path d="M252 381 V302 M238 302 H266 L259 284 H245 Z M242 381 H262" stroke="#8d96a1" />
          <path d="M306 381 L311 359 H331 L336 381 Z M321 359 Q306 338 313 320 M321 359 Q337 337 330 316 M321 359 V312" stroke="#8d96a1" />
        </g>

        {/* Boden */}
        <rect x="0" y="382" width="400" height="28" fill="url(#gips-hatch)" />
        <line x1="0" y1="382.5" x2="400" y2="382.5" stroke="rgba(255,255,255,0.18)" />
      </svg>

      <ul className="relative flex flex-wrap gap-x-5 gap-y-2 px-5 pb-5 text-xs text-steel-300 sm:px-6 sm:pb-6 sm:text-[0.8rem]">
        <li className="flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-full bg-ice-400" />
          Kühl- & Heizregister
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-1.5 w-5 rounded-sm bg-[#eef0f2]" />
          Gipsplatte, fugenlos geschlossen
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="text-sm leading-none text-ice-200">↑</span>
          Wärmeaufnahme aus dem Raum
        </li>
      </ul>
    </div>
  )
}
