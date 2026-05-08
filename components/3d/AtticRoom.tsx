"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";

// Human-scaled room dimensions (meters)
const ROOM_WIDTH = 5;
const ROOM_DEPTH = 4;
const WALL_HEIGHT = 1.8; // Eye level for sitting
const ROOF_PEAK_HEIGHT = 2.6;
const ROOF_SLOPE = Math.PI / 8; // 22.5 degrees - realistic attic slope

export function AtticRoom() {
  return (
    <group>
      {/* Floor - proper wood material */}
      <Floor />
      
      {/* Walls and roof structure */}
      <RoomGeometry />
      
      {/* Lighting setup */}
      <LightingSetup />
    </group>
  );
}

function Floor() {
  // Create realistic wood floor texture
  const woodTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;

    // Base wood color
    ctx.fillStyle = "#c8a882";
    ctx.fillRect(0, 0, 128, 128);

    // Random plank color variation
    for (let i = 0; i < 128; i += 32) {
      const variation = Math.random() * 20 - 10;
      ctx.fillStyle = `hsl(30, 35%, ${50 + variation}%)`;
      ctx.fillRect(i, 0, 32, 128);

      // Wood grain lines within plank
      ctx.strokeStyle = `rgba(0, 0, 0, ${0.05 + Math.random() * 0.05})`;
      ctx.lineWidth = 0.5;
      for (let j = 0; j < 128; j += 4) {
        ctx.beginPath();
        ctx.moveTo(i, j);
        ctx.lineTo(i + 32, j + Math.random() * 2 - 1);
        ctx.stroke();
      }
    }

    // Plank separations
    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 128; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 128);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 2.5);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    return texture;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
      <meshStandardMaterial
        map={woodTexture}
        color="#c8a882"
        roughness={0.7}
        metalness={0}
      />
    </mesh>
  );
}

function RoomGeometry() {
  const wallColor = useMemo(() => new THREE.Color("#d9b876"), []);
  const ceilingColor = useMemo(() => new THREE.Color("#f0ebe2"), []);

  // Create textured materials for walls
  const wallMaterial = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#d9b876";
    ctx.fillRect(0, 0, 64, 64);

    // Plaster texture - subtle imperfections
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 64;
      const y = Math.random() * 64;
      const size = Math.random() * 2 + 0.5;
      ctx.fillStyle = `rgba(200, 180, 160, ${Math.random() * 0.15})`;
      ctx.fillRect(x, y, size, size);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;

    return new THREE.MeshStandardMaterial({
      map: texture,
      color: wallColor,
      roughness: 0.8,
      metalness: 0,
    });
  }, [wallColor]);

  const ceilingMaterial = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#f0ebe2";
    ctx.fillRect(0, 0, 32, 32);

    // Plaster variation on ceiling
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = `rgba(180, 170, 160, ${Math.random() * 0.1})`;
      ctx.fillRect(
        Math.random() * 32,
        Math.random() * 32,
        Math.random() * 1.5 + 0.5,
        Math.random() * 1.5 + 0.5
      );
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 3);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;

    return new THREE.MeshStandardMaterial({
      map: texture,
      color: ceilingColor,
      roughness: 0.9,
      metalness: 0,
    });
  }, [ceilingColor]);

  return (
    <group>
      {/* Front wall - full height */}
      <mesh position={[0, WALL_HEIGHT / 2, ROOM_DEPTH / 2]} receiveShadow>
        <boxGeometry args={[ROOM_WIDTH, WALL_HEIGHT, 0.15]} />
        <primitive object={wallMaterial.clone()} />
      </mesh>

      {/* Back wall - full height */}
      <mesh position={[0, WALL_HEIGHT / 2, -ROOM_DEPTH / 2]} receiveShadow>
        <boxGeometry args={[ROOM_WIDTH, WALL_HEIGHT, 0.15]} />
        <primitive object={wallMaterial.clone()} />
      </mesh>

      {/* Left wall - extends to roof peak */}
      <mesh
        position={[-ROOM_WIDTH / 2, (WALL_HEIGHT + ROOF_PEAK_HEIGHT) / 2, 0]}
        receiveShadow
      >
        <boxGeometry
          args={[0.15, WALL_HEIGHT + ROOF_PEAK_HEIGHT - WALL_HEIGHT, ROOM_DEPTH]}
        />
        <primitive object={wallMaterial.clone()} />
      </mesh>

      {/* Right wall - extends to roof peak */}
      <mesh
        position={[ROOM_WIDTH / 2, (WALL_HEIGHT + ROOF_PEAK_HEIGHT) / 2, 0]}
        receiveShadow
      >
        <boxGeometry
          args={[0.15, ROOF_PEAK_HEIGHT, ROOM_DEPTH]}
        />
        <primitive object={wallMaterial.clone()} />
      </mesh>

      {/* Left sloped roof */}
      <mesh
        position={[-ROOM_WIDTH / 4, WALL_HEIGHT + (ROOF_PEAK_HEIGHT - WALL_HEIGHT) / 2, 0]}
        rotation={[0, 0, ROOF_SLOPE]}
        receiveShadow
      >
        <boxGeometry
          args={[
            Math.cos(ROOF_SLOPE) * ROOM_WIDTH / 2,
            0.15,
            ROOM_DEPTH
          ]}
        />
        <primitive object={ceilingMaterial.clone()} />
      </mesh>

      {/* Right sloped roof */}
      <mesh
        position={[ROOM_WIDTH / 4, WALL_HEIGHT + (ROOF_PEAK_HEIGHT - WALL_HEIGHT) / 2, 0]}
        rotation={[0, 0, -ROOF_SLOPE]}
        receiveShadow
      >
        <boxGeometry
          args={[
            Math.cos(ROOF_SLOPE) * ROOM_WIDTH / 2,
            0.15,
            ROOM_DEPTH
          ]}
        />
        <primitive object={ceilingMaterial.clone()} />
      </mesh>

      {/* Skylight window - positioned in roof */}
      <SkylightWindow
        position={[0, ROOF_PEAK_HEIGHT - 0.3, -ROOM_DEPTH / 3]}
      />

      {/* Wooden trim/molding at wall-ceiling junction */}
      <Trim position={[0, WALL_HEIGHT, 0]} />

      {/* Structural beam for realism */}
      <Beam position={[0, ROOF_PEAK_HEIGHT - 0.1, 0]} />
    </group>
  );
}

