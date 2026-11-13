import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Play, X } from 'lucide-react'
import Picture from '../Picture'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import { gallery, galleryCategories, type GalleryCategory, type GalleryItem } from '../../data/site'

const INITIAL = 12
type Filter = 'alle' | GalleryCategory

/** Fortschrittsbalken für das mobile Wisch-Karussell */
function useScrollProgress<T extends HTMLElement>(deps: unknown[]) {
  const ref = useRef<T>(null)
  const [state, setState] = useState({ progress: 0, ratio: 1 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = el.scrollWidth - el.clientWidth
        setState({ progress: max > 0 ? el.scrollLeft / max : 0, ratio: el.scrollWidth ? el.clientWidth / el.scrollWidth : 1 })
      })
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, deps)
  return [ref, state] as const
}

function Lightbox({
  items,
  index,
  onClose,
  onNav,
}: {
  items: GalleryItem[]
  index: number
  onClose: () => void
  onNav: (dir: 1 | -1) => void
}) {
  const item = items[index]
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Video starten – mit Ton, sonst (Autoplay-Sperre des Browsers) stumm
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {
      v.muted = true
      v.play().catch(() => {})
    })
  }, [item])

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      // Fokus im Dialog halten
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = [...dialogRef.current.querySelectorAll<HTMLElement>('button, video[controls]')]
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        } else if (!dialogRef.current.contains(document.activeElement)) {
          e.preventDefault()
          first.focus()
        }
      }
      if (e.key === 'Escape') onClose()
      // Pfeiltasten nicht abfangen, wenn das Video den Fokus hat (dort spulen sie)
      if (document.activeElement?.tagName === 'VIDEO') return
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
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}: ${item.caption}`}
      className="fixed inset-0 z-[60] flex flex-col bg-ink-950/95 backdrop-blur-sm [animation:fade-up_.4s_var(--ease-out-expo)_both]"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 text-white sm:px-8">
        <p className="font-mono text-sm text-steel-400">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
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
        {item.video ? (
          <video
            ref={videoRef}
            key={item.video.src}
            src={item.video.src}
            poster={`/images/${item.image}-800.jpg`}
            controls
            playsInline
            preload="metadata"
            className="max-h-full max-w-full rounded-2xl bg-black"
          />
        ) : (
          <Picture
            key={item.image}
            name={item.image}
            alt={`${item.title}: ${item.caption}`}
            sizes="100vw"
            blur={false}
            className="contents"
            imgClassName="max-h-full max-w-full rounded-2xl object-contain [animation:fade-up_.5s_var(--ease-out-expo)_both]"
          />
        )}
        {[-1, 1].map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => onNav(dir as 1 | -1)}
            aria-label={dir === -1 ? 'Vorheriges Element' : 'Nächstes Element'}
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

function Tile({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block h-full w-full overflow-hidden rounded-[20px] bg-ink-800 text-left sm:h-auto"
      aria-label={item.video ? `Video abspielen: ${item.title}` : `${item.title} vergrössern`}
    >
      <Picture
        name={item.image}
        alt={`${item.title}: ${item.caption}`}
        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 80vw"
        imgClassName="h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105 sm:h-auto"
      />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-transparent" />
      {item.video && (
        <span aria-hidden className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink-950 shadow-xl transition-transform group-hover:scale-110">
          <Play className="size-5 translate-x-0.5" />
        </span>
      )}
      {item.video && (
        <span className="eyebrow absolute top-3 left-3 rounded-full bg-ink-950/70 px-2.5 py-1 text-white backdrop-blur">
          Video · {item.video.duration}
        </span>
      )}
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
        <span>
          <span className="block font-semibold text-white">{item.title}</span>
          <span className="mt-0.5 block text-sm text-steel-200">{item.caption}</span>
        </span>
        {!item.video && (
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Maximize2 className="size-4" aria-hidden />
          </span>
        )}
      </span>
    </button>
  )
}

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('alle')
  const [showAll, setShowAll] = useState(false)
  const [open, setOpen] = useState<number | null>(null)

  const filtered = useMemo(() => (filter === 'alle' ? gallery : gallery.filter((g) => g.category === filter)), [filter])
  const visible = showAll ? filtered : filtered.slice(0, INITIAL)
  const [trackRef, scroll] = useScrollProgress<HTMLDivElement>([filter, showAll])

  const close = useCallback(() => setOpen(null), [])
  const nav = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? null : (i + dir + filtered.length) % filtered.length)),
    [filtered.length],
  )

  const choose = (f: Filter) => {
    setFilter(f)
    setShowAll(false)
    trackRef.current?.scrollTo({ left: 0 })
  }

  const counts = useMemo(() => {
    const c: Record<string, number> = { alle: gallery.length }
    for (const g of gallery) c[g.category] = (c[g.category] ?? 0) + 1
    return c
  }, [])
  const filters: { id: Filter; label: string }[] = [{ id: 'alle', label: 'Alle' }, ...galleryCategories]

  return (
    <section id="projekte" className="bg-ink-950 py-24 text-white sm:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            dark
            className="lg:col-span-8"
            eyebrow="Projekte"
            title="Einblicke von der Baustelle."
            intro="Spitäler, Hochschulen, Büros und Wohnbauten: Fotos und Videos aus Projekten, bei denen wir Deckensegel, Gipskühldecken und die Feinverteilung montiert haben."
          />
          <Reveal delay={100} className="lg:col-span-4 lg:text-right">
            <p className="text-steel-400">
              <span className="sm:hidden">Wischen für mehr, antippen für die Grossansicht.</span>
              <span className="max-sm:hidden">Für die Grossansicht auf ein Bild klicken.</span>
            </p>
          </Reveal>
        </div>

        {/* Filter */}
        <div role="group" aria-label="Projekte filtern" className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 lg:mt-14 [&::-webkit-scrollbar]:hidden">
          {filters.map((f) => {
            const active = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => choose(f.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  active ? 'border-white bg-white text-ink-950' : 'border-white/15 text-steel-200 hover:border-white/40 hover:text-white'
                }`}
              >
                {f.label}
                <span className={`font-mono text-xs ${active ? 'text-ink-600' : 'text-steel-400'}`}>{counts[f.id]}</span>
              </button>
            )
          })}
        </div>

        {/* Mobil: Wisch-Karussell · ab sm: Masonry in Originalformaten */}
        <div
          ref={trackRef}
          aria-live="polite"
          className="-mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:block sm:columns-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 md:columns-3 lg:columns-4 [&::-webkit-scrollbar]:hidden"
        >
          {visible.map((g, i) => (
            <Reveal
              key={`${filter}-${g.image}`}
              delay={(i % 4) * 60}
              className="aspect-[3/4] w-[78%] shrink-0 snap-start sm:mb-4 sm:aspect-auto sm:w-auto sm:break-inside-avoid"
            >
              <Tile item={g} onOpen={() => setOpen(i)} />
            </Reveal>
          ))}
        </div>

        {/* Fortschritt des Karussells (nur mobil) */}
        <div aria-hidden className="mt-6 h-[3px] overflow-hidden rounded-full bg-white/10 sm:hidden">
          <div
            className="bg-thermal h-full rounded-full"
            style={{
              width: `${Math.max(scroll.ratio * 100, 8)}%`,
              transform: `translateX(${scroll.progress * (100 / Math.max(scroll.ratio, 0.08) - 100)}%)`,
            }}
          />
        </div>

        {filtered.length > INITIAL && !showAll && (
          <div className="mt-8 flex justify-center sm:mt-10">
            <button type="button" onClick={() => setShowAll(true)} className="btn btn-ghost">
              Alle {filtered.length} Bilder & Videos anzeigen
            </button>
          </div>
        )}
      </div>

      {open !== null && <Lightbox items={filtered} index={open} onClose={close} onNav={nav} />}
    </section>
  )
}
