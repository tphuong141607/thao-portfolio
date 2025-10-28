import Link from 'next/link'

import { BlogPost } from '@/db/schema/blog'

interface PostNavigationProps {
  previous?: BlogPost
  next?: BlogPost
}

export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) return null

  return (
    <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-sm text-gray-600">
      {previous ? (
        <Link href={`/blog/${previous.slug}`} className="flex flex-col text-left hover:text-gray-900">
          <span className="text-xs uppercase tracking-wide text-gray-400">Previous</span>
          <span className="text-base font-medium">{previous.title}</span>
        </Link>
      ) : (
        <span className="text-gray-400">← Previous</span>
      )}

      {next ? (
        <Link href={`/blog/${next.slug}`} className="flex flex-col text-right hover:text-gray-900">
          <span className="text-xs uppercase tracking-wide text-gray-400">Next</span>
          <span className="text-base font-medium">{next.title}</span>
        </Link>
      ) : (
        <span className="text-gray-400">Next →</span>
      )}
    </div>
  )
}
