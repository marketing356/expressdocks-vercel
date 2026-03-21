import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Become an ExpressDocks Dealer | $50–$125/sqft Margin',
  description: 'Offer marina-grade aluminum dock systems and keep $50–$125 per square foot in your pocket. Free to join. No inventory required. Factory-direct pricing.',
}

export default function Page() {
  return (
    <main style={{ background: '#0E1433', color: '#EEF1FA' }}>
      <section className="py-24 px-6 text-center" style={{ borderBottom: '1px solid rgba(138,149,201,0.15)' }}>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Dealer Program</p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Become an ExpressDocks Dealer</h1>
        <p className="text-2xl mb-8 max-w-3xl mx-auto" style={{ color: 'rgba(238,241,250,0.85)' }}>
          Offer your clients a marina-grade aluminum dock system with solid WPC decking — and keep <strong style={{ color: '#EEF1FA' }}>$50 to $125 per square foot</strong> in your pocket.
        </p>
        <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105"
          style={{ background: '#3B4A8F', color: '#EEF1FA', boxShadow: '0 4px 24px rgba(59,74,143,0.5)' }}>
          Apply to Become a Dealer →
        </a>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-3 gap-6 mb-16 text-center">
          <div className="p-8 rounded-2xl" style={{ background: 'rgba(59,74,143,0.15)', border: '1px solid rgba(138,149,201,0.2)' }}>
            <div className="text-4xl font-black mb-2" style={{ color: '#8A95C9' }}>$75</div>
            <div className="text-sm" style={{ color: 'rgba(238,241,250,0.65)' }}>Your cost per sq ft</div>
          </div>
          <div className="p-8 rounded-2xl" style={{ background: '#3B4A8F', boxShadow: '0 8px 40px rgba(59,74,143,0.4)' }}>
            <div className="text-4xl font-black mb-2" style={{ color: '#EEF1FA' }}>$150+</div>
            <div className="text-sm" style={{ color: 'rgba(238,241,250,0.8)' }}>What you charge clients</div>
          </div>
          <div className="p-8 rounded-2xl" style={{ background: 'rgba(59,74,143,0.15)', border: '1px solid rgba(138,149,201,0.2)' }}>
            <div className="text-4xl font-black mb-2" style={{ color: '#8A95C9' }}>50yr</div>
            <div className="text-sm" style={{ color: 'rgba(238,241,250,0.65)' }}>Residential guarantee</div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#EEF1FA' }}>Who Should Become a Dealer?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {[
            { icon: '⚓', title: 'Dock Builders', desc: 'Replace wood builds with premium aluminum — charge more, work less, have happier clients.' },
            { icon: '🏗️', title: 'Marine Contractors', desc: 'Add factory-direct dock systems to your project quotes and capture the full waterfront scope.' },
            { icon: '🏠', title: 'Waterfront Home Builders', desc: 'Every lakefront or coastal home you build is a dock opportunity. Close it yourself.' },
            { icon: '🌿', title: 'Landscape Contractors', desc: 'Working on waterfront properties? Offer the dock as part of the complete outdoor living package.' },
            { icon: '🔨', title: 'General Contractors', desc: 'Any renovation on a waterfront property is an opportunity to upsell a dock system.' },
            { icon: '🏝️', title: 'Caribbean & Canadian Contractors', desc: 'We ship anywhere. Resorts, marinas, and residential waterfront — fully supported.' },
          ].map(item => (
            <div key={item.title} className="p-6 rounded-2xl" style={{ background: 'rgba(59,74,143,0.1)', border: '1px solid rgba(138,149,201,0.15)' }}>
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="font-bold mb-2" style={{ color: '#EEF1FA' }}>{item.title}</h3>
              <p className="text-sm" style={{ color: 'rgba(238,241,250,0.65)' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#EEF1FA' }}>Dealer Benefits</h2>
        <div className="space-y-4 mb-16">
          {[
            { icon: '📍', title: 'Local Leads Sent to You', desc: 'We generate leads in your geographical area and send them directly to you.' },
            { icon: '💰', title: 'Factory-Direct Pricing', desc: 'You order at our factory-direct price. You set your own retail price and keep the full margin.' },
            { icon: '📦', title: 'No Inventory Required', desc: 'Order only when you have a job. No warehouse, no stock, no capital tied up.' },
            { icon: '📐', title: 'Full Design Support', desc: 'Our engineering team helps you design the right system for every project. Quick turnaround on all quotes.' },
            { icon: '🎓', title: 'Training & Resources', desc: 'Installation guides, product specs, marketing materials, and sales support.' },
            { icon: '🛡️', title: 'Industry-Leading Warranty', desc: 'Back every job with a 50-year residential guarantee.' },
          ].map(item => (
            <div key={item.title} className="flex gap-4 p-5 rounded-xl" style={{ background: 'rgba(59,74,143,0.1)', border: '1px solid rgba(138,149,201,0.15)' }}>
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h3 className="font-bold" style={{ color: '#EEF1FA' }}>{item.title}</h3>
                <p className="text-sm mt-1" style={{ color: 'rgba(238,241,250,0.65)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-10 text-center" style={{ background: '#3B4A8F' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#EEF1FA' }}>Apply to Become a Dealer</h2>
          <p className="mb-6" style={{ color: 'rgba(238,241,250,0.85)' }}>Becoming an ExpressDocks dealer is free — and it comes with everything you need to start selling immediately.</p>
          <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold transition hover:scale-105" style={{ background: '#EEF1FA', color: '#0E1433' }}>
            Apply Now →
          </a>
        </div>
      </section>
    </main>
  )
}
