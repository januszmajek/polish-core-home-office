"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore, InteractionZone } from "@/lib/store";

interface HotspotProps {
  position: [number, number, number];
  zone: InteractionZone;
  label: string;
}

function Hotspot({ position, zone, label }: HotspotProps) {
  const { currentZone, setZone, isTransitioning } = useAppStore();
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Pulse animation
  useFrame((state) => {
    if (meshRef.current && currentZone !== zone) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  // Don't show hotspot for current zone
  if (currentZone === zone) return null;

  return (
    <group position={position}>
      {/* Clickable sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          if (!isTransitioning) {
            setZone(zone);
          }
        }}
        onPointerEnter={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial 
          color={hovered ? "#ffcc00" : "#ffffff"} 
          transparent 
          opacity={hovered ? 0.9 : 0.6}
        />
      </mesh>
      
      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.22, 32]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Arrow pointing down */}
      <mesh position={[0, 0.35, 0]}>
        <coneGeometry args={[0.08, 0.15, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export function InteractionHotspots() {
  return (
    <group>
      <Hotspot 
        position={[0, 1.2, 3]} 
        zone="overview" 
        label="Overview" 
      />
      <Hotspot 
        position={[-1.8, 1.2, -1.8]} 
        zone="monitor" 
        label="Computer" 
      />
      <Hotspot 
        position={[-2.5, 1.2, -1.5]} 
        zone="desk-left" 
        label="Left Desk" 
      />
      <Hotspot 
        position={[1.5, 1.2, -1.5]} 
        zone="desk-right" 
        label="Right Desk" 
      />
      <Hotspot 
        position={[3, 1.2, 0.5]} 
        zone="bookshelf" 
        label="Bookshelf" 
      />
      <Hotspot 
        position={[-2.8, 1.2, -0.5]} 
        zone="sofa" 
        label="Sofa" 
      />
      <Hotspot 
        position={[1.5, 1.2, -2]} 
        zone="door" 
        label="Door" 
      />
    </group>
  );
}
