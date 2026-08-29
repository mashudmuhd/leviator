import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PerfumeVariant } from '../types';
import { PerfumeBottle } from './PerfumeBottle';
import { LightingEnvironment } from './LightingEnvironment';
import { FloatingParticles } from './FloatingParticles';
import { useSceneStore } from '../stores/useSceneStore';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

interface SceneCanvasProps {
  activeVariant: PerfumeVariant;
  scrollProgress?: number;
}

const AnimatedBottleContainer: React.FC<{ activeVariant: PerfumeVariant }> = ({ activeVariant }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const setActiveSectionIndex = useSceneStore((state) => state.setActiveSectionIndex);
  const isReducedMotion = useSceneStore((state) => state.isReducedMotion);

  useEffect(() => {
    if (!groupRef.current) return;

    // Initial desktop vs mobile responsive positioning
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      groupRef.current.position.set(1.5, -0.05, 0.2);
      groupRef.current.scale.set(1.1, 1.1, 1.1);
    } else {
      groupRef.current.position.set(0, -0.15, 0);
      groupRef.current.scale.set(0.9, 0.9, 0.9);
    }

    if (isReducedMotion) return;

    let lastIndex = -1;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#app-scroll-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4, // Instant responsive scrub without lag
          onUpdate: (self) => {
            const index = Math.min(4, Math.floor(self.progress * 5));
            if (index !== lastIndex) {
              lastIndex = index;
              setActiveSectionIndex(index);
            }
          },
        },
      });

      if (isDesktop) {
        // Section 0 (Hero) -> Section 1 (Ingredients: moves to right/zoom)
        tl.to(groupRef.current.position, {
          x: 1.4,
          y: 0.1,
          z: 0.6,
          duration: 1,
          ease: 'power2.out',
        }).to(groupRef.current.rotation, {
          x: 0.05,
          y: -0.3,
          z: 0.02,
          duration: 1,
          ease: 'power2.out',
        }, '<');

        // Section 1 -> Section 2 (Notes: shifts left)
        tl.to(groupRef.current.position, {
          x: -1.4,
          y: -0.05,
          z: 0.5,
          duration: 1,
          ease: 'power2.out',
        }).to(groupRef.current.rotation, {
          x: -0.04,
          y: 0.35,
          z: -0.02,
          duration: 1,
          ease: 'power2.out',
        }, '<');

        // Section 2 -> Section 3 (Craftsmanship: centered cap inspection)
        tl.to(groupRef.current.position, {
          x: 0,
          y: -0.6,
          z: 1.3,
          duration: 1,
          ease: 'power2.out',
        }).to(groupRef.current.rotation, {
          x: 0.18,
          y: 0.15,
          z: 0.02,
          duration: 1,
          ease: 'power2.out',
        }, '<');

        // Section 3 -> Section 4 (Buy / Studio Pose)
        tl.to(groupRef.current.position, {
          x: -1.3,
          y: 0,
          z: 0.3,
          duration: 1,
          ease: 'power2.out',
        }).to(groupRef.current.rotation, {
          x: 0,
          y: 0.45,
          z: 0,
          duration: 1,
          ease: 'power2.out',
        }, '<');
      }
    });

    return () => ctx.revert();
  }, [setActiveSectionIndex, isReducedMotion]);

  return (
    <group ref={groupRef}>
      <Float speed={0.4} rotationIntensity={0.03} floatIntensity={0.05}>
        <PerfumeBottle variant={activeVariant} />
      </Float>
    </group>
  );
};

export const SceneCanvas: React.FC<SceneCanvasProps> = ({ activeVariant }) => {
  const setCanvasLoaded = useSceneStore((state) => state.setCanvasLoaded);

  useEffect(() => {
    setCanvasLoaded(true);
  }, [setCanvasLoaded]);

  return (
    <div className="w-full h-full relative pointer-events-none md:pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMappingExposure: 1.15,
        }}
        className="canvas-container"
      >
        <Suspense fallback={null}>
          <LightingEnvironment />
          <FloatingParticles count={28} color={activeVariant.accentColor} />
          <AnimatedBottleContainer activeVariant={activeVariant} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.8}
            rotateSpeed={0.4}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneCanvas;
