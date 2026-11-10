import { useEffect, useRef, useState } from 'react'
import { MoveHorizontal } from 'lucide-react'
import Picture from '../Picture'
import Reveal, { useInView } from '../Reveal'
import SectionHeading from '../SectionHeading'

const clamp = (n: number) => Math.min(100, Math.max(0, n))

export default function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const [nudging, setNudging] = useState(false)
  const [frameRef, inView] = useInView<HTMLDivElement>({ threshold: 0.6 })
  const drag = useRef<{ id: number; x: number; y: number; active: boolean } | null>(null)
  const touched = useRef(false)

  const posFromClientX = (clientX: number) => {
    const r = frameRef.current?.getBoundingClientRect()
    if (!r) return
    setPos(clamp(((clientX - r.left) / r.width) * 100))
  }

  // Einmaliger «Wink», damit klar ist, dass man ziehen kann
  useEffect(() => {
    if (!inView || touched.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const steps: [number, number][] = [
      [250, 36],
      [950, 64],
      [1650, 50],
    ]
    setNudging(true)
    const timers = steps.map(([t, p]) => window.setTimeout(() => !touched.current && setPos(p), t))
    timers.push(window.setTimeout(() => setNudging(false), 2300))
    return () => timers.forEach(clearTimeout)
  }, [inView])

  const stopNudge = () => {
    touched.current = true
    setNudging(false)
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    stopNudge()
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, active: false }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    if (!d.active && Math.abs(e.clientX - d.x) > 4 && Math.abs(e.clientX - d.x) > Math.abs(e.clientY - d.y)) {
      d.active = true
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    if (d.active) posFromClientX(e.clientX)
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (d && !d.active) posFromClientX(e.clientX) // Tippen/Klicken springt an die Stelle
    drag.current = null
  }

  const transition = nudging ? 'cubic-bezier(0.65, 0, 0.35, 1) 650ms' : 'none'

  return (
    <section aria-labelledby="vorher-nachher" className="bg-concrete-100 py-24 sm:py-32">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Vorher / Nachher"
            title={<span id="vorher-nachher">Vom Rohbau zu montierten Deckensegeln.</span>}
            intro="Ein Grossraumbüro vor und nach der Segelmontage. Die Leitungen sind verlegt, die Segel hängen in einer Flucht, und der Raum ist bereit für den Innenausbau."
          />
          <Reveal delay={120} className="mt-8 flex items-center gap-3 text-sm text-ink-600 lg:mt-10">
            <span className="grid size-9 place-items-center rounded-full bg-white text-ink-900 shadow-sm">
              <MoveHorizontal className="size-4" aria-hidden />
            </span>
            Zum Vergleichen über das Bild ziehen
          </Reveal>
        </div>

        <Reveal delay={80} className="lg:col-span-7">
          <div
            ref={frameRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (drag.current = null)}
            className="relative mx-auto aspect-[4/5] max-w-[40rem] cursor-ew-resize touch-pan-y overflow-hidden rounded-[28px] bg-concrete-200 select-none sm:aspect-[5/5.4]"
          >
            <Picture
              name="buero-nachher"
              alt="Nachher: Grossraumbüro mit montierten weissen Heiz- und Kühldeckensegeln"
              sizes="(min-width: 1024px) 55vw, 92vw"
              className="pointer-events-none absolute inset-0"
              imgClassName="size-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)`, transition: nudging ? `clip-path ${transition}` : 'none' }}
            >
              <Picture
                name="buero-vorher"
                alt="Vorher: dasselbe Grossraumbüro im Rohbau, nur Lüftung und Leuchten sind montiert"
                sizes="(min-width: 1024px) 55vw, 92vw"
                className="absolute inset-0"
                imgClassName="size-full object-cover"
                // Die Fotos wurden leicht versetzt aufgenommen – Fluchtpunkt & Horizont angleichen
                style={{ transform: 'translate(9%, 4.2%) scale(1.18)', transformOrigin: '51% 49%' }}
              />
            </div>

            <span className="eyebrow pointer-events-none absolute top-4 left-4 rounded-full bg-ink-950/70 px-3 py-1.5 text-white backdrop-blur sm:top-5 sm:left-5">
              Vorher
            </span>
            <span className="eyebrow pointer-events-none absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-ink-900 backdrop-blur sm:top-5 sm:right-5">
              Nachher
            </span>

            {/* Tastatur & Screenreader: unsichtbarer, aber fokussierbarer Regler */}
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={Math.round(pos)}
              onChange={(e) => {
                stopNudge()
                setPos(Number(e.target.value))
              }}
              aria-label="Vorher-Nachher-Vergleich"
              aria-valuetext={`${Math.round(pos)} Prozent Vorher sichtbar`}
              className="peer sr-only"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white peer-focus-visible:[&>span]:ring-ice-400"
              style={{ left: `${pos}%`, transition: nudging ? `left ${transition}` : 'none' }}
            >
              <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink-950 shadow-xl ring-4 ring-white/30 transition-[box-shadow]">
                <MoveHorizontal className="size-5" />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
