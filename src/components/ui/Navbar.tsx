import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { VariantSelector } from './VariantSelector';
import { Button } from './Button';
import { useBottleVariant } from '../../hooks/useBottleVariant';
import { LavishAuraLogo } from './LavishAuraLogo';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { openCart, totalItems } = useCart();
  const { activeVariant, variants, setVariantId } = useBottleVariant();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 sm:py-4 transition-all duration-300 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#hero" className="cursor-pointer group block" aria-label="LEVIATOR Home">
            <LavishAuraLogo variant="emblem" />
          </a>

          {/* Desktop Nav Links */}
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

          {/* Right Actions: Scent Switcher, Bag & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
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

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full glass-pill border border-white/10 text-neutral-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0a0a0c]/98 backdrop-blur-xl pt-24 px-6 pb-12 flex flex-col justify-between md:hidden overflow-y-auto"
          >
            {/* Mobile Scent Switcher Bar */}
            <div className="space-y-3 pb-6 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold block">
                Active Flavour
              </span>
              <div className="grid grid-cols-2 gap-2">
                {variants.map((v) => {
                  const isSelected = v.id === activeVariant.id;
                  const isComingSoon = v.isComingSoon;

                  return (
                    <button
                      key={v.id}
                      disabled={isComingSoon}
                      onClick={() => {
                        if (!isComingSoon) {
                          setVariantId(v.id);
                          setMobileMenuOpen(false);
                        }
                      }}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        isComingSoon
                          ? 'opacity-40 border-white/5'
                          : isSelected
                          ? 'border-brand-gold bg-brand-gold/20 text-white shadow-glow-gold'
                          : 'border-white/10 glass-pill text-neutral-400'
                      }`}
                    >
                      <img
                        src={v.imageFallback}
                        alt={v.name}
                        className="w-5 h-5 rounded-full object-cover border border-white/40 shrink-0"
                      />
                      <div className="overflow-hidden">
                        <span className="text-xs font-semibold block text-white truncate">{v.name}</span>
                        {isComingSoon && <span className="text-[9px] text-brand-gold block">Coming Soon</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Nav Links List */}
            <div className="space-y-4 py-6">
              {[
                { id: 'hero', label: 'Overview' },
                { id: 'ingredients', label: 'Raw Ingredients' },
                { id: 'notes', label: 'Olfactory Pyramid' },
                { id: 'craft', label: 'Artisanal Craft' },
                { id: 'buy', label: 'Shop Flacons' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="w-full text-left font-serif text-2xl font-semibold text-neutral-200 hover:text-brand-gold flex items-center justify-between py-2 border-b border-white/5"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-5 h-5 text-brand-gold/60" />
                </button>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 space-y-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full py-3.5"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                icon={<ShoppingBag className="w-4 h-4 text-black" />}
              >
                View Fragrance Bag ({totalItems})
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
