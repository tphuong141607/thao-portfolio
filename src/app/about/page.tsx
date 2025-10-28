'use client'

import { useState } from 'react'

const profile = {
  name: 'Thao Phuong',
  summary:
    'Software Engineer with a background in Business and Computer Science. Currently at Dynamic Object Language Lab, building human-centered AI systems that simplify complexity.'
}

const sections = [
  {
    id: 'background',
    title: 'Background',
    body: [
      "I’ve always been fascinated by the intersection of people and possibility — how we think, act, and interact with the world around us. Growing up in a small night market in Vietnam, I watched my mother run her business with intuition sharper than any algorithm. That’s where I learned my first lesson in design: every decision starts with understanding people.",
      "I began studying business to explore that curiosity — but it wasn’t until I joined a hackathon that I truly found my path. Seeing an idea transform into code, and code transform into impact, changed everything. I switched my major to Computer Science and never looked back.",
      "Today, I build systems that bridge human emotion and machine intelligence — from apps that remove everyday friction to technologies that prevent accidents in flight missions.My goal isn’t just to create software, but to craft experiences that make people’s lives safer, simpler, and more meaningful."
    ]
  },
  {
    id: 'philosophy',
    title: 'Design Philosophy',
    body: [
      "I build with empathy — blending design and engineering to make technology feel effortless, human, and intelligent. In a world overflowing with complexity, I aim to create clarity — products that guide, not confuse; experiences that invite, not intimidate.",
      "What inspires me most are the details. The small, invisible moments — a subtle animation, a perfectly timed interaction, a seamless flow — that make technology feel alive. These moments transform software from a tool into something people actually enjoy using.",
      "Behind every screen is a person with a goal, a mood, a story. I design and engineer for them — creating systems that not only function beautifully but resonate emotionally. Whether it’s an app that saves users time or one that prevents errors in high-stakes environments, my goal remains the same: to craft technology that feels simple, purposeful, and profoundly human."
    ]
  },
  {
    id: 'love',
    title: 'Things I Love',
    body: [
      'Reading by the window, studying Chinese and writing hanzi, and getting lost in nature — from misty hikes to quiet beaches and golden fall trails. I focus best with a Harry Potter playlist on loop and take mini breaks playing with my corgis.'
    ]
  }
]

export default function AboutPage() {
  const [openSection, setOpenSection] = useState<string>('background')

  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="space-y-4">
          <h1 className="text-5xl font-semibold text-gray-900">{profile.name}</h1>
          <p className="text-lg leading-relaxed text-gray-600">{profile.summary}</p>
        </header>

        <section className="divide-y divide-gray-200 rounded-3xl border border-gray-100 bg-white/80">
          {sections.map((section) => {
            const isOpen = openSection === section.id
            return (
              <article key={section.id} className="px-6 py-6 sm:px-10">
                <button
                  onClick={() => setOpenSection(isOpen ? '' : section.id)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-lg font-semibold text-gray-900">{section.title}</span>
                  <span className="text-2xl text-gray-400">{isOpen ? '×' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-600">
                    {section.body.map((paragraph, index) => (
                      <p key={index}>
                        {paragraph.split('**').map((chunk, idx) =>
                          idx % 2 === 1 ? (
                            <strong key={idx} className="font-semibold text-gray-900">
                              {chunk}
                            </strong>
                          ) : (
                            <span key={idx}>{chunk}</span>
                          )
                        )}
                      </p>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </section>
      </div>
    </main>
  )
}
