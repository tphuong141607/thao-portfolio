/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')

const blogPosts = [
  {
    id: 1,
    slug: 'building-a-modern-marketing-stack-with-n8n',
    title: 'Building a Modern Marketing Stack with N8n',
    excerpt:
      "A look at the automations powering my current growth stack—from lead intake to reporting—built entirely on N8n's open-source workflow builder.",
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80',
    category: 'Tech',
    tags: ['N8n', 'Automation', 'Marketing'],
    date: '2024-04-20',
    author: 'Thao Phuong',
    readTimeMinutes: 5,
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content:
          "<p>Automation is only helpful when it matches the way your team already thinks. I wanted a workflow tool that could bend to my process, not the other way around.</p><p>Below is a look at how I'm connecting lead capture, enrichment, notifications, and reporting—all orchestrated in N8n.</p>",
        language: 'plain'
      },
      {
        id: 'choosing-n8n',
        title: 'Choosing N8n for Automation',
        content:
          "<p>After trying Zapier and Make for years, I needed deeper control over branching logic and more generous execution limits. N8n’s self-hosted option and node-based editor felt like designing a flowchart that actually runs.</p><p>The community nodes and native TypeScript support also meant I could build bespoke data-cleaning steps without leaving the canvas.</p>",
        language: 'plain'
      }
    ]
  },
  {
    id: 2,
    slug: '10-tips-for-better-time-management',
    title: '10 Tips for Better Time Management',
    excerpt:
      'Ten rituals I lean on to keep deep work intact, even when the calendar fills up with meetings and life gets beautifully loud.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    category: 'Productivity Tips',
    tags: ['Productivity', 'Focus', 'Rituals'],
    date: '2024-04-10',
    author: 'Thao Phuong',
    readTimeMinutes: 7,
    sections: [
      {
        id: 'set-themes',
        title: 'Set Themes for Each Day',
        content:
          '<p>Instead of rigid hour-by-hour schedules, I assign themes: Mondays for research, Tuesdays for prototyping, Wednesdays for reviews. It lowers friction when switching contexts.</p><p>A themed day still allows for meetings, but it gives me a default answer to “what should I focus on next?”</p>',
        language: 'plain'
      },
      {
        id: 'protect-90-minutes',
        title: 'Protect a 90-Minute Block',
        content:
          '<p>Every morning I guard a 90-minute block before Slack opens. That time is for flow-state tasks only—writing strategy docs, refining interfaces, or planning experiments.</p><p>Even if the rest of the day goes sideways, those 90 minutes keep momentum alive.</p>',
        language: 'plain'
      }
    ]
  },
  {
    id: 3,
    slug: 'book-review-deep-learning',
    title: 'Book Review: "Deep Learning"',
    excerpt:
      'Notes from my latest reread of “Deep Learning” by Goodfellow, Bengio, and Courville—what still resonates for product designers working with AI teams.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
    category: 'Book',
    tags: ['Review', 'AI', 'Books'],
    date: '2024-03-28',
    author: 'Thao Phuong',
    readTimeMinutes: 6,
    sections: [
      {
        id: 'why-reread',
        title: 'Why Revisit This Book',
        content:
          '<p>The book is still the clearest bridge between math-heavy explanations and practical intuition. Whenever I design AI tooling, I revisit the chapters on representation learning and optimization tricks.</p><p>It reminds me where models can bend—and where UX has to compensate.</p>',
        language: 'plain'
      },
      {
        id: 'takeaways-for-designers',
        title: 'Takeaways for Designers',
        content:
          '<p>Designers do not need to derive every equation, but understanding the trade-offs behind model choices helps you set realistic expectations with stakeholders.</p><p>My favorite exercise is mapping the “training loop” to user onboarding: both need tight feedback cycles and careful measurement.</p>',
        language: 'plain'
      }
    ]
  },
  {
    id: 4,
    slug: 'reflections-on-a-calm-evening',
    title: 'Reflections on a Calm Evening',
    excerpt:
      'A quiet field note from a sunset hike, and the questions it posed about how we pace ourselves between projects.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    category: 'Learning',
    tags: ['Mindfulness', 'Journaling'],
    date: '2024-03-12',
    author: 'Thao Phuong',
    readTimeMinutes: 4,
    sections: [
      {
        id: 'slowing-down',
        title: 'Slowing Down to Notice',
        content:
          '<p>Creative work thrives on contrast. After weeks of rushing between deadlines, the deliberate pace of a trail reminds me that attention is a muscle—we have to give it new textures.</p><p>I jotted down the way the light shifted every five minutes, and it changed how I approached color palettes the following week.</p>',
        language: 'plain'
      },
      {
        id: 'bringing-lessons-home',
        title: 'Bringing the Lessons Home',
        content:
          '<p>Back at my desk, I scheduled micro-pauses into the workday: three-minute breaks to stand up, drink water, and acknowledge something outside the screen.</p><p>It turns out calm is a habit you can practice, not just a place you visit.</p>',
        language: 'plain'
      }
    ]
  }
]

