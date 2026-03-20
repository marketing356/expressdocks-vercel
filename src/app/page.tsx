export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0a1628] text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Factory-Direct Aluminum<br/>
          <span className="text-blue-400">Floating Dock Systems</span>
        </h1>
        <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
          Premium docks starting at <strong className="text-white">$60/sqft</strong>. Ships to US, Canada & Caribbean.
          50-year residential guarantee.
        </p>
        <p className="text-blue-300 mb-10 font-medium">✓ Free Custom 3D Design in 48 Hours — No Obligation</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg">
            Get Your Free Quote
          </a>
          <a href="/gallery" className="border border-white text-white hover:bg-white hover:text-[#0a1628] px-8 py-4 rounded-lg font-bold text-lg transition">
            View Gallery
          </a>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-blue-600 text-white py-4 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-sm font-semibold text-center">
          <span>✓ 50-Year Residential Guarantee</span>
          <span>✓ Factory-Direct Pricing</span>
          <span>✓ Ships US, Canada & Caribbean</span>
          <span>✓ Free 3D Design in 48hrs</span>
          <span>✓ 800-370-2285</span>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0a1628]">Transparent Factory-Direct Pricing</h2>
          <p className="text-gray-600 mb-12 max-w-xl mx-auto">No middlemen. No markups. You buy direct from the manufacturer.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Residential', price: '$60', unit: '/sqft', desc: 'Perfect for home docks, boat lifts, and personal waterfront access.', guarantee: '50-Year Guarantee' },
              { title: 'Commercial / Marina', price: '$75', unit: '/sqft', desc: 'Heavy-duty systems built for marinas, resorts, and commercial properties.', guarantee: '40-Year Guarantee', featured: true },
              { title: 'Fingers & Gangways', price: '$85', unit: '/sqft', desc: 'Specialty dock fingers, gangways, and transition pieces.', guarantee: 'Custom Engineering' },
            ].map((tier) => (
              <div key={tier.title} className={`rounded-xl p-8 shadow-md ${tier.featured ? 'bg-[#0a1628] text-white scale-105' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold mb-2 ${tier.featured ? 'text-blue-300' : 'text-[#0a1628]'}`}>{tier.title}</h3>
                <div className="text-5xl font-extrabold my-4">{tier.price}<span className="text-2xl font-normal">{tier.unit}</span></div>
                <p className={`text-sm mb-4 ${tier.featured ? 'text-gray-300' : 'text-gray-600'}`}>{tier.desc}</p>
                <p className={`text-xs font-semibold ${tier.featured ? 'text-blue-300' : 'text-blue-600'}`}>{tier.guarantee}</p>
                <a href="/contact" className={`mt-6 block text-center py-3 rounded-lg font-bold transition ${tier.featured ? 'bg-blue-500 hover:bg-blue-400 text-white' : 'bg-[#0a1628] hover:bg-blue-800 text-white'}`}>
                  Get Quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ExpressDocks */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0a1628]">Why Choose ExpressDocks?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🏭', title: 'Factory Direct', desc: 'Buy straight from the manufacturer. No dealers, no markups.' },
              { icon: '⚡', title: 'Aluminum Construction', desc: 'Solid aluminum frames that outlast wood and steel in marine environments.' },
              { icon: '🎨', title: 'Free 3D Design', desc: 'Send us a sketch — we return a full 3D design in 48 hours. No obligation.' },
              { icon: '🚢', title: 'Ships Anywhere', desc: 'We ship to all US states, Canada, and the Caribbean.' },
              { icon: '🛡️', title: 'Industry-Leading Guarantee', desc: '50-year residential and 40-year commercial warranties.' },
              { icon: '📐', title: 'Custom Built', desc: 'Every dock is built to your exact specifications and waterfront conditions.' },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-[#0a1628]">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a1628] text-white py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Dream Dock?</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">Get a free custom 3D design and quote within 48 hours. No obligation, no pressure.</p>
        <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-lg font-bold text-lg transition inline-block">
          Start My Free Design →
        </a>
        <p className="mt-4 text-gray-400 text-sm">Or call us: <a href="tel:8003702285" className="text-blue-300 hover:text-white">800-370-2285</a></p>
      </section>
    </main>
  )
}
