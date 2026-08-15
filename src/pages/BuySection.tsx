import React, { useState } from 'react';
import { SectionProps } from '../types';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { useCart } from '../hooks/useCart';
import { ShoppingBag, Check, ShieldCheck, Truck, Gift, Lock, Sparkles, MessageCircle } from 'lucide-react';
import { PERFUME_VARIANTS } from '../data/perfumeVariants';
import { getAssetPath } from '../utils/assets';

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

  const handleDirectWhatsAppOrder = () => {
    const text = `✨ *LEVIATOR HAUTE PARFUMERIE — QUICK ORDER* ✨\n\n🛍️ *Item:* ${activeVariant.name}\n📏 *Volume:* ${volumeLabel}\n💰 *Price:* AED ${currentPrice}\n\nPlease confirm availability and delivery details. Thank you!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const activeProducts = PERFUME_VARIANTS.filter((v) => !v.isComingSoon);
  const comingSoonProducts = PERFUME_VARIANTS.filter((v) => v.isComingSoon);

  return (
    <section
      id={id}
      className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-24 px-4 sm:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
        {/* Left side spacer for desktop 3D bottle canvas */}
        <div className="hidden md:block md:col-span-5" />

        {/* Right Product Buying Card & Selection List */}
        <AnimatedSection preset="scaleUp" className="md:col-span-7 space-y-4 sm:space-y-6">
          <GlassCard className="p-5 sm:p-10 space-y-5 sm:space-y-6 border-brand-gold/30 shadow-2xl relative overflow-hidden">
            {/* Ambient liquid glow tint matching active flavor */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-700"
              style={{ backgroundColor: activeVariant.liquidColor }}
            />

            {/* Header / Active Product Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4">
              <div>
                <span className="text-[11px] sm:text-xs uppercase tracking-widest text-brand-gold font-semibold flex items-center gap-1.5">
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
                  AED {currentPrice}
                </span>
                <p className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest">
                  Taxes Included
                </p>
              </div>
            </div>

            {/* Available Products Grid with Image Thumbnails using getAssetPath */}
            <div>
              <label className="text-[11px] sm:text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2.5 block">
                Select Olfactory Flavour
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {activeProducts.map((variant) => {
                  const isSelected = variant.id === activeVariant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => onVariantChange && onVariantChange(variant)}
                      className={`p-3 sm:p-3.5 rounded-2xl text-left border transition-all duration-300 flex items-center gap-3 relative overflow-hidden group ${
                        isSelected
                          ? 'border-brand-gold bg-brand-gold/15 text-white shadow-glow-gold scale-[1.01]'
                          : 'border-white/10 glass-pill text-neutral-400 hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      {/* Product Image Thumbnail */}
                      <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl border border-white/20 overflow-hidden relative shrink-0">
                        <img
                          src={getAssetPath(variant.imageFallback)}
                          alt={variant.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                        <div
                          className="absolute inset-0 opacity-20 pointer-events-none"
                          style={{ backgroundColor: variant.liquidColor }}
                        />
                      </div>

                      <div className="overflow-hidden flex-1">
                        <p className="text-xs sm:text-sm font-semibold truncate text-white">
                          {variant.name}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-neutral-400 truncate">
                          {variant.scentFamily}
                        </p>
                        <span className="text-[10px] text-brand-gold font-mono block mt-0.5 font-bold">
                          AED {variant.price}
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
              <label className="text-[11px] sm:text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2.5 block">
                Select Flacon Volume
              </label>
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setSelectedVolume('100ml')}
                  className={`flex-1 py-2.5 sm:py-3 px-3 rounded-xl border text-[11px] sm:text-xs font-semibold tracking-wider transition-all ${
                    selectedVolume === '100ml'
                      ? 'border-brand-gold bg-brand-gold/20 text-white shadow-glow-gold'
                      : 'border-white/10 glass-pill text-neutral-400 hover:text-white'
                  }`}
                >
                  100ml Grand
                </button>
                <button
                  onClick={() => setSelectedVolume('50ml')}
                  className={`flex-1 py-2.5 sm:py-3 px-3 rounded-xl border text-[11px] sm:text-xs font-semibold tracking-wider transition-all ${
                    selectedVolume === '50ml'
                      ? 'border-brand-gold bg-brand-gold/20 text-white shadow-glow-gold'
                      : 'border-white/10 glass-pill text-neutral-400 hover:text-white'
                  }`}
                >
                  50ml Petite
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 space-y-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full py-3.5 sm:py-4 text-xs sm:text-base font-bold"
                onClick={handleAddToCart}
                icon={
                  isAdded ? (
                    <Check className="w-4 h-4 text-black" />
                  ) : (
                    <ShoppingBag className="w-4 h-4 text-black" />
                  )
                }
              >
                {isAdded ? 'Added to Fragrance Bag' : `Add ${activeVariant.name} — AED ${currentPrice}`}
              </Button>

              <button
                onClick={handleDirectWhatsAppOrder}
                className="w-full py-3 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Instant Order via WhatsApp</span>
              </button>
            </div>

            {/* Coming Soon Teaser Bar */}
            <div className="pt-3 border-t border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold flex items-center gap-1.5">
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
                    className="p-2.5 rounded-xl glass-pill border border-white/5 opacity-60 flex items-center gap-2"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: p.liquidColor }}
                    />
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-semibold text-neutral-300 truncate">{p.name}</p>
                      <p className="text-[9px] text-neutral-500 truncate">Coming Soon</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Perks & Guarantees */}
            <div className="grid grid-cols-3 gap-1.5 pt-2 text-[10px] sm:text-[11px] text-neutral-400 border-t border-white/10">
              <div className="flex items-center gap-1 justify-center text-center flex-col sm:flex-row">
                <Truck className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>Express Shipping</span>
              </div>
              <div className="flex items-center gap-1 justify-center text-center flex-col sm:flex-row">
                <Gift className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>Free Samples</span>
              </div>
              <div className="flex items-center gap-1 justify-center text-center flex-col sm:flex-row">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>Concierge Guarantee</span>
              </div>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
};
