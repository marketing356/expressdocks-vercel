import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Residential Floating Docks | ExpressDocks',
  description: 'Premium aluminum floating dock systems for homeowners. Starting at $60/sqft with a 50-year guarantee. Factory-direct, ships to your waterfront.',
}

export default function Page() {
  return (
    <main>
      <section className="relative text-white py-32 px-6 text-center"
        style={{ backgroundImage: 'linear-gradient(rgba(10,22,40,0.80), rgba(10,22,40,0.80)), url("/images/residential-docks.webp")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Residential Floating Docks</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Premium aluminum dock systems for homeowners. Factory-direct from <strong>$60/sqft</strong> with a 50-year guarantee.</p>
        <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition">Get Your Free Quote →</a>
      </section>
      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-[#0a1628] mb-4">Built for Homeowners, Priced for Value</h2>
            <p className="text-gray-600 mb-4">Our residential aluminum dock systems are engineered to last a lifetime — literally. We back them with a 50-year structural guarantee, the longest in the industry.</p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Starting at <strong>$60/sqft</strong> — factory-direct pricing</li>
              <li>✓ 50-year residential guarantee</li>
              <li>✓ Ships to all US states, Canada & Caribbean</li>
              <li>✓ Free custom 3D design in 48 hours</li>
              <li>✓ No installation service — easy DIY assembly</li>
            </ul>
          </div>
          <img src="/images/residential-docks.webp" alt="Residential Aluminum Dock" className="rounded-xl shadow-lg w-full" />
        </div>
        <div className="bg-[#0a1628] text-white rounded-xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Design Your Dock?</h2>
          <p className="text-gray-300 mb-6">Send us a sketch or description and get a free 3D design in 48 hours.</p>
          <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold transition inline-block">Get Free Quote →</a>
        </div>
      </section>
    </main>
  )
}