const craftProjects = [
  {
    id: 1,
    slug: 'rewire-your-brain',
    title: 'Rewire Your Brain',
    caption: 'Mobile App · CBT Companion',
    description: 'Designing a dopamine rehab experience that feels playful, empathetic, and habit-forming.',
    tags: ['Mental Health', 'Product Design', 'Case Study'],
    imageSrc: '/images/placeholder.png',
    imageAlt: 'Mockup of the Rewire Your Brain mobile app'
  },
  {
    id: 2,
    slug: 'ai-therapy',
    title: 'AI Therapy Assistant',
    caption: 'Concept Study',
    description: 'Brief body text that explains the project in a calm, simple tone.',
    tags: ['AI', 'Therapy', 'Research'],
    imageSrc: '/images/placeholder.png',
    imageAlt: 'AI therapy assistant interface concept'
  },
  {
    id: 3,
    slug: 'wellness-os',
    title: 'Wellness OS',
    caption: '1 line description / caption',
    description: 'Brief body text that explains the project in a calm, simple tone.',
    tags: ['Behavioral Design', 'Product Strategy'],
    imageSrc: '/images/placeholder.png',
    imageAlt: 'Wellness OS dashboard mockup'
  },
  {
    id: 4,
    slug: 'mindful-sparks',
    title: 'Mindful Sparks',
    caption: '1 line description / caption',
    description: 'Brief body text that explains the project in a calm, simple tone.',
    tags: ['Micro-interactions', 'Motion'],
    imageSrc: '/images/placeholder.png',
    imageAlt: 'Motion study for Mindful Sparks'
  }
]

