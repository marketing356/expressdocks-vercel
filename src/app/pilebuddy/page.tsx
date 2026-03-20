import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PileBuddy Mooring System | ExpressDocks',
  description: 'PileBuddy is a patent-pending floating mooring system that mounts around dock piles, moves with the tide, and protects your boat and dock automatically.',
}

export default function Page() {
  return (
    <main>
      <section className="relative text-white py-32 px-6 text-center"
        style={{ backgroundImage: 'linear-gradient(rgba(10,22,40,0.55), rgba(10,22,40,0.55)), url("/images/pilebuddy-cover.webp")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">PileBuddy</h1>
        <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">The patent-pending floating mooring system that protects your boat and dock — automatically, at every tide.</p>
        <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition mt-6 inline-block">Get a Quote →</a>
      </section>
      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-[#0a1628] mb-4">Docking Protection Made Easier</h2>
            <p className="text-gray-600 mb-4">PileBuddy is ExpressDocks&apos; patent-pending floating mooring system, engineered for pile slips and stationary docks. It moves seamlessly with changing tides, protecting both your boat and your dock infrastructure.</p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Tide-adaptive — rises and falls automatically</li>
              <li>✓ Protects hull from pile contact</li>
              <li>✓ Protects piles from hull and hardware impact</li>
              <li>✓ Reduces line shock — no cleats ripped out</li>
              <li>✓ Installs in under 5 minutes — no tools needed</li>
              <li>✓ Modular 40&quot; sections, stackable to 18 feet</li>
              <li>✓ Lifetime guarantee</li>
              <li>✓ Available in any color</li>
            </ul>
          </div>
          <img src="/images/pilebuddy-1.webp" alt="PileBuddy Mooring System" className="rounded-xl shadow-lg w-full" />
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <img src="/images/pilebuddy-2.webp" alt="PileBuddy on dock pile" className="rounded-xl shadow-lg w-full" />
          <div>
            <h2 className="text-3xl font-bold text-[#0a1628] mb-4">Three Versions Available</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg"><h3 className="font-bold text-[#0a1628]">Standard PileBuddy</h3><p className="text-sm text-gray-600">For residential pile slips and standard marina applications. 40&quot; sections, 35 lbs each.</p></div>
              <div className="p-4 border border-gray-200 rounded-lg"><h3 className="font-bold text-[#0a1628]">Track Buddy</h3><p className="text-sm text-gray-600">For track-based dock systems. Stainless steel track and groove system.</p></div>
              <div className="p-4 bg-[#0a1628] text-white rounded-lg"><h3 className="font-bold text-blue-300">Commercial PileBuddy</h3><p className="text-sm text-gray-300">Heavy-duty internal adjustable rollers, aluminum sleeves. For high-tonnage vessels.</p></div>
            </div>
          </div>
        </div>
        <div className="bg-[#0a1628] text-white rounded-xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Slip?</h2>
          <p className="text-gray-300 mb-6">Contact ExpressDocks for a free consultation and quote on PileBuddy for your marina or private slip.</p>
          <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold transition inline-block">Get Free Quote →</a>
        </div>
      </section>
    </main>
  )
}
