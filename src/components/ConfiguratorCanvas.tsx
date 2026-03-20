'use client'

import { useRef, useEffect, useState } from 'react'
import { Stage, Layer, Rect, Text, Line, Group } from 'react-konva'
import type { DockSection } from '@/app/configurator/page'

const CELL = 32 // pixels per foot
const GRID_COLS = 24
const GRID_ROWS = 18
const CANVAS_W = GRID_COLS * CELL
const CANVAS_H = GRID_ROWS * CELL

type SectionDefs = {
  [key: string]: {
    label: string
    w: number
    h: number
    pricePerSqft: number
    color: string
  }
}

interface Props {
  sections: DockSection[]
  selectedTool: string
  sectionDefs: SectionDefs
  onPlace: (gridX: number, gridY: number) => void
  onDelete: (id: string) => void
}

export default function ConfiguratorCanvas({ sections, selectedTool, sectionDefs, onPlace, onDelete }: Props) {
  const [hoverCell, setHoverCell] = useState<{ x: number; y: number } | null>(null)
  const [stageSize, setStageSize] = useState({ width: CANVAS_W, height: CANVAS_H })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function update() {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth
        setStageSize({ width: w, height: Math.min(CANVAS_H, Math.round(w * (CANVAS_H / CANVAS_W))) })
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const scale = stageSize.width / CANVAS_W

  function gridFromPointer(e: any) {
    const stage = e.target.getStage()
    const pos = stage.getPointerPosition()
    if (!pos) return null
    const gx = Math.floor(pos.x / scale / CELL)
    const gy = Math.floor(pos.y / scale / CELL)
    return { x: Math.max(0, Math.min(gx, GRID_COLS - 1)), y: Math.max(0, Math.min(gy, GRID_ROWS - 1)) }
  }

  function handleStageClick(e: any) {
    // If clicked on a section rect, delete it
    const name = e.target.name()
    if (name && name.startsWith('section-')) {
      const id = name.replace('section-', '')
      onDelete(id)
      return
    }
    // Otherwise place a section
    const cell = gridFromPointer(e)
    if (!cell) return
    onPlace(cell.x, cell.y)
  }

  function handleMouseMove(e: any) {
    const cell = gridFromPointer(e)
    setHoverCell(cell)
  }

  function handleMouseLeave() {
    setHoverCell(null)
  }

  const tool = sectionDefs[selectedTool]
  const hoverCollision = hoverCell
    ? sections.some((s) => {
        const d = sectionDefs[s.type]
        return (
          hoverCell.x < s.gridX + d.w &&
          hoverCell.x + tool.w > s.gridX &&
          hoverCell.y < s.gridY + d.h &&
          hoverCell.y + tool.h > s.gridY
        )
      })
    : false

  // Grid lines
  const gridLines: React.ReactNode[] = []
  for (let c = 0; c <= GRID_COLS; c++) {
    gridLines.push(
      <Line key={`v${c}`} points={[c * CELL, 0, c * CELL, GRID_ROWS * CELL]} stroke="rgba(138,149,201,0.08)" strokeWidth={1} />
    )
  }
  for (let r = 0; r <= GRID_ROWS; r++) {
    gridLines.push(
      <Line key={`h${r}`} points={[0, r * CELL, GRID_COLS * CELL, r * CELL]} stroke="rgba(138,149,201,0.08)" strokeWidth={1} />
    )
  }

  return (
    <div ref={containerRef} style={{ width: '100%', background: '#070c22', cursor: 'crosshair', position: 'relative' }}>
      <Stage
        width={stageSize.width}
        height={Math.round(stageSize.width * (CANVAS_H / CANVAS_W))}
        scaleX={scale}
        scaleY={scale}
        onClick={handleStageClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Layer>
          {/* Background */}
          <Rect x={0} y={0} width={CANVAS_W} height={CANVAS_H} fill="#070c22" />

          {/* Water texture hint */}
          <Rect x={0} y={0} width={CANVAS_W} height={CANVAS_H} fill="rgba(59,74,143,0.04)" />

          {/* Grid */}
          {gridLines}

          {/* Shore line */}
          <Rect x={0} y={CANVAS_H - CELL} width={CANVAS_W} height={CELL} fill="rgba(138,149,201,0.06)" />
          <Line points={[0, CANVAS_H - CELL, CANVAS_W, CANVAS_H - CELL]} stroke="rgba(138,149,201,0.25)" strokeWidth={2} dash={[8, 4]} />
          <Text x={8} y={CANVAS_H - CELL + 8} text="SHORE" fill="rgba(138,149,201,0.4)" fontSize={10} fontStyle="bold" />

          {/* Placed sections */}
          {sections.map((s) => {
            const d = sectionDefs[s.type]
            const px = s.gridX * CELL
            const py = s.gridY * CELL
            const pw = d.w * CELL
            const ph = d.h * CELL
            return (
              <Group key={s.id}>
                <Rect
                  name={`section-${s.id}`}
                  x={px + 2}
                  y={py + 2}
                  width={pw - 4}
                  height={ph - 4}
                  fill={d.color}
                  opacity={0.9}
                  cornerRadius={4}
                  stroke="rgba(238,241,250,0.3)"
                  strokeWidth={1}
                />
                <Text
                  x={px + 4}
                  y={py + 4}
                  text={d.label.replace(' Section', '').replace(' Dock', '')}
                  fill="rgba(238,241,250,0.85)"
                  fontSize={9}
                  fontStyle="bold"
                  listening={false}
                />
                <Text
                  x={px + 4}
                  y={py + 16}
                  text={`${d.w}×${d.h}ft`}
                  fill="rgba(138,149,201,0.8)"
                  fontSize={8}
                  listening={false}
                />
                {/* Delete X */}
                <Text
                  name={`section-${s.id}`}
                  x={px + pw - 14}
                  y={py + 3}
                  text="×"
                  fill="rgba(238,241,250,0.6)"
                  fontSize={11}
                />
              </Group>
            )
          })}

          {/* Hover preview */}
          {hoverCell && (
            <Rect
              x={hoverCell.x * CELL + 2}
              y={hoverCell.y * CELL + 2}
              width={tool.w * CELL - 4}
              height={tool.h * CELL - 4}
              fill={hoverCollision ? 'rgba(239,68,68,0.25)' : `${tool.color}55`}
              stroke={hoverCollision ? 'rgba(239,68,68,0.7)' : 'rgba(138,149,201,0.6)'}
              strokeWidth={1.5}
              dash={[4, 3]}
              cornerRadius={4}
              listening={false}
            />
          )}
        </Layer>
      </Stage>

      {/* Legend */}
      <div style={{ padding: '8px 12px', background: 'rgba(14,20,51,0.8)', borderTop: '1px solid rgba(138,149,201,0.1)', fontSize: '11px', color: '#6B7BAC', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <span>Click to place · Click section to remove</span>
        <span style={{ marginLeft: 'auto' }}>Grid: 1 cell = 1 ft · Canvas: {GRID_COLS}×{GRID_ROWS} ft</span>
      </div>
    </div>
  )
}
