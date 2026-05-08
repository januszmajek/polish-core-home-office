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
      
      {/* Furniture */}
      <Desk />
      
      {/* Office chairs */}
      <OfficeChair position={[-1.5, 0, -1.5]} rotation={Math.PI * 0.1} />
      <OfficeChair position={[0.5, 0, -1.5]} rotation={-Math.PI * 0.05} />
      
      {/* CRT Monitor on desk */}
      <CrtMonitor position={[-1.8, 0.77, -2.5]} />
      <Keyboard position={[-1.5, 0.77, -2.2]} />
      
      {/* Sofa in corner */}
      <Sofa position={[-3, 0, -1]} />
      
      {/* Bookshelf on right side */}
      <Bookshelf position={[3.2, 0, 0]} />
      
      {/* Door */}
      <Door position={[1.5, 0, -2.8]} />
      
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
        position: [0, 1.6, 4], 
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
        background: "#1a1a1a"
      }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <SceneContent />
      </Suspense>
      
      {/* Fog for depth */}
      <fog attach="fog" args={["#1a1a1a", 5, 15]} />
    </Canvas>
  );
}
