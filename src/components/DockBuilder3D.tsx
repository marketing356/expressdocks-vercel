'use client'

import { useRef, useState, useEffect, useMemo, useCallback, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Grid, Html } from '@react-three/drei'
import * as THREE from 'three'

export interface DockSection3D {
  id: string
  x: number   // position in feet
  z: number
  w: number   // width in feet
  d: number   // depth in feet
}

interface Props {
  sections: DockSection3D[]
  deckingColor: string
  priceRate?: number
  onAdd?: (section: DockSection3D) => void
  onDelete?: (id: string) => void
  onMove?: (id: string, x: number, z: number) => void
  onSectionClick?: (id: string) => void
}

const SCALE = 0.3
const SNAP_FT = 4

function snapFt(feet: number): number {
  return Math.round(feet / SNAP_FT) * SNAP_FT
}

// Animated water plane — clicking places a new section
function Water({ onPlace }: { onPlace: (x: number, z: number) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = 0.82 + Math.sin(state.clock.elapsedTime * 0.5) * 0.04
    }
  })
  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.05, 0]}
      receiveShadow
      onPointerDown={(e) => {
        e.stopPropagation()
        const ft_x = snapFt(e.point.x / SCALE)
        const ft_z = snapFt(e.point.z / SCALE)
        onPlace(ft_x, ft_z)
      }}
    >
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial
        color="#1a4a7a"
        transparent
        opacity={0.82}
        roughness={0.1}
        metalness={0.4}
      />
    </mesh>
  )
}

function DockPost({ x, z }: { x: number; z: number }) {
  return (
    <mesh position={[x, -0.4, z]}>
      <cylinderGeometry args={[0.04, 0.04, 0.9, 8]} />
      <meshStandardMaterial color="#6B7280" metalness={0.7} roughness={0.3} />
    </mesh>
  )
}

function DockSectionMesh({
  section, deckingColor, selected,
  onSelect, onStartDrag, onDelete,
}: {
  section: DockSection3D
  deckingColor: string
  selected: boolean
  onSelect: () => void
  onStartDrag: (worldX: number, worldZ: number) => void
  onDelete: () => void
}) {
  const w = section.w * SCALE
  const d = section.d * SCALE
  const frameH = 0.12
  const deckH = 0.04
  const cx = section.x * SCALE
  const cz = section.z * SCALE

  function handleDown(e: { stopPropagation: () => void; point: THREE.Vector3 }) {
    e.stopPropagation()
    if (!selected) {
      onSelect()
    } else {
      onStartDrag(e.point.x, e.point.z)
    }
  }

  return (
    <group position={[cx, 0, cz]}>
      {/* Aluminum frame */}
      <mesh
        position={[0, frameH / 2, 0]}
        castShadow
        receiveShadow
        onPointerDown={handleDown}
      >
        <boxGeometry args={[w, frameH, d]} />
        <meshStandardMaterial
          color={selected ? '#3B5BDB' : '#9CA3AF'}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* WPC decking boards */}
      {Array.from({ length: Math.ceil(section.w) }).map((_, i) => (
        <mesh
          key={i}
          position={[-w / 2 + (i + 0.5) * SCALE, frameH + deckH / 2, 0]}
          castShadow
          onPointerDown={handleDown}
        >
          <boxGeometry args={[SCALE * 0.88, deckH, d * 0.96]} />
          <meshStandardMaterial
            color={selected ? '#4C6EF5' : deckingColor}
            roughness={0.8}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* Selection highlight glow */}
      {selected && (
        <mesh position={[0, frameH + deckH + 0.01, 0]}>
          <boxGeometry args={[w + 0.06, 0.01, d + 0.06]} />
          <meshStandardMaterial color="#748FFC" transparent opacity={0.45} />
        </mesh>
      )}

      {/* Delete button via Html overlay */}
      {selected && (
        <Html
          position={[0, frameH + deckH + 0.28, 0]}
          center
          distanceFactor={6}
          zIndexRange={[100, 0]}
        >
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            style={{
              background: 'rgba(239,68,68,0.92)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '7px',
              padding: '5px 14px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 12px rgba(0,0,0,0.55)',
              userSelect: 'none',
              letterSpacing: '0.02em',
            }}
          >
            🗑 Delete
          </button>
        </Html>
      )}
    </group>
  )
}

// Uses DOM pointer events + manual raycasting against y=0 plane for smooth drag
function DragHandler({
  isDragging,
  onDragMove,
  onDragEnd,
}: {
  isDragging: boolean
  onDragMove: (worldX: number, worldZ: number) => void
  onDragEnd: () => void
}) {
  const threeState = useThree()
  const stateRef = useRef(threeState)
  stateRef.current = threeState

  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), [])
  const cbRef = useRef({ onDragMove, onDragEnd })
  cbRef.current = { onDragMove, onDragEnd }

  useEffect(() => {
    if (!isDragging) return

    function handleMove(e: PointerEvent) {
      const { camera, raycaster, gl } = stateRef.current
      const rect = gl.domElement.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera)
      const target = new THREE.Vector3()
      if (raycaster.ray.intersectPlane(plane, target)) {
        cbRef.current.onDragMove(target.x, target.z)
      }
    }

    function handleUp() {
      cbRef.current.onDragEnd()
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }
  }, [isDragging, plane])

  return null
}

interface SceneProps extends Props {
  selectedId: string | null
  onSelectChange: (id: string | null) => void
}

