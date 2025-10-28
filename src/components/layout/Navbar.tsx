'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { mulish } from '@/lib/fonts'

const links = [
  ['/', 'Craft'],
  ['/blog', 'Blog'],
  ['/about', 'About'],
  ['/cv', 'CV']
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-50 bg-sky-15/80 backdrop-blur border-b border-gray-100">
      <nav className="mx-auto max-w-5xl h-16 px-10 flex items-center justify-start">
        <div className={`flex gap-10 text-gray-700 text-normal ${mulish.className}`}>
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`transition-all duration-200 hover:scale-110 hover:opacity-80 ${pathname === href ? 'font-semibold' : 'font-normal text-gray-500'
                }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
