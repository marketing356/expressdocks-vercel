import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Gallery | ExpressDocks',
  description: 'Browse completed aluminum dock installations — residential, commercial, modular and custom configurations across the US, Canada and Caribbean.',
}

export default function Page() {
  const images = [
    { src: '/images/hero.webp', alt: 'Aluminum Floating Dock', label: 'Residential Floating Dock' },
    { src: '/images/residential-docks.webp', alt: 'Residential Dock Kits', label: 'Residential Dock Kit' },
    { src: '/images/commercial-docks.webp', alt: 'Commercial Dock Systems', label: 'Commercial Marina System' },
    { src: '/images/premium-aluminum.webp', alt: 'Premium Aluminum Dock', label: 'Premium Aluminum Construction' },
    { src: '/images/custom-configurations.webp', alt: 'Custom Dock Configuration', label: 'Custom Configuration' },
    { src: '/images/video-bg.webp', alt: 'ExpressDocks Installation', label: 'Professional Installation' },
  ]
  return (
    <main className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-[#0a1628] mb-4">Project Gallery</h1>
      <p className="text-gray-600 mb-12">Completed aluminum dock installations across the US, Canada, and Caribbean.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {images.map((img) => (
          <div key={img.src} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
            <img src={img.src} alt={img.alt} className="w-full h-56 object-cover" />
            <div className="p-4 bg-white">
              <p className="font-semibold text-[#0a1628] text-sm">{img.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#0a1628] text-white rounded-xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Build Yours?</h2>
        <p className="text-gray-300 mb-6">Get a free custom 3D design in 48 hours.</p>
        <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold transition inline-block">Get Free Quote →</a>
      </div>
    </main>
  )
}
