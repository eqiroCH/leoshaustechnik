import type { AnchorHTMLAttributes } from 'react'
import { Link, useLocation } from 'react-router-dom'

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { id: string }

/**
 * Link auf einen Abschnitt der Startseite.
 * Auf der Startseite ein normaler Anker (sanftes Scrollen), auf anderen Seiten
 * eine Router-Navigation ohne Neuladen – der ScrollManager springt zum Anker.
 */
export default function SectionLink({ id, children, ...rest }: Props) {
  const { pathname } = useLocation()
  if (pathname === '/') {
    return (
      <a href={`#${id}`} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={{ pathname: '/', hash: id }} {...rest}>
      {children}
    </Link>
  )
}
