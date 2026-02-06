import { create } from "zustand";

type Color = "red" | "green" | "blue";

interface ProjectState {
  tilemap: Color[][];
  randomizeTilemap: () => void;
}

export const useProjectStore = create<ProjectState>()((set) => ({
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
}));
