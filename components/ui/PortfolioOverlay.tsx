"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { Windows98Window } from "./Windows98Window";
import { PortfolioContent } from "./PortfolioContent";

export function PortfolioOverlay() {
  const { showPortfolio, closePortfolio } = useAppStore();
  const [windowCenter, setWindowCenter] = useState({ x: 100, y: 60 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowCenter({
        x: Math.max(50, window.innerWidth / 2 - 275),
        y: 60
      });
    }
  }, [showPortfolio]);

  if (!showPortfolio) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Semi-transparent backdrop */}
      <div 
        className="absolute inset-0 pointer-events-auto"
        style={{ background: "rgba(0, 0, 0, 0.3)" }}
        onClick={closePortfolio}
      />
      
      {/* Windows 98 style window */}
      <div className="pointer-events-auto">
        <Windows98Window
          title="Portfolio - Microsoft Internet Explorer"
          onClose={closePortfolio}
          initialPosition={windowCenter}
          width={550}
          height={450}
        >
          <PortfolioContent />
        </Windows98Window>
      </div>
    </div>
  );
}
