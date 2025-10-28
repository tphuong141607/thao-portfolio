'use client'

import { useMemo, useState } from 'react'

import Link from 'next/link'

import { QuillEditor } from '@/features/blog/components/QuillEditor'
import { BlogPost, useBlogStore } from '@/features/blog'
import { useAuth } from '@/providers/AuthProvider'

type SectionState = {
  id: string
  title: string
  content: string
  language: string
}

type FormState = {
  id: number | null
  title: string
  slug: string
  excerpt: string
  image: string
  category: string
  tagsInput: string
  date: string
  author: string
  readTimeMinutes: number
  sections: SectionState[]
}

const createEmptySection = (): SectionState => ({
  id: `section-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`,
  title: '',
  content: '',
  language: 'plain'
})

const emptyFormState: FormState = {
  id: null,
  title: '',
  slug: '',
  excerpt: '',
  image: '',
  category: '',
  tagsInput: '',
  date: new Date().toISOString().slice(0, 10),
  author: 'Thao Phuong',
  readTimeMinutes: 5,
  sections: [createEmptySection()]
}

const LANGUAGE_OPTIONS = [
  { value: 'plain', label: 'Plain' },
  { value: 'bash', label: 'Bash' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'css', label: 'CSS' },
  { value: 'diff', label: 'Diff' },
  { value: 'html', label: 'HTML/XML' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'php', label: 'PHP' },
  { value: 'python', label: 'Python' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'sql', label: 'SQL' }
]

