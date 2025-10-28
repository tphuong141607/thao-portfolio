export interface CraftProject {
  id: number
  slug?: string
  title: string
  caption: string
  description: string
  tags: string[]
  imageSrc: string
  imageAlt: string
  href?: string
  sortOrder?: number | null
}

export interface CraftHeroShot {
  src: string
  alt: string
}

export interface CraftOverviewItem {
  label: string
  value: string
}

export interface CraftCaseSection {
  id: string
  kicker?: string
  heading: string
  copy: string[]
  media?: {
    src: string
    alt: string
  }
}

export interface CraftCaseStudy {
  id?: number
  slug: string
  category: string
  title: string
  subtitle: string
  overview: CraftOverviewItem[]
  heroShots: CraftHeroShot[]
  sections: CraftCaseSection[]
}
