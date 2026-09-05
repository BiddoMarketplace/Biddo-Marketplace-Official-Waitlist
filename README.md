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

## Data and auth

`src/lib/waitlistStore.js` connects to a real Supabase project:

- Waitlist signups are saved to a real Postgres table (`waitlist`), with a
  unique constraint on `contact` to prevent duplicate signups.
- Admin access (`/admin`, `/admin/dashboard`) is protected by real Supabase
  Auth — the admin account is created directly in your Supabase project
  under Authentication > Users, not stored anywhere in this codebase.
- Row Level Security policies on the `waitlist` table allow anyone to
  INSERT (join the waitlist), but only authenticated (logged-in) users to
  SELECT (view the list) — see the setup guide for the exact SQL used.

You'll need a `.env` file (see `.env.example`) with:

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-publishable-key
```

**Never commit your real `.env` file to a public place.** `.env` is already
listed in `.gitignore`, but if you're uploading files to GitHub manually
through the website (rather than using `git` commands), double check you
don't include it in the upload.

## Design notes

- Typefaces: Fraunces (display) + Inter (body/UI).
- Palette: warm paper background, near-black ink, amber + crimson accents
  drawn from an auction/bazaar motif rather than generic SaaS gradients.
- No fake traction numbers, testimonials, or press mentions — the copy is
  intentionally honest about being pre-launch.
