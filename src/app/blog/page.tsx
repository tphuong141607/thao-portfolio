'use client'

import { useMemo, useState } from 'react'

import { BlogCard } from '@/features/blog/components/BlogCard'
import { BlogEmptyState } from '@/features/blog/components/BlogEmptyState'
import { BlogFilters } from '@/features/blog/components/BlogFilters'
import { BlogSearchInput } from '@/features/blog/components/BlogSearchInput'
import { useBlogStore } from '@/features/blog'

export default function BlogPage() {
  const { posts } = useBlogStore()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = useMemo(() => {
    const unique = new Set(posts.map((post) => post.category))
    return ['All', ...unique]
  }, [posts])

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return posts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
      if (!normalizedSearch) {
        return matchesCategory
      }

      const haystack = `${post.title} ${post.excerpt}`.toLowerCase()
      const matchesSearch = haystack.includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [posts, selectedCategory, searchTerm])

  return (
    <main className="px-4 py-12">
      <section className="rounded-[40px] border border-white/60 bg-white/80 shadow-[0_25px_120px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-8 px-6 py-10 sm:px-10">
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Thoughts & Writings</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-[clamp(2.25rem,4vw,3.25rem)] font-semibold text-gray-900">Thoughts & Writings</h1>
              <BlogSearchInput value={searchTerm} onChange={setSearchTerm} />
            </div>
            <p className="max-w-2xl text-base text-gray-600">
              Curated notes on design systems, mindful workflows, and the little experiments that keep my creativity awake.
            </p>
          </div>

          <BlogFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}

            {filteredPosts.length === 0 && <BlogEmptyState />}
          </div>
        </div>
      </section>
    </main>
  )
}
