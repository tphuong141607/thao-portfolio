interface PostTagsProps {
  tags: string[]
}

export function PostTags({ tags }: PostTagsProps) {
  if (!tags.length) return null

  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1 text-sm text-gray-700">
          {tag}
        </span>
      ))}
    </div>
  )
}
