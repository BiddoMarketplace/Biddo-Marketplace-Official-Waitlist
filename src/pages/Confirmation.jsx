import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getMyWaitlistStatus } from '../lib/waitlistStore'

export default function Confirmation() {
  const location = useLocation()
  const name = location.state?.name
  const referralCode = location.state?.referralCode
  const [status, setStatus] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!referralCode) return
    let active = true
    getMyWaitlistStatus(referralCode).then((result) => {
      if (active) setStatus(result)
    })
    return () => {
      active = false
    }
  }, [referralCode])

  const referralLink = referralCode
    ? `${window.location.origin}${window.location.pathname}#/?ref=${referralCode}`
    : null

  const shareMessage = `I just joined the Biddo Marketplace waitlist \u2014 a new way to discover, buy and bid on products. Join with my link and we both move up the line: ${referralLink}`

  function handleCopy() {
    if (!referralLink) return
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

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

        {status && (
          <div
            className="mt-8 animate-rise-in rounded-3xl border border-biddo-line bg-paper p-6"
            style={{ animationDelay: '0.45s' }}
          >
            <p className="font-display text-3xl">
              You're #{status.rank.toLocaleString('en-IN')}
            </p>
            <p className="mt-1 text-sm text-ink/55">
              out of {status.totalWaitlist.toLocaleString('en-IN')} on the list
              so far
            </p>

            <div className="mt-6 border-t border-biddo-line pt-6">
              <p className="text-sm font-medium text-ink/80">
                Skip the line
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
                Share your link. Every friend who joins moves you up.
                {status.referralCount > 0 && (
                  <>
                    {' '}
                    You've already brought in{' '}
                    <span className="font-medium text-ink">
                      {status.referralCount}
                    </span>{' '}
                    {status.referralCount === 1 ? 'person' : 'people'}.
                  </>
                )}
              </p>

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <button
                  onClick={handleCopy}
                  className="flex-1 rounded-full border border-biddo-line bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/40"
                >
                  {copied ? 'Copied!' : 'Copy my link'}
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
                >
                  Share on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        <div
          className="mt-12 animate-rise-in"
          style={{ animationDelay: '0.55s' }}
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
