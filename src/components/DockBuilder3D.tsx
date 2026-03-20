'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Grid } from '@react-three/drei'
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
  onSectionClick?: (id: string) => void
}

// Water plane with animated shader
function Water() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial
      // Subtle pulse to simulate water
      mat.opacity = 0.82 + Math.sin(state.clock.elapsedTime * 0.5) * 0.04
    }
  })
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
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

// A single dock section in 3D
function DockSectionMesh({ section, deckingColor, selected, onClick }: {
  section: DockSection3D
  deckingColor: string
  selected: boolean
  onClick?: () => void
}) {
  const SCALE = 0.3  // 1 foot = 0.3 units
  const w = section.w * SCALE
  const d = section.d * SCALE
  const h = 0.15  // dock height
  const frameH = 0.12
  const deckH = 0.04

  const cx = section.x * SCALE
  const cz = section.z * SCALE

  return (
    <group position={[cx, 0, cz]} onClick={onClick}>
      {/* Aluminum frame */}
      <mesh position={[0, frameH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, frameH, d]} />
        <meshStandardMaterial
          color={selected ? '#8A95C9' : '#9CA3AF'}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      {/* WPC Decking on top */}
      {Array.from({ length: Math.ceil(section.w) }).map((_, i) => (
        <mesh
          key={i}
          position={[
            -w / 2 + (i + 0.5) * SCALE,
            frameH + deckH / 2,
            0,
          ]}
          castShadow
        >
          <boxGeometry args={[SCALE * 0.88, deckH, d * 0.96]} />
          <meshStandardMaterial
            color={deckingColor}
            roughness={0.8}
            metalness={0.05}
          />
        </mesh>
      ))}
      {/* Selection highlight */}
      {selected && (
        <mesh position={[0, frameH + deckH + 0.01, 0]}>
          <boxGeometry args={[w + 0.05, 0.01, d + 0.05]} />
          <meshStandardMaterial color="#EEF1FA" transparent opacity={0.4} />
        </mesh>
      )}
    </group>
  )
}

// Floating dock helper — posts into water
function DockPost({ x, z }: { x: number; z: number }) {
  return (
    <mesh position={[x, -0.4, z]}>
      <cylinderGeometry args={[0.04, 0.04, 0.9, 8]} />
      <meshStandardMaterial color="#6B7280" metalness={0.7} roughness={0.3} />
    </mesh>
  )
}

// Scene content
function Scene({ sections, deckingColor, onSectionClick }: Props & { onSectionClick?: (id: string) => void }) {
  const SCALE = 0.3

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-10, 10, -5]} intensity={0.4} color="#93C5FD" />

      {/* Sky color */}
      <color attach="background" args={['#0d1f3c']} />
      <fog attach="fog" args={['#0d1f3c', 30, 80]} />

      {/* Water */}
      <Water />

      {/* Grid on water surface */}
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

      {/* Dock sections */}
      {sections.map(s => (
        <group key={s.id}>
          <DockSectionMesh
            section={s}
            deckingColor={deckingColor}
            selected={false}
            onClick={() => onSectionClick?.(s.id)}
          />
          {/* Support posts */}
          <DockPost x={s.x * SCALE - s.w * SCALE / 2 + 0.2} z={s.z * SCALE - s.d * SCALE / 2 + 0.2} />
          <DockPost x={s.x * SCALE + s.w * SCALE / 2 - 0.2} z={s.z * SCALE - s.d * SCALE / 2 + 0.2} />
          <DockPost x={s.x * SCALE - s.w * SCALE / 2 + 0.2} z={s.z * SCALE + s.d * SCALE / 2 - 0.2} />
          <DockPost x={s.x * SCALE + s.w * SCALE / 2 - 0.2} z={s.z * SCALE + s.d * SCALE / 2 - 0.2} />
        </group>
      ))}

      {/* Horizon glow */}
      <mesh position={[0, -1, -40]} rotation={[0, 0, 0]}>
        <planeGeometry args={[200, 8]} />
        <meshStandardMaterial color="#1a4a8a" transparent opacity={0.3} />
      </mesh>

      {/* Camera controls */}
      <OrbitControls
        makeDefault
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={2}
        maxDistance={30}
        target={[0, 0, 0]}
      />
    </>
  )
}

// Default demo section if none provided
const DEFAULT_SECTIONS: DockSection3D[] = [
  { id: 'demo1', x: 0, z: 0, w: 8, d: 4 },
]

export default function DockBuilder3D({ sections, deckingColor = '#8B6914', onSectionClick }: Partial<Props>) {
  const sceneSections = sections && sections.length > 0 ? sections : DEFAULT_SECTIONS

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas
        shadows
        camera={{ position: [5, 4, 8], fov: 50 }}
        style={{ background: '#0d1f3c' }}
      >
        <Suspense fallback={null}>
          <Scene
            sections={sceneSections}
            deckingColor={deckingColor}
            onSectionClick={onSectionClick}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
