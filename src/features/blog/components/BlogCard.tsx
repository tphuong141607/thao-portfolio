import Link from 'next/link'

import { BlogPost } from '@/db/schema/blog'
import { formatBlogDate } from '@/features/blog/utils/formatDate'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(15,23,42,0.15)]"
    >
      <div className="h-52 w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span className="rounded-full border border-gray-200 px-3 py-1 text-gray-700">{post.category}</span>
          {post.tags.length > 0 && <span className="text-gray-400">— {post.tags.join(' / ')}</span>}
          <span className="ml-auto text-gray-500">{formatBlogDate(post.date)}</span>
        </div>
      </div>
    </Link>
  )
}
