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
  const { currentZone, setZone, isTransitioning, freeCamera, toggleFreeCamera } = useAppStore();

  return (
    <>
      {/* Fixed full-screen overlay for corner elements */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        {/* Current location indicator - top left */}
        <div className="absolute top-4 left-4 pointer-events-auto">
          <div
            className="px-3 py-2 text-xs"
            style={{
              background: "#c0c0c0",
              border: "2px solid",
              borderColor: "#ffffff #404040 #404040 #ffffff",
              fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
            }}
          >
            <div className="text-gray-600 text-xs mb-1">Current Location:</div>
            <div className="font-bold">{ZONE_LABELS[currentZone]}</div>
          </div>
        </div>

        {/* Instructions - top right */}
        <div className="absolute top-4 right-4 pointer-events-auto">
          <div
            className="px-3 py-2 text-xs"
            style={{
              background: "#ffffcc",
              border: "1px solid #808080",
              fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
              maxWidth: "180px",
            }}
          >
            <div className="font-bold mb-1">Tip</div>
            {freeCamera
              ? <p>Drag to orbit, scroll to zoom, right-click to pan. Click a nav button to exit free look.</p>
              : currentZone === "monitor"
              ? <p>Click the monitor screen to toggle the portfolio display.</p>
              : <p>Click glowing orbs or buttons below to navigate. Go to Computer to view portfolio.</p>
            }
          </div>
        </div>

        {/* Navigation bar - bottom center */}
        <div className="absolute bottom-0 inset-x-0 flex justify-center px-2 pb-3 pt-2 pointer-events-auto">
          <div
            className="flex flex-wrap justify-center gap-1 p-1"
            style={{
              background: "#c0c0c0",
              border: "2px solid",
              borderColor: "#ffffff #404040 #404040 #ffffff",
              fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
            }}
          >
            {(Object.keys(CAMERA_POSITIONS) as InteractionZone[]).map((zone) => (
              <button
                key={zone}
                onClick={() => setZone(zone)}
                disabled={isTransitioning && !freeCamera}
                className="px-2 py-1 text-xs transition-colors whitespace-nowrap"
                style={{
                  background: currentZone === zone && !freeCamera ? "#000080" : "#c0c0c0",
                  color: currentZone === zone && !freeCamera ? "white" : "black",
                  border: "2px solid",
                  borderColor:
                    currentZone === zone && !freeCamera
                      ? "#404040 #ffffff #ffffff #404040"
                      : "#ffffff #404040 #404040 #ffffff",
                  opacity: isTransitioning && !freeCamera ? 0.7 : 1,
                  cursor: isTransitioning && !freeCamera ? "wait" : "pointer",
                }}
              >
                {ZONE_LABELS[zone]}
              </button>
            ))}

            {/* Divider */}
            <div
              style={{
                width: "1px",
                background: "#808080",
                margin: "2px 2px",
              }}
            />

            {/* Free Look toggle */}
            <button
              onClick={toggleFreeCamera}
              className="px-2 py-1 text-xs transition-colors whitespace-nowrap"
              style={{
                background: freeCamera ? "#008000" : "#c0c0c0",
                color: freeCamera ? "white" : "black",
                border: "2px solid",
                borderColor: freeCamera
                  ? "#404040 #ffffff #ffffff #404040"
                  : "#ffffff #404040 #404040 #ffffff",
                cursor: "pointer",
              }}
            >
              {freeCamera ? "Free Look (ON)" : "Free Look"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
