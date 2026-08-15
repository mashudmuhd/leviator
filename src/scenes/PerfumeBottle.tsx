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

  // Lathe profile traced from reference photo (cap -> collar -> neck -> shoulder -> body -> base)
  const latheGeometry = useMemo(() => {
    const profile = [
      new THREE.Vector2(0.0, -0.9),
      new THREE.Vector2(0.4229, -0.8662),
      new THREE.Vector2(0.511, -0.7875),
      new THREE.Vector2(0.5228, -0.675),
      new THREE.Vector2(0.5169, 0.225),
      new THREE.Vector2(0.511, 0.2925),
      new THREE.Vector2(0.3289, 0.3937),
      new THREE.Vector2(0.1703, 0.45),
      new THREE.Vector2(0.1527, 0.5737),
      new THREE.Vector2(0.1762, 0.63),
      new THREE.Vector2(0.188, 0.7312),
      new THREE.Vector2(0.2878, 0.765),
      new THREE.Vector2(0.2878, 0.9563),
      new THREE.Vector2(0.1938, 1.0237),
    ];
    return new THREE.LatheGeometry(profile, 96);
  }, []);

  // Dynamic canvas-generated crisp label texture
  const labelTexture = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 430;
    c.height = 500;
    const ctx = c.getContext('2d');
    if (!ctx) return null;

    const cx = c.width / 2;

    // Solid black plaque with thin border
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, c.width - 12, c.height - 12);

    // Monogram square outline
    ctx.strokeStyle = '#e9e2d3';
    ctx.lineWidth = 1.6;
    ctx.strokeRect(cx - 95, 60, 190, 190);

    // Diamond icon
    ctx.save();
    ctx.translate(cx, 155);
    ctx.strokeStyle = '#e9e2d3';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-24, 0); ctx.lineTo(24, 0);
    ctx.moveTo(-24, 0); ctx.lineTo(-12, 24); ctx.lineTo(0, 0);
    ctx.moveTo(0, 0); ctx.lineTo(12, 24); ctx.lineTo(24, 0);
    ctx.moveTo(-12, 24); ctx.lineTo(0, 40); ctx.lineTo(12, 24);
    ctx.stroke();
    ctx.restore();

    // "LA" monogram letters
    ctx.fillStyle = '#f3ede0';
    ctx.font = "600 62px Georgia, 'Times New Roman', serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('LA', cx, 235);

    // Main brand name - Leviatur
    ctx.fillStyle = '#ffffff';
    ctx.font = "700 46px Georgia, 'Times New Roman', serif";
    ctx.fillText('Leviatur', cx, 320);

    // Subtitle script - Rose La vie or Signature
    ctx.fillStyle = variant.accentColor || '#e7ddc8';
    ctx.font = "italic 30px 'Brush Script MT', cursive, serif";
    const subtext = variant.id === 'rose-lavie' ? 'Rose La vie' : 'Signature';
    ctx.fillText(subtext, cx, 385);

    // EAU DE PARFUM
    ctx.fillStyle = '#cfc6b4';
    ctx.font = '400 19px Georgia, serif';
    const label = 'EAU DE PARFUM';
    let totalW = 0;
    const spacing = 6;
    for (const ch of label) totalW += ctx.measureText(ch).width + spacing;
    let sx = cx - totalW / 2;
    for (const ch of label) {
      const w = ctx.measureText(ch).width;
      ctx.fillText(ch, sx + w / 2, 460);
      sx += w + spacing;
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, [variant]);

  // Marble podium texture
  const marbleTexture = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext('2d');
    if (!ctx) return null;
    ctx.fillStyle = '#0c0c0d';
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = 'rgba(212,175,110,0.35)';
    for (let i = 0; i < 14; i++) {
      ctx.beginPath();
      let x = Math.random() * 256, y = Math.random() * 256;
      ctx.moveTo(x, y);
      for (let j = 0; j < 5; j++) {
        x += (Math.random() - 0.5) * 90;
        y += (Math.random() - 0.5) * 90;
        ctx.lineTo(x, y);
      }
      ctx.lineWidth = Math.random() * 1.2 + 0.3;
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  useFrame((_, delta) => {
    if (!bottleGroupRef.current) return;

    if (!isReducedMotion) {
      // Idle slow continuous rotation on Y axis
      bottleGroupRef.current.rotation.y += delta * 0.25;

      // Subtle mouse parallax tilt
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

  const accentColor = new THREE.Color(variant.accentColor || '#d4af37');

  return (
    <group ref={bottleGroupRef} position={[0, 0, 0]}>
      {/* Main Lathe Bottle Body */}
      <mesh geometry={latheGeometry}>
        <meshPhysicalMaterial
          color={new THREE.Color(variant.glassColor || '#070707')}
          metalness={0.2}
          roughness={variant.roughness || 0.32}
          clearcoat={1}
          clearcoatRoughness={0.2}
          reflectivity={0.55}
        />
      </mesh>

      {/* Label Plaque */}
      {labelTexture && (
        <mesh position={[0, -0.18, 0.535]} renderOrder={2}>
          <planeGeometry args={[0.73, 0.85]} />
          <meshStandardMaterial
            map={labelTexture}
            transparent={true}
            roughness={0.5}
            metalness={0.05}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Gold Collar Trim Ring */}
      <mesh position={[0, 0.665, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.185, 0.018, 12, 32]} />
        <meshStandardMaterial color={accentColor} metalness={1} roughness={0.25} />
      </mesh>

      {/* Cap Grooves */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, 0.8 + i * 0.045, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.285, 0.004, 6, 28]} />
          <meshStandardMaterial color="#0d0d0d" metalness={0.55} roughness={0.4} />
        </mesh>
      ))}

      {/* Marble Podium Base */}
      <group position={[0, -1.1, 0]}>
        <mesh>
          <cylinderGeometry args={[1.25, 1.4, 0.4, 48]} />
          <meshStandardMaterial
            map={marbleTexture || undefined}
            color="#1a1714"
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>

        {/* Podium Gold Ring */}
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.25, 0.02, 10, 60]} />
          <meshStandardMaterial color={accentColor} metalness={1} roughness={0.25} />
        </mesh>
      </group>

      {/* Backdrop Gold Ring */}
      <mesh position={[-0.75, 0.25, -2]}>
        <torusGeometry args={[1.7, 0.025, 12, 80]} />
        <meshStandardMaterial color={accentColor} metalness={1} roughness={0.25} />
      </mesh>

      {/* Gem Prop */}
      <mesh position={[-1.5, -0.95, 1.05]} rotation={[0.3, 0.6, 0]}>
        <octahedronGeometry args={[0.18, 0]} />
        <meshPhysicalMaterial
          color={accentColor}
          metalness={0}
          roughness={0.05}
          transmission={0.6}
          thickness={0.5}
          clearcoat={1}
        />
      </mesh>

      {/* Gold Sphere Prop */}
      <mesh position={[1.35, -0.95, 0.85]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color={accentColor} metalness={1} roughness={0.25} />
      </mesh>
    </group>
  );
};
