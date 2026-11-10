import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { useInView } from './Reveal'

type Props = {
  className?: string
  label?: string
  caption?: string
}

const prefersReducedData = () => {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return Boolean(c?.saveData)
}

export default function VideoCard({ className = '', label = 'Rundgang · Holz-Hybridbau', caption }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [wrapRef, inView] = useInView<HTMLDivElement>({ threshold: 0.35, rootMargin: '0px' }, false)
  const [playing, setPlaying] = useState(false)
  const [userPaused, setUserPaused] = useState(false)

  const autoAllowed =
    typeof window !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !prefersReducedData()

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (inView && autoAllowed && !userPaused) {
      v.play().catch(() => setPlaying(false))
    } else if (!inView) {
      v.pause()
    }
  }, [inView, autoAllowed, userPaused])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      setUserPaused(false)
      v.play().catch(() => {})
    } else {
      setUserPaused(true)
      v.pause()
    }
  }

  return (
    <div ref={wrapRef} className={`group relative overflow-hidden rounded-[28px] bg-ink-800 ring-1 ring-white/10 ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        src="/media/rundgang-holzbau.mp4"
        poster="/media/rundgang-holzbau-poster.webp"
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label="Video: Rundgang durch einen Holz-Hybridbau mit Feinverteilungsleitungen an der Decke"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/50 via-transparent to-ink-950/85" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-ink-950/60 px-3 py-1.5 text-white backdrop-blur-md">
          <span className={`size-1.5 rounded-full ${playing ? 'bg-heat-400 animate-pulse' : 'bg-steel-400'}`} />
          {label}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
        {caption && <p className="max-w-[16rem] text-sm leading-snug text-white/90">{caption}</p>}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Video pausieren' : 'Video abspielen'}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-white/90 text-ink-950 shadow-lg transition-transform hover:scale-105"
        >
          {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4 translate-x-px" aria-hidden />}
        </button>
      </div>
    </div>
  )
}
