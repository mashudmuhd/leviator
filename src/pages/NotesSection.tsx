import React, { useState } from 'react';
import { SectionProps } from '../types';
import { NoteBadge } from '../components/ui/NoteBadge';
import { GlassCard } from '../components/ui/GlassCard';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { Sparkles, Layers, Clock } from 'lucide-react';

export const NotesSection: React.FC<SectionProps> = ({ id, activeVariant }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'top' | 'heart' | 'base'>('all');

  const categories = [
    { id: 'all', label: 'Complete Symphony' },
    { id: 'top', label: 'Top Notes (0-30 Min)' },
    { id: 'heart', label: 'Heart Notes (1-6 Hours)' },
    { id: 'base', label: 'Base Notes (24+ Hours)' },
  ];

  const getFilteredNotes = () => {
    const { top, heart, base } = activeVariant.notes;
    if (activeCategory === 'top') return { top, heart: [], base: [] };
    if (activeCategory === 'heart') return { top: [], heart, base: [] };
    if (activeCategory === 'base') return { top: [], heart: [], base };
    return { top, heart, base };
  };

  const filtered = getFilteredNotes();

  return (
    <section
      id={id}
      className="relative min-h-screen w-full flex items-center justify-center py-24 px-6 sm:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left side blank spacer for 3D bottle canvas overlay */}
        <div className="hidden md:block md:col-span-5" />

        {/* Right Content - Olfactory Pyramid */}
        <AnimatedSection preset="slideLeft" className="md:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-brand-gold uppercase border border-brand-gold/20">
            <Layers className="w-3.5 h-3.5" />
            <span>Olfactory Architecture</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            The Sensory <br />
            <span className="text-gradient-gold italic font-light">Pyramid Evolution</span>
          </h2>

          <p className="text-sm text-neutral-300 max-w-lg leading-relaxed">
            As <span className="text-brand-gold font-semibold">{activeVariant.name}</span> settles onto your skin, volatile botanical molecules unfold across three rhythmic stages over 24 hours.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-brand-gold text-black font-semibold shadow-glow-gold'
                    : 'glass-pill text-neutral-400 hover:text-white hover:border-white/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Pyramid Display Cards */}
          <div className="space-y-4 pt-2">
            {(filtered.top.length > 0) && (
              <GlassCard className="space-y-3 border-l-4 border-l-amber-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-300">
                      Head / Top Accord
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>0 — 30 mins</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filtered.top.map((note) => (
                    <NoteBadge key={note.id} note={note} />
                  ))}
                </div>
              </GlassCard>
            )}

            {(filtered.heart.length > 0) && (
              <GlassCard className="space-y-3 border-l-4 border-l-purple-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-purple-300">
                      Heart / Soul Accord
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                    <Clock className="w-3 h-3 text-purple-400" />
                    <span>1 — 6 hours</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filtered.heart.map((note) => (
                    <NoteBadge key={note.id} note={note} />
                  ))}
                </div>
              </GlassCard>
            )}

            {(filtered.base.length > 0) && (
              <GlassCard className="space-y-3 border-l-4 border-l-emerald-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-emerald-300">
                      Foundation / Base Accord
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>24+ hours lingering</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filtered.base.map((note) => (
                    <NoteBadge key={note.id} note={note} />
                  ))}
                </div>
              </GlassCard>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
