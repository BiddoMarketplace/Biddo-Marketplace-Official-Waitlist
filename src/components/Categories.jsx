import { useReveal } from '../lib/useReveal'

const categories = [
  { name: 'Anime & collectibles', note: 'figures, cards, limited drops' },
  { name: 'Gaming', note: 'consoles, peripherals, rare finds' },
  { name: 'Fashion & streetwear', note: 'drops, resale, one-offs' },
  { name: 'Electronics', note: 'gadgets worth a closer look' },
  { name: 'Something else entirely', note: "if it's interesting, it belongs here" },
]

export default function Categories() {
  const [headRef, headVisible] = useReveal()
  const [ref, visible] = useReveal()

  return (
    <section id="categories" className="py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div ref={headRef} className={headVisible ? 'animate-rise-in' : 'opacity-0'}>
          <h2 className="max-w-xl font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            Starting broad, on purpose.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/70">
            Biddo isn't a niche collectibles site. These are just where we're
            starting.
          </p>
        </div>

        <div ref={ref} className="mt-12 flex flex-wrap gap-3">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              className={`group rounded-2xl border border-biddo-line bg-paper px-6 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_10px_24px_-14px_rgba(18,19,15,0.3)] ${
                visible ? 'animate-rise-in' : 'opacity-0'
              }`}
              style={{ animationDelay: visible ? `${0.08 * i}s` : undefined }}
            >
              <p className="font-display text-lg transition-transform duration-300 group-hover:-translate-y-0.5">
                {cat.name}
              </p>
              <p className="mt-1 text-xs text-ink/50">{cat.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
