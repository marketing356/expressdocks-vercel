import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Custom Dock Pricing | ExpressDocks',
  description: 'Get personalized pricing for your custom aluminum dock. Every dock is built to your exact specifications.',
}

export default function PricingPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0E1433' }}>
      {/* Hero Section */}
      <section className="relative py-24" style={{ background: 'linear-gradient(180deg, #151B3D 0%, #0E1433 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#EEF1FA' }}>
            Custom Pricing for Custom Docks
          </h1>
          <p className="text-xl mb-8 leading-relaxed" style={{ color: '#8A95C9' }}>
            Every dock is custom-built to your exact specifications. Pricing is based on 
            your design, materials, and location. Talk to Wade or request a quote to get 
            your personalized price.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-lg transition-colors text-lg"
              style={{ background: '#00D4FF', color: '#0E1433' }}
            >
              Request Free Quote
            </Link>
            <Link
              href="/configurator"
              className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-lg transition-colors text-lg border"
              style={{ background: 'transparent', color: '#EEF1FA', borderColor: '#3B4A8F' }}
            >
              Design Your Dock
            </Link>
          </div>
        </div>
      </section>

      {/* What Affects Your Price */}
      <section className="py-20" style={{ background: '#151B3D' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#EEF1FA' }}>
            What Determines Your Price
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-xl p-8 border" style={{ background: '#1A2248', borderColor: '#3B4A8F' }}>
              <div className="w-12 h-12 mb-6" style={{ color: '#00D4FF' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#EEF1FA' }}>Size & Configuration</h3>
              <p style={{ color: '#8A95C9' }}>
                Total square footage, shape complexity, and how many sections your dock requires.
              </p>
            </div>
            <div className="rounded-xl p-8 border" style={{ background: '#1A2248', borderColor: '#3B4A8F' }}>
              <div className="w-12 h-12 mb-6" style={{ color: '#00D4FF' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#EEF1FA' }}>Materials & Features</h3>
              <p style={{ color: '#8A95C9' }}>
                Decking type, accessories, and any special requirements for your waterfront.
              </p>
            </div>
            <div className="rounded-xl p-8 border" style={{ background: '#1A2248', borderColor: '#3B4A8F' }}>
              <div className="w-12 h-12 mb-6" style={{ color: '#00D4FF' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#EEF1FA' }}>Delivery Location</h3>
              <p style={{ color: '#8A95C9' }}>
                Shipping distance from one of our warehouses to your property.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Talk to Wade CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, #0E1433 0%, #151B3D 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#EEF1FA' }}>
            Ready to Get Your Quote?
          </h2>
          <p className="text-xl mb-8" style={{ color: '#8A95C9' }}>
            Our team is ready to help you design the perfect dock. Use the chat widget 
            to talk to Wade, or submit a quote request.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-lg transition-colors text-lg"
              style={{ background: '#00D4FF', color: '#0E1433' }}
            >
              Request Free Quote
            </Link>
            <a
              href="tel:800-370-2285"
              className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-lg transition-colors text-lg border"
              style={{ background: 'transparent', color: '#EEF1FA', borderColor: '#3B4A8F' }}
            >
              Call 800-370-2285
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20" style={{ background: '#151B3D' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#EEF1FA' }}>
            Why ExpressDocks
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4" style={{ color: '#00D4FF' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#EEF1FA' }}>50-Year Warranty</h3>
              <p className="text-sm" style={{ color: '#8A95C9' }}>Marine-grade aluminum backed by our comprehensive warranty</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4" style={{ color: '#00D4FF' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#EEF1FA' }}>Direct Delivery</h3>
              <p className="text-sm" style={{ color: '#8A95C9' }}>Delivered direct to your driveway, fully assembled and tested</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4" style={{ color: '#00D4FF' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#EEF1FA' }}>Photo Documentation</h3>
              <p className="text-sm" style={{ color: '#8A95C9' }}>Complete assembly photos so you know exactly how it goes together</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4" style={{ color: '#00D4FF' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#EEF1FA' }}>Pre-Assembled</h3>
              <p className="text-sm" style={{ color: '#8A95C9' }}>Every dock fully built and tested before shipping</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
