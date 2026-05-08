"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { useAppStore } from "@/lib/store";
import { MonitorPortfolioContent } from "@/components/ui/MonitorPortfolioContent";

// Desk component - proportioned for human scale
export function Desk() {
  const woodColor = useMemo(() => new THREE.Color("#b89a6f"), []);

  // Long L-shaped desk running along back wall, centered at z=-1.8
  return (
    <group position={[0, 0, -1.85]}>
      {/* Main long surface spanning most of the back wall */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.04, 0.65]} />
        <meshStandardMaterial color={woodColor} roughness={0.55} metalness={0.05} />
      </mesh>

      {/* Under-desk shelf for storage */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.03, 0.6]} />
        <meshStandardMaterial color={woodColor} roughness={0.65} metalness={0} />
      </mesh>

      {/* Left side panel */}
      <mesh position={[-1.77, 0.375, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.04, 0.75, 0.63]} />
        <meshStandardMaterial color="#9a8055" roughness={0.7} metalness={0} />
      </mesh>

      {/* Right side panel */}
      <mesh position={[1.77, 0.375, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.04, 0.75, 0.63]} />
        <meshStandardMaterial color="#9a8055" roughness={0.7} metalness={0} />
      </mesh>

      {/* Support legs */}
      <DeskLeg position={[-1.5, 0.375, 0.28]} />
      <DeskLeg position={[0, 0.375, 0.28]} />
      <DeskLeg position={[1.5, 0.375, 0.28]} />
    </group>
  );
}

function DeskLeg({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[0.05, 0.75, 0.04]} />
      <meshStandardMaterial color="#8b7355" roughness={0.7} metalness={0} />
    </mesh>
  );
}

