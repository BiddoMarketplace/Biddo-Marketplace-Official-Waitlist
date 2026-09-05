import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin, isAdminAuthenticated } from '../lib/waitlistStore'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const result = await adminLogin(password)
    setSubmitting(false)
    if (result.ok) {
      navigate('/admin/dashboard')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5 text-paper">
      <div className="w-full max-w-sm">
        <p className="font-display text-2xl">Biddo</p>
        <h1 className="mt-6 font-display text-3xl">Founder access</h1>
        <p className="mt-2 text-sm text-paper/60">
          This area is private and not linked from the public site.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-paper/80">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-paper/20 bg-ink px-4 py-3 text-paper outline-none transition-colors focus:border-paper/50"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'password-error' : undefined}
            />
            {error && (
              <p id="password-error" role="alert" className="mt-1.5 text-sm text-biddo-amber">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-biddo-amber py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
          >
            {submitting ? 'Checking…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-8 text-xs text-paper/40">
          Prototype notice: this login is a local demo, not production
          authentication. Replace with real backend auth before launch.
        </p>
      </div>
    </div>
  )
}
