import React from 'react';
import { OlfactoryNote } from '../../types';

interface NoteBadgeProps {
  note: OlfactoryNote;
}

export const NoteBadge: React.FC<NoteBadgeProps> = ({ note }) => {
  const categoryColors = {
    top: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
    heart: 'border-purple-500/30 text-purple-300 bg-purple-500/10',
    base: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
  };

  return (
    <div className="group relative inline-block">
      <div
        className={`px-3.5 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md transition-all duration-300 cursor-help ${
          categoryColors[note.category]
        } hover:scale-105 hover:border-brand-gold/60`}
      >
        <span className="w-1.5 h-1.5 rounded-full inline-block mr-2 bg-current" />
        {note.name}
      </div>

      {/* Tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 p-3 glass-panel rounded-xl text-xs text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-40 shadow-xl border border-white/10">
        <p className="font-semibold text-white mb-1">{note.name}</p>
        <p className="text-[11px] leading-relaxed mb-1.5">{note.description}</p>
        <div className="flex items-center justify-between text-[10px] text-neutral-400 border-t border-white/10 pt-1 mt-1">
          <span>Origin: {note.origin}</span>
          <span className="capitalize text-brand-gold">{note.category} Note</span>
        </div>
      </div>
    </div>
  );
};
