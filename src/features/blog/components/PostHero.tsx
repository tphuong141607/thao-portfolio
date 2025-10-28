import Link from 'next/link'

import { BlogPost } from '@/db/schema/blog'
import { formatBlogDate } from '@/features/blog/utils/formatDate'

interface PostHeroProps {
  post: BlogPost
}

export function PostHero({ post }: PostHeroProps) {
  return (
    <div className="space-y-6">
      <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800">
        <span aria-hidden="true" className="mr-1">←</span> Back to Blog
      </Link>

      <div className="w-full overflow-hidden rounded-3xl border border-gray-100">
        <img src={post.image} alt={post.title} className="h-[320px] w-full object-cover" />
      </div>

      <header className="space-y-4">
        <h1 className="text-4xl font-semibold leading-tight text-gray-900">{post.title}</h1>
        <p className="text-gray-600">
          {post.author} · {formatBlogDate(post.date)} · {post.readTimeMinutes} min read
        </p>
        <p className="text-lg text-gray-600">{post.excerpt}</p>
      </header>
    </div>
  )
}
