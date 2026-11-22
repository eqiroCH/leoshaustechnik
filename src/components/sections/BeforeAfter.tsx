import { MoveHorizontal } from 'lucide-react'
import CompareSlider from '../CompareSlider'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'

export default function BeforeAfter() {
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
          <CompareSlider
            className="mx-auto aspect-[4/5] max-w-[40rem] rounded-[28px] sm:aspect-[5/5.4]"
            before={{
              name: 'buero-vorher',
              alt: 'Vorher: dasselbe Grossraumbüro im Rohbau, nur Lüftung und Leuchten sind montiert',
              // Die Fotos wurden leicht versetzt aufgenommen – Fluchtpunkt & Horizont angleichen
              style: { transform: 'translate(9%, 4.2%) scale(1.18)', transformOrigin: '51% 49%' },
            }}
            after={{
              name: 'buero-nachher',
              alt: 'Nachher: Grossraumbüro mit montierten weissen Heiz- und Kühldeckensegeln',
            }}
          />
        </Reveal>
      </div>
    </section>
  )
}
