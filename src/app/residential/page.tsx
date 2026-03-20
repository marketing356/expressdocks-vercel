import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Residential Dock Kits | Express Docks',
  description: 'DIY-friendly residential dock systems. Marine-grade aluminum, maintenance-free, ships nationwide. Most docks install in a weekend.',
}

export default function Page() {
  const imgDir = path.join(process.cwd(), 'public/images')
  const allFiles = fs.readdirSync(imgDir)
  const images = allFiles.filter(f => f.startsWith('residential-') && (f.endsWith('.webp') || f.endsWith('.jpg')))

  return (
    <main style={{ background: '#0E1433', color: '#EEF1FA' }}>
      <section className="relative py-32 px-6 text-center" style={{
        backgroundImage: 'linear-gradient(rgba(14,20,51,0.55), rgba(14,20,51,0.55)), url("/images/residential-docks.webp")',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Residential</p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Residential Dock Kits</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(238,241,250,0.85)' }}>
          DIY-friendly systems that reduce project costs without sacrificing durability. Starting at <strong>$50/sqft</strong>.
        </p>
        <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105"
          style={{ background: '#3B4A8F', color: '#EEF1FA', boxShadow: '0 4px 24px rgba(59,74,143,0.5)' }}>
          Get a Custom Quote →
        </a>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: '#EEF1FA' }}>The Smart Way to Add a Dock to Your Property</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: '🔧', title: 'DIY-Friendly Assembly', desc: 'Simple bolt-together design. Most docks install in a weekend using basic tools.' },
            { icon: '🛡️', title: 'Maintenance-Free', desc: 'Marine-grade aluminum won\'t rot, rust, or require painting.' },
            { icon: '📐', title: 'Fits Your Waterfront', desc: 'Kits available for lakes, rivers, ponds, and tidal areas. Custom sizing optional.' },
            { icon: '🚚', title: 'Nationwide Shipping', desc: 'Compact, palletized delivery makes receiving your dock easy and affordable.' },
          ].map(item => (
            <div key={item.title} className="p-6 rounded-2xl" style={{ background: 'rgba(59,74,143,0.15)', border: '1px solid rgba(138,149,201,0.2)' }}>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold mb-2" style={{ color: '#EEF1FA' }}>{item.title}</h3>
              <p className="text-sm" style={{ color: 'rgba(238,241,250,0.65)' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-lg mb-6 text-center" style={{ color: 'rgba(238,241,250,0.75)' }}>
          Perfect for: Private lakefront docks · River or canal access · Backyard pond setups · Bulkhead docks
        </p>

        {images.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {images.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden hover:scale-105 transition duration-300 shadow-lg">
                <img src={`/images/${img}`} alt="Residential dock" className="w-full h-64 object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        )}

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#EEF1FA' }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I really install this myself?', a: 'Most customers install their dock using standard hand tools. We include detailed instructions and phone support if needed.' },
              { q: 'What comes in the kit?', a: 'Each kit includes all dock sections, fasteners, flotation, and instructions. You provide basic tools and anchoring based on your shoreline.' },
              { q: 'How long does shipping take?', a: 'Most kits ship within 2–3 weeks. We\'ll provide tracking and delivery coordination.' },
              { q: 'Can I remove the dock in winter?', a: 'Yes. Our modular design allows for seasonal removal and reinstallation.' },
              { q: 'What if I need help choosing the right size?', a: 'Our team can walk you through the best setup based on your location and needs.' },
            ].map((item, i) => (
              <details key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(138,149,201,0.2)' }}>
                <summary className="px-6 py-4 font-semibold cursor-pointer list-none flex justify-between" style={{ background: 'rgba(59,74,143,0.1)', color: '#EEF1FA' }}>
                  {item.q} <span style={{ color: '#8A95C9' }}>+</span>
                </summary>
                <div className="px-6 py-4 text-sm" style={{ color: 'rgba(238,241,250,0.7)', background: 'rgba(14,20,51,0.5)' }}>{item.a}</div>
              </details>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-10 text-center" style={{ background: '#3B4A8F' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#EEF1FA' }}>Build Your Dock, Your Way</h2>
          <p className="mb-6" style={{ color: 'rgba(238,241,250,0.85)' }}>Tell us about your shoreline and we'll help you choose the perfect dock kit.</p>
          <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold transition hover:scale-105" style={{ background: '#EEF1FA', color: '#0E1433' }}>
            Get a Custom Quote →
          </a>
        </div>
      </section>
    </main>
  )
}
