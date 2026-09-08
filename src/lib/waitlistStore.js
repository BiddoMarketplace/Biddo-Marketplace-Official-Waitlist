// Waitlist data layer — backed by a real Supabase database, with real
// Supabase Auth protecting admin access.
//
// Every function still returns a Promise, so nothing in the rest of the app
// (components, pages) needed to change when this moved from localStorage to
// a real backend.

import { supabase } from './supabaseClient'

/** Generate a short, random, URL-safe referral code in the browser, before
 * the signup is ever sent to the database. We do it this way (rather than
 * letting the database generate one and reading it back) because anonymous
 * visitors are only allowed to INSERT into `waitlist`, never SELECT — so a
 * read-back after insert always fails with a row-level-security error,
 * even though the insert itself succeeded. */
function generateReferralCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no 0/O/1/I to avoid confusion
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

/**
 * Add a person to the waitlist.
 * @param {{name: string, contactMethod: 'whatsapp'|'email', contact: string, interest: string, referredBy?: string}} entry
 */
export async function addToWaitlist(entry) {
  const contact = entry.contact.trim()
  const referralCode = generateReferralCode()

  // Duplicate prevention happens at the database level (a unique constraint
  // on the `contact` column), not by reading the table from the client —
  // anonymous visitors are only allowed to INSERT, never SELECT, so a
  // client-side duplicate check can't work here. See the setup guide for
  // the one-time SQL command that adds this constraint.
  const { error } = await supabase.from('waitlist').insert({
    name: entry.name.trim(),
    contact_method: entry.contactMethod,
    contact,
    interest: entry.interest,
    referred_by: entry.referredBy || null,
    referral_code: referralCode,
  })

  if (error) {
    // Postgres error code 23505 = unique constraint violation, i.e. this
    // contact already signed up.
    if (error.code === '23505') {
      return { ok: true, duplicate: true }
    }
    return { ok: false, error: error.message }
  }

  return { ok: true, duplicate: false, referralCode }
}

/** Get every waitlist entry. Only meant to be called from the admin
 * dashboard, after the person has logged in. The "Anyone can join the
 * waitlist" policy on the `waitlist` table only allows INSERT, not SELECT,
 * for anonymous visitors — so reading the list without being logged in as
 * an authenticated admin will simply return no rows once Part 4's policies
 * are in place. */
export async function getWaitlistEntries() {
  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to load waitlist entries:', error.message)
    return []
  }

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    contactMethod: row.contact_method,
    contact: row.contact,
    interest: row.interest,
    createdAt: row.created_at,
    referralCode: row.referral_code,
    referredBy: row.referred_by,
  }))
}

export async function getWaitlistStats() {
  const entries = await getWaitlistEntries()
  const byInterest = entries.reduce((acc, e) => {
    acc[e.interest] = (acc[e.interest] || 0) + 1
    return acc
  }, {})
  return { total: entries.length, byInterest }
}

/** Look up a person's own position in line, referral count, and the total
 * waitlist size, using their referral code. This uses a narrow database
 * function (get_my_waitlist_status) rather than reading the table directly,
 * so it never exposes anyone else's personal details — just numbers. */
export async function getMyWaitlistStatus(referralCode) {
  const { data, error } = await supabase.rpc('get_my_waitlist_status', {
    my_code: referralCode,
  })

  if (error || !data || data.length === 0) {
    return null
  }

  const row = data[0]
  return {
    rank: Number(row.rank),
    referralCount: Number(row.referral_count),
    totalWaitlist: Number(row.total_waitlist),
  }
}

// --- Admin auth, backed by real Supabase Auth --------------------------
// This uses the admin user you created in Supabase (Authentication > Users),
// not a password stored in this file. Supabase issues and manages the
// actual login session, and the "Logged in users can view the waitlist"
// policy on the `waitlist` table ensures only that authenticated session
// can read the data.

export async function adminLogin(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    return { ok: false, error: error.message }
  }
  return { ok: true }
}

export async function isAdminAuthenticated() {
  const { data } = await supabase.auth.getSession()
  return Boolean(data.session)
}

export async function adminLogout() {
  await supabase.auth.signOut()
}
