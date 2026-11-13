import { useEffect, useState } from 'react'
import { AudioLines, Leaf, MoveHorizontal, Repeat, Ruler, Snowflake, Sun, Wind } from 'lucide-react'
import Reveal, { useInView } from '../Reveal'
import SectionHeading from '../SectionHeading'

type Mode = 'heat' | 'cool'

const modes: Record<
  Mode,
  { label: string; title: string; text: string; strong: string; soft: string; vl: string; rl: string; Icon: typeof Sun }
> = {
  heat: {
    label: 'Heizen',
    title: 'Im Winter: Wärme wie von der Sonne.',
    text: 'Warmes Wasser durchströmt das Segel. Das Segel gibt die Wärme grösstenteils als Strahlung ab. Menschen, Böden und Wände werden direkt erwärmt, ohne Luftzug und ohne aufgewirbelten Staub.',
    strong: '#f0766d',
    soft: '#f7b8b4',
    // HLK-Konvention: Vorlauf rot, Rücklauf blau
    vl: '#f0766d',
    rl: '#4fb3ea',
    Icon: Sun,
  },
  cool: {
    label: 'Kühlen',
    title: 'Im Sommer: Kühle ohne Zugluft.',
    text: 'Durch dasselbe Segel fliesst nun kühles Wasser. Das Segel nimmt die Wärme von Menschen, Geräten und Sonneneinstrahlung auf. Leise, zugfrei und ganz ohne Gebläse.',
    strong: '#6fc0ec',
    soft: '#cde9f7',
    // Kühlen: Vorlauf kräftig blau, Rücklauf hellblau (Rücklauf bleibt in beiden Modi blau)
    vl: '#2fa3e0',
    rl: '#a6d8f2',
    Icon: Snowflake,
  },
}

const benefits = [
  { Icon: Repeat, title: 'Ein System, zwei Jahreszeiten', text: 'Dasselbe Segel heizt im Winter und kühlt im Sommer.' },
  { Icon: Wind, title: 'Zugfrei & leise', text: 'Keine Ventilatoren, kein Rauschen, keine kalten Luftströme.' },
  { Icon: MoveHorizontal, title: 'Freie Wände & Böden', text: 'Die Technik hängt an der Decke. Der Raum bleibt frei nutzbar.' },
  { Icon: AudioLines, title: 'Bessere Akustik', text: 'Segel lassen sich mit Akustikflächen kombinieren und dämpfen Schall.' },
  { Icon: Leaf, title: 'Effizient', text: 'Moderate Wassertemperaturen passen ideal zu Wärmepumpen.' },
  { Icon: Ruler, title: 'Geringe Bauhöhe', text: 'Braucht wenig Abhängehöhe und eignet sich daher auch für Sanierungen.' },
]

const SLATS = Array.from({ length: 10 }, (_, i) => 100 + i * 44)
const WAVES = [0, 0.75, 1.5, 2.25]

