import type { CraftCaseStudyUpsertInput, CraftProjectUpsertInput } from './types'
import type { CraftCaseStudyRow, CraftProjectRow } from '@/db/types'
import { mapCraftCaseStudyRow, mapCraftProjectRow } from '@/db/types'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export async function upsertCraftProject(input: CraftProjectUpsertInput) {
  const supabase = createSupabaseBrowserClient()
  if (!supabase) {
    throw new Error('Supabase client unavailable; configure NEXT_PUBLIC_SUPABASE_* variables.')
  }

  const record: Record<string, unknown> = {
    slug: input.slug ?? null,
    title: input.title,
    caption: input.caption ?? null,
    description: input.description ?? null,
    tags: input.tags ?? [],
    image_src: input.imageSrc ?? null,
    image_alt: input.imageAlt ?? null,
    sort_order: input.sortOrder ?? null
  }

  if (typeof input.id === 'number') {
    record.id = input.id
  }

  const { data, error } = await supabase.from('craft_projects').upsert(record).select().single()

  if (error) {
    console.error('Failed to upsert craft project:', error)
    throw error
  }

  if (!data) {
    throw new Error('Supabase did not return a project record.')
  }

  return mapCraftProjectRow(data as CraftProjectRow)
}

export async function deleteCraftProject(id: number) {
  const supabase = createSupabaseBrowserClient()
  if (!supabase) {
    throw new Error('Supabase client unavailable; configure NEXT_PUBLIC_SUPABASE_* variables.')
  }

  const { error } = await supabase.from('craft_projects').delete().eq('id', id)
  if (error) {
    console.error('Failed to delete craft project:', error)
    throw error
  }
}

export async function upsertCraftCaseStudy(input: CraftCaseStudyUpsertInput) {
  const supabase = createSupabaseBrowserClient()
  if (!supabase) {
    throw new Error('Supabase client unavailable; configure NEXT_PUBLIC_SUPABASE_* variables.')
  }

  const record: Record<string, unknown> = {
    slug: input.slug,
    category: input.category ?? null,
    title: input.title,
    subtitle: input.subtitle ?? null,
    overview: input.overview ?? [],
    hero_shots: input.heroShots ?? [],
    sections: input.sections ?? []
  }

  if (typeof input.id === 'number') {
    record.id = input.id
  }

  const { data, error } = await supabase.from('craft_case_studies').upsert(record).select().single()

  if (error) {
    console.error('Failed to upsert craft case study:', error)
    throw error
  }

  if (!data) {
    throw new Error('Supabase did not return a case study record.')
  }

  return mapCraftCaseStudyRow(data as CraftCaseStudyRow)
}

export async function deleteCraftCaseStudy(id: number) {
  const supabase = createSupabaseBrowserClient()
  if (!supabase) {
    throw new Error('Supabase client unavailable; configure NEXT_PUBLIC_SUPABASE_* variables.')
  }

  const { error } = await supabase.from('craft_case_studies').delete().eq('id', id)
  if (error) {
    console.error('Failed to delete craft case study:', error)
    throw error
  }
}
