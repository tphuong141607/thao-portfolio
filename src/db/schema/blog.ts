export interface BlogSection {
  id: string
  title: string
  content: string
  language?: string
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  image: string
  category: string
  tags: string[]
  date: string
  author: string
  readTimeMinutes: number
  sections: BlogSection[]
}
