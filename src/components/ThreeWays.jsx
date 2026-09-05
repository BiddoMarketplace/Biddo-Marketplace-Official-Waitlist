import { useReveal } from '../lib/useReveal'

const ways = [
  {
    name: 'Discover',
    copy: 'Find products through content and recommendations, not endless search bars.',
    texture: 'bg-biddo-sand',
  },
  {
    name: 'Buy',
    copy: 'See something you love? Buy it instantly, no waiting around.',
    texture: 'bg-paper border border-biddo-line',
  },
  {
    name: 'Bid',
    copy: 'For products worth competing for, place a bid and own it.',
    texture: 'bg-ink text-paper',
  },
]

export default function ThreeWays() {
  const [ref, visible] = useReveal()

  return (
    <section className="border-y border-biddo-line/70 bg-biddo-sand/40 py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <h2
          ref={ref}
          className={`max-w-xl font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl ${
            visible ? 'animate-rise-in' : 'opacity-0'
          }`}
        >
          One marketplace. Three ways to shop.
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {ways.map((way, i) => (
            <div
              key={way.name}
              className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_-16px_rgba(18,19,15,0.3)] ${way.texture} ${
                visible ? 'animate-rise-in' : 'opacity-0'
              }`}
              style={{ animationDelay: visible ? `${0.1 * i + 0.1}s` : undefined }}
            >
              <span
                className={`pointer-events-none absolute -right-4 -top-4 font-display text-8xl leading-none transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-6 ${
                  way.texture.includes('bg-ink') ? 'text-paper/10' : 'text-ink/5'
                }`}
                aria-hidden="true"
              >
                {way.name[0]}
              </span>
              <h3 className="relative font-display text-2xl transition-transform duration-300 group-hover:translate-x-0.5">
                {way.name}
              </h3>
              <p
                className={`relative mt-4 text-[15px] leading-relaxed ${
                  way.texture.includes('bg-ink') ? 'text-paper/70' : 'text-ink/65'
                }`}
              >
                {way.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
