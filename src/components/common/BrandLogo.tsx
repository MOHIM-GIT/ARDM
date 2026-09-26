import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'icon' | 'splash';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  light = false,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  const subTextSizes = {
    sm: 'text-[8px] tracking-[0.18em]',
    md: 'text-[9.5px] tracking-[0.2em]',
    lg: 'text-xs tracking-[0.22em]',
    xl: 'text-sm tracking-[0.25em]',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official ARDM Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Outer Thin Circular Arc */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke={light ? '#E2E8F0' : '#0F172A'}
            strokeWidth="1.5"
            strokeDasharray="180 30 50 20"
            opacity={light ? 0.7 : 0.6}
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={light ? '#38BDF8' : '#2563EB'}
            strokeWidth="1"
            strokeDasharray="10 80 40 40"
            opacity={0.5}
          />

          {/* ARDM Stylized Monogram */}
          {/* 'A' with sharp red triangular inner wing */}
          <path
            d="M20 62L32 38L38 50L30 58H38L41 62H20Z"
            fill={light ? '#FFFFFF' : '#0F172A'}
          />
          {/* Red Accent Wing in A */}
          <polygon
            points="28,58 35,48 35,58"
            fill="#E11D48"
          />

          {/* 'R' */}
          <path
            d="M40 38H50C54 38 56 41 56 45C56 48 54 50 51 51L57 62H50L45 52H44V62H40V38ZM44 42V48H49C51 48 52 47 52 45C52 43 51 42 49 42H44Z"
            fill={light ? '#FFFFFF' : '#0F172A'}
          />

          {/* 'D' */}
          <path
            d="M59 38H67C74 38 78 43 78 50C78 57 74 62 67 62H59V38ZM63 42V58H67C71 58 74 55 74 50C74 45 71 42 67 42H63Z"
            fill={light ? '#FFFFFF' : '#0F172A'}
          />

          {/* 'M' */}
          <path
            d="M80 38H84L88 50L92 38H96V62H92V46L89 56H87L84 46V62H80V38Z"
            fill={light ? '#FFFFFF' : '#0F172A'}
          />

          {/* Slogan Dots */}
          <circle cx="34" cy="74" r="1.5" fill="#E11D48" />
          <circle cx="66" cy="74" r="1.5" fill="#E11D48" />
        </svg>
      </div>

      {/* Typography with official brand slogan */}
      {variant !== 'icon' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-black tracking-tight font-sans ${textSizes[size]} ${
                light ? 'text-white' : 'text-slate-950'
              }`}
            >
              ARDM
            </span>
            <span
              className={`font-semibold tracking-wider font-sans ${textSizes[size]} ${
                light ? 'text-cyan-300' : 'text-indigo-600'
              }`}
            >
              ACADEMY
            </span>
          </div>
          <span
            className={`font-bold uppercase ${subTextSizes[size]} mt-1 flex items-center gap-1 ${
              light ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <span>LEARN</span>
            <span className="text-rose-500 font-bold">•</span>
            <span>PRACTICE</span>
            <span className="text-rose-500 font-bold">•</span>
            <span>IMPROVE</span>
          </span>
        </div>
      )}
    </div>
  );
};
