"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useAppStore } from "@/lib/store";

// Desk component - long L-shaped desk along the wall
export function Desk() {
  const woodColor = useMemo(() => new THREE.Color("#c4a06a"), []);
  
  return (
    <group position={[0, 0, -2.5]}>
      {/* Main desk surface */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 0.04, 0.8]} />
        <meshStandardMaterial color={woodColor} />
      </mesh>
      
      {/* Desk legs / cabinets */}
      <DeskCabinet position={[-2.5, 0.375, 0]} />
      <DeskCabinet position={[0, 0.375, 0]} />
      <DeskCabinet position={[2.5, 0.375, 0]} />
      
      {/* Items on desk */}
      <DeskItems />
    </group>
  );
}

function DeskCabinet({ position }: { position: [number, number, number] }) {
  const cabinetColor = "#b8946a";
  
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.6, 0.75, 0.7]} />
        <meshStandardMaterial color={cabinetColor} />
      </mesh>
      {/* Cabinet door lines */}
      <mesh position={[0, 0, 0.351]}>
        <planeGeometry args={[0.5, 0.6]} />
        <meshStandardMaterial color="#a8845a" />
      </mesh>
    </group>
  );
}

function DeskItems() {
  return (
    <group position={[0, 0.77, 0]}>
      {/* Books stack */}
      <BookStack position={[-2.2, 0, 0.1]} />
      
      {/* Boxes and supplies */}
      <Box position={[1, 0.1, 0.1]} size={[0.3, 0.2, 0.25]} color="#d42c2c" />
      <Box position={[1.5, 0.08, 0.1]} size={[0.25, 0.16, 0.2]} color="#ffffff" />
      
      {/* CD/tape holder */}
      <CdHolder position={[2, 0.15, 0]} />
      
      {/* Papers and magazines */}
      <Papers position={[0.2, 0, 0.15]} />
    </group>
  );
}

function BookStack({ position }: { position: [number, number, number] }) {
  const bookColors = ["#2c4a7c", "#8b4513", "#2d5a3d", "#6b2c2c", "#4a4a6a"];
  
  return (
    <group position={position}>
      {bookColors.map((color, i) => (
        <mesh key={i} position={[0, i * 0.04 + 0.02, 0]} castShadow>
          <boxGeometry args={[0.25, 0.04, 0.18]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

function Box({ position, size, color }: { 
  position: [number, number, number]; 
  size: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function CdHolder({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Orange CD spindle */}
      <mesh castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.3, 16]} />
        <meshStandardMaterial color="#ff8c00" />
      </mesh>
      {/* CDs */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -0.1 + i * 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.02, 0.11, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function Papers({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Magazine/papers stack */}
      <mesh position={[0, 0.01, 0]} rotation={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.3, 0.02, 0.22]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh position={[0.05, 0.025, 0]} rotation={[0, -0.05, 0]} castShadow>
        <boxGeometry args={[0.28, 0.01, 0.2]} />
        <meshStandardMaterial color="#e8e8e8" />
      </mesh>
    </group>
  );
}

// Office Chair
export function OfficeChair({ position, rotation = 0 }: { 
  position: [number, number, number];
  rotation?: number;
}) {
  const setZone = useAppStore((state) => state.setZone);
  const chairRef = useRef<THREE.Group>(null);
  
  return (
    <group 
      ref={chairRef} 
      position={position} 
      rotation={[0, rotation, 0]}
      onClick={(e) => {
        e.stopPropagation();
        if (position[0] < 0) {
          setZone("desk-left");
        } else {
          setZone("desk-right");
        }
      }}
    >
      {/* Seat */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.45, 0.08, 0.45]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Back rest */}
      <mesh position={[0, 0.8, -0.18]} castShadow>
        <boxGeometry args={[0.42, 0.6, 0.08]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Arm rests */}
      <mesh position={[-0.22, 0.6, 0]} castShadow>
        <boxGeometry args={[0.04, 0.2, 0.35]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <mesh position={[0.22, 0.6, 0]} castShadow>
        <boxGeometry args={[0.04, 0.2, 0.35]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Base */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.5} />
      </mesh>
      
      {/* Wheels base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.02, 5]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Wheels */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh 
            key={i} 
            position={[Math.cos(angle) * 0.22, 0.03, Math.sin(angle) * 0.22]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#222222" />
          </mesh>
        );
      })}
    </group>
  );
}

// CRT Monitor (interactive)
export function CrtMonitor({ position }: { position: [number, number, number] }) {
  const { setZone, togglePortfolio, showPortfolio } = useAppStore();
  const monitorRef = useRef<THREE.Group>(null);
  
  return (
    <group 
      ref={monitorRef} 
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setZone("monitor");
        // Small delay to let camera transition before showing portfolio
        setTimeout(() => togglePortfolio(), 500);
      }}
    >
      {/* Monitor body */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[0.45, 0.38, 0.4]} />
        <meshStandardMaterial color="#c8c8c8" />
      </mesh>
      
      {/* Screen bezel */}
      <mesh position={[0, 0.24, 0.18]}>
        <boxGeometry args={[0.38, 0.3, 0.05]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Screen */}
      <mesh position={[0, 0.24, 0.205]}>
        <planeGeometry args={[0.32, 0.24]} />
        <meshBasicMaterial color={showPortfolio ? "#000080" : "#000040"} />
      </mesh>
      
      {/* Screen glow effect when active */}
      {showPortfolio && (
        <pointLight position={[0, 0.24, 0.3]} intensity={0.1} color="#4040ff" distance={0.5} />
      )}
      
      {/* Monitor stand */}
      <mesh position={[0, 0.02, 0.05]}>
        <boxGeometry args={[0.2, 0.04, 0.25]} />
        <meshStandardMaterial color="#a0a0a0" />
      </mesh>
      
      {/* Power LED */}
      <mesh position={[0.15, 0.08, 0.2]}>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshBasicMaterial color="#00ff00" />
      </mesh>
    </group>
  );
}

// Sofa/couch
export function Sofa({ position }: { position: [number, number, number] }) {
  const setZone = useAppStore((state) => state.setZone);
  const fabricColor = "#5c3a2e";
  const stripeColor = "#4a2e24";
  
  return (
    <group 
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setZone("sofa");
      }}
    >
      {/* Seat base */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[1.4, 0.2, 0.6]} />
        <meshStandardMaterial color={fabricColor} />
      </mesh>
      
      {/* Back rest */}
      <mesh position={[0, 0.55, -0.25]} castShadow>
        <boxGeometry args={[1.4, 0.5, 0.15]} />
        <meshStandardMaterial color={fabricColor} />
      </mesh>
      
      {/* Arm rests */}
      <mesh position={[-0.65, 0.4, 0]} castShadow>
        <boxGeometry args={[0.12, 0.3, 0.6]} />
        <meshStandardMaterial color={stripeColor} />
      </mesh>
      <mesh position={[0.65, 0.4, 0]} castShadow>
        <boxGeometry args={[0.12, 0.3, 0.6]} />
        <meshStandardMaterial color={stripeColor} />
      </mesh>
      
      {/* Wooden frame visible at bottom */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[1.3, 0.08, 0.55]} />
        <meshStandardMaterial color="#5a4030" />
      </mesh>
      
      {/* Decorative cushion/fur */}
      <mesh position={[0.2, 0.38, 0.1]} rotation={[0.1, 0.2, 0]} castShadow>
        <boxGeometry args={[0.5, 0.06, 0.35]} />
        <meshStandardMaterial color="#7a7a70" />
      </mesh>
    </group>
  );
}

// Bookshelf/cabinet
export function Bookshelf({ position }: { position: [number, number, number] }) {
  const setZone = useAppStore((state) => state.setZone);
  const woodColor = "#3a2820";
  
  return (
    <group 
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setZone("bookshelf");
      }}
    >
      {/* Main cabinet frame */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.9, 1.8, 0.4]} />
        <meshStandardMaterial color={woodColor} />
      </mesh>
      
      {/* Shelves (lighter interior) */}
      {[0.3, 0.7, 1.1, 1.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0.02]}>
          <boxGeometry args={[0.82, 0.02, 0.35]} />
          <meshStandardMaterial color="#4a3830" />
        </mesh>
      ))}
      
      {/* Books on shelves */}
      <BookRow position={[-0.2, 1.3, 0.05]} count={5} />
      <BookRow position={[0.1, 0.9, 0.05]} count={4} />
      
      {/* Decorative items */}
      <mesh position={[0.25, 0.5, 0.1]} castShadow>
        <boxGeometry args={[0.15, 0.2, 0.12]} />
        <meshStandardMaterial color="#8b0000" />
      </mesh>
    </group>
  );
}

