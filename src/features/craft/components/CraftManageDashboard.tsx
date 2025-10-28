'use client'

import { useMemo, useState } from 'react'

import type { CraftCaseStudy, CraftHeroShot, CraftOverviewItem, CraftProject, CraftCaseSection } from '@/db/schema/craft'
import { deleteCraftCaseStudy, deleteCraftProject, upsertCraftCaseStudy, upsertCraftProject } from '@/features/craft/lib/mutations'
import type { CraftCaseStudyUpsertInput, CraftProjectUpsertInput } from '@/features/craft/lib/types'

function createEmptyProjectForm(): ProjectFormState {
  return {
    id: undefined,
    title: '',
    slug: '',
    caption: '',
    description: '',
    tagsInput: '',
    imageSrc: '',
    imageAlt: '',
    sortOrder: ''
  }
}

function createEmptyCaseStudyForm(): CaseStudyFormState {
  return {
    id: undefined,
    slug: '',
    category: '',
    title: '',
    subtitle: '',
    overviewInput: '[]',
    heroShotsInput: '[]',
    sectionsInput: '[]'
  }
}

type ProjectFormState = {
  id?: number
  title: string
  slug: string
  caption: string
  description: string
  tagsInput: string
  imageSrc: string
  imageAlt: string
  sortOrder: string
}

type CaseStudyFormState = {
  id?: number
  slug: string
  category: string
  title: string
  subtitle: string
  overviewInput: string
  heroShotsInput: string
  sectionsInput: string
}

function projectToForm(project: CraftProject | undefined): ProjectFormState {
  if (!project) {
    return createEmptyProjectForm()
  }

  return {
    id: project.id,
    title: project.title,
    slug: project.slug ?? '',
    caption: project.caption,
    description: project.description,
    tagsInput: project.tags.join(', '),
    imageSrc: project.imageSrc,
    imageAlt: project.imageAlt,
    sortOrder: project.sortOrder != null ? String(project.sortOrder) : ''
  }
}

function caseStudyToForm(caseStudy: CraftCaseStudy | undefined): CaseStudyFormState {
  if (!caseStudy) {
    return createEmptyCaseStudyForm()
  }

  return {
    id: caseStudy.id,
    slug: caseStudy.slug,
    category: caseStudy.category,
    title: caseStudy.title,
    subtitle: caseStudy.subtitle,
    overviewInput: JSON.stringify(caseStudy.overview, null, 2),
    heroShotsInput: JSON.stringify(caseStudy.heroShots, null, 2),
    sectionsInput: JSON.stringify(caseStudy.sections, null, 2)
  }
}

type Props = {
  initialProjects: CraftProject[]
  initialCaseStudies: CraftCaseStudy[]
}

