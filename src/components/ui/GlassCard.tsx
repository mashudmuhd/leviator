import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverGlow = true,
}) => {
  return (
    <div
      className={`glass-panel rounded-2xl p-6 sm:p-8 transition-all duration-500 relative overflow-hidden group ${
        hoverGlow
          ? 'hover:border-brand-gold/40 hover:shadow-glow-gold hover:-translate-y-1'
          : ''
      } ${className}`}
    >
      {/* Top subtle border highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  );
};
