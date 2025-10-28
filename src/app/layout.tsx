
import './globals.css'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { BlogProvider } from '@/features/blog'
import { AuthProvider } from '@/providers/AuthProvider'
export const metadata = { title: 'Thao Phuong', description: 'Designing systems that think—and feel.' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative flex min-h-screen flex-col bg-white text-gray-900 antialiased" suppressHydrationWarning>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('/bg/Cloud-Only.png')] bg-repeat bg-top" />
        <AuthProvider>
          <BlogProvider>
            <div
              className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col"
              style={{ backgroundPosition: 'center -7%' }}
            >
              <Navbar />
              <img
                src="/bg/Cloud-Only.png"
                alt="Cloud Background"
                className="pointer-events-none absolute top-0 left-1/2 w-full -translate-x-1/2 -translate-y-[7%] object-contain opacity-30"
              />

              <div className="relative mx-auto w-full max-w-[1200px] flex-1 px-4">{children}</div>

              <Footer />
            </div>
          </BlogProvider>
        </AuthProvider>
      </body>
    </html >
  )
}
