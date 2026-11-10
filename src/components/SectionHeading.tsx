import type { ReactNode } from 'react'
import Reveal from './Reveal'

type Props = {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  dark?: boolean
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({ eyebrow, title, intro, dark = false, align = 'left', className = '' }: Props) {
  const center = align === 'center'
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <p className={`eyebrow flex items-center gap-3 ${center ? 'justify-center' : ''} ${dark ? 'text-steel-300' : 'text-steel-500'}`}>
        <span aria-hidden className="bg-thermal inline-block h-px w-8" />
        {eyebrow}
      </p>
      <h2
        className={`font-display mt-5 text-[2.1rem] leading-[1.05] font-bold text-balance sm:text-5xl lg:text-[3.6rem] ${
          dark ? 'text-white' : 'text-ink-950'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-6 text-lg leading-relaxed text-pretty ${dark ? 'text-steel-300' : 'text-ink-600'}`}>{intro}</p>
      )}
    </Reveal>
  )
}
