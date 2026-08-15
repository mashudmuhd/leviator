import { useEffect } from 'react';
import { useSceneStore } from '../stores/useSceneStore';

export function useParallax(maxTiltDeg: number = 7) {
  const setMousePosition = useSceneStore((state) => state.setMousePosition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coords between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition(x * (maxTiltDeg * (Math.PI / 180)), y * (maxTiltDeg * (Math.PI / 180)));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [maxTiltDeg, setMousePosition]);
}
