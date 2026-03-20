import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modular Dock Systems | ExpressDocks',
  description: 'Flexible modular aluminum dock systems that snap together and can be reconfigured. Factory-direct from $60/sqft.',
}

export default function Page() {
  const images = [
    '/images/modular-hero.webp',
    '/images/modular-0f04c029.webp',
    '/images/modular-35fa1d2a.webp',
    '/images/modular-88bb4207.webp',
    '/images/modular-0bb40a89.webp',
    '/images/gallery-real-1.webp',
    '/images/gallery-real-4.webp',
  ]

  return (
    <main style={{ background: '#0E1433', color: '#EEF1FA' }}>
      <section className="relative text-white py-32 px-6 text-center"
        style={{ backgroundImage: 'linear-gradient(rgba(14,20,51,0.6), rgba(14,20,51,0.6)), url("/images/modular-hero.webp")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Products</p>
        <h1 className="text-5xl md:text-6xl font-black mb-6">Modular Dock Systems</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(238,241,250,0.85)' }}>
          Flexible aluminum dock systems that snap together, reconfigure easily, and last a lifetime. From <strong>$60/sqft</strong>.
        </p>
        <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105"
          style={{ background: '#3B4A8F', color: '#EEF1FA', boxShadow: '0 4px 24px rgba(59,74,143,0.5)' }}>
          Get Free Quote →
        </a>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-6">
        {images.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 mb-16">
            {images.map((src, i) => (
              <div key={i} className="mb-4 rounded-xl overflow-hidden break-inside-avoid hover:scale-105 transition duration-300">
                <img src={src} alt={`Modular dock system ${i + 1}`} className="w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-black mb-6" style={{ color: '#EEF1FA' }}>The Smart Choice for Flexible Waterfront Access</h2>
            <p className="mb-4" style={{ color: 'rgba(238,241,250,0.7)' }}>Modular dock systems give you the freedom to expand, reconfigure, or relocate your dock as your needs change — without starting from scratch.</p>
            <ul className="space-y-3" style={{ color: 'rgba(238,241,250,0.75)' }}>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> Snap-together aluminum sections</li>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> Easily expanded or reconfigured</li>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> No welding or special tools required</li>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> Same 50-year residential guarantee</li>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> From <strong style={{ color: '#EEF1FA' }}>$60/sqft</strong> factory-direct</li>
            </ul>
          </div>
          <div className="rounded-2xl p-8" style={{ background: 'rgba(59,74,143,0.15)', border: '1px solid rgba(138,149,201,0.2)' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#EEF1FA' }}>Design Your Modular Dock</h3>
            <p className="mb-6" style={{ color: 'rgba(238,241,250,0.7)' }}>Get a Use our Dock Builder to design your dock instantly.</p>
            <a href="/contact" className="block text-center py-3 rounded-lg font-bold transition hover:scale-105"
              style={{ background: '#3B4A8F', color: '#EEF1FA' }}>
              Start Free Design →
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
