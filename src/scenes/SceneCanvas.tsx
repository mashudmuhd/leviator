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

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#app-scroll-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5, // Buttery soft damping on scroll scrub
          onUpdate: (self) => {
            const index = Math.min(4, Math.floor(self.progress * 5));
            setActiveSectionIndex(index);
          },
        },
      });

      // Section 0 -> Section 1 (Ingredients Gentle Zoom Shift)
      tl.to(groupRef.current.position, {
        x: 1.1,
        y: 0.2,
        z: 0.8,
        duration: 1,
        ease: 'power2.out',
      }).to(groupRef.current.rotation, {
        x: 0.08,
        y: -0.25,
        z: 0.02,
        duration: 1,
        ease: 'power2.out',
      }, '<');

      // Section 1 -> Section 2 (Notes Subtle Left View)
      tl.to(groupRef.current.position, {
        x: -1.2,
        y: -0.1,
        z: 0.6,
        duration: 1,
        ease: 'power2.out',
      }).to(groupRef.current.rotation, {
        x: -0.05,
        y: 0.35,
        z: -0.02,
        duration: 1,
        ease: 'power2.out',
      }, '<');

      // Section 2 -> Section 3 (Craftsmanship Subtle Cap Perspective)
      tl.to(groupRef.current.position, {
        x: 0,
        y: -0.8,
        z: 1.4,
        duration: 1,
        ease: 'power2.out',
      }).to(groupRef.current.rotation, {
        x: 0.2,
        y: 0.15,
        z: 0.02,
        duration: 1,
        ease: 'power2.out',
      }, '<');

      // Section 3 -> Section 4 (Buy Showcase Centered Studio Pose)
      tl.to(groupRef.current.position, {
        x: 0,
        y: -0.05,
        z: 0.4,
        duration: 1,
        ease: 'power2.out',
      }).to(groupRef.current.rotation, {
        x: 0,
        y: 0.4,
        z: 0,
        duration: 1,
        ease: 'power2.out',
      }, '<');
    });

    return () => ctx.revert();
  }, [setActiveSectionIndex, isReducedMotion]);

  return (
    <group ref={groupRef}>
      {/* Silky-smooth subtle floating float effect */}
      <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.08}>
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
          <FloatingParticles count={35} color={activeVariant.accentColor} />
          <AnimatedBottleContainer activeVariant={activeVariant} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.8}
            rotateSpeed={0.5}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneCanvas;
