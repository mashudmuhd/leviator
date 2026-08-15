import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Sparkles, Hammer, Droplets, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CraftPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-brand-gold uppercase border border-brand-gold/20">
          <Hammer className="w-3.5 h-3.5" />
          <span>Haute Craftsmanship</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white leading-tight">
          The Art of Immortal <br />
          <span className="text-gradient-gold italic font-light">Flacon & Formula</span>
        </h1>

        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          From cold maceration in solid oak casks to hand-faceted optical crystal flacons, every step of LEVIATOR creation honors centuries of French haute parfumerie heritage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/30">
            <Droplets className="w-6 h-6 text-brand-gold" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white">9-Month Oak Maceration</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Raw botanical absolutes are macerated at constant subterranean cellar temperatures inside vintage French oak barrels, permitting complex resinous ester bonding without heat destruction.
          </p>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/30">
            <Sparkles className="w-6 h-6 text-brand-gold" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white">Heavy Crystal Sculpture</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Molded from 650g optical purity crystal with hand-bevelled facets that bend studio lighting into fiery prismatic reflections.
          </p>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/30">
            <Shield className="w-6 h-6 text-brand-gold" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white">Hand-Engraved Serial</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Every bottle is stamped with its unique batch production serial number and master perfumer verification seal prior to hand-wax sealing.
          </p>
        </GlassCard>
      </div>

      <div className="text-center pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-gold hover:underline"
        >
          Return to 3D Experience Home →
        </Link>
      </div>
    </div>
  );
};
