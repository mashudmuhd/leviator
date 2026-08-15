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

    // Estimate low-end device via hardwareConcurrency or mobile userAgent
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const lowCores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
    const isLowEndDevice = isMobile || lowCores;

    setSupportInfo({
      isSupported,
      isLowEndDevice,
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
