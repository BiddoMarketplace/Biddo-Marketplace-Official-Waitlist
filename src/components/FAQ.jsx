import { useState } from 'react'
import { useReveal } from '../lib/useReveal'

const faqs = [
  {
    q: 'Is Biddo live yet?',
    a: "Not yet. We're in pre-launch, building the marketplace and validating it with early users before opening it up.",
  },
  {
    q: 'What does joining the waitlist actually get me?',
    a: "Early access when we launch, and a say in what we build. We'll reach out on WhatsApp or email as soon as we're ready for you — no spam before that.",
  },
  {
    q: "What's the difference between buying and bidding?",
    a: 'Most products on Biddo are fixed price — see it, buy it. A smaller set of limited or high-demand items go up for bidding instead, so the price reflects real interest.',
  },
  {
    q: 'Do I need to be a seller to join?',
    a: "No. This waitlist is for buyers. We'll open a separate path for sellers closer to launch.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const [headRef, headVisible] = useReveal()
  const [ref, visible] = useReveal()

  return (
    <section id="faq" className="border-t border-biddo-line/70 py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <h2
          ref={headRef}
          className={`font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl ${
            headVisible ? 'animate-rise-in' : 'opacity-0'
          }`}
        >
          Questions, answered plainly.
        </h2>

        <div ref={ref} className="mt-12 max-w-2xl divide-y divide-biddo-line">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={item.q}
                className={visible ? 'animate-rise-in' : 'opacity-0'}
                style={{ animationDelay: visible ? `${0.08 * i}s` : undefined }}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg transition-transform duration-200 sm:text-xl">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/20 text-lg transition-all duration-300 ${
                      isOpen ? 'rotate-45 border-ink/40' : ''
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-lg translate-y-0 text-[15px] leading-relaxed text-ink/65 transition-transform duration-300">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p
          className={`mt-10 text-sm text-ink/55 ${visible ? 'animate-rise-in' : 'opacity-0'}`}
          style={{ animationDelay: visible ? `${0.08 * faqs.length}s` : undefined }}
        >
          Still have a question?{' '}
          <a
            href="mailto:biddomarketplace@gmail.com"
            className="font-medium text-ink underline decoration-biddo-line underline-offset-4 transition-colors hover:text-biddo-crimson"
          >
            Email us
          </a>{' '}
          — we read everything.
        </p>
      </div>
    </section>
  )
}
