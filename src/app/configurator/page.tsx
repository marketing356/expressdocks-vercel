'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { Metadata } from 'next'

// Konva loaded dynamically to avoid SSR issues
import dynamic from 'next/dynamic'

const ConfiguratorCanvas = dynamic(() => import('@/components/ConfiguratorCanvas'), { ssr: false })

export type DockSection = {
  id: string
  type: 'straight' | 'corner' | 'finger' | 'gangway'
  gridX: number
  gridY: number
}

const SECTION_DEFS = {
  straight: { label: 'Straight Section', w: 8, h: 4, pricePerSqft: 50, color: '#3B4A8F' },
  corner:   { label: 'Corner Section',   w: 4, h: 4, pricePerSqft: 50, color: '#2d3a72' },
  finger:   { label: 'Finger Dock',      w: 2, h: 8, pricePerSqft: 85, color: '#5B3E8F' },
  gangway:  { label: 'Gangway',          w: 3, h: 8, pricePerSqft: 85, color: '#3E5B8F' },
}

function calcPrice(sections: DockSection[]): number {
  return sections.reduce((sum, s) => {
    const def = SECTION_DEFS[s.type]
    return sum + def.w * def.h * def.pricePerSqft
  }, 0)
}

export default function ConfiguratorPage() {
  const [sections, setSections] = useState<DockSection[]>([])
  const [selectedTool, setSelectedTool] = useState<keyof typeof SECTION_DEFS>('straight')
  const [showQuote, setShowQuote] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', zip: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const totalSqft = sections.reduce((sum, s) => {
    const d = SECTION_DEFS[s.type]
    return sum + d.w * d.h
  }, 0)
  const totalPrice = calcPrice(sections)

  function addSection(gridX: number, gridY: number) {
    // Check for collision
    const newDef = SECTION_DEFS[selectedTool]
    const collision = sections.some((s) => {
      const d = SECTION_DEFS[s.type]
      return (
        gridX < s.gridX + d.w &&
        gridX + newDef.w > s.gridX &&
        gridY < s.gridY + d.h &&
        gridY + newDef.h > s.gridY
      )
    })
    if (collision) return

    setSections((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        type: selectedTool,
        gridX,
        gridY,
      },
    ])
  }

  function deleteSection(id: string) {
    setSections((prev) => prev.filter((s) => s.id !== id))
  }

  async function submitQuote(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    const dockSpecs = sections
      .map((s) => {
        const d = SECTION_DEFS[s.type]
        return `${d.label} (${d.w}x${d.h}ft @ $${d.pricePerSqft}/sqft)`
      })
      .join(', ')

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          zip: form.zip,
          details: `CONFIGURATOR QUOTE\n\nDock sections: ${dockSpecs || 'None'}\nTotal sqft: ${totalSqft} sqft\nEstimated price: $${totalPrice.toLocaleString()}\n\nNotes: ${form.notes}`,
          dockType: 'Configurator Build',
          sqft: totalSqft,
        }),
      })
      setSubmitted(true)
    } catch {
      // still show success to user
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main style={{ background: '#080d26', minHeight: '100vh', color: '#EEF1FA' }}>
      {/* Hero */}
      <section style={{ background: '#0E1433', borderBottom: '1px solid rgba(138,149,201,0.15)', padding: '48px 24px 32px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: '20px', background: 'rgba(59,74,143,0.4)', border: '1px solid rgba(138,149,201,0.3)', color: '#8A95C9', fontSize: '12px', fontWeight: 600, marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Free Design Tool
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, marginBottom: '12px' }}>
            Design Your Dock
          </h1>
          <p style={{ color: '#8A95C9', fontSize: '16px', maxWidth: '540px', margin: '0 auto 24px' }}>
            Click the canvas to place dock sections. Mix and match to build your perfect layout — then get a free quote.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>

          {/* Left panel — tools */}
          <div style={{ width: '220px', flexShrink: 0 }}>
            <div style={{ background: '#0E1433', border: '1px solid rgba(138,149,201,0.15)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#8A95C9', marginBottom: '16px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Dock Sections</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(Object.entries(SECTION_DEFS) as [keyof typeof SECTION_DEFS, typeof SECTION_DEFS[keyof typeof SECTION_DEFS]][]).map(([type, def]) => (
                  <button
                    key={type}
                    onClick={() => setSelectedTool(type)}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: selectedTool === type ? '2px solid #8A95C9' : '2px solid transparent',
                      background: selectedTool === type ? 'rgba(138,149,201,0.15)' : 'rgba(138,149,201,0.05)',
                      color: '#EEF1FA',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: def.color, flexShrink: 0 }} />
                      <span style={{ fontWeight: 600, fontSize: '13px' }}>{def.label}</span>
                    </div>
                    <div style={{ color: '#8A95C9', fontSize: '11px' }}>
                      {def.w}×{def.h} ft · ${def.pricePerSqft}/sqft
                    </div>
                    <div style={{ color: '#6B7BAC', fontSize: '11px' }}>
                      ${(def.w * def.h * def.pricePerSqft).toLocaleString()} per section
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(14,20,51,0.6)', borderRadius: '8px', border: '1px solid rgba(138,149,201,0.15)' }}>
                <div style={{ fontSize: '11px', color: '#8A95C9', marginBottom: '4px' }}>Sections placed</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#EEF1FA' }}>{sections.length}</div>
                <div style={{ fontSize: '11px', color: '#8A95C9', marginTop: '8px', marginBottom: '4px' }}>Total area</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#EEF1FA' }}>{totalSqft} sqft</div>
                <div style={{ fontSize: '11px', color: '#8A95C9', marginTop: '8px', marginBottom: '4px' }}>Est. price</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#4ade80' }}>${totalPrice.toLocaleString()}</div>
              </div>

              {sections.length > 0 && (
                <button
                  onClick={() => setSections([])}
                  style={{ marginTop: '12px', width: '100%', padding: '8px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', cursor: 'pointer', fontSize: '12px' }}
                >
                  Clear All
                </button>
              )}
            </div>

            <div style={{ marginTop: '12px', padding: '12px 16px', background: 'rgba(59,74,143,0.15)', border: '1px solid rgba(138,149,201,0.15)', borderRadius: '8px', fontSize: '11px', color: '#8A95C9' }}>
              <strong style={{ color: '#EEF1FA' }}>How to use:</strong> Select a section type, then click anywhere on the canvas to place it. Click a placed section to remove it.
            </div>
          </div>

          {/* Canvas */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ background: '#0E1433', border: '1px solid rgba(138,149,201,0.15)', borderRadius: '12px', overflow: 'hidden' }}>
              <ConfiguratorCanvas
                sections={sections}
                selectedTool={selectedTool}
                sectionDefs={SECTION_DEFS}
                onPlace={addSection}
                onDelete={deleteSection}
              />
            </div>
          </div>
        </div>

        {/* Get Quote CTA */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <button
            onClick={() => setShowQuote(true)}
            style={{
              padding: '16px 40px',
              borderRadius: '8px',
              background: '#3B4A8F',
              border: '1px solid rgba(138,149,201,0.3)',
              color: '#EEF1FA',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Get My Quote →
          </button>
          <p style={{ color: '#8A95C9', fontSize: '13px', marginTop: '8px' }}>
            Free 3D design in 48 hours · No commitment required
          </p>
        </div>
      </div>

      {/* Quote slide-up modal */}
      {showQuote && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(8,13,38,0.85)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowQuote(false) }}
        >
          <div
            style={{
              background: '#0E1433',
              border: '1px solid rgba(138,149,201,0.2)',
              borderRadius: '20px 20px 0 0',
              padding: '32px 32px 48px',
              width: '100%',
              maxWidth: '560px',
              animation: 'slideUp 0.3s ease',
            }}
          >
            <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Quote Sent!</h2>
                <p style={{ color: '#8A95C9' }}>We'll be in touch within 24 hours with your free 3D dock design. Call us anytime: <a href="tel:8003702285" style={{ color: '#8A95C9' }}>800-370-2285</a></p>
                <button onClick={() => { setShowQuote(false); setSubmitted(false) }} style={{ marginTop: '24px', padding: '10px 28px', borderRadius: '8px', background: '#3B4A8F', border: 'none', color: '#EEF1FA', cursor: 'pointer', fontWeight: 600 }}>
                  Keep Designing
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Get Your Free Quote</h2>
                    <p style={{ color: '#8A95C9', fontSize: '13px', marginTop: '4px' }}>
                      {sections.length} section{sections.length !== 1 ? 's' : ''} · {totalSqft} sqft · Est. ${totalPrice.toLocaleString()}
                    </p>
                  </div>
                  <button onClick={() => setShowQuote(false)} style={{ background: 'transparent', border: 'none', color: '#8A95C9', cursor: 'pointer', fontSize: '22px' }}>×</button>
                </div>

                <form onSubmit={submitQuote} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#8A95C9', marginBottom: '6px', fontWeight: 600 }}>Full Name *</label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(138,149,201,0.1)', border: '1px solid rgba(138,149,201,0.2)', color: '#EEF1FA', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#8A95C9', marginBottom: '6px', fontWeight: 600 }}>Email *</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(138,149,201,0.1)', border: '1px solid rgba(138,149,201,0.2)', color: '#EEF1FA', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#8A95C9', marginBottom: '6px', fontWeight: 600 }}>Phone</label>
                      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(138,149,201,0.1)', border: '1px solid rgba(138,149,201,0.2)', color: '#EEF1FA', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#8A95C9', marginBottom: '6px', fontWeight: 600 }}>ZIP Code</label>
                      <input value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(138,149,201,0.1)', border: '1px solid rgba(138,149,201,0.2)', color: '#EEF1FA', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#8A95C9', marginBottom: '6px', fontWeight: 600 }}>Notes / Waterfront type</label>
                    <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3}
                      placeholder="Lake, river, ocean? Any special requirements?"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(138,149,201,0.1)', border: '1px solid rgba(138,149,201,0.2)', color: '#EEF1FA', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                  </div>
                  <button type="submit" disabled={submitting}
                    style={{ padding: '14px', borderRadius: '8px', background: submitting ? 'rgba(59,74,143,0.5)' : '#3B4A8F', border: 'none', color: '#EEF1FA', fontSize: '15px', fontWeight: 700, cursor: submitting ? 'default' : 'pointer', marginTop: '4px' }}>
                    {submitting ? 'Sending...' : 'Send My Quote Request →'}
                  </button>
                  <p style={{ textAlign: 'center', color: '#6B7BAC', fontSize: '11px' }}>We'll follow up within 24 hours with your free 3D design · 800-370-2285</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
