import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Non-Modular Dock Systems | ExpressDocks',
  description: 'Custom-engineered aluminum dock systems built to your exact specifications. Ideal for permanent installations with specific structural requirements.',
}

export default function Page() {
  const images = ['/images/non_modular_docks-6075e38c.webp', '/images/non_modular_docks-cc761daf.webp', '/images/non_modular_docks-ba9dfa27.webp', '/images/non_modular_docks-ea4930f8.webp']

  return (
    <main style={{ background: '#0E1433', color: '#EEF1FA' }}>
      <section className="relative py-32 px-6 text-center" style={{
        backgroundImage: 'linear-gradient(rgba(14,20,51,0.6), rgba(14,20,51,0.6)), url("/images/non-modular-hero.webp")',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Products</p>
        <h1 className="text-5xl md:text-6xl font-black mb-6">Non-Modular Dock Systems</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(238,241,250,0.85)' }}>
          Custom-engineered aluminum dock systems built to your exact specifications. Ideal for permanent installations.
        </p>
        <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105"
          style={{ background: '#3B4A8F', color: '#EEF1FA', boxShadow: '0 4px 24px rgba(59,74,143,0.5)' }}>
          Request Free Quote →
        </a>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-6">
        {images.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 mb-16">
            {images.map((src, i) => (
              <div key={i} className="mb-4 rounded-xl overflow-hidden break-inside-avoid hover:scale-105 transition duration-300">
                <img src={src} alt={`Non-modular dock ${i + 1}`} className="w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-black mb-6" style={{ color: '#EEF1FA' }}>Engineered for Your Exact Waterfront</h2>
            <p className="mb-4" style={{ color: 'rgba(238,241,250,0.7)' }}>When your waterfront demands a permanent, custom-engineered solution, non-modular docks deliver superior structural integrity and a tailored fit.</p>
            <ul className="space-y-3" style={{ color: 'rgba(238,241,250,0.75)' }}>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> Custom-engineered to exact specifications</li>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> Superior structural integrity for permanent installs</li>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> All-aluminum — never rots, rusts, or splinters</li>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> 50-year residential guarantee</li>
              <li className="flex items-center gap-3"><span style={{ color: '#8A95C9' }}>✓</span> Factory-direct pricing</li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl p-6" style={{ background: 'rgba(59,74,143,0.15)', border: '1px solid rgba(138,149,201,0.2)' }}>
              <div className="text-3xl mb-2">📞</div>
              <div className="font-bold mb-1" style={{ color: '#EEF1FA' }}>Call Us</div>
              <a href="tel:8003702285" className="hover:text-white transition" style={{ color: '#8A95C9' }}>800-370-2285</a>
            </div>
            <div className="rounded-2xl p-6" style={{ background: 'rgba(59,74,143,0.15)', border: '1px solid rgba(138,149,201,0.2)' }}>
              <div className="text-3xl mb-2">🎨</div>
              <div className="font-bold mb-1" style={{ color: '#EEF1FA' }}>Free 3D Design</div>
              <p className="text-sm" style={{ color: 'rgba(238,241,250,0.6)' }}>Use our free Dock Builder tool to design your dock now.</p>
              <a href="/contact" className="mt-3 inline-block px-6 py-2 rounded-lg font-semibold text-sm transition hover:scale-105"
                style={{ background: '#3B4A8F', color: '#EEF1FA' }}>
                Start My Design →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
