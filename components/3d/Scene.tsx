"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AtticRoom } from "./AtticRoom";
import { 
  Desk, 
  OfficeChair, 
  CrtMonitor, 
  Sofa, 
  Bookshelf, 
  Door,
  Keyboard 
} from "./Furniture";
import { CameraController } from "./CameraController";
import { InteractionHotspots } from "./InteractionHotspots";

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#d4a84b" wireframe />
    </mesh>
  );
}

function SceneContent() {
  return (
    <>
      {/* Room structure */}
      <AtticRoom />
      
      {/* Long desk runs along the back wall (z = -2) */}
      <Desk />

      {/* Office chairs pulled out from the desk */}
      <OfficeChair position={[-1.1, 0, -1.2]} rotation={Math.PI * 0.05} />
      <OfficeChair position={[0.5, 0, -1.2]} rotation={-Math.PI * 0.04} />

      {/* CRT Monitor sitting on the desk surface */}
      <CrtMonitor position={[-0.7, 0.75, -1.85]} />
      <Keyboard position={[-0.5, 0.75, -1.55]} />

      {/* Sofa against the left wall, front half of room */}
      <Sofa position={[-1.9, 0, 0.8]} />

      {/* Bookshelf against the right wall */}
      <Bookshelf position={[2.1, 0, 0.2]} />

      {/* Door on the front-right area */}
      <Door position={[1.5, 0, 1.85]} />
      
      {/* Camera system */}
      <CameraController />
      
      {/* Clickable hotspots for navigation */}
      <InteractionHotspots />
    </>
  );
}

export function Scene() {
  return (
    <Canvas
      shadows
      camera={{ 
        position: [0, 1.55, 2.8], 
        fov: 62,
        near: 0.1,
        far: 100
      }}
      gl={{ 
        antialias: true,
        alpha: false,
        powerPreference: "high-performance"
      }}
      style={{ 
        width: "100vw", 
        height: "100vh",
        background: "#0a0a0a"
      }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <SceneContent />
      </Suspense>
      
      {/* Fog for depth cues */}
      <fog attach="fog" args={["#1a1208", 6, 14]} />
    </Canvas>
  );
}
