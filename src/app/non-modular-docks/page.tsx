import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Non-Modular Dock Systems | ExpressDocks',
  description: 'Welded aluminum dock systems for permanent installations. Maximum strength and durability.',
}

export default function Page() {
  return (
    <main style={{ background: '#0E1433', color: '#EEF1FA', minHeight: '100vh' }}>
      <section className="relative py-32 px-6 text-center" style={{
        backgroundImage: 'linear-gradient(rgba(14,20,51,0.6), rgba(14,20,51,0.6)), url("/images/commercial-hero.webp")',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Products</p>
        <h1 className="text-5xl md:text-6xl font-black mb-6">Non-Modular Dock Systems</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(238,241,250,0.85)' }}>
          Welded aluminum dock systems for permanent installations where maximum strength and durability are required.
        </p>
        <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105"
          style={{ background: '#3B4A8F', color: '#EEF1FA', boxShadow: '0 4px 24px rgba(59,74,143,0.5)' }}>
          Get Free Quote →
        </a>
      </section>

      <section className="py-16 px-6" style={{ background: '#151B3D' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">When to Choose Non-Modular</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4" style={{ color: '#00D4FF' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#EEF1FA' }}>Maximum Strength</h3>
              <p className="text-sm" style={{ color: '#8A95C9' }}>Fully welded construction for extreme load requirements.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4" style={{ color: '#00D4FF' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#EEF1FA' }}>Permanent Installations</h3>
              <p className="text-sm" style={{ color: '#8A95C9' }}>Designed for locations where reconfiguration isn't needed.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4" style={{ color: '#00D4FF' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#EEF1FA' }}>Custom Fabrication</h3>
              <p className="text-sm" style={{ color: '#8A95C9' }}>Built to your exact specifications in our facility.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Request Your Quote</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#8A95C9' }}>
          Use our Dock Designer tool or contact us directly for a custom quote.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/configurator" className="inline-block px-8 py-4 rounded-lg font-bold transition"
            style={{ background: '#00D4FF', color: '#0E1433' }}>
            Open Dock Designer
          </a>
          <a href="/contact" className="inline-block px-8 py-4 rounded-lg font-bold border transition"
            style={{ borderColor: '#3B4A8F', color: '#EEF1FA' }}>
            Request Free Quote
          </a>
        </div>
      </section>
    </main>
  )
}
