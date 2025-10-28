'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import type { BlogPost } from '@/db/schema/blog'
import { deleteBlogPost, fetchBlogPosts, upsertBlogPost } from '@/features/blog/lib/queries'

type BlogContextValue = {
  posts: BlogPost[]
  loading: boolean
  refresh: () => Promise<void>
  createPost: (post: BlogPost) => Promise<void>
  updatePost: (post: BlogPost) => Promise<void>
  deletePost: (slug: string) => Promise<void>
}

const BlogContext = createContext<BlogContextValue | undefined>(undefined)

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const loadPosts = useCallback(async () => {
    setLoading(true)
    const data = await fetchBlogPosts()
    setPosts(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const handleUpsert = useCallback(
    async (post: BlogPost) => {
      await upsertBlogPost(post)
      await loadPosts()
    },
    [loadPosts]
  )

  const handleDelete = useCallback(
    async (slug: string) => {
      await deleteBlogPost(slug)
      await loadPosts()
    },
    [loadPosts]
  )

  const value = useMemo<BlogContextValue>(
    () => ({
      posts,
      loading,
      refresh: loadPosts,
      createPost: handleUpsert,
      updatePost: handleUpsert,
      deletePost: handleDelete
    }),
    [posts, loading, loadPosts, handleUpsert, handleDelete]
  )

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
}

export function useBlogStore() {
  const ctx = useContext(BlogContext)
  if (!ctx) {
    throw new Error('useBlogStore must be used within BlogProvider')
  }
  return ctx
}
