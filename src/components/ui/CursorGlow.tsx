import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CursorGlow: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      animate={{ x: position.x - 200, y: position.y - 200 }}
      transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.2 }}
    >
      <div className="w-[400px] h-[400px] rounded-full bg-radial from-brand-gold/15 via-brand-amber/5 to-transparent blur-3xl opacity-70" />
    </motion.div>
  );
};
