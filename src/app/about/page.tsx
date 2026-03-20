import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About ExpressDocks | Factory-Direct Aluminum Docks Since 2012',
  description: 'ExpressDocks has been manufacturing and shipping premium aluminum dock systems since 2012 from our 30,000 sqft facility in Middletown, Delaware.',
}

export default function Page() {
  return (
    <main>
      <section className="relative text-white py-32 px-6 text-center"
        style={{ backgroundImage: 'linear-gradient(rgba(10,22,40,0.80), rgba(10,22,40,0.80)), url("/images/welding-frame.webp")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">About ExpressDocks</h1>
        <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">Factory-direct aluminum dock manufacturer. Built in America. Shipped worldwide.</p>
      </section>
      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-[#0a1628] mb-4">Who We Are</h2>
            <p className="text-gray-600 mb-4">ExpressDocks has been manufacturing premium aluminum floating dock systems since 2012. Operating from a 30,000 square foot facility in Middletown, Delaware, we sell factory-direct to homeowners, contractors, and marina operators across the US, Canada, and Caribbean.</p>
            <p className="text-gray-600 mb-4">We manufacture and ship only — we do not provide installation services. Our dock systems are engineered for straightforward assembly and come with complete installation documentation.</p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Founded 2012</li>
              <li>✓ 30,000 sqft manufacturing facility</li>
              <li>✓ Middletown, Delaware</li>
              <li>✓ Factory-direct — no dealer markups</li>
              <li>✓ Ships US, Canada & Caribbean</li>
              <li>✓ 50-yr residential / 40-yr commercial guarantee</li>
            </ul>
          </div>
          <img src="/images/welding-frame.webp" alt="ExpressDocks aluminum frame construction" className="rounded-xl shadow-lg w-full" />
        </div>
        <div className="bg-[#0a1628] text-white rounded-xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Build Your Dock</h2>
          <p className="text-gray-300 mb-6">Free custom 3D design in 48 hours. Starting at $50/sqft. No obligation.</p>
          <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold transition inline-block">Get Free Quote →</a>
        </div>
      </section>
    </main>
  )
}
