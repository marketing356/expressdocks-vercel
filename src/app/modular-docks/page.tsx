import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modular Dock Systems | ExpressDocks',
  description: 'Flexible modular aluminum dock systems that snap together and can be reconfigured. Factory-direct from $60/sqft.',
}

export default function Page() {
  return (
    <main>
      <section className="relative text-white py-32 px-6 text-center"
        style={{ backgroundImage: 'linear-gradient(rgba(10,22,40,0.80), rgba(10,22,40,0.80)), url("/images/premium-aluminum.webp")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Modular Dock Systems</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Flexible aluminum dock systems that snap together, reconfigure easily, and last a lifetime. From <strong>$60/sqft</strong>.</p>
        <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition">Get Free Quote →</a>
      </section>
      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-[#0a1628] mb-4">The Smart Choice for Flexible Waterfront Access</h2>
            <p className="text-gray-600 mb-4">Modular dock systems give you the freedom to expand, reconfigure, or relocate your dock as your needs change — without starting from scratch.</p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Snap-together aluminum sections</li>
              <li>✓ Easily expanded or reconfigured</li>
              <li>✓ No welding or special tools required</li>
              <li>✓ Same 50-year residential guarantee</li>
              <li>✓ From <strong>$60/sqft</strong> factory-direct</li>
            </ul>
          </div>
          <img src="/images/premium-aluminum.webp" alt="Modular Aluminum Dock System" className="rounded-xl shadow-lg w-full" />
        </div>
        <div className="bg-[#0a1628] text-white rounded-xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Design Your Modular Dock</h2>
          <p className="text-gray-300 mb-6">Get a free custom 3D design in 48 hours — no obligation.</p>
          <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold transition inline-block">Start Free Design →</a>
        </div>
      </section>
    </main>
  )
}
