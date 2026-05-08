"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";

// Room dimensions based on reference images
const ROOM_WIDTH = 8;
const ROOM_DEPTH = 6;
const WALL_HEIGHT = 1.4; // Lower walls to show furniture clearly
const CEILING_PEAK = 3.2;
const SKYLIGHT_WIDTH = 3;
const SKYLIGHT_HEIGHT = 1.5;

export function AtticRoom() {
  const wallColor = useMemo(() => new THREE.Color("#d4a84b"), []);
  const ceilingColor = useMemo(() => new THREE.Color("#f5f0e6"), []);
  const floorColor = useMemo(() => new THREE.Color("#c4a574"), []);

  return (
    <group>
      {/* Floor */}
      <Floor color={floorColor} />
      
      {/* Walls */}
      <Walls color={wallColor} />
      
      {/* Slanted Ceiling with Skylight */}
      <SlantedCeiling color={ceilingColor} />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Skylight light source */}
      <directionalLight
        position={[0, 4, -1]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={15}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      
      {/* Warm room lights */}
      <pointLight position={[-2, 2, 0]} intensity={0.4} color="#fff5e6" />
      <pointLight position={[2, 2, 0]} intensity={0.4} color="#fff5e6" />
    </group>
  );
}

function Floor({ color }: { color: THREE.Color }) {
  const floorRef = useRef<THREE.Mesh>(null);
  
  // Create a simple wood plank pattern
  const woodTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    
    // Base wood color
    ctx.fillStyle = "#c4a574";
    ctx.fillRect(0, 0, 64, 64);
    
    // Wood grain lines
    ctx.strokeStyle = "#b8956a";
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * 8 + 4);
      ctx.lineTo(64, i * 8 + 4);
      ctx.stroke();
    }
    
    // Plank separations
    ctx.strokeStyle = "#a08050";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(32, 0);
    ctx.lineTo(32, 64);
    ctx.stroke();
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 6);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    
    return texture;
  }, []);

  return (
    <mesh
      ref={floorRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
      <meshStandardMaterial map={woodTexture} color={color} />
    </mesh>
  );
}

function Walls({ color }: { color: THREE.Color }) {
  // Create pixel-art wall texture
  const wallTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d")!;
    
    // Base mustard color
    ctx.fillStyle = "#d4a84b";
    ctx.fillRect(0, 0, 32, 32);
    
    // Subtle texture variation
    ctx.fillStyle = "#d9ae55";
    for (let i = 0; i < 16; i++) {
      const x = Math.floor(Math.random() * 32);
      const y = Math.floor(Math.random() * 32);
      ctx.fillRect(x, y, 2, 2);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 2);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    
    return texture;
  }, []);

  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, WALL_HEIGHT / 2, -ROOM_DEPTH / 2]} receiveShadow>
        <planeGeometry args={[ROOM_WIDTH, WALL_HEIGHT]} />
        <meshStandardMaterial map={wallTexture} color={color} />
      </mesh>
      
      {/* Left wall */}
      <mesh
        position={[-ROOM_WIDTH / 2, WALL_HEIGHT / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[ROOM_DEPTH, WALL_HEIGHT]} />
        <meshStandardMaterial map={wallTexture} color={color} />
      </mesh>
      
      {/* Right wall */}
      <mesh
        position={[ROOM_WIDTH / 2, WALL_HEIGHT / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[ROOM_DEPTH, WALL_HEIGHT]} />
        <meshStandardMaterial map={wallTexture} color={color} />
      </mesh>
      
      {/* Front wall (partial, with opening for door) */}
      <mesh
        position={[0, WALL_HEIGHT / 2, ROOM_DEPTH / 2]}
        rotation={[0, Math.PI, 0]}
        receiveShadow
      >
        <planeGeometry args={[ROOM_WIDTH, WALL_HEIGHT]} />
        <meshStandardMaterial 
          map={wallTexture} 
          color={color} 
          transparent 
          opacity={0.3} 
        />
      </mesh>
    </group>
  );
}