function Scene({
  sections, deckingColor, onAdd, onDelete, onMove,
  selectedId, onSelectChange,
}: SceneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const orbitRef = useRef<any>(null)
  const dragIdRef = useRef<string | null>(null)
  const dragOffsetRef = useRef({ x: 0, z: 0 })

  function handlePlace(ft_x: number, ft_z: number) {
    if (isDragging) return
    const id = `dock_${Date.now()}`
    onAdd?.({ id, x: ft_x, z: ft_z, w: 8, d: 4 })
    onSelectChange(id)
  }

  function handleStartDrag(id: string, worldX: number, worldZ: number) {
    const section = sections.find(s => s.id === id)
    if (!section) return
    dragIdRef.current = id
    dragOffsetRef.current = {
      x: worldX / SCALE - section.x,
      z: worldZ / SCALE - section.z,
    }
    setIsDragging(true)
    if (orbitRef.current) orbitRef.current.enabled = false
  }

  const handleDragMove = useCallback((worldX: number, worldZ: number) => {
    if (!dragIdRef.current) return
    const newX = snapFt(worldX / SCALE - dragOffsetRef.current.x)
    const newZ = snapFt(worldZ / SCALE - dragOffsetRef.current.z)
    onMove?.(dragIdRef.current, newX, newZ)
  }, [onMove])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    dragIdRef.current = null
    if (orbitRef.current) orbitRef.current.enabled = true
  }, [])

  function handleDelete(id: string) {
    onDelete?.(id)
    onSelectChange(null)
  }

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-10, 10, -5]} intensity={0.4} color="#93C5FD" />
      <color attach="background" args={['#0d1f3c']} />
      <fog attach="fog" args={['#0d1f3c', 30, 80]} />

      <Water onPlace={handlePlace} />

      <Grid
        position={[0, 0, 0]}
        args={[40, 40]}
        cellSize={SCALE}
        cellThickness={0.5}
        cellColor="#1e3a5f"
        sectionSize={SCALE * 5}
        sectionThickness={1}
        sectionColor="#2a4f7a"
        fadeDistance={30}
        fadeStrength={2}
        followCamera={false}
        infiniteGrid
      />

      {sections.map(s => (
        <group key={s.id}>
          <DockSectionMesh
            section={s}
            deckingColor={deckingColor}
            selected={selectedId === s.id}
            onSelect={() => onSelectChange(s.id)}
            onStartDrag={(wx, wz) => handleStartDrag(s.id, wx, wz)}
            onDelete={() => handleDelete(s.id)}
          />
          <DockPost x={s.x * SCALE - s.w * SCALE / 2 + 0.2} z={s.z * SCALE - s.d * SCALE / 2 + 0.2} />
          <DockPost x={s.x * SCALE + s.w * SCALE / 2 - 0.2} z={s.z * SCALE - s.d * SCALE / 2 + 0.2} />
          <DockPost x={s.x * SCALE - s.w * SCALE / 2 + 0.2} z={s.z * SCALE + s.d * SCALE / 2 - 0.2} />
          <DockPost x={s.x * SCALE + s.w * SCALE / 2 - 0.2} z={s.z * SCALE + s.d * SCALE / 2 - 0.2} />
        </group>
      ))}

      {/* Horizon glow */}
      <mesh position={[0, -1, -40]}>
        <planeGeometry args={[200, 8]} />
        <meshStandardMaterial color="#1a4a8a" transparent opacity={0.3} />
      </mesh>

      <OrbitControls
        ref={orbitRef}
        makeDefault
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={2}
        maxDistance={30}
        target={[0, 0, 0]}
      />

      <DragHandler
        isDragging={isDragging}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      />
    </>
  )
}

export default function DockBuilder3D({
  sections = [],
  deckingColor = '#8B6914',
  priceRate = 50,
  onAdd,
  onDelete,
  onMove,
}: Partial<Props>) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const totalSqft = sections.reduce((sum, s) => sum + s.w * s.d, 0)
  const totalPrice = totalSqft * (priceRate ?? 50)

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', position: 'relative' }}>

      {/* Stats + hint overlay — top left */}
      <div style={{
        position: 'absolute', top: '12px', left: '12px', zIndex: 10,
        background: 'rgba(8,13,38,0.88)',
        border: '1px solid rgba(138,149,201,0.18)',
        borderRadius: '10px', padding: '10px 16px',
        backdropFilter: 'blur(8px)',
        pointerEvents: 'none',
        minWidth: '170px',
      }}>
        <div style={{ fontSize: '10px', color: '#4B5A90', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px' }}>
          3D Builder
        </div>
        <div style={{ fontSize: '13px', color: '#EEF1FA', marginBottom: '2px' }}>
          {sections.length} section{sections.length !== 1 ? 's' : ''} &nbsp;·&nbsp; {totalSqft} sqft
        </div>
        <div style={{ fontSize: '22px', fontWeight: 800, color: '#4ade80', lineHeight: 1.1 }}>
          ${totalPrice.toLocaleString()}
        </div>
        <div style={{ fontSize: '10px', color: '#374151', marginTop: '6px', lineHeight: 1.5 }}>
          Click water → place section<br />
          Click section → select &amp; drag
        </div>
      </div>

      <Canvas
        shadows
        camera={{ position: [5, 4, 8], fov: 50 }}
        style={{ background: '#0d1f3c' }}
        onPointerMissed={() => setSelectedId(null)}
      >
        <Suspense fallback={null}>
          <Scene
            sections={sections}
            deckingColor={deckingColor}
            priceRate={priceRate}
            onAdd={onAdd}
            onDelete={onDelete}
            onMove={onMove}
            selectedId={selectedId}
            onSelectChange={setSelectedId}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
