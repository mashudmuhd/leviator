import React from 'react';
import { useBottleVariant } from '../hooks/useBottleVariant';
import { useWebGLSupport } from '../hooks/useWebGLSupport';
import { useParallax } from '../hooks/useParallax';
import { SceneCanvas } from '../scenes/SceneCanvas';
import { HeroSection } from './HeroSection';
import { IngredientsSection } from './IngredientsSection';
import { NotesSection } from './NotesSection';
import { CraftSection } from './CraftSection';
import { BuySection } from './BuySection';
import { SectionProps } from '../types';
import { getAssetPath } from '../utils/assets';

export const HomePage: React.FC = () => {
  const { activeVariant, setVariantId } = useBottleVariant();
  const { isSupported, isLowEndDevice } = useWebGLSupport();

  // Enable subtle mouse tilt parallax
  useParallax(6);

  const sections: Array<{ id: string; Component: React.ComponentType<SectionProps> }> = [
    { id: 'hero', Component: HeroSection },
    { id: 'ingredients', Component: IngredientsSection },
    { id: 'notes', Component: NotesSection },
    { id: 'craft', Component: CraftSection },
    { id: 'buy', Component: BuySection },
  ];

  return (
    <div id="app-scroll-container" className="relative w-full overflow-x-hidden min-h-screen">
      {/* Dynamic Background Glow changing based on active flavor */}
      <div
        className="fixed inset-0 z-0 transition-all duration-1000 ease-in-out pointer-events-none"
        style={{
          background: activeVariant.bgGradient || 'radial-gradient(circle at 50% 40%, rgba(226, 135, 67, 0.22) 0%, rgba(10, 10, 12, 0.95) 75%)',
        }}
      />

      {/* Pinned 3D Scene Background Canvas */}
      {isSupported && !isLowEndDevice ? (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <SceneCanvas activeVariant={activeVariant} />
        </div>
      ) : (
        /* Fallback Static Ambient Overlay with getAssetPath */
        <div className="fixed inset-0 z-0 pointer-events-none opacity-35 transition-all duration-1000">
          <img
            src={getAssetPath(activeVariant.imageFallback)}
            alt={activeVariant.name}
            className="w-full h-full object-cover filter brightness-50 contrast-125 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-transparent to-[#0a0a0c]" />
        </div>
      )}

      {/* Storytelling Sections Container */}
      <div className="relative z-10 space-y-0">
        {sections.map(({ id, Component }) => (
          <Component
            key={id}
            id={id}
            activeVariant={activeVariant}
            onVariantChange={(variant) => setVariantId(variant.id)}
            isFallbackMode={!isSupported || isLowEndDevice}
          />
        ))}
      </div>
    </div>
  );
};
