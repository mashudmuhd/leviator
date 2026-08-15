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
    if (isReducedMotion || !groupRef.current) return;

    // Define scroll timeline steps mapping to 5 HTML sections
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#app-scroll-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate: (self) => {
            // Update active section index based on scroll progress
            const index = Math.min(4, Math.floor(self.progress * 5));
            setActiveSectionIndex(index);
          },
        },
      });

      // Section 0 -> Section 1 (Ingredients Zoom)
      tl.to(groupRef.current.position, {
        x: 1.4,
        y: 0.3,
        z: 1.2,
        duration: 1,
        ease: 'power2.inOut',
      }).to(groupRef.current.rotation, {
        x: 0.25,
        y: -0.8,
        z: 0.1,
        duration: 1,
        ease: 'power2.inOut',
      }, '<');

      // Section 1 -> Section 2 (Notes Shift Left)
      tl.to(groupRef.current.position, {
        x: -1.5,
        y: -0.2,
        z: 0.8,
        duration: 1,
        ease: 'power2.inOut',
      }).to(groupRef.current.rotation, {
        x: -0.2,
        y: 1.2,
        z: -0.15,
        duration: 1,
        ease: 'power2.inOut',
      }, '<');

      // Section 2 -> Section 3 (Craftsmanship Top Cap Close-up)
      tl.to(groupRef.current.position, {
        x: 0,
        y: -1.2,
        z: 2.2,
        duration: 1,
        ease: 'power2.inOut',
      }).to(groupRef.current.rotation, {
        x: 0.6,
        y: 0.5,
        z: 0.1,
        duration: 1,
        ease: 'power2.inOut',
      }, '<');

      // Section 3 -> Section 4 (Buy Section Grand Finale Center)
      tl.to(groupRef.current.position, {
        x: 0,
        y: -0.1,
        z: 0.5,
        duration: 1,
        ease: 'power2.inOut',
      }).to(groupRef.current.rotation, {
        x: 0,
        y: 6.28, // Full 360 degree spin turn
        z: 0,
        duration: 1,
        ease: 'power2.inOut',
      }, '<');
    });

    return () => ctx.revert();
  }, [setActiveSectionIndex, isReducedMotion]);

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
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
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMappingExposure: 1.1,
        }}
        className="canvas-container"
      >
        <Suspense fallback={null}>
          <LightingEnvironment />
          <FloatingParticles count={50} color={activeVariant.accentColor} />
          <AnimatedBottleContainer activeVariant={activeVariant} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.6}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneCanvas;
