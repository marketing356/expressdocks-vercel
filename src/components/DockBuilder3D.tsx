'use client';

import React, { useRef, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

// Types - exported for use in other components
export interface DockSection {
  id: string;
  x: number;
  z: number;
  width: number;
  depth: number;
  type: 'main' | 'finger' | 'gangway';
}

export interface DockConfig {
  sections: DockSection[];
  deckingColor: string;
  frameColor: string;
  totalSqFt: number;
}

// Decking color options
const DECKING_COLORS: Record<string, string> = {
  'Cedar': '#8B4513',
  'Gray': '#808080',
  'Weathered': '#A0A0A0',
  'Driftwood': '#C4A484',
  'Teak': '#D2691E',
  'Mahogany': '#6B2F1A',
};

// Single dock section mesh
function DockSectionMesh({ 
  section, 
  deckingColor, 
  frameColor,
  isSelected,
  onClick 
}: { 
  section: DockSection;
  deckingColor: string;
  frameColor: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Animate on hover/select
  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.02 + 0.1;
    }
  });

  const deckHeight = 0.15;
  const frameHeight = 0.4;
  
  return (
    <group 
      ref={meshRef}
      position={[section.x, 0, section.z]}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      {/* Aluminum frame */}
      <mesh position={[0, -frameHeight / 2, 0]}>
        <boxGeometry args={[section.width, frameHeight, section.depth]} />
        <meshStandardMaterial 
          color={frameColor} 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Decking surface */}
      <mesh position={[0, deckHeight / 2, 0]}>
        <boxGeometry args={[section.width - 0.05, deckHeight, section.depth - 0.05]} />
        <meshStandardMaterial 
          color={deckingColor}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Deck planks detail (lines) */}
      {Array.from({ length: Math.floor(section.width / 0.15) }).map((_, i) => (
        <mesh key={i} position={[-section.width / 2 + 0.075 + i * 0.15, deckHeight + 0.001, 0]}>
          <boxGeometry args={[0.01, 0.002, section.depth - 0.1]} />
          <meshStandardMaterial color="#00000033" transparent opacity={0.2} />
        </mesh>
      ))}
      
      {/* Selection highlight */}
      {isSelected && (
        <mesh position={[0, deckHeight + 0.01, 0]}>
          <boxGeometry args={[section.width + 0.1, 0.02, section.depth + 0.1]} />
          <meshStandardMaterial color="#00aaff" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
}

// Water plane
function Water() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.displacementScale = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + 0.1;
    }
  });
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[50, 50, 32, 32]} />
      <meshStandardMaterial 
        color="#1a5f7a"
        transparent
        opacity={0.8}
        roughness={0.1}
        metalness={0.3}
      />
    </mesh>
  );
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
  );
}

// Scene contents
function Scene({ 
  config, 
  selectedSection, 
  onSelectSection 
}: { 
  config: DockConfig;
  selectedSection: string | null;
  onSelectSection: (id: string | null) => void;
}) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[10, 8, 10]} fov={50} />
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={30}
        maxPolarAngle={Math.PI / 2.2}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 10, -5]} intensity={0.3} />
      
      {/* Environment */}
      <Environment preset="sunset" />
      
      {/* Water */}
      <Water />
      
      {/* Dock sections */}
      {config.sections.map((section) => (
        <DockSectionMesh
          key={section.id}
          section={section}
          deckingColor={DECKING_COLORS[config.deckingColor] || '#808080'}
          frameColor={config.frameColor}
          isSelected={selectedSection === section.id}
          onClick={() => onSelectSection(section.id)}
        />
      ))}
      
      {/* Ground shadow */}
      <ContactShadows 
        position={[0, -0.49, 0]} 
        opacity={0.4} 
        scale={30} 
        blur={2} 
      />
      
      {/* Click handler for deselection */}
      <mesh 
        visible={false}
        position={[0, -1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={() => onSelectSection(null)}
      >
        <planeGeometry args={[100, 100]} />
      </mesh>
    </>
  );
}

// Error boundary for WebGL crashes
class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('WebGL Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// 2D Fallback view when WebGL fails
function Fallback2DView({ config }: { config: DockConfig }) {
  const scale = 20;
  
  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-300 to-blue-500 flex items-center justify-center">
      <div className="relative">
        {/* Water background */}
        <div 
          className="absolute inset-0 -m-20 bg-blue-400 opacity-50 rounded-lg"
          style={{ width: '400px', height: '400px' }}
        />
        
        {/* Dock sections as 2D boxes */}
        <svg width="360" height="360" className="relative z-10">
          {config.sections.map((section) => (
            <g key={section.id}>
              {/* Frame */}
              <rect
                x={180 + section.x * scale - (section.width * scale) / 2}
                y={180 + section.z * scale - (section.depth * scale) / 2}
                width={section.width * scale}
                height={section.depth * scale}
                fill={config.frameColor}
                stroke="#333"
                strokeWidth="2"
              />
              {/* Decking */}
              <rect
                x={180 + section.x * scale - (section.width * scale) / 2 + 2}
                y={180 + section.z * scale - (section.depth * scale) / 2 + 2}
                width={section.width * scale - 4}
                height={section.depth * scale - 4}
                fill={DECKING_COLORS[config.deckingColor] || '#808080'}
                rx="2"
              />
            </g>
          ))}
        </svg>
        
        {/* Info overlay */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded text-sm">
          2D Preview — {config.totalSqFt} sq ft
        </div>
      </div>
    </div>
  );
}

// Main component
interface DockBuilder3DProps {
  config: DockConfig;
  onConfigChange: (config: DockConfig) => void;
}

export default function DockBuilder3D({ config, onConfigChange }: DockBuilder3DProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  // Check WebGL support on mount
  React.useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglSupported(!!gl);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  const handleSelectSection = useCallback((id: string | null) => {
    setSelectedSection(id);
  }, []);

  // Suppress unused var warning - onConfigChange will be used for edit operations
  void onConfigChange;

  // Show 2D fallback if WebGL not supported
  if (webglSupported === false) {
    return <Fallback2DView config={config} />;
  }

  // Still checking
  if (webglSupported === null) {
    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-white">Initializing 3D view...</div>
      </div>
    );
  }

  return (
    <WebGLErrorBoundary fallback={<Fallback2DView config={config} />}>
      <Canvas
        shadows
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#87CEEB');
        }}
        style={{ background: 'linear-gradient(to bottom, #87CEEB, #4A90D9)' }}
      >
        <Suspense fallback={<Loader />}>
          <Scene 
            config={config}
            selectedSection={selectedSection}
            onSelectSection={handleSelectSection}
          />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );
}

// Export default config for use in parent components
export function getDefaultDockConfig(): DockConfig {
  return {
    sections: [
      { id: 'main-1', x: 0, z: 0, width: 4, depth: 8, type: 'main' },
      { id: 'finger-1', x: 3, z: 0, width: 2, depth: 6, type: 'finger' },
    ],
    deckingColor: 'Gray',
    frameColor: '#C0C0C0',
    totalSqFt: 44,
  };
}
