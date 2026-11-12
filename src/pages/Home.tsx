import Hero from '../components/sections/Hero'
import Marquee from '../components/sections/Marquee'
import Services from '../components/sections/Services'
import Principle from '../components/sections/Principle'
import BeforeAfter from '../components/sections/BeforeAfter'
import Gallery from '../components/sections/Gallery'
import References from '../components/sections/References'
import Process from '../components/sections/Process'
import About from '../components/sections/About'
import Contact from '../components/sections/Contact'
import MobileCTA from '../components/MobileCTA'
import { useSeo } from '../seo'

export default function Home() {
  useSeo('/')
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Principle />
      <BeforeAfter />
      <Gallery />
      <References />
      <Process />
      <About />
      <Contact />
      <MobileCTA />
    </>
  )
}
