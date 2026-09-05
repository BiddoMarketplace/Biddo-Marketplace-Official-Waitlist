import { useEffect, useState } from 'react'

const cards = [
  {
    tag: 'Watching now',
    title: 'Hand-glazed ceramic vase set',
    meta: 'watching',
    price: '₹2,499',
    mode: 'buy',
    hue: 'bg-biddo-sand',
    baseCount: 2400,
  },
  {
    tag: 'Live bid',
    title: 'Vintage film camera, restored',
    meta: 'ends in 4h',
    price: '₹6,200',
    mode: 'bid',
    hue: 'bg-ink text-paper',
    baseCount: 11,
  },
  {
    tag: 'From a reel',
    title: 'Oversized graphic hoodie',
    meta: 'seen in a 30s clip',
    price: '₹1,799',
    mode: 'buy',
    hue: 'bg-biddo-amber/90',
    baseCount: null,
  },
]

export default function Hero({ onJoinClick }) {
  const [watchers, setWatchers] = useState(cards[0].baseCount)
  const [bids, setBids] = useState(cards[1].baseCount)
  const [tickWatch, setTickWatch] = useState(0)
  const [tickBid, setTickBid] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const watchInterval = setInterval(() => {
      setWatchers((w) => w + Math.floor(Math.random() * 3) + 1)
      setTickWatch((t) => t + 1)
    }, 2600)
    const bidInterval = setInterval(() => {
      setBids((b) => b + 1)
      setTickBid((t) => t + 1)
    }, 4200)
    return () => {
      clearInterval(watchInterval)
      clearInterval(bidInterval)
    }
  }, [])

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20">
      <div className="mx-auto grid max-w-content gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
        <div>
          <p
            className="mb-5 animate-rise-in text-sm font-medium text-biddo-crimson"
            style={{ animationDelay: '0.05s' }}
          >
            Launching soon in India
          </p>
          <h1
            className="font-display leading-[0.95] tracking-tight text-ink"
            style={{ fontSize: 'clamp(2.75rem, 9vw, 4.5rem)' }}
          >
            <span
              className="block animate-rise-in"
              style={{ animationDelay: '0.12s' }}
            >
              Discover it.
            </span>
            <span
              className="relative inline-block animate-rise-in"
              style={{ animationDelay: '0.22s' }}
            >
              Watch it.
              <svg
                className="absolute -bottom-1 left-0 w-full sm:-bottom-2"
                viewBox="0 0 300 18"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  className="animate-underline-draw"
                  d="M2 12C60 4 130 4 298 10"
                  stroke="#E8A33D"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span
              className="block animate-rise-in"
              style={{ animationDelay: '0.32s' }}
            >
              Buy it.
            </span>
          </h1>
          <p
            className="mt-7 max-w-md animate-rise-in text-lg leading-relaxed text-ink/75"
            style={{ animationDelay: '0.42s' }}
          >
            Biddo is a new kind of marketplace where you discover products
            through content, watch what catches your eye, and choose to buy
            or bid.
          </p>
          <div
            className="mt-9 flex animate-rise-in flex-wrap items-center gap-4"
            style={{ animationDelay: '0.52s' }}
          >
            <button
              onClick={onJoinClick}
              className="group relative overflow-hidden rounded-full bg-biddo-crimson px-7 py-3.5 text-base font-medium text-paper shadow-[0_6px_0_0_#8f3120] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_0_0_#8f3120] active:translate-y-0.5 active:shadow-[0_1px_0_0_#8f3120]"
            >
              <span className="relative z-10">Join the waitlist</span>
              <span
                className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0"
                aria-hidden="true"
              />
            </button>
            <span className="text-sm text-ink/55">
              Free · takes 20 seconds
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
          <div className="relative flex flex-col gap-4">
            {cards.map((card, i) => (
              <div
                key={card.title}
                className={`animate-ticket-drop animate-float rounded-2xl border border-ink/10 p-5 shadow-[0_10px_30px_-12px_rgba(18,19,15,0.25)] transition-transform duration-300 will-change-transform hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-14px_rgba(18,19,15,0.35)] ${card.hue}`}
                style={{
                  animationDelay: `${0.15 * i + 0.2}s, ${1.4 + i * 0.6}s`,
                  transform: `rotate(${i === 0 ? -1.5 : i === 1 ? 1 : -0.8}deg)`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-medium ${
                      card.mode === 'bid' ? 'text-biddo-amber' : 'text-ink/60'
                    }`}
                  >
                    {card.mode === 'bid' && (
                      <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-biddo-crimson align-middle" />
                    )}
                    {card.tag}
                  </span>
                  <span className="font-display text-lg">{card.price}</span>
                </div>
                <p className="mt-3 font-display text-xl leading-snug">
                  {card.title}
                </p>
                <p
                  className={`mt-2 text-xs ${
                    card.hue === 'bg-ink text-paper' ? 'text-paper/60' : 'text-ink/50'
                  }`}
                >
                  {i === 0 && (
                    <span key={tickWatch} className="inline-block animate-count-tick tabular-nums">
                      {watchers.toLocaleString('en-IN')}
                    </span>
                  )}
                  {i === 1 && (
                    <span key={tickBid} className="inline-block animate-count-tick tabular-nums">
                      {bids} bids
                    </span>
                  )}
                  {i === 0 && ' ' + card.meta}
                  {i === 1 && ' · ' + card.meta}
                  {i === 2 && card.meta}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-ink/40 lg:text-left">
            An early look at how discovery could feel on Biddo.
          </p>
        </div>
      </div>
    </section>
  )
}
