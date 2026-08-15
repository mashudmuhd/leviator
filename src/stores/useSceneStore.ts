import { create } from 'zustand';
import { SceneState } from '../types';

export const useSceneStore = create<SceneState>((set) => ({
  activeVariantId: 'obsidian-amber',
  activeSectionIndex: 0,
  isCanvasLoaded: false,
  isReducedMotion: false,
  mousePosition: { x: 0, y: 0 },

  setMousePosition: (x: number, y: number) => set({ mousePosition: { x, y } }),
  setActiveVariantId: (id: string) => set({ activeVariantId: id }),
  setActiveSectionIndex: (index: number) => set({ activeSectionIndex: index }),
  setCanvasLoaded: (loaded: boolean) => set({ isCanvasLoaded: loaded }),
  setReducedMotion: (reduced: boolean) => set({ isReducedMotion: reduced }),
}));
