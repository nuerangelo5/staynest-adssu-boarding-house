import React from 'react';

interface StayNestLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only';
  lightText?: boolean;
}

export const StayNestLogo: React.FC<StayNestLogoProps> = ({
  className = '',
  showTagline = true,
  size = 'md',
  variant = 'full',
  lightText = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Precision SVG Brand Icon from Slide 1 & 10 */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle outer glow ring */}
          <circle cx="60" cy="60" r="54" stroke="#E5A93C" strokeOpacity="0.25" strokeWidth="1.5" />
          
          {/* Main Pin Shield Outer Ring */}
          <path
            d="M60 12C36.8 12 18 30.8 18 54C18 78 52 104 57.5 108C59 109.1 61 109.1 62.5 108C68 104 102 78 102 54C102 30.8 83.2 12 60 12Z"
            fill="#06281E"
            stroke="#E5A93C"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Golden Roof of the House */}
          <path
            d="M36 50L60 30L84 50"
            stroke="#E5A93C"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* House Chimney / Attic Vent Accent */}
          <path
            d="M72 37V31H78V42"
            stroke="#E5A93C"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* House Body / Walls */}
          <path
            d="M42 49V68C42 70.2 43.8 72 46 72H74C76.2 72 78 70.2 78 68V49"
            stroke="#E5A93C"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* 4-Pane Window in House Center */}
          <rect x="52" y="49" width="16" height="15" rx="2" fill="#E5A93C" />
          <line x1="60" y1="49" x2="60" y2="64" stroke="#06281E" strokeWidth="2" />
          <line x1="52" y1="56.5" x2="68" y2="56.5" stroke="#06281E" strokeWidth="2" />

          {/* Green Agricultural / Valley Field Waves (Agusan Valley) */}
          <path
            d="M40 76C48 73 54 75 64 80C72 84 80 82 82 80"
            stroke="#10B981"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M46 84C52 82 58 84 66 89C70 91 74 90 76 88"
            stroke="#059669"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Magnifying Glass Search Rim (Slide 1 Brand Motif) */}
          <circle
            cx="84"
            cy="78"
            r="16"
            fill="#083327"
            stroke="#E5A93C"
            strokeWidth="4"
          />
          <line
            x1="95"
            y1="89"
            x2="108"
            y2="102"
            stroke="#E5A93C"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col">
          <span
            className={`font-serif tracking-tight font-bold leading-none ${
              lightText ? 'text-white' : 'text-[#0F4A38] dark:text-[#E5A93C]'
            } ${titleSizes[size]}`}
          >
            StayNest
          </span>
          {showTagline && (
            <span
              className={`text-[11px] italic tracking-wide font-medium mt-0.5 whitespace-nowrap ${
                lightText ? 'text-emerald-200/90' : 'text-emerald-800/80 dark:text-emerald-200/70'
              }`}
            >
              A Smarter Way to Find Boarding Houses
            </span>
          )}
        </div>
      )}
    </div>
  );
};
