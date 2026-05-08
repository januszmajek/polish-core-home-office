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
  overview: {
    position: [0, 1.6, 4],
    target: [0, 1, 0],
    fov: 60,
  },
  monitor: {
    position: [-1.2, 1.4, 0.5],
    target: [-1.8, 1.2, -1],
    fov: 50,
  },
  "desk-left": {
    position: [-2, 1.6, 1],
    target: [-2.5, 1, -1],
    fov: 55,
  },
  "desk-right": {
    position: [1.5, 1.6, 1],
    target: [2, 1, -1],
    fov: 55,
  },
  bookshelf: {
    position: [2.5, 1.5, 2],
    target: [3.5, 1.2, 0],
    fov: 50,
  },
  sofa: {
    position: [-1, 1.4, 2],
    target: [-2.5, 0.8, -0.5],
    fov: 55,
  },
  door: {
    position: [0, 1.6, 2],
    target: [1, 1.4, -2],
    fov: 55,
  },
};

interface AppState {
  currentZone: InteractionZone;
  isTransitioning: boolean;
  showPortfolio: boolean;
  portfolioSection: "about" | "projects" | "experience";
  
  setZone: (zone: InteractionZone) => void;
  setTransitioning: (value: boolean) => void;
  togglePortfolio: () => void;
  setPortfolioSection: (section: "about" | "projects" | "experience") => void;
  closePortfolio: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentZone: "overview",
  isTransitioning: false,
  showPortfolio: false,
  portfolioSection: "about",
  
  setZone: (zone) => set({ currentZone: zone, isTransitioning: true }),
  setTransitioning: (value) => set({ isTransitioning: value }),
  togglePortfolio: () => set((state) => ({ showPortfolio: !state.showPortfolio })),
  setPortfolioSection: (section) => set({ portfolioSection: section }),
  closePortfolio: () => set({ showPortfolio: false }),
}));
