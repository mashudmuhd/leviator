import React from 'react';

export const LightingEnvironment: React.FC = () => {
  return (
    <group>
      {/* Soft Ambient Base */}
      <ambientLight intensity={0.6} color="#ffffff" />

      {/* Main Warm Key Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.2}
        color="#fff4e0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Cool Fill Light for Glass Contrast */}
      <directionalLight
        position={[-5, 3, -5]}
        intensity={1.2}
        color="#80d4ff"
      />

      {/* Golden Backlight/Rim Light for Edge Highlight */}
      <directionalLight
        position={[0, -4, -6]}
        intensity={2.5}
        color="#f3e5ab"
      />

      {/* Point Light inside bottle area for liquid shimmer */}
      <pointLight position={[0, 0, 2]} intensity={1.8} color="#ffd700" distance={6} />
    </group>
  );
};
