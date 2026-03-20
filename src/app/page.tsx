export default function Home() {
  return (
    <main>
      {/* Hero with background image */}
      <section
        className="relative text-white py-32 px-6 text-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(10,22,40,0.82), rgba(10,22,40,0.82)), url(https://images.unsplash.com/photo-1562155618-e1a8bc2eb04f?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
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
              {
                title: 'Residential',
                price: '$60',
                unit: '/sqft',
                desc: 'Perfect for home docks, boat lifts, and personal waterfront access.',
                example: 'Example: 20×8 ft dock ≈ $9,600',
                guarantee: '50-Year Guarantee',
              },
              {
                title: 'Commercial / Marina',
                price: '$75',
                unit: '/sqft',
                desc: 'Heavy-duty systems built for marinas, resorts, and commercial properties.',
                example: 'Example: 10-slip marina ≈ $75,000+',
                guarantee: '40-Year Guarantee',
                featured: true,
              },
              {
                title: 'Fingers & Gangways',
                price: '$85',
                unit: '/sqft',
                desc: 'Specialty dock fingers, gangways, and transition pieces.',
                example: 'Example: 4 dock fingers ≈ $12,000',
                guarantee: 'Custom Engineering',
              },
            ].map((tier) => (
              <div key={tier.title} className={`rounded-xl p-8 shadow-md ${tier.featured ? 'bg-[#0a1628] text-white scale-105' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold mb-2 ${tier.featured ? 'text-blue-300' : 'text-[#0a1628]'}`}>{tier.title}</h3>
                <div className="text-5xl font-extrabold my-4">{tier.price}<span className="text-2xl font-normal">{tier.unit}</span></div>
                <p className={`text-sm mb-2 ${tier.featured ? 'text-gray-300' : 'text-gray-600'}`}>{tier.desc}</p>
                <p className={`text-xs italic mb-4 ${tier.featured ? 'text-blue-300' : 'text-blue-600'}`}>{tier.example}</p>
                <p className={`text-xs font-semibold ${tier.featured ? 'text-blue-300' : 'text-blue-600'}`}>{tier.guarantee}</p>
                <a href="/contact" className={`mt-6 block text-center py-3 rounded-lg font-bold transition ${tier.featured ? 'bg-blue-500 hover:bg-blue-400 text-white' : 'bg-[#0a1628] hover:bg-blue-800 text-white'}`}>
                  Get Quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#0a1628]">What Our Customers Say</h2>
          <p className="text-gray-500 text-center mb-12">Hundreds of docks installed across the US, Canada & Caribbean</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "We got three quotes for our lake dock and ExpressDocks came in $12,000 under the competition. The quality is outstanding — way better than what the local guys were offering. The free 3D design sealed the deal.",
                name: "Tom R.",
                location: "Lake Norman, NC",
                dock: "Residential Floating Dock — 24×10 ft",
              },
              {
                quote: "We expanded our marina from 20 to 48 slips using ExpressDocks commercial systems. The price was right, delivery was on schedule, and the product has held up perfectly through two hurricane seasons.",
                name: "Marina Manager, Gulf Coast",
                location: "Fort Myers, FL",
                dock: "Commercial Marina Expansion",
              },
              {
                quote: "Best decision we made for our lake house. The aluminum looks sharp, it doesn't rot like our old wood dock, and the 50-year guarantee gives real peace of mind. Setup was straightforward with their instructions.",
                name: "Linda & Dave M.",
                location: "Lake Champlain, VT",
                dock: "Residential Modular System — 32×8 ft",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-[#0a1628] text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.location}</p>
                  <p className="text-blue-600 text-xs mt-1">{t.dock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ExpressDocks */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0a1628]">Why Choose ExpressDocks?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🏭', title: 'Factory Direct', desc: 'Buy straight from the manufacturer. No dealers, no markups. That\'s how we offer 50-year-quality at $60/sqft.' },
              { icon: '⚡', title: 'Solid Aluminum', desc: 'Never rots, never rusts, never splinters. Our aluminum frames outperform wood and steel in every marine environment.' },
              { icon: '🎨', title: 'Free 3D Design', desc: 'Send us a sketch, photo, or description. We return a full custom 3D dock design in 48 hours — free, no obligation.' },
              { icon: '🚢', title: 'Ships Anywhere', desc: 'We ship to all 50 US states, Canada, and the Caribbean. No job is too remote.' },
              { icon: '🛡️', title: '50-Year Guarantee', desc: 'The longest guarantee in the industry. 50 years residential, 40 years commercial. We stand behind every dock we build.' },
              { icon: '📐', title: 'Custom Built', desc: 'Every dock is engineered to your exact waterfront — shape, depth, tidal range, and use case. No off-the-shelf guessing.' },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-[#0a1628]">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#0a1628]">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-center mb-12">Everything you need to know before you buy</p>
          <div className="space-y-4">
            {[
              {
                q: "Do you install the docks or just ship them?",
                a: "We manufacture and ship — we do not provide installation services. Our docks are engineered for straightforward assembly and come with complete installation documentation. Most customers install with a small crew in a weekend. We also have a dealer network that can provide local installation."
              },
              {
                q: "How long does shipping take?",
                a: "Standard lead time is 4–6 weeks from order confirmation to delivery. Larger commercial orders may require 8–10 weeks. We ship via flatbed freight to your nearest accessible location. Rush orders are available — contact us to discuss your timeline."
              },
              {
                q: "What does the warranty actually cover?",
                a: "Our 50-year residential and 40-year commercial guarantees cover structural defects in the aluminum frame. We stand behind every dock we manufacture. The warranty is non-transferable and covers material and manufacturing defects under normal use conditions."
              },
              {
                q: "Can you ship to my state / location?",
                a: "Yes. We ship to all 50 US states, all Canadian provinces, and throughout the Caribbean. International shipping is available — contact us for a freight quote to your specific location."
              },
              {
                q: "Do I need permits to install a dock?",
                a: "Permit requirements vary by state, county, and waterfront type. Most residential dock installations require a local or state permit. We recommend contacting your state's Department of Environmental Protection or equivalent agency before purchasing. We can provide documentation and engineering specs to support your permit application."
              },
              {
                q: "What does 'factory-direct' actually mean?",
                a: "It means you buy directly from the company that manufactures your dock — us. No distributors, no dealers, no middlemen adding margins. The price you pay is our manufacturing cost plus our margin, not a chain of markups. This is how we offer industry-leading quality at $60/sqft when comparable products cost $90–$120/sqft through retail channels."
              },
            ].map((item, i) => (
              <details key={i} className="border border-gray-200 rounded-xl overflow-hidden group">
                <summary className="px-6 py-4 font-semibold text-[#0a1628] cursor-pointer hover:bg-gray-50 transition flex justify-between items-center list-none">
                  {item.q}
                  <span className="text-blue-500 ml-4 text-xl">+</span>
                </summary>
                <div className="px-6 py-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 bg-gray-50">
                  {item.a}
                </div>
              </details>
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
