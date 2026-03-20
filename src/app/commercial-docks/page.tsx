import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commercial & Marina Dock Systems | ExpressDocks',
  description: 'Heavy-duty aluminum dock systems for marinas, resorts, and waterfront businesses. From $75/sqft with a 40-year guarantee.',
}

export default function Page() {
  return (
    <main>
      <section className="relative text-white py-32 px-6 text-center"
        style={{ backgroundImage: 'linear-gradient(rgba(10,22,40,0.80), rgba(10,22,40,0.80)), url("/images/commercial-docks.webp")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Commercial & Marina Dock Systems</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Heavy-duty aluminum systems built for marinas, resorts, and commercial waterfront operations. From <strong>$75/sqft</strong>.</p>
        <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition">Get Commercial Quote →</a>
      </section>
      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <img src="/images/commercial-docks.webp" alt="Commercial Marina Dock Systems" className="rounded-xl shadow-lg w-full" />
          <div>
            <h2 className="text-3xl font-bold text-[#0a1628] mb-4">Marina-Grade Aluminum Systems</h2>
            <p className="text-gray-600 mb-4">Built for high-traffic environments, our commercial systems are engineered to handle heavy loads, constant vessel traffic, and demanding marine conditions.</p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ From <strong>$75/sqft</strong> — factory-direct</li>
              <li>✓ 40-year commercial guarantee</li>
              <li>✓ Custom configurations for any marina layout</li>
              <li>✓ Scalable — from 10 slips to 500+</li>
              <li>✓ Ships anywhere in US, Canada & Caribbean</li>
            </ul>
          </div>
        </div>
        <div className="bg-[#0a1628] text-white rounded-xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Commercial Project? Let&apos;s Talk.</h2>
          <p className="text-gray-300 mb-6">Large commercial projects are reviewed directly by our President. Contact us for a custom engineering consultation and quote.</p>
          <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold transition inline-block">Request Commercial Quote →</a>
        </div>
      </section>
    </main>
  )
}
