'use client'

import { useRef, useState, useEffect } from 'react'
import { Stage, Layer, Rect, Text, Circle, Line, Group } from 'react-konva'
import type { DockSection } from '@/app/configurator/page'

const CELL = 32 // px per foot
const MIN_FT = 2 // minimum feet in any dimension

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

interface Props {
  sections: DockSection[]
  priceRate: number
  selectedId: string | null
  onAdd: (s: DockSection) => void
  onUpdate: (id: string, changes: Partial<DockSection>) => void
  onDelete: (id: string) => void
  onSelect: (id: string) => void
  onDeselect: () => void
  onFirstDraw?: () => void
}

function snapPx(px: number): number { return Math.round(px / CELL) * CELL }
function snapFt(px: number): number { return Math.round(px / CELL) }

export default function ConfiguratorCanvas({
  sections, priceRate, selectedId, onAdd, onUpdate, onDelete, onSelect, onDeselect, onFirstDraw,
}: Props) {
  const [drawing, setDrawing] = useState<DrawState | null>(null)
  const [resizing, setResizing] = useState<ResizeState | null>(null)
  const [stageSize, setStageSize] = useState({ width: 800, height: 520 })
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<any>(null)
  const drawingRef = useRef<DrawState | null>(null)
  const resizingRef = useRef<ResizeState | null>(null)
  const hasDrawnRef = useRef(false)

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

  function getPos(): { x: number; y: number } | null {
    const pos = stageRef.current?.getPointerPosition()
    return pos ? { x: Math.max(0, pos.x), y: Math.max(0, pos.y) } : null
  }

  // Stage-level events
  function handleMouseDown(e: any) {
    // Only act on background clicks (cancelBubble stops this from firing for shapes)
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

  // Touch wrappers
  function onTouchStart(e: any) { e.evt?.preventDefault(); handleMouseDown(e) }
  function onTouchMove(e: any) { e.evt?.preventDefault(); handleMouseMove(e) }
  function onTouchEnd() { handleMouseUp() }

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
        <Rect x={px} y={py} width={pw} height={ph} fill="rgba(59,74,143,0.28)" stroke="#8A95C9" strokeWidth={1.5} dash={[6, 3]} cornerRadius={3} />
        <Text x={px + 8} y={py + 8} text={`${wFt} × ${hFt} ft`} fill="#EEF1FA" fontSize={13} fontStyle="bold" />
        <Text x={px + 8} y={py + 26} text={`$${(wFt * hFt * priceRate).toLocaleString()}`} fill="#4ade80" fontSize={11} />
      </Group>
    )
  }

  // Grid lines
  const COLS = Math.ceil(stageSize.width / CELL)
  const ROWS = Math.ceil(stageSize.height / CELL)
  const gridLines: React.ReactNode[] = []
  for (let c = 0; c <= COLS; c++) gridLines.push(<Line key={`v${c}`} points={[c*CELL, 0, c*CELL, ROWS*CELL]} stroke="rgba(138,149,201,0.055)" strokeWidth={1} listening={false} />)
  for (let r = 0; r <= ROWS; r++) gridLines.push(<Line key={`h${r}`} points={[0, r*CELL, COLS*CELL, r*CELL]} stroke="rgba(138,149,201,0.055)" strokeWidth={1} listening={false} />)

  // Render selected section last so handles are on top
  const orderedSections = selectedId
    ? [...sections.filter(s => s.id !== selectedId), ...sections.filter(s => s.id === selectedId)]
    : sections

  const cursor = drawing ? 'crosshair' : resizing ? 'nwse-resize' : 'crosshair'

  return (
    <div ref={containerRef} style={{ width: '100%', cursor }}>
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Layer>
          <Rect name="bg" x={0} y={0} width={stageSize.width} height={stageSize.height} fill="#070c22" />
          {gridLines}
          {/* Shore line */}
          <Rect x={0} y={stageSize.height - CELL} width={stageSize.width} height={CELL} fill="rgba(138,149,201,0.04)" listening={false} />
          <Line points={[0, stageSize.height - CELL, stageSize.width, stageSize.height - CELL]} stroke="rgba(138,149,201,0.22)" strokeWidth={2} dash={[8, 4]} listening={false} />
          <Text x={8} y={stageSize.height - CELL + 8} text="SHORE" fill="rgba(138,149,201,0.3)" fontSize={10} fontStyle="bold" listening={false} />
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
              <Group key={s.id}>
                {/* Section body */}
                <Rect
                  x={px + 2} y={py + 2} width={pw - 4} height={ph - 4}
                  fill={sel ? 'rgba(59,74,143,0.88)' : 'rgba(59,74,143,0.6)'}
                  stroke={sel ? '#8A95C9' : 'rgba(138,149,201,0.32)'}
                  strokeWidth={sel ? 2 : 1}
                  cornerRadius={4}
                  onMouseDown={(e) => { e.cancelBubble = true; onSelect(s.id) }}
                  onTouchStart={(e) => { e.cancelBubble = true; onSelect(s.id) }}
                />
                {/* Label */}
                <Text x={px + 10} y={py + 10} text={`${s.gw} × ${s.gh} ft`} fill="#EEF1FA" fontSize={12} fontStyle="bold" listening={false} />
                <Text x={px + 10} y={py + 27} text={`${sqft} sqft — $${price.toLocaleString()}`} fill="#8A95C9" fontSize={10} listening={false} />

                {sel && (
                  <>
                    {/* Delete button */}
                    <Group
                      onMouseDown={(e) => { e.cancelBubble = true; onDelete(s.id) }}
                      onTouchStart={(e) => { e.cancelBubble = true; onDelete(s.id) }}
                    >
                      <Rect x={px + pw - 26} y={py + 4} width={22} height={22} fill="rgba(239,68,68,0.85)" cornerRadius={4} />
                      <Text x={px + pw - 26 + 5} y={py + 7} text="×" fill="#fff" fontSize={14} fontStyle="bold" listening={false} />
                    </Group>

                    {/* Corner resize handles */}
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
      <div style={{ padding: '6px 12px', background: 'rgba(14,20,51,0.8)', borderTop: '1px solid rgba(138,149,201,0.1)', fontSize: '11px', color: '#4B5563', display: 'flex', justifyContent: 'space-between' }}>
        <span>Click a section to select · drag corner handles to resize · × to delete</span>
        <span>1 grid cell = 1 ft</span>
      </div>
    </div>
  )
}
