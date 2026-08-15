import React, { useState } from 'react';
import { SectionProps } from '../types';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { useCart } from '../hooks/useCart';
import { ShoppingBag, Check, ShieldCheck, Truck, Gift, Lock, Sparkles } from 'lucide-react';
import { PERFUME_VARIANTS } from '../data/perfumeVariants';

export const BuySection: React.FC<SectionProps> = ({
  id,
  activeVariant,
  onVariantChange,
}) => {
  const { addItem } = useCart();
  const [selectedVolume, setSelectedVolume] = useState<'100ml' | '50ml'>('100ml');
  const [isAdded, setIsAdded] = useState(false);

  const priceMultiplier = selectedVolume === '50ml' ? 0.65 : 1;
  const currentPrice = Math.round(activeVariant.price * priceMultiplier);
  const volumeLabel = selectedVolume === '50ml' ? '50ml / 1.7 fl. oz.' : '100ml / 3.4 fl. oz.';

  const handleAddToCart = () => {
    addItem(activeVariant, volumeLabel);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const activeProducts = PERFUME_VARIANTS.filter((v) => !v.isComingSoon);
  const comingSoonProducts = PERFUME_VARIANTS.filter((v) => v.isComingSoon);

  return (
    <section
      id={id}
      className="relative min-h-screen w-full flex items-center justify-center py-24 px-6 sm:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left side blank spacer for 3D bottle canvas overlay */}
        <div className="hidden md:block md:col-span-5" />

        {/* Right Product Buying Card & Selection List */}
        <AnimatedSection preset="scaleUp" className="md:col-span-7 space-y-6">
          <GlassCard className="p-8 sm:p-10 space-y-6 border-brand-gold/30 shadow-2xl relative overflow-hidden">
            {/* Ambient liquid glow tint matching active flavor */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-700"
              style={{ backgroundColor: activeVariant.liquidColor }}
            />

            {/* Header / Active Product Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {activeVariant.scentFamily}
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-1">
                  {activeVariant.name}
                </h2>
                <p className="text-xs text-neutral-400 mt-1 italic">
                  "{activeVariant.tagline}"
                </p>
              </div>

              <div className="sm:text-right">
                <span className="font-serif text-3xl sm:text-5xl font-bold text-gradient-gold">
                  ${currentPrice}
                </span>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
                  Taxes Included
                </p>
              </div>
            </div>

            {/* Available Products Grid with Image Thumbnails */}
            <div>
              <label className="text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-3 block">
                Select Olfactory Flavour
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeProducts.map((variant) => {
                  const isSelected = variant.id === activeVariant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => onVariantChange && onVariantChange(variant)}
                      className={`p-3.5 rounded-2xl text-left border transition-all duration-300 flex items-center gap-3.5 relative overflow-hidden group ${
                        isSelected
                          ? 'border-brand-gold bg-brand-gold/15 text-white shadow-glow-gold scale-[1.02]'
                          : 'border-white/10 glass-pill text-neutral-400 hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      {/* Product Image Thumbnail */}
                      <div className="w-14 h-16 rounded-xl border border-white/20 overflow-hidden relative shrink-0">
                        <img
                          src={variant.imageFallback}
                          alt={variant.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div
                          className="absolute inset-0 opacity-20 pointer-events-none"
                          style={{ backgroundColor: variant.liquidColor }}
                        />
                      </div>

                      <div className="overflow-hidden flex-1">
                        <p className="text-sm font-semibold truncate text-white">
                          {variant.name}
                        </p>
                        <p className="text-[11px] text-neutral-400 truncate">
                          {variant.scentFamily}
                        </p>
                        <span className="text-[10px] text-brand-gold font-mono block mt-0.5">
                          ${variant.price}
                        </span>
                      </div>

                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottle Volume Toggle */}
            <div>
              <label className="text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-3 block">
                Select Flacon Volume
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedVolume('100ml')}
                  className={`flex-1 py-3 px-4 rounded-xl border text-xs font-semibold tracking-wider transition-all ${
                    selectedVolume === '100ml'
                      ? 'border-brand-gold bg-brand-gold/20 text-white shadow-glow-gold'
                      : 'border-white/10 glass-pill text-neutral-400 hover:text-white'
                  }`}
                >
                  100ml Grand Flacon
                </button>
                <button
                  onClick={() => setSelectedVolume('50ml')}
                  className={`flex-1 py-3 px-4 rounded-xl border text-xs font-semibold tracking-wider transition-all ${
                    selectedVolume === '50ml'
                      ? 'border-brand-gold bg-brand-gold/20 text-white shadow-glow-gold'
                      : 'border-white/10 glass-pill text-neutral-400 hover:text-white'
                  }`}
                >
                  50ml Petite Flacon
                </button>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full py-4 text-base"
                onClick={handleAddToCart}
                icon={
                  isAdded ? (
                    <Check className="w-5 h-5 text-black" />
                  ) : (
                    <ShoppingBag className="w-5 h-5 text-black" />
                  )
                }
              >
                {isAdded ? 'Added to Your Fragrance Bag' : `Add ${activeVariant.name} — $${currentPrice}`}
              </Button>
            </div>

            {/* Coming Soon Teaser Bar */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-brand-gold" />
                  More Flavours Coming Soon
                </span>
                <span className="text-[10px] text-brand-gold font-mono uppercase tracking-wider">
                  Vault Reserve
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {comingSoonProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl glass-pill border border-white/5 opacity-60 flex items-center gap-2"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: p.liquidColor }}
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-semibold text-neutral-300 truncate">{p.name}</p>
                      <p className="text-[10px] text-neutral-500 truncate">Coming Soon</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Perks & Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-neutral-400 border-t border-white/10">
              <div className="flex items-center gap-1.5 justify-center text-center flex-col sm:flex-row">
                <Truck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Express Worldwide Shipping</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center text-center flex-col sm:flex-row">
                <Gift className="w-4 h-4 text-brand-gold shrink-0" />
                <span>2 Free Discovery Samples</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center text-center flex-col sm:flex-row">
                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Private Guarantee</span>
              </div>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
};
