'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const ConfiguratorCanvas = dynamic(() => import('@/components/ConfiguratorCanvas'), { ssr: false })

export type DockSection = {
  id: string
  gx: number
  gy: number
  gw: number
  gh: number
}

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
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState(WPC_COLORS[0].hex)
  const [mode, setMode] = useState<'draw' | 'move'>('draw')
  const [isRendering, setIsRendering] = useState(false)
  const [renderUrl, setRenderUrl] = useState<string | null>(null)
  const [showWow, setShowWow] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', zip: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const totalSqft = sections.reduce((sum, s) => sum + s.gw * s.gh, 0)
  const colorName = WPC_COLORS.find(c => c.hex === selectedColor)?.name ?? 'Teak'

  function addSection(s: DockSection) { setSections(p => [...p, s]) }
  function moveSection(id: string, gx: number, gy: number) { setSections(p => p.map(s => s.id === id ? { ...s, gx, gy } : s)) }
  function deleteSection(id: string) { setSections(p => p.filter(s => s.id !== id)); setSelectedId(null) }

  function exportCanvasThumbnail(): string | null {
    try {
      const offscreen = document.createElement('canvas')
      offscreen.width = 512
      offscreen.height = 512
      const ctx = offscreen.getContext('2d')
      if (!ctx || !sections.length) return null

      // Water blue background
      ctx.fillStyle = '#1e5f8a'
      ctx.fillRect(0, 0, 512, 512)

      // Find bounding box in GRID UNITS
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
      for (const s of sections) {
        minX = Math.min(minX, s.gx); minY = Math.min(minY, s.gy)
        maxX = Math.max(maxX, s.gx + s.gw); maxY = Math.max(maxY, s.gy + s.gh)
      }

      // Scale dock to fill 80% of the thumbnail, centered
      const dockW = maxX - minX
      const dockH = maxY - minY
      const pad = 50
      const scaleX = (512 - pad * 2) / Math.max(dockW, 1)
      const scaleY = (512 - pad * 2) / Math.max(dockH, 1)
      const scale = Math.min(scaleX, scaleY)

      const offsetX = pad + ((512 - pad * 2) - dockW * scale) / 2
      const offsetY = pad + ((512 - pad * 2) - dockH * scale) / 2

      // Draw each section — filled with deck color, white border
      sections.forEach(s => {
        const x = offsetX + (s.gx - minX) * scale
        const y = offsetY + (s.gy - minY) * scale
        const w = s.gw * scale
        const h = s.gh * scale

        // Deck color fill
        ctx.fillStyle = selectedColor
        ctx.fillRect(x, y, w, h)

        // White border to define edges clearly
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = Math.max(2, scale * 0.5)
        ctx.strokeRect(x, y, w, h)
      })

      return offscreen.toDataURL('image/jpeg', 0.8)
    } catch { return null }
  }

  async function compositeDockOnBackground(bgUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const bgImg = new window.Image()
      bgImg.crossOrigin = 'anonymous'
      bgImg.onload = () => {
        const W = bgImg.width
        const H = bgImg.height
        const canvas = document.createElement('canvas')
        canvas.width = W; canvas.height = H
        const ctx = canvas.getContext('2d')!

        // Draw background
        ctx.drawImage(bgImg, 0, 0)

        // Find dock bounding box in grid units
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
        for (const s of sections) {
          minX = Math.min(minX, s.gx); minY = Math.min(minY, s.gy)
          maxX = Math.max(maxX, s.gx + s.gw); maxY = Math.max(maxY, s.gy + s.gh)
        }
        const dockW = maxX - minX
        const dockH = maxY - minY

        // Scale dock to ~40% of image width, centered on water portion
        const targetW = W * 0.40
        const scale = targetW / Math.max(dockW, 1)
        const offsetX = (W - dockW * scale) / 2
        const offsetY = H * 0.35

        // Draw each dock section
        sections.forEach(s => {
          const x = offsetX + (s.gx - minX) * scale
          const y = offsetY + (s.gy - minY) * scale
          const w = s.gw * scale
          const h = s.gh * scale

          // Shadow
          ctx.fillStyle = 'rgba(0,0,0,0.3)'
          ctx.fillRect(x + 5, y + 5, w, h)

          // Deck color
          ctx.fillStyle = selectedColor
          ctx.fillRect(x, y, w, h)

          // WPC plank lines
          ctx.strokeStyle = 'rgba(0,0,0,0.12)'
          ctx.lineWidth = Math.max(1, scale * 0.6)
          const plankGap = Math.max(4, scale * 2.5)
          for (let py = y + plankGap; py < y + h; py += plankGap) {
            ctx.beginPath(); ctx.moveTo(x, py); ctx.lineTo(x + w, py); ctx.stroke()
          }

          // Aluminum frame
          ctx.strokeStyle = '#C8D4E0'
          ctx.lineWidth = Math.max(2, scale * 1.2)
          ctx.strokeRect(x, y, w, h)

          // Shine highlight top-left
          ctx.strokeStyle = 'rgba(255,255,255,0.6)'
          ctx.lineWidth = Math.max(1, scale * 0.7)
          ctx.beginPath(); ctx.moveTo(x+1, y+1); ctx.lineTo(x+w-1, y+1); ctx.stroke()
          ctx.beginPath(); ctx.moveTo(x+1, y+1); ctx.lineTo(x+1, y+h-1); ctx.stroke()
        })

        resolve(canvas.toDataURL('image/jpeg', 0.92))
      }
      bgImg.onerror = reject
      bgImg.src = bgUrl
    })
  }

  async function renderDock() {
    if (!sections.length || isRendering) return
    setIsRendering(true)
    const canvasThumbnail = exportCanvasThumbnail()
    try {
      const res = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sections: sections.map(s => ({ x: s.gx, y: s.gy, width: s.gw, height: s.gh })),
          totalSqft,
          dockType: 'Residential',
          color: selectedColor,
          canvasThumbnail,
        }),
      })
      const data = await res.json()

      if (data.compositeMode && data.backgroundUrl) {
        // Composite dock onto background client-side — exact geometry guaranteed
        const composited = await compositeDockOnBackground(data.backgroundUrl)
        setRenderUrl(composited)
        setShowWow(true)
      } else if (data.imageUrl) {
        setRenderUrl(data.imageUrl)
        setShowWow(true)
      }
    } catch (e) { console.error('Render error:', e) }
    finally { setIsRendering(false) }
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form, dockType: 'Residential', sqft: totalSqft, renderUrl,
          details: `DOCK DESIGNER LEAD\nColor: ${colorName}\nTotal: ${totalSqft} sqft\nRender: ${renderUrl}`,
        }),
      })
      setSubmitted(true)
    } catch { setSubmitted(true) }
    finally { setSubmitting(false) }
  }

  return (
    <main style={{ background: '#080d26', minHeight: '100vh', color: '#EEF1FA', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{
        background: '#0E1433', borderBottom: '1px solid rgba(138,149,201,0.15)',
        padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: '17px' }}>Dock Designer</div>
          <div style={{ color: '#4B5A90', fontSize: '11px' }}>Design your custom dock</div>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          {sections.length > 0
            ? <span style={{ color: '#8A95C9', fontSize: '13px' }}>Total: <strong style={{ color: '#EEF1FA' }}>{totalSqft} sqft</strong></span>
            : <span style={{ color: '#374151', fontSize: '13px' }}>Click and drag to draw your dock</span>
          }
        </div>
      </div>

      {/* Color picker */}
      <div style={{
        background: '#0d1535', borderBottom: '1px solid rgba(138,149,201,0.2)',
        padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '13px', color: '#EEF1FA', fontWeight: 700, flexShrink: 0 }}>Decking Color:</span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {WPC_COLORS.map(c => (
            <button key={c.hex} title={c.name} onClick={() => setSelectedColor(c.hex)} style={{
              width: '28px', height: '28px', borderRadius: '50%', background: c.hex, cursor: 'pointer',
              border: selectedColor === c.hex ? '3px solid #EEF1FA' : '2px solid rgba(138,149,201,0.25)',
              transform: selectedColor === c.hex ? 'scale(1.2)' : 'scale(1)',
              transition: 'all 0.15s', outline: 'none', flexShrink: 0,
            }} />
          ))}
        </div>
        <span style={{ fontSize: '13px', color: '#EEF1FA', fontWeight: 600 }}>{colorName}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
          {(['draw', 'move'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
              background: mode === m ? '#3B4A8F' : 'transparent',
              color: mode === m ? '#EEF1FA' : '#8A95C9',
              border: mode === m ? '1px solid #3B4A8F' : '1px solid rgba(138,149,201,0.3)',
              transition: 'all 0.15s',
            }}>{m === 'draw' ? 'Draw' : 'Move'}</button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div style={{ flex: 1, position: 'relative', maxHeight: 'calc(100vh - 200px)', overflow: 'hidden' }}>
        <ConfiguratorCanvas
          sections={sections}
          priceRate={0}
          selectedColor={selectedColor}
          onAdd={addSection}
          onMove={moveSection}
          onDelete={deleteSection}
        />
        {sections.length === 0 && (
          <div style={{
            position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(14,20,51,0.92)', border: '1px solid rgba(138,149,201,0.2)',
            borderRadius: '10px', padding: '10px 20px', color: '#8A95C9', fontSize: '13px',
            whiteSpace: 'nowrap', pointerEvents: 'none',
          }}>
            Click and drag to draw a dock section · Click a section to select &amp; resize
          </div>
        )}
      </div>

      {/* Bottom action bar — sticky, always visible */}
      {sections.length > 0 && (
        <div style={{
          background: '#0E1433', borderTop: '2px solid rgba(0,212,255,0.3)',
          padding: '12px 20px', paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px', position: 'sticky', bottom: 0, zIndex: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', color: '#8A95C9' }}>{colorName} · {totalSqft} sqft</span>
            <button onClick={() => { setSections([]); setSelectedId(null) }} style={{
              padding: '5px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer',
              background: 'rgba(239,68,68,0.15)', color: '#f87171',
              border: '1px solid rgba(239,68,68,0.3)',
            }}>Clear</button>
          </div>
          <button onClick={renderDock} disabled={isRendering} style={{
            padding: '14px 24px', borderRadius: '8px', fontWeight: 800, fontSize: '15px',
            background: isRendering ? 'rgba(0,212,255,0.3)' : 'linear-gradient(135deg, #00D4FF, #0099cc)',
            color: '#0D1B2A', border: 'none', cursor: isRendering ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap',
            boxShadow: isRendering ? 'none' : '0 4px 20px rgba(0,212,255,0.4)',
          }}>
            {isRendering ? (
              <><span style={{
                display: 'inline-block', width: '14px', height: '14px',
                border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#0D1B2A',
                borderRadius: '50%', animation: 'cfgSpin 0.75s linear infinite',
              }} />Designing your dock...</>
            ) : 'See My Dock in Real Life →'}
          </button>
          <style>{`@keyframes cfgSpin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Wow modal */}
      {showWow && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(4,7,22,0.97)', backdropFilter: 'blur(10px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto',
        }}>
          <div style={{ width: '100%', maxWidth: '880px', padding: '0 0 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button onClick={() => setShowWow(false)} style={{
              alignSelf: 'flex-end', margin: '16px 20px 0',
              background: 'transparent', border: 'none',
              color: '#8A95C9', fontSize: '28px', cursor: 'pointer',
            }}>×</button>

            {renderUrl && (
              <div style={{ width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
                <img src={renderUrl} alt={`${colorName} dock render`} style={{
                  width: '100%', borderRadius: '16px', display: 'block',
                  boxShadow: '0 8px 60px rgba(59,74,143,0.45)',
                }} />
              </div>
            )}

            <div style={{ textAlign: 'center', padding: '24px 24px 0' }}>
              <div style={{ fontSize: '12px', color: '#8A95C9', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                YOUR {colorName.toUpperCase()} WPC DOCK
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>
                {totalSqft} sq ft of premium composite decking
              </div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)',
                borderRadius: '14px', padding: '14px 40px',
              }}>
                <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Your custom dock
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#00D4FF', lineHeight: 1 }}>
                  Get Your Free Quote
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '6px' }}>
                  Financing available &nbsp;·&nbsp; Factory-direct pricing &nbsp;·&nbsp; 50-year warranty
                </div>
              </div>
            </div>

            <div style={{
              width: '100%', maxWidth: '480px',
              background: '#0E1433', border: '1px solid rgba(138,149,201,0.18)',
              borderRadius: '16px', padding: '28px',
              margin: '24px 20px 0', boxSizing: 'border-box',
            }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <div style={{ fontSize: '44px', marginBottom: '12px' }}>✅</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px' }}>You&apos;re all set!</h3>
                  <p style={{ color: '#8A95C9', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                    A dock specialist will reach out within 24 hours with your personalized quote.
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px' }}>Lock in this design — get your free quote</h3>
                  <p style={{ color: '#8A95C9', fontSize: '13px', lineHeight: 1.5, margin: '4px 0 20px' }}>
                    No commitment. A specialist will reach out within 24 hours.
                  </p>
                  <form onSubmit={submitLead} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {([
                        { label: 'Full Name *', key: 'name', type: 'text', required: true },
                        { label: 'Email *', key: 'email', type: 'email', required: true },
                        { label: 'Phone', key: 'phone', type: 'tel', required: false },
                        { label: 'ZIP Code', key: 'zip', type: 'text', required: false },
                      ] as { label: string; key: keyof typeof form; type: string; required: boolean }[]).map(({ label, key, type, required }) => (
                        <div key={key}>
                          <label style={{ display: 'block', fontSize: '11px', color: '#8A95C9', marginBottom: '5px', fontWeight: 600 }}>{label}</label>
                          <input required={required} type={type} value={form[key]}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}

            {/* Upload existing drawings section */}
            <div style={{ textAlign: 'center', padding: '16px 24px', borderTop: '1px solid rgba(138,149,201,0.15)' }}>
              <p style={{ color: '#8A95C9', fontSize: '13px', margin: '0 0 8px' }}>
                Already have drawings or photos of your dock?
              </p>
              <p style={{ color: '#EEF1FA', fontSize: '14px', fontWeight: 600, margin: 0 }}>
                📎 Email them to <a href="mailto:info@expressdocks.com" style={{ color: '#00D4FF' }}>info@expressdocks.com</a>
              </p>
              <p style={{ color: '#4B5A90', fontSize: '12px', marginTop: '4px' }}>
                We&apos;ll attach them to your quote and generate a render from your exact design.
              </p>
            </div>
                            style={{
                              width: '100%', padding: '10px 12px', borderRadius: '8px',
                              background: 'rgba(138,149,201,0.08)', border: '1px solid rgba(138,149,201,0.2)',
                              color: '#EEF1FA', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <button type="submit" disabled={submitting} style={{
                      padding: '14px', borderRadius: '8px',
                      background: submitting ? 'rgba(59,74,143,0.4)' : 'linear-gradient(135deg, #00D4FF, #0099cc)',
                      border: 'none', color: '#0D1B2A', fontSize: '15px', fontWeight: 800,
                      cursor: submitting ? 'default' : 'pointer', marginTop: '4px',
                    }}>
                      {submitting ? 'Sending…' : 'Get My Free Quote →'}
                    </button>
                    <p style={{ textAlign: 'center', color: '#4B5A90', fontSize: '11px', margin: 0 }}>
                      No spam, ever. By ExpressDocks.
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
