import { create } from "zustand";
import type { Vector3Tuple } from "three";

export type InteractionZone = 
  | "overview"
  | "monitor"
  | "desk-left"
  | "desk-right"
  | "bookshelf"
  | "sofa"
  | "door";

export interface CameraPosition {
  position: Vector3Tuple;
  target: Vector3Tuple;
  fov?: number;
}

export const CAMERA_POSITIONS: Record<InteractionZone, CameraPosition> = {
  // Standing in doorway looking into the room toward the desk wall (back)
  overview: {
    position: [0, 1.55, 2.8],
    target: [0, 1.2, -1.5],
    fov: 62,
  },
  // Zoomed in very close to monitor screen - fullscreen view
  monitor: {
    position: [-0.7, 0.95, -1.58],
    target: [-0.7, 0.95, -1.85],
    fov: 32,
  },
  // Left side of desk
  "desk-left": {
    position: [-1.8, 1.3, 0.4],
    target: [-1.2, 0.8, -1.8],
    fov: 55,
  },
  // Right side of desk
  "desk-right": {
    position: [1.0, 1.3, 0.4],
    target: [0.4, 0.8, -1.8],
    fov: 55,
  },
  // Bookshelf on the right
  bookshelf: {
    position: [1.8, 1.2, 0.5],
    target: [2.2, 0.9, -0.5],
    fov: 52,
  },
  // Sofa on the left
  sofa: {
    position: [-1.6, 1.1, 1.2],
    target: [-1.8, 0.7, 0.2],
    fov: 55,
  },
  // Exit door area
  door: {
    position: [0.8, 1.3, 1.5],
    target: [1.2, 1.1, 1.9],
    fov: 55,
  },
};

interface AppState {
  currentZone: InteractionZone;
  isTransitioning: boolean;
  showPortfolio: boolean;
  portfolioSection: "about" | "projects" | "experience";
  freeCamera: boolean;

  setZone: (zone: InteractionZone) => void;
  setTransitioning: (value: boolean) => void;
  togglePortfolio: () => void;
  setPortfolioSection: (section: "about" | "projects" | "experience") => void;
  closePortfolio: () => void;
  toggleFreeCamera: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentZone: "overview",
  isTransitioning: false,
  showPortfolio: false,
  portfolioSection: "about",
  freeCamera: false,

  setZone: (zone) => set({ currentZone: zone, isTransitioning: true, freeCamera: false }),
  setTransitioning: (value) => set({ isTransitioning: value }),
  togglePortfolio: () => set((state) => ({ showPortfolio: !state.showPortfolio })),
  setPortfolioSection: (section) => set({ portfolioSection: section }),
  closePortfolio: () => set({ showPortfolio: false }),
  toggleFreeCamera: () => set((state) => ({ freeCamera: !state.freeCamera, isTransitioning: false })),
}));
