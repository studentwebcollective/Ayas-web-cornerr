import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';

export const SimpleLegalPage: React.FC = () => {
  const { data } = useSiteContent();
  const { disclaimer } = data;

  return (
    <div className="py-10 sm:py-16 space-y-8 max-w-3xl mx-auto text-left">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2A2426]">
          {disclaimer.title}
        </h1>
        <p className="text-xs text-[#7A6E72] mt-1">
          Duidelijke afspraken ter bescherming van {data.brandName} en de opdrachtgever.
        </p>
      </div>

      <div className="border border-[#F0DDE3] bg-white rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="text-xs sm:text-sm text-[#4E4246] leading-relaxed whitespace-pre-line">
          {disclaimer.content}
        </div>
      </div>

      <div className="text-xs text-[#7A6E72]">
        * Door het aanvragen van een website gaat de klant akkoord met bovenstaande voorwaarden en garantie.
      </div>
    </div>
  );
};
