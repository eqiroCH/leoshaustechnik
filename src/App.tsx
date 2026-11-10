import { useEffect, useRef } from 'react'
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Datenschutz, Impressum } from './pages/Legal'
import { notFoundMeta, useSeo } from './seo'

/**
 * Scroll-Verhalten bei Navigation:
 * – neue Seite: sofort nach oben (bzw. sofort zum Anker, z. B. /#kontakt von einer Rechtsseite)
 * – Anker auf derselben Seite: sanft scrollen
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const prevPath = useRef<string | null>(null)

  useEffect(() => {
    const isFirst = prevPath.current === null
    const pathChanged = prevPath.current !== pathname
    prevPath.current = pathname
    const behavior: ScrollBehavior = isFirst || pathChanged ? 'instant' : 'smooth'

    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior }))
    } else if (pathChanged && !isFirst) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])
  return null
}

function Layout() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function NotFound() {
  const { pathname } = useLocation()
  useSeo(pathname, notFoundMeta)
  return (
    <section className="flex min-h-[80vh] items-center bg-ink-950 pt-24 text-white">
      <div className="container-x">
        <p className="eyebrow text-steel-400">Fehler 404</p>
        <h1 className="font-display mt-5 text-5xl font-bold sm:text-7xl">
          Hier führt <span className="text-thermal">keine Leitung</span> hin.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-steel-300">Die gesuchte Seite existiert nicht oder wurde verschoben.</p>
        <Link to="/" className="btn btn-primary mt-10">
          Zur Startseite
        </Link>
      </div>
    </section>
  )
}

/** Routen ohne Router – damit sie im Browser (BrowserRouter) und beim Prerendern (StaticRouter) laufen. */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="impressum" element={<Impressum />} />
        <Route path="datenschutz" element={<Datenschutz />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
