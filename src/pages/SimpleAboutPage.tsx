import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';

interface SimpleAboutPageProps {
  onNavigate: (page: string) => void;
}

export const SimpleAboutPage: React.FC<SimpleAboutPageProps> = ({ onNavigate }) => {
  const { data } = useSiteContent();
  const { about } = data;

  return (
    <div className="py-10 sm:py-16 space-y-10 max-w-3xl mx-auto text-left">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2A2426]">
          {about.title}
        </h1>
        <p className="text-xs text-[#7A6E72] mt-1">
          {data.subtitle}
        </p>
      </div>

      <div className="border border-[#F0DDE3] bg-white rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="font-serif text-xl text-[#2A2426] mb-2">
            De kloof bij kleine ondernemers
          </h2>
          <p className="text-sm sm:text-base text-[#52464A] leading-relaxed">
            {about.story}
          </p>
        </div>

        <div className="pt-4 border-t border-[#F7E1E8]">
          <h2 className="font-serif text-xl text-[#2A2426] mb-2">
            Waarom zijn mijn prijzen zo laag (€79)?
          </h2>
          <p className="text-sm sm:text-base text-[#52464A] leading-relaxed">
            {about.reasonsText}
          </p>
        </div>
      </div>

      <div className="pt-2 flex items-center gap-4">
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 text-xs font-semibold text-white bg-[#2A2426] hover:bg-black rounded-xl transition-colors cursor-pointer"
        >
          Neem contact op met Aya
        </button>
        <button
          onClick={() => onNavigate('bibliotheek')}
          className="px-5 py-3 text-xs font-medium text-[#2A2426] border border-[#E2CBD3] hover:bg-[#FCEEF2] rounded-xl transition-colors cursor-pointer"
        >
          Bekijk eerdere websites
        </button>
      </div>
    </div>
  );
};
