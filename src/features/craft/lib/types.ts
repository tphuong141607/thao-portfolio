import type { CraftCaseSection, CraftHeroShot, CraftOverviewItem } from '@/db/schema/craft'

export interface CraftProjectUpsertInput {
  id?: number
  slug?: string
  title: string
  caption?: string
  description?: string
  tags?: string[]
  imageSrc?: string
  imageAlt?: string
  sortOrder?: number | null
}

export interface CraftCaseStudyUpsertInput {
  id?: number
  slug: string
  category?: string
  title: string
  subtitle?: string
  overview?: CraftOverviewItem[]
  heroShots?: CraftHeroShot[]
  sections?: CraftCaseSection[]
}