export function CraftManageDashboard({ initialProjects, initialCaseStudies }: Props) {
  const [projects, setProjects] = useState<CraftProject[]>(() => [...initialProjects])
  const [caseStudies, setCaseStudies] = useState<CraftCaseStudy[]>(() => [...initialCaseStudies])

  const [projectForm, setProjectForm] = useState<ProjectFormState>(() => projectToForm(projects[0]))
  const [selectedProjectId, setSelectedProjectId] = useState<number | undefined>(projects[0]?.id)

  const [caseStudyForm, setCaseStudyForm] = useState<CaseStudyFormState>(() => caseStudyToForm(caseStudies[0]))
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<number | undefined>(caseStudies[0]?.id)

  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.title.localeCompare(b.title)),
    [projects]
  )

  const sortedCaseStudies = useMemo(
    () => [...caseStudies].sort((a, b) => a.slug.localeCompare(b.slug)),
    [caseStudies]
  )

  const handleSelectProject = (project: CraftProject | undefined) => {
    setSelectedProjectId(project?.id)
    setProjectForm(projectToForm(project))
    setStatus(null)
    setError(null)
  }

  const handleSelectCaseStudy = (caseStudy: CraftCaseStudy | undefined) => {
    setSelectedCaseStudyId(caseStudy?.id)
    setCaseStudyForm(caseStudyToForm(caseStudy))
    setStatus(null)
    setError(null)
  }

  const handleProjectChange = (field: keyof ProjectFormState, value: string) => {
    setProjectForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleCaseStudyChange = (field: keyof CaseStudyFormState, value: string) => {
    setCaseStudyForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleProjectSave = async () => {
    if (!projectForm.title.trim()) {
      setError('Project title is required.')
      return
    }

    setSaving(true)
    setError(null)
    try {
      const payload: CraftProjectUpsertInput = {
        id: projectForm.id,
        title: projectForm.title.trim(),
        slug: projectForm.slug.trim() || undefined,
        caption: projectForm.caption.trim() || undefined,
        description: projectForm.description.trim(),
        tags: projectForm.tagsInput
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        imageSrc: projectForm.imageSrc.trim() || undefined,
        imageAlt: projectForm.imageAlt.trim() || undefined,
        sortOrder: projectForm.sortOrder ? Number(projectForm.sortOrder) : null
      }

      const saved = await upsertCraftProject(payload)
      setProjects((prev) => {
        const exists = prev.some((project) => project.id === saved.id)
        if (exists) {
          return prev.map((project) => (project.id === saved.id ? saved : project))
        }
        return [...prev, saved]
      })
      setProjectForm(projectToForm(saved))
      setSelectedProjectId(saved.id)
      setStatus(`Saved project “${saved.title}”.`)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to save project.')
    } finally {
      setSaving(false)
    }
  }

  const handleProjectDelete = async () => {
    if (!projectForm.id) {
      setError('Select a project before deleting.')
      return
    }

    setSaving(true)
    setError(null)
    try {
      await deleteCraftProject(projectForm.id)
      setProjects((prev) => prev.filter((project) => project.id !== projectForm.id))
      handleSelectProject(undefined)
      setStatus('Project deleted.')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to delete project.')
    } finally {
      setSaving(false)
    }
  }

  const handleCaseStudySave = async () => {
    if (!caseStudyForm.slug.trim()) {
      setError('Case study slug is required.')
      return
    }
    if (!caseStudyForm.title.trim()) {
      setError('Case study title is required.')
      return
    }

    let overview: CraftOverviewItem[] = []
    let heroShots: CraftHeroShot[] = []
    let sections: CraftCaseSection[] = []

    try {
      overview = caseStudyForm.overviewInput.trim() ? JSON.parse(caseStudyForm.overviewInput) : []
      heroShots = caseStudyForm.heroShotsInput.trim() ? JSON.parse(caseStudyForm.heroShotsInput) : []
      sections = caseStudyForm.sectionsInput.trim() ? JSON.parse(caseStudyForm.sectionsInput) : []
    } catch {
      setError('Unable to parse JSON fields. Please ensure overview, hero shots, and sections are valid JSON.')
      return
    }

    setSaving(true)
    setError(null)
    try {
      const payload: CraftCaseStudyUpsertInput = {
        id: caseStudyForm.id,
        slug: caseStudyForm.slug.trim(),
        category: caseStudyForm.category.trim() || undefined,
        title: caseStudyForm.title.trim(),
        subtitle: caseStudyForm.subtitle.trim() || undefined,
        overview,
        heroShots,
        sections
      }

      const saved = await upsertCraftCaseStudy(payload)
      setCaseStudies((prev) => {
        const exists = prev.some((caseStudy) => caseStudy.id === saved.id)
        if (exists) {
          return prev.map((caseStudy) => (caseStudy.id === saved.id ? saved : caseStudy))
        }
        return [...prev, saved]
      })
      setCaseStudyForm(caseStudyToForm(saved))
      setSelectedCaseStudyId(saved.id)
      setStatus(`Saved case study “${saved.title}”.`)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to save case study.')
    } finally {
      setSaving(false)
    }
  }

  const handleCaseStudyDelete = async () => {
    if (!caseStudyForm.id) {
      setError('Select a case study before deleting.')
      return
    }

    setSaving(true)
    setError(null)
    try {
      await deleteCraftCaseStudy(caseStudyForm.id)
      setCaseStudies((prev) => prev.filter((caseStudy) => caseStudy.id !== caseStudyForm.id))
      handleSelectCaseStudy(undefined)
      setStatus('Case study deleted.')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to delete case study.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <h1 className="text-3xl font-semibold text-gray-900">Craft Studio</h1>
          <p className="mt-2 text-gray-600">Manage portfolio projects and their case studies.</p>
          {status && <p className="mt-4 text-sm text-emerald-600">{status}</p>}
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </header>

        <section className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-4 rounded-3xl border border-gray-100 bg-white/80 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
              <button
                onClick={() => handleSelectProject(undefined)}
                className="text-sm text-gray-500 underline-offset-2 hover:underline"
              >
                New
              </button>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              {sortedProjects.map((project) => (
                <li key={project.id}>
                  <button
                    onClick={() => handleSelectProject(projects.find((p) => p.id === project.id))}
                    className={`w-full rounded-2xl border px-3 py-2 text-left transition ${
                      selectedProjectId === project.id
                        ? 'border-gray-900 bg-gray-900/90 text-white'
                        : 'border-gray-200 bg-white hover:border-gray-400'
                    }`}
                  >
                    {project.title}
                  </button>
                </li>
              ))}
              {!sortedProjects.length && <li>No projects yet.</li>}
            </ul>
          </aside>

          <div className="space-y-6 rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-gray-700">
                Title
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(event) => handleProjectChange('title', event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Slug
                <input
                  type="text"
                  value={projectForm.slug}
                  onChange={(event) => handleProjectChange('slug', event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                  placeholder="rewire-your-brain"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Caption
                <input
                  type="text"
                  value={projectForm.caption}
                  onChange={(event) => handleProjectChange('caption', event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Sort Order
                <input
                  type="number"
                  value={projectForm.sortOrder}
                  onChange={(event) => handleProjectChange('sortOrder', event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                />
              </label>
            </div>

            <label className="text-sm font-medium text-gray-700">
              Description
              <textarea
                value={projectForm.description}
                onChange={(event) => handleProjectChange('description', event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3"
                rows={3}
              />
            </label>

            <label className="text-sm font-medium text-gray-700">
              Tags (comma separated)
              <input
                type="text"
                value={projectForm.tagsInput}
                onChange={(event) => handleProjectChange('tagsInput', event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                placeholder="AI, Therapy, Research"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-gray-700">
                Image URL
                <input
                  type="text"
                  value={projectForm.imageSrc}
                  onChange={(event) => handleProjectChange('imageSrc', event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                  placeholder="https://"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Image Alt
                <input
                  type="text"
                  value={projectForm.imageAlt}
                  onChange={(event) => handleProjectChange('imageAlt', event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleProjectSave}
                className="inline-flex items-center rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:bg-gray-400"
                disabled={saving}
              >
                {projectForm.id ? 'Update Project' : 'Create Project'}
              </button>
              <button
                onClick={handleProjectDelete}
                className="inline-flex items-center rounded-full border border-red-200 px-5 py-2 text-sm font-semibold text-red-600 hover:border-red-300"
                disabled={saving || !projectForm.id}
              >
                Delete
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-4 rounded-3xl border border-gray-100 bg-white/80 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Case Studies</h2>
              <button
                onClick={() => handleSelectCaseStudy(undefined)}
                className="text-sm text-gray-500 underline-offset-2 hover:underline"
              >
                New
              </button>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              {sortedCaseStudies.map((caseStudy) => (
                <li key={caseStudy.id ?? caseStudy.slug}>
                  <button
                    onClick={() => handleSelectCaseStudy(caseStudies.find((c) => c.id === caseStudy.id))}
                    className={`w-full rounded-2xl border px-3 py-2 text-left transition ${
                      selectedCaseStudyId === caseStudy.id
                        ? 'border-gray-900 bg-gray-900/90 text-white'
                        : 'border-gray-200 bg-white hover:border-gray-400'
                    }`}
                  >
                    {caseStudy.title}
                  </button>
                </li>
              ))}
              {!sortedCaseStudies.length && <li>No case studies yet.</li>}
            </ul>
          </aside>

          <div className="space-y-6 rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-gray-700">
                Slug
                <input
                  type="text"
                  value={caseStudyForm.slug}
                  onChange={(event) => handleCaseStudyChange('slug', event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                  placeholder="rewire-your-brain"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Category
                <input
                  type="text"
                  value={caseStudyForm.category}
                  onChange={(event) => handleCaseStudyChange('category', event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Title
                <input
                  type="text"
                  value={caseStudyForm.title}
                  onChange={(event) => handleCaseStudyChange('title', event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Subtitle
                <input
                  type="text"
                  value={caseStudyForm.subtitle}
                  onChange={(event) => handleCaseStudyChange('subtitle', event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                />
              </label>
            </div>

            <label className="text-sm font-medium text-gray-700">
              Overview (JSON)
              <textarea
                value={caseStudyForm.overviewInput}
                onChange={(event) => handleCaseStudyChange('overviewInput', event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3 font-mono text-xs"
                rows={6}
              />
            </label>

            <label className="text-sm font-medium text-gray-700">
              Hero Shots (JSON)
              <textarea
                value={caseStudyForm.heroShotsInput}
                onChange={(event) => handleCaseStudyChange('heroShotsInput', event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3 font-mono text-xs"
                rows={6}
              />
            </label>

            <label className="text-sm font-medium text-gray-700">
              Sections (JSON)
              <textarea
                value={caseStudyForm.sectionsInput}
                onChange={(event) => handleCaseStudyChange('sectionsInput', event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3 font-mono text-xs"
                rows={8}
              />
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCaseStudySave}
                className="inline-flex items-center rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:bg-gray-400"
                disabled={saving}
              >
                {caseStudyForm.id ? 'Update Case Study' : 'Create Case Study'}
              </button>
              <button
                onClick={handleCaseStudyDelete}
                className="inline-flex items-center rounded-full border border-red-200 px-5 py-2 text-sm font-semibold text-red-600 hover:border-red-300"
                disabled={saving || !caseStudyForm.id}
              >
                Delete
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
