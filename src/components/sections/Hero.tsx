import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Picture from '../Picture'
import VideoCard from '../VideoCard'
import { company } from '../../data/site'

const specs = [
  { label: 'Spezialisiert auf', value: 'Heiz- & Kühldecken' },
  { label: 'Gegründet', value: String(company.founded) },
  { label: 'Firmensitz', value: `${company.city} ${company.canton}` },
]

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink-950 text-white">
      {/* Hintergrund */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Picture
          name="werkhalle-deckensegel"
          alt=""
          priority
          blur={false}
          className="absolute inset-0"
          imgClassName="size-full object-cover opacity-45 [object-position:60%_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/60" />
        <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="absolute -top-40 -left-40 size-[36rem] rounded-full bg-ice-500/15 blur-[120px]" />
        <div className="absolute -right-32 -bottom-48 size-[34rem] rounded-full bg-heat-500/15 blur-[120px]" />
      </div>

      <div className="container-x grid min-h-[100svh] items-center gap-12 pt-28 pb-24 lg:grid-cols-12 lg:gap-10 lg:pt-32 lg:pb-20">
        <div className="lg:col-span-8">
          <p className="eyebrow flex items-center gap-3 text-steel-300 [animation:fade-up_1s_var(--ease-out-expo)_both]">
            <span aria-hidden className="bg-thermal inline-block h-px w-10" />
            Haustechnik aus {company.city} {company.canton} · seit {company.founded}
          </p>

          <h1 className="font-display mt-7 text-[clamp(2.55rem,10.6vw,5.75rem)] leading-[0.95] font-bold [font-stretch:115%]">
            <span className="block text-heat-300 [animation:fade-up_1s_var(--ease-out-expo)_0.08s_both]">Heizen.</span>
            <span className="block text-ice-300 [animation:fade-up_1s_var(--ease-out-expo)_0.16s_both]">Kühlen.</span>
            <span className="block [animation:fade-up_1s_var(--ease-out-expo)_0.24s_both]">Fein&shy;verteilung.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-steel-200 text-pretty sm:text-xl [animation:fade-up_1s_var(--ease-out-expo)_0.34s_both]">
            Wir montieren Heiz- und Kühldeckensegel und bauen die Feinverteilung dahinter: vom Steigstrang bis zum
            letzten Anschluss. Präzise, sauber und termintreu, für Büro, Labor und Gewerbe.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 [animation:fade-up_1s_var(--ease-out-expo)_0.42s_both]">
            <a href="#kontakt" className="btn btn-primary">
              Projekt anfragen
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <a href="#leistungen" className="btn btn-ghost">
              Leistungen ansehen
            </a>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-1 gap-y-5 border-t border-white/10 pt-7 sm:grid-cols-3 sm:gap-x-8 [animation:fade-up_1s_var(--ease-out-expo)_0.5s_both]">
            {specs.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-4 sm:block">
                <dt className="eyebrow text-steel-400">{s.label}</dt>
                <dd className="text-base font-semibold text-white sm:mt-2 sm:text-lg">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hidden lg:col-span-4 lg:block [animation:fade-up_1.2s_var(--ease-out-expo)_0.3s_both]">
          <div className="relative mx-auto w-full max-w-[22rem]">
            <div aria-hidden className="bg-thermal absolute -inset-px rounded-[29px] opacity-50 blur-xl" />
            <VideoCard
              className="relative aspect-[9/16] max-h-[74vh] w-full"
              caption="Feinverteilung im Holz-Hybridbau, vom Steigstrang bis an die Decke."
            />
          </div>
        </div>
      </div>

      <a
        href="#leistungen"
        aria-label="Weiter zu den Leistungen"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-steel-400 transition-colors hover:text-white md:flex"
      >
        <span className="eyebrow">Scrollen</span>
        <ArrowDown className="size-4 animate-bounce" aria-hidden />
      </a>
    </section>
  )
}