function RoomDiagram({ mode }: { mode: Mode }) {
  const m = modes[mode]
  const heat = mode === 'heat'
  return (
    <svg viewBox="0 0 640 430" className="h-auto w-full" role="img" aria-labelledby="diagram-title">
      <title id="diagram-title">
        {heat
          ? 'Querschnitt: Das Deckensegel gibt Wärme als Strahlung nach unten in den Raum ab.'
          : 'Querschnitt: Das Deckensegel nimmt Wärme aus dem Raum auf und kühlt ihn.'}
      </title>
      <defs>
        <pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="9" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
        </pattern>
        <linearGradient id="field" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={m.strong} stopOpacity="0.28" />
          <stop offset="1" stopColor={m.strong} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Decke */}
      <rect x="0" y="0" width="640" height="40" fill="#22272e" />
      <rect x="0" y="0" width="640" height="40" fill="url(#hatch)" />
      <line x1="0" y1="40.5" x2="640" y2="40.5" stroke="rgba(255,255,255,0.14)" />
      <text x="628" y="26" textAnchor="end" className="fill-steel-400 font-mono text-[10px] tracking-[0.15em] uppercase max-sm:hidden">
        Rohdecke
      </text>

      {/* Abhängung */}
      {[160, 474].map((x) => (
        <line key={x} x1={x} y1="40" x2={x} y2="110" stroke="#8d96a1" strokeWidth="1.5" strokeDasharray="3 3" />
      ))}

      {/* Strahlungsfeld */}
      <rect x="100" y="120" width="434" height="210" fill="url(#field)" className="transition-[fill] duration-700" />

      {/* Vor- und Rücklauf */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 58 H104 Q122 58 122 76 V104" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
        <path d="M0 76 H86 Q104 76 104 94 V104" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
        <path
          d="M0 58 H104 Q122 58 122 76 V104"
          stroke={m.vl}
          strokeWidth="3"
          strokeDasharray="8 12"
          className="animate-flow transition-[stroke] duration-700"
        />
        <path
          d="M0 76 H86 Q104 76 104 94 V104"
          stroke={m.rl}
          strokeWidth="3"
          strokeDasharray="8 12"
          className="animate-flow transition-[stroke] duration-700 [animation-direction:reverse]"
        />
      </g>
      <text x="6" y="51" className="fill-steel-400 font-mono text-[10px] tracking-[0.12em] uppercase max-sm:hidden">
        Vorlauf
      </text>
      <text x="6" y="93" className="fill-steel-400 font-mono text-[10px] tracking-[0.12em] uppercase max-sm:hidden">
        Rücklauf
      </text>

      {/* Segel (Lamellen mit Rohren) */}
      {SLATS.map((x) => (
        <g key={x}>
          <rect x={x} y="110" width="38" height="9" rx="2" fill="#d3d8de" />
          <circle cx={x + 19} cy="106" r="4" fill={m.strong} className="transition-[fill] duration-700" />
        </g>
      ))}
      <text x="540" y="118" className="fill-steel-300 font-mono text-[10px] tracking-[0.12em] uppercase max-sm:hidden">
        Segel
      </text>

      {/* Wellen */}
      <g fill="none" stroke={m.soft} strokeWidth="2.5" strokeLinecap="round" className="transition-[stroke] duration-700">
        {WAVES.map((d) => (
          <path
            key={`${mode}-${d}`}
            d={heat ? 'M150 0 Q317 24 484 0' : 'M150 24 Q317 0 484 24'}
            style={{
              transformOrigin: '317px 0px',
              animation: `${heat ? 'wave-down' : 'wave-up'} 3s linear ${d}s infinite both`,
            }}
          />
        ))}
      </g>

      {/* Raum: Boden */}
      <rect x="0" y="400" width="640" height="30" fill="url(#hatch)" />
      <line x1="0" y1="400.5" x2="640" y2="400.5" stroke="rgba(255,255,255,0.18)" />

      {/* Personen & Arbeitsplatz */}
      <g fill="none" stroke="#b3bac3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* stehend */}
        <circle cx="196" cy="238" r="13" />
        <path d="M196 254 V328 M196 328 L184 398 M196 328 L208 398 M196 268 L180 312 M196 268 L212 312" />
        {/* sitzend */}
        <circle cx="350" cy="262" r="13" />
        <path d="M347 278 L340 342 L390 344 L394 398 M345 294 L380 318 L422 322" />
        <path d="M322 350 H362 M342 350 V398 M326 398 H358 M324 350 L318 300" stroke="#6b7480" />
        {/* Tisch & Bildschirm */}
        <path d="M400 330 H548 M412 330 V398 M536 330 V398" stroke="#6b7480" />
        <rect x="452" y="284" width="60" height="38" rx="4" stroke="#6b7480" />
        <path d="M482 322 V330" stroke="#6b7480" />
      </g>
    </svg>
  )
}

