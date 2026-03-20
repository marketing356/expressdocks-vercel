'use client'
import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/residential', label: 'Residential' },
  { href: '/commercial-docks', label: 'Commercial' },
  { href: '/modular-docks', label: 'Modular Docks' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} className="text-white p-2 focus:outline-none" aria-label="Toggle menu">
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-[#0a1628] border-t border-blue-900 z-50 shadow-xl">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              className="block px-6 py-4 text-white hover:bg-blue-900 hover:text-blue-300 transition border-b border-blue-900 font-medium">
              {link.label}
            </Link>
          ))}
          <div className="p-4">
            <Link href="/contact" onClick={() => setOpen(false)}
              className="block text-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition">
              Get Free Quote →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
