import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PerfumeVariant } from '../types';
import { LiquidVolume } from './LiquidVolume';
import { BottleCap } from './BottleCap';
import { useSceneStore } from '../stores/useSceneStore';

interface PerfumeBottleProps {
  variant: PerfumeVariant;
  scrollProgress?: number;
}

export const PerfumeBottle: React.FC<PerfumeBottleProps> = ({ variant }) => {
  const bottleGroupRef = useRef<THREE.Group>(null!);
  const mousePosition = useSceneStore((state) => state.mousePosition);
  const isReducedMotion = useSceneStore((state) => state.isReducedMotion);

  // Smooth lerp ref for mouse parallax
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!bottleGroupRef.current) return;

    if (!isReducedMotion) {
      // Idle slow continuous rotation on Y axis
      bottleGroupRef.current.rotation.y += delta * 0.25;

      // Subtle mouse parallax tilt lerp
      targetRotation.current.x = THREE.MathUtils.lerp(
        targetRotation.current.x,
        mousePosition.y,
        0.08
      );
      targetRotation.current.y = THREE.MathUtils.lerp(
        targetRotation.current.y,
        mousePosition.x,
        0.08
      );

      bottleGroupRef.current.rotation.x = targetRotation.current.x;
      bottleGroupRef.current.rotation.z = -targetRotation.current.y * 0.5;
    }
  });

  const glassColor = new THREE.Color(variant.glassColor);
  const accentColor = new THREE.Color(variant.accentColor);

  return (
    <group ref={bottleGroupRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
      {/* Outer Glass Bottle Shell */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[2.0, 2.6, 1.4]} />
        <meshPhysicalMaterial
          color={glassColor}
          metalness={0.05}
          roughness={variant.roughness}
          transmission={variant.transmission}
          thickness={1.6}
          ior={variant.ior}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          attenuationColor={glassColor}
          attenuationDistance={1.8}
          transparent={true}
          opacity={0.96}
        />
      </mesh>

      {/* Internal Liquid Volume */}
      <LiquidVolume color={variant.liquidColor} />

      {/* Internal Dip Tube */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 2.5, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          roughness={0.05}
          ior={1.45}
        />
      </mesh>

      {/* Gold Embossed Brand Plaque */}
      <group position={[0, -0.2, 0.71]}>
        <mesh>
          <planeGeometry args={[1.2, 0.6]} />
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.92}
            roughness={0.2}
          />
        </mesh>

        {/* Inner Plaque Border */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.12, 0.52]} />
          <meshStandardMaterial
            color="#0a0a0c"
            metalness={0.5}
            roughness={0.8}
          />
        </mesh>

        {/* Accent Bar */}
        <mesh position={[0, -0.15, 0.02]}>
          <planeGeometry args={[0.8, 0.04]} />
          <meshStandardMaterial
            color={accentColor}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Luxury Bottle Cap & Spray Assembly */}
      <BottleCap capColor={variant.capColor} />
    </group>
  );
};
