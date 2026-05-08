"use client";

import { useMemo } from "react";
import * as THREE from "three";

// Room dimensions — human-scaled (meters)
// The real attic: floor ~5m wide, ~4m deep.
// One side (front / viewer side) the ceiling slopes down to ~1.1m at the LOW wall.
// The back wall is tall (~2.4m) and vertical — desk sits against it.
// The skylight is in the sloped ceiling above the desk area.
const W = 5;     // room width (X)
const D = 4;     // room depth (Z, negative = back/desk side)
const H_LOW = 1.1;   // ceiling height at the low/front wall
const H_HIGH = 2.5;  // ceiling height at the back/desk wall
const WALL_THICK = 0.12;

export function AtticRoom() {
  return (
    <group>
      <Floor />
      <Walls />
      <SlopedCeiling />
      <Beams />
      <LightingSetup />
    </group>
  );
}

// ─── MATERIALS ──────────────────────────────────────────────────────────────

function useWoodFloorTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const plankW = 32;
    for (let x = 0; x < 256; x += plankW) {
      const base = 50 + Math.random() * 12;
      ctx.fillStyle = `hsl(30, 38%, ${base}%)`;
      ctx.fillRect(x, 0, plankW, 256);
      // grain lines
      ctx.strokeStyle = `rgba(0,0,0,${0.04 + Math.random() * 0.06})`;
      ctx.lineWidth = 0.6;
      for (let y = 0; y < 256; y += 5) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + plankW, y + (Math.random() * 3 - 1.5));
        ctx.stroke();
      }
    }
    // plank separations
    ctx.strokeStyle = "rgba(0,0,0,0.22)";
    ctx.lineWidth = 1.5;
    for (let x = 0; x < 256; x += plankW) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke();
    }
    const t = new THREE.CanvasTexture(canvas);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(3, 2);
    t.magFilter = THREE.LinearFilter;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    return t;
  }, []);
}

