import { BlogSection } from '@/db/schema/blog'

interface PostTOCProps {
  sections: BlogSection[]
}

export function PostTOC({ sections }: PostTOCProps) {
  if (!sections.length) return null

  return (
    <aside className="sticky top-24 rounded-2xl border border-gray-100 bg-white/80 p-4 text-sm text-gray-600">
      <p className="mb-3 font-semibold text-gray-800">On this page</p>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="transition hover:text-gray-900">
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
