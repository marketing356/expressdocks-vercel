import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Residential Floating Docks | ExpressDocks',
  description: 'Premium aluminum floating dock systems for homeowners. Starting at $50/sqft with a 50-year guarantee. Factory-direct, ships to your waterfront.',
}

const images = [
  { src: '/images/residential-docks.webp', alt: 'Residential Dock Kit' },
  { src: '/images/residential-5cf0c598.webp', alt: 'Residential Aluminum Dock' },
  { src: '/images/residential-5adbf4e8.webp', alt: 'Home Dock System' },
  { src: '/images/residential-ead8edeb.webp', alt: 'Residential Floating Dock' },
]

export default function Page() {
  return (
    <main style={{ background: '#0E1433', color: '#EEF1FA' }}>
      <section className="relative py-32 px-6 text-center" style={{
        backgroundImage: 'linear-gradient(rgba(14,20,51,0.6), rgba(14,20,51,0.6)), url("/images/residential-docks.webp")',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Products</p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Residential Floating Docks</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(238,241,250,0.8)' }}>
          Premium aluminum dock systems for homeowners. From <strong>$50/sqft</strong> with a 50-year guarantee.
        </p>
        <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105"
          style={{ background: '#3B4A8F', color: '#EEF1FA', boxShadow: '0 4px 24px rgba(59,74,143,0.5)' }}>
          Get Free Quote →
        </a>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {images.map((img, i) => (
            <div key={i} className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
              <img src={img.src} alt={img.alt} className="w-full h-72 object-cover" />
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#EEF1FA' }}>Built for Homeowners, Priced for Value</h2>
            <ul className="space-y-3" style={{ color: 'rgba(238,241,250,0.75)' }}>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> Starting at <strong style={{ color: '#EEF1FA' }}>$50/sqft</strong> — factory-direct</li>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> 50-year residential guarantee</li>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> Ships US, Canada & Caribbean</li>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> Free custom 3D design in 48 hours</li>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> Solid aluminum — never rots or rusts</li>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> Custom built to your waterfront</li>
            </ul>
          </div>
          <div className="rounded-2xl p-8" style={{ background: 'rgba(59,74,143,0.15)', border: '1px solid rgba(138,149,201,0.2)' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#EEF1FA' }}>Free 3D Design in 48 Hours</h3>
            <p className="mb-6" style={{ color: 'rgba(238,241,250,0.7)' }}>Send us your waterfront sketch and we'll return a complete custom 3D dock design — free, no obligation.</p>
            <a href="/contact" className="block text-center py-3 rounded-lg font-bold transition hover:scale-105"
              style={{ background: '#3B4A8F', color: '#EEF1FA' }}>
              Start My Free Design →
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
