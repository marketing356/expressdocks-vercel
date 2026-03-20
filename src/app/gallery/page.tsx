import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Gallery | ExpressDocks',
  description: 'Browse completed aluminum dock installations — residential, commercial, modular and custom configurations across the US, Canada and Caribbean.',
}

export default function Page() {
  // Real project photos from ExpressDocks installations
  const images = [
    { src: '/images/gallery-real-1.webp', alt: 'Completed dock installation', label: 'Residential Installation' },
    { src: '/images/gallery-real-2.webp', alt: 'Aluminum dock project', label: 'Aluminum Dock Project' },
    { src: '/images/gallery-real-3.webp', alt: 'Custom dock configuration', label: 'Custom Configuration' },
    { src: '/images/gallery-real-4.webp', alt: 'Completed dock project', label: 'Waterfront Installation' },
    { src: '/images/gallery-real-5.webp', alt: 'ExpressDocks installation', label: 'Residential Dock System' },
    { src: '/images/commercial-drone.webp', alt: 'Commercial marina aerial view', label: 'Commercial Marina — Aerial' },
    { src: '/images/residential-docks.webp', alt: 'Residential dock kit', label: 'Residential Dock Kit' },
    { src: '/images/modular-hero.webp', alt: 'Modular dock system', label: 'Modular System' },
    { src: '/images/welding-frame.webp', alt: 'Aluminum dock frame construction', label: 'Aluminum Frame Construction' },
    { src: '/images/pricing-drone.webp', alt: 'Dock aerial view', label: 'Aerial — Full Dock System' },
    { src: '/images/gallery-4.jpg', alt: 'Marina with WPC decking', label: 'Marina — Brown WPC Decking' },
    { src: '/images/gallery-1.jpg', alt: 'Premium aluminum dock', label: 'Premium Dock System' },
  ]
  return (
    <main className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-[#0a1628] mb-4">Project Gallery</h1>
      <p className="text-gray-600 mb-12">Every dock we build is custom-engineered to your waterfront. Browse completed installations across the US, Canada, and Caribbean.</p>
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