function useWallTexture(hex: string) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = hex;
    ctx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 300; i++) {
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? "255,255,255" : "0,0,0"},${Math.random() * 0.06})`;
      ctx.fillRect(Math.random() * 128, Math.random() * 128, Math.random() * 3 + 0.5, Math.random() * 3 + 0.5);
    }
    const t = new THREE.CanvasTexture(canvas);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 2);
    t.magFilter = THREE.LinearFilter;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    return t;
  }, [hex]);
}

// ─── FLOOR ──────────────────────────────────────────────────────────────────

function Floor() {
  const tex = useWoodFloorTexture();
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[W, D]} />
      <meshStandardMaterial map={tex} roughness={0.65} metalness={0} />
    </mesh>
  );
}

// ─── WALLS ──────────────────────────────────────────────────────────────────

function Walls() {
  const mustardTex = useWallTexture("#d4a84b");
  const ceilingTex = useWallTexture("#ede8df");

  const mustardMat = useMemo(() =>
    new THREE.MeshStandardMaterial({ map: mustardTex, roughness: 0.82, metalness: 0 })
  , [mustardTex]);

  const ceilingMat = useMemo(() =>
    new THREE.MeshStandardMaterial({ map: ceilingTex, color: "#ede8df", roughness: 0.9, metalness: 0 })
  , [ceilingTex]);

  const trimMat = useMemo(() =>
    new THREE.MeshStandardMaterial({ color: "#b8975a", roughness: 0.55, metalness: 0 })
  , []);

  // The back wall (Z = -D/2) is the TALL wall where the desk is.
  // Height varies across X only for the sloped ceiling but the back WALL itself is flat & tall.
  const backWallH = H_HIGH;
  // The front wall (Z = +D/2) is SHORT because the ceiling is low there.
  const frontWallH = H_LOW;

  return (
    <group>
      {/* ── Back wall (desk wall) — TALL, mustard yellow ── */}
      <mesh
        position={[0, backWallH / 2, -D / 2 - WALL_THICK / 2]}
        receiveShadow castShadow
      >
        <boxGeometry args={[W, backWallH, WALL_THICK]} />
        <primitive object={mustardMat.clone()} />
      </mesh>

      {/* ── Front wall — SHORT, mustard yellow (sloped ceiling meets it) ── */}
      <mesh
        position={[0, frontWallH / 2, D / 2 + WALL_THICK / 2]}
        receiveShadow
      >
        <boxGeometry args={[W, frontWallH, WALL_THICK]} />
        <primitive object={mustardMat.clone()} />
      </mesh>

      {/* ── Left side wall — trapezoid shape via custom BufferGeometry ── */}
      <SideWall
        side="left"
        material={mustardMat.clone()}
        ceilingMat={ceilingMat.clone()}
      />

      {/* ── Right side wall ── */}
      <SideWall
        side="right"
        material={mustardMat.clone()}
        ceilingMat={ceilingMat.clone()}
      />

      {/* ── Baseboard trim ── */}
      {/* Back wall baseboard */}
      <mesh position={[0, 0.05, -D / 2 - WALL_THICK - 0.01]} receiveShadow>
        <boxGeometry args={[W, 0.1, 0.04]} />
        <primitive object={trimMat.clone()} />
      </mesh>
      {/* Left baseboard */}
      <mesh position={[-W / 2 - 0.01, 0.05, 0]} receiveShadow>
        <boxGeometry args={[0.04, 0.1, D]} />
        <primitive object={trimMat.clone()} />
      </mesh>
      {/* Right baseboard */}
      <mesh position={[W / 2 + 0.01, 0.05, 0]} receiveShadow>
        <boxGeometry args={[0.04, 0.1, D]} />
        <primitive object={trimMat.clone()} />
      </mesh>
    </group>
  );
}

// Custom trapezoid side wall matching the sloped ceiling
function SideWall({
  side,
  material,
}: {
  side: "left" | "right";
  material: THREE.Material;
  ceilingMat: THREE.Material;
}) {
  const x = side === "left" ? -W / 2 : W / 2;
  const sign = side === "left" ? -1 : 1;

  // vertices of the wall quad (trapezoid):
  // floor-front, floor-back, ceiling-back (tall), ceiling-front (short)
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    // Outer face (facing outward from room)
    // We'll build 2 triangles making the trapezoid
    const zFront = D / 2;
    const zBack = -D / 2;
    const yFloor = 0;
    const yFront = H_LOW;
    const yBack = H_HIGH;

    // positions: 4 corners
    const pos = new Float32Array([
      // tri 1
      x, yFloor, zFront,   // 0 floor-front
      x, yFloor, zBack,    // 1 floor-back
      x, yBack, zBack,     // 2 ceil-back
      // tri 2
      x, yFloor, zFront,   // 3 floor-front
      x, yBack, zBack,     // 4 ceil-back
      x, yFront, zFront,   // 5 ceil-front
    ]);
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    // UVs
    const uvs = new Float32Array([
      0, 0,  1, 0,  1, 1,
      0, 0,  1, 1,  0, 1,
    ]);
    g.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

    // Normals — outward facing
    const nx = sign;
    const normals = new Float32Array(18).fill(0);
    for (let i = 0; i < 6; i++) { normals[i * 3] = nx; }
    g.setAttribute("normal", new THREE.BufferAttribute(normals, 3));

    g.computeBoundingSphere();
    return g;
  }, [x, sign]);

  return <mesh geometry={geo} material={material} receiveShadow castShadow />;
}

// ─── SLOPED CEILING ─────────────────────────────────────────────────────────

function SlopedCeiling() {
  const ceilingTex = useWallTexture("#ede8df");

  const mat = useMemo(() =>
    new THREE.MeshStandardMaterial({ map: ceilingTex, color: "#ede8df", roughness: 0.88, metalness: 0, side: THREE.FrontSide })
  , [ceilingTex]);

  // The sloped ceiling goes from y=H_LOW at z=+D/2 (front) to y=H_HIGH at z=-D/2 (back).
  // Slope angle:
  const angle = Math.atan2(H_HIGH - H_LOW, D); // rise/run
  const length = Math.sqrt(D * D + (H_HIGH - H_LOW) ** 2);
  const midY = (H_LOW + H_HIGH) / 2;
  const midZ = 0;

  // Skylight cutout position in the slope — upper third, centred on X
  // We render the skylight frame separately — the ceiling is a flat panel (no actual hole, but visually convincing)
  return (
    <group>
      {/* Main sloped ceiling panel */}
      <mesh
        position={[0, midY, midZ]}
        rotation={[angle, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[W, length, 1, 1]} />
        <primitive object={mat} />
      </mesh>

      {/* Skylight — embedded in slope above the desk area */}
      <SkylightWindow angle={angle} />

      {/* Ceiling trim strips along the slope edges */}
      <CeilingTrim angle={angle} midY={midY} midZ={midZ} length={length} />
    </group>
  );
}

function SkylightWindow({ angle }: { angle: number }) {
  // Position the skylight at ~2/3 depth toward the back wall (above desk area)
  // We need the world-space position along the slope at depth ratio t=0.7 (close to back wall)
  const t = 0.72; // 0=front, 1=back
  const sz = D / 2 - t * D;           // z world position
  const sy = H_LOW + t * (H_HIGH - H_LOW); // y world position

  const frameW = 1.4;
  const frameH = 0.9;
  const woodMat = new THREE.MeshStandardMaterial({ color: "#a08040", roughness: 0.55, metalness: 0 });
  const glassMat = new THREE.MeshStandardMaterial({ color: "#c8dcf0", transparent: true, opacity: 0.7, roughness: 0, metalness: 0.1 });
  const lightMat = new THREE.MeshBasicMaterial({ color: "#e8f4ff" });

  return (
    <group position={[0, sy + 0.05, sz]} rotation={[angle, 0, 0]}>
      {/* Bright sky seen through glass */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[frameW - 0.14, frameH - 0.14]} />
        <primitive object={lightMat} />
      </mesh>

      {/* Glass */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[frameW - 0.14, frameH - 0.14]} />
        <primitive object={glassMat} />
      </mesh>

      {/* Frame — top/bottom/left/right rails */}
      {[
        { pos: [0, frameH / 2, 0] as [number,number,number], size: [frameW, 0.07, 0.12] as [number,number,number] },
        { pos: [0, -frameH / 2, 0] as [number,number,number], size: [frameW, 0.07, 0.12] as [number,number,number] },
        { pos: [-frameW / 2, 0, 0] as [number,number,number], size: [0.07, frameH, 0.12] as [number,number,number] },
        { pos: [frameW / 2, 0, 0] as [number,number,number], size: [0.07, frameH, 0.12] as [number,number,number] },
        // centre divider
        { pos: [0, 0, 0] as [number,number,number], size: [0.05, frameH, 0.1] as [number,number,number] },
      ].map((r, i) => (
        <mesh key={i} position={r.pos} castShadow>
          <boxGeometry args={r.size} />
          <primitive object={woodMat.clone()} />
        </mesh>
      ))}

      {/* Point light inside skylight — mimics sunlight entering */}
      <pointLight position={[0, -0.3, 0.5]} intensity={1.8} color="#fffbe8" distance={5} decay={2} castShadow />
    </group>
  );
}

function CeilingTrim({ angle, midY, midZ, length }: { angle: number; midY: number; midZ: number; length: number }) {
  const trimMat = useMemo(() =>
    new THREE.MeshStandardMaterial({ color: "#b8975a", roughness: 0.55, metalness: 0 })
  , []);

  return (
    <group position={[0, midY, midZ]} rotation={[angle, 0, 0]}>
      {/* Left edge strip */}
      <mesh position={[-W / 2 + 0.04, 0, 0]}>
        <boxGeometry args={[0.08, length, 0.06]} />
        <primitive object={trimMat.clone()} />
      </mesh>
      {/* Right edge strip */}
      <mesh position={[W / 2 - 0.04, 0, 0]}>
        <boxGeometry args={[0.08, length, 0.06]} />
        <primitive object={trimMat.clone()} />
      </mesh>
    </group>
  );
}

// ─── BEAMS ───────────────────────────────────────────────────────────────────

function Beams() {
  const beamMat = useMemo(() =>
    new THREE.MeshStandardMaterial({ color: "#7a6240", roughness: 0.75, metalness: 0 })
  , []);

  // Two cross-beams running left-right across the slope, at different depths
  const beamPositions = [-0.5, 0.8]; // z positions

  return (
    <group>
      {beamPositions.map((bz, i) => {
        const t = (bz - (-D / 2)) / D;
        const by = H_LOW + (1 - t) * (H_HIGH - H_LOW) - 0.1;
        return (
          <mesh key={i} position={[0, by, bz]} castShadow receiveShadow>
            <boxGeometry args={[W - 0.3, 0.12, 0.1]} />
            <primitive object={beamMat.clone()} />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── LIGHTING ────────────────────────────────────────────────────────────────

function LightingSetup() {
  return (
    <group>
      {/* Ambient — warm fill, mimics bounce light */}
      <ambientLight intensity={0.55} color="#f2e8d8" />

      {/* Main directional — sun coming through skylight from upper-back */}
      <directionalLight
        position={[0.5, 4, -3]}
        intensity={1.1}
        color="#fff5e0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={18}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.001}
      />

      {/* Warm fill from front/low side — simulates reflected wall light */}
      <directionalLight
        position={[0, 1.5, 3]}
        intensity={0.35}
        color="#f0d8b0"
      />

      {/* Overhead practical lamp — warm point above center */}
      <pointLight
        position={[0, 2.0, 0]}
        intensity={0.7}
        color="#ffe8b0"
        distance={6}
        decay={2}
      />

      {/* Subtle cool sky bounce from skylight area */}
      <pointLight
        position={[0, 2.3, -1.5]}
        intensity={0.5}
        color="#d0e8ff"
        distance={4}
        decay={2}
      />
    </group>
  );
}
