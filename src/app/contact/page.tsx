'use client'
import { useState } from 'react'
import type { Metadata } from 'next'

export default function Contact() {
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [msg, setMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success) { setStatus('success'); setMsg(json.message); form.reset() }
      else { setStatus('error'); setMsg(json.message) }
    } catch {
      setStatus('error'); setMsg('Something went wrong. Please call 800-370-2285.')
    }
  }

  return (
    <main className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-[#0a1628] mb-4">Get Your Free Quote</h1>
      <p className="text-gray-600 mb-10">Send us your waterfront sketch or project details and we&apos;ll deliver a free custom 3D design within 48 hours. No obligation.</p>
      <div className="grid md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input name="name" required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input name="email" required type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input name="phone" type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your phone number" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ZIP Code</label>
            <input name="zip" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="ZIP code" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Dock Type *</label>
            <select name="dockType" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">Select dock type...</option>
              <option value="residential">Residential Floating Dock</option>
              <option value="commercial">Commercial / Marina Dock</option>
              <option value="modular">Modular Dock System</option>
              <option value="fingers">Dock Fingers & Gangways</option>
              <option value="pilebuddy">PileBuddy Mooring System</option>
              <option value="other">Other / Not Sure</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Waterfront Type</label>
            <select name="waterfrontType" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">Select waterfront type...</option>
              <option value="lake">Lake</option>
              <option value="river">River</option>
              <option value="ocean">Ocean</option>
              <option value="bay">Bay / Estuary</option>
              <option value="saltwater">Saltwater / Coastal</option>
              <option value="pond">Pond</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Approximate Square Footage</label>
            <select name="sqft" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">Select approximate size...</option>
              <option value="under200">Under 200 sqft</option>
              <option value="200-500">200 – 500 sqft</option>
              <option value="500-1000">500 – 1,000 sqft</option>
              <option value="1000-5000">1,000 – 5,000 sqft</option>
              <option value="5000plus">5,000+ sqft (commercial)</option>
              <option value="notsure">Not sure yet</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Project Details</label>
            <textarea name="details" rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe your dock project, location, timeline..."></textarea>
          </div>

          {status === 'success' && (
            <div className="bg-green-50 border border-green-300 text-green-800 rounded-lg p-4 font-medium">{msg}</div>
          )}
          {status === 'error' && (
            <div className="bg-red-50 border border-red-300 text-red-800 rounded-lg p-4">{msg}</div>
          )}

          <button type="submit" disabled={status === 'sending'}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-lg font-bold transition">
            {status === 'sending' ? 'Sending...' : 'Send My Request →'}
          </button>
        </form>

        <div>
          <h2 className="text-xl font-bold text-[#0a1628] mb-6">Contact Us Directly</h2>
          <ul className="space-y-4 text-gray-700">
            <li>📞 <a href="tel:8003702285" className="text-blue-600 hover:underline font-medium text-lg">800-370-2285</a></li>
            <li>✉️ <a href="mailto:info@expressdocks.com" className="text-blue-600 hover:underline">info@expressdocks.com</a></li>
            <li>📍 Middletown, Delaware</li>
          </ul>
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-[#0a1628] mb-2">🎨 Free 3D Design in 48 Hours</h3>
            <p className="text-sm text-gray-600 mb-3">Send us any sketch, photo, or description of your waterfront. Our team will create a complete custom 3D dock design — completely free, no obligation to buy.</p>
            <p className="text-xs text-gray-500">Most customers receive their 3D design within 24 hours.</p>
          </div>
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-[#0a1628] mb-2">💰 Factory-Direct Pricing</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Residential: from <strong>$60/sqft</strong></li>
              <li>• Commercial/Marina: from <strong>$75/sqft</strong></li>
              <li>• Fingers & Gangways: from <strong>$85/sqft</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
