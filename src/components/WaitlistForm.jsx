import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { addToWaitlist } from '../lib/waitlistStore'

const interests = [
  'Anime & Collectibles',
  'Gaming',
  'Fashion & Streetwear',
  'Electronics',
  'Other',
]

export default function WaitlistForm({ id }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const referredBy = searchParams.get('ref') || null
  const [contactMethod, setContactMethod] = useState('whatsapp')
  const [form, setForm] = useState({ name: '', contact: '', interest: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [shakeKey, setShakeKey] = useState(0)
  const formRef = useRef(null)

  useEffect(() => {
    if (shakeKey === 0) return
    const node = formRef.current
    if (!node) return
    node.classList.remove('animate-shake')
    // Force reflow so the animation can restart even if triggered again quickly.
    void node.offsetWidth
    node.classList.add('animate-shake')
  }, [shakeKey])

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your name.'

    const contact = form.contact.trim()
    if (!contact) {
      next.contact = contactMethod === 'whatsapp' ? 'Enter your WhatsApp number.' : 'Enter your email.'
    } else if (contactMethod === 'whatsapp') {
      const digits = contact.replace(/[\s()-]/g, '')
      if (!/^\d{10}$/.test(digits)) {
        next.contact = 'Enter a 10-digit phone number (no country code).'
      }
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
        next.contact = 'Enter a valid email.'
      }
    }

    if (!form.interest) next.interest = 'Pick what you’re interested in.'
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')
    const validation = validate()
    setErrors(validation)
    if (Object.keys(validation).length > 0) {
      setShakeKey((k) => k + 1)
      return
    }

    setSubmitting(true)
    try {
      const result = await addToWaitlist({
        name: form.name,
        contactMethod,
        contact: form.contact,
        interest: form.interest,
        referredBy,
      })
      if (result.ok) {
        navigate('/welcome', {
          state: {
            name: form.name.trim().split(' ')[0],
            referralCode: result.referralCode,
          },
        })
      } else {
        setSubmitError('Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div id={id} className="rounded-3xl border border-biddo-line bg-paper p-6 sm:p-9">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink/80">
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-2 w-full rounded-xl border border-biddo-line bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-ink/40"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 animate-fade-slide-in text-sm text-biddo-crimson">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="contact" className="block text-sm font-medium text-ink/80">
              {contactMethod === 'whatsapp' ? 'WhatsApp number' : 'Email'}
            </label>
            <div className="flex rounded-full bg-biddo-sand/60 p-1 text-xs font-medium">
              <button
                type="button"
                onClick={() => {
                  setContactMethod('whatsapp')
                  setForm({ ...form, contact: '' })
                  setErrors({ ...errors, contact: undefined })
                }}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  contactMethod === 'whatsapp' ? 'bg-ink text-paper' : 'text-ink/60'
                }`}
                aria-pressed={contactMethod === 'whatsapp'}
              >
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => {
                  setContactMethod('email')
                  setForm({ ...form, contact: '' })
                  setErrors({ ...errors, contact: undefined })
                }}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  contactMethod === 'email' ? 'bg-ink text-paper' : 'text-ink/60'
                }`}
                aria-pressed={contactMethod === 'email'}
              >
                Email
              </button>
            </div>
          </div>
          <input
            id="contact"
            type={contactMethod === 'whatsapp' ? 'tel' : 'email'}
            inputMode={contactMethod === 'whatsapp' ? 'tel' : 'email'}
            autoComplete={contactMethod === 'whatsapp' ? 'tel' : 'email'}
            placeholder={contactMethod === 'whatsapp' ? '98765 43210' : 'you@example.com'}
            maxLength={contactMethod === 'whatsapp' ? 10 : undefined}
            value={form.contact}
            onChange={(e) => {
              const value =
                contactMethod === 'whatsapp'
                  ? e.target.value.replace(/\D/g, '').slice(0, 10)
                  : e.target.value
              setForm({ ...form, contact: value })
            }}
            className="mt-2 w-full rounded-xl border border-biddo-line bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-ink/40"
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? 'contact-error' : undefined}
          />
          {errors.contact && (
            <p id="contact-error" className="mt-1.5 animate-fade-slide-in text-sm text-biddo-crimson">
              {errors.contact}
            </p>
          )}
          {!errors.contact && contactMethod === 'whatsapp' && (
            <p className="mt-1.5 text-xs text-ink/40">
              10 digits, no country code (e.g. 98765 43210)
            </p>
          )}
        </div>

        <fieldset>
          <legend className="block text-sm font-medium text-ink/80">
            What are you interested in?
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {interests.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => setForm({ ...form, interest: option })}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  form.interest === option
                    ? 'border-ink bg-ink text-paper'
                    : 'border-biddo-line bg-white text-ink/70 hover:border-ink/40'
                }`}
                aria-pressed={form.interest === option}
              >
                {option}
              </button>
            ))}
          </div>
          {errors.interest && (
            <p className="mt-1.5 animate-fade-slide-in text-sm text-biddo-crimson">{errors.interest}</p>
          )}
        </fieldset>

        {submitError && (
          <p role="alert" className="animate-fade-slide-in text-sm text-biddo-crimson">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="group relative w-full overflow-hidden rounded-full bg-biddo-crimson py-3.5 text-base font-medium text-paper shadow-[0_6px_0_0_#8f3120] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_0_0_#8f3120] active:translate-y-0.5 active:shadow-[0_1px_0_0_#8f3120] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="relative z-10">
            {submitting ? 'Joining…' : 'Join the Biddo waitlist'}
          </span>
          {!submitting && (
            <span
              className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0"
              aria-hidden="true"
            />
          )}
        </button>
      </form>
    </div>
  )
}
