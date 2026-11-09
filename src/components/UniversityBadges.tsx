import React from 'react';

interface UniversityBadgesProps {
  compact?: boolean;
  lightText?: boolean;
}

export const UniversityBadges: React.FC<UniversityBadgesProps> = ({
  compact = false,
  lightText = false,
}) => {
  return (
    <div className="flex items-center gap-3">
      {/* ADSSU Emblem */}
      <div
        className={`flex items-center gap-2 p-1.5 rounded-lg border text-left ${
          lightText
            ? 'bg-white/10 border-white/20 text-white'
            : 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200/80'
        }`}
        title="Agusan del Sur State University (ADSSU)"
      >
        <div className="w-7 h-7 rounded-full bg-[#0F4A38] border border-[#E5A93C] flex items-center justify-center text-[10px] font-bold text-[#E5A93C] shadow-sm">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.5l-8-4v6l8 4 8-4v-6l-8 4z" />
          </svg>
        </div>
        {!compact && (
          <div className="text-[10px] leading-tight">
            <span className={`font-semibold block ${lightText ? 'text-white' : 'text-emerald-950 dark:text-emerald-100'}`}>
              ADSSU
            </span>
            <span className={`text-[9px] ${lightText ? 'text-emerald-200/80' : 'text-emerald-700/80 dark:text-emerald-300/60'}`}>
              Bunawan, Agusan del Sur
            </span>
          </div>
        )}
      </div>

      {/* CCIS Department Emblem */}
      <div
        className={`flex items-center gap-2 p-1.5 rounded-lg border text-left ${
          lightText
            ? 'bg-white/10 border-white/20 text-white'
            : 'bg-amber-50 dark:bg-emerald-950/60 border-amber-200 dark:border-emerald-800/40 text-amber-900 dark:text-emerald-200/80'
        }`}
        title="College of Computing and Information Sciences"
      >
        <div className="w-7 h-7 rounded-full bg-amber-800 border border-[#E5A93C] flex items-center justify-center text-[10px] font-bold text-amber-200 shadow-sm">
          <span className="font-mono text-[9px] font-bold">CCIS</span>
        </div>
        {!compact && (
          <div className="text-[10px] leading-tight">
            <span className={`font-semibold block ${lightText ? 'text-white' : 'text-amber-950 dark:text-emerald-100'}`}>
              CCIS Lab
            </span>
            <span className={`text-[9px] ${lightText ? 'text-[#FDE047]/90' : 'text-amber-700/80 dark:text-emerald-300/60'}`}>
              Official Student Venture
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
