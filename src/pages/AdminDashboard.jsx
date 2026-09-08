import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getWaitlistEntries,
  getWaitlistStats,
  isAdminAuthenticated,
  adminLogout,
} from '../lib/waitlistStore'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState([])
  const [stats, setStats] = useState({ total: 0, byInterest: {} })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    isAdminAuthenticated().then((authed) => {
      if (!active) return
      if (!authed) {
        navigate('/admin', { replace: true })
        return
      }
      load()
    })
    return () => {
      active = false
    }
  }, [navigate])

  async function load() {
    setLoading(true)
    const [e, s] = await Promise.all([getWaitlistEntries(), getWaitlistStats()])
    setEntries(e)
    setStats(s)
    setLoading(false)
  }

  async function handleLogout() {
    await adminLogout()
    navigate('/admin')
  }

  // Count how many people each referral code brought in, then show the
  // top referrers — useful for spotting who's driving the most signups.
  const referralCounts = entries.reduce((acc, e) => {
    if (e.referredBy) acc[e.referredBy] = (acc[e.referredBy] || 0) + 1
    return acc
  }, {})
  const topReferrers = Object.entries(referralCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  const nameByReferralCode = entries.reduce((acc, e) => {
    if (e.referralCode) acc[e.referralCode] = e.name
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-biddo-line/70 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-content items-center justify-between px-5 py-5 sm:px-8">
          <p className="font-display text-xl">Biddo · Founder dashboard</p>
          <button
            onClick={handleLogout}
            className="rounded-full border border-biddo-line px-4 py-2 text-sm text-ink/70 transition-colors hover:border-ink/40 hover:text-ink"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-content px-5 py-10 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total registrations" value={stats.total} />
          {Object.entries(stats.byInterest).map(([interest, count]) => (
            <StatCard key={interest} label={interest} value={count} />
          ))}
        </div>

        {topReferrers.length > 0 && (
          <div className="mt-10 rounded-2xl border border-biddo-line bg-white p-6">
            <p className="font-display text-lg">Top referrers</p>
            <div className="mt-4 space-y-2.5">
              {topReferrers.map(([code, count], i) => (
                <div
                  key={code}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-ink/70">
                    #{i + 1} {nameByReferralCode[code] || 'Unknown'}
                  </span>
                  <span className="font-medium text-ink">
                    {count} {count === 1 ? 'referral' : 'referrals'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 overflow-hidden rounded-2xl border border-biddo-line">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-biddo-sand/50 text-ink/60">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Contact</th>
                  <th className="px-5 py-3 font-medium">Interest</th>
                  <th className="px-5 py-3 font-medium">Referred by</th>
                  <th className="px-5 py-3 font-medium">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-biddo-line">
                {loading && (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-ink/50">
                      Loading…
                    </td>
                  </tr>
                )}
                {!loading && entries.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-ink/50">
                      No registrations yet.
                    </td>
                  </tr>
                )}
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-5 py-3.5">{entry.name}</td>
                    <td className="px-5 py-3.5 text-ink/70">
                      {entry.contact}
                      <span className="ml-2 text-xs text-ink/40">
                        ({entry.contactMethod})
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-ink/70">{entry.interest}</td>
                    <td className="px-5 py-3.5 text-ink/50">
                      {entry.referredBy
                        ? nameByReferralCode[entry.referredBy] || 'Someone'
                        : '—'}
                    </td>
                    <td className="px-5 py-3.5 text-ink/50">
                      {new Date(entry.createdAt).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-xs text-ink/40">
          Access to this page is protected by Supabase Auth, and only your
          admin account can read this data.
        </p>
      </main>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-biddo-line bg-white p-5">
      <p className="font-display text-3xl">{value}</p>
      <p className="mt-1 text-sm text-ink/55">{label}</p>
    </div>
  )
}
