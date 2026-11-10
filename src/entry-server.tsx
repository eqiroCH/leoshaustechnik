// Einstiegspunkt fürs Prerendern (scripts/prerender.mjs) – läuft nur beim Build in Node.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'
import { pages } from './seo'
import { company } from './data/site'

export { pages }
export const siteUrl = company.url

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}
