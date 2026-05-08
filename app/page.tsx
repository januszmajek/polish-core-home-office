"use client";

import dynamic from "next/dynamic";
import { NavigationHUD } from "@/components/ui/NavigationHUD";

// Dynamically import the 3D scene to avoid SSR issues with Three.js
const Scene = dynamic(
  () => import("@/components/3d/Scene").then((mod) => mod.Scene),
  { 
    ssr: false,
    loading: () => <LoadingScreen />
  }
);

function LoadingScreen() {
  return (
    <div 
      className="w-screen h-screen flex flex-col items-center justify-center"
      style={{
        background: "#008080",
        fontFamily: '"MS Sans Serif", Tahoma, sans-serif'
      }}
    >
      {/* Windows 98 style loading dialog */}
      <div 
        className="p-1"
        style={{
          background: "#c0c0c0",
          border: "2px solid",
          borderColor: "#ffffff #404040 #404040 #ffffff"
        }}
      >
        {/* Title bar */}
        <div 
          className="px-2 py-1 mb-2 text-white text-sm font-bold"
          style={{
            background: "linear-gradient(90deg, #000080, #1084d0)"
          }}
        >
          Loading...
        </div>
        
        {/* Content */}
        <div className="px-4 py-3 bg-[#c0c0c0]">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">🏠</div>
            <div>
              <div className="font-bold mb-1">Polish Core Home Office</div>
              <div className="text-xs text-gray-600">Loading 3D environment...</div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div 
            className="h-4 mb-2"
            style={{
              background: "white",
              border: "2px solid",
              borderColor: "#808080 #ffffff #ffffff #808080"
            }}
          >
            <div 
              className="h-full animate-pulse"
              style={{
                background: "repeating-linear-gradient(90deg, #000080, #000080 8px, #0000a0 8px, #0000a0 16px)",
                width: "70%"
              }}
            />
          </div>
          
          <div className="text-xs text-gray-600">Please wait...</div>
        </div>
      </div>
      
      {/* Retro copyright */}
      <div className="mt-8 text-white text-xs opacity-70">
        Polish Core Home Office circa 2000
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#1a1a1a]">
      {/* 3D Scene */}
      <Scene />
      
      {/* UI Overlays */}
      <NavigationHUD />
      
      {/* Scanline overlay for retro CRT effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)"
        }}
      />
    </main>
  );
}
