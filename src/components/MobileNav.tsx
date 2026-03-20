'use client'
import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/residential', label: 'Residential Docks' },
  { href: '/commercial-docks', label: 'Commercial / Marina' },
  { href: '/modular-docks', label: 'Modular Docks' },
  { href: '/non-modular-docks', label: 'Non-Modular Docks' },
  { href: '/pilebuddy', label: 'PileBuddy' },
  { href: '/dockhouses', label: 'Dock Houses' },
  { href: '/cement-docks', label: 'Cement Docks' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About Us' },
  { href: '/become-a-dealer', label: 'Become a Dealer' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} className="text-white p-2" aria-label="Menu">
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>
      {open && (
        <div className="absolute top-16 left-0 right-0 z-50 shadow-xl" style={{ background: '#0E1433', borderTop: '1px solid rgba(138,149,201,0.2)' }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              className="block px-6 py-3 font-medium transition"
              style={{ color: '#EEF1FA', borderBottom: '1px solid rgba(138,149,201,0.1)' }}>
              {link.label}
            </Link>
          ))}
          <div className="p-4">
            <Link href="/contact" onClick={() => setOpen(false)}
              className="block text-center py-3 rounded-lg font-bold transition"
              style={{ background: '#3B4A8F', color: '#EEF1FA' }}>
              Get Free Quote →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
