interface BlogEmptyStateProps {
  message?: string
}

export function BlogEmptyState({ message = 'Nothing here yet—try another category or search term.' }: BlogEmptyStateProps) {
  return (
    <div className="col-span-full rounded-3xl border border-dashed border-gray-200 bg-white/60 p-10 text-center text-gray-500">
      {message}
    </div>
  )
}
