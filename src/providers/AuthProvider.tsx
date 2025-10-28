'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { createSupabaseBrowserClient } from '@/lib/supabase/client'

type AuthContextValue = {
  user: User | null
  loading: boolean
  signIn: (options: { email: string; password: string }) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

type User = {
  id: string
  email?: string
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = useMemo(() => {
    const client = createSupabaseBrowserClient()
    if (!client) {
      throw new Error('Supabase environment variables are missing')
    }
    return client
  }, [])

  useEffect(() => {
    let mounted = true
    const init = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()
      if (mounted) {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    }
    init()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [supabase])

  const signIn: AuthContextValue['signIn'] = async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      return { error: error.message }
    }
    return {}
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