export default function ManagePostsPage() {
  const { user, loading: authLoading } = useAuth()
  const { posts, loading: postsLoading, refresh, createPost, updatePost, deletePost } = useBlogStore()
  const [formState, setFormState] = useState<FormState>(emptyFormState)
  const [status, setStatus] = useState<string | null>(null)
  const [codeViewSections, setCodeViewSections] = useState<Record<string, boolean>>({})

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [posts]
  )

  const isEditing = formState.id !== null

  const handleSelectPost = (post: BlogPost) => {
    setFormState({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      image: post.image,
      category: post.category,
      tagsInput: post.tags.join(', '),
      date: post.date,
      author: post.author,
      readTimeMinutes: post.readTimeMinutes,
      sections: post.sections.map((section) => ({
        ...section,
        language: section.language ?? 'plain'
      }))
    })
    setCodeViewSections({})
    setStatus(`Editing “${post.title}”`)
  }

  const resetForm = () => {
    setFormState({ ...emptyFormState })
    setCodeViewSections({})
    setStatus('Ready to draft a new post')
  }

  const handleInputChange = (field: keyof FormState, value: string | number) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSectionChange = (id: string, updates: Partial<SectionState>) => {
    setFormState((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => (section.id === id ? { ...section, ...updates } : section))
    }))
  }

  const addSection = () => {
    const nextSection = createEmptySection()
    setFormState((prev) => ({ ...prev, sections: [...prev.sections, nextSection] }))
    setCodeViewSections((prev) => ({ ...prev, [nextSection.id]: false }))
  }

  const removeSection = (id: string) => {
    setFormState((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== id)
    }))
    setCodeViewSections((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const buildPostFromForm = (): BlogPost => {
    const tags = formState.tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    const sections = formState.sections.map((section, index) => ({
      id: section.id || `section-${index}`,
      title: section.title || `Section ${index + 1}`,
      content: section.content || '<p>(Empty section)</p>',
      language: section.language || 'plain'
    }))

    const id = formState.id ?? Date.now()

    return {
      id,
      slug: formState.slug || formState.title.toLowerCase().replace(/\s+/g, '-'),
      title: formState.title,
      excerpt: formState.excerpt,
      image:
        formState.image ||
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      category: formState.category || 'Uncategorized',
      tags,
      date: formState.date,
      author: formState.author,
      readTimeMinutes: Number(formState.readTimeMinutes) || 5,
      sections
    }
  }

  const handleSave = async () => {
    if (!formState.title.trim()) {
      setStatus('Please add a title before saving.')
      return
    }

    const post = buildPostFromForm()
    setStatus(isEditing ? `Updating “${post.title}”…` : `Publishing “${post.title}”…`)

    try {
      if (isEditing) {
        await updatePost(post)
        setStatus(`Updated “${post.title}”.`)
      } else {
        await createPost(post)
        setStatus(`Created “${post.title}”.`)
        setFormState({ ...emptyFormState, id: null })
      }
    } catch (error) {
      console.error(error)
      setStatus('Unable to save the post. Please try again.')
    }
  }

  const handleDelete = async () => {
    if (!isEditing || !formState.slug) return
    setStatus('Deleting post…')

    try {
      await deletePost(formState.slug)
      resetForm()
      setStatus('Post deleted.')
    } catch (error) {
      console.error(error)
      setStatus('Failed to delete the post. Please try again.')
    }
  }

  const handleRefresh = async () => {
    setStatus('Syncing posts from Supabase…')
    try {
      await refresh()
      setStatus('Posts refreshed.')
    } catch (error) {
      console.error(error)
      setStatus('Unable to refresh posts. Check the Supabase connection.')
    }
  }

  if (authLoading || postsLoading) {
    return (
      <main className="px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gray-100 bg-white/80 p-10 text-center text-sm text-gray-500">
          Checking credentials…
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-gray-100 bg-white/90 p-10 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Sign in to edit</h1>
          <p className="text-gray-600">
            This page is restricted. Please log in with your Supabase credentials to create or update posts.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Go to login
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Post Studio</h1>
              <p className="mt-2 text-gray-600">
                Draft, edit, or retire posts. Content syncs with Supabase when credentials are configured, and falls back
                to the seeded demo data otherwise.
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-gray-300"
            >
              Refresh from Supabase
            </button>
          </div>
          {status && <p className="mt-4 text-sm text-gray-500">{status}</p>}
        </header>

        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-4 rounded-3xl border border-gray-100 bg-white/80 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Existing Posts</h2>
              <button
                onClick={resetForm}
                className="text-sm text-gray-500 underline-offset-2 hover:underline"
              >
                New Post
              </button>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              {sortedPosts.map((post) => (
                <li key={post.id}>
                  <button
                    onClick={() => handleSelectPost(post)}
                    className={`w-full rounded-2xl border px-3 py-2 text-left transition ${
                      formState.id === post.id
                        ? 'border-gray-900 bg-gray-900/90 text-white'
                        : 'border-gray-200 bg-white hover:border-gray-400'
                    }`}
                  >
                    {post.title}
                  </button>
                </li>
              ))}
              {!sortedPosts.length && <li>No posts yet.</li>}
            </ul>
          </aside>

          <section className="space-y-8 rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-gray-700">
                Title
                <input
                  type="text"
                  value={formState.title}
                  onChange={(event) => handleInputChange('title', event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Slug
                <input
                  type="text"
                  value={formState.slug}
                  onChange={(event) => handleInputChange('slug', event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Category
                <input
                  type="text"
                  value={formState.category}
                  onChange={(event) => handleInputChange('category', event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Author
                <input
                  type="text"
                  value={formState.author}
                  onChange={(event) => handleInputChange('author', event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Date
                <input
                  type="date"
                  value={formState.date}
                  onChange={(event) => handleInputChange('date', event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Read Time (minutes)
                <input
                  type="number"
                  min={1}
                  value={formState.readTimeMinutes}
                  onChange={(event) => handleInputChange('readTimeMinutes', Number(event.target.value))}
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                />
              </label>
            </div>

            <label className="text-sm font-medium text-gray-700">
              Feature Image URL
              <input
                type="text"
                value={formState.image}
                onChange={(event) => handleInputChange('image', event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                placeholder="https://"
              />
            </label>

            <label className="text-sm font-medium text-gray-700">
              Excerpt
              <textarea
                value={formState.excerpt}
                onChange={(event) => handleInputChange('excerpt', event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-3"
                rows={3}
              />
            </label>

            <label className="text-sm font-medium text-gray-700">
              Tags (comma separated)
              <input
                type="text"
                value={formState.tagsInput}
                onChange={(event) => handleInputChange('tagsInput', event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2"
                placeholder="productivity, automation"
              />
            </label>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Sections</h2>
                <button onClick={addSection} className="rounded-full border border-gray-200 px-4 py-1 text-sm hover:border-gray-400">
                  + Add section
                </button>
              </div>

              {formState.sections.map((section, index) => {
                const isCodeView = !!codeViewSections[section.id]
                return (
                  <div key={section.id} className="space-y-3 rounded-2xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700">Section {index + 1}</p>
                      {formState.sections.length > 1 && (
                        <button className="text-xs text-red-500" onClick={() => removeSection(section.id)}>
                          Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(event) => handleSectionChange(section.id, { title: event.target.value })}
                    placeholder="Section title"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
                  />
                  {isCodeView ? (
                    <textarea
                      value={section.content}
                      onChange={(event) => handleSectionChange(section.id, { content: event.target.value })}
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-mono"
                      rows={10}
                    />
                  ) : (
                    <QuillEditor
                      value={section.content}
                      onChange={(content) => handleSectionChange(section.id, { content })}
                      placeholder="Compose an epic..."
                      className="bg-white"
                    />
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setCodeViewSections((prev) => ({
                          ...prev,
                          [section.id]: !prev[section.id]
                        }))
                      }
                      className="rounded-full bg-amber-400/80 px-4 py-1 text-sm font-medium text-gray-900 shadow transition hover:bg-amber-400"
                    >
                      {isCodeView ? 'Hide Code' : 'Show Code'}
                    </button>
                    {isCodeView && (
                      <label className="ml-auto flex items-center gap-2 text-xs font-medium text-gray-600">
                        Language
                        <select
                          value={section.language ?? 'plain'}
                          onChange={(event) =>
                            handleSectionChange(section.id, { language: event.target.value })
                          }
                          className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-800"
                        >
                          {LANGUAGE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                  </div>
                </div>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={handleSave}
                className="rounded-full bg-gray-900 px-6 py-2 text-white hover:bg-gray-800"
              >
                {isEditing ? 'Update Post' : 'Create Post'}
              </button>
              {isEditing && (
                <button onClick={handleDelete} className="rounded-full border border-red-300 px-6 py-2 text-red-600">
                  Delete Post
                </button>
              )}
              <button onClick={resetForm} className="rounded-full border border-gray-200 px-6 py-2 text-gray-600">
                Reset
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
