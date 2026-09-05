import { Link, useLocation } from 'react-router-dom'

export default function Confirmation() {
  const location = useLocation()
  const name = location.state?.name

  return (
    <div className="grain flex min-h-screen flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
      <div className="max-w-lg">
        <div className="relative mx-auto mb-8 flex h-16 w-16 items-center justify-center">
          <span
            className="absolute inset-0 animate-ring-expand rounded-full border-2 border-biddo-amber"
            aria-hidden="true"
          />
          <div className="relative flex h-16 w-16 animate-scale-pop items-center justify-center rounded-full bg-biddo-amber">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                className="animate-check-draw"
                d="M4 12.5L9.5 18L20 6"
                stroke="#12130F"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h1
          className="animate-rise-in font-display text-5xl tracking-tight sm:text-6xl"
          style={{ animationDelay: '0.15s' }}
        >
          You're in{name ? `, ${name}` : ''}.
        </h1>
        <p
          className="mt-5 animate-rise-in text-lg leading-relaxed text-ink/70"
          style={{ animationDelay: '0.25s' }}
        >
          Welcome to Biddo. We'll let you know when we're ready for you.
        </p>

        <div
          className="mt-9 inline-flex animate-rise-in items-center gap-2 rounded-full border border-biddo-line bg-biddo-sand/50 px-5 py-2.5 text-sm text-ink/70"
          style={{ animationDelay: '0.35s' }}
        >
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-biddo-crimson" aria-hidden="true" />
          You're now on the early-access list
        </div>

        <div
          className="mt-12 animate-rise-in"
          style={{ animationDelay: '0.45s' }}
        >
          <Link
            to="/"
            className="text-sm font-medium text-ink/60 underline decoration-biddo-line underline-offset-4 transition-colors hover:text-ink"
          >
            Back to Biddo
          </Link>
        </div>
      </div>
    </div>
  )
}
