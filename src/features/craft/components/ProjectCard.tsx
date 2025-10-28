import { mulish } from '@/lib/fonts'

type Props = {
  title: string
  caption?: string
  description?: string
  tags?: string[]
  imageSrc: string
  imageAlt?: string
  href?: string
  reverse?: boolean
}

export default function ProjectCard({
  title,
  caption,
  description,
  tags = [],
  imageSrc,
  imageAlt = '',
  href,
  reverse = false
}: Props) {
  return (
    <div
      className={`${mulish.className} text-left group w-full
      grid grid-cols-1 md:grid-cols-12 md:grid-rows-[auto_1fr] gap-6 md:gap-8
      rounded-2xl border border-slate-200/70 bg-white/60 backdrop-blur-sm
      p-6 md:p-8 shadow-sm transition-shadow duration-300 hover:shadow-md`}
      role="article"
    >
      <div className="md:col-span-12">
        {caption && <p className="text-slate-500 leading-tight mb-1">{caption}</p>}
        <h3 className="text-2xl md:text-[28px] font-semibold tracking-tight text-slate-900">{title}</h3>
      </div>

      <div className="md:col-span-12 md:grid md:grid-cols-12 md:items-start gap-8">
        <div className={`md:col-span-4 flex flex-col gap-4 ${reverse ? 'md:order-2' : 'md:order-1'}`}>
          {description && <p className="text-slate-600 text-[0.9rem] leading-relaxed max-w-prose">{description}</p>}

          {!!tags.length && (
            <div className="flex flex-wrap gap-2.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-300/70 bg-slate-50/80
                  px-3 py-1 text-sm text-slate-600"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {href && (
            <a
              href={href}
              className="inline-flex w-fit items-center rounded-xl px-5 py-2
              text-sm font-medium border border-slate-300/70 text-white bg-[#1d2328]
              hover:bg-[#2b353b] transition-colors duration-100 focus:outline-none
              focus-visible:ring-2 focus-visible:ring-slate-400/60"
            >
              View Work
            </a>
          )}
        </div>

        <div
          className={`md:col-span-8 relative overflow-hidden rounded-xl bg-slate-100/70 aspect-[4/3]
          ${reverse ? 'md:order-1' : 'md:order-2'}`}
        >
          <a href={href} aria-label={`View ${title}`}>
            <img
              src={imageSrc}
              alt={imageAlt}
              className="absolute inset-0 h-full w-full object-cover border border-slate-200/70"
              loading="lazy"
              decoding="async"
            />
          </a>
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>
      </div>
    </div>
  )
}
