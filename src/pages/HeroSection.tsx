import React from 'react';
import { SectionProps } from '../types';
import { Button } from '../components/ui/Button';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { Sparkles, ChevronDown, ArrowRight } from 'lucide-react';

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
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-6 sm:px-12 overflow-hidden"
    >
      {/* Background radial glow matching liquid color */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] opacity-25 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: activeVariant.liquidColor }}
      />

      {/* WebGL Fallback Hero Image if WebGL is unsupported or low-tier device */}
      {isFallbackMode && (
        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-40">
          <img
            src={activeVariant.imageFallback}
            alt={activeVariant.name}
            className="w-full h-full object-cover filter brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]" />
        </div>
      )}

      {/* Main Content Overlay */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        <AnimatedSection preset="fadeUp" className="md:col-span-7 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-brand-gold uppercase border border-brand-gold/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{activeVariant.scentFamily} • {activeVariant.volume}</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-white">
            {activeVariant.name.split(' ')[0]} <br />
            <span className="text-gradient-gold italic font-light">
              {activeVariant.name.split(' ')[1] || 'Essence'}
            </span>
          </h1>

          {/* Tagline & Subtitle */}
          <p className="text-lg sm:text-xl font-serif italic text-neutral-300">
            "{activeVariant.tagline}"
          </p>

          <p className="text-sm sm:text-base text-neutral-400 max-w-lg leading-relaxed">
            {activeVariant.description}
          </p>

          {/* Price & Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                const el = document.getElementById('buy');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Acquire Bottling — ${activeVariant.price}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={scrollToNext}
            >
              Discover Notes
            </Button>
          </div>
        </AnimatedSection>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity z-20" onClick={scrollToNext}>
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 text-brand-gold animate-bounce" />
      </div>
    </section>
  );
};
