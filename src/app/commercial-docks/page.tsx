import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commercial Dock Systems | ExpressDocks',
  description: 'Durable, low-maintenance commercial dock systems designed for marinas, resorts, municipalities, and waterfront developments. No heavy equipment required.',
}

export default function Page() {
  const images = [
    'commercial-drone.webp',
    'commercial-b141f742.webp',
    'commercial-93b4a6d2.webp',
    'commercial-577417a3.webp',
    'commercial-a0d86c43.webp',
    'commercial-547eadfe.webp',
    'commercial-0e5dfc13.webp',
    'commercial-5cfce446.webp',
  ]

  return (
    <main style={{ background: '#0E1433', color: '#EEF1FA' }}>
      <section className="relative py-32 px-6 text-center" style={{
        backgroundImage: 'linear-gradient(rgba(14,20,51,0.55), rgba(14,20,51,0.55)), url("/images/commercial-drone.webp")',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Commercial</p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Commercial Dock Systems</h1>
        <p className="text-xl mb-4 max-w-2xl mx-auto" style={{ color: 'rgba(238,241,250,0.85)' }}>
          No Heavy Equipment Required. Durable, low-maintenance commercial dock systems for marinas, resorts, municipalities, and waterfront developments nationwide.
        </p>
        <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105 mt-4"
          style={{ background: '#3B4A8F', color: '#EEF1FA', boxShadow: '0 4px 24px rgba(59,74,143,0.5)' }}>
          Request Commercial Quote →
        </a>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: '#EEF1FA' }}>A Smarter Dock System for Demanding Environments</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Reliable Durability */}
          <div className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4" style={{ color: '#00D4FF' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#EEF1FA' }}>Reliable Durability</h3>
            <p className="text-sm" style={{ color: '#8A95C9' }}>Aluminum construction resists rust, rot, and harsh weather for long-term performance.</p>
          </div>
          {/* Modular Flexibility */}
          <div className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4" style={{ color: '#00D4FF' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#EEF1FA' }}>Modular Flexibility</h3>
            <p className="text-sm" style={{ color: '#8A95C9' }}>Configure your layout today and expand or adjust as your business grows.</p>
          </div>
          {/* Simple Installation */}
          <div className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4" style={{ color: '#00D4FF' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#EEF1FA' }}>Simple Installation</h3>
            <p className="text-sm" style={{ color: '#8A95C9' }}>Most systems can be installed without cranes or specialized crews.</p>
          </div>
          {/* Nationwide Shipping */}
          <div className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4" style={{ color: '#00D4FF' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#EEF1FA' }}>Nationwide Shipping</h3>
            <p className="text-sm" style={{ color: '#8A95C9' }}>Pre-packaged and palletized for efficient delivery directly to your site.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6" style={{ background: '#151B3D' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#EEF1FA' }}>Commercial Gallery</h2>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {images.map((img, i) => (
              <div key={i} className="mb-4 rounded-xl overflow-hidden break-inside-avoid hover:scale-105 transition duration-300">
                <img src={`/images/${img}`} alt={`Commercial dock ${i + 1}`} className="w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for a Commercial Quote?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#8A95C9' }}>
          Contact our commercial team for specifications and competitive pricing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="inline-block px-8 py-4 rounded-lg font-bold transition"
            style={{ background: '#00D4FF', color: '#0E1433' }}>
            Request Commercial Quote
          </a>
          <a href="tel:800-370-2285" className="inline-block px-8 py-4 rounded-lg font-bold border transition"
            style={{ borderColor: '#3B4A8F', color: '#EEF1FA' }}>
            Call 800-370-2285
          </a>
        </div>
      </section>
    </main>
  )
}
