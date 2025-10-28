'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'

import { PostHero } from '@/features/blog/components/PostHero'
import { PostNavigation } from '@/features/blog/components/PostNavigation'
import { PostSection } from '@/features/blog/components/PostSection'
import { PostTags } from '@/features/blog/components/PostTags'
import { PostTOC } from '@/features/blog/components/PostTOC'
import { useBlogStore } from '@/features/blog'

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>()
  const { posts } = useBlogStore()
  const slug = params?.slug ?? ''

  const post = useMemo(() => posts.find((entry) => entry.slug === slug), [posts, slug])

  const { previous, next } = useMemo(() => {
    if (!post) {
      return { previous: undefined, next: undefined }
    }
    const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const index = sorted.findIndex((entry) => entry.slug === post.slug)
    return {
      previous: sorted[index + 1],
      next: sorted[index - 1]
    }
  }, [post, posts])

  if (!post) {
    return (
      <main className="px-4 py-24">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white/80 p-10 text-center text-gray-600">
          <p className="text-lg font-medium text-gray-800">Post not found</p>
          <p className="mt-2">It may have been removed or you might need to create it first.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="px-4 py-12">
      <article className="mx-auto max-w-5xl rounded-[32px] border border-white/60 bg-white/90 px-6 py-10 shadow-[0_30px_120px_rgba(15,23,42,0.08)] sm:px-10">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
          <div className="space-y-10">
            <PostHero post={post} />

            <div className="space-y-12">
              {post.sections.map((section) => (
                <PostSection key={section.id} section={section} />
              ))}
            </div>

            <PostTags tags={post.tags} />

            <PostNavigation previous={previous} next={next} />
          </div>

          <div className="mt-10 lg:mt-0">
            <PostTOC sections={post.sections} />
          </div>
        </div>
      </article>
    </main>
  )
}
