import React, { useState } from 'react';
import { useBottleVariant } from '../hooks/useBottleVariant';
import { useCart } from '../hooks/useCart';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { NoteBadge } from '../components/ui/NoteBadge';
import { SceneCanvas } from '../scenes/SceneCanvas';
import { ShoppingBag, Sparkles, Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductPage: React.FC = () => {
  const { activeVariant, variants, setVariantId } = useBottleVariant();
  const { addItem } = useCart();
  const [volume, setVolume] = useState<'100ml' | '50ml'>('100ml');
  const [isAdded, setIsAdded] = useState(false);

  const priceMultiplier = volume === '50ml' ? 0.65 : 1;
  const currentPrice = Math.round(activeVariant.price * priceMultiplier);
  const volumeLabel = volume === '50ml' ? '50ml / 1.7 fl. oz.' : '100ml / 3.4 fl. oz.';

  const handleAddToCart = () => {
    addItem(activeVariant, volumeLabel);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="pt-28 pb-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-neutral-400">
        <Link to="/" className="hover:text-brand-gold">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white font-semibold">Product Atelier</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left 3D Interactive Bottle Canvas */}
        <div className="lg:col-span-7 h-[500px] sm:h-[600px] glass-panel rounded-3xl relative overflow-hidden border border-white/10 shadow-2xl">
          <SceneCanvas activeVariant={activeVariant} />
          <div className="absolute bottom-6 left-6 glass-pill px-4 py-2 rounded-full text-xs text-neutral-300 pointer-events-none">
            3D Studio View — Drag to inspect flacon
          </div>
        </div>

        {/* Right Product Customizer */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">
              {activeVariant.scentFamily}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mt-1">
              {activeVariant.name}
            </h1>
            <p className="text-sm text-neutral-400 mt-2 italic">
              "{activeVariant.tagline}"
            </p>
          </div>

          <div className="font-serif text-4xl font-bold text-gradient-gold">
            ${currentPrice}
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed">
            {activeVariant.description}
          </p>

          {/* Scent Variant Switcher */}
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-widest text-neutral-300 font-semibold block">
              Olfactory Customization
            </label>
            <div className="grid grid-cols-2 gap-2">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVariantId(v.id)}
                  className={`p-3 rounded-xl text-left border text-xs font-medium transition-all flex items-center gap-2.5 ${
                    v.id === activeVariant.id
                      ? 'border-brand-gold bg-brand-gold/20 text-white shadow-glow-gold'
                      : 'border-white/10 glass-pill text-neutral-400 hover:text-white'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"
                    style={{ backgroundColor: v.liquidColor }}
                  />
                  <span className="truncate">{v.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Volume Selection */}
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-widest text-neutral-300 font-semibold block">
              Flacon Capacity
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setVolume('100ml')}
                className={`flex-1 py-3 rounded-xl border text-xs font-semibold tracking-wider transition-all ${
                  volume === '100ml'
                    ? 'border-brand-gold bg-brand-gold/20 text-white'
                    : 'border-white/10 glass-pill text-neutral-400'
                }`}
              >
                100ml Grand
              </button>
              <button
                onClick={() => setVolume('50ml')}
                className={`flex-1 py-3 rounded-xl border text-xs font-semibold tracking-wider transition-all ${
                  volume === '50ml'
                    ? 'border-brand-gold bg-brand-gold/20 text-white'
                    : 'border-white/10 glass-pill text-neutral-400'
                }`}
              >
                50ml Petite
              </button>
            </div>
          </div>

          {/* Key Notes Badges */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-300 font-semibold block">
              Featured Notes
            </label>
            <div className="flex flex-wrap gap-2">
              {[...activeVariant.notes.top, ...activeVariant.notes.heart].map((n) => (
                <NoteBadge key={n.id} note={n} />
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full py-4"
            onClick={handleAddToCart}
            icon={isAdded ? <Check className="w-5 h-5 text-black" /> : <ShoppingBag className="w-5 h-5 text-black" />}
          >
            {isAdded ? 'Added to Bag' : `Acquire ${activeVariant.name} — $${currentPrice}`}
          </Button>
        </div>
      </div>
    </div>
  );
};
