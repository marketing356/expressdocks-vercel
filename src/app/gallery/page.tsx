import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Project Gallery | ExpressDocks',
  description: 'Browse completed aluminum dock installations — residential, commercial, modular and custom across the US, Canada and Caribbean.',
}

function getAllGalleryImages(): string[] {
  const dir = path.join(process.cwd(), 'public', 'images')
  try {
    return fs.readdirSync(dir)
      .filter(f => f.startsWith('gallery-') && (f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')))
      .sort()
      .map(f => `/images/${f}`)
  } catch { return [] }
}

export default function Page() {
  const images = getAllGalleryImages()

  return (
    <main style={{ background: '#0E1433', color: '#EEF1FA' }}>
      <section className="py-20 px-6 text-center" style={{ borderBottom: '1px solid rgba(138,149,201,0.15)' }}>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Our Work</p>
        <h1 className="text-5xl md:text-6xl font-black mb-6">Project Gallery</h1>
        <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(238,241,250,0.7)' }}>
          Every dock is custom-engineered to your waterfront. Browse {images.length}+ completed installations across the US, Canada, and Caribbean.
        </p>
      </section>

      <section className="max-w-7xl mx-auto py-12 px-6">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {images.map((src, i) => (
            <div key={i} className="mb-4 break-inside-avoid rounded-xl overflow-hidden hover:scale-105 transition duration-300 shadow-lg">
              <img src={src} alt={`ExpressDocks project ${i + 1}`} className="w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-black mb-6" style={{ color: '#EEF1FA' }}>Ready to Build Yours?</h2>
        <p className="mb-8 text-xl" style={{ color: 'rgba(238,241,250,0.7)' }}>Free custom 3D design in 48 hours. Starting at $50/sqft.</p>
        <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105"
          style={{ background: '#3B4A8F', color: '#EEF1FA', boxShadow: '0 4px 24px rgba(59,74,143,0.5)' }}>
          Get Free Quote →
        </a>
      </section>
    </main>
  )
}
