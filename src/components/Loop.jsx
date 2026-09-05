import { useReveal } from '../lib/useReveal'

export default function Loop() {
  const [headRef, headVisible] = useReveal()
  const [ref, visible] = useReveal()

  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div
          ref={headRef}
          className={`max-w-xl ${headVisible ? 'animate-rise-in' : 'opacity-0'}`}
        >
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            The content is the storefront.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Most marketplaces start with a search bar. Biddo starts with
            something worth watching — the product comes after.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-16 grid gap-0 overflow-hidden rounded-3xl border border-biddo-line sm:grid-cols-3"
        >
          <LoopStep
            title="Discover"
            desc="A short video or post surfaces a product you didn't know you wanted."
            visual={<ReelVisual animate={visible} />}
            visible={visible}
            delay={0}
          />
          <LoopStep
            title="Watch"
            desc="Save it, follow along, see the price move or the interest build."
            visual={<WatchVisual animate={visible} />}
            border
            visible={visible}
            delay={0.15}
          />
          <LoopStep
            title="Buy or bid"
            desc="Fixed price, buy now. Limited piece, place a bid and see it through."
            visual={<DecideVisual animate={visible} />}
            border
            visible={visible}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  )
}

function LoopStep({ title, desc, visual, border, visible, delay }) {
  return (
    <div
      className={`group bg-paper p-8 transition-colors duration-300 hover:bg-biddo-sand/30 ${
        border ? 'border-t border-biddo-line sm:border-l sm:border-t-0' : ''
      } ${visible ? 'animate-rise-in' : 'opacity-0'}`}
      style={{ animationDelay: visible ? `${delay}s` : undefined }}
    >
      <div className="flex h-28 items-center justify-center rounded-2xl bg-biddo-sand/50 transition-transform duration-300 group-hover:scale-105">
        {visual}
      </div>
      <h3 className="mt-6 font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/60">{desc}</p>
    </div>
  )
}

function ReelVisual({ animate }) {
  return (
    <svg width="64" height="72" viewBox="0 0 64 72" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="60" height="68" rx="10" stroke="#12130F" strokeWidth="2" fill="#F5F1E8" />
      <path
        d="M25 26L44 36L25 46V26Z"
        fill="#C4432B"
        className={animate ? 'animate-pulse-dot' : ''}
        style={{ animationDuration: '2.4s' }}
      />
    </svg>
  )
}

function WatchVisual({ animate }) {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <circle cx="36" cy="36" r="22" stroke="#12130F" strokeWidth="2" fill="none" />
      <circle cx="36" cy="36" r="4" fill="#E8A33D" />
      <path
        d="M36 20V36L47 43"
        stroke="#12130F"
        strokeWidth="2"
        strokeLinecap="round"
        className={animate ? 'animate-spin-slow' : ''}
        style={{ transformOrigin: '36px 36px' }}
      />
    </svg>
  )
}

function DecideVisual({ animate }) {
  return (
    <svg width="80" height="60" viewBox="0 0 80 60" fill="none" aria-hidden="true">
      <rect
        x="4"
        y="12"
        width="32"
        height="36"
        rx="6"
        fill="#F5F1E8"
        stroke="#12130F"
        strokeWidth="2"
        className={`origin-center transition-transform duration-300 ${animate ? 'hover:scale-105' : ''}`}
      />
      <text x="20" y="34" fontSize="11" fontFamily="Inter" fill="#12130F" textAnchor="middle">Buy</text>
      <rect x="44" y="12" width="32" height="36" rx="6" fill="#12130F" />
      <text x="60" y="34" fontSize="11" fontFamily="Inter" fill="#E8A33D" textAnchor="middle">Bid</text>
    </svg>
  )
}
