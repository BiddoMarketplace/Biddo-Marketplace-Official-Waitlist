import { useEffect, useState } from 'react'

export default function Nav({ onJoinClick }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToSection(e, id) {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-paper/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'border-biddo-line shadow-[0_4px_20px_-8px_rgba(18,19,15,0.15)]' : 'border-transparent'
      }`}
    >
      <nav
        className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8"
        aria-label="Primary"
      >
        <a
          href="#top"
          onClick={(e) => scrollToSection(e, 'top')}
          className="font-display text-2xl tracking-tight text-ink"
        >
          Biddo
        </a>
        <div className="hidden items-center gap-8 text-sm text-ink/70 md:flex">
          {[
            { id: 'how-it-works', label: 'How it works' },
            { id: 'categories', label: 'Categories' },
            { id: 'faq', label: 'FAQ' },
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="group relative py-1 transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <button
          onClick={onJoinClick}
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-transform hover:scale-[1.03] active:scale-[0.98] sm:px-5"
        >
          Join the waitlist
        </button>
      </nav>
    </header>
  )
}