const craftCaseStudies = [
  {
    id: 1,
    slug: 'rewire-your-brain',
    category: 'Mobile App Design',
    title: 'Rewire Your Brain',
    subtitle:
      '“Dopago” is a CBT-based psychotherapy app designed for modern day people living amidst constant dopamine highs. I designed the experience to make the rehab journey pleasurable, empathetic, and habit-forming.',
    overview: [
      { label: 'Project Type', value: 'Solo Project' },
      { label: 'My Role', value: 'Product Design — research, visual design' },
      { label: 'Timeline', value: 'Dec 2022 – Jan 2023' },
      { label: 'Tools', value: 'Figma, Miro' }
    ],
    heroShots: [
      {
        src: 'https://images.unsplash.com/photo-1554734867-bf3c3c4f9c6e?auto=format&fit=crop&w=600&q=80',
        alt: 'Therapy dashboard screen'
      },
      {
        src: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
        alt: 'Friendly AI therapist profile'
      },
      {
        src: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=600&q=80',
        alt: 'Course catalog view'
      }
    ],
    sections: [
      {
        id: 'overview',
        kicker: 'At-A-Glance',
        heading: 'Designing a kinder dopamine companion',
        copy: [
          'Dopago invites people to reframe their relationship with dopamine. Rather than shaming addictive behavior, the product meets users where they are and guides them toward healthier routines through CBT-inspired prompts, playful feedback, and micro-interactions.'
        ],
        media: {
          src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80',
          alt: 'Moodboard with journey notes'
        }
      },
      {
        id: 'problem',
        kicker: 'The Problem',
        heading: 'Instant gratification is exhausting',
        copy: [
          'Collectors of dopamine hits—from social media to games—struggle to sustain focus on long-term goals. Existing rehab solutions often feel sterile and punitive, leading to drop off after a few days. We needed a gentler, more resonant intervention.'
        ],
        media: {
          src: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80',
          alt: 'Person overwhelmed by notifications'
        }
      },
      {
        id: 'solution',
        kicker: 'The Solution',
        heading: 'Make the journey pleasurable',
        copy: [
          'My approach layered positive reinforcement, personalized rituals, and narrative therapy. The app pairs each user with an AI therapist who celebrates micro-wins, suggests targeted CBT exercises, and maintains a safe space for reflection.'
        ],
        media: {
          src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
          alt: 'Positive reinforcement illustration'
        }
      },
      {
        id: 'process',
        kicker: 'Process',
        heading: 'From research to prototype',
        copy: [
          'I started with diary studies to understand daily dopamine triggers, mapped emotional states, and defined opportunity areas. Wireframes explored gradual commitment ramps, while visual exploration leaned into friendly gradients and soft typography to counter the clinical feel of typical rehab apps.'
        ],
        media: {
          src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80',
          alt: 'Design workshop with sticky notes'
        }
      },
      {
        id: 'reflection',
        kicker: 'Reflection',
        heading: 'Designing for compassion',
        copy: [
          'The biggest lesson was designing interventions that respect agency. Instead of forcing detox, Dopago nudges users to acknowledge patterns and design their own rituals. Future iterations will explore biofeedback and closer therapist collaboration.'
        ],
        media: {
          src: 'https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=900&q=80',
          alt: 'Designer journaling learnings'
        }
      }
    ]
  }
]

const OUTPUT_DIR = path.join(__dirname, '..', 'supabase_seed')

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

function escapeCsv(value) {
  if (value === null || value === undefined) {
    return ''
  }
  const str = typeof value === 'string' ? value : JSON.stringify(value)
  const normalized = str.replace(/\r?\n/g, ' ')
  return `"${normalized.replace(/"/g, '""')}"`
}

function writeCsv(filename, header, rows) {
  const csv = [header.join(',')]
  for (const row of rows) {
    csv.push(row.map(escapeCsv).join(','))
  }
  const filePath = path.join(OUTPUT_DIR, filename)
  fs.writeFileSync(filePath, csv.join('\n'), 'utf8')
  console.log(`Wrote ${filePath}`)
}

writeCsv(
  'blog_posts.csv',
  ['id', 'slug', 'title', 'excerpt', 'image', 'category', 'tags', 'date', 'author', 'read_time_minutes', 'sections'],
  blogPosts.map((post) => [
    post.id,
    post.slug,
    post.title,
    post.excerpt,
    post.image,
    post.category,
    post.tags,
    post.date,
    post.author,
    post.readTimeMinutes,
    post.sections
  ])
)

writeCsv(
  'craft_projects.csv',
  ['id', 'slug', 'title', 'caption', 'description', 'tags', 'image_src', 'image_alt'],
  craftProjects.map((project) => [
    project.id,
    project.slug,
    project.title,
    project.caption,
    project.description,
    project.tags,
    project.imageSrc,
    project.imageAlt
  ])
)

writeCsv(
  'craft_case_studies.csv',
  ['id', 'slug', 'category', 'title', 'subtitle', 'overview', 'hero_shots', 'sections'],
  craftCaseStudies.map((study) => [
    study.id,
    study.slug,
    study.category,
    study.title,
    study.subtitle,
    study.overview,
    study.heroShots,
    study.sections
  ])
)
