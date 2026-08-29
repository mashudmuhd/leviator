import React from 'react';

interface LeviatorLogoProps {
  variant?: 'emblem' | 'full' | 'horizontal';
  className?: string;
  size?: number | string;
  glow?: boolean;
}

export const LeviatorLogo: React.FC<LeviatorLogoProps> = ({
  variant = 'emblem',
  className = '',
  size,
  glow = true,
}) => {
  const gradientId = 'leviator-gold-grad';
  const strokeId = 'leviator-gold-stroke';
  const highlightId = 'leviator-gold-highlight';

  const EmblemSVG = ({ width = 48, height = 48 }: { width?: number | string; height?: number | string }) => (
    <svg
      viewBox="100 40 300 270"
      width={width}
      height={height}
      className={`shrink-0 ${glow ? 'drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]' : ''}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Exact Premium 24K Liquid Gold Metallic Gradient */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B8" />
          <stop offset="20%" stopColor="#F5D061" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#B38018" />
          <stop offset="90%" stopColor="#F7DF88" />
          <stop offset="100%" stopColor="#8C5E0D" />
        </linearGradient>

        <linearGradient id={strokeId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C9981E" />
          <stop offset="35%" stopColor="#FFF5C2" />
          <stop offset="65%" stopColor="#E5BA42" />
          <stop offset="100%" stopColor="#8C5E0D" />
        </linearGradient>

        <linearGradient id={highlightId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E5BA42" />
          <stop offset="50%" stopColor="#FFFDF0" />
          <stop offset="100%" stopColor="#C9981E" />
        </linearGradient>
      </defs>

      <g id="logo-emblem">
        {/* ================= LETTER 'L' ================= */}
        {/* Top serif, vertical stem, and bottom serif of L */}
        <path
          d="M 125,75 
             L 190,75 
             L 190,83 
             L 174,83 
             L 174,235 
             L 242,235 
             L 242,224 
             L 252,224 
             L 252,246 
             L 125,246 
             L 125,235 
             L 139,235 
             L 139,83 
             L 125,83 
             Z"
          fill={`url(#${gradientId})`}
          stroke={`url(#${strokeId})`}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* ================= LETTER 'A' ================= */}
        {/* Left diagonal leg of A */}
        <path
          d="M 250,52 
             L 262,70 
             L 205,200 
             L 190,200 
             L 238,82 
             Z"
          fill={`url(#${gradientId})`}
          stroke={`url(#${strokeId})`}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Right diagonal leg of A with bottom serif foot */}
        <path
          d="M 250,52 
             L 260,65 
             L 326,235 
             L 345,235 
             L 347,246 
             L 300,246 
             L 302,235 
             L 314,235 
             L 268,130 
             L 246,75 
             Z"
          fill={`url(#${gradientId})`}
          stroke={`url(#${strokeId})`}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* ================= FACETED DIAMOND OVERLAY ================= */}
        <g stroke={`url(#${strokeId})`} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Diamond Top Table Horizontal Line */}
          <line x1="195" y1="126" x2="305" y2="126" />

          {/* Diamond Girdle Horizontal Line (Widest Points) */}
          <line x1="162" y1="172" x2="338" y2="172" strokeWidth="4" />

          {/* Upper Sloping Edges (Crown) */}
          <line x1="195" y1="126" x2="162" y2="172" />
          <line x1="305" y1="126" x2="338" y2="172" />

          {/* Lower Sloping Edges (Pavilion down to Culet) */}
          <line x1="162" y1="172" x2="250" y2="265" strokeWidth="4" />
          <line x1="338" y1="172" x2="250" y2="265" strokeWidth="4" />

          {/* Top Apex Triangular Facets */}
          <line x1="250" y1="52" x2="195" y2="126" strokeWidth="3.6" />
          <line x1="250" y1="52" x2="305" y2="126" strokeWidth="3.6" />
          <line x1="250" y1="52" x2="250" y2="126" strokeWidth="3" />

          {/* Cross Star / Kite Facets */}
          <line x1="195" y1="126" x2="250" y2="172" strokeWidth="3" />
          <line x1="305" y1="126" x2="250" y2="172" strokeWidth="3" />
          <line x1="228" y1="126" x2="162" y2="172" strokeWidth="2.6" />
          <line x1="272" y1="126" x2="338" y2="172" strokeWidth="2.6" />

          {/* Lower Pavilion Internal Facet Lines */}
          <line x1="250" y1="172" x2="250" y2="265" strokeWidth="3.6" />
          <line x1="162" y1="172" x2="250" y2="225" strokeWidth="2.6" />
          <line x1="338" y1="172" x2="250" y2="225" strokeWidth="2.6" />
          <line x1="205" y1="172" x2="250" y2="265" strokeWidth="3" />
          <line x1="295" y1="172" x2="250" y2="265" strokeWidth="3" />
        </g>

        {/* Diamond Apex & Corner Gemstone Sparkle Accents */}
        <circle cx="250" cy="52" r="2.8" fill={`url(#${highlightId})`} />
        <circle cx="250" cy="265" r="3.2" fill={`url(#${highlightId})`} />
        <circle cx="162" cy="172" r="2.8" fill={`url(#${highlightId})`} />
        <circle cx="338" cy="172" r="2.8" fill={`url(#${highlightId})`} />
      </g>
    </svg>
  );

  if (variant === 'emblem') {
    return (
      <div
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-brand-gold/40 flex items-center justify-center bg-black/70 backdrop-blur-md group-hover:border-brand-gold group-hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transition-all duration-300 p-1.5 shadow-[0_0_15px_rgba(212,175,55,0.25)] ${className}`}
      >
        <EmblemSVG width="100%" height="100%" />
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center justify-center text-center gap-2 ${className}`}>
        <EmblemSVG width={size || 85} height={size || 85} />
        <div className="flex flex-col items-center">
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.24em] text-gradient-gold uppercase">
            LEVIATOR
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.38em] text-brand-gold/85 uppercase font-sans font-medium mt-0.5">
            Haute Parfumerie
          </span>
        </div>
      </div>
    );
  }

  // Horizontal (Emblem + Side Text)
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-brand-gold/40 flex items-center justify-center bg-black/70 backdrop-blur-md group-hover:border-brand-gold transition-colors p-1.5 shadow-glow-gold">
        <EmblemSVG width="100%" height="100%" />
      </div>
      <div className="flex flex-col">
        <span className="font-serif text-base sm:text-lg tracking-[0.2em] font-bold text-gradient-gold uppercase">
          LEVIATOR
        </span>
        <span className="text-[8px] sm:text-[9px] tracking-[0.28em] text-neutral-400 uppercase -mt-0.5 font-medium">
          Haute Parfumerie
        </span>
      </div>
    </div>
  );
};

// Export backward compatibility alias
export const LavishAuraLogo = LeviatorLogo;
