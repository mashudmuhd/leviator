import React from 'react';
import { SectionProps } from '../types';
import { Button } from '../components/ui/Button';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { PerfumeBottle3D } from '../scenes/PerfumeBottle3D';
import { Sparkles, ChevronDown, ArrowRight, Rotate3D } from 'lucide-react';
import { getAssetPath } from '../utils/assets';

export const HeroSection: React.FC<SectionProps> = ({
  id,
  activeVariant,
  isFallbackMode = false,
}) => {
  const scrollToNext = () => {
    const el = document.getElementById('ingredients');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id={id}
      className="relative min-h-screen w-full flex flex-col justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-12 overflow-hidden"
    >
      {/* Dynamic Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] rounded-full blur-[100px] sm:blur-[160px] opacity-25 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: activeVariant.liquidColor }}
      />

      {/* WebGL Fallback Hero Image if WebGL is unsupported or low-tier device */}
      {isFallbackMode && (
        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-40">
          <img
            src={getAssetPath(activeVariant.imageFallback)}
            alt={activeVariant.name}
            className="w-full h-full object-cover filter brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]" />
        </div>
      )}

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        {/* Mobile Dedicated 3D Bottle Showcase Card (<768px) */}
        <div className="block md:hidden w-full h-[360px] glass-panel rounded-3xl relative overflow-hidden border border-white/10 shadow-2xl my-2">
          <PerfumeBottle3D activeVariant={activeVariant} />
          <div className="absolute bottom-3 left-3 right-3 glass-pill px-3 py-1.5 rounded-full text-[11px] text-neutral-300 pointer-events-none flex items-center justify-center gap-2">
            <Rotate3D className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
            <span>Drag / Touch to rotate 3D Flacon</span>
          </div>
        </div>

        {/* Text Content */}
        <AnimatedSection preset="fadeUp" className="md:col-span-7 space-y-4 sm:space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-widest text-brand-gold uppercase border border-brand-gold/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{activeVariant.scentFamily} • {activeVariant.volume}</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-white">
            {activeVariant.name.split(' ')[0]} <br />
            <span className="text-gradient-gold italic font-light">
              {activeVariant.name.split(' ').slice(1).join(' ') || 'Essence'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl font-serif italic text-neutral-300">
            "{activeVariant.tagline}"
          </p>

          <p className="text-xs sm:text-base text-neutral-400 max-w-lg leading-relaxed">
            {activeVariant.description}
          </p>

          {/* Actions */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto py-3.5 sm:py-4 text-xs sm:text-base"
              onClick={() => {
                const el = document.getElementById('buy');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Acquire Flacon — AED {activeVariant.price}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto py-3.5 sm:py-4 text-xs sm:text-base"
              onClick={scrollToNext}
            >
              Discover Notes
            </Button>
          </div>
        </AnimatedSection>

        {/* Desktop Spacer for Pinned Background Canvas */}
        <div className="hidden md:block md:col-span-5" />
      </div>

      {/* Scroll Down Indicator */}
      <div
        className="mt-8 sm:absolute sm:bottom-8 left-1/2 sm:-translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity z-20"
        onClick={scrollToNext}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 text-brand-gold animate-bounce" />
      </div>
    </section>
  );
};
