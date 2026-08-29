import React from 'react';
import { useBottleVariant } from '../../hooks/useBottleVariant';
import { motion } from 'framer-motion';

export const VariantSelector: React.FC = () => {
  const { activeVariant, variants, setVariantId } = useBottleVariant();

  return (
    <div className="glass-panel p-1 rounded-full inline-flex items-center gap-1 border border-white/15 shadow-2xl bg-black/70 backdrop-blur-2xl relative">
      {variants.map((v) => {
        const isActive = v.id === activeVariant.id;
        const isComingSoon = v.isComingSoon;

        return (
          <button
            key={v.id}
            disabled={isComingSoon}
            onClick={() => !isComingSoon && setVariantId(v.id)}
            type="button"
            className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 flex items-center gap-2 outline-none focus:outline-none focus-visible:outline-none select-none whitespace-nowrap ${isComingSoon
                ? 'opacity-35 cursor-not-allowed text-neutral-500'
                : isActive
                  ? 'text-white font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
              }`}
          >
            {/* Active Gold Sliding Pill Capsule */}
            {isActive && (
              <motion.div
                layoutId="activeVariantPill"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/25 via-brand-gold/30 to-amber-500/25 border border-brand-gold/80 shadow-[0_0_15px_rgba(212,175,55,0.35)] pointer-events-none"
              />
            )}

            {/* Glowing Gemstone Color Indicator Dot */}
            <span
              className={`relative z-10 w-2.5 h-2.5 rounded-full shrink-0 border border-white/40 transition-transform ${isActive ? 'scale-110 shadow-[0_0_10px_currentColor]' : 'opacity-70'
                }`}
              style={{
                backgroundColor: v.liquidColor || '#d4af37',
                color: v.accentColor || '#d4af37',
              }}
            />

            {/* Perfume Variant Name */}
            <span className="relative z-10 text-xs font-serif tracking-wide">
              {v.name}
            </span>

            {/* Coming Soon Badge */}
            {isComingSoon && (
              <span className="relative z-10 text-[9px] text-brand-gold/70 font-mono">
                (Soon)
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default VariantSelector;
