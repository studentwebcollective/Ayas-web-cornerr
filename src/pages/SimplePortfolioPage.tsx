import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { ExternalLink, Globe } from 'lucide-react';
import { PortfolioWebsite } from '../data/siteContent';

interface SimplePortfolioPageProps {
  onNavigate: (page: string) => void;
}

export const SimplePortfolioPage: React.FC<SimplePortfolioPageProps> = ({ onNavigate }) => {
  const { data } = useSiteContent();

  const handleOpenWebsite = (site: PortfolioWebsite) => {
    // If it's Aya's Web Corner, navigate to home
    if (site.id === 'ayas-web-corner' || site.link === '/' || site.link === '#') {
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (site.link) {
      const url = site.link.startsWith('http://') || site.link.startsWith('https://')
        ? site.link
        : `https://${site.link}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate('home');
    }
  };

  const subtitleText = data.librarySubtitle || "Hier zie je voorbeelden van websites. Klik op een website om deze direct live te bekijken!";
  
  // Dynamic text size class for the subtitle below 'Website Bibliotheek'
  const getSubtitleSizeClass = (size?: string) => {
    switch (size) {
      case 'xs':
      case 'small':
        return 'text-xs';
      case 'medium':
        return 'text-sm sm:text-base';
      case 'large':
        return 'text-base sm:text-lg';
      case 'xlarge':
        return 'text-lg sm:text-xl';
      default:
        return 'text-xs';
    }
  };

  const subtitleSizeClass = getSubtitleSizeClass(data.librarySubtitleSize);

  return (
    <div className="py-10 sm:py-16 space-y-10 max-w-4xl mx-auto text-left">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2A2426]">
          Website Bibliotheek
        </h1>
        <p className={`${subtitleSizeClass} text-[#7A6E72] mt-1.5 leading-relaxed`}>
          {subtitleText}
        </p>
      </div>

      {/* Grid of websites or empty state */}
      {data.websites && data.websites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.websites.map((site) => (
            <div
              key={site.id}
              onClick={() => handleOpenWebsite(site)}
              className="border border-[#F0DDE3] bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#2A2426]/30 transition-all flex flex-col justify-between cursor-pointer group"
              title={`Klik om naar ${site.title} te gaan`}
            >
              <div>
                {/* Thumbnail with overlay hint */}
                <div className="aspect-16/10 bg-[#F8E2EA] overflow-hidden relative">
                  <img
                    src={site.image}
                    alt={site.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                    <Globe size={10} />
                    <span>Website bezoeken ↗</span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[11px] font-medium text-[#2A2426] uppercase tracking-wider">
                    {site.category}
                  </div>
                  <h2 className="font-serif text-lg text-[#2A2426] group-hover:underline flex items-center justify-between">
                    <span>{site.title}</span>
                    <ExternalLink size={14} className="text-[#887C80] group-hover:text-black transition-colors" />
                  </h2>
                  <p className="text-xs text-[#594E52] leading-relaxed">
                    {site.description}
                  </p>
                </div>
              </div>

              {/* Card action bar */}
              <div className="px-5 pb-5 pt-3 border-t border-[#F2EAE4] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenWebsite(site);
                  }}
                  className="text-xs font-semibold text-[#2A2426] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Bekijk website</span>
                  <ExternalLink size={12} />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('contact');
                  }}
                  className="text-xs font-semibold text-[#665B60] hover:text-[#2A2426] hover:underline transition-colors cursor-pointer"
                >
                  Ik wil ook zo'n website →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="font-serif italic text-2xl sm:text-3xl text-[#7A6E72] tracking-wide">
            Coming soon...
          </p>
        </div>
      )}

      {/* Button only appears if there is at least 1 website in the library, and without price amount */}
      {data.websites && data.websites.length >= 1 && (
        <div className="pt-4 text-center">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 text-xs font-semibold text-white bg-[#2A2426] hover:bg-black rounded-xl transition-colors cursor-pointer"
          >
            Wil jij ook een website in deze bibliotheek? Vraag direct aan
          </button>
        </div>
      )}
    </div>
  );
};

