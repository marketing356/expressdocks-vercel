import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dock Houses & Boat Houses | ExpressDocks',
  description: 'Custom aluminum dock houses and boat houses designed to protect your investment and enhance your waterfront property. Built with the same premium materials as our docks.',
}

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-6">
      <div className="text-6xl mb-6">🏠</div>
      <h1 className="text-4xl font-bold text-[#0a1628] mb-6">Dock Houses & Boat Houses</h1>
      <p className="text-xl text-gray-600 mb-10 leading-relaxed">Custom aluminum dock houses and boat houses designed to protect your investment and enhance your waterfront property. Built with the same premium materials as our docks.</p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-10">
        <h2 className="text-2xl font-bold text-[#0a1628] mb-4">Get Your Free Custom 3D Design</h2>
        <p className="text-gray-600 mb-6">Send us your waterfront sketch or project details. Use our free Dock Builder to design your dock instantly — or contact us and we will help.</p>
        <a href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition text-lg">
          Request Free Quote →
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border border-gray-200 rounded-xl text-center">
          <div className="text-3xl mb-2">📞</div>
          <div className="font-bold text-[#0a1628]">Call Us</div>
          <a href="tel:8003702285" className="text-blue-600 hover:underline">800-370-2285</a>
        </div>
        <div className="p-6 border border-gray-200 rounded-xl text-center">
          <div className="text-3xl mb-2">✉️</div>
          <div className="font-bold text-[#0a1628]">Email Us</div>
          <a href="mailto:info@expressdocks.com" className="text-blue-600 hover:underline text-sm">info@expressdocks.com</a>
        </div>
        <div className="p-6 border border-gray-200 rounded-xl text-center">
          <div className="text-3xl mb-2">🎨</div>
          <div className="font-bold text-[#0a1628]">Free 3D Design</div>
          <div className="text-sm text-gray-500">Instantly</div>
        </div>
      </div>

      <div className="text-center">
        <a href="/blog" className="text-blue-600 hover:text-blue-800 font-medium mr-6">Read Our Blog →</a>
        <a href="/pricing" className="text-blue-600 hover:text-blue-800 font-medium">View Pricing →</a>
      </div>
    </main>
  )
}
