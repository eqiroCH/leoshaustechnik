import { useEffect } from 'react'
import { company } from './data/site'

export type PageMeta = { title: string; description: string; noindex?: boolean }

const DEFAULT_DESCRIPTION =
  "Heiz- & Kühldeckensegel, Gipskühldecken und Feinverteilung aus Buchrain LU – montiert für Spitäler, Hochschulen, Büros und Wohnbauten in der ganzen Schweiz."

/** Meta-Daten pro Route – wird im Browser (useSeo) und beim Prerendern (scripts/prerender.mjs) verwendet. */
export const pages: Record<string, PageMeta> = {
  '/': {
    title: "Heiz- & Kühldeckensegel, Feinverteilung | Leo's Haustechnik",
    description: DEFAULT_DESCRIPTION,
  },
  '/impressum': {
    title: "Impressum | Leo's Haustechnik",
    description: `Impressum der ${company.name}, ${company.street}, ${company.zip} ${company.city} ${company.canton}.`,
  },
  '/datenschutz': {
    title: "Datenschutz | Leo's Haustechnik",
    description: `Datenschutzerklärung der ${company.name}: welche Daten diese Website bearbeitet und welche Rechte Sie haben.`,
  },
}

export const notFoundMeta: PageMeta = {
  title: "Seite nicht gefunden | Leo's Haustechnik",
  description: DEFAULT_DESCRIPTION,
  noindex: true,
}

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

/** Aktualisiert Title, Description, Canonical, OG-Tags und robots bei Client-Navigation. */
export function useSeo(path: string, meta: PageMeta = pages[path] ?? notFoundMeta) {
  useEffect(() => {
    const url = `${company.url}${path === '/' ? '/' : path}`
    document.title = meta.title
    setMeta('meta[name="description"]', 'content', meta.description)
    setMeta('meta[property="og:title"]', 'content', meta.title)
    setMeta('meta[property="og:description"]', 'content', meta.description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('link[rel="canonical"]', 'href', url)

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (meta.noindex) {
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.appendChild(robots)
      }
      robots.content = 'noindex'
    } else {
      robots?.remove()
    }
  }, [path, meta])
}
