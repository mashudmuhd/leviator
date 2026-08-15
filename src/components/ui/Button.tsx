import React from 'react';
import { MagneticWrapper } from '../animations/MagneticWrapper';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  magnetic = true,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-gold/50';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs tracking-wider uppercase',
    md: 'px-6 py-3 text-sm tracking-widest uppercase',
    lg: 'px-8 py-4 text-base tracking-widest uppercase',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-black font-semibold shadow-glow-gold hover:shadow-glow-gold hover:scale-[1.02] active:scale-[0.98]',
    secondary:
      'bg-white text-black hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98]',
    outline:
      'border border-brand-gold/40 text-brand-gold hover:border-brand-gold hover:bg-brand-gold/10 hover:shadow-glow-gold',
    glass:
      'glass-pill text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-md',
  };

  const buttonElement = (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </span>
      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
    </button>
  );

  if (magnetic) {
    return <MagneticWrapper>{buttonElement}</MagneticWrapper>;
  }

  return buttonElement;
};
