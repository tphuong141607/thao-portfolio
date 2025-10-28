interface BlogFiltersProps {
  categories: string[]
  selectedCategory: string
  onSelect: (category: string) => void
}

export function BlogFilters({ categories, selectedCategory, onSelect }: BlogFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = category === selectedCategory
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
              isActive
                ? 'border-gray-900 bg-gray-900 text-white shadow-[0_10px_30px_rgba(15,23,42,0.25)]'
                : 'border-gray-200 bg-white/70 text-gray-600 hover:border-gray-400'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
