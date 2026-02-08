import { create } from "zustand";

type Color = "red" | "green" | "blue";

interface ProjectState {
  tilemap: Color[][];
  offset: { x: number; y: number };
  zoom: number;
  randomizeTilemap: () => void;
  setOffset: (offset: { x: number; y: number }) => void;
  setZoom: (zoom: number) => void;
}

export const useProjectStore = create<ProjectState>()((set) => ({
  offset: { x: 0, y: 0 },
  zoom: 1,
  tilemap: Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () =>
      Math.random() < 0.5 ? "red" : Math.random() < 0.5 ? "green" : "blue",
    ),
  ),
  randomizeTilemap: () =>
    set(() => ({
      tilemap: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () =>
          Math.random() < 0.5 ? "red" : Math.random() < 0.5 ? "green" : "blue",
        ),
      ),
    })),
  setOffset: (offset: { x: number; y: number }) => set(() => ({ offset })),
  setZoom: (zoom: number) => set(() => ({ zoom: Math.max(0.1, zoom) })),
}));
