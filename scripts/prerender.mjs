// Rendert /, /impressum und /datenschutz nach dem Build zu statischem HTML (SEO + schnellerer erster Inhalt).
// Erwartet: dist/ (Client-Build) und dist-server/entry-server.js (SSR-Build). Aufruf: npm run build
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const serverEntry = path.resolve('dist-server/entry-server.js')
const { render, pages, siteUrl } = await import(pathToFileURL(serverEntry).href)

const template = await readFile(path.join(dist, 'index.html'), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function withHead(html, { title, description, url, noindex }) {
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${esc(description)}$2`)
  if (url) {
    out = out
      .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`)
      .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`)
  } else {
    out = out.replace(/\s*<link\s+rel="canonical"[^>]*>/, '').replace(/\s*<meta\s+property="og:url"[^>]*>/, '')
  }
  if (noindex) out = out.replace('</title>', '</title>\n    <meta name="robots" content="noindex" />')
  return out
}

for (const [route, meta] of Object.entries(pages)) {
  const appHtml = render(route)
  const url = `${siteUrl}${route === '/' ? '/' : route}`
  const html = withHead(template, { ...meta, url }).replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  // /impressum → impressum.html: Netlify liefert das ohne 301-Umleitung auf /impressum/ aus
  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, `${route.slice(1)}.html`)
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, html)
  console.log(`✓ ${route} → ${path.relative(process.cwd(), file)} (${(html.length / 1024).toFixed(1)} kB)`)
}

// 404: leere Shell (rendert im Browser die NotFound-Seite), nicht indexieren
const notFound = withHead(template, {
  title: "Seite nicht gefunden | Leo's Haustechnik",
  description: pages['/'].description,
  url: null,
  noindex: true,
})
await writeFile(path.join(dist, '404.html'), notFound)
console.log('✓ 404 → dist/404.html')

await rm(path.resolve('dist-server'), { recursive: true, force: true })
