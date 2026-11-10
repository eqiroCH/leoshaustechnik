import { useState } from 'react'
import { MoveHorizontal } from 'lucide-react'
import Picture from '../Picture'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'

export default function BeforeAfter() {
  const [pos, setPos] = useState(50)

  return (
    <section aria-labelledby="vorher-nachher" className="bg-concrete-100 py-24 sm:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Vorher / Nachher"
            title={<span id="vorher-nachher">Vom Rohbau zur fertigen Klimadecke.</span>}
            intro="Ein Grossraumbüro vor und nach der Segelmontage. Die Leitungen sind gezogen, die Segel hängen in einer Flucht, und der Raum ist bereit für den Innenausbau."
          />
          <Reveal delay={120} className="mt-10 hidden items-center gap-3 text-sm text-ink-600 lg:flex">
            <span className="grid size-9 place-items-center rounded-full bg-white text-ink-900 shadow-sm">
              <MoveHorizontal className="size-4" aria-hidden />
            </span>
            Regler ziehen, um zu vergleichen
          </Reveal>
        </div>

        <Reveal delay={80} className="lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-concrete-200 select-none sm:aspect-[5/5.4]">
            <Picture
              name="buero-nachher"
              alt="Nachher: Grossraumbüro mit montierten weissen Heiz- und Kühldeckensegeln"
              sizes="(min-width: 1024px) 55vw, 92vw"
              className="absolute inset-0"
              imgClassName="size-full object-cover"
            />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <Picture
                name="buero-vorher"
                alt="Vorher: dasselbe Grossraumbüro im Rohbau, nur Lüftung und Leuchten sind montiert"
                sizes="(min-width: 1024px) 55vw, 92vw"
                className="absolute inset-0"
                imgClassName="size-full object-cover"
                // Die Fotos wurden leicht versetzt aufgenommen – Fluchtpunkt & Horizont angleichen
                style={{ transform: 'translate(9%, 4.2%) scale(1.16)', transformOrigin: '51% 49%' }}
              />
            </div>

            <span className="eyebrow absolute top-5 left-5 rounded-full bg-ink-950/70 px-3 py-1.5 text-white backdrop-blur">
              Vorher
            </span>
            <span className="eyebrow absolute top-5 right-5 rounded-full bg-white/90 px-3 py-1.5 text-ink-900 backdrop-blur">
              Nachher
            </span>

            <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${pos}%` }}>
              <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink-950 shadow-xl ring-4 ring-white/30">
                <MoveHorizontal className="size-5" />
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              step={0.5}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Vorher-Nachher-Vergleich: Regler verschieben"
              aria-valuetext={`${Math.round(pos)} Prozent Vorher`}
              className="absolute inset-0 size-full cursor-ew-resize appearance-none opacity-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
