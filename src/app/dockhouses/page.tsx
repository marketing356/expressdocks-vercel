import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dock Houses & Boathouses | ExpressDocks',
  description: 'Custom aluminum dock houses and boathouses. Built to last with marine-grade materials.',
}

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-6" style={{ background: '#0E1433', color: '#EEF1FA', minHeight: '100vh' }}>
      <div className="w-16 h-16 mx-auto mb-6" style={{ color: '#00D4FF' }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-center mb-6">Dock Houses & Boathouses</h1>
      <p className="text-xl text-center mb-10 leading-relaxed" style={{ color: '#8A95C9' }}>
        Custom aluminum dock houses and boathouses built with the same marine-grade materials as our dock systems.
      </p>

      <div className="rounded-xl p-8 mb-10" style={{ background: '#151B3D', border: '1px solid rgba(138,149,201,0.2)' }}>
        <h2 className="text-2xl font-bold mb-4">Request Your Free Quote</h2>
        <p className="mb-6" style={{ color: '#8A95C9' }}>Tell us about your project and we'll provide a custom quote.</p>
        <a href="/contact" className="inline-block px-8 py-4 rounded-lg font-bold transition text-lg"
          style={{ background: '#00D4FF', color: '#0E1433' }}>
          Request Free Quote
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-xl text-center" style={{ border: '1px solid rgba(138,149,201,0.2)' }}>
          <div className="w-8 h-8 mx-auto mb-2" style={{ color: '#00D4FF' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </div>
          <div className="font-bold">Call Us</div>
          <a href="tel:8003702285" style={{ color: '#00D4FF' }}>800-370-2285</a>
        </div>
        <div className="p-6 rounded-xl text-center" style={{ border: '1px solid rgba(138,149,201,0.2)' }}>
          <div className="w-8 h-8 mx-auto mb-2" style={{ color: '#00D4FF' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <div className="font-bold">Email Us</div>
          <a href="mailto:info@expressdocks.com" className="text-sm" style={{ color: '#00D4FF' }}>info@expressdocks.com</a>
        </div>
        <div className="p-6 rounded-xl text-center" style={{ border: '1px solid rgba(138,149,201,0.2)' }}>
          <div className="w-8 h-8 mx-auto mb-2" style={{ color: '#00D4FF' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </div>
          <div className="font-bold">Free Quote</div>
          <span className="text-sm" style={{ color: '#8A95C9' }}>Custom pricing</span>
        </div>
      </div>
    </main>
  )
}
