'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Types
export interface DockSection {
  id: string
  gx: number  // grid x
  gy: number  // grid y
  gw: number  // grid width
  gh: number  // grid height
}

interface Props {
  sections: DockSection[]
  selectedColor: string
  priceRate: number
  onAdd: (s: DockSection) => void
  onMove: (id: string, gx: number, gy: number) => void
  onDelete: (id: string) => void
}

const CELL = 20  // pixels per foot at 1x zoom

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function snapToGrid(val: number) {
  return Math.round(val / CELL) * CELL
}

export default function ConfiguratorCanvas({ sections, selectedColor, priceRate, onAdd, onMove, onDelete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawRef = useRef<(() => void) | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ w: 800, h: 500 })
  
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedIdRef = useRef<string | null>(null)

  // State refs (avoid re-render on every mouse move)
  const stateRef = useRef({
    drawing: false,
    drawStart: { x: 0, y: 0 },
    drawCurrent: { x: 0, y: 0 },
    dragging: false,
    dragId: null as string | null,
    dragOffsetX: 0,
    dragOffsetY: 0,
    dragStartGX: 0,
    dragStartGY: 0,
    scale: 0.8,  // Default — adjusted on mount via useEffect
    panX: 0,
    panY: 0,
    panning: false,
    panStart: { x: 0, y: 0, panX: 0, panY: 0 },
    lastTouchDist: 0,
    pinchMidX: 0,
    pinchMidY: 0,
    pinchPanX: 0,
    pinchPanY: 0,
    wasDragging: false,
    sections: sections,
    selectedColor: selectedColor,
    priceRate: priceRate,
  })
  
  // Keep stateRef in sync
  stateRef.current.sections = sections
  stateRef.current.selectedColor = selectedColor
  stateRef.current.priceRate = priceRate
  selectedIdRef.current = selectedId

  // Draw everything to canvas
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { w, h } = canvasSize
    const { scale, panX, panY, drawing, drawStart, drawCurrent, sections, selectedColor, priceRate } = stateRef.current

    ctx.clearRect(0, 0, w, h)
    
    // Background
    ctx.fillStyle = '#070c22'
    ctx.fillRect(0, 0, w, h)
    
    // Apply transform
    ctx.save()
    ctx.translate(panX, panY)
    ctx.scale(scale, scale)
    
    // Grid — major lines every 5 cells, minor lines every cell
    // Minor grid lines
    ctx.strokeStyle = 'rgba(138,149,201,0.18)'
    ctx.lineWidth = 0.5 / scale
    const gridW = Math.ceil(w / scale / CELL) + 2
    const gridH = Math.ceil(h / scale / CELL) + 2
    const startX = Math.floor(-panX / scale / CELL) * CELL
    const startY = Math.floor(-panY / scale / CELL) * CELL
    for (let i = 0; i <= gridW; i++) {
      const x = startX + i * CELL
      const isMajor = Math.round(x / CELL) % 5 === 0
      ctx.strokeStyle = isMajor ? 'rgba(138,149,201,0.35)' : 'rgba(138,149,201,0.18)'
      ctx.lineWidth = (isMajor ? 1 : 0.5) / scale
      ctx.beginPath(); ctx.moveTo(x, startY); ctx.lineTo(x, startY + (gridH + 1) * CELL); ctx.stroke()
    }
    for (let i = 0; i <= gridH; i++) {
      const y = startY + i * CELL
      const isMajor = Math.round(y / CELL) % 5 === 0
      ctx.strokeStyle = isMajor ? 'rgba(138,149,201,0.35)' : 'rgba(138,149,201,0.18)'
      ctx.lineWidth = (isMajor ? 1 : 0.5) / scale
      ctx.beginPath(); ctx.moveTo(startX, y); ctx.lineTo(startX + (gridW + 1) * CELL, y); ctx.stroke()
    }
    
    // Sections
    const selId = selectedIdRef.current
    sections.forEach(s => {
      const x = s.gx * CELL
      const y = s.gy * CELL
      const pw = s.gw * CELL
      const ph = s.gh * CELL
      const sqft = s.gw * s.gh
      const sel = s.id === selId
      
      // Fill
      ctx.fillStyle = hexToRgba(selectedColor, sel ? 0.95 : 0.75)
      ctx.beginPath()
      const r = 3 / scale
      ctx.roundRect(x + 2, y + 2, pw - 4, ph - 4, r)
      ctx.fill()
      
      // Border
      ctx.strokeStyle = sel ? '#EEF1FA' : 'rgba(238,241,250,0.45)'
      ctx.lineWidth = (sel ? 2 : 1) / scale
      ctx.stroke()
      
      // Label
      const fontSize = Math.max(8, Math.min(12, (pw / 4) / scale))
      ctx.font = `bold ${fontSize}px Inter, sans-serif`
      ctx.fillStyle = '#EEF1FA'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${s.gw} × ${s.gh} ft`, x + pw/2, y + ph/2 - fontSize*0.6)
      ctx.font = `${fontSize * 0.85}px Inter, sans-serif`
      ctx.fillStyle = '#8A95C9'
      // No pricing shown on canvas — quote provided separately
      
      // Delete button on selected section
      if (sel) {
        const btnSize = Math.max(16, 20 / scale)
        const btnX = x + pw - btnSize - 4/scale
        const btnY = y + 4/scale
        ctx.fillStyle = 'rgba(239,68,68,0.9)'
        ctx.beginPath()
        ctx.roundRect(btnX, btnY, btnSize, btnSize, 4/scale)
        ctx.fill()
        ctx.fillStyle = '#fff'
        ctx.font = `bold ${btnSize * 0.65}px Inter, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('×', btnX + btnSize/2, btnY + btnSize/2)
      }
    })
    
    // Draw preview
    if (drawing) {
      const x = Math.min(drawStart.x, drawCurrent.x)
      const y = Math.min(drawStart.y, drawCurrent.y)
      const pw = Math.abs(drawCurrent.x - drawStart.x)
      const ph = Math.abs(drawCurrent.y - drawStart.y)
      if (pw > 0 && ph > 0) {
        ctx.fillStyle = hexToRgba(selectedColor, 0.35)
        ctx.strokeStyle = selectedColor
        ctx.lineWidth = 1.5 / scale
        ctx.setLineDash([5/scale, 3/scale])
        ctx.beginPath(); ctx.roundRect(x, y, pw, ph, 3/scale); ctx.fill(); ctx.stroke()
        ctx.setLineDash([])
        const wFt = Math.round(pw / CELL)
        const hFt = Math.round(ph / CELL)
        if (wFt > 0 && hFt > 0) {
          ctx.font = `bold ${12/scale}px Inter, sans-serif`
          ctx.fillStyle = '#EEF1FA'
          ctx.textAlign = 'left'
          ctx.textBaseline = 'top'
          ctx.fillText(`${wFt} × ${hFt} ft`, x + 4/scale, y + 4/scale)
        }
      }
    }
    
    ctx.restore()
  }, [canvasSize])

  // Store draw function in ref for zoom buttons
  useEffect(() => { drawRef.current = draw }, [draw])

  // Convert screen coords to canvas/grid coords
  const screenToCanvas = (cx: number, cy: number) => {
    const { scale, panX, panY } = stateRef.current
    return {
      x: (cx - panX) / scale,
      y: (cy - panY) / scale,
    }
  }

  const getCanvasXY = (e: MouseEvent | Touch) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return screenToCanvas(e.clientX - rect.left, e.clientY - rect.top)
  }

  // Hit test — returns section id or null
  const hitTest = (cx: number, cy: number) => {
    const { sections } = stateRef.current
    // Check in reverse order (top sections first)
    for (let i = sections.length - 1; i >= 0; i--) {
      const s = sections[i]
      if (cx >= s.gx * CELL && cx <= (s.gx + s.gw) * CELL &&
          cy >= s.gy * CELL && cy <= (s.gy + s.gh) * CELL) {
        return s.id
      }
    }
    return null
  }

  // Check if tap hit delete button
  const hitDeleteBtn = (pos: {x:number,y:number}, s: DockSection) => {
    const { scale } = stateRef.current
    const x = s.gx * CELL; const y = s.gy * CELL
    const pw = s.gw * CELL
    const btnSize = Math.max(16, 20 / scale)
    const btnX = x + pw - btnSize - 4/scale
    const btnY = y + 4/scale
    return pos.x >= btnX && pos.x <= btnX + btnSize && pos.y >= btnY && pos.y <= btnY + btnSize
  }

  // Pointer down
  const onPointerDown = (cx: number, cy: number) => {
    const pos = screenToCanvas(cx, cy)
    const hit = hitTest(pos.x, pos.y)
    stateRef.current.wasDragging = false
    
    if (hit) {
      const s = stateRef.current.sections.find(sec => sec.id === hit)!
      // Check delete button first (only if selected)
      if (hit === selectedIdRef.current && hitDeleteBtn(pos, s)) {
        onDelete(hit)
        setSelectedId(null)
        draw()
        return
      }
      // Select and prepare drag
      setSelectedId(hit)
      selectedIdRef.current = hit
      stateRef.current.dragging = true
      stateRef.current.dragId = hit
      stateRef.current.dragOffsetX = pos.x - s.gx * CELL
      stateRef.current.dragOffsetY = pos.y - s.gy * CELL
      stateRef.current.dragStartGX = s.gx
      stateRef.current.dragStartGY = s.gy
    } else {
      // Deselect and start draw
      setSelectedId(null)
      selectedIdRef.current = null
      const snap = { x: snapToGrid(pos.x), y: snapToGrid(pos.y) }
      stateRef.current.drawing = true
      stateRef.current.drawStart = snap
      stateRef.current.drawCurrent = snap
    }
    draw()
  }

  const onPointerMove = (cx: number, cy: number) => {
    const pos = screenToCanvas(cx, cy)
    const st = stateRef.current
    
    if (st.dragging && st.dragId) {
      const newGX = Math.max(0, Math.round((pos.x - st.dragOffsetX) / CELL))
      const newGY = Math.max(0, Math.round((pos.y - st.dragOffsetY) / CELL))
      const sec = st.sections.find(s => s.id === st.dragId)
      if (sec && (sec.gx !== newGX || sec.gy !== newGY)) {
        st.wasDragging = true
        sec.gx = newGX; sec.gy = newGY
        draw()
      }
    } else if (st.drawing) {
      st.drawCurrent = { x: snapToGrid(pos.x), y: snapToGrid(pos.y) }
      draw()
    }
  }

  const onPointerUp = (cx: number, cy: number) => {
    const pos = screenToCanvas(cx, cy)
    const st = stateRef.current
    
    if (st.dragging && st.dragId) {
      const newGX = Math.max(0, Math.round((pos.x - st.dragOffsetX) / CELL))
      const newGY = Math.max(0, Math.round((pos.y - st.dragOffsetY) / CELL))
      onMove(st.dragId, newGX, newGY)
      st.dragging = false
      st.dragId = null
    } else if (st.drawing) {
      const x = Math.min(st.drawStart.x, st.drawCurrent.x)
      const y = Math.min(st.drawStart.y, st.drawCurrent.y)
      const gw = Math.round(Math.abs(st.drawCurrent.x - st.drawStart.x) / CELL)
      const gh = Math.round(Math.abs(st.drawCurrent.y - st.drawStart.y) / CELL)
      // Minimum 2ft in each direction to prevent accidental tiny sections from taps
      if (gw >= 2 && gh >= 2) {
        onAdd({
          id: `s${Date.now()}`,
          gx: Math.round(x / CELL),
          gy: Math.round(y / CELL),
          gw, gh
        })
      }
      st.drawing = false
      st.drawStart = { x: 0, y: 0 }
      st.drawCurrent = { x: 0, y: 0 }
    }
    draw()
  }

  // Resize observer
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth
      const h = Math.max(400, Math.round(w * 0.6))
      setCanvasSize({ w, h })
    })
    ro.observe(container)
    return () => ro.disconnect()
  }, [])

  // Draw on every change
  useEffect(() => { draw() }, [draw, sections, selectedColor, canvasSize, selectedId])

  // Mouse events
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const onMD = (e: MouseEvent) => {
      if (e.button !== 0) return
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      onPointerDown(e.clientX - rect.left, e.clientY - rect.top)
    }
    const onMM = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      onPointerMove(e.clientX - rect.left, e.clientY - rect.top)
    }
    const onMU = (e: MouseEvent) => {
      if (e.button !== 0) return
      const rect = canvas.getBoundingClientRect()
      onPointerUp(e.clientX - rect.left, e.clientY - rect.top)
    }

    // Touch events — single finger draw/drag, two-finger pinch-zoom + pan
    const onTD = (e: TouchEvent) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      if (e.touches.length === 1) {
        const t = e.touches[0]
        onPointerDown(t.clientX - rect.left, t.clientY - rect.top)
      } else if (e.touches.length === 2) {
        // Two-finger gesture start — stop any drawing
        stateRef.current.drawing = false
        stateRef.current.dragging = false
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        stateRef.current.lastTouchDist = Math.sqrt(dx * dx + dy * dy)
        // Store midpoint for pan reference
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top
        stateRef.current.pinchMidX = midX
        stateRef.current.pinchMidY = midY
        stateRef.current.pinchPanX = stateRef.current.panX
        stateRef.current.pinchPanY = stateRef.current.panY
      }
    }
    const onTM = (e: TouchEvent) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      if (e.touches.length === 1 && stateRef.current.lastTouchDist === 0) {
        const t = e.touches[0]
        onPointerMove(t.clientX - rect.left, t.clientY - rect.top)
      } else if (e.touches.length === 2) {
        // Pinch to zoom
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const prevDist = stateRef.current.lastTouchDist
        if (prevDist > 0) {
          const st = stateRef.current
          const factor = dist / prevDist
          const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left
          const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top
          const oldScale = st.scale
          const newScale = Math.max(0.1, Math.min(4, oldScale * factor))
          // Zoom toward pinch midpoint
          st.panX = midX - (midX - st.panX) * (newScale / oldScale)
          st.panY = midY - (midY - st.panY) * (newScale / oldScale)
          st.scale = newScale
          // Two-finger pan
          const dPanX = midX - (st.pinchMidX ?? midX)
          const dPanY = midY - (st.pinchMidY ?? midY)
          st.panX = (st.pinchPanX ?? st.panX) + dPanX
          st.panY = (st.pinchPanY ?? st.panY) + dPanY
          st.pinchMidX = midX
          st.pinchMidY = midY
          st.pinchPanX = st.panX
          st.pinchPanY = st.panY
        }
        stateRef.current.lastTouchDist = dist
        drawRef.current?.()
      }
    }
    const onTU = (e: TouchEvent) => {
      stateRef.current.lastTouchDist = 0
      stateRef.current.pinchMidX = 0
      stateRef.current.pinchMidY = 0
      stateRef.current.pinchPanX = 0
      stateRef.current.pinchPanY = 0
      if (e.changedTouches.length > 0 && e.touches.length === 0) {
        const rect = canvas.getBoundingClientRect()
        const t = e.changedTouches[0]
        onPointerUp(t.clientX - rect.left, t.clientY - rect.top)
      }
    }

    // Wheel zoom
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const st = stateRef.current
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const factor = e.deltaY < 0 ? 1.1 : 0.9
      const newScale = Math.max(0.3, Math.min(4, st.scale * factor))
      st.panX = mouseX - (mouseX - st.panX) * (newScale / st.scale)
      st.panY = mouseY - (mouseY - st.panY) * (newScale / st.scale)
      st.scale = newScale
      draw()
    }

    canvas.addEventListener('mousedown', onMD)
    window.addEventListener('mousemove', onMM)
    window.addEventListener('mouseup', onMU)
    canvas.addEventListener('touchstart', onTD, { passive: false })
    window.addEventListener('touchmove', onTM, { passive: false })
    window.addEventListener('touchend', onTU)
    canvas.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      canvas.removeEventListener('mousedown', onMD)
      window.removeEventListener('mousemove', onMM)
      window.removeEventListener('mouseup', onMU)
      canvas.removeEventListener('touchstart', onTD)
      window.removeEventListener('touchmove', onTM)
      window.removeEventListener('touchend', onTU)
      canvas.removeEventListener('wheel', onWheel)
    }
  }, [canvasSize, onAdd, onMove, onDelete])

  const cursor = stateRef.current.dragging ? 'grabbing' : stateRef.current.drawing ? 'crosshair' : 'crosshair'

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative', cursor }}>
      <canvas
        ref={canvasRef}
        width={canvasSize.w}
        height={canvasSize.h}
        style={{ display: 'block', width: '100%', touchAction: 'none' }}
      />
      {/* Zoom controls */}
      <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 10 }}>
        {[
          { label: '+', action: () => { const s = stateRef.current; s.scale = Math.min(4, s.scale * 1.3); drawRef.current?.() } },
          { label: '−', action: () => { const s = stateRef.current; s.scale = Math.max(0.1, s.scale / 1.3); drawRef.current?.() } },
          { label: '⊡', action: () => { const s = stateRef.current; s.scale = 0.5; s.panX = 0; s.panY = 0; drawRef.current?.() } },
        ].map(btn => (
          <button key={btn.label} onMouseDown={(e) => { e.preventDefault(); btn.action() }}
            style={{ width: '32px', height: '32px', background: 'rgba(14,20,51,0.9)', border: '1px solid rgba(138,149,201,0.3)', color: '#EEF1FA', borderRadius: '6px', cursor: 'pointer', fontSize: btn.label === '⊡' ? '14px' : '18px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {btn.label}
          </button>
        ))}
      </div>
      <div style={{
        position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
        fontSize: '11px', color: 'rgba(138,149,201,0.6)', pointerEvents: 'none',
        background: 'rgba(7,12,34,0.7)', padding: '4px 10px', borderRadius: '20px',
      }}>
        Draw · Move · + / − to zoom · ⊡ to reset view
      </div>
    </div>
  )
}
