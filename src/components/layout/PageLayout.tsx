import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CursorGlow } from '../ui/CursorGlow';
import { CartDrawer } from '../ui/CartDrawer';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-white selection:bg-brand-gold selection:text-black">
      <CursorGlow />
      <Header />
      <CartDrawer />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
};
