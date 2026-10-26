import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { ArrowRight, ClipboardList } from 'lucide-react';

interface SimpleHomePageProps {
  onNavigate: (page: string) => void;
}

export const SimpleHomePage: React.FC<SimpleHomePageProps> = ({ onNavigate }) => {
  const { data } = useSiteContent();
  const { home } = data;

  return (
    <div className="py-10 sm:py-16 space-y-12 max-w-3xl mx-auto text-left">
      
      {/* Super Big Display Title & Motto (No dividing line, black motto) */}
      <div className="space-y-4">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#2A2426] leading-[1.04] tracking-tight">
          {home.heroBigTitle}
        </h1>

        {home.motto && (
          <p className="font-serif text-xl sm:text-2xl text-[#2A2426] italic font-normal">
            {home.motto}
          </p>
        )}
      </div>

      {/* Navigation cards to other pages (boven 'Lieve ondernemers en klanten') */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          onClick={() => onNavigate('over-mij')}
          className="p-4 border border-[#F0DDE3] bg-white rounded-xl hover:border-[#2A2426] transition-colors cursor-pointer"
        >
          <div className="font-serif text-base text-[#2A2426] flex items-center justify-between">
            <span>Over Mij</span>
            <ArrowRight size={14} />
          </div>
          <p className="text-[11px] text-[#756A6E] mt-0.5">
            Mijn verhaal als student in Rotterdam & de gap bij ondernemers.
          </p>
        </div>

        <div
          onClick={() => onNavigate('garantie')}
          className="p-4 border border-[#F0DDE3] bg-white rounded-xl hover:border-[#2A2426] transition-colors cursor-pointer"
        >
          <div className="font-serif text-base text-[#2A2426] flex items-center justify-between">
            <span>Garantie & Tarieven</span>
            <ArrowRight size={14} />
          </div>
          <p className="text-[11px] text-[#756A6E] mt-0.5">
            3 maanden gratis garantie en eerlijke lage reparatieprijzen.
          </p>
        </div>

        <div
          onClick={() => onNavigate('hoe-bestellen')}
          className="p-4 border border-[#F0DDE3] bg-white rounded-xl hover:border-[#2A2426] transition-colors cursor-pointer"
        >
          <div className="font-serif text-base text-[#2A2426] flex items-center justify-between">
            <span>Hoe Bestellen Werkt</span>
            <ArrowRight size={14} />
          </div>
          <p className="text-[11px] text-[#756A6E] mt-0.5">
            In eenvoudige stappen van jouw idee naar livegang.
          </p>
        </div>

        <div
          onClick={() => onNavigate('contact')}
          className="p-4 border border-[#F0DDE3] bg-white rounded-xl hover:border-[#2A2426] transition-colors cursor-pointer"
        >
          <div className="font-serif text-base text-[#2A2426] flex items-center justify-between">
            <span>Aanvraag & Vragenlijst</span>
            <ArrowRight size={14} />
          </div>
          <p className="text-[11px] text-[#756A6E] mt-0.5">
            Vul de vragenlijst in om een one-pager aan te vragen.
          </p>
        </div>
      </div>

      {/* Lieve ondernemers & klanten tekstblok */}
      <div className="space-y-2">
        <h2 className="font-serif text-xl sm:text-2xl text-[#2A2426]">
          {home.introHeading}
        </h2>
        <p className="text-base sm:text-lg text-[#52464A] leading-relaxed">
          {home.introText}
        </p>
      </div>

      {/* The €79 One-Page Offer Box */}
      <div className="border border-[#F0DDE3] bg-white rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#F7E1E8] pb-4">
          <h2 className="font-serif text-2xl text-[#2A2426]">
            {home.priceTitle}
          </h2>
          <div className="text-3xl font-serif font-bold text-[#2A2426]">
            {home.priceAmount}
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#52464A] leading-relaxed">
          {home.priceDescription}
        </p>

        {home.extraNote && (
          <div className="text-xs text-[#7A6F73] pt-1">
            {home.extraNote}
          </div>
        )}

        <div className="pt-3 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3.5 text-xs font-semibold text-white bg-[#2A2426] hover:bg-black rounded-xl transition-colors cursor-pointer flex items-center gap-2"
          >
            <ClipboardList size={15} />
            <span>Inschrijven via Vragenlijst</span>
          </button>
          
          <button
            onClick={() => onNavigate('bibliotheek')}
            className="px-5 py-3.5 text-xs font-medium text-[#2A2426] border border-[#E2CBD3] hover:bg-[#FCEEF2] rounded-xl transition-colors cursor-pointer"
          >
            Bekijk Gemaakte Websites
          </button>
        </div>
      </div>

    </div>
  );
};