export default function Principle() {
  const [mode, setMode] = useState<Mode>('heat')
  const [touched, setTouched] = useState(false)
  const [autoDone, setAutoDone] = useState(false)
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 }, false)

  // Einmaliger automatischer Wechsel Heizen → Kühlen, damit auch Vorbeiscrollende beide Zustände sehen.
  // Keine Dauerschleife; jede Interaktion (Hover, Fokus, Klick) beendet ihn.
  useEffect(() => {
    if (touched || autoDone || !inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setTimeout(() => {
      setMode('cool')
      setAutoDone(true)
    }, 4500)
    return () => window.clearTimeout(t)
  }, [touched, autoDone, inView])

  const select = (m: Mode) => {
    setTouched(true)
    setMode(m)
  }
  const stopAuto = () => setAutoDone(true)

  return (
    <section id="prinzip" className="relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div
        aria-hidden
        className={`pointer-events-none absolute top-1/3 left-1/2 size-[48rem] -translate-x-1/2 rounded-full blur-[140px] transition-colors duration-1000 ${
          mode === 'heat' ? 'bg-heat-500/12' : 'bg-ice-500/14'
        }`}
      />
      <div className="container-x relative">
        <SectionHeading
          dark
          eyebrow="Das Prinzip"
          title="Ein Segel. Zwei Jahreszeiten."
          intro="Heiz- und Kühldeckensegel arbeiten mit Strahlung statt mit bewegter Luft. Das fühlt sich an wie Sonne im Winter und Schatten im Sommer."
        />

        <Reveal
          onPointerEnter={stopAuto}
          onFocusCapture={stopAuto}
          className="mt-12 grid gap-4 sm:gap-6 lg:mt-20 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-0">
          {/* Desktop: gemeinsame Karte hinter Umschalter + Text */}
          <div
            aria-hidden
            className="hidden rounded-[28px] border border-white/[0.08] bg-ink-900 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:block"
          />

          {/* Umschalter – mobil über dem Diagramm, damit man die Änderung sieht */}
          <div className="relative lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:px-10 lg:pt-10">
            <div
              role="group"
              aria-label="Betriebsart"
              className="flex w-full rounded-full border border-white/10 bg-ink-900 p-1 sm:inline-flex sm:w-auto lg:bg-ink-950"
            >
              {(Object.keys(modes) as Mode[]).map((k) => {
                const { label, Icon } = modes[k]
                const selected = mode === k
                return (
                  <button
                    key={k}
                    id={`tab-${k}`}
                    type="button"
                    aria-pressed={selected}
                    aria-controls="prinzip-panel"
                    onClick={() => select(k)}
                    className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-500 sm:flex-none sm:py-2.5 ${
                      selected
                        ? k === 'heat'
                          ? 'bg-heat-300 text-ink-950'
                          : 'bg-ice-300 text-ink-950'
                        : 'text-steel-300 hover:text-white'
                    }`}
                  >
                    <Icon className="size-4" aria-hidden />
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          <div
            ref={ref}
            className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-ink-850 p-3 sm:p-8 lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1"
          >
            <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
            <div className="relative" id="prinzip-panel">
              <RoomDiagram mode={mode} />
              {/* Legende – auf kleinen Bildschirmen statt der (zu kleinen) Beschriftungen im Diagramm */}
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 px-2 pb-2 text-xs text-steel-300 sm:hidden">
                <li className="flex items-center gap-2">
                  <span aria-hidden className="h-[3px] w-5 rounded-full transition-colors duration-700" style={{ background: modes[mode].vl }} />
                  Vorlauf
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden className="h-[3px] w-5 rounded-full transition-colors duration-700" style={{ background: modes[mode].rl }} />
                  Rücklauf
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-5 rounded-sm bg-steel-200" />
                  Segel
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden className="text-sm leading-none transition-colors duration-700" style={{ color: modes[mode].soft }}>
                    {mode === 'heat' ? '↓' : '↑'}
                  </span>
                  {mode === 'heat' ? 'Wärmestrahlung' : 'Wärmeaufnahme'}
                </li>
              </ul>
            </div>
          </div>

          <div className="relative flex flex-col justify-between gap-8 rounded-[28px] border border-white/[0.08] bg-ink-900 p-6 sm:p-10 lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-10 lg:pt-10 lg:pb-10">
            <div className="grid" aria-live={touched ? 'polite' : 'off'}>
              {(Object.keys(modes) as Mode[]).map((k) => (
                <div
                  key={k}
                  aria-hidden={mode !== k}
                  className={`[grid-area:1/1] transition-all duration-700 ${
                    mode === k ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
                  }`}
                >
                  <h3 className={`font-display text-2xl leading-tight font-bold sm:text-3xl ${k === 'heat' ? 'text-heat-200' : 'text-ice-200'}`}>
                    {modes[k].title}
                  </h3>
                  <p className="mt-4 text-[1.05rem] leading-relaxed text-steel-300 sm:mt-5 sm:text-lg">{modes[k].text}</p>
                </div>
              ))}
            </div>

            <p className="eyebrow border-t border-white/10 pt-6 text-steel-400">
              Vorlauf → Segel → Rücklauf · ein geschlossener Wasserkreislauf
            </p>
          </div>
        </Reveal>

        <ul className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.08] sm:mt-6 lg:mt-8 lg:grid-cols-3">
          {benefits.map(({ Icon, title, text }, i) => (
            <li key={title} className="bg-ink-950">
              <Reveal delay={i * 60} className="flex h-full flex-col gap-3 p-4 sm:flex-row sm:gap-5 sm:p-8">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-ink-850 text-ice-200 sm:size-11 sm:rounded-2xl">
                  <Icon className="size-4 sm:size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-[0.95rem] leading-snug font-semibold text-white sm:text-base">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-steel-400 sm:text-base">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
