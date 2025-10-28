// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-[3rem] w-full border-t border-gray-200">
      <div className="relative mx-auto max-w-[1200px] pt-8 pb-6 text-sm text-gray-600 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/70">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 sm:gap-x-6 text-center sm:text-left">
          <p>
            <a href="https://linkedin.com" target="_blank" className="hover:underline">
              LinkedIn ↗
            </a>
          </p>
          <p>
            <a href="https://linkedin.com" target="_blank" className="hover:underline">
              Youtube ↗
            </a>
          </p>
          <p>
            <a href="https://linkedin.com" target="_blank" className="hover:underline">
              Tiktok ↗
            </a>
          </p>
          <p>
            <a href="mailto:hello@thaophuong.dev" className="hover:underline">
              Mail ↗
            </a>
          </p>
        </div>

        <div className="text-center sm:text-right">
          <p>© 2025 Thao Phuong. All Rights Reserved.</p>
          <p className="mt-1 text-gray-500">
            Made with 🤍 and Vietnamese Coffee
            <br />
            (Bold, smooth, and strong enough to wake dreams).
          </p>
        </div>
      </div>
    </footer>
  )
}
