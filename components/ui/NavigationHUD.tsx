"use client";

import { useAppStore, InteractionZone, CAMERA_POSITIONS } from "@/lib/store";

const ZONE_LABELS: Record<InteractionZone, string> = {
  overview: "Overview",
  monitor: "Computer",
  "desk-left": "Left Workstation",
  "desk-right": "Right Workstation",
  bookshelf: "Bookshelf",
  sofa: "Sofa Area",
  door: "Exit Door"
};

export function NavigationHUD() {
  const { currentZone, setZone, isTransitioning, togglePortfolio } = useAppStore();

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 pointer-events-none">
      {/* Current location indicator */}
      <div className="absolute top-4 left-4 pointer-events-auto">
        <div 
          className="px-3 py-2 text-xs"
          style={{
            background: "#c0c0c0",
            border: "2px solid",
            borderColor: "#ffffff #404040 #404040 #ffffff",
            fontFamily: '"MS Sans Serif", Tahoma, sans-serif'
          }}
        >
          <div className="text-gray-600 text-xs mb-1">Current Location:</div>
          <div className="font-bold">{ZONE_LABELS[currentZone]}</div>
        </div>
      </div>

      {/* Navigation bar at bottom */}
      <div className="flex justify-center p-4 pointer-events-auto">
        <div 
          className="flex gap-1 p-1"
          style={{
            background: "#c0c0c0",
            border: "2px solid",
            borderColor: "#ffffff #404040 #404040 #ffffff",
            fontFamily: '"MS Sans Serif", Tahoma, sans-serif'
          }}
        >
          {(Object.keys(CAMERA_POSITIONS) as InteractionZone[]).map((zone) => (
            <button
              key={zone}
              onClick={() => setZone(zone)}
              disabled={isTransitioning}
              className="px-3 py-1 text-xs transition-colors"
              style={{
                background: currentZone === zone ? "#000080" : "#c0c0c0",
                color: currentZone === zone ? "white" : "black",
                border: "2px solid",
                borderColor: currentZone === zone 
                  ? "#404040 #ffffff #ffffff #404040" 
                  : "#ffffff #404040 #404040 #ffffff",
                opacity: isTransitioning ? 0.7 : 1,
                cursor: isTransitioning ? "wait" : "pointer"
              }}
            >
              {ZONE_LABELS[zone]}
            </button>
          ))}
        </div>
      </div>

      {/* Hint tooltip */}
      {currentZone === "monitor" && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-auto">
          <button
            onClick={togglePortfolio}
            className="px-4 py-2 animate-pulse"
            style={{
              background: "#ffffcc",
              border: "2px solid",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
              fontSize: "11px",
              boxShadow: "2px 2px 0 rgba(0,0,0,0.3)"
            }}
          >
            Click to open Portfolio
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <div 
          className="px-3 py-2 text-xs max-w-48"
          style={{
            background: "#ffffcc",
            border: "1px solid #808080",
            fontFamily: '"MS Sans Serif", Tahoma, sans-serif'
          }}
        >
          <div className="font-bold mb-1 flex items-center gap-1">
            <span>💡</span> Tip
          </div>
          <p>Click on glowing orbs or use buttons below to navigate. Click the monitor to view portfolio.</p>
        </div>
      </div>
    </div>
  );
}
