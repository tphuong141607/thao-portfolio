import { mapBlogPostRow } from '@/db/types'
import type { BlogPost } from '@/db/schema/blog'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export async function fetchBlogPosts() {
  const supabase = createSupabaseBrowserClient()
  if (!supabase) {
    console.warn('Supabase client unavailable; blog posts cannot be loaded.')
    return []
  }

  const { data, error } = await supabase.from('blog_posts').select('*').order('date', { ascending: false })
  if (error) {
    console.error('Failed to load blog posts from Supabase:', error)
    return []
  }

  return data.map(mapBlogPostRow)
}

export async function upsertBlogPost(post: BlogPost) {
  const supabase = createSupabaseBrowserClient()
  if (!supabase) {
    throw new Error('Supabase client unavailable; configure NEXT_PUBLIC_SUPABASE_* variables.')
  }

  const { error } = await supabase.from('blog_posts').upsert({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    category: post.category,
    tags: post.tags,
    date: post.date,
    author: post.author,
    read_time_minutes: post.readTimeMinutes,
    sections: post.sections
  })

  if (error) {
    console.error('Failed to upsert blog post:', error)
    throw error
  }
}

export async function deleteBlogPost(slug: string) {
  const supabase = createSupabaseBrowserClient()
  if (!supabase) {
    throw new Error('Supabase client unavailable; configure NEXT_PUBLIC_SUPABASE_* variables.')
  }

  const { error } = await supabase.from('blog_posts').delete().eq('slug', slug)
  if (error) {
    console.error('Failed to delete blog post:', error)
    throw error
  }
}
