import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import Picture from '../Picture'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import VideoCard from '../VideoCard'
import { gallery } from '../../data/site'

const spanClass = {
  tall: 'row-span-2',
  wide: 'sm:col-span-2',
  big: 'sm:col-span-2 row-span-2',
} as const

function Lightbox({ index, onClose, onNav }: { index: number; onClose: () => void; onNav: (dir: 1 | -1) => void }) {
  const item = gallery[index]
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      prev?.focus()
    }
  }, [onClose, onNav])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}: ${item.caption}`}
      className="fixed inset-0 z-[60] flex flex-col bg-ink-950/95 backdrop-blur-sm [animation:fade-up_.4s_var(--ease-out-expo)_both]"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 text-white sm:px-8">
        <p className="font-mono text-sm text-steel-400">
          {String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Schliessen"
          className="grid size-11 place-items-center rounded-full border border-white/15 hover:bg-white/10"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.stopPropagation()}>
        <Picture
          key={item.image}
          name={item.image}
          alt={`${item.title}: ${item.caption}`}
          sizes="100vw"
          blur={false}
          className="contents"
          imgClassName="max-h-full max-w-full rounded-2xl object-contain [animation:fade-up_.5s_var(--ease-out-expo)_both]"
        />
        {[-1, 1].map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => onNav(dir as 1 | -1)}
            aria-label={dir === -1 ? 'Vorheriges Bild' : 'Nächstes Bild'}
            className={`absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 ${
              dir === -1 ? 'left-3 sm:left-6' : 'right-3 sm:right-6'
            }`}
          >
            {dir === -1 ? <ChevronLeft className="size-5" aria-hidden /> : <ChevronRight className="size-5" aria-hidden />}
          </button>
        ))}
      </div>
      <div className="px-5 py-5 text-center sm:px-8" onClick={(e) => e.stopPropagation()}>
        <p className="font-semibold text-white">{item.title}</p>
        <p className="mt-1 text-sm text-steel-400">{item.caption}</p>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const nav = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? null : (i + dir + gallery.length) % gallery.length)),
    [],
  )

  return (
    <section id="projekte" className="bg-ink-950 py-24 text-white sm:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            dark
            className="lg:col-span-8"
            eyebrow="Projekte"
            title="Einblicke von der Baustelle."
            intro="Büros, Labore und Werkhallen: Ein Auszug aus Projekten, bei denen wir Segel montiert und die Feinverteilung gebaut haben."
          />
          <Reveal delay={100} className="lg:col-span-4 lg:text-right">
            <p className="text-steel-400">Bild antippen für die Grossansicht.</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-flow-row-dense auto-rows-[220px] grid-cols-1 gap-3 sm:auto-rows-[240px] sm:grid-cols-2 sm:gap-4 lg:mt-20 lg:auto-rows-[260px] lg:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal key={g.image} delay={(i % 4) * 70} className={`${g.span ? spanClass[g.span] : ''}`}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block size-full overflow-hidden rounded-[22px] bg-ink-800 text-left"
                aria-label={`${g.title} vergrössern`}
              >
                <Picture
                  name={g.image}
                  alt={`${g.title}: ${g.caption}`}
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                  className="absolute inset-0"
                  imgClassName="size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent opacity-90" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <span>
                    <span className="block font-semibold text-white">{g.title}</span>
                    <span className="mt-0.5 block text-sm text-steel-300">{g.caption}</span>
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 className="size-4" aria-hidden />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
          {/* Video nur auf dem Smartphone – ab Desktop läuft es im Hero */}
          <Reveal className="row-span-2 sm:hidden">
            <VideoCard className="size-full !rounded-[22px]" caption="Rundgang: Feinverteilung im Holzbau." />
          </Reveal>
        </div>
      </div>

      {open !== null && <Lightbox index={open} onClose={close} onNav={nav} />}
    </section>
  )
}
