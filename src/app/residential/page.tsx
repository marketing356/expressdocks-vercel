import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Residential Dock Systems | ExpressDocks',
  description: 'Commercial-grade aluminum docks for residential waterfront properties. 6061-T6 aluminum, 50-year warranty, factory pre-assembled. Starting at $55/sqft.',
}

export default function Page() {
  const images = [
    'res-lifestyle-1.jpg',
    'res-lifestyle-2.jpg', 
    'res-lifestyle-3.jpg',
    'res-1.jpg',
    'res-2.jpg',
    'res-3.jpg',
    'res-4.jpg',
    'res-5.jpg',
    'res-6.jpg',
    'res-7.jpg',
    'res-8.jpg',
  ]

  return (
    <main style={{ background: '#0E1433', color: '#EEF1FA' }}>
      <section className="relative py-32 px-6 text-center" style={{
        backgroundImage: 'linear-gradient(rgba(14,20,51,0.55), rgba(14,20,51,0.55)), url("/images/residential-docks.webp")',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Residential</p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Commercial-Grade Dock.<br />Residential Installation.</h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: 'rgba(238,241,250,0.85)' }}>
          The same aluminum truss system used in full-scale marinas — modularized so it assembles with basic hand tools. Starting at <strong>$55/sqft</strong>.
        </p>
        <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105"
          style={{ background: '#3B4A8F', color: '#EEF1FA', boxShadow: '0 4px 24px rgba(59,74,143,0.5)' }}>
          Get a Custom Quote →
        </a>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">No Barge. No Crane. No Pile Driver.</h2>
          <p className="text-xl" style={{ color: 'rgba(238,241,250,0.85)' }}>
            Just a truck in your driveway and a few helping hands. Our residential dock systems are designed for straightforward assembly with an impact driver and wrenches — no heavy equipment needed.
          </p>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: 'rgba(138,149,201,0.04)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What You Get</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🛡️', title: '50-Year Warranty', desc: 'We only sell what we can stand behind for 50 years. The material makes the warranty possible.' },
              { icon: '✈️', title: '6061-T6 Aluminum Frame', desc: 'Aerospace and marine grade alloy. Double truss construction — not cheap extruded box aluminum.' },
              { icon: '🎨', title: 'WPC Composite Decking', desc: '6 colors available: Teak, Gray, Walnut, Charcoal, Driftwood, Espresso. Maintenance-free.' },
              { icon: '📸', title: 'Photo Documentation', desc: 'Every step of YOUR dock assembly is photographed. Photos ship with your dock as your personal guide.' },
              { icon: '🔧', title: 'Basic Hand Tools', desc: 'Impact driver and wrenches. No cranes, no barges, no pile drivers, no heavy equipment.' },
              { icon: '🚚', title: 'Factory Direct Shipping', desc: 'Pre-assembled in our factory, then palletized and shipped via freight to your driveway.' },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl" style={{ background: 'rgba(138,149,201,0.08)', border: '1px solid rgba(138,149,201,0.15)' }}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p style={{ color: 'rgba(238,241,250,0.7)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">The Factory Process</h2>
          <p className="text-center text-lg mb-12" style={{ color: 'rgba(238,241,250,0.7)' }}>
            If anything doesn't fit in the factory, it's fixed there — not on your waterfront.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Custom Design', time: 'Day 1' },
              { step: '2', title: 'Factory Build', time: '~1 Week' },
              { step: '3', title: 'Photo Documentation', time: 'Included' },
              { step: '4', title: 'Ship to You', time: '~6 Weeks Total' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-xl" style={{ background: 'rgba(138,149,201,0.08)' }}>
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold" style={{ background: '#3B4A8F' }}>{item.step}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm" style={{ color: '#8A95C9' }}>{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: 'rgba(138,149,201,0.04)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden">
                <img src={`/images/${img}`} alt={`Residential dock ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Common Questions</h2>
          <div className="space-y-6">
            {[
              { q: 'What tools do I need to install?', a: 'Impact driver and wrenches. Our modular system is designed for straightforward assembly — no cranes, barges, or heavy equipment.' },
              { q: 'Will the dock be damaged if my lake freezes?', a: 'No — aluminum handles freezing better than wood or steel. It won\'t crack from freeze/thaw cycles. Many customers leave their docks in year-round.' },
              { q: 'Why 50 years warranty?', a: 'Because of the material — 6061-T6 aluminum doesn\'t rust, corrode, or weaken in water. The material makes the warranty possible.' },
              { q: 'Do you install?', a: 'We manufacture and ship only. Our modular system goes together with basic hand tools. Most customers install themselves or hire local labor.' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl" style={{ background: 'rgba(138,149,201,0.08)', border: '1px solid rgba(138,149,201,0.15)' }}>
                <h3 className="font-bold mb-3">{item.q}</h3>
                <p style={{ color: 'rgba(238,241,250,0.7)' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 text-center" style={{ background: 'linear-gradient(135deg, #3B4A8F 0%, #2A3A7F 100%)' }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(238,241,250,0.85)' }}>
          Design your dock in our 3D builder or get a custom quote from our team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/dock3d" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105" style={{ background: '#EEF1FA', color: '#0E1433' }}>
            3D Dock Builder
          </a>
          <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105" style={{ background: 'transparent', color: '#EEF1FA', border: '2px solid rgba(238,241,250,0.5)' }}>
            Get a Quote
          </a>
        </div>
        <p className="mt-8" style={{ color: 'rgba(238,241,250,0.7)' }}>
          Or call: <a href="tel:800-370-2285" className="font-bold" style={{ color: '#EEF1FA' }}>800-370-2285</a>
        </p>
      </section>
    </main>
  )
}
