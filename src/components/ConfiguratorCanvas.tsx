'use client'

import { useRef, useState, useEffect } from 'react'
import { Stage, Layer, Rect, Text, Circle, Line, Group } from 'react-konva'
import type { DockSection } from '@/app/configurator/page'

const CELL = 32         // px per foot at scale 1
const MIN_FT = 2
const VIRTUAL_CELLS = 125
const VIRTUAL_SIZE = VIRTUAL_CELLS * CELL  // 4000px = 125 ft canvas
const MIN_SCALE = 0.25
const MAX_SCALE = 3.0
const DEFAULT_SCALE = 1.0

type Corner = 'tl' | 'tr' | 'bl' | 'br'

interface DrawState {
  x0: number; y0: number; x1: number; y1: number
}

interface ResizeState {
  sectionId: string
  corner: Corner
  startX: number
  startY: number
  orig: { gx: number; gy: number; gw: number; gh: number }
}

interface PanStart {
  clientX: number
  clientY: number
  stageX: number
  stageY: number
}

interface Props {
  sections: DockSection[]
  priceRate: number
  selectedId: string | null
  selectedColor?: string
  onAdd: (s: DockSection) => void
  onUpdate: (id: string, changes: Partial<DockSection>) => void
  onDelete: (id: string) => void
  onSelect: (id: string) => void
  onMove?: (id: string, newGX: number, newGY: number) => void
  onDeselect: () => void
  onFirstDraw?: () => void
}

function snapPx(px: number): number { return Math.round(px / CELL) * CELL }

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}
function snapFt(px: number): number { return Math.round(px / CELL) }

const btnBase: React.CSSProperties = {
  width: '32px', height: '32px',
  background: 'rgba(14,20,51,0.92)',
  border: '1px solid rgba(138,149,201,0.35)',
  borderRadius: '6px',
  color: '#EEF1FA',
  fontSize: '20px',
  lineHeight: '1',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none' as const,
  flexShrink: 0,
}

