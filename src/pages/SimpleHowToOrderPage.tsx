import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';

interface SimpleHowToOrderPageProps {
  onNavigate: (page: string) => void;
}

export const SimpleHowToOrderPage: React.FC<SimpleHowToOrderPageProps> = ({ onNavigate }) => {
  const { data } = useSiteContent();
  const { howToOrder } = data;

  return (
    <div className="py-10 sm:py-16 space-y-10 max-w-3xl mx-auto text-left">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2A2426]">
          {howToOrder.title}
        </h1>
        <p className="text-xs text-[#7A6E72] mt-1">
          Eenvoudige uitleg van aanvraag tot oplevering.
        </p>
      </div>

      <div className="border border-[#F0DDE3] bg-white rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="text-sm sm:text-base text-[#4E4246] leading-relaxed whitespace-pre-line">
          {howToOrder.content}
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 text-xs font-semibold text-white bg-[#2A2426] hover:bg-[#C56B80] rounded-xl transition-colors cursor-pointer"
        >
          Klaar om te bestellen? Stuur een berichtje
        </button>
      </div>
    </div>
  );
};
