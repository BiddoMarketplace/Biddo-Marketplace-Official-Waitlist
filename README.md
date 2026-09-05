# Biddo Marketplace — Pre-launch Landing Page

A pre-launch landing page and buyer waitlist for Biddo, a content-first
Indian commerce marketplace. Built with React, Vite, and Tailwind CSS.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/     Landing page sections (Hero, ThreeWays, Loop, etc.)
  pages/          Route-level pages (Confirmation, AdminLogin, AdminDashboard)
  lib/
    waitlistStore.js   Data layer — see note below
    useReveal.js        Scroll-reveal hook
```

### Routes

- `/` — public landing page
- `/welcome` — post-signup confirmation
- `/admin` — founder login (not linked anywhere on the public site)
- `/admin/dashboard` — waitlist dashboard (requires login)

## Important: this is a frontend prototype

`src/lib/waitlistStore.js` currently stores waitlist entries in the
browser's `localStorage`, and the admin "login" is a single hardcoded
password checked entirely on the client. **Neither of these is
production-ready.** They exist so the full public/private flow —
landing page → waitlist → confirmation, and separately, admin login →
dashboard — can be prototyped and demoed end to end.

Before real users touch this:

- Replace `waitlistStore.js`'s functions with calls to a real backend API
  backed by a real database. Every function already returns a `Promise`,
  so call sites in components won't need to change.
- Put real authentication behind the admin routes — hashed credentials,
  server-issued sessions or JWTs, HTTPS, rate limiting. Never ship a
  client-side-only password check.
- Add server-side validation of waitlist submissions (the client-side
  validation in `WaitlistForm.jsx` is a UX nicety, not a security
  boundary).

## Design notes

- Typefaces: Fraunces (display) + Inter (body/UI).
- Palette: warm paper background, near-black ink, amber + crimson accents
  drawn from an auction/bazaar motif rather than generic SaaS gradients.
- No fake traction numbers, testimonials, or press mentions — the copy is
  intentionally honest about being pre-launch.
