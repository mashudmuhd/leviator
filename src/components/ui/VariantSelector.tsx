import React from 'react';
import { useBottleVariant } from '../../hooks/useBottleVariant';
import { getAssetPath } from '../../utils/assets';

export const VariantSelector: React.FC = () => {
  const { activeVariant, variants, setVariantId } = useBottleVariant();

  return (
    <div className="glass-panel p-1.5 rounded-full inline-flex items-center gap-1.5 border border-white/10 shadow-2xl">
      {variants.map((v) => {
        const isActive = v.id === activeVariant.id;
        const isComingSoon = v.isComingSoon;

        return (
          <button
            key={v.id}
            disabled={isComingSoon}
            onClick={() => !isComingSoon && setVariantId(v.id)}
            className={`relative px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2 ${
              isComingSoon
                ? 'opacity-40 cursor-not-allowed text-neutral-500'
                : isActive
                ? 'bg-white/20 text-white shadow-inner border border-white/30 scale-105'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {v.imageFallback ? (
              <img
                src={getAssetPath(v.imageFallback)}
                alt={v.name}
                className="w-4 h-4 rounded-full object-cover border border-white/40 shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span
                className="w-3 h-3 rounded-full border border-white/40 shrink-0"
                style={{ backgroundColor: v.liquidColor }}
              />
            )}
            <span className="hidden sm:inline">{v.name}</span>
            {isComingSoon && <span className="text-[9px] text-brand-gold">(Soon)</span>}
            {isActive && !isComingSoon && (
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
};
