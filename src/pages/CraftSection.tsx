import React from 'react';
import { SectionProps } from '../types';
import { GlassCard } from '../components/ui/GlassCard';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { Hammer, Sparkles, Box, ShieldAlert } from 'lucide-react';

export const CraftSection: React.FC<SectionProps> = ({ id }) => {
  return (
    <section
      id={id}
      className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-24 px-4 sm:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Content */}
        <AnimatedSection preset="fadeUp" className="md:col-span-6 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-widest text-brand-gold uppercase border border-brand-gold/20">
            <Hammer className="w-3.5 h-3.5" />
            <span>Master Flacon Artisanal Craft</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Hand-Blown Crystal & <br />
            <span className="text-gradient-gold italic font-light">Heavy Gold Geometry</span>
          </h2>

          <p className="text-xs sm:text-base text-neutral-300 leading-relaxed max-w-md">
            Each LEVIATOR flacon is individually molded from heavyweight optical crystal, finished with hand-polished bevels and an engraved 24k electroplated gold plaque.
          </p>

          <div className="space-y-3 sm:space-y-4 pt-2">
            <GlassCard className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6">
              <div className="p-2.5 sm:p-3 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-serif text-sm sm:text-base font-semibold text-white">Heavyweight Crystal Glass</h3>
                <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 leading-relaxed">
                  Crafted with high-refraction optical purity glass weighing over 650g, offering optimal thermal insulation.
                </p>
              </div>
            </GlassCard>

            <GlassCard className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6">
              <div className="p-2.5 sm:p-3 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold shrink-0">
                <Box className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-serif text-sm sm:text-base font-semibold text-white">Hand-Faceted Magnetic Cap</h3>
                <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 leading-relaxed">
                  Octagonal crystal cap with precision magnetic snap lock mechanism designed for effortless tactile engagement.
                </p>
              </div>
            </GlassCard>

            <GlassCard className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6">
              <div className="p-2.5 sm:p-3 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold shrink-0">
                <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-serif text-sm sm:text-base font-semibold text-white">Numbered Limited Editions</h3>
                <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 leading-relaxed">
                  Only 1,000 bottles manufactured per harvest batch. Individually hand-engraved with serial verification on base.
                </p>
              </div>
            </GlassCard>
          </div>
        </AnimatedSection>

        {/* Right side spacer for desktop 3D bottle canvas */}
        <div className="hidden md:block md:col-span-6" />
      </div>
    </section>
  );
};
