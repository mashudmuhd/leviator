import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CursorGlow } from '../ui/CursorGlow';
import { CartDrawer } from '../ui/CartDrawer';
import { MobileBottomBar } from '../ui/MobileBottomBar';
import { BrandIntroLoader } from '../ui/BrandIntroLoader';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-white selection:bg-brand-gold selection:text-black pb-16 md:pb-0">
      <BrandIntroLoader minDuration={2200} />
      <CursorGlow />
      <Header />
      <CartDrawer />
      <main className="relative z-10">{children}</main>
      <MobileBottomBar />
      <Footer />
    </div>
  );
};
