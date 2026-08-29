import { useState, useEffect } from 'react';
import { sceneLoader } from '../services/ThreeSceneLoader';

export interface WebGLSupportInfo {
  isSupported: boolean;
  isLowEndDevice: boolean;
  prefersReducedMotion: boolean;
}

export function useWebGLSupport(): WebGLSupportInfo {
  const [supportInfo, setSupportInfo] = useState<WebGLSupportInfo>({
    isSupported: true,
    isLowEndDevice: false,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    const isSupported = sceneLoader.supportsWebGL();
    
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = motionQuery.matches;

    // Real low-end detection only if WebGL is completely failing
    setSupportInfo({
      isSupported,
      isLowEndDevice: false,
      prefersReducedMotion,
    });

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setSupportInfo((prev) => ({ ...prev, prefersReducedMotion: e.matches }));
    };

    motionQuery.addEventListener('change', handleMotionChange);
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  return supportInfo;
}
