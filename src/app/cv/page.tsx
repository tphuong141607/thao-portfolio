import Link from 'next/link'

const resumePath = '/Resume2025.pdf'

export default function CVPage() {
  return (
    <main className="px-4 py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Curriculum Vitae</p>
          <h1 className="text-4xl font-semibold text-gray-900">Resume</h1>
          <p className="text-base text-gray-600">
            Download or preview the latest copy of my resume. Updated for 2025 opportunities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-gray-800"
            >
              Open PDF
            </Link>
            <Link
              href={resumePath}
              download
              className="inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-500"
            >
              Download
            </Link>
          </div>
        </header>

        <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <iframe
            title="Resume preview"
            src={`${resumePath}#view=FitH`}
            className="h-[80vh] w-full"
            loading="lazy"
          />
        </section>
      </div>
    </main>
  )
}
