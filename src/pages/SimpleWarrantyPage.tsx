import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';

interface SimpleWarrantyPageProps {
  onNavigate: (page: string) => void;
}

export const SimpleWarrantyPage: React.FC<SimpleWarrantyPageProps> = ({ onNavigate }) => {
  const { data } = useSiteContent();
  const { warranty } = data;

  return (
    <div className="py-10 sm:py-16 space-y-10 max-w-3xl mx-auto text-left">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2A2426]">
          {warranty.title}
        </h1>
        <p className="text-xs text-[#7A6E72] mt-1">
          Eerlijke en transparante voorwaarden zonder verborgen kosten.
        </p>
      </div>

      <div className="space-y-6">
        {/* 3 Months Free */}
        <div className="border border-[#F0DDE3] bg-white rounded-2xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-xl text-[#2A2426]">
              3 Maanden Volledige Garantie
            </h2>
            <span className="text-xs font-bold text-[#2A2426] bg-[#F8E2EA] px-2.5 py-1 rounded-md">
              100% Gratis
            </span>
          </div>
          <p className="text-sm text-[#52464A] leading-relaxed">
            {warranty.threeMonthsText}
          </p>
        </div>

        {/* After 3 Months */}
        <div className="border border-[#F0DDE3] bg-white rounded-2xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-xl text-[#2A2426]">
              Na de Garantieperiode (Technische Fixes)
            </h2>
            <span className="text-xs font-bold text-[#2A2426] bg-[#F8E2EA] px-2.5 py-1 rounded-md">
              €10 – €30
            </span>
          </div>
          <p className="text-sm text-[#52464A] leading-relaxed">
            {warranty.afterThreeMonthsText}
          </p>
        </div>

        {/* Design Changes */}
        <div className="border border-[#F0DDE3] bg-white rounded-2xl p-6 sm:p-7 shadow-xs space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-xl text-[#2A2426]">
              Design- & Stijlveranderingen
            </h2>
            <span className="text-xs font-bold text-[#2A2426] bg-[#F8E2EA] px-2.5 py-1 rounded-md">
              €20 – €60
            </span>
          </div>
          <p className="text-sm text-[#52464A] leading-relaxed">
            {warranty.designChangeText}
          </p>
          <div className="p-4 bg-[#FFF5F8] rounded-xl border border-[#F0DDE3] text-xs sm:text-sm text-[#4E4347] whitespace-pre-line leading-relaxed">
            {warranty.pricingBreakdown}
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 text-xs font-semibold text-white bg-[#2A2426] hover:bg-black rounded-xl transition-colors cursor-pointer"
        >
          Heb je een vraag over de garantie? Stuur een berichtje
        </button>
      </div>
    </div>
  );
};
