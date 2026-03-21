import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Gallery | ExpressDocks',
  description: 'Browse completed aluminum dock installations — residential, commercial, modular and custom across the US, Canada and Caribbean.',
}

export default function Page() {
  const images = [
    '/images/gallery-real-1.webp', '/images/gallery-real-2.webp',
    '/images/gallery-real-3.webp', '/images/gallery-real-4.webp',
    '/images/gallery-real-5.webp',
    '/images/gallery-4ff2b111.webp', '/images/gallery-e233462c.webp',
    '/images/gallery-8b6e4db2.webp', '/images/gallery-ad8b918a.webp',
    '/images/gallery-5531645d.webp', '/images/gallery-df7e8e73.webp',
    '/images/gallery-b141f742.webp', '/images/gallery-4179414f.webp',
    '/images/gallery-4533669f.webp', '/images/gallery-555dfea0.webp',
    '/images/gallery-da364ddf.webp', '/images/gallery-7242ae5d.webp',
    '/images/gallery-70df0255.webp', '/images/gallery-90d78826.webp',
    '/images/gallery-1fff9523.webp', '/images/gallery-7fd54a04.webp',
    '/images/gallery-dca566d8.webp', '/images/gallery-b5847537.webp',
    '/images/gallery-3aa0de19.webp', '/images/gallery-a269cf2b.webp',
    '/images/gallery-00249e99.webp', '/images/gallery-0b2ccc43.webp',
    '/images/gallery-29448bf6.webp', '/images/gallery-c7ebe3f4.webp',
    '/images/gallery-f66f26e5.webp', '/images/gallery-9f0dab2f.webp',
    '/images/gallery-a1868b5a.webp',
    '/images/gallery-4.jpg', '/images/gallery-1.jpg', '/images/gallery-2.jpg',
  ]

  return (
    <main style={{ background: '#0E1433', color: '#EEF1FA' }}>
      <section className="py-20 px-6 text-center" style={{ borderBottom: '1px solid rgba(138,149,201,0.15)' }}>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Our Work</p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Project Gallery</h1>
        <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(238,241,250,0.7)' }}>
          Every dock is custom-engineered to your waterfront. Browse completed installations across the US, Canada, and Caribbean.
        </p>
      </section>
      <section className="max-w-7xl mx-auto py-12 px-6">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((src, i) => (
            <div key={i} className="break-inside-avoid rounded-xl overflow-hidden hover:scale-105 transition duration-300 shadow-lg">
              <img src={src} alt={`ExpressDocks project ${i + 1}`} className="w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </section>
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Build Yours?</h2>
        <p className="mb-8 text-xl" style={{ color: 'rgba(238,241,250,0.7)' }}>Use our Dock Designer to design your dock instantly. Design your dock and request a quote.</p>
        <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105"
          style={{ background: '#3B4A8F', color: '#EEF1FA', boxShadow: '0 4px 24px rgba(59,74,143,0.5)' }}>
          Get Free Quote →
        </a>
      </section>
    </main>
  )
}
