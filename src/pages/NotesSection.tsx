import React, { useState, useEffect } from 'react';
import { SectionProps, OlfactoryNote } from '../types';
import { NoteBadge } from '../components/ui/NoteBadge';
import { GlassCard } from '../components/ui/GlassCard';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { Sparkles, Layers, Clock, Globe, Info, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const NotesSection: React.FC<SectionProps> = ({ id, activeVariant }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'top' | 'heart' | 'base'>('all');
  
  // Default selected note for interactive inspection
  const [selectedNote, setSelectedNote] = useState<OlfactoryNote>(() => {
    return activeVariant.notes.top[0] || activeVariant.notes.heart[0] || activeVariant.notes.base[0];
  });

  // Update selected note whenever activeVariant changes
  useEffect(() => {
    if (activeVariant.notes.top.length > 0) {
      setSelectedNote(activeVariant.notes.top[0]);
    } else if (activeVariant.notes.heart.length > 0) {
      setSelectedNote(activeVariant.notes.heart[0]);
    } else if (activeVariant.notes.base.length > 0) {
      setSelectedNote(activeVariant.notes.base[0]);
    }
  }, [activeVariant]);

  const categories = [
    { id: 'all', label: 'All Notes' },
    { id: 'top', label: 'Top (0-30m)' },
    { id: 'heart', label: 'Heart (1-6h)' },
    { id: 'base', label: 'Base (24h+)' },
  ];

  const getFilteredNotes = () => {
    const { top, heart, base } = activeVariant.notes;
    if (activeCategory === 'top') return { top, heart: [], base: [] };
    if (activeCategory === 'heart') return { top: [], heart, base: [] };
    if (activeCategory === 'base') return { top: [], heart, base };
    return { top, heart, base };
  };

  const filtered = getFilteredNotes();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'top':
        return {
          text: 'text-amber-400',
          border: 'border-amber-500/40',
          bg: 'bg-amber-500/10',
          label: 'Top / Head Note',
          time: '0 — 30 mins',
        };
      case 'heart':
        return {
          text: 'text-purple-400',
          border: 'border-purple-500/40',
          bg: 'bg-purple-500/10',
          label: 'Heart / Middle Note',
          time: '1 — 6 hours',
        };
      case 'base':
      default:
        return {
          text: 'text-emerald-400',
          border: 'border-emerald-500/40',
          bg: 'bg-emerald-500/10',
          label: 'Base / Foundation Note',
          time: '24+ hours lingering',
        };
    }
  };

  const activeCategoryTheme = selectedNote ? getCategoryColor(selectedNote.category) : getCategoryColor('top');

  return (
    <section
      id={id}
      className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left side spacer for desktop 3D bottle canvas */}
        <div className="hidden md:block md:col-span-5" />

        {/* Right Content - Olfactory Pyramid */}
        <AnimatedSection preset="slideLeft" className="md:col-span-7 space-y-5 sm:space-y-6">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-widest text-brand-gold uppercase border border-brand-gold/20">
            <Layers className="w-3.5 h-3.5" />
            <span>Olfactory Architecture</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            The Sensory <br />
            <span className="text-gradient-gold italic font-light">Pyramid Evolution</span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
            As <span className="text-brand-gold font-semibold">{activeVariant.name}</span> settles onto your skin, volatile botanical molecules unfold across three rhythmic stages over 24 hours.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-brand-gold text-black font-bold shadow-glow-gold'
                    : 'glass-pill text-neutral-300 hover:text-white hover:border-white/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Pyramid Display Cards Accordion */}
          <div className="space-y-3 pt-1">
            {/* Top Accord */}
            {filtered.top.length > 0 && (
              <GlassCard className="space-y-3 p-4 sm:p-5 border-l-4 border-l-amber-500 transition-all duration-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h3 className="font-serif text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300">
                      Head / Top Accord
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-neutral-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>0 — 30 mins</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {filtered.top.map((note) => (
                    <NoteBadge
                      key={note.id}
                      note={note}
                      isSelected={selectedNote?.id === note.id}
                      onSelect={(n) => setSelectedNote(n)}
                    />
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Heart Accord */}
            {filtered.heart.length > 0 && (
              <GlassCard className="space-y-3 p-4 sm:p-5 border-l-4 border-l-purple-500 transition-all duration-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <h3 className="font-serif text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-300">
                      Heart / Soul Accord
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-neutral-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                    <Clock className="w-3 h-3 text-purple-400" />
                    <span>1 — 6 hours</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {filtered.heart.map((note) => (
                    <NoteBadge
                      key={note.id}
                      note={note}
                      isSelected={selectedNote?.id === note.id}
                      onSelect={(n) => setSelectedNote(n)}
                    />
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Base Accord */}
            {filtered.base.length > 0 && (
              <GlassCard className="space-y-3 p-4 sm:p-5 border-l-4 border-l-emerald-500 transition-all duration-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-serif text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-300">
                      Foundation / Base Accord
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-neutral-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>24+ hours lingering</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {filtered.base.map((note) => (
                    <NoteBadge
                      key={note.id}
                      note={note}
                      isSelected={selectedNote?.id === note.id}
                      onSelect={(n) => setSelectedNote(n)}
                    />
                  ))}
                </div>
              </GlassCard>
            )}
          </div>

          {/* Interactive Note Spotlight / Detail Inspector Panel */}
          {selectedNote && (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNote.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <div className={`p-4 sm:p-5 rounded-2xl border ${activeCategoryTheme.border} ${activeCategoryTheme.bg} backdrop-blur-xl relative overflow-hidden`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: selectedNote.color || '#d4af37' }}
                      />
                      <h4 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                        {selectedNote.name}
                      </h4>
                      <span className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${activeCategoryTheme.text} bg-white/5`}>
                        {activeCategoryTheme.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                      <Globe className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span>Origin: <strong className="text-white">{selectedNote.origin}</strong></span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                    {selectedNote.description}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-brand-gold" />
                      Longevity: {activeCategoryTheme.time}
                    </span>
                    <span className="text-neutral-500 italic">
                      Tap any note above to inspect
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};