function SlantedCeiling({ color }: { color: THREE.Color }) {
  // Create ceiling texture
  const ceilingTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d")!;
    
    ctx.fillStyle = "#f5f0e6";
    ctx.fillRect(0, 0, 16, 16);
    
    // Subtle plaster texture
    ctx.fillStyle = "#efe9db";
    for (let i = 0; i < 8; i++) {
      const x = Math.floor(Math.random() * 16);
      const y = Math.floor(Math.random() * 16);
      ctx.fillRect(x, y, 1, 1);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 6);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    
    return texture;
  }, []);

  // Create slanted ceiling geometry
  const ceilingGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Create trapezoid shape for slanted ceiling
    shape.moveTo(-ROOM_WIDTH / 2, WALL_HEIGHT);
    shape.lineTo(ROOM_WIDTH / 2, WALL_HEIGHT);
    shape.lineTo(ROOM_WIDTH / 2 - 1, CEILING_PEAK);
    shape.lineTo(-ROOM_WIDTH / 2 + 1, CEILING_PEAK);
    shape.closePath();
    
    const geometry = new THREE.ShapeGeometry(shape);
    return geometry;
  }, []);

  return (
    <group>
      {/* Main slanted ceiling on the right side (where skylight is) */}
      <mesh
        position={[ROOM_WIDTH / 4, 0, 0]}
        rotation={[-Math.PI / 6, 0, 0]}
      >
        <planeGeometry args={[ROOM_WIDTH / 2 - SKYLIGHT_WIDTH / 2, ROOM_DEPTH + 2]} />
        <meshStandardMaterial map={ceilingTexture} color={color} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Skylight frame */}
      <group position={[0, WALL_HEIGHT + 0.8, -1]}>
        {/* Skylight opening (bright) */}
        <mesh rotation={[-Math.PI / 6, 0, 0]}>
          <planeGeometry args={[SKYLIGHT_WIDTH, SKYLIGHT_HEIGHT]} />
          <meshBasicMaterial color="#e8f4ff" />
        </mesh>
        
        {/* Skylight frame */}
        <SkylightFrame />
      </group>
      
      {/* Left side ceiling (more horizontal) */}
      <mesh
        position={[-ROOM_WIDTH / 4, CEILING_PEAK - 0.3, 0]}
        rotation={[Math.PI / 12, 0, 0]}
      >
        <planeGeometry args={[ROOM_WIDTH / 2, ROOM_DEPTH + 1]} />
        <meshStandardMaterial map={ceilingTexture} color={color} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function SkylightFrame() {
  const frameColor = "#d4b896";
  
  return (
    <group rotation={[-Math.PI / 6, 0, 0]}>
      {/* Top frame */}
      <mesh position={[0, SKYLIGHT_HEIGHT / 2 + 0.05, 0.02]}>
        <boxGeometry args={[SKYLIGHT_WIDTH + 0.1, 0.1, 0.05]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      
      {/* Bottom frame */}
      <mesh position={[0, -SKYLIGHT_HEIGHT / 2 - 0.05, 0.02]}>
        <boxGeometry args={[SKYLIGHT_WIDTH + 0.1, 0.1, 0.05]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      
      {/* Left frame */}
      <mesh position={[-SKYLIGHT_WIDTH / 2 - 0.05, 0, 0.02]}>
        <boxGeometry args={[0.1, SKYLIGHT_HEIGHT, 0.05]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      
      {/* Right frame */}
      <mesh position={[SKYLIGHT_WIDTH / 2 + 0.05, 0, 0.02]}>
        <boxGeometry args={[0.1, SKYLIGHT_HEIGHT, 0.05]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      
      {/* Center divider */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.06, SKYLIGHT_HEIGHT, 0.05]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
    </group>
  );
}
