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
    if (!isAdminAuthenticated()) {
      navigate('/admin', { replace: true })
      return
    }
    load()
  }, [navigate])

  async function load() {
    setLoading(true)
    const [e, s] = await Promise.all([getWaitlistEntries(), getWaitlistStats()])
    setEntries(e)
    setStats(s)
    setLoading(false)
  }

  function handleLogout() {
    adminLogout()
    navigate('/admin')
  }

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

        <div className="mt-10 overflow-hidden rounded-2xl border border-biddo-line">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-biddo-sand/50 text-ink/60">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Contact</th>
                  <th className="px-5 py-3 font-medium">Interest</th>
                  <th className="px-5 py-3 font-medium">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-biddo-line">
                {loading && (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-ink/50">
                      Loading…
                    </td>
                  </tr>
                )}
                {!loading && entries.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-ink/50">
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
                      {new Date(entry.createdAt).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-xs text-ink/40">
          Prototype notice: data is stored locally in this browser only. Replace
          with a real backend and database, and enforce authenticated,
          authorized access, before handling real user data.
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
