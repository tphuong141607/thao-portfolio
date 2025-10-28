'use client'

import { FormEvent, useState } from 'react'

import { useAuth } from '@/providers/AuthProvider'

export default function LoginPage() {
  const { signIn, loading, user, signOut } = useAuth()
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [status, setStatus] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setStatus(null)
    const { error } = await signIn(formState)
    if (error) {
      setStatus(error)
    } else {
      setStatus('Signed in successfully.')
    }
    setSubmitting(false)
  }

  if (loading) {
    return (
      <main className="px-4 py-20">
        <div className="mx-auto max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500">
          Checking session…
        </div>
      </main>
    )
  }

  if (user) {
    return (
      <main className="px-4 py-20">
        <div className="mx-auto max-w-md space-y-6 rounded-3xl border border-gray-100 bg-white p-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">You’re signed in</h1>
          <p className="text-gray-600">You can now edit protected content.</p>
          <button
            onClick={signOut}
            className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:border-gray-500"
          >
            Sign out
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="px-4 py-20">
      <div className="mx-auto max-w-md space-y-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
        <header className="space-y-2 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Admin</p>
          <h1 className="text-3xl font-semibold text-gray-900">Sign in to edit</h1>
          <p className="text-sm text-gray-600">Use the credentials configured in Supabase.</p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              required
              value={formState.email}
              onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
              className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            Password
            <input
              type="password"
              required
              value={formState.password}
              onChange={(event) => setFormState((prev) => ({ ...prev, password: event.target.value }))}
              className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-gray-900 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-70"
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {status && <p className="text-center text-sm text-gray-500">{status}</p>}
      </div>
    </main>
  )
}
