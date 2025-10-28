import ProjectCard from '@/features/craft/components/ProjectCard'
import { fetchCraftProjects } from '@/features/craft/lib/server'
import { museo } from '@/lib/fonts'

export default async function CraftShowcase() {
  const projects = await fetchCraftProjects()

  return (
    <section aria-labelledby="craft-heading" className="space-y-6">
      <div className="text-center">
        <h1
          id="craft-heading"
          className={`${museo.className} mt-[4rem] text-3xl font-normal tracking-wide text-slate-800`}
        >
          Craft
        </h1>
        <hr className="mb-[2rem] mx-auto w-[2rem] border-t border-slate-500" />
      </div>

      <div className="grid place-items-center gap-6 bg-color-red text-center md:gap-10 lg:gap-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            caption={project.caption}
            description={project.description}
            tags={project.tags}
            imageSrc={project.imageSrc}
            imageAlt={project.imageAlt}
            href={project.slug ? `/craft/${project.slug}` : undefined}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  )
}
