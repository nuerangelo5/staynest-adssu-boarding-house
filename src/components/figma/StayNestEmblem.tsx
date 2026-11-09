import React, { useState } from 'react';
import { Home } from 'lucide-react';

export const StayNestEmblem: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}> = ({ size = 'md', className = '', showText = false }) => {
  const [imgError, setImgError] = useState(false);

  const sizeMap = {
    sm: 'w-7 h-7 min-w-[28px]',
    md: 'w-9 h-9 min-w-[36px]',
    lg: 'w-14 h-14 min-w-[56px]',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 min-w-[96px]',
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none shrink-0 ${className}`}>
      {!imgError ? (
        <img
          src="/staynest-logo.png"
          alt="StayNest"
          className={`${sizeMap[size]} object-contain drop-shadow-md rounded-full transition-transform duration-300`}
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#0F3B2C] to-[#06241B] border-2 border-[#E5A93C] shadow-md select-none shrink-0 ${sizeMap[size]}`}
        >
          <div className="absolute inset-1 rounded-full border border-[#E5A93C]/40 pointer-events-none" />
          <Home className="w-1/2 h-1/2 text-[#E5A93C] stroke-[2.2] drop-shadow-xs" />
        </div>
      )}
      {showText && (
        <span className="ml-2.5 font-serif font-bold text-xl text-white tracking-wide">
          StayNest
        </span>
      )}
    </div>
  );
};

