import React, { useState, useEffect } from 'react';
import { SiteContentProvider, useSiteContent } from './context/SiteContentContext';
import { SiteNav } from './components/SiteNav';
import { SimpleHomePage } from './pages/SimpleHomePage';
import { SimpleAboutPage } from './pages/SimpleAboutPage';
import { SimpleWarrantyPage } from './pages/SimpleWarrantyPage';
import { SimplePortfolioPage } from './pages/SimplePortfolioPage';
import { SimpleHowToOrderPage } from './pages/SimpleHowToOrderPage';
import { SimpleContactPage } from './pages/SimpleContactPage';
import { SimpleLegalPage } from './pages/SimpleLegalPage';
import { SimpleAdminModal } from './components/SimpleAdminModal';
import { PasswordPromptModal } from './components/PasswordPromptModal';
import { ArrowLeft } from 'lucide-react';

function MainApp() {
  const { data } = useSiteContent();
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'over-mij', 'garantie', 'bibliotheek', 'hoe-bestellen', 'contact', 'disclaimer'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePasswordSuccess = () => {
    setPasswordModalOpen(false);
    setAdminOpen(true);
  };

  // Dynamically update browser favicon & apple-touch-icon to match the logo from admin panel
  useEffect(() => {
    const defaultFavicon = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%232A2426'/><text x='16' y='22' font-size='18' font-family='serif' font-weight='bold' fill='%23FCEEF2' text-anchor='middle'>A</text></svg>";
    const targetIcon = data.logoImage && data.logoImage.trim() !== '' ? data.logoImage : defaultFavicon;

    // Update standard icon
    let iconLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (!iconLink) {
      iconLink = document.createElement('link');
      iconLink.rel = 'icon';
      document.head.appendChild(iconLink);
    }
    iconLink.href = targetIcon;

    // Update apple touch icon for iOS / Safari tabs & bookmarks
    let appleLink = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement | null;
    if (!appleLink) {
      appleLink = document.createElement('link');
      appleLink.rel = 'apple-touch-icon';
      document.head.appendChild(appleLink);
    }
    appleLink.href = targetIcon;
  }, [data.logoImage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCEEF2] text-[#2A2426]">
      {/* Clean Navigation with 3 Stripes in Top Right Corner */}
      <SiteNav
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

      {/* Main Content Area for Distinct Pages */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6">
        
        {/* Back button if on subpage */}
        {currentPage !== 'home' && (
          <div className="pt-6 pb-2 text-left">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 text-xs text-[#7A6F73] hover:text-[#2A2426] cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>← Terug naar Home</span>
            </button>
          </div>
        )}

        {currentPage === 'home' && (
          <SimpleHomePage onNavigate={navigateTo} />
        )}

        {currentPage === 'over-mij' && (
          <SimpleAboutPage onNavigate={navigateTo} />
        )}

        {currentPage === 'garantie' && (
          <SimpleWarrantyPage onNavigate={navigateTo} />
        )}

        {currentPage === 'bibliotheek' && (
          <SimplePortfolioPage onNavigate={navigateTo} />
        )}

        {currentPage === 'hoe-bestellen' && (
          <SimpleHowToOrderPage onNavigate={navigateTo} />
        )}

        {currentPage === 'contact' && (
          <SimpleContactPage />
        )}

        {currentPage === 'disclaimer' && (
          <SimpleLegalPage />
        )}

      </main>

      {/* Simple, quiet footer with inconspicuous, tiny admin link */}
      <footer className="border-t border-[#F0DDE3] bg-[#FCEEF2] py-8 mt-16 text-xs text-[#786D71]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {data.brandName} · {data.subtitle}
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => navigateTo('disclaimer')}
              className="hover:underline cursor-pointer"
            >
              Disclaimer
            </button>
            <span>·</span>
            {/* Small, subtle, inconspicuous admin access link */}
            <button
              onClick={() => setPasswordModalOpen(true)}
              className="text-[10px] text-[#A69B9F] hover:text-[#554B4F] cursor-pointer transition-colors"
              title="Beheer"
            >
              beheer
            </button>
          </div>
        </div>
      </footer>

      {/* Password Prompt Modal */}
      <PasswordPromptModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSuccess={handlePasswordSuccess}
      />

      {/* Admin Panel Modal (only reachable after password verification) */}
      <SimpleAdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <SiteContentProvider>
      <MainApp />
    </SiteContentProvider>
  );
}
