import React from 'react';
import { ArrowRight, Instagram, Twitter, Shield, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { LavishAuraLogo } from '../ui/LavishAuraLogo';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#070709] border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Identity */}
          <div className="md:col-span-5 space-y-6">
            <LavishAuraLogo variant="horizontal" />
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Crafting immortal olfactory identities through rare hand-harvested resins, hand-blown heavy crystal glass, and haute parfumerie alchemy.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-widest text-brand-gold font-semibold mb-3">
                Join the Concierge Private Gazette
              </p>
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your private email..."
                  className="bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold/60 flex-1 glass-panel"
                />
                <Button variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Join
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-serif text-sm tracking-widest text-white uppercase">Collections</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><a href="#buy" className="hover:text-brand-gold transition-colors">Obsidian Amber</a></li>
              <li><a href="#buy" className="hover:text-brand-gold transition-colors">Celestial Rose</a></li>
              <li><a href="#buy" className="hover:text-brand-gold transition-colors">Velvet Oud</a></li>
              <li><a href="#buy" className="hover:text-brand-gold transition-colors">Emerald Vetiver</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="font-serif text-sm tracking-widest text-white uppercase">Maison</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><a href="#ingredients" className="hover:text-brand-gold transition-colors">Raw Ingredients</a></li>
              <li><a href="#craft" className="hover:text-brand-gold transition-colors">Artisanal Craft</a></li>
              <li><a href="#notes" className="hover:text-brand-gold transition-colors">Olfactory Pyramid</a></li>
              <li><a href="#hero" className="hover:text-brand-gold transition-colors">Private Atelier</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-sm tracking-widest text-white uppercase">Atelier Concierge</h4>
            <p className="text-xs text-brand-gold font-mono">concierge@leviator.parfum</p>
            <a
              href="https://wa.me/971544478456"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1.5 transition-colors"
            >
              <span>WhatsApp: +971 54 447 8456</span>
            </a>
            <div className="flex gap-4 text-neutral-400 pt-2">
              <a href="#" className="hover:text-brand-gold transition-colors p-2 glass-pill rounded-full">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-brand-gold transition-colors p-2 glass-pill rounded-full">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-brand-gold transition-colors p-2 glass-pill rounded-full">
                <Shield className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} LEVIATOR Haute Parfumerie. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
            <Link to="/admin" className="hover:text-brand-gold text-neutral-400 font-mono text-[11px] transition-colors flex items-center gap-1">
              <span>🔒 Atelier Console</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
