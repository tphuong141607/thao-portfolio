import { BlogSection } from '@/db/schema/blog'

interface PostSectionProps {
  section: BlogSection
}

export function PostSection({ section }: PostSectionProps) {
  return (
    <section id={section.id} className="scroll-mt-24 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
      {section.language && section.language !== 'plain' && (
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-600">
          {section.language}
        </span>
      )}
      <div
        className="space-y-4 text-lg leading-relaxed text-gray-700"
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
    </section>
  )
}
