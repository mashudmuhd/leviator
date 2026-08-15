import React from 'react';
import { Color } from 'three';

interface LiquidVolumeProps {
  color: string;
}

export const LiquidVolume: React.FC<LiquidVolumeProps> = ({ color }) => {
  return (
    <mesh position={[0, -0.3, 0]}>
      {/* Cylindrical/rounded liquid shape slightly inset from outer glass */}
      <cylinderGeometry args={[0.92, 0.92, 2.2, 32]} />
      <meshPhysicalMaterial
        color={new Color(color)}
        roughness={0.15}
        transmission={0.65}
        thickness={1.2}
        ior={1.33} // Water/perfume liquid index of refraction
        transparent={true}
        opacity={0.92}
        attenuationColor={new Color(color)}
        attenuationDistance={1.0}
      />
    </mesh>
  );
};
