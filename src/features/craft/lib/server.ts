import { mapCraftCaseStudyRow, mapCraftProjectRow } from '@/db/types'
import type { CraftCaseStudy } from '@/db/schema/craft'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function fetchCraftProjects() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) {
    console.warn('Supabase client unavailable; craft projects cannot be loaded.')
    return []
  }

  const { data, error } = await supabase
    .from('craft_projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Failed to load craft projects from Supabase:', error?.message ?? error)
    return []
  }

  if (!data) {
    return []
  }

  return data.map(mapCraftProjectRow)
}

export async function fetchCraftCaseStudy(slug: string): Promise<CraftCaseStudy | null> {
  if (!slug) {
    return null
  }

  const supabase = await createSupabaseServerClient()
  if (!supabase) {
    console.warn('Supabase client unavailable; craft case studies cannot be loaded.')
    return null
  }

  const { data, error } = await supabase.from('craft_case_studies').select('*').eq('slug', slug).maybeSingle()

  if (error) {
    console.error('Failed to load craft case study from Supabase:', error?.message ?? error)
    return null
  }

  if (!data) {
    return null
  }

  return mapCraftCaseStudyRow(data)
}

export async function fetchCraftCaseStudies() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) {
    console.warn('Supabase client unavailable; craft case studies cannot be loaded.')
    return []
  }

  const { data, error } = await supabase.from('craft_case_studies').select('*').order('created_at', { ascending: true })

  if (error) {
    console.error('Failed to load craft case studies from Supabase:', error?.message ?? error)
    return []
  }

  if (!data) {
    return []
  }

  return data.map(mapCraftCaseStudyRow)
}
