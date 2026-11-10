import Hero from '../components/sections/Hero'
import Marquee from '../components/sections/Marquee'
import Services from '../components/sections/Services'
import Principle from '../components/sections/Principle'
import BeforeAfter from '../components/sections/BeforeAfter'
import Gallery from '../components/sections/Gallery'
import Process from '../components/sections/Process'
import About from '../components/sections/About'
import Contact from '../components/sections/Contact'
import MobileCTA from '../components/MobileCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Principle />
      <BeforeAfter />
      <Gallery />
      <Process />
      <About />
      <Contact />
      <MobileCTA />
    </>
  )
}