// Office Chair - human-scale
export function OfficeChair({
  position,
  rotation = 0,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  const setZone = useAppStore((state) => state.setZone);
  const chairRef = useRef<THREE.Group>(null);
  const fabricColor = "#1a1a2e";

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
      {/* Seat cushion */}
      <mesh position={[0, 0.45, 0.1]} castShadow>
        <boxGeometry args={[0.5, 0.12, 0.5]} />
        <meshStandardMaterial
          color={fabricColor}
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* Back rest */}
      <mesh position={[0, 0.75, -0.15]} castShadow>
        <boxGeometry args={[0.48, 0.5, 0.08]} />
        <meshStandardMaterial
          color={fabricColor}
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* Armrests */}
      <mesh position={[-0.27, 0.55, 0.1]} castShadow>
        <boxGeometry args={[0.05, 0.25, 0.45]} />
        <meshStandardMaterial
          color={fabricColor}
          roughness={0.8}
          metalness={0}
        />
      </mesh>
      <mesh position={[0.27, 0.55, 0.1]} castShadow>
        <boxGeometry args={[0.05, 0.25, 0.45]} />
        <meshStandardMaterial
          color={fabricColor}
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* Base cylinder */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.3, 16]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Wheel base */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.02, 8]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Wheels */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.25, 0.04, Math.sin(angle) * 0.25]}
            castShadow
          >
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial
              color="#2a2a2a"
              roughness={0.5}
              metalness={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// CRT Monitor - with embedded portfolio display
export function CrtMonitor({ position }: { position: [number, number, number] }) {
  const { setZone, currentZone, showPortfolio, togglePortfolio } = useAppStore();
  const monitorRef = useRef<THREE.Group>(null);

  // Screen dimensions in 3D units
  const screenWidth = 0.36;
  const screenHeight = 0.27;

  // Check if we're zoomed into the monitor
  const isMonitorView = currentZone === "monitor";

  return (
    <group ref={monitorRef} position={position}>
      {/* Monitor body/bezel - CRT style bulky case */}
      <mesh position={[0, 0.2, -0.05]} castShadow>
        <boxGeometry args={[0.48, 0.38, 0.3]} />
        <meshStandardMaterial color="#d4d0c8" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Screen bezel frame */}
      <mesh position={[0, 0.2, 0.1]}>
        <boxGeometry args={[0.42, 0.32, 0.02]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Screen area - clickable */}
      <mesh
        position={[0, 0.2, 0.112]}
        onClick={(e) => {
          e.stopPropagation();
          if (!isMonitorView) {
            setZone("monitor");
          } else {
            togglePortfolio();
          }
        }}
      >
        <planeGeometry args={[screenWidth, screenHeight]} />
        <meshBasicMaterial color={showPortfolio ? "#000040" : "#0a0a18"} />
      </mesh>

      {/* Portfolio content rendered on screen - fills entire screen */}
      {showPortfolio && isMonitorView && (
        <Html
          position={[0, 0.2, 0.114]}
          transform
          occlude
          scale={0.022}
          style={{
            width: "360px",
            height: "270px",
            overflow: "hidden",
          }}
        >
          <MonitorPortfolioContent />
        </Html>
      )}

      {/* CRT screen glow/reflection when off */}
      {!showPortfolio && (
        <mesh position={[0, 0.2, 0.113]}>
          <planeGeometry args={[screenWidth * 0.95, screenHeight * 0.95]} />
          <meshBasicMaterial color="#0a1020" transparent opacity={0.8} />
        </mesh>
      )}

      {/* "Click to view" prompt when at monitor but portfolio closed */}
      {isMonitorView && !showPortfolio && (
        <Html position={[0, 0.2, 0.12]} transform distanceFactor={0.15} center>
          <div
            style={{
              color: "#00ff00",
              fontFamily: "monospace",
              fontSize: "14px",
              textAlign: "center",
              textShadow: "0 0 5px #00ff00",
              animation: "blink 1s infinite",
            }}
          >
            Click screen to view portfolio
          </div>
          <style>{`@keyframes blink { 50% { opacity: 0.5; } }`}</style>
        </Html>
      )}

      {/* Monitor stand */}
      <mesh position={[0, 0.02, 0.05]} castShadow>
        <boxGeometry args={[0.2, 0.04, 0.18]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Stand neck */}
      <mesh position={[0, 0.04, 0.02]} castShadow>
        <boxGeometry args={[0.08, 0.06, 0.08]} />
        <meshStandardMaterial color="#b0b0b0" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Power LED */}
      <mesh position={[0.2, 0.06, 0.11]} castShadow>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshBasicMaterial color={showPortfolio ? "#00ff00" : "#004400"} />
      </mesh>

      {/* Power button */}
      <mesh position={[0.18, 0.06, 0.11]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.01, 12]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

// Sofa/Bed Platform - comfortable attic furniture
export function Sofa({ position }: { position: [number, number, number] }) {
  const setZone = useAppStore((state) => state.setZone);
  const fabricColor = "#5c3a2e";

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setZone("sofa");
      }}
    >
      {/* Base platform */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.05, 0.6]} />
        <meshStandardMaterial
          color="#8b6f47"
          roughness={0.7}
          metalness={0}
        />
      </mesh>

      {/* Seat cushion */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[1.2, 0.25, 0.6]} />
        <meshStandardMaterial
          color={fabricColor}
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* Back rest */}
      <mesh position={[0, 0.75, -0.25]} castShadow>
        <boxGeometry args={[1.2, 0.4, 0.12]} />
        <meshStandardMaterial
          color={fabricColor}
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* Side armrest left */}
      <mesh position={[-0.6, 0.55, 0]} castShadow>
        <boxGeometry args={[0.1, 0.25, 0.6]} />
        <meshStandardMaterial
          color="#4a2e24"
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* Side armrest right */}
      <mesh position={[0.6, 0.55, 0]} castShadow>
        <boxGeometry args={[0.1, 0.25, 0.6]} />
        <meshStandardMaterial
          color="#4a2e24"
          roughness={0.8}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

