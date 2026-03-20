import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Gallery | ExpressDocks',
  description: 'Browse completed aluminum dock installations — residential, commercial, modular and custom configurations across the US, Canada and Caribbean.',
}

export default function Page() {
  const images = [
    { src: '/images/gallery-1.jpg', alt: 'Aluminum Dock with Superyacht', label: 'Premium Marina Dock' },
    { src: '/images/gallery-2.jpg', alt: 'Aluminum Floating Dock System', label: 'Commercial Floating Dock' },
    { src: '/images/gallery-3.jpg', alt: 'Marina Dock with Yacht', label: 'Marina Installation' },
    { src: '/images/gallery-4.jpg', alt: 'Marina with WPC Decking', label: 'Full Marina System — WPC Decking' },
    { src: '/images/gallery-5.jpg', alt: 'European Marina Dock', label: 'European Marina — Aluminum Frame' },
    { src: '/images/gallery-6.jpg', alt: 'Commercial Marina Walkway', label: 'Commercial Marina Walkway' },
    { src: '/images/gallery-7.jpg', alt: 'Premium Aluminum Dock', label: 'Premium Dock Installation' },
    { src: '/images/gallery-8.jpg', alt: 'Aluminum Dock System', label: 'Custom Dock Configuration' },
  ]
  return (
    <main className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-[#0a1628] mb-4">Project Gallery</h1>
      <p className="text-gray-600 mb-12">Completed aluminum dock installations across the US, Canada, and Caribbean. Every project is custom-engineered to your waterfront.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {images.map((img) => (
          <div key={img.src} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition group">
            <div className="overflow-hidden h-64">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
            </div>
            <div className="p-4 bg-white border-t border-gray-100">
              <p className="font-semibold text-[#0a1628] text-sm">{img.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#0a1628] text-white rounded-xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Build Yours?</h2>
        <p className="text-gray-300 mb-6">Get a free custom 3D design in 48 hours — starting at $50/sqft factory-direct.</p>
        <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold transition inline-block">Get Free Quote →</a>
      </div>
    </main>
  )
}
