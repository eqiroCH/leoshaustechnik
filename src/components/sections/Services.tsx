import { ArrowUpRight } from 'lucide-react'
import Picture from '../Picture'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import { services, type Service } from '../../data/site'

const toneDot: Record<Service['tone'], string> = {
  cold: 'bg-ice-400',
  warm: 'bg-heat-400',
  neutral: 'bg-thermal',
}

const scope = ['Holz-, Beton- und Hybridbau', 'Büro, Labor, Schule, Werkhalle', 'Einzelgewerk oder Komplettpaket']

export default function Services() {
  return (
    <section id="leistungen" className="relative bg-concrete-50 py-24 sm:py-32">
      <div className="bg-grid-dark pointer-events-none absolute inset-x-0 top-0 h-[28rem] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-8"
            eyebrow="Leistungen"
            title={
              <>
                Alles zwischen <span className="text-steel-500">Steigzone</span> und Segel.
              </>
            }
            intro="Wir haben uns auf eine Sache spezialisiert und machen sie richtig: Heiz- und Kühldecken, inklusive der Leitungen, die sie versorgen. So bleibt die Verantwortung in einer Hand."
          />
          <Reveal delay={120} className="lg:col-span-4">
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {scope.map((s) => (
                <li key={s} className="rounded-full border border-ink-900/10 bg-white px-4 py-2 text-sm font-medium text-ink-700">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-20 space-y-24 sm:mt-28 sm:space-y-32">
          {services.map((s, i) => {
            const flip = i % 2 === 1
            return (
              <article key={s.id} id={s.id} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <Reveal className={`lg:col-span-6 ${flip ? 'lg:order-2 lg:col-start-7' : ''}`}>
                  <div className="group relative overflow-hidden rounded-[28px] bg-concrete-200">
                    <Picture
                      name={s.image}
                      alt={s.alt}
                      sizes="(min-width: 1024px) 46vw, 92vw"
                      imgClassName="aspect-[4/4.4] w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 backdrop-blur">
                      <span aria-hidden className={`size-2 rounded-full ${toneDot[s.tone]}`} />
                      <span className="eyebrow text-ink-800">{s.kicker}</span>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={120} className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
                  <p className="font-mono text-sm text-steel-500">
                    <span className="text-ink-900">{s.no}</span> / 0{services.length}
                  </p>
                  <h3 className="font-display mt-4 text-3xl leading-[1.08] font-bold text-ink-950 text-balance sm:text-[2.6rem]">
                    {s.title}
                  </h3>
                  <p className="mt-6 text-lg leading-relaxed text-ink-600 text-pretty">{s.text}</p>
                  <ul className="mt-8 divide-y divide-ink-900/10 border-y border-ink-900/10">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-4 py-4 text-[0.98rem] text-ink-800">
                        <span aria-hidden className={`mt-2 size-1.5 shrink-0 rounded-full ${toneDot[s.tone]}`} />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#kontakt"
                    className="group/link mt-8 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-ink-950"
                  >
                    <span className="border-b border-ink-950/30 pb-0.5 transition-colors group-hover/link:border-ink-950">
                      Dafür eine Offerte anfragen
                    </span>
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      aria-hidden
                    />
                  </a>
                </Reveal>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
