import { ISceneLoader, MaterialProps } from './ISceneLoader';
import { PerfumeVariant } from '../types';

export class ThreeSceneLoader implements ISceneLoader {
  async preloadAssets(): Promise<void> {
    // Preload textures or environment maps if necessary
    return Promise.resolve();
  }

  getMaterialProps(variant: PerfumeVariant): MaterialProps {
    return {
      color: variant.glassColor,
      roughness: variant.roughness,
      transmission: variant.transmission,
      ior: variant.ior,
      liquidColor: variant.liquidColor,
    };
  }

  supportsWebGL(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      return false;
    }
  }
}

export const sceneLoader = new ThreeSceneLoader();
