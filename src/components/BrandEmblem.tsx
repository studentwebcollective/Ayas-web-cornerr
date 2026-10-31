import React from 'react';

interface BrandEmblemProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
}

export const BrandEmblem: React.FC<BrandEmblemProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    hero: 'w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96'
  };

  return (
    <div
      className={`relative rounded-3xl bg-[#FAF7F2] p-6 flex flex-col items-center justify-center text-center select-none shadow-[0_4px_24px_rgba(232,156,174,0.12)] border border-[#F0E4DE] ${sizeMap[size]} ${className}`}
      aria-label="Aya's Web Corner - Rotterdam Logo"
    >
      {/* Subtle organic circle accent */}
      <div className="absolute inset-3 rounded-full border border-[#F3DFE5]/60 pointer-events-none" />

      {/* Main Serif Wordmark */}
      <div className="font-serif-brand text-[#E28FA1] font-semibold leading-[0.95] tracking-wide mb-3">
        <span className="block text-[1.4em]">AYA'S</span>
        <span className="block text-[1.4em]">WEB</span>
        <span className="block text-[1.4em]">CORNER</span>
      </div>

      {/* Illustration Area: Pastel Pink Laptop & Mouse */}
      <div className="flex items-center justify-center gap-3 w-full px-4 my-2">
        {/* Laptop Illustration */}
        <svg
          viewBox="0 0 100 80"
          className="w-16 h-13 text-[#E28FA1] drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Screen frame */}
          <rect
            x="14"
            y="8"
            width="72"
            height="46"
            rx="4"
            fill="#FFF9FA"
            stroke="#E28FA1"
            strokeWidth="2.5"
          />
          {/* Inner screen */}
          <rect
            x="19"
            y="13"
            width="62"
            height="36"
            rx="2"
            fill="#FDF0F3"
          />
          {/* Web page wireframe lines */}
          <line x1="25" y1="20" x2="45" y2="20" stroke="#E28FA1" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="25" y1="26" x2="70" y2="26" stroke="#E5B2BD" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="25" y1="31" x2="65" y2="31" stroke="#E5B2BD" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="25" y1="36" x2="52" y2="36" stroke="#E5B2BD" strokeWidth="1.2" strokeLinecap="round" />
          {/* Base / Keyboard */}
          <path
            d="M6 56C6 54.8954 6.89543 54 8 54H92C93.1046 54 94 54.8954 94 56L98 68C98.5523 69.6569 97.3204 71.3333 95.5728 71.3333H4.42718C2.67961 71.3333 1.44772 69.6569 2 68L6 56Z"
            fill="#FFF8FA"
            stroke="#E28FA1"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Trackpad */}
          <rect x="42" y="60" width="16" height="7" rx="1.5" stroke="#E28FA1" strokeWidth="1.5" fill="#FAF1F4" />
        </svg>

        {/* Mouse with curved cord */}
        <svg
          viewBox="0 0 60 70"
          className="w-10 h-12 text-[#E28FA1] drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Curved mouse cord */}
          <path
            d="M24 16C18 8 10 12 6 22"
            stroke="#E28FA1"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Mouse body */}
          <path
            d="M16 26C16 19.3726 21.3726 14 28 14H32C38.6274 14 44 19.3726 44 26V46C44 54.8366 36.8366 62 28 62C19.1634 62 16 54.8366 16 46V26Z"
            fill="#FFF8FA"
            stroke="#E28FA1"
            strokeWidth="2.5"
          />
          {/* Scroll wheel */}
          <rect x="27.5" y="20" width="5" height="9" rx="2.5" fill="#FAF0F3" stroke="#E28FA1" strokeWidth="1.8" />
          {/* Click divider line */}
          <line x1="30" y1="15" x2="30" y2="20" stroke="#E28FA1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Subtitles as in the logo */}
      {showSubtitle && (
        <div className="mt-1 space-y-0.5">
          <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#463D40]">
            BASED IN ROTTERDAM
          </p>
          <p className="text-[9px] tracking-[0.18em] uppercase font-normal text-[#8A7E82]">
            EST. 06 2026
          </p>
        </div>
      )}
    </div>
  );
};
