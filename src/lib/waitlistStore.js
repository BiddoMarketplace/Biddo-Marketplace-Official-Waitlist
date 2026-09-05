// Waitlist data layer.
//
// This is a MOCK implementation backed by localStorage, built only for
// prototyping the frontend experience. It is NOT a database and NOT secure
// storage. Every function here is written as an async call that returns a
// Promise, specifically so this file can be replaced later with real network
// calls (e.g. fetch() to a backend API) without changing any component code
// that depends on it.
//
// To go to production, replace the bodies of these functions with calls to
// a real backend (REST/GraphQL) backed by a real database, and put real
// authentication behind the admin functions. Do not ship this file as-is.

const STORAGE_KEY = 'biddo_waitlist_v1'
const SESSION_KEY = 'biddo_admin_session_v1'

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeAll(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

function simulateLatency(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Add a person to the waitlist.
 * @param {{name: string, contactMethod: 'whatsapp'|'email', contact: string, interest: string}} entry
 */
export async function addToWaitlist(entry) {
  await simulateLatency()
  const entries = readAll()

  const normalizedContact = entry.contact.trim().toLowerCase()
  const alreadyExists = entries.some(
    (e) => e.contact.trim().toLowerCase() === normalizedContact,
  )
  if (alreadyExists) {
    return { ok: true, duplicate: true }
  }

  const newEntry = {
    id: `bd_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: entry.name.trim(),
    contactMethod: entry.contactMethod,
    contact: entry.contact.trim(),
    interest: entry.interest,
    createdAt: new Date().toISOString(),
  }

  entries.push(newEntry)
  writeAll(entries)
  return { ok: true, duplicate: false, entry: newEntry }
}

/** Get every waitlist entry. In production this must require authenticated,
 * authorized backend access — never expose this to the public client. */
export async function getWaitlistEntries() {
  await simulateLatency(200)
  return readAll().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export async function getWaitlistStats() {
  const entries = await getWaitlistEntries()
  const byInterest = entries.reduce((acc, e) => {
    acc[e.interest] = (acc[e.interest] || 0) + 1
    return acc
  }, {})
  return { total: entries.length, byInterest }
}

// --- Mock admin auth -------------------------------------------------
// THIS IS NOT REAL SECURITY. It exists only to demonstrate the intended
// public/private split in the prototype. A real deployment must replace
// this with proper server-side authentication (hashed credentials, session
// tokens or JWTs issued by a backend, HTTPS, rate limiting, etc.) — never
// ship a client-side-only password check like this one.
const DEMO_ADMIN_PASSWORD = 'biddo-founder-2026'

export async function adminLogin(password) {
  await simulateLatency(400)
  if (password === DEMO_ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, 'true')
    return { ok: true }
  }
  return { ok: false, error: 'Incorrect password.' }
}

export function isAdminAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) === 'true'
}

export function adminLogout() {
  sessionStorage.removeItem(SESSION_KEY)
}
