import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LavishAuraLogo } from './LavishAuraLogo';
import { Sparkles } from 'lucide-react';

interface BrandIntroLoaderProps {
  onComplete?: () => void;
  minDuration?: number; // Duration in ms before auto-revealing
}

export const BrandIntroLoader: React.FC<BrandIntroLoaderProps> = ({
  onComplete,
  minDuration = 2200,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress counter simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const diff = Math.random() * 15 + 8;
        return Math.min(prev + diff, 100);
      });
    }, 120);

    // Complete timer
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, minDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="brand-intro-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: 'blur(12px)',
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070709] overflow-hidden select-none pointer-events-auto"
        >
          {/* Ambient Golden Radial Glows */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: [0.8, 1.25, 0.95],
              opacity: [0.3, 0.6, 0.45],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            className="absolute w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-radial from-amber-500/25 via-brand-gold/10 to-transparent blur-[100px] pointer-events-none"
          />

          {/* Luxury Floating Dust Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * 100 - 50 + '%',
                  y: '110%',
                  opacity: 0,
                  scale: Math.random() * 0.6 + 0.4,
                }}
                animate={{
                  y: '-10%',
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: Math.random() * 2.5 + 2.5,
                  repeat: Infinity,
                  delay: Math.random() * 1.5,
                  ease: 'easeOut',
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-amber-300/80 shadow-[0_0_8px_#f5ce76]"
                style={{ left: `${(i * 8.5) % 100}%` }}
              />
            ))}
          </div>

          {/* Central Rotating Logo Container */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            {/* 3D Rotating Golden Emblem */}
            <div className="relative flex items-center justify-center">
              {/* Outer Golden Concentric Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-dashed border-brand-gold/30 pointer-events-none"
              />

              {/* Shimmer Light Aura */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-brand-gold/15 blur-xl pointer-events-none"
              />

              {/* Rotating Logo Emblem */}
              <motion.div
                initial={{ rotateY: -180, scale: 0.4, opacity: 0 }}
                animate={{
                  rotateY: [0, 360, 720],
                  scale: [0.85, 1.05, 1],
                  opacity: 1,
                }}
                transition={{
                  rotateY: {
                    duration: 3.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                  scale: { duration: 1.2, ease: 'easeOut' },
                  opacity: { duration: 0.8 },
                }}
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-brand-gold/60 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4 shadow-[0_0_35px_rgba(212,175,55,0.45)] relative cursor-pointer"
              >
                <LavishAuraLogo variant="emblem" size={72} className="w-full h-full border-0 !bg-transparent !p-0 !shadow-none" />
              </motion.div>
            </div>

            {/* Brand Title & Tagline */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              className="mt-8 text-center space-y-1.5"
            >
              <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-[0.25em] text-gradient-gold uppercase">
                LEVIATOR
              </h1>
              <motion.p
                initial={{ opacity: 0, letterSpacing: '0.2em' }}
                animate={{ opacity: 0.85, letterSpacing: '0.45em' }}
                transition={{ delay: 0.7, duration: 1 }}
                className="text-[10px] sm:text-xs text-amber-200/80 uppercase font-sans font-medium"
              >
                Haute Parfumerie
              </motion.p>
            </motion.div>

            {/* Golden Progress Bar & Loading Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 flex flex-col items-center space-y-3 w-48 sm:w-60"
            >
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 via-brand-gold to-yellow-200 shadow-[0_0_10px_#f5ce76]"
                  style={{ width: `${Math.round(progress)}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
              
              <div className="flex items-center justify-between w-full text-[10px] text-neutral-400 font-mono tracking-widest">
                <span className="flex items-center gap-1 text-brand-gold">
                  <Sparkles className="w-2.5 h-2.5 animate-spin-slow" />
                  INITIATING
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
