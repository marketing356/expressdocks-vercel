import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Residential Dock Systems | ExpressDocks',
  description: 'Commercial-grade aluminum docks for residential waterfront properties. 6061-T6 aluminum, 25-year warranty, factory pre-assembled.',
}

export default function Page() {
  const images = [
    'res-lifestyle-1.jpg',
    'res-lifestyle-2.jpg', 
    'res-lifestyle-3.jpg',
    'res-1.jpg',
    'res-2.jpg',
    'res-3.jpg',
    'res-4.jpg',
    'res-5.jpg',
    'res-6.jpg',
    'res-7.jpg',
    'res-8.jpg',
  ]

  return (
    <main style={{ background: '#0E1433', color: '#EEF1FA' }}>
      <section className="relative py-32 px-6 text-center" style={{
        backgroundImage: 'linear-gradient(rgba(14,20,51,0.55), rgba(14,20,51,0.55)), url("/images/residential-docks.webp")',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Residential</p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Commercial-Grade Dock.<br />Residential Installation.</h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: 'rgba(238,241,250,0.85)' }}>
          The same aluminum truss system used in full-scale marinas — modularized so it assembles with basic hand tools.
        </p>
        <a href="/contact" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:scale-105"
          style={{ background: '#3B4A8F', color: '#EEF1FA', boxShadow: '0 4px 24px rgba(59,74,143,0.5)' }}>
          Get a Custom Quote →
        </a>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">No Barge. No Crane. No Pile Driver.</h2>
          <p className="text-xl" style={{ color: 'rgba(238,241,250,0.85)' }}>
            Every section ships to your driveway via freight. You carry it to the water, bolt it together, and you're done.
            Same engineering that holds a 50-slip marina — in sections you can handle with two people.
          </p>
        </div>
      </section>

      <section className="py-16 px-6" style={{ background: '#151B3D' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 25-Year Warranty */}
          <div className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4" style={{ color: '#00D4FF' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#EEF1FA' }}>25-Year Warranty</h3>
            <p className="text-sm" style={{ color: '#8A95C9' }}>We only sell what we can stand behind. The material makes the warranty possible.</p>
          </div>
          {/* Photo Documentation */}
          <div className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4" style={{ color: '#00D4FF' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#EEF1FA' }}>Photo Documentation</h3>
            <p className="text-sm" style={{ color: '#8A95C9' }}>Every step of YOUR dock assembly is photographed. Photos ship with your dock.</p>
          </div>
          {/* Basic Hand Tools */}
          <div className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4" style={{ color: '#00D4FF' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#EEF1FA' }}>Basic Hand Tools</h3>
            <p className="text-sm" style={{ color: '#8A95C9' }}>Impact driver and wrenches. No cranes, no barges, no pile drivers.</p>
          </div>
          {/* Direct Delivery */}
          <div className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4" style={{ color: '#00D4FF' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#EEF1FA' }}>Direct to Your Driveway</h3>
            <p className="text-sm" style={{ color: '#8A95C9' }}>Pre-assembled in our factory, palletized and shipped via freight.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#EEF1FA' }}>Residential Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden">
                <img src={`/images/${img}`} alt={`Residential dock ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 text-center" style={{ background: 'linear-gradient(180deg, #151B3D 0%, #0E1433 100%)' }}>
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#EEF1FA' }}>Ready to Start?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#8A95C9' }}>
          Design your dock in our Dock Designer or get a custom quote from our team.
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
