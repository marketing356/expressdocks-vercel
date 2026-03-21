'use client'

import React, { useRef, useState, useEffect, useCallback, Suspense } from 'react'
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Grid, Html } from '@react-three/drei'
import * as THREE from 'three'

// Exported type for other components
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
  section,
  color,
  onPointerDown,
  onDoubleClick,
}: {
  section: DockSection3D
  color: string
  onPointerDown: (e: ThreeEvent<PointerEvent>) => void
  onDoubleClick: () => void
}) {
  const ref = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  const w = section.w * SCALE
  const d = section.d * SCALE
  const x = section.x * SCALE
  const z = section.z * SCALE

  return (
    <group
      ref={ref}
      position={[x, 0, z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
    >
      {/* Aluminum frame */}
      <mesh position={[0, -0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, 0.12, d]} />
        <meshStandardMaterial color="#B0B0B0" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Decking surface */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[w - 0.02, 0.06, d - 0.02]} />
        <meshStandardMaterial
          color={hovered ? '#FFD700' : color}
          roughness={0.65}
          metalness={0.05}
        />
      </mesh>

      {/* Posts at corners */}
      <DockPost x={-w / 2 + 0.05} z={-d / 2 + 0.05} />
      <DockPost x={w / 2 - 0.05} z={-d / 2 + 0.05} />
      <DockPost x={-w / 2 + 0.05} z={d / 2 - 0.05} />
      <DockPost x={w / 2 - 0.05} z={d / 2 - 0.05} />
    </group>
  )
}

// Simple grid lines (replacing Grid component due to prop issues)
function SimpleGrid() {
  const size = 40
  const divisions = 20
  
  return (
    <gridHelper 
      args={[size, divisions, '#88ccff', '#ffffff33']} 
      position={[0, 0.005, 0]} 
    />
  )
}

function Scene({
  sections,
  deckingColor,
  onAdd,
  onDelete,
  onMove,
}: {
  sections: DockSection3D[]
  deckingColor: string
  onAdd?: (section: DockSection3D) => void
  onDelete?: (id: string) => void
  onMove?: (id: string, x: number, z: number) => void
}) {
  const [dragging, setDragging] = useState<string | null>(null)

  const handlePlace = useCallback(
    (x: number, z: number) => {
      if (!onAdd) return
      const newSection: DockSection3D = {
        id: `section-${Date.now()}`,
        x,
        z,
        w: 8,
        d: 4,
      }
      onAdd(newSection)
    },
    [onAdd]
  )

  const handlePointerDown = useCallback(
    (id: string) => (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      setDragging(id)
    },
    []
  )

  const handlePointerUp = useCallback(() => {
    setDragging(null)
  }, [])

  const handlePointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (!dragging || !onMove) return
      const ft_x = snapFt(e.point.x / SCALE)
      const ft_z = snapFt(e.point.z / SCALE)
      onMove(dragging, ft_x, ft_z)
    },
    [dragging, onMove]
  )

  return (
    <>
      {/* Camera and controls */}
      <PerspectiveCamera makeDefault position={[8, 6, 8]} fov={50} />
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={3}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2.1}
      />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 15, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 8, -8]} intensity={0.4} />

      {/* Water */}
      <Water onPlace={handlePlace} />

      {/* Grid helper */}
      <SimpleGrid />

      {/* Dock sections */}
      <group onPointerUp={handlePointerUp} onPointerMove={handlePointerMove}>
        {sections.map((section) => (
          <DockSectionMesh
            key={section.id}
            section={section}
            color={deckingColor}
            onPointerDown={handlePointerDown(section.id)}
            onDoubleClick={() => onDelete?.(section.id)}
          />
        ))}
      </group>
    </>
  )
}

// Loading fallback
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-white text-sm">Loading 3D...</span>
      </div>
    </Html>
  )
}

// Error boundary for WebGL crashes
class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('WebGL Error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

// 2D Fallback view when WebGL fails
function Fallback2DView({ sections, deckingColor }: { sections: DockSection3D[]; deckingColor: string }) {
  const scale = 8
  const totalSqFt = sections.reduce((sum, s) => sum + s.w * s.d, 0)
  
  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-400 to-blue-600 flex items-center justify-center relative">
      <svg width="400" height="400" className="relative z-10">
        {/* Water background */}
        <rect x="0" y="0" width="400" height="400" fill="#1a5f7a" opacity="0.5" />
        
        {/* Grid */}
        {Array.from({ length: 11 }).map((_, i) => (
          <React.Fragment key={i}>
            <line x1={i * 40} y1="0" x2={i * 40} y2="400" stroke="#ffffff22" />
            <line x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="#ffffff22" />
          </React.Fragment>
        ))}
        
        {/* Dock sections */}
        {sections.map((section) => (
          <g key={section.id}>
            {/* Frame */}
            <rect
              x={200 + section.x * scale - (section.w * scale) / 2}
              y={200 + section.z * scale - (section.d * scale) / 2}
              width={section.w * scale}
              height={section.d * scale}
              fill="#B0B0B0"
              stroke="#666"
              strokeWidth="2"
            />
            {/* Decking */}
            <rect
              x={200 + section.x * scale - (section.w * scale) / 2 + 3}
              y={200 + section.z * scale - (section.d * scale) / 2 + 3}
              width={section.w * scale - 6}
              height={section.d * scale - 6}
              fill={deckingColor}
              rx="2"
            />
          </g>
        ))}
      </svg>
      
      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded text-sm">
        2D Preview — {totalSqFt} sq ft ({sections.length} section{sections.length !== 1 ? 's' : ''})
      </div>
      
      <div className="absolute top-4 right-4 bg-yellow-500/90 text-black px-3 py-2 rounded text-sm">
        WebGL unavailable — showing 2D view
      </div>
    </div>
  )
}

// Main component
export default function DockBuilder3D({
  sections,
  deckingColor,
  priceRate,
  onAdd,
  onDelete,
  onMove,
  onSectionClick,
}: Props) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null)

  // Check WebGL support on mount
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setWebglSupported(!!gl)
    } catch {
      setWebglSupported(false)
    }
  }, [])

  // Suppress unused var warnings
  void priceRate
  void onSectionClick

  // Show 2D fallback if WebGL not supported
  if (webglSupported === false) {
    return <Fallback2DView sections={sections} deckingColor={deckingColor} />
  }

  // Still checking
  if (webglSupported === null) {
    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-white">Initializing 3D view...</div>
      </div>
    )
  }

  return (
    <WebGLErrorBoundary fallback={<Fallback2DView sections={sections} deckingColor={deckingColor} />}>
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#87CEEB')
        }}
        style={{ background: 'linear-gradient(to bottom, #87CEEB, #4A90D9)' }}
      >
        <Suspense fallback={<Loader />}>
          <Scene
            sections={sections}
            deckingColor={deckingColor}
            onAdd={onAdd}
            onDelete={onDelete}
            onMove={onMove}
          />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  )
}
