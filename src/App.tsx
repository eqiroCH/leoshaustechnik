import { useEffect } from 'react'
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Datenschutz, Impressum } from './pages/Legal'

/** Scrollt bei Seitenwechsel nach oben bzw. zum Anker (/#kontakt). */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // kurz warten, bis die Zielseite gerendert ist
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    } else {
      window.scrollTo(0, 0)
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="impressum" element={<Impressum />} />
          <Route path="datenschutz" element={<Datenschutz />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