function SkylightWindow({ position }: { position: [number, number, number] }) {
  const frameWidth = 1.2;
  const frameHeight = 0.8;

  return (
    <group position={position} rotation={[-ROOF_SLOPE * 0.5, 0, 0]}>
      {/* Glass pane - bright blue sky */}
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[frameWidth - 0.1, frameHeight - 0.1]} />
        <meshBasicMaterial color="#c4d9f0" />
      </mesh>

      {/* Wooden frame */}
      {/* Top */}
      <mesh position={[0, frameHeight / 2, 0]}>
        <boxGeometry args={[frameWidth, 0.08, 0.12]} />
        <meshStandardMaterial
          color="#a89968"
          roughness={0.6}
          metalness={0}
        />
      </mesh>

      {/* Bottom */}
      <mesh position={[0, -frameHeight / 2, 0]}>
        <boxGeometry args={[frameWidth, 0.08, 0.12]} />
        <meshStandardMaterial
          color="#a89968"
          roughness={0.6}
          metalness={0}
        />
      </mesh>

      {/* Left */}
      <mesh position={[-frameWidth / 2, 0, 0]}>
        <boxGeometry args={[0.08, frameHeight, 0.12]} />
        <meshStandardMaterial
          color="#a89968"
          roughness={0.6}
          metalness={0}
        />
      </mesh>

      {/* Right */}
      <mesh position={[frameWidth / 2, 0, 0]}>
        <boxGeometry args={[0.08, frameHeight, 0.12]} />
        <meshStandardMaterial
          color="#a89968"
          roughness={0.6}
          metalness={0}
        />
      </mesh>

      {/* Center divider */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.05, frameHeight, 0.12]} />
        <meshStandardMaterial
          color="#9d8f5c"
          roughness={0.6}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

function Trim({ position }: { position: [number, number, number] }) {
  // Wooden trim at wall-ceiling junction
  return (
    <group position={position}>
      {/* Front trim */}
      <mesh position={[0, 0, ROOM_DEPTH / 2]}>
        <boxGeometry args={[ROOM_WIDTH, 0.08, 0.05]} />
        <meshStandardMaterial
          color="#a89968"
          roughness={0.6}
          metalness={0}
        />
      </mesh>

      {/* Back trim */}
      <mesh position={[0, 0, -ROOM_DEPTH / 2]}>
        <boxGeometry args={[ROOM_WIDTH, 0.08, 0.05]} />
        <meshStandardMaterial
          color="#a89968"
          roughness={0.6}
          metalness={0}
        />
      </mesh>

      {/* Side trims */}
      <mesh position={[ROOM_WIDTH / 2, 0, 0]}>
        <boxGeometry args={[0.05, 0.08, ROOM_DEPTH]} />
        <meshStandardMaterial
          color="#a89968"
          roughness={0.6}
          metalness={0}
        />
      </mesh>

      <mesh position={[-ROOM_WIDTH / 2, 0, 0]}>
        <boxGeometry args={[0.05, 0.08, ROOM_DEPTH]} />
        <meshStandardMaterial
          color="#a89968"
          roughness={0.6}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

function Beam({ position }: { position: [number, number, number] }) {
  // Central support beam for realistic attic
  return (
    <mesh position={position}>
      <boxGeometry args={[0.1, 0.15, ROOM_DEPTH - 0.3]} />
      <meshStandardMaterial
        color="#8b7355"
        roughness={0.7}
        metalness={0}
      />
    </mesh>
  );
}

function LightingSetup() {
  return (
    <group>
      {/* Main directional light from skylight - warm quality */}
      <directionalLight
        position={[1, 3, -1]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        color="#fef4e6"
      />

      {/* Soft fill light for global illumination */}
      <ambientLight intensity={0.5} color="#f0e6d2" />

      {/* Warm bounce light from floor */}
      <pointLight
        position={[0, 0.8, 0]}
        intensity={0.6}
        color="#f5ddb8"
        distance={8}
      />

      {/* Overhead warm accent light */}
      <pointLight
        position={[0, 2.2, -0.5]}
        intensity={0.4}
        color="#fff5e6"
        distance={5}
      />

      {/* Rim light for silhouettes */}
      <directionalLight
        position={[-3, 1.5, 2]}
        intensity={0.3}
        color="#e6c9a8"
      />
    </group>
  );
}
