interface BlogSearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function BlogSearchInput({ value, onChange }: BlogSearchInputProps) {
  return (
    <div className="w-full min-w-0 sm:w-72">
      <label className="sr-only" htmlFor="blog-search">
        Search blog posts
      </label>
      <input
        id="blog-search"
        type="search"
        placeholder="Search..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-gray-200 bg-white/80 px-5 text-sm text-gray-600 shadow-inner outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-sky-100"
      />
    </div>
  )
}
