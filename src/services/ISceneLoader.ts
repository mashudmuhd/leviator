import { PerfumeVariant } from '../types';

export interface MaterialProps {
  color: string;
  roughness: number;
  transmission: number;
  ior: number;
  liquidColor: string;
}

export interface ISceneLoader {
  preloadAssets(): Promise<void>;
  getMaterialProps(variant: PerfumeVariant): MaterialProps;
  supportsWebGL(): boolean;
}
