import React from 'react';
import { OlfactoryNote } from '../../types';

interface NoteBadgeProps {
  note: OlfactoryNote;
  isSelected?: boolean;
  onSelect?: (note: OlfactoryNote) => void;
  onHover?: (note: OlfactoryNote | null) => void;
}

export const NoteBadge: React.FC<NoteBadgeProps> = ({
  note,
  isSelected = false,
  onSelect,
  onHover,
}) => {
  const categoryStyles = {
    top: {
      idle: 'border-amber-500/30 text-amber-200 bg-amber-500/10 hover:border-amber-400 hover:bg-amber-500/20',
      active: 'border-amber-400 text-white bg-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.35)] ring-1 ring-amber-400/50',
      dot: 'bg-amber-400',
    },
    heart: {
      idle: 'border-purple-500/30 text-purple-200 bg-purple-500/10 hover:border-purple-400 hover:bg-purple-500/20',
      active: 'border-purple-400 text-white bg-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.35)] ring-1 ring-purple-400/50',
      dot: 'bg-purple-400',
    },
    base: {
      idle: 'border-emerald-500/30 text-emerald-200 bg-emerald-500/10 hover:border-emerald-400 hover:bg-emerald-500/20',
      active: 'border-emerald-400 text-white bg-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400/50',
      dot: 'bg-emerald-400',
    },
  };

  const style = categoryStyles[note.category] || categoryStyles.top;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(note)}
      onMouseEnter={() => onHover?.(note)}
      className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-medium border backdrop-blur-md transition-all duration-200 flex items-center gap-2 cursor-pointer select-none active:scale-95 ${
        isSelected ? style.active : style.idle
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full shrink-0 transition-transform ${style.dot} ${
          isSelected ? 'scale-125' : ''
        }`}
        style={note.color ? { backgroundColor: note.color } : undefined}
      />
      <span className="truncate">{note.name}</span>
    </button>
  );
};
