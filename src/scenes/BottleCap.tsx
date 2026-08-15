import React from 'react';
import { Color } from 'three';

interface BottleCapProps {
  capColor: string;
}

export const BottleCap: React.FC<BottleCapProps> = ({ capColor }) => {
  return (
    <group position={[0, 1.9, 0]}>
      {/* Metallic Gold Collar Ring */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.32, 0.35, 0.2, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* Spray Nozzle */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 24]} />
        <meshStandardMaterial
          color="#e2cf85"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Main Luxury Faceted Crystal/Gold Heavy Cap */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.65, 0.55, 0.8, 8]} /> {/* 8-sided octagonal crystal cap */}
        <meshPhysicalMaterial
          color={new Color(capColor)}
          metalness={0.7}
          roughness={0.1}
          transmission={0.4}
          thickness={0.8}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          ior={1.6}
        />
      </mesh>
      
      {/* Inset Gold Crown Ring on Cap */}
      <mesh position={[0, 0.88, 0]}>
        <torusGeometry args={[0.3, 0.05, 16, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.98}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};
