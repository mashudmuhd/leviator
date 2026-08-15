import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count?: number;
  color?: string;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 60,
  color = '#d4af37',
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 0.2 + Math.random() * 0.8;
      const speed = 0.005 + Math.random() * 0.015;
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 12;
      const scale = 0.03 + Math.random() * 0.06;
      temp.push({ time, factor, speed, x, y, z, scale });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!meshRef.current) return;
    particles.forEach((particle, i) => {
      particle.time += particle.speed;
      const { time, factor, x, y, z, scale } = particle;
      
      dummy.position.set(
        x + Math.sin(time * factor) * 0.4,
        y + Math.cos(time * factor) * 0.4,
        z + Math.sin(time) * 0.4
      );
      dummy.rotation.set(time, time, time);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={new THREE.Color(color)}
        emissive={new THREE.Color(color)}
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.8}
        transparent={true}
        opacity={0.7}
      />
    </instancedMesh>
  );
};