// Bookshelf/Storage Cabinet
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
      {/* Main cabinet body */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.6, 0.3]} />
        <meshStandardMaterial color={woodColor} roughness={0.7} metalness={0} />
      </mesh>

      {/* Shelves */}
      {[0.2, 0.55, 0.9, 1.25].map((y, i) => (
        <mesh key={i} position={[0, y, 0.01]} receiveShadow>
          <boxGeometry args={[0.75, 0.03, 0.28]} />
          <meshStandardMaterial
            color="#2a1810"
            roughness={0.8}
            metalness={0}
          />
        </mesh>
      ))}

      {/* Books on shelves - visible books for content */}
      <BookStack position={[-0.2, 1.1, 0.08]} orientation="vertical" count={3} />
      <BookStack position={[0.1, 1.1, 0.08]} orientation="vertical" count={4} />
      <BookStack position={[-0.25, 0.65, 0.08]} orientation="vertical" count={5} />
    </group>
  );
}

function BookStack({
  position,
  orientation,
  count,
}: {
  position: [number, number, number];
  orientation: "horizontal" | "vertical";
  count: number;
}) {
  const bookColors = [
    "#8b4513",
    "#2c4a7c",
    "#2d5a3d",
    "#6b2c2c",
    "#4a4a6a",
    "#1a1a4a",
  ];

  return (
    <group position={position}>
      {Array.from({ length: count }).map((_, i) => {
        const offset =
          orientation === "vertical"
            ? [i * 0.045, 0, 0]
            : [0, 0, i * 0.03];
        const dimensions =
          orientation === "vertical"
            ? [0.04, 0.22, 0.12]
            : [0.04, 0.18, 0.12];

        return (
          <mesh
            key={i}
            position={offset as [number, number, number]}
            castShadow
          >
            <boxGeometry args={dimensions as [number, number, number]} />
            <meshStandardMaterial
              color={bookColors[i % bookColors.length]}
              roughness={0.6}
              metalness={0}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Wooden Door with frame
export function Door({ position }: { position: [number, number, number] }) {
  const setZone = useAppStore((state) => state.setZone);
  const doorWoodColor = "#8b5a3c";

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setZone("door");
      }}
    >
      {/* Door frame */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 1.8, 0.08]} />
        <meshStandardMaterial
          color="#7a4a2b"
          roughness={0.7}
          metalness={0}
        />
      </mesh>

      {/* Door leaf */}
      <mesh position={[0.04, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 1.8, 0.04]} />
        <meshStandardMaterial
          color={doorWoodColor}
          roughness={0.6}
          metalness={0}
        />
      </mesh>

      {/* Door panels detail */}
      {[0.4, 0.1].map((y, i) => (
        <mesh key={i} position={[0.05, y + 0.9, 0.022]}>
          <planeGeometry args={[0.6, 0.35]} />
          <meshStandardMaterial
            color="#7a4a2b"
            roughness={0.7}
            metalness={0}
          />
        </mesh>
      ))}

      {/* Glass panel in upper door */}
      <mesh position={[0.05, 1.4, 0.025]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshStandardMaterial
          color="#a8c5d8"
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0}
        />
      </mesh>

      {/* Door handle */}
      <mesh position={[0.08, 0.9, -0.02]} castShadow>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial
          color="#b8860b"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

// CRT Monitor Screen (can display content)
export function Keyboard({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main keyboard body */}
      <mesh castShadow>
        <boxGeometry args={[0.32, 0.02, 0.12]} />
        <meshStandardMaterial
          color="#d0d0d0"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Keys */}
      {[0, 1, 2, 3].map((row) => (
        <group key={row} position={[0, 0.013, -0.035 + row * 0.026]}>
          {Array.from({ length: 12 }).map((_, i) => (
            <mesh
              key={i}
              position={[-0.14 + i * 0.024, 0, 0]}
              castShadow
            >
              <boxGeometry args={[0.018, 0.005, 0.018]} />
              <meshStandardMaterial
                color="#e8e8e8"
                roughness={0.3}
                metalness={0.1}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
