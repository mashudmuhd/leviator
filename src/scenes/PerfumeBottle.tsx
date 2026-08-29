import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PerfumeVariant } from '../types';
import { useSceneStore } from '../stores/useSceneStore';

interface PerfumeBottleProps {
  variant: PerfumeVariant;
}

export const PerfumeBottle: React.FC<PerfumeBottleProps> = ({ variant }) => {
  const bottleGroupRef = useRef<THREE.Group>(null!);
  const mousePosition = useSceneStore((state) => state.mousePosition);
  const isReducedMotion = useSceneStore((state) => state.isReducedMotion);
  const targetRotation = useRef({ x: 0, y: 0 });

  // Refined crystal glass flacon geometry
  const latheGeometry = useMemo(() => {
    const profile = [
      new THREE.Vector2(0.0, -0.9),
      new THREE.Vector2(0.38, -0.87),
      new THREE.Vector2(0.46, -0.78),
      new THREE.Vector2(0.48, -0.65),
      new THREE.Vector2(0.48, 0.22),
      new THREE.Vector2(0.46, 0.30),
      new THREE.Vector2(0.32, 0.40),
      new THREE.Vector2(0.16, 0.45),
      new THREE.Vector2(0.15, 0.58),
      new THREE.Vector2(0.17, 0.63),
      new THREE.Vector2(0.18, 0.73),
      new THREE.Vector2(0.26, 0.77),
      new THREE.Vector2(0.26, 0.96),
      new THREE.Vector2(0.18, 1.02),
    ];
    return new THREE.LatheGeometry(profile, 64);
  }, []);

  // Inner liquid geometry for realistic refraction
  const liquidGeometry = useMemo(() => {
    const profile = [
      new THREE.Vector2(0.0, -0.85),
      new THREE.Vector2(0.35, -0.82),
      new THREE.Vector2(0.44, -0.74),
      new THREE.Vector2(0.45, -0.62),
      new THREE.Vector2(0.45, 0.18),
      new THREE.Vector2(0.43, 0.26),
      new THREE.Vector2(0.29, 0.35),
      new THREE.Vector2(0.0, 0.35),
    ];
    return new THREE.LatheGeometry(profile, 48);
  }, []);

  // Crisp, luxury 24K gold embossed label plaque
  const labelTexture = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 600;
    const ctx = c.getContext('2d');
    if (!ctx) return null;

    const cx = c.width / 2;

    // Solid matte black plaque background
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, 0, c.width, c.height);

    // Outer 24K gold border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 12, c.width - 24, c.height - 24);

    // Inner thin accent border
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(20, 20, c.width - 40, c.height - 40);

    // Brand Monogram Diamond
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - 30, 85); ctx.lineTo(cx + 30, 85);
    ctx.lineTo(cx + 45, 120); ctx.lineTo(cx, 175);
    ctx.lineTo(cx - 45, 120); ctx.closePath();
    ctx.stroke();

    // Diamond internal lines
    ctx.beginPath();
    ctx.moveTo(cx - 45, 120); ctx.lineTo(cx + 45, 120);
    ctx.moveTo(cx - 30, 85); ctx.lineTo(cx, 120); ctx.lineTo(cx + 30, 85);
    ctx.moveTo(cx, 120); ctx.lineTo(cx, 175);
    ctx.stroke();

    // LEVIATOR Brand Name
    ctx.fillStyle = '#ffffff';
    ctx.font = "700 48px 'Cinzel', Georgia, serif";
    ctx.textAlign = 'center';
    ctx.fillText('LEVIATOR', cx, 260);

    // Haute Parfumerie Subtitle
    ctx.fillStyle = '#d4af37';
    ctx.font = "600 18px 'Plus Jakarta Sans', sans-serif";
    ctx.letterSpacing = '6px';
    ctx.fillText('HAUTE PARFUMERIE', cx, 305);

    // Divider Line
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 100, 345);
    ctx.lineTo(cx + 100, 345);
    ctx.stroke();

    // Variant Name
    ctx.fillStyle = '#f5e6cb';
    ctx.font = "italic 36px Georgia, serif";
    ctx.fillText(variant.name, cx, 410);

    // Concentration & Volume
    ctx.fillStyle = '#a0a0a8';
    ctx.font = "500 18px monospace";
    ctx.fillText('EXTRAIT DE PARFUM • 100ML', cx, 475);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, [variant]);

  useFrame((_, delta) => {
    if (!bottleGroupRef.current) return;

    if (!isReducedMotion) {
      // Gentle, ultra-slow studio drift
      bottleGroupRef.current.rotation.y += delta * 0.04;

      // Soft mouse tilt parallax
      targetRotation.current.x = THREE.MathUtils.lerp(
        targetRotation.current.x,
        mousePosition.y * 0.2,
        0.04
      );
      targetRotation.current.y = THREE.MathUtils.lerp(
        targetRotation.current.y,
        mousePosition.x * 0.25,
        0.04
      );

      bottleGroupRef.current.rotation.x = targetRotation.current.x;
      bottleGroupRef.current.rotation.z = -targetRotation.current.y * 0.15;
    }
  });

  const goldAccent = new THREE.Color(variant.accentColor || '#d4af37');
  const liquidColor = new THREE.Color(variant.liquidColor || '#e28743');

  return (
    <group ref={bottleGroupRef} position={[0, 0, 0]}>
      {/* Heavyweight Crystal Glass Flacon Body */}
      <mesh geometry={latheGeometry}>
        <meshPhysicalMaterial
          color={new THREE.Color(variant.glassColor || '#0a0a0d')}
          metalness={0.15}
          roughness={variant.roughness || 0.1}
          transmission={variant.transmission || 0.88}
          ior={variant.ior || 1.52}
          thickness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.08}
          reflectivity={0.65}
        />
      </mesh>

      {/* Internal Perfume Liquid Core */}
      <mesh geometry={liquidGeometry}>
        <meshPhysicalMaterial
          color={liquidColor}
          metalness={0.1}
          roughness={0.15}
          transmission={0.82}
          ior={1.45}
          thickness={0.5}
          emissive={liquidColor}
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* Gold Label Plaque */}
      {labelTexture && (
        <mesh position={[0, -0.16, 0.495]} renderOrder={2}>
          <planeGeometry args={[0.65, 0.76]} />
          <meshStandardMaterial
            map={labelTexture}
            transparent={true}
            roughness={0.4}
            metalness={0.2}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* 24K Gold Neck Ring */}
      <mesh position={[0, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.175, 0.016, 16, 36]} />
        <meshStandardMaterial color={goldAccent} metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Black Fluted Aristocratic Cap */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, 0.8 + i * 0.042, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.26, 0.005, 8, 32]} />
          <meshStandardMaterial color="#1a1a1f" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}

      {/* Soft Bottom Shadow Blob */}
      <mesh position={[0, -0.96, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.85, 32]} />
        <meshBasicMaterial color="#000000" opacity={0.6} transparent={true} depthWrite={false} />
      </mesh>
    </group>
  );
};
