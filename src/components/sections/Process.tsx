import { useInView } from '../Reveal'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import { process } from '../../data/site'

export default function Process() {
  const [ref, inView] = useInView<HTMLOListElement>({ threshold: 0.3 })

  return (
    <section id="ablauf" className="relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="container-x relative">
        <SectionHeading
          dark
          eyebrow="Ablauf"
          title="Von der Anfrage bis zur dichten Leitung."
          intro="Klare Schritte, direkte Ansprechpartner und eine Montage, die sich nach Ihrem Bauprogramm richtet."
        />

        <ol ref={ref} className="relative mt-16 grid gap-10 sm:mt-20 lg:grid-cols-4 lg:gap-8">
          {/* Leitung: horizontal (Desktop) */}
          <span aria-hidden className="absolute top-6 right-0 left-6 hidden h-[3px] rounded-full bg-white/10 lg:block" />
          <span
            aria-hidden
            className={`bg-thermal absolute top-6 right-0 left-6 hidden h-[3px] origin-left rounded-full transition-transform duration-[2.2s] ease-[var(--ease-out-expo)] lg:block ${
              inView ? 'scale-x-100' : 'scale-x-0'
            }`}
          />
          {/* Leitung: vertikal (Mobile) */}
          <span aria-hidden className="absolute top-6 bottom-6 left-6 w-[3px] rounded-full bg-white/10 lg:hidden" />
          <span
            aria-hidden
            className={`absolute top-6 bottom-6 left-6 w-[3px] origin-top rounded-full bg-gradient-to-b from-ice-400 to-heat-400 transition-transform duration-[2.2s] ease-[var(--ease-out-expo)] lg:hidden ${
              inView ? 'scale-y-100' : 'scale-y-0'
            }`}
          />

          {process.map((step, i) => (
            <li key={step.no}>
              <Reveal delay={i * 140} className="relative pl-20 lg:pl-0">
                <span className="absolute top-0 left-0 grid size-12 place-items-center rounded-full border border-white/15 bg-ink-850 font-mono text-sm font-semibold text-white lg:relative">
                  {step.no}
                </span>
                <h3 className="font-display text-xl font-bold text-white lg:mt-8 lg:text-2xl">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-steel-300">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
