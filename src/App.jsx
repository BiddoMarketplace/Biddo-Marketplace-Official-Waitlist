import { useRef } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ThreeWays from './components/ThreeWays'
import Loop from './components/Loop'
import Categories from './components/Categories'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  const ctaRef = useRef(null)

  function scrollToJoin() {
    ctaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="grain">
      <Nav onJoinClick={scrollToJoin} />
      <main>
        <Hero onJoinClick={scrollToJoin} />
        <ThreeWays />
        <Loop />
        <Categories />
        <FAQ />
        <div ref={ctaRef}>
          <FinalCTA />
        </div>
      </main>
      <Footer />
    </div>
  )
}
