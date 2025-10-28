import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

type SupabaseServerClientConfig = {
  supabaseUrl?: string
  supabaseKey?: string
}

/**
 * Server helper that returns a Supabase client bound to the current request cookies.
 * Returns null when env variables are absent so upstream code can gracefully fallback.
 */
export async function createSupabaseServerClient(config: SupabaseServerClientConfig = {}) {
  const supabaseUrl = config.supabaseUrl ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = config.supabaseKey ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are missing; falling back to local data.')
    return null
  }

  const cookieStore = await cookies()

  return createServerComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
    cookies: () => cookieStore
  })
}
