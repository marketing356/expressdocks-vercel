'use client'
import { useState } from 'react'

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

  const inputStyle = {
    width: '100%',
    background: 'rgba(59,74,143,0.12)',
    border: '1px solid rgba(138,149,201,0.3)',
    borderRadius: '0.5rem',
    padding: '0.75rem 1rem',
    color: '#EEF1FA',
    outline: 'none',
  } as React.CSSProperties

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.25rem',
    color: 'rgba(238,241,250,0.8)',
  } as React.CSSProperties

  return (
    <main style={{ background: '#0E1433', color: '#EEF1FA', minHeight: '100vh' }}>
      <section className="py-20 px-6 text-center" style={{ borderBottom: '1px solid rgba(138,149,201,0.15)' }}>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#8A95C9' }}>Get In Touch</p>
        <h1 className="text-5xl md:text-6xl font-black mb-6" style={{ color: '#EEF1FA' }}>Get Your Free Quote</h1>
        <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(238,241,250,0.7)' }}>
          Send us your waterfront sketch or project details for a free custom quote. No obligation.
        </p>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Form — wider column */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
            <div>
              <label style={labelStyle}>Name *</label>
              <input name="name" required type="text" style={inputStyle} placeholder="Your name" />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input name="email" required type="email" style={inputStyle} placeholder="your@email.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Phone</label>
                <input name="phone" type="tel" style={inputStyle} placeholder="Your phone number" />
              </div>
              <div>
                <label style={labelStyle}>ZIP Code</label>
                <input name="zip" type="text" style={inputStyle} placeholder="ZIP code" />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Dock Type *</label>
              <select name="dockType" required style={{ ...inputStyle, appearance: 'none' as const }}>
                <option value="" style={{ background: '#0E1433' }}>Select dock type...</option>
                <option value="residential" style={{ background: '#0E1433' }}>Residential Floating Dock</option>
                <option value="commercial" style={{ background: '#0E1433' }}>Commercial / Marina Dock</option>
                <option value="modular" style={{ background: '#0E1433' }}>Modular Dock System</option>
                <option value="fingers" style={{ background: '#0E1433' }}>Dock Fingers & Gangways</option>
                <option value="pilebuddy" style={{ background: '#0E1433' }}>PileBuddy Mooring System</option>
                <option value="other" style={{ background: '#0E1433' }}>Other / Not Sure</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Waterfront Type</label>
                <select name="waterfrontType" style={{ ...inputStyle, appearance: 'none' as const }}>
                  <option value="" style={{ background: '#0E1433' }}>Select type...</option>
                  <option value="lake" style={{ background: '#0E1433' }}>Lake</option>
                  <option value="river" style={{ background: '#0E1433' }}>River</option>
                  <option value="ocean" style={{ background: '#0E1433' }}>Ocean</option>
                  <option value="bay" style={{ background: '#0E1433' }}>Bay / Estuary</option>
                  <option value="saltwater" style={{ background: '#0E1433' }}>Saltwater / Coastal</option>
                  <option value="pond" style={{ background: '#0E1433' }}>Pond</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Approx. Square Footage</label>
                <select name="sqft" style={{ ...inputStyle, appearance: 'none' as const }}>
                  <option value="" style={{ background: '#0E1433' }}>Select size...</option>
                  <option value="under200" style={{ background: '#0E1433' }}>Under 200 sqft</option>
                  <option value="200-500" style={{ background: '#0E1433' }}>200 – 500 sqft</option>
                  <option value="500-1000" style={{ background: '#0E1433' }}>500 – 1,000 sqft</option>
                  <option value="1000-5000" style={{ background: '#0E1433' }}>1,000 – 5,000 sqft</option>
                  <option value="5000plus" style={{ background: '#0E1433' }}>5,000+ sqft (commercial)</option>
                  <option value="notsure" style={{ background: '#0E1433' }}>Not sure yet</option>
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Project Details</label>
              <textarea name="details" rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Describe your dock project, location, timeline..."></textarea>
            </div>

            {status === 'success' && (
              <div className="rounded-lg p-4 font-medium" style={{ background: 'rgba(59,74,143,0.3)', border: '1px solid rgba(138,149,201,0.4)', color: '#EEF1FA' }}>{msg}</div>
            )}
            {status === 'error' && (
              <div className="rounded-lg p-4" style={{ background: 'rgba(180,30,30,0.2)', border: '1px solid rgba(220,50,50,0.4)', color: '#EEF1FA' }}>{msg}</div>
            )}

            <button type="submit" disabled={status === 'sending'}
              className="w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-60"
              style={{ background: '#3B4A8F', color: '#EEF1FA', boxShadow: '0 4px 24px rgba(59,74,143,0.5)' }}>
              {status === 'sending' ? 'Sending...' : 'Send My Request →'}
            </button>
          </form>

          {/* Sidebar */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl p-6" style={{ background: 'rgba(59,74,143,0.15)', border: '1px solid rgba(138,149,201,0.2)' }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#EEF1FA' }}>Contact Directly</h2>
              <ul className="space-y-3" style={{ color: 'rgba(238,241,250,0.75)' }}>
                <li>Phone: <a href="tel:8003702285" className="font-semibold hover:text-white transition" style={{ color: '#EEF1FA' }}>800-370-2285</a></li>
                <li>Email: <a href="mailto:info@expressdocks.com" className="hover:text-white transition" style={{ color: '#8A95C9' }}>info@expressdocks.com</a></li>
                <li>📍 Middletown, Delaware</li>
              </ul>
            </div>

            <div className="rounded-2xl p-6" style={{ background: 'rgba(59,74,143,0.15)', border: '1px solid rgba(138,149,201,0.2)' }}>
              <h3 className="font-bold mb-2" style={{ color: '#EEF1FA' }}>Free Custom Quote</h3>
              <p className="text-sm" style={{ color: 'rgba(238,241,250,0.65)' }}>Send us any sketch, photo, or description of your waterfront. Our team creates a complete custom 3D dock design — completely free, no obligation to buy.</p>
              <p className="text-xs mt-3" style={{ color: '#8A95C9' }}>We respond to all quote requests promptly.</p>
            </div>

            <div className="rounded-2xl p-6" style={{ background: 'rgba(59,74,143,0.15)', border: '1px solid rgba(138,149,201,0.2)' }}>
              <h3 className="font-bold mb-3" style={{ color: '#EEF1FA' }}>Factory-Direct Pricing</h3>
              <ul className="text-sm space-y-1" style={{ color: 'rgba(238,241,250,0.65)' }}>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
