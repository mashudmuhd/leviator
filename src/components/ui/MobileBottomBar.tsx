import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useBottleVariant } from '../../hooks/useBottleVariant';
import { getAssetPath } from '../../utils/assets';

export const MobileBottomBar: React.FC = () => {
  const { openCart, totalItems, addItem } = useCart();
  const { activeVariant, setVariantId, variants } = useBottleVariant();

  const handleQuickAdd = () => {
    addItem(activeVariant, '100ml / 3.4 fl. oz.');
  };

  const nextVariant = variants.find((v) => !v.isComingSoon && v.id !== activeVariant.id);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 block md:hidden p-3 bg-black/85 backdrop-blur-xl border-t border-white/10 shadow-2xl">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Active Variant Thumbnail & Quick Switch */}
        <div className="flex items-center gap-2">
          {nextVariant && (
            <button
              onClick={() => setVariantId(nextVariant.id)}
              className="p-1 rounded-full glass-pill border border-white/20 flex items-center gap-1.5 text-[10px] text-neutral-300 pr-2"
              title={`Switch to ${nextVariant.name}`}
            >
              <img
                src={getAssetPath(nextVariant.imageFallback)}
                alt={nextVariant.name}
                className="w-6 h-6 rounded-full object-cover border border-white/40 shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="font-semibold text-brand-gold">Switch</span>
            </button>
          )}

          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-white truncate max-w-[110px]">
              {activeVariant.name}
            </span>
            <span className="text-[10px] text-brand-gold font-mono font-semibold">
              AED {activeVariant.price}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            className="p-2.5 rounded-full glass-pill border border-white/20 text-brand-gold relative"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-gold text-black text-[9px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={handleQuickAdd}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-black text-xs font-bold uppercase tracking-wider shadow-glow-gold flex items-center gap-1.5 active:scale-95 transition-transform"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
