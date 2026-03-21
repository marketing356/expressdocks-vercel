'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const ConfiguratorCanvas = dynamic(() => import('@/components/ConfiguratorCanvas'), { ssr: false })
const DockBuilder3D = dynamic(() => import('@/components/DockBuilder3D'), { ssr: false })

export type DockSection = {
  id: string
  gx: number
  gy: number
  gw: number
  gh: number
}

const DOCK_TYPES = [
  { label: 'Residential',        detail: '$50/sqft', rate: 50 },
  { label: 'Commercial',         detail: '$75/sqft', rate: 75 },
  { label: 'Fingers / Gangways', detail: '$85/sqft', rate: 85 },
]

const WPC_COLORS = [
  { name: 'Teak',      hex: '#8B6914' },
  { name: 'Grey',      hex: '#7A7A7A' },
  { name: 'Walnut',    hex: '#5C3D1E' },
  { name: 'Cedar',     hex: '#A0522D' },
  { name: 'Driftwood', hex: '#9E8B6B' },
  { name: 'Redwood',   hex: '#8B3A3A' },
]

export default function ConfiguratorPage() {
  const [sections, setSections] = useState<DockSection[]>([])
  const [view, setView] = useState<'2d' | '3d'>('2d')
  const [rateIdx, setRateIdx] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hintVisible, setHintVisible] = useState(true)
  const [selectedColor, setSelectedColor] = useState(WPC_COLORS[0].hex)
  const [mode, setMode] = useState<'draw' | 'move'>('draw')

  // Render flow
  const [isRendering, setIsRendering] = useState(false)
  const [renderUrl, setRenderUrl] = useState<string | null>(null)
  const [showWow, setShowWow] = useState(false)

  // Lead capture
  const [form, setForm] = useState({ name: '', email: '', phone: '', zip: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const priceRate = DOCK_TYPES[rateIdx].rate
  const totalSqft = sections.reduce((sum, s) => sum + s.gw * s.gh, 0)
  const totalPrice = totalSqft * priceRate
  const colorName = WPC_COLORS.find(c => c.hex === selectedColor)?.name ?? 'Teak'

  function addSection(s: DockSection) { setSections(p => [...p, s]) }
  function moveSection(id: string, gx: number, gy: number) { setSections(p => p.map(s => s.id === id ? { ...s, gx, gy } : s)) }
  function updateSection(id: string, c: Partial<DockSection>) {
    setSections(p => p.map(s => s.id === id ? { ...s, ...c } : s))
  }
  function deleteSection(id: string) {
    setSections(p => p.filter(s => s.id !== id))
    setSelectedId(null)
  }

  async function renderDock() {
    if (!sections.length || isRendering) return
    setIsRendering(true)
    try {
      const res = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sections: sections.map(s => ({ x: s.gx, y: s.gy, width: s.gw, height: s.gh })),
          totalSqft,
          dockType: DOCK_TYPES[rateIdx].label,
          color: selectedColor,
        }),
      })
      const data = await res.json()
      if (data.imageUrl) {
        setRenderUrl(data.imageUrl)
        setShowWow(true)
      }
    } catch (e) {
      console.error('Render error:', e)
    } finally {
      setIsRendering(false)
    }
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          dockType: DOCK_TYPES[rateIdx].label,
          sqft: totalSqft,
          renderUrl,
          details: `DOCK BUILDER RENDER LEAD\n\nType: ${DOCK_TYPES[rateIdx].label}\nColor: ${colorName}\nTotal: ${totalSqft} sqft — $${totalPrice.toLocaleString()}\nRender: ${renderUrl}`,
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
        <div style={{ minWidth: '140px' }}>
          <div style={{ fontWeight: 800, fontSize: '17px' }}>Dock Builder</div>
          <div style={{ color: '#4B5A90', fontSize: '11px', marginTop: '1px' }}>Free design tool</div>
        </div>

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

      {/* Color picker — always visible below header */}
      <div style={{
        background: '#0d1535',
        borderBottom: '1px solid rgba(138,149,201,0.2)',
        padding: '10px 20px',
        display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '13px', color: '#EEF1FA', fontWeight: 800, letterSpacing: '0.05em', flexShrink: 0 }}>
          🎨 Decking Color:
        </span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {WPC_COLORS.map(c => (
            <button
              key={c.hex}
              title={c.name}
              onClick={() => setSelectedColor(c.hex)}
              style={{
                width: '28px', height: '28px',
                borderRadius: '50%',
                background: c.hex,
                border: selectedColor === c.hex ? '3px solid #EEF1FA' : '2px solid rgba(138,149,201,0.25)',
                cursor: 'pointer',
                boxShadow: selectedColor === c.hex ? `0 0 0 2px ${c.hex}88` : 'none',
                transform: selectedColor === c.hex ? 'scale(1.2)' : 'scale(1)',
                transition: 'all 0.15s',
                outline: 'none', flexShrink: 0,
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: '13px', color: '#EEF1FA', fontWeight: 600 }}>{colorName}</span>
        {sections.length === 0 && (
          <span style={{ fontSize: '11px', color: '#4B5A90', marginLeft: '8px' }}>Draw your dock below</span>
        )}
        {/* Mode toggle */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px', flexShrink: 0 }}>
          <button
            onClick={() => setMode('draw')}
            title="Draw Mode — click and drag to draw dock sections"
            style={{
              padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
              background: mode === 'draw' ? '#3B4A8F' : 'transparent',
              color: mode === 'draw' ? '#EEF1FA' : '#8A95C9',
              border: mode === 'draw' ? '1px solid #3B4A8F' : '1px solid rgba(138,149,201,0.3)',
              transition: 'all 0.15s',
            }}
          >✏️ Draw</button>
          <button
            onClick={() => setMode('move')}
            title="Move Mode — drag sections to reposition them"
            style={{
              padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
              background: mode === 'move' ? '#3B4A8F' : 'transparent',
              color: mode === 'move' ? '#EEF1FA' : '#8A95C9',
              border: mode === 'move' ? '1px solid #3B4A8F' : '1px solid rgba(138,149,201,0.3)',
              transition: 'all 0.15s',
            }}
          >👋 Move</button>
        </div>
      </div>


            {/* View toggle */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(138,149,201,0.15)', background: '#080d26' }}>
        <button
          onClick={() => setView('2d')}
          style={{
            padding: '10px 24px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', border: 'none',
            background: view === '2d' ? '#3B4A8F' : 'transparent',
            color: view === '2d' ? '#EEF1FA' : '#8A95C9',
            borderRight: '1px solid rgba(138,149,201,0.15)',
            transition: 'all 0.15s',
          }}
        >✏️ Draw 2D</button>
        <button
          onClick={() => setView('3d')}
          style={{
            padding: '10px 24px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', border: 'none',
            background: view === '3d' ? '#3B4A8F' : 'transparent',
            color: view === '3d' ? '#EEF1FA' : sections.length > 0 ? '#8A95C9' : '#4B5A90',
            transition: 'all 0.15s',
          }}
        >🎮 View 3D {sections.length === 0 && <span style={{ fontSize: '10px', opacity: 0.6 }}>— draw first</span>}</button>
      </div>

      {/* Canvas area */}
      <div style={{ flex: 1, position: 'relative', display: view === '2d' ? 'block' : 'none' }}>
        <ConfiguratorCanvas
          sections={sections}
          priceRate={priceRate}
          selectedColor={selectedColor}
          onAdd={addSection}
          onMove={moveSection}
          onDelete={deleteSection}
        />

        {hintVisible && (
          <div style={{
            position: 'absolute', bottom: '32px',
            left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(14,20,51,0.92)', border: '1px solid rgba(138,149,201,0.2)',
            borderRadius: '10px', padding: '10px 20px',
            color: '#8A95C9', fontSize: '13px', whiteSpace: 'nowrap',
            pointerEvents: 'none', transition: 'opacity 0.6s, bottom 0.3s',
          }}>
            Click and drag to draw a dock section · Click a section to select &amp; resize
          </div>
        )}
      </div>

      {/* 3D View */}
      {view === '3d' && (
        <div style={{ flex: 1, position: 'relative', minHeight: '400px' }}>
          {sections.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', color: '#8A95C9', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '48px' }}>🏗️</div>
              <p style={{ fontSize: '16px', fontWeight: 600 }}>Draw your dock in 2D first</p>
              <button onClick={() => setView('2d')} style={{ padding: '8px 20px', background: '#3B4A8F', color: '#EEF1FA', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>
                Go to Draw Mode →
              </button>
            </div>
          ) : (
            <DockBuilder3D
              sections={sections.map(s => ({ id: s.id, x: s.gx, z: s.gy, w: s.gw, d: s.gh }))}
              deckingColor={selectedColor}
            />
          )}
        </div>
      )}

      {/* OLD bottom bar start placeholder */}
      {sections.length > 0 && (
        <div style={{
          background: '#0E1433',
          borderTop: '1px solid rgba(138,149,201,0.15)',
          padding: '16px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: '#8A95C9' }}>{colorName} decking · {sections.length} section{sections.length !== 1 ? 's' : ''}</span>
            <button
              onClick={() => { setSections([]); setSelectedId(null) }}
              style={{
                padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                background: 'rgba(239,68,68,0.15)', color: '#f87171',
                border: '1px solid rgba(239,68,68,0.3)', transition: 'all 0.15s',
              }}
            >🗑 Clear All</button>
          </div>

          {/* Render CTA */}
          <button
            onClick={renderDock}
            disabled={isRendering}
            style={{
              padding: '13px 32px', borderRadius: '8px',
              background: isRendering
                ? 'rgba(59,74,143,0.4)'
                : 'linear-gradient(135deg, #3B4A8F 0%, #5B6FBF 100%)',
              border: '1px solid rgba(138,149,201,0.3)',
              color: '#EEF1FA', fontSize: '15px', fontWeight: 700,
              cursor: isRendering ? 'default' : 'pointer',
              boxShadow: isRendering ? 'none' : '0 4px 24px rgba(59,74,143,0.55)',
              transition: 'transform 0.15s',
              display: 'flex', alignItems: 'center', gap: '10px',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => { if (!isRendering) e.currentTarget.style.transform = 'scale(1.04)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            {isRendering ? (
              <>
                <span style={{
                  display: 'inline-block', width: '15px', height: '15px',
                  border: '2px solid rgba(255,255,255,0.25)', borderTopColor: '#EEF1FA',
                  borderRadius: '50%', animation: 'cfgSpin 0.75s linear infinite',
                  flexShrink: 0,
                }} />
                Designing your dock...
              </>
            ) : (
              'See Your Dock Come to Life \u2192'
            )}
          </button>

          <style>{`@keyframes cfgSpin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Wow moment full-screen modal */}
      {showWow && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(4,7,22,0.97)', backdropFilter: 'blur(10px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            overflowY: 'auto',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowWow(false) }}
        >
          <div style={{ width: '100%', maxWidth: '880px', padding: '0 0 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Close */}
            <button
              onClick={() => setShowWow(false)}
              style={{
                alignSelf: 'flex-end', margin: '16px 20px 0',
                background: 'transparent', border: 'none',
                color: '#8A95C9', fontSize: '28px', cursor: 'pointer', lineHeight: 1, padding: '4px 8px',
              }}
            >×</button>

            {/* Render image */}
            {renderUrl && (
              <div style={{ width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
                <img
                  src={renderUrl}
                  alt={`${colorName} dock render`}
                  style={{
                    width: '100%', borderRadius: '16px', display: 'block',
                    boxShadow: '0 8px 60px rgba(59,74,143,0.45)',
                  }}
                />
              </div>
            )}

            {/* Dock details + pricing reveal */}
            <div style={{ textAlign: 'center', padding: '28px 24px 0' }}>
              <div style={{ fontSize: '12px', color: '#8A95C9', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Your {colorName} WPC Dock &nbsp;&middot;&nbsp; {DOCK_TYPES[rateIdx].label}
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, marginBottom: '20px' }}>
                {totalSqft} sq ft of premium composite decking
              </div>

              <div style={{
                display: 'inline-block',
                background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)',
                borderRadius: '14px', padding: '14px 40px',
              }}>
                <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Starting at</div>
                <div style={{ fontSize: '42px', fontWeight: 900, color: '#4ade80', lineHeight: 1 }}>
                  ${totalPrice.toLocaleString()}
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '6px' }}>
                  Installed &nbsp;&middot;&nbsp; Financing available &nbsp;&middot;&nbsp; Free design consult
                </div>
              </div>
            </div>

            {/* Lead capture */}
            <div style={{
              width: '100%', maxWidth: '480px',
              background: '#0E1433', border: '1px solid rgba(138,149,201,0.18)',
              borderRadius: '16px', padding: '28px 28px 32px',
              margin: '28px 20px 0', boxSizing: 'border-box',
            }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <div style={{ fontSize: '44px', marginBottom: '12px' }}>&#x2705;</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px' }}>You&apos;re all set!</h3>
                  <p style={{ color: '#8A95C9', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                    A dock specialist will reach out within 24 hours with your personalized quote.
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px' }}>
                    Lock in this design &mdash; get your free quote
                  </h3>
                  <p style={{ color: '#8A95C9', fontSize: '13px', lineHeight: 1.5, margin: '4px 0 20px' }}>
                    No commitment. A specialist will reach out within 24 hours.
                  </p>
                  <form onSubmit={submitLead} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {([
                        { label: 'Full Name *', key: 'name',  type: 'text',  required: true  },
                        { label: 'Email *',     key: 'email', type: 'email', required: true  },
                        { label: 'Phone',       key: 'phone', type: 'tel',   required: false },
                        { label: 'ZIP Code',    key: 'zip',   type: 'text',  required: false },
                      ] as { label: string; key: keyof typeof form; type: string; required: boolean }[]).map(({ label, key, type, required }) => (
                        <div key={key}>
                          <label style={{ display: 'block', fontSize: '11px', color: '#8A95C9', marginBottom: '5px', fontWeight: 600 }}>{label}</label>
                          <input
                            required={required} type={type}
                            value={form[key]}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            style={{
                              width: '100%', padding: '10px 12px', borderRadius: '8px',
                              background: 'rgba(138,149,201,0.08)', border: '1px solid rgba(138,149,201,0.2)',
                              color: '#EEF1FA', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      type="submit" disabled={submitting}
                      style={{
                        padding: '14px', borderRadius: '8px',
                        background: submitting ? 'rgba(59,74,143,0.4)' : 'linear-gradient(135deg, #3B4A8F, #5B6FBF)',
                        border: 'none', color: '#EEF1FA', fontSize: '15px', fontWeight: 700,
                        cursor: submitting ? 'default' : 'pointer', marginTop: '4px',
                      }}
                    >
                      {submitting ? 'Sending\u2026' : 'Get My Free Quote \u2192'}
                    </button>
                    <p style={{ textAlign: 'center', color: '#4B5A90', fontSize: '11px', margin: 0 }}>
                      No spam, ever. By Express Docks.
                    </p>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </main>
  )
}
