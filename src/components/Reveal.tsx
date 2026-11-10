import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

export function useInView<T extends Element>(options: IntersectionObserverInit = {}, once = true) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  const { root = null, rootMargin = '0px 0px -10% 0px', threshold = 0.15 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { root, rootMargin, threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [root, rootMargin, threshold, once])

  return [ref, inView] as const
}

type RevealProps = Omit<React.HTMLAttributes<HTMLElement>, 'children'> & {
  as?: ElementType
  delay?: number
  className?: string
  children: ReactNode
}

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <Tag
      {...rest}
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}