function BookRow({ position, count }: { position: [number, number, number]; count: number }) {
  const colors = ["#8b4513", "#2c4a7c", "#2d5a3d", "#6b2c2c", "#4a4a6a", "#1a1a4a"];
  
  return (
    <group position={position}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[i * 0.08, 0.1, 0]} castShadow>
          <boxGeometry args={[0.06, 0.2 + Math.random() * 0.05, 0.15]} />
          <meshStandardMaterial color={colors[i % colors.length]} />
        </mesh>
      ))}
    </group>
  );
}

// Wooden Door
export function Door({ position }: { position: [number, number, number] }) {
  const setZone = useAppStore((state) => state.setZone);
  
  return (
    <group 
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setZone("door");
      }}
    >
      {/* Door frame */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[0.8, 2, 0.1]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>
      
      {/* Door panels */}
      <mesh position={[0, 1.4, 0.051]}>
        <boxGeometry args={[0.6, 0.5, 0.02]} />
        <meshStandardMaterial color="#7a4a22" />
      </mesh>
      <mesh position={[0, 0.6, 0.051]}>
        <boxGeometry args={[0.6, 0.7, 0.02]} />
        <meshStandardMaterial color="#7a4a22" />
      </mesh>
      
      {/* Door window (frosted glass) */}
      <mesh position={[0, 1.4, 0.055]}>
        <planeGeometry args={[0.3, 0.35]} />
        <meshStandardMaterial color="#a0b0c0" transparent opacity={0.6} />
      </mesh>
      
      {/* Door handle */}
      <mesh position={[0.3, 1, 0.06]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#c0a060" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

// Keyboard on desk
export function Keyboard({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.35, 0.02, 0.12]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      {/* Key rows */}
      {[0, 1, 2, 3].map((row) => (
        <group key={row} position={[0, 0.015, -0.04 + row * 0.025]}>
          {Array.from({ length: 12 }).map((_, i) => (
            <mesh key={i} position={[-0.14 + i * 0.025, 0, 0]}>
              <boxGeometry args={[0.02, 0.005, 0.02]} />
              <meshStandardMaterial color="#e8e8e8" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
