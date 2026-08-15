import React from 'react';
import { SectionProps } from '../types';
import { GlassCard } from '../components/ui/GlassCard';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { Droplet, Award, Compass, ShieldCheck } from 'lucide-react';

export const IngredientsSection: React.FC<SectionProps> = ({ id, activeVariant }) => {
  return (
    <section
      id={id}
      className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-24 px-4 sm:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Text & Glass Cards */}
        <AnimatedSection preset="slideRight" className="md:col-span-6 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-widest text-brand-gold uppercase border border-brand-gold/20">
            <Droplet className="w-3.5 h-3.5" />
            <span>Raw Extraction & Alchemy</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Sacred Botanical <br />
            <span className="text-gradient-gold italic font-light">& Rare Resins</span>
          </h2>

          <p className="text-xs sm:text-base text-neutral-300 leading-relaxed max-w-md">
            Every drop of <span className="text-brand-gold font-semibold">{activeVariant.name}</span> is formulated with raw botanical extractions harvested across four continents.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
            <GlassCard className="space-y-2 p-4 sm:p-6">
              <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/30">
                <Compass className="w-4 h-4 text-brand-gold" />
              </div>
              <h3 className="font-serif text-sm font-semibold text-white">Origin Traced</h3>
              <p className="text-[11px] sm:text-xs text-neutral-400">
                {activeVariant.craftsmanshipDetails.title}
              </p>
            </GlassCard>

            <GlassCard className="space-y-2 p-4 sm:p-6">
              <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/30">
                <Award className="w-4 h-4 text-brand-gold" />
              </div>
              <h3 className="font-serif text-sm font-semibold text-white">Extrait Concentration</h3>
              <p className="text-[11px] sm:text-xs text-neutral-400">
                {activeVariant.craftsmanshipDetails.concentration}
              </p>
            </GlassCard>

            <GlassCard className="space-y-2 p-4 sm:p-6">
              <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/30">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
              </div>
              <h3 className="font-serif text-sm font-semibold text-white">Maceration Vault</h3>
              <p className="text-[11px] sm:text-xs text-neutral-400">
                Aged {activeVariant.craftsmanshipDetails.macerationTime} in oak vats
              </p>
            </GlassCard>

            <GlassCard className="space-y-2 p-4 sm:p-6">
              <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/30">
                <Droplet className="w-4 h-4 text-brand-gold" />
              </div>
              <h3 className="font-serif text-sm font-semibold text-white">Master Artisans</h3>
              <p className="text-[11px] sm:text-xs text-neutral-400">
                Signed by {activeVariant.craftsmanshipDetails.artisan}
              </p>
            </GlassCard>
          </div>
        </AnimatedSection>

        {/* Right side blank spacer for desktop 3D bottle canvas overlay */}
        <div className="hidden md:block md:col-span-6" />
      </div>
    </section>
  );
};
