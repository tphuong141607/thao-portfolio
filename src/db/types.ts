import type { BlogPost, BlogSection } from '@/db/schema/blog'
import type { CraftCaseStudy, CraftProject } from '@/db/schema/craft'

export type BlogPostRow = {
  id: number
  slug: string
  title: string
  excerpt: string | null
  image: string | null
  category: string | null
  tags: string[] | null
  date: string | null
  author: string | null
  read_time_minutes: number | null
  sections: BlogSection[] | null
  created_at?: string | null
  updated_at?: string | null
}

export type CraftProjectRow = {
  id: number
  slug: string | null
  title: string
  caption: string | null
  description: string | null
  tags: string[] | null
  image_src: string | null
  image_alt: string | null
  sort_order: number | null
  created_at?: string | null
  updated_at?: string | null
}

export type CraftCaseStudyRow = {
  id: number
  slug: string
  category: string | null
  title: string
  subtitle: string | null
  overview: { label: string; value: string }[] | null
  hero_shots: { src: string; alt: string }[] | null
  sections: {
    id: string
    kicker?: string
    heading: string
    copy: string[]
    media?: { src: string; alt: string }
  }[] | null
  created_at?: string | null
  updated_at?: string | null
}

export function mapBlogPostRow(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? '',
    image:
      row.image ??
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    category: row.category ?? 'Uncategorized',
    tags: row.tags ?? [],
    date: row.date ?? new Date().toISOString(),
    author: row.author ?? 'Thao Phuong',
    readTimeMinutes: row.read_time_minutes ?? 5,
    sections: row.sections ?? []
  }
}

export function mapCraftProjectRow(row: CraftProjectRow): CraftProject {
  const slug = row.slug ?? undefined
  return {
    id: row.id,
    slug,
    title: row.title,
    caption: row.caption ?? '',
    description: row.description ?? '',
    tags: row.tags ?? [],
    imageSrc:
      row.image_src ??
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    imageAlt: row.image_alt ?? '',
    sortOrder: row.sort_order ?? null
  }
}

export function mapCraftCaseStudyRow(row: CraftCaseStudyRow): CraftCaseStudy {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category ?? 'Case Study',
    title: row.title,
    subtitle: row.subtitle ?? '',
    overview: row.overview ?? [],
    heroShots: row.hero_shots ?? [],
    sections: row.sections ?? []
  }
}
