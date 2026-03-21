'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { DockSection3D } from '@/components/DockBuilder3D'
import ThreeErrorBoundary from '@/components/ThreeErrorBoundary'

const ConfiguratorCanvas = dynamic(() => import('@/components/ConfiguratorCanvas'), { ssr: false })
const DockBuilder3D = dynamic(() => import('@/components/DockBuilder3D'), {
  ssr: false,
  loading: () => (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400, color: '#8A95C9' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🎮</div>
        <div>Loading 3D view...</div>
      </div>
    </div>
  )
})

export type DockSection = {
  id: string
  gx: number
  gy: number
  gw: number
  gh: number
}

const DOCK_TYPES = [
  { label: 'Residential',        detail: 'Floating & Fixed', rate: 0 },
  { label: 'Commercial',         detail: 'Marina-grade', rate: 0 },
  { label: 'Fingers / Gangways', detail: 'Premium', rate: 0 },
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
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => { setIsDesktop(window.innerWidth >= 768) }, [])
  const [rateIdx, setRateIdx] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hintVisible, setHintVisible] = useState(true)
  const [selectedColor, setSelectedColor] = useState(WPC_COLORS[0].hex)
  const [mode, setMode] = useState<'draw' | 'move'>('draw')

  // Render flow
  const [isRendering, setIsRendering] = useState(false)
  const [renderUrl, setRenderUrl] = useState<string | null>(null)
  const [showWow, setShowWow] = useState(false)

  // Email image feature
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [emailSending, setEmailSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  // Lead form
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadForm, setLeadForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zip: '',
    waterfront: ''
  })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadSubmitted, setLeadSubmitted] = useState(false)

  const totalSqft = sections.reduce((acc, s) => acc + s.gw * s.gh * 4, 0)
  const colorName = WPC_COLORS.find(c => c.hex === selectedColor)?.name ?? 'Custom'

  // Build 3D sections from 2D
  const sections3D: DockSection3D[] = sections.map(s => ({
    id: s.id,
    x: s.gx * 2 - 12,
    z: s.gy * 2 - 8,
    w: s.gw * 2,
    d: s.gh * 2,
    color: selectedColor,
  }))

  async function renderDock() {
    setIsRendering(true)
    setHintVisible(false)
    try {
      const res = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `photorealistic aerial photo of a custom aluminum floating dock with ${colorName} WPC composite decking, ${totalSqft} sqft, on a calm lake at golden hour, 8K, luxury waterfront property`
        })
      })
      const data = await res.json()
      if (data.imageUrl) {
        setRenderUrl(data.imageUrl)
        setShowWow(true)
      }
    } catch (err) {
      console.error('Render failed', err)
    }
    setIsRendering(false)
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLeadSubmitting(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadForm,
          renderUrl,
          details: `DOCK BUILDER RENDER LEAD\n\nType: ${DOCK_TYPES[rateIdx].label}\nColor: ${colorName}\nTotal: ${totalSqft} sqft\nRender: ${renderUrl}`,
        })
      })
      setLeadSubmitted(true)
    } catch (err) {
      console.error('Lead submit failed', err)
    }
    setLeadSubmitting(false)
  }

  // Download image handler
  const handleDownloadImage = () => {
    if (!renderUrl) return
    const link = document.createElement('a')
    link.href = renderUrl
    link.download = `my-expressdocks-${totalSqft}sqft-${colorName.toLowerCase()}-dock.jpg`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Email image handler
  const handleEmailImage = async () => {
    if (!emailInput || !renderUrl) return
    
    setEmailSending(true)
    try {
      const response = await fetch('/api/send-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput,
          imageUrl: renderUrl,
          colorName: colorName,
          sqft: totalSqft
        })
      })
      
      if (response.ok) {
        setEmailSent(true)
        setShowEmailForm(false)
        // Pre-fill email in lead form
        setLeadForm(prev => ({ ...prev, email: emailInput }))
      }
    } catch (error) {
      console.error('Failed to send email:', error)
    } finally {
      setEmailSending(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0A0E1A', color: 'white' }}>
      {/* Header */}
      <header style={{ padding: '16px 24px', borderBottom: '1px solid #1E2538', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: 22, fontWeight: 700, textDecoration: 'none', color: 'white' }}>
          Express<span style={{ color: '#F59E0B' }}>Docks</span>
        </a>
        <div style={{ color: '#8A95C9', fontSize: 14 }}>3D Dock Builder</div>
      </header>

      {/* Main area */}
      <div style={{ display: 'flex', flex: 1, flexDirection: isDesktop ? 'row' : 'column' }}>
        {/* Sidebar */}
        <aside style={{ width: isDesktop ? 280 : '100%', background: '#0F1322', padding: 20, borderRight: isDesktop ? '1px solid #1E2538' : 'none' }}>
          {/* Dock type */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontWeight: 600, marginBottom: 8, display: 'block' }}>Dock Type</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {DOCK_TYPES.map((dt, i) => (
                <button
                  key={dt.label}
                  onClick={() => setRateIdx(i)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: rateIdx === i ? '2px solid #F59E0B' : '1px solid #2D3548',
                    background: rateIdx === i ? '#1A1F32' : 'transparent',
                    color: 'white',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 500 }}>{dt.label}</div>
                  <div style={{ fontSize: 12, color: '#8A95C9' }}>{dt.detail}</div>
                </button>
              ))}
            </div>
          </div>

          {/* WPC Color */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontWeight: 600, marginBottom: 8, display: 'block' }}>Decking Color</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {WPC_COLORS.map(c => (
                <button
                  key={c.hex}
                  onClick={() => setSelectedColor(c.hex)}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    border: selectedColor === c.hex ? '2px solid #F59E0B' : '1px solid #2D3548',
                    background: 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ width: '100%', height: 32, borderRadius: 4, background: c.hex, marginBottom: 4 }} />
                  <div style={{ fontSize: 11, color: '#8A95C9' }}>{c.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Mode toggle */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontWeight: 600, marginBottom: 8, display: 'block' }}>Tool Mode</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setMode('draw')}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 8,
                  border: mode === 'draw' ? '2px solid #F59E0B' : '1px solid #2D3548',
                  background: mode === 'draw' ? '#1A1F32' : 'transparent',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                ✏️ Draw
              </button>
              <button
                onClick={() => setMode('move')}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 8,
                  border: mode === 'move' ? '2px solid #F59E0B' : '1px solid #2D3548',
                  background: mode === 'move' ? '#1A1F32' : 'transparent',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                ✋ Move
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ background: '#1A1F32', borderRadius: 12, padding: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: '#8A95C9', marginBottom: 4 }}>Total Area</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#F59E0B' }}>{totalSqft} sqft</div>
          </div>

          {/* View toggle */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button
              onClick={() => setView('2d')}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 8,
                border: view === '2d' ? '2px solid #F59E0B' : '1px solid #2D3548',
                background: view === '2d' ? '#1A1F32' : 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              2D View
            </button>
            <button
              onClick={() => setView('3d')}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 8,
                border: view === '3d' ? '2px solid #F59E0B' : '1px solid #2D3548',
                background: view === '3d' ? '#1A1F32' : 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              3D View
            </button>
          </div>

          {/* Render button */}
          <button
            onClick={renderDock}
            disabled={sections.length === 0 || isRendering}
            style={{
              width: '100%',
              padding: '14px 0',
              borderRadius: 10,
              border: 'none',
              background: sections.length === 0 ? '#3D4559' : 'linear-gradient(135deg, #F59E0B, #D97706)',
              color: sections.length === 0 ? '#6B7280' : 'white',
              fontWeight: 700,
              fontSize: 16,
              cursor: sections.length === 0 ? 'not-allowed' : 'pointer',
              opacity: isRendering ? 0.7 : 1
            }}
          >
            {isRendering ? '🎨 Rendering...' : '✨ Generate AI Render'}
          </button>
        </aside>

        {/* Canvas area */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 400, position: 'relative' }}>
          {hintVisible && sections.length === 0 && (
            <div style={{
              position: 'absolute',
              top: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(245, 158, 11, 0.9)',
              color: '#0A0E1A',
              padding: '10px 20px',
              borderRadius: 8,
              fontWeight: 600,
              zIndex: 10,
              pointerEvents: 'none'
            }}>
              {mode === 'draw' ? '✏️ Click and drag to draw dock sections' : '✋ Drag sections to reposition'}
            </div>
          )}

          {view === '2d' ? (
            <ConfiguratorCanvas
              sections={sections}
              setSections={setSections}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              mode={mode}
              selectedColor={selectedColor}
            />
          ) : (
            <ThreeErrorBoundary>
              <DockBuilder3D sections={sections3D} />
            </ThreeErrorBoundary>
          )}
        </main>
      </div>

      {/* Wow moment full-screen modal */}
      {showWow && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.95)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: 20,
          overflowY: 'auto'
        }}>
          <button
            onClick={() => {
              setShowWow(false)
              setShowLeadForm(false)
              setShowEmailForm(false)
              setEmailSent(false)
            }}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              fontSize: 24,
              width: 44,
              height: 44,
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>

          {/* The render image */}
          {renderUrl && (
            <img
              src={renderUrl}
              alt={`${colorName} dock render`}
              style={{
                maxWidth: '90%',
                maxHeight: '50vh',
                borderRadius: 16,
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
              }}
            />
          )}

          {/* Specs */}
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 18, color: '#F59E0B', fontWeight: 600 }}>
              Your {totalSqft} sq ft {colorName} WPC Dock
            </div>
            <div style={{ fontSize: 14, color: '#8A95C9', marginTop: 4 }}>
              {DOCK_TYPES[rateIdx].label} • Aluminum Frame • Designed by You
            </div>
          </div>

          {/* Email sent confirmation */}
          {emailSent && (
            <div style={{
              marginTop: 16,
              background: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid #22C55E',
              padding: '12px 24px',
              borderRadius: 8,
              color: '#22C55E',
              fontWeight: 500
            }}>
              ✅ Your dock image has been sent! Check your inbox.
            </div>
          )}

          {/* Download & Email buttons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={handleDownloadImage}
              style={{
                padding: '12px 24px',
                borderRadius: 8,
                border: '1px solid #3D4559',
                background: 'transparent',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              ⬇️ Download Image
            </button>
            
            {!emailSent && (
              <button
                onClick={() => setShowEmailForm(!showEmailForm)}
                style={{
                  padding: '12px 24px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                📧 Email My Dock Image
              </button>
            )}
          </div>

          {/* Email form - inline expansion */}
          {showEmailForm && !emailSent && (
            <div style={{
              marginTop: 20,
              background: 'rgba(255,255,255,0.05)',
              padding: 20,
              borderRadius: 12,
              width: '100%',
              maxWidth: 400
            }}>
              <div style={{ fontSize: 14, color: '#8A95C9', marginBottom: 12 }}>
                We'll send your custom dock render to your inbox
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: '1px solid #3D4559',
                    background: '#1A1F32',
                    color: 'white',
                    fontSize: 16
                  }}
                />
                <button
                  onClick={handleEmailImage}
                  disabled={!emailInput || emailSending}
                  style={{
                    padding: '12px 20px',
                    borderRadius: 8,
                    border: 'none',
                    background: emailInput ? 'linear-gradient(135deg, #22C55E, #16A34A)' : '#3D4559',
                    color: 'white',
                    fontWeight: 600,
                    cursor: emailInput ? 'pointer' : 'not-allowed',
                    opacity: emailSending ? 0.7 : 1
                  }}
                >
                  {emailSending ? '...' : 'Send'}
                </button>
              </div>
            </div>
          )}

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => setShowLeadForm(true)}
              style={{
                padding: '14px 32px',
                borderRadius: 10,
                border: 'none',
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                color: 'white',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer'
              }}
            >
              Get My Free Quote
            </button>
            <a
              href="tel:800-370-2285"
              style={{
                padding: '14px 32px',
                borderRadius: 10,
                border: '1px solid #3D4559',
                background: 'transparent',
                color: 'white',
                fontWeight: 600,
                fontSize: 16,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              📞 Call 800-370-2285
            </a>
          </div>

          {/* Lead form modal */}
          {showLeadForm && !leadSubmitted && (
            <div style={{
              marginTop: 24,
              background: '#1A1F32',
              padding: 24,
              borderRadius: 16,
              width: '100%',
              maxWidth: 500
            }}>
              <h3 style={{ marginBottom: 16, fontSize: 20, fontWeight: 700 }}>Get Your Free Custom Quote</h3>
              <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={leadForm.firstName}
                    onChange={e => setLeadForm({ ...leadForm, firstName: e.target.value })}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      borderRadius: 8,
                      border: '1px solid #3D4559',
                      background: '#0F1322',
                      color: 'white'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={leadForm.lastName}
                    onChange={e => setLeadForm({ ...leadForm, lastName: e.target.value })}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      borderRadius: 8,
                      border: '1px solid #3D4559',
                      background: '#0F1322',
                      color: 'white'
                    }}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={leadForm.email}
                  onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: '1px solid #3D4559',
                    background: '#0F1322',
                    color: 'white'
                  }}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={leadForm.phone}
                  onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: '1px solid #3D4559',
                    background: '#0F1322',
                    color: 'white'
                  }}
                />
                <div style={{ display: 'flex', gap: 12 }}>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={leadForm.zip}
                    onChange={e => setLeadForm({ ...leadForm, zip: e.target.value })}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      borderRadius: 8,
                      border: '1px solid #3D4559',
                      background: '#0F1322',
                      color: 'white'
                    }}
                  />
                  <select
                    value={leadForm.waterfront}
                    onChange={e => setLeadForm({ ...leadForm, waterfront: e.target.value })}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      borderRadius: 8,
                      border: '1px solid #3D4559',
                      background: '#0F1322',
                      color: leadForm.waterfront ? 'white' : '#8A95C9'
                    }}
                  >
                    <option value="">Waterfront Type</option>
                    <option value="lake">Lake</option>
                    <option value="river">River</option>
                    <option value="pond">Pond</option>
                    <option value="ocean">Ocean/Bay</option>
                    <option value="marina">Marina</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={leadSubmitting}
                  style={{
                    padding: '14px 0',
                    borderRadius: 10,
                    border: 'none',
                    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: 'pointer',
                    opacity: leadSubmitting ? 0.7 : 1
                  }}
                >
                  {leadSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              </form>
            </div>
          )}

          {/* Lead submitted confirmation */}
          {leadSubmitted && (
            <div style={{
              marginTop: 24,
              background: 'rgba(34, 197, 94, 0.2)',
              border: '2px solid #22C55E',
              padding: 24,
              borderRadius: 16,
              textAlign: 'center',
              maxWidth: 400
            }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#22C55E', marginBottom: 8 }}>
                Quote Request Received!
              </div>
              <div style={{ color: '#8A95C9' }}>
                Our team will contact you within 24 hours with a detailed quote for your custom dock.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
