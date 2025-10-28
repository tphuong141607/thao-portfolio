import Image from 'next/image'
import { notFound } from 'next/navigation'

import { fetchCraftCaseStudy } from '@/features/craft/lib/server'

export default async function CraftCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const caseStudy = await fetchCraftCaseStudy(slug)

  if (!caseStudy) {
    notFound()
  }

  return (
    <main className="px-4 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        <section className="overflow-hidden rounded-[40px] border border-gray-100 bg-white shadow-[0_30px_120px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-center justify-center gap-6 px-6 py-10">
            {caseStudy.heroShots.map((shot, index) => (
              <div
                key={shot.src}
                className="relative h-[520px] w-[240px] overflow-hidden rounded-[46px] bg-gray-50 shadow-[0_25px_70px_rgba(15,23,42,0.15)]"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 768px) 60vw, 240px"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </section>

        <header className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">{caseStudy.category}</p>
          <h1 className="text-5xl font-semibold text-gray-900">{caseStudy.title}</h1>
          <p className="text-lg leading-relaxed text-gray-600">{caseStudy.subtitle}</p>

          <div className="flex flex-wrap items-start gap-6 border-y border-gray-200 py-6 text-sm text-gray-600">
            {caseStudy.overview.map((item) => (
              <div key={item.label} className="min-w-[140px] flex-1">
                <p className="text-xs uppercase tracking-wide text-gray-400">{item.label}</p>
                <p className="mt-2 text-base text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
        </header>

        {caseStudy.sections.map((section, index) => {
          const textFirst = index % 2 === 0
          const textColumn = (
            <div className="space-y-4">
              {section.kicker && <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{section.kicker}</p>}
              <h2 className="text-3xl font-semibold text-gray-900">{section.heading}</h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-600">
                {section.copy.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
            </div>
          )

          const mediaColumn = section.media ? (
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
              <Image
                src={section.media.src}
                alt={section.media.alt}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="hidden md:block" />
          )

          return (
            <section key={section.id} className="grid gap-8 md:grid-cols-2 md:items-center">
              {textFirst ? (
                <>
                  {textColumn}
                  {mediaColumn}
                </>
              ) : (
                <>
                  {mediaColumn}
                  {textColumn}
                </>
              )}
            </section>
          )
        })}
      </div>
    </main>
  )
}
