import { useReveal } from '../lib/useReveal'
import WaitlistForm from './WaitlistForm'

export default function FinalCTA() {
  const [ref, visible] = useReveal()

  return (
    <section className="bg-ink py-20 text-paper sm:py-28">
      <div
        ref={ref}
        className="mx-auto grid max-w-content gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16"
      >
        <div className={visible ? 'animate-rise-in' : 'opacity-0'}>
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            Be there for the first drop.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/70">
            Join the Biddo early-access list and be among the first to
            experience a new way to discover, buy and bid.
          </p>
        </div>

        <div
          className={visible ? 'animate-rise-in' : 'opacity-0'}
          style={{ animationDelay: visible ? '0.15s' : undefined }}
        >
          <WaitlistForm id="waitlist-final" />
        </div>
      </div>
    </section>
  )
}
