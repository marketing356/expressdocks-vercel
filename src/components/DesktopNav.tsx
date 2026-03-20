'use client'
import { useState, useRef } from 'react'

const products = [
  { href: '/residential', label: 'Residential Docks' },
  { href: '/commercial-docks', label: 'Commercial / Marina' },
  { href: '/modular-docks', label: 'Modular Docks' },
  { href: '/non-modular-docks', label: 'Non-Modular Docks' },
  { href: '/pilebuddy', label: 'PileBuddy' },
  { href: '/dockhouses', label: 'Dock Houses' },
  { href: '/cement-docks', label: 'Cement Docks' },
]

export default function DesktopNav() {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }
  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div className="hidden md:flex gap-6 text-sm font-medium items-center">
      {/* Products dropdown */}
      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <button
          className="flex items-center gap-1 hover:text-blue-300 transition py-1"
          style={{ color: '#EEF1FA' }}
        >
          Products
          <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div
            className="absolute top-full left-0 mt-1 rounded-xl shadow-2xl overflow-hidden z-50 w-52"
            style={{ background: '#0E1433', border: '1px solid rgba(138,149,201,0.25)' }}
          >
            {products.map(p => (
              <a
                key={p.href}
                href={p.href}
                className="block px-5 py-3 text-sm font-medium transition-all"
                style={{ color: '#EEF1FA', borderBottom: '1px solid rgba(138,149,201,0.08)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(59,74,143,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {p.label}
              </a>
            ))}
          </div>
        )}
      </div>
      <a href="/pricing" className="hover:text-blue-300 transition" style={{ color: '#EEF1FA' }}>Pricing</a>
      <a href="/gallery" className="hover:text-blue-300 transition" style={{ color: '#EEF1FA' }}>Gallery</a>
      <a href="/about" className="hover:text-blue-300 transition" style={{ color: '#EEF1FA' }}>About</a>
      <a href="/blog" className="hover:text-blue-300 transition" style={{ color: '#EEF1FA' }}>Blog</a>
      <a href="/contact" className="hover:text-blue-300 transition" style={{ color: '#EEF1FA' }}>Contact</a>
    </div>
  )
}
