import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Commercial Dock Systems | Express Docks',
  description: 'Durable, low-maintenance commercial dock systems designed for marinas, resorts, municipalities, and waterfront developments. No heavy equipment required.',
}

export default function Page() {
  const images = [
    'commercial-drone.webp',
    'commercial-b141f742.webp',
    'commercial-93b4a6d2.webp',
    'commercial-577417a3.webp',
    'commercial-a0d86c43.webp',
    'commercial-547eadfe.webp',
    'commercial-0e5dfc13.webp',
    'commercial-5cfce446.webp',
  ]

  return (
    <main style={{ background: '#0E1433', color: '#EEF1FA' }}>
      <section className="relative py-32 px-6 text-center" style={{
        backgroundImage: 'linear-gradient(rgba(14,20,51,0.55), rgba(14,20,51,0.55)), url("/images/commercial-drone.webp")',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Commercial</p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Commercial Dock Systems</h1>
        <p className="text-xl mb-4 max-w-2xl mx-auto" style={{ color: 'rgba(238,241,250,0.85)' }}>
          No Heavy Equipment Required. Durable, low-maintenance commercial dock systems for marinas, resorts, municipalities, and waterfront developments nationwide.
        </p>
        <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105 mt-4"
          style={{ background: '#3B4A8F', color: '#EEF1FA', boxShadow: '0 4px 24px rgba(59,74,143,0.5)' }}>
          Get a Commercial Quote →
        </a>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: '#EEF1FA' }}>A Smarter Dock System for Demanding Environments</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: '⚡', title: 'Reliable Durability', desc: 'Aluminum construction resists rust, rot, and harsh weather for long-term performance.' },
            { icon: '🔧', title: 'Modular Flexibility', desc: 'Configure your layout today and expand or adjust as your business grows.' },
            { icon: '🏗️', title: 'Simple Installation', desc: 'Most systems can be installed without cranes or specialized crews.' },
            { icon: '🚚', title: 'Nationwide Shipping', desc: 'Pre-packaged and palletized for efficient delivery directly to your site.' },
          ].map(item => (
            <div key={item.title} className="p-6 rounded-2xl" style={{ background: 'rgba(59,74,143,0.15)', border: '1px solid rgba(138,149,201,0.2)' }}>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold mb-2" style={{ color: '#EEF1FA' }}>{item.title}</h3>
              <p className="text-sm" style={{ color: 'rgba(238,241,250,0.65)' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-lg mb-10 text-center" style={{ color: 'rgba(238,241,250,0.75)' }}>
          Solutions for: Marinas and boat clubs · Resorts and waterfront rentals · Municipal and public access docks · Work platforms for industrial use · Seasonal docks for dealers
        </p>

        {images.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {images.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden hover:scale-105 transition duration-300 shadow-lg">
                <img src={`/images/${img}`} alt="Commercial dock system" className="w-full h-64 object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        )}

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#EEF1FA' }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Can you design a custom layout?', a: 'Yes. We work with you to design a configuration that fits your shoreline, slip needs, and water conditions.' },
              { q: 'How long does delivery take?', a: 'Most orders ship within 3–5 weeks, depending on scope and location.' },
              { q: 'Is professional installation required?', a: 'Not necessarily. Many commercial clients handle installation in-house or use local contractors. We offer support materials and can recommend service partners.' },
              { q: 'Can the system be expanded over time?', a: 'Yes. All commercial docks are modular, making future expansions or reconfigurations easy.' },
              { q: 'Do you offer financing?', a: 'We work with trusted partners to provide equipment financing options upon request.' },
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
          <p className="mb-6" style={{ color: 'rgba(238,241,250,0.85)' }}>Request a tailored quote for your commercial waterfront project. Our team provides specifications, pricing, and timelines within 48 hours.</p>
          <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold transition hover:scale-105" style={{ background: '#EEF1FA', color: '#0E1433' }}>
            Get a Custom Quote →
          </a>
        </div>
      </section>
    </main>
  )
}
