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
      
      {/* Furniture - properly scaled and positioned */}
      <Desk />
      
      {/* Office chairs at desk */}
      <OfficeChair position={[-1.2, 0, -0.8]} rotation={Math.PI * 0.1} />
      <OfficeChair position={[0.4, 0, -0.8]} rotation={-Math.PI * 0.05} />
      
      {/* CRT Monitor on desk */}
      <CrtMonitor position={[-0.8, 0.75, -1.8]} />
      <Keyboard position={[-0.5, 0.75, -1.5]} />
      
      {/* Sofa in corner */}
      <Sofa position={[-1.8, 0, 1.2]} />
      
      {/* Bookshelf on right side */}
      <Bookshelf position={[2.0, 0, -0.5]} />
      
      {/* Door on back wall */}
      <Door position={[1.2, 0, 1.95]} />
      
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
        position: [0, 1.4, 2.5], 
        fov: 60,
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
      <fog attach="fog" args={["#0a0a0a", 3, 12]} />
    </Canvas>
  );
}
