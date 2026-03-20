import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ExpressDocks | Factory-Direct Aluminum Floating Docks',
  description: 'Premium aluminum floating dock systems. Factory-direct pricing from $60/sqft. Ships US, Canada & Caribbean. 50-year residential guarantee.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <nav className="bg-[#0a1628] text-white py-4 px-6 flex items-center justify-between sticky top-0 z-50 shadow-lg">
          <a href="/" className="text-xl font-bold tracking-wide">
            <span className="text-blue-400">Express</span>Docks
          </a>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="/residential" className="hover:text-blue-300 transition">Residential</a>
            <a href="/commercial-docks" className="hover:text-blue-300 transition">Commercial</a>
            <a href="/modular-docks" className="hover:text-blue-300 transition">Modular</a>
            <a href="/pricing" className="hover:text-blue-300 transition">Pricing</a>
            <a href="/gallery" className="hover:text-blue-300 transition">Gallery</a>
            <a href="/blog" className="hover:text-blue-300 transition">Blog</a>
            <a href="/contact" className="hover:text-blue-300 transition">Contact</a>
          </div>
          <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold text-sm transition">
            Get Free Quote
          </a>
        </nav>
        {children}
        <footer className="bg-[#0a1628] text-white py-12 px-6 mt-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3"><span className="text-blue-400">Express</span>Docks</h3>
              <p className="text-gray-400 text-sm">Factory-direct aluminum floating dock systems. Assembled in America. Ships to US, Canada & Caribbean.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Products</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><a href="/residential" className="hover:text-white">Residential Docks</a></li>
                <li><a href="/commercial-docks" className="hover:text-white">Commercial / Marina</a></li>
                <li><a href="/modular-docks" className="hover:text-white">Modular Docks</a></li>
                <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>📞 <a href="tel:8003702285" className="hover:text-white">800-370-2285</a></li>
                <li>✉️ <a href="mailto:info@expressdocks.com" className="hover:text-white">info@expressdocks.com</a></li>
                <li>📍 Middletown, Delaware</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-500 text-xs mt-8 border-t border-gray-700 pt-6">
            © {new Date().getFullYear()} ExpressDocks. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}
