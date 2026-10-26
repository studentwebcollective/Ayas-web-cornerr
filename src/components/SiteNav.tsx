import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

interface SiteNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const SiteNav: React.FC<SiteNavProps> = ({
  currentPage,
  onNavigate
}) => {
  const { data } = useSiteContent();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'over-mij', label: 'Over Mij' },
    { id: 'garantie', label: 'Garantie' },
    { id: 'bibliotheek', label: 'Website Bibliotheek' },
    { id: 'hoe-bestellen', label: 'Hoe Bestellen Werkt' },
    { id: 'contact', label: 'Aanvraag & Vragenlijst' },
    { id: 'disclaimer', label: 'Disclaimer' }
  ];

  const handleSelectPage = (pageId: string) => {
    onNavigate(pageId);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scale = (data.logoScale || 100) / 100;

  return (
    <>
      <header className="border-b border-[#F0DDE3] bg-[#FCEEF2] sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* Left: Logo without any white border or white box background + Brand Name */}
          <div
            onClick={() => handleSelectPage('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            {data.logoImage ? (
              <div className="w-13 h-13 overflow-hidden rounded-xl flex items-center justify-center bg-transparent shrink-0">
                <img
                  src={data.logoImage}
                  alt={data.brandName}
                  className="w-full h-full object-contain transition-transform duration-200"
                  style={{
                    transform: `scale(${scale})`
                  }}
                />
              </div>
            ) : (
              <div className="h-11 w-11 rounded-xl bg-[#F5E1E8] flex items-center justify-center text-[#2A2426] font-serif font-bold text-lg shrink-0">
                A
              </div>
            )}

            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2A2426] block leading-none group-hover:text-black transition-colors">
                {data.brandName}
              </span>
              <span className="text-[11px] text-[#786D71] mt-1 block">
                {data.subtitle}
              </span>
            </div>
          </div>

          {/* Right corner: 3 Stripes Menu Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2.5 text-[#2A2426] hover:bg-[#F8E2EA] rounded-xl transition-colors cursor-pointer"
            aria-label="Menu"
            aria-expanded={menuOpen}
            title="Menu"
          >
            {menuOpen ? <X size={26} strokeWidth={2} /> : <Menu size={26} strokeWidth={2} />}
          </button>

        </div>
      </header>

      {/* Side panel taking up ~1/3 of the screen with backdrop */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Dimmed backdrop covering the rest of the screen (approx 2/3) */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity cursor-pointer"
            onClick={() => setMenuOpen(false)}
            aria-label="Menu sluiten"
          />

          {/* Side drawer panel (approx 1/3 of screen, max ~450px, full width on small mobile) */}
          <div className="relative z-10 w-full sm:w-[380px] md:w-1/3 min-w-[300px] max-w-[460px] h-full bg-[#FCEEF2] border-l border-[#F0DDE3] shadow-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
            <div>
              {/* Top Bar inside Menu Drawer */}
              <div className="flex items-center justify-between border-b border-[#F0DDE3] pb-5">
                <span className="font-serif text-2xl font-bold text-[#2A2426]">
                  Menu
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-[#2A2426] hover:bg-[#F8E2EA] rounded-xl transition-colors cursor-pointer"
                  aria-label="Sluiten"
                >
                  <X size={26} />
                </button>
              </div>

              {/* Distinct Pages Links List - identical typography & style to original */}
              <nav className="py-8 space-y-4 text-left">
                {menuItems.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => handleSelectPage(item.id)}
                        className={`text-2xl font-serif tracking-tight transition-colors cursor-pointer block w-full text-left py-1.5 ${
                          isActive
                            ? 'text-black underline underline-offset-8 font-bold'
                            : 'text-[#2A2426] hover:text-black'
                        }`}
                      >
                        {item.label}
                      </button>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom section of menu */}
            <div className="w-full pt-6 border-t border-[#F0DDE3] text-xs text-[#7A6F73] text-left">
              <span>{data.brandName}</span>
              <span className="mx-2">·</span>
              <span>{data.subtitle}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
