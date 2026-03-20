'use client'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import type { DockSection3D } from '@/components/DockBuilder3D'

const DockBuilder3D = dynamic(() => import('@/components/DockBuilder3D'), { ssr: false })

const COLORS = [
  { name: 'Teak', hex: '#8B6914' },
  { name: 'Grey', hex: '#7A7A7A' },
  { name: 'Walnut', hex: '#5C3D1E' },
  { name: 'Cedar', hex: '#A0522D' },
  { name: 'Driftwood', hex: '#9E8B6B' },
  { name: 'Redwood', hex: '#8B3A3A' },
]

const DEMO: DockSection3D[] = [
  { id: '1', x: 0, z: 0, w: 16, d: 8 },
  { id: '2', x: 10, z: 6, w: 8, d: 4 },
  { id: '3', x: -8, z: 6, w: 8, d: 4 },
]

export default function Page() {
  const [color, setColor] = useState('#8B6914')
  return (
    <main style={{ background: '#0E1433', minHeight: '100vh', color: '#EEF1FA' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(138,149,201,0.2)', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 800, fontSize: '16px' }}>🎨 Dock Builder 3D — Preview</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {COLORS.map(c => (
            <button key={c.hex} title={c.name} onClick={() => setColor(c.hex)} style={{
              width: '28px', height: '28px', borderRadius: '50%', background: c.hex, border: color === c.hex ? '3px solid #EEF1FA' : '2px solid rgba(138,149,201,0.3)', cursor: 'pointer', outline: 'none',
            }} />
          ))}
        </div>
        <span style={{ fontSize: '12px', color: '#8A95C9' }}>Drag to orbit · Scroll to zoom</span>
      </div>
      <div style={{ height: 'calc(100vh - 60px)' }}>
        <DockBuilder3D sections={DEMO} deckingColor={color} />
      </div>
    </main>
  )
}
