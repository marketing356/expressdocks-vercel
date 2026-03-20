'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const ConfiguratorCanvas = dynamic(() => import('@/components/ConfiguratorCanvas'), { ssr: false })

export type DockSection = {
  id: string
  gx: number  // x in feet
  gy: number  // y in feet
  gw: number  // width in feet
  gh: number  // height in feet
}

const DOCK_TYPES = [
  { label: 'Residential', detail: '$50/sqft', rate: 50 },
  { label: 'Commercial',  detail: '$75/sqft', rate: 75 },
  { label: 'Fingers / Gangways', detail: '$85/sqft', rate: 85 },
]

export default function ConfiguratorPage() {
  const [sections, setSections] = useState<DockSection[]>([])
  const [rateIdx, setRateIdx] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hintVisible, setHintVisible] = useState(true)
  const [showQuote, setShowQuote] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', zip: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const priceRate = DOCK_TYPES[rateIdx].rate
  const totalSqft = sections.reduce((sum, s) => sum + s.gw * s.gh, 0)
  const totalPrice = totalSqft * priceRate

  function addSection(s: DockSection) { setSections(p => [...p, s]) }
  function updateSection(id: string, c: Partial<DockSection>) { setSections(p => p.map(s => s.id === id ? { ...s, ...c } : s)) }
  function deleteSection(id: string) { setSections(p => p.filter(s => s.id !== id)); setSelectedId(null) }

  async function submitQuote(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const dockSections = sections.map(s => ({
      x: s.gx, y: s.gy, width: s.gw, height: s.gh,
      sqft: s.gw * s.gh, price: s.gw * s.gh * priceRate,
    }))
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          dockType: DOCK_TYPES[rateIdx].label,
          sqft: totalSqft,
          dockSections,
          details: `CONFIGURATOR QUOTE\n\nType: ${DOCK_TYPES[rateIdx].label} (${DOCK_TYPES[rateIdx].detail})\nTotal: ${totalSqft} sqft — $${totalPrice.toLocaleString()}\n\nSections: ${JSON.stringify(dockSections, null, 2)}\n\nNotes: ${form.notes}`,
        }),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main style={{ background: '#080d26', minHeight: '100vh', color: '#EEF1FA', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <div style={{
        background: '#0E1433', borderBottom: '1px solid rgba(138,149,201,0.15)',
        padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        {/* Left: title */}
        <div style={{ minWidth: '140px' }}>
          <div style={{ fontWeight: 800, fontSize: '17px' }}>Dock Configurator</div>
          <div style={{ color: '#4B5A90', fontSize: '11px', marginTop: '1px' }}>Free design tool</div>
        </div>

        {/* Center: live price */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          {sections.length > 0 ? (
            <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ color: '#8A95C9', fontSize: '13px' }}>Total: {totalSqft} sqft —</span>
              <span style={{ color: '#4ade80', fontWeight: 800, fontSize: '22px' }}>${totalPrice.toLocaleString()}</span>
            </div>
          ) : (
            <span style={{ color: '#374151', fontSize: '13px' }}>Draw your first section to see pricing</span>
          )}
        </div>

        {/* Right: dock type dropdown */}
        <select
          value={rateIdx}
          onChange={(e) => setRateIdx(Number(e.target.value))}
          style={{
            padding: '8px 12px', borderRadius: '8px',
            background: 'rgba(59,74,143,0.2)', border: '1px solid rgba(138,149,201,0.25)',
            color: '#EEF1FA', fontSize: '13px', cursor: 'pointer', outline: 'none',
          }}
        >
          {DOCK_TYPES.map((t, i) => (
            <option key={i} value={i} style={{ background: '#0E1433' }}>
              {t.label} — {t.detail}
            </option>
          ))}
        </select>
      </div>

      {/* Canvas area */}
      <div style={{ flex: 1, position: 'relative' }}>
        <ConfiguratorCanvas
          sections={sections}
          priceRate={priceRate}
          selectedId={selectedId}
          onAdd={addSection}
          onUpdate={updateSection}
          onDelete={deleteSection}
          onSelect={setSelectedId}
          onDeselect={() => setSelectedId(null)}
          onFirstDraw={() => setTimeout(() => setHintVisible(false), 2500)}
        />

        {/* Hint bar */}
        {hintVisible && (
          <div style={{
            position: 'absolute', bottom: sections.length > 0 ? '80px' : '32px',
            left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(14,20,51,0.92)', border: '1px solid rgba(138,149,201,0.2)',
            borderRadius: '10px', padding: '10px 20px',
            color: '#8A95C9', fontSize: '13px', whiteSpace: 'nowrap',
            pointerEvents: 'none', transition: 'opacity 0.6s, bottom 0.3s',
          }}>
            Click and drag to draw a dock section · Click a section to select &amp; resize
          </div>
        )}

        {/* Get Quote button */}
        {sections.length > 0 && (
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 5 }}>
            <button
              onClick={() => setShowQuote(true)}
              style={{
                padding: '14px 40px', borderRadius: '8px',
                background: '#3B4A8F', border: '1px solid rgba(138,149,201,0.3)',
                color: '#EEF1FA', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 24px rgba(59,74,143,0.55)', transition: 'transform 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              See Your Dock Come to Life →
            </button>
            <div style={{ textAlign: 'center', color: '#4B5A90', fontSize: '11px', marginTop: '6px' }}>
              Free 3D design in 48 hrs · No commitment
            </div>
          </div>
        )}
      </div>

      {/* Quote modal */}
      {showQuote && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(8,13,38,0.88)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowQuote(false) }}
        >
          <div style={{
            background: '#0E1433', border: '1px solid rgba(138,149,201,0.2)',
            borderRadius: '20px 20px 0 0', padding: '32px 32px 48px',
            width: '100%', maxWidth: '560px', animation: 'slideUp 0.3s ease',
          }}>
            <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Quote Sent!</h2>
                <p style={{ color: '#8A95C9' }}>We'll follow up within 24 hours with your free 3D dock design.</p>
                <button
                  onClick={() => { setShowQuote(false); setSubmitted(false) }}
                  style={{ marginTop: '24px', padding: '10px 28px', borderRadius: '8px', background: '#3B4A8F', border: 'none', color: '#EEF1FA', cursor: 'pointer', fontWeight: 600 }}
                >
                  Keep Designing
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div>
                    <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Get Your Free Quote</h2>
                    <p style={{ color: '#8A95C9', fontSize: '13px', marginTop: '4px' }}>
                      {sections.length} section{sections.length !== 1 ? 's' : ''} · {totalSqft} sqft · Est. <strong style={{ color: '#4ade80' }}>${totalPrice.toLocaleString()}</strong>
                    </p>
                  </div>
                  <button onClick={() => setShowQuote(false)} style={{ background: 'transparent', border: 'none', color: '#8A95C9', cursor: 'pointer', fontSize: '22px', lineHeight: 1 }}>×</button>
                </div>

                <form onSubmit={submitQuote} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    {([
                      { label: 'Full Name *', key: 'name', type: 'text', required: true },
                      { label: 'Email *',     key: 'email', type: 'email', required: true },
                      { label: 'Phone',       key: 'phone', type: 'tel',   required: false },
                      { label: 'ZIP Code',    key: 'zip',   type: 'text',  required: false },
                    ] as { label: string; key: keyof typeof form; type: string; required: boolean }[]).map(({ label, key, type, required }) => (
                      <div key={key}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#8A95C9', marginBottom: '6px', fontWeight: 600 }}>{label}</label>
                        <input
                          required={required} type={type}
                          value={form[key]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(138,149,201,0.1)', border: '1px solid rgba(138,149,201,0.2)', color: '#EEF1FA', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#8A95C9', marginBottom: '6px', fontWeight: 600 }}>Notes / Waterfront type</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      rows={3} placeholder="Lake, river, ocean? Any special requirements?"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(138,149,201,0.1)', border: '1px solid rgba(138,149,201,0.2)', color: '#EEF1FA', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                    />
                  </div>
                  <button
                    type="submit" disabled={submitting}
                    style={{ padding: '14px', borderRadius: '8px', background: submitting ? 'rgba(59,74,143,0.5)' : '#3B4A8F', border: 'none', color: '#EEF1FA', fontSize: '15px', fontWeight: 700, cursor: submitting ? 'default' : 'pointer', marginTop: '4px' }}
                  >
                    {submitting ? 'Sending…' : 'Send My Quote Request →'}
                  </button>
                  <p style={{ textAlign: 'center', color: '#4B5A90', fontSize: '11px' }}>Free 3D design in 48 hours · 800-370-2285</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
