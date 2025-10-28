import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type SupabaseClientConfig = {
  supabaseUrl?: string
  supabaseKey?: string
}

/**
 * Creates a browser Supabase client using the public environment variables.
 * Guards against missing envs so the app can still render with fallback data.
 */
export function createSupabaseBrowserClient(config: SupabaseClientConfig = {}) {
  const supabaseUrl = config.supabaseUrl ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = config.supabaseKey ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are missing; falling back to local data.')
    return null
  }

  return createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey
  })
}
