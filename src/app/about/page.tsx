import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About ExpressDocks | Factory-Direct Aluminum Docks',
  description: 'ExpressDocks manufactures commercial-grade aluminum truss docks from our facility in Middletown, Delaware. 50-year warranty. Factory pre-assembled and photo-documented.',
}

export default function Page() {
  return (
    <main style={{ background: '#0E1433', color: '#EEF1FA' }}>
      {/* HERO */}
      <section className="relative py-32 px-6 text-center" style={{
        backgroundImage: 'linear-gradient(rgba(14,20,51,0.65), rgba(14,20,51,0.65)), url("/images/about-hero.webp")',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>About Us</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">We Build Docks Differently</h1>
        <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgba(238,241,250,0.85)' }}>
          Commercial-grade marina dock systems. Factory pre-assembled. Photo-documented. Shipped direct.
        </p>
      </section>

      {/* THE STORY */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The ExpressDocks Standard</h2>
          <div className="space-y-6 text-lg" style={{ color: 'rgba(238,241,250,0.85)' }}>
            <p>
              We manufacture <strong>commercial-grade aluminum truss docks</strong> — the same structural system used in full-scale marinas. The difference? We've modularized it so it can be palletized, shipped on a standard freight truck, and assembled with basic hand tools.
            </p>
            <p>
              <strong>No barge. No crane. No pile driver.</strong> Just a truck in your driveway and a few helping hands.
            </p>
            <p>
              Our docks are built from <strong>6061-T6 aluminum</strong> — the same high-grade alloy used in aerospace and marine applications. It doesn't rust, it doesn't corrode, and it doesn't weaken over time in water. This is why we can offer a <strong>50-year warranty</strong>. The material makes the warranty possible.
            </p>
          </div>
        </div>
      </section>

      {/* THE FACTORY PROCESS */}
      <section className="py-20 px-6" style={{ background: 'rgba(138,149,201,0.04)' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Our Factory Process</h2>
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto" style={{ color: 'rgba(238,241,250,0.7)' }}>
            This is our biggest differentiator. If anything doesn't fit in the factory, it's fixed there — not on your waterfront.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { num: '1', title: 'Custom Built to Order', desc: 'Every dock is designed and manufactured to your exact specifications. No off-the-shelf compromises.' },
              { num: '2', title: 'Pre-Assembled in Factory', desc: 'Your complete dock is assembled and quality-checked in our facility before shipping. We catch problems before you do.' },
              { num: '3', title: 'Photo-Documented', desc: 'Every step of assembly is photographed. These photos ship WITH your dock — your personal assembly guide showing YOUR exact dock.' },
              { num: '4', title: 'Palletized & Shipped Direct', desc: 'Broken down into modular components, palletized, and shipped via standard freight truck directly to your driveway.' },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl" style={{ background: 'rgba(138,149,201,0.08)', border: '1px solid rgba(138,149,201,0.15)' }}>
                <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center text-xl font-bold" style={{ background: '#3B4A8F' }}>{item.num}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p style={{ color: 'rgba(238,241,250,0.7)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE 50-YEAR WARRANTY */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">The 50-Year Warranty</h2>
          <div className="p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, #3B4A8F 0%, #2A3A7F 100%)' }}>
            <p className="text-2xl font-bold mb-4">We only sell what we can stand behind for 50 years.</p>
            <p className="text-lg" style={{ color: 'rgba(238,241,250,0.85)' }}>
              That's the standard. It's possible because of the material — <strong>6061-T6 aluminum</strong> is a high-grade, high-density alloy that doesn't rust, corrode, or degrade in saltwater or freshwater environments. The material justifies the warranty.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO / DON'T DO */}
      <section className="py-20 px-6" style={{ background: 'rgba(138,149,201,0.04)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#8A95C9' }}>What We Do</h3>
              <ul className="space-y-4">
                {[
                  'Manufacture commercial-grade aluminum truss docks',
                  'Custom design to your specifications',
                  'Pre-assemble and quality-check in factory',
                  'Photo-document the entire build process',
                  'Ship palletized via freight to your driveway',
                  'Provide complete assembly documentation',
                  'Back everything with a 50-year warranty',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span style={{ color: 'rgba(238,241,250,0.85)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#8A95C9' }}>What We Don't Do</h3>
              <ul className="space-y-4">
                {[
                  'Installation services — we manufacture and ship only',
                  'Heavy equipment rentals',
                  'On-site construction',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span style={{ color: 'rgba(238,241,250,0.85)' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 p-4 rounded-lg" style={{ background: 'rgba(138,149,201,0.1)', color: 'rgba(238,241,250,0.7)' }}>
                Our modular system is designed for straightforward assembly with basic hand tools — impact driver and wrenches. Most customers install themselves or hire local labor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Quick Facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Warranty', value: '50 Years' },
              { label: 'Material', value: '6061-T6 Aluminum' },
              { label: 'Build Time', value: '~1 Week' },
              { label: 'Total Process', value: '~6 Weeks' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-xl" style={{ background: 'rgba(138,149,201,0.08)' }}>
                <div className="text-3xl font-bold mb-2" style={{ color: '#8A95C9' }}>{item.value}</div>
                <div style={{ color: 'rgba(238,241,250,0.7)' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-20 px-6" style={{ background: 'rgba(138,149,201,0.04)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Headquartered in Delaware</h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(238,241,250,0.85)' }}>
            Our manufacturing facility is located in Middletown, Delaware. We ship factory-direct to customers across the United States, Canada, and Caribbean.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:800-370-2285" className="inline-block px-8 py-4 rounded-lg font-bold transition hover:scale-105" style={{ background: '#3B4A8F', color: '#EEF1FA' }}>
              Call: 800-370-2285
            </a>
            <a href="mailto:info@expressdocks.com" className="inline-block px-8 py-4 rounded-lg font-bold transition hover:scale-105" style={{ background: 'rgba(138,149,201,0.15)', color: '#EEF1FA', border: '1px solid rgba(138,149,201,0.3)' }}>
              info@expressdocks.com
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