export default function ConfiguratorCanvas({
  sections, priceRate, selectedId, selectedColor = '#8B6914', onAdd, onUpdate, onDelete, onSelect, onMove, onDeselect, onFirstDraw,
}: Props) {
  const [drawing, setDrawing] = useState<DrawState | null>(null)
  const [resizing, setResizing] = useState<ResizeState | null>(null)
  const [stageSize, setStageSize] = useState({ width: 800, height: 520 })
  const [scale, setScale] = useState(DEFAULT_SCALE)
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [spacePressed, setSpacePressed] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<any>(null)
  const drawingRef = useRef<DrawState | null>(null)
  const resizingRef = useRef<ResizeState | null>(null)
  const hasDrawnRef = useRef(false)

  // Refs for use inside event handlers (avoid stale closures)
  const scaleRef = useRef(DEFAULT_SCALE)
  const stagePosRef = useRef({ x: 0, y: 0 })
  const isPanningRef = useRef(false)
  const panStartRef = useRef<PanStart | null>(null)
  const spacePressedRef = useRef(false)
  const lastTouchDistRef = useRef<number | null>(null)

  // Keep refs in sync with state
  useEffect(() => { scaleRef.current = scale }, [scale])
  useEffect(() => { stagePosRef.current = stagePos }, [stagePos])

  // Resize observer
  useEffect(() => {
    function update() {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth
        setStageSize({ width: w, height: Math.max(460, Math.round(w * 0.6)) })
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Space key for pan mode
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code === 'Space' && !e.repeat &&
          !(e.target instanceof HTMLInputElement) &&
          !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        spacePressedRef.current = true
        setSpacePressed(true)
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      if (e.code === 'Space') {
        spacePressedRef.current = false
        setSpacePressed(false)
        if (isPanningRef.current) {
          isPanningRef.current = false
          setIsPanning(false)
          panStartRef.current = null
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  // Native DOM events: wheel zoom + middle/space pan (bypasses Konva cancelBubble)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const stage = stageRef.current
      if (!stage) return
      const pointer = stage.getPointerPosition()
      if (!pointer) return

      const scaleBy = 1.08
      const oldScale = scaleRef.current
      const direction = e.deltaY < 0 ? 1 : -1
      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE,
        direction > 0 ? oldScale * scaleBy : oldScale / scaleBy))

      const mousePointTo = {
        x: (pointer.x - stagePosRef.current.x) / oldScale,
        y: (pointer.y - stagePosRef.current.y) / oldScale,
      }
      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      }

      scaleRef.current = newScale
      stagePosRef.current = newPos
      setScale(newScale)
      setStagePos(newPos)
    }

    function onMouseDown(e: MouseEvent) {
      const isMid = e.button === 1
      const isSpaceDrag = e.button === 0 && spacePressedRef.current
      if (isMid || isSpaceDrag) {
        e.preventDefault()
        panStartRef.current = {
          clientX: e.clientX, clientY: e.clientY,
          stageX: stagePosRef.current.x, stageY: stagePosRef.current.y,
        }
        isPanningRef.current = true
        setIsPanning(true)
      }
    }

    function onMouseMove(e: MouseEvent) {
      if (isPanningRef.current && panStartRef.current) {
        const dx = e.clientX - panStartRef.current.clientX
        const dy = e.clientY - panStartRef.current.clientY
        const newPos = {
          x: panStartRef.current.stageX + dx,
          y: panStartRef.current.stageY + dy,
        }
        stagePosRef.current = newPos
        setStagePos(newPos)
      }
    }

    function onMouseUp(e: MouseEvent) {
      if (isPanningRef.current && (e.button === 1 || e.button === 0)) {
        isPanningRef.current = false
        setIsPanning(false)
        panStartRef.current = null
      }
    }

    function onTouchStartNative(e: TouchEvent) {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        lastTouchDistRef.current = Math.sqrt(dx * dx + dy * dy)
        e.preventDefault()
      }
    }

    function onTouchMoveNative(e: TouchEvent) {
      if (e.touches.length === 2 && lastTouchDistRef.current !== null) {
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const factor = dist / lastTouchDistRef.current
        lastTouchDistRef.current = dist

        const oldScale = scaleRef.current
        const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, oldScale * factor))

        const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2
        const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2
        const rect = container?.getBoundingClientRect()
        if (!rect) return
        const px = cx - rect.left
        const py = cy - rect.top

        const pointTo = {
          x: (px - stagePosRef.current.x) / oldScale,
          y: (py - stagePosRef.current.y) / oldScale,
        }
        const newPos = {
          x: px - pointTo.x * newScale,
          y: py - pointTo.y * newScale,
        }

        scaleRef.current = newScale
        stagePosRef.current = newPos
        setScale(newScale)
        setStagePos(newPos)
        e.preventDefault()
      }
    }

    function onTouchEndNative(e: TouchEvent) {
      if (e.touches.length < 2) lastTouchDistRef.current = null
    }

    // Prevent middle-click scroll
    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    container.addEventListener('touchstart', onTouchStartNative, { passive: false })
    container.addEventListener('touchmove', onTouchMoveNative, { passive: false })
    container.addEventListener('touchend', onTouchEndNative)

    return () => {
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('touchstart', onTouchStartNative)
      container.removeEventListener('touchmove', onTouchMoveNative)
      container.removeEventListener('touchend', onTouchEndNative)
    }
  }, [])

  // Convert screen pointer to canvas coords (accounts for scale + pan)
  function getPos(): { x: number; y: number } | null {
    const stage = stageRef.current
    if (!stage) return null
    const pos = stage.getPointerPosition()
    if (!pos) return null
    const s = scaleRef.current
    return {
      x: Math.max(0, (pos.x - stagePosRef.current.x) / s),
      y: Math.max(0, (pos.y - stagePosRef.current.y) / s),
    }
  }

  // Konva Stage events — drawing & resizing only (panning handled by native above)
  function handleMouseDown(e: any) {
    if (isPanningRef.current) return
    const name: string = e.target?.name?.() ?? ''
    if (name !== 'bg' && e.target !== stageRef.current) return
    onDeselect()
    const pos = getPos()
    if (!pos) return
    const s: DrawState = { x0: snapPx(pos.x), y0: snapPx(pos.y), x1: snapPx(pos.x), y1: snapPx(pos.y) }
    drawingRef.current = s
    setDrawing(s)
  }

  function handleMouseMove(e: any) {
    if (isPanningRef.current) return
    const pos = getPos()
    if (!pos) return

    if (drawingRef.current) {
      const s = { ...drawingRef.current, x1: snapPx(pos.x), y1: snapPx(pos.y) }
      drawingRef.current = s
      setDrawing(s)
      return
    }

    if (resizingRef.current) {
      const r = resizingRef.current
      const dx = snapFt(pos.x) - snapFt(r.startX)
      const dy = snapFt(pos.y) - snapFt(r.startY)
      const o = r.orig
      let gx = o.gx, gy = o.gy, gw = o.gw, gh = o.gh
      switch (r.corner) {
        case 'br': gw = Math.max(MIN_FT, o.gw + dx); gh = Math.max(MIN_FT, o.gh + dy); break
        case 'bl': gx = Math.min(o.gx + o.gw - MIN_FT, o.gx + dx); gw = Math.max(MIN_FT, o.gx + o.gw - gx); gh = Math.max(MIN_FT, o.gh + dy); break
        case 'tr': gy = Math.min(o.gy + o.gh - MIN_FT, o.gy + dy); gw = Math.max(MIN_FT, o.gw + dx); gh = Math.max(MIN_FT, o.gy + o.gh - gy); break
        case 'tl': gx = Math.min(o.gx + o.gw - MIN_FT, o.gx + dx); gy = Math.min(o.gy + o.gh - MIN_FT, o.gy + dy); gw = Math.max(MIN_FT, o.gx + o.gw - gx); gh = Math.max(MIN_FT, o.gy + o.gh - gy); break
      }
      onUpdate(r.sectionId, { gx, gy, gw, gh })
    }
  }

  function handleMouseUp() {
    if (isPanningRef.current) return
    if (drawingRef.current) {
      const d = drawingRef.current
      const dragged = Math.abs(d.x1 - d.x0) >= CELL || Math.abs(d.y1 - d.y0) >= CELL
      if (dragged) {
        const px = Math.min(d.x0, d.x1)
        const py = Math.min(d.y0, d.y1)
        const gw = Math.max(MIN_FT, Math.abs(snapFt(d.x1) - snapFt(d.x0)))
        const gh = Math.max(MIN_FT, Math.abs(snapFt(d.y1) - snapFt(d.y0)))
        onAdd({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, gx: snapFt(px), gy: snapFt(py), gw, gh })
        if (!hasDrawnRef.current) { hasDrawnRef.current = true; onFirstDraw?.() }
      }
      drawingRef.current = null
      setDrawing(null)
    }
    if (resizingRef.current) {
      resizingRef.current = null
      setResizing(null)
    }
  }

  function startResize(e: any, sectionId: string, corner: Corner, s: DockSection) {
    e.cancelBubble = true
    const pos = getPos()
    if (!pos) return
    const rs: ResizeState = { sectionId, corner, startX: pos.x, startY: pos.y, orig: { gx: s.gx, gy: s.gy, gw: s.gw, gh: s.gh } }
    resizingRef.current = rs
    setResizing(rs)
  }

  // Touch wrappers (single-touch drawing; multi-touch pinch handled natively)
  function onTouchStart(e: any) {
    if (e.evt?.touches?.length === 1) { e.evt?.preventDefault(); handleMouseDown(e) }
  }
  function onTouchMove(e: any) {
    if (e.evt?.touches?.length === 1) { e.evt?.preventDefault(); handleMouseMove(e) }
  }
  function onTouchEnd() { handleMouseUp() }

  // Zoom button helpers
  function adjustZoom(factor: number) {
    const oldScale = scaleRef.current
    const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, oldScale * factor))
    const cx = stageSize.width / 2
    const cy = stageSize.height / 2
    const pointTo = {
      x: (cx - stagePosRef.current.x) / oldScale,
      y: (cy - stagePosRef.current.y) / oldScale,
    }
    const newPos = {
      x: cx - pointTo.x * newScale,
      y: cy - pointTo.y * newScale,
    }
    scaleRef.current = newScale
    stagePosRef.current = newPos
    setScale(newScale)
    setStagePos(newPos)
  }

  function resetView() {
    scaleRef.current = DEFAULT_SCALE
    stagePosRef.current = { x: 0, y: 0 }
    setScale(DEFAULT_SCALE)
    setStagePos({ x: 0, y: 0 })
  }

  // Draw preview
  let preview = null
  if (drawing) {
    const px = Math.min(drawing.x0, drawing.x1)
    const py = Math.min(drawing.y0, drawing.y1)
    const pw = Math.max(MIN_FT * CELL, Math.abs(drawing.x1 - drawing.x0))
    const ph = Math.max(MIN_FT * CELL, Math.abs(drawing.y1 - drawing.y0))
    const wFt = Math.max(MIN_FT, Math.abs(snapFt(drawing.x1) - snapFt(drawing.x0)))
    const hFt = Math.max(MIN_FT, Math.abs(snapFt(drawing.y1) - snapFt(drawing.y0)))
    preview = (
      <Group listening={false}>
        <Rect x={px} y={py} width={pw} height={ph} fill={hexToRgba(selectedColor, 0.28)} stroke={selectedColor} strokeWidth={1.5} dash={[6, 3]} cornerRadius={3} />
        <Text x={px + 8} y={py + 8} text={`${wFt} × ${hFt} ft`} fill="#EEF1FA" fontSize={13} fontStyle="bold" />
        <Text x={px + 8} y={py + 26} text={`$${(wFt * hFt * priceRate).toLocaleString()}`} fill="#4ade80" fontSize={11} />
      </Group>
    )
  }

  // Grid lines for virtual canvas
  const gridLines: React.ReactNode[] = []
  for (let c = 0; c <= VIRTUAL_CELLS; c++) gridLines.push(
    <Line key={`v${c}`} points={[c * CELL, 0, c * CELL, VIRTUAL_SIZE]} stroke="rgba(138,149,201,0.055)" strokeWidth={1} listening={false} />
  )
  for (let r = 0; r <= VIRTUAL_CELLS; r++) gridLines.push(
    <Line key={`h${r}`} points={[0, r * CELL, VIRTUAL_SIZE, r * CELL]} stroke="rgba(138,149,201,0.055)" strokeWidth={1} listening={false} />
  )

  // Shore line anchored at bottom of initial viewport in canvas coords
  const SHORE_Y = stageSize.height - CELL

  const orderedSections = selectedId
    ? [...sections.filter(s => s.id !== selectedId), ...sections.filter(s => s.id === selectedId)]
    : sections

  const cursor = isPanning ? 'grabbing' : spacePressed ? 'grab' : drawing ? 'crosshair' : resizing ? 'nwse-resize' : 'crosshair'
  const pxPerFt = Math.round(CELL * scale)

  return (
    <div ref={containerRef} style={{ width: '100%', cursor, position: 'relative' }}>

      {/* Zoom controls — top-right overlay */}
      <div style={{
        position: 'absolute', top: '10px', right: '10px', zIndex: 10,
        display: 'flex', flexDirection: 'column', gap: '4px',
        pointerEvents: 'all',
      }}>
        <button onClick={() => adjustZoom(1.2)} title="Zoom in" style={btnBase}>+</button>
        <button onClick={() => adjustZoom(1 / 1.2)} title="Zoom out" style={btnBase}>−</button>
        <button
          onClick={resetView}
          title="Reset view"
          style={{ ...btnBase, fontSize: '10px', width: 'auto', padding: '0 6px', letterSpacing: '0.02em' }}
        >Reset</button>
      </div>

      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        x={stagePos.x}
        y={stagePos.y}
        scaleX={scale}
        scaleY={scale}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Layer>
          {/* Full virtual canvas background */}
          <Rect name="bg" x={0} y={0} width={VIRTUAL_SIZE} height={VIRTUAL_SIZE} fill="#070c22" />
          {gridLines}
          {/* Shore line */}
          <Rect x={0} y={SHORE_Y} width={VIRTUAL_SIZE} height={CELL} fill="rgba(138,149,201,0.04)" listening={false} />
          <Line points={[0, SHORE_Y, VIRTUAL_SIZE, SHORE_Y]} stroke="rgba(138,149,201,0.22)" strokeWidth={2} dash={[8, 4]} listening={false} />
          <Text x={8} y={SHORE_Y + 8} text="SHORE" fill="rgba(138,149,201,0.3)" fontSize={10} fontStyle="bold" listening={false} />
        </Layer>

        <Layer>
          {orderedSections.map(s => {
            const px = s.gx * CELL
            const py = s.gy * CELL
            const pw = s.gw * CELL
            const ph = s.gh * CELL
            const sqft = s.gw * s.gh
            const price = sqft * priceRate
            const sel = selectedId === s.id
            return (
              <Group
                key={s.id}
                draggable
                onMouseEnter={(e) => { const stage = e.target.getStage(); if (stage) stage.container().style.cursor = 'grab'; }}
                onMouseLeave={(e) => { const stage = e.target.getStage(); if (stage) stage.container().style.cursor = 'crosshair'; }}
                onDragStart={(e) => { e.cancelBubble = true; onSelect(s.id); const stage = e.target.getStage(); if (stage) stage.container().style.cursor = 'grabbing'; }}
                onDragEnd={(e) => {
                  e.cancelBubble = true;
                  const stage = e.target.getStage(); if (stage) stage.container().style.cursor = 'grab';
                  // The group was dragged — its absolute position in virtual canvas coords
                  // e.target.x() and y() are the GROUP offset from its original position
                  const dragOffsetX = e.target.x();
                  const dragOffsetY = e.target.y();
                  // Original position in virtual canvas
                  const origX = s.gx * CELL;
                  const origY = s.gy * CELL;
                  // New absolute position
                  const rawNewX = origX + dragOffsetX;
                  const rawNewY = origY + dragOffsetY;
                  // Snap to grid
                  const newGX = Math.max(0, Math.round(rawNewX / CELL));
                  const newGY = Math.max(0, Math.round(rawNewY / CELL));
                  // Reset group offset (section will re-render at new grid position)
                  e.target.position({ x: 0, y: 0 });
                  if (onMove) onMove(s.id, newGX, newGY);
                }}
              >
                <Rect
                  x={px + 2} y={py + 2} width={pw - 4} height={ph - 4}
                  fill={sel ? hexToRgba(selectedColor, 0.9) : hexToRgba(selectedColor, 0.65)}
                  stroke={sel ? '#EEF1FA' : 'rgba(238,241,250,0.4)'}
                  strokeWidth={sel ? 2 : 1}
                  cornerRadius={4}
                  onMouseDown={(e) => { e.cancelBubble = true; onSelect(s.id) }}
                  onTouchStart={(e) => { e.cancelBubble = true; onSelect(s.id) }}
                />
                <Text x={px + 10} y={py + 10} text={`${s.gw} × ${s.gh} ft`} fill="#EEF1FA" fontSize={12} fontStyle="bold" listening={false} />
                <Text x={px + 10} y={py + 27} text={`${sqft} sqft — $${price.toLocaleString()}`} fill="#8A95C9" fontSize={10} listening={false} />

                {sel && (
                  <>
                    <Group
                      onMouseDown={(e) => { e.cancelBubble = true; onDelete(s.id) }}
                      onTouchStart={(e) => { e.cancelBubble = true; onDelete(s.id) }}
                    >
                      <Rect x={px + pw - 26} y={py + 4} width={22} height={22} fill="rgba(239,68,68,0.85)" cornerRadius={4} />
                      <Text x={px + pw - 26 + 5} y={py + 7} text="×" fill="#fff" fontSize={14} fontStyle="bold" listening={false} />
                    </Group>

                    {([
                      { corner: 'tl' as Corner, cx: px, cy: py },
                      { corner: 'tr' as Corner, cx: px + pw, cy: py },
                      { corner: 'bl' as Corner, cx: px, cy: py + ph },
                      { corner: 'br' as Corner, cx: px + pw, cy: py + ph },
                    ]).map(({ corner, cx, cy }) => (
                      <Circle
                        key={corner}
                        x={cx} y={cy} radius={7}
                        fill="#3B4A8F" stroke="#8A95C9" strokeWidth={2}
                        onMouseDown={(e) => startResize(e, s.id, corner, s)}
                        onTouchStart={(e) => startResize(e, s.id, corner, s)}
                      />
                    ))}
                  </>
                )}
              </Group>
            )
          })}

          {preview}
        </Layer>
      </Stage>

      {/* Scale legend */}
      <div style={{
        padding: '6px 12px', background: 'rgba(14,20,51,0.8)',
        borderTop: '1px solid rgba(138,149,201,0.1)',
        fontSize: '11px', color: '#4B5563',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px',
      }}>
        <span>Click to select · drag corners to resize · × to delete · middle-click or space+drag to pan · scroll to zoom</span>
        <span style={{ color: '#8A95C9', fontWeight: 600 }}>1 ft = {pxPerFt}px &nbsp;·&nbsp; {Math.round(scale * 100)}%</span>
      </div>
    </div>
  )
}
