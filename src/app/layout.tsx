import type { Metadata } from 'next'
import './globals.css'
import MobileNav from '@/components/MobileNav'

export const metadata: Metadata = {
  title: 'ExpressDocks | Factory-Direct Aluminum Floating Docks',
  description: 'Premium aluminum floating dock systems. Factory-direct pricing from $60/sqft. Ships US, Canada & Caribbean. 50-year residential guarantee.',
  openGraph: {
    title: 'ExpressDocks | Factory-Direct Aluminum Floating Docks',
    description: 'Premium aluminum floating dock systems starting at $60/sqft. Free 3D design in 48 hours.',
    url: 'https://www.expressdocks.com',
    siteName: 'ExpressDocks',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <nav className="text-white py-4 px-6 flex items-center justify-between sticky top-0 z-50 shadow-lg relative" style={{ background: '#0E1433', borderBottom: '1px solid rgba(138,149,201,0.15)' }}>
          <a href="/" className="text-xl font-bold tracking-wide">
            <span className="text-blue-400">Express</span>Docks
          </a>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="/residential" className="hover:text-blue-300 transition">Residential</a>
            <a href="/commercial-docks" className="hover:text-blue-300 transition">Commercial</a>
            <a href="/modular-docks" className="hover:text-blue-300 transition">Modular</a>
            <a href="/pricing" className="hover:text-blue-300 transition">Pricing</a>
            <a href="/gallery" className="hover:text-blue-300 transition">Gallery</a>
            <a href="/about" className="hover:text-blue-300 transition">About</a>
            <a href="/blog" className="hover:text-blue-300 transition">Blog</a>
            <a href="/contact" className="hover:text-blue-300 transition">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="/contact" className="hidden md:block px-4 py-2 rounded font-semibold text-sm transition hover:scale-105" style={{ background: "#3B4A8F", color: "#EEF1FA" }}>
              Get Free Quote
            </a>
            <MobileNav />
          </div>
        </nav>
        {children}
        <footer className="text-white py-12 px-6 mt-16" style={{ background: '#080d26', borderTop: '1px solid rgba(138,149,201,0.15)' }}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
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
                <li><a href="/non-modular-docks" className="hover:text-white">Non-Modular Docks</a></li>
                <li><a href="/pilebuddy" className="hover:text-white">PileBuddy</a></li>
                <li><a href="/store" className="hover:text-white">Store</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/gallery" className="hover:text-white">Gallery</a></li>
                <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="/become-a-dealer" className="hover:text-white">Become a Dealer</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>📞 <a href="tel:8003702285" className="hover:text-white">800-370-2285</a></li>
                <li>✉️ <a href="mailto:info@expressdocks.com" className="hover:text-white">info@expressdocks.com</a></li>
                <li>📍 Middletown, Delaware</li>
              </ul>
              <div className="flex gap-3 mt-4">
                <a href="https://www.facebook.com/expressdocks" target="_blank" rel="noopener" className="text-gray-400 hover:text-white text-sm">Facebook</a>
                <a href="https://www.instagram.com/expressdocks" target="_blank" rel="noopener" className="text-gray-400 hover:text-white text-sm">Instagram</a>
                <a href="https://x.com/expressdocks" target="_blank" rel="noopener" className="text-gray-400 hover:text-white text-sm">X</a>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500 text-xs mt-8 border-t border-gray-700 pt-6">
            © {new Date().getFullYear()} ExpressDocks. All rights reserved. | <a href="/contact" className="hover:text-white">Contact Us</a>
          </div>
        </footer>
      </body>
    </html>
  )
}
