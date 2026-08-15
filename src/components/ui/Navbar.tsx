import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { VariantSelector } from './VariantSelector';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const { openCart, totalItems } = useCart();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-full border border-brand-gold/40 flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:border-brand-gold transition-colors">
            <Sparkles className="w-4 h-4 text-brand-gold group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.25em] font-semibold text-gradient-gold uppercase">
              LEVIATOR
            </span>
            <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase -mt-1">
              Haute Parfumerie
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 glass-panel px-6 py-2.5 rounded-full border border-white/10 text-xs tracking-widest uppercase text-neutral-300">
          <button
            onClick={() => scrollToSection('hero')}
            className="hover:text-brand-gold transition-colors"
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection('ingredients')}
            className="hover:text-brand-gold transition-colors"
          >
            Ingredients
          </button>
          <button
            onClick={() => scrollToSection('notes')}
            className="hover:text-brand-gold transition-colors"
          >
            Notes
          </button>
          <button
            onClick={() => scrollToSection('craft')}
            className="hover:text-brand-gold transition-colors"
          >
            Craftsmanship
          </button>
          <button
            onClick={() => scrollToSection('buy')}
            className="hover:text-brand-gold transition-colors"
          >
            Shop
          </button>
        </nav>

        {/* Right Actions: Scent Switcher & Cart Trigger */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <VariantSelector />
          </div>

          <Button
            variant="glass"
            size="sm"
            onClick={openCart}
            aria-label="Open Shopping Bag"
            icon={<ShoppingBag className="w-4 h-4 text-brand-gold" />}
          >
            <span className="hidden sm:inline">Bag</span>
            {totalItems > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-brand-gold text-black font-bold rounded-full">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
