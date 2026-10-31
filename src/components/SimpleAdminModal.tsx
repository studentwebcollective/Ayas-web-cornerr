import React, { useState, useRef } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import {
  X,
  Camera,
  Plus,
  Trash2,
  CheckCircle2,
  Inbox,
  ZoomIn,
  ZoomOut,
  Mail,
  Phone,
  Calendar,
  Check,
  Building,
  ExternalLink,
  Globe,
  Copy,
  Download,
  Upload
} from 'lucide-react';
import { PortfolioWebsite } from '../data/siteContent';

interface SimpleAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export const SimpleAdminModal: React.FC<SimpleAdminModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'inquiries'
}) => {
  const {
    data,
    updateData,
    updateNested,
    updateLogo,
    updateLogoScale,
    addWebsite,
    deleteWebsite,
    deleteInquiry,
    toggleInquiryStatus,
    importData,
    isSaved,
    isCloudSynced
  } = useSiteContent();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [siteAddedSuccess, setSiteAddedSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const siteImageInputRef = useRef<HTMLInputElement>(null);

  // New website form state
  const [newSite, setNewSite] = useState<Omit<PortfolioWebsite, 'id'>>({
    title: '',
    category: 'Beauty & Nails',
    image: '/src/assets/images/portfolio_beauty_salon_1792147197522.jpg',
    description: '',
    link: ''
  });

  if (!isOpen) return null;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          updateLogo(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSiteImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewSite((prev) => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSite.title.trim()) return;
    addWebsite(newSite);
    setNewSite({
      title: '',
      category: 'Beauty & Nails',
      image: '/src/assets/images/portfolio_beauty_salon_1792147197522.jpg',
      description: '',
      link: ''
    });
    setSiteAddedSuccess(true);
    setTimeout(() => setSiteAddedSuccess(false), 3000);
  };

  const newInquiriesCount = (data.inquiries || []).filter((i) => i.status === 'nieuw').length;

  const navTabs = [
    { id: 'inquiries', label: `Aanvragen (${data.inquiries?.length || 0})`, badge: newInquiriesCount },
    { id: 'logo', label: 'Logo & Zoom' },
    { id: 'home', label: 'Home (Titel & Motto)' },
    { id: 'about', label: 'Over Mij' },
    { id: 'warranty', label: 'Garantie' },
    { id: 'howToOrder', label: 'Hoe Bestellen' },
    { id: 'portfolio', label: 'Website Bibliotheek' },
    { id: 'contact', label: 'Contact & Disclaimer' },
    { id: 'sync', label: '💾 Sync & Opslaan in Code' }
  ];

  const currentScale = data.logoScale || 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-4xl max-h-[92vh] bg-[#FAF7F2] rounded-2xl shadow-xl flex flex-col border border-[#E4D9D0] overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8DFD8] flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#2A2426]">
              Beheerpaneel
            </h2>
            <p className="text-xs text-[#7A6E72]">
              Bekijk ingezonden aanvragen, pas teksten aan en beheer je logo.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {isCloudSynced && (
              <span className="text-[11px] text-[#2A2426] flex items-center gap-1 font-medium bg-[#F2EDE8] px-2.5 py-1 rounded-md border border-[#E0D5CC]" title="Alle wijzigingen worden live opgeslagen in de Google Cloud database">
                <span>☁️</span>
                <span>Automatisch gesynchroniseerd</span>
              </span>
            )}
            {isSaved && (
              <span className="text-xs text-[#15803D] flex items-center gap-1 font-medium bg-[#E8F8EE] px-2.5 py-1 rounded-md">
                <CheckCircle2 size={13} />
                <span>Opgeslagen</span>
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#5D5055] hover:text-[#2A2426] hover:bg-[#EFE7E0] rounded-lg cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="px-6 py-2 bg-[#F5EFE9] border-b border-[#E8DFD8] flex items-center gap-2 overflow-x-auto shrink-0">
          {navTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === t.id
                  ? 'bg-white text-[#2A2426] shadow-2xs border border-[#E0D5CC]'
                  : 'text-[#695D62] hover:text-[#2A2426]'
              }`}
            >
              <span>{t.label}</span>
              {t.badge && t.badge > 0 ? (
                <span className="px-1.5 py-0.2 bg-[#2A2426] text-white text-[10px] rounded-full">
                  {t.badge} nieuw
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left bg-white">
          
          {/* TAB: INQUIRIES / AANVRAGEN */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg text-[#2A2426]">
                    Ingekomen Aanvragen ({data.inquiries?.length || 0})
                  </h3>
                  <p className="text-xs text-[#786D71] mt-0.5">
                    Hier verschijnen automatisch alle formulieren die mensen op de website invullen.
                  </p>
                </div>
              </div>

              {(!data.inquiries || data.inquiries.length === 0) ? (
                <div className="p-8 text-center border border-dashed border-[#DDD0C6] rounded-2xl bg-[#FAF8F5] space-y-2">
                  <Inbox size={28} className="mx-auto text-[#A6999E]" />
                  <p className="text-xs text-[#63575B] font-medium">
                    Nog geen aanvragen binnengekomen.
                  </p>
                  <p className="text-[11px] text-[#867A7E]">
                    Zodra iemand de vragenlijst op de contactpagina invult, staat de aanvraag direct hier.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.inquiries.map((inq) => {
                    const isNew = inq.status === 'nieuw';
                    return (
                      <div
                        key={inq.id}
                        className={`border rounded-2xl p-5 space-y-3 transition-colors ${
                          isNew
                            ? 'border-[#C8BEB6] bg-[#FCFAF7]'
                            : 'border-[#E8DFD8] bg-[#FAF8F5]'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0E6DE] pb-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                                isNew
                                  ? 'bg-[#2A2426] text-white'
                                  : 'bg-[#E5DDD6] text-[#695E62]'
                              }`}
                            >
                              {inq.status}
                            </span>
                            <span className="font-bold text-sm text-[#2A2426]">
                              {inq.name}
                            </span>
                            {inq.businessName && (
                              <span className="text-xs text-[#7A6F73]">
                                ({inq.businessName})
                              </span>
                            )}
                          </div>

                          <div className="text-[11px] text-[#8A7D82] flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{inq.createdAt}</span>
                          </div>
                        </div>

                        {/* Contact details */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          <div className="flex items-center gap-1.5 text-[#554C50]">
                            <Mail size={13} className="text-[#2A2426] shrink-0" />
                            <a href={`mailto:${inq.email}`} className="underline hover:text-black">
                              {inq.email}
                            </a>
                          </div>

                          {inq.phone && (
                            <div className="flex items-center gap-1.5 text-[#554C50]">
                              <Phone size={13} className="text-[#2A2426] shrink-0" />
                              <span>{inq.phone}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-1.5 text-[#554C50]">
                            <Building size={13} className="text-[#2A2426] shrink-0" />
                            <span>Branche: {inq.category}</span>
                          </div>
                        </div>

                        {/* Message content */}
                        <div className="p-3 bg-white border border-[#EDE2D8] rounded-xl text-xs text-[#44383C] whitespace-pre-line leading-relaxed">
                          {inq.message}
                        </div>

                        {/* Actions */}
                        <div className="pt-1 flex items-center justify-between">
                          <button
                            onClick={() => toggleInquiryStatus(inq.id)}
                            className="text-xs font-semibold text-[#5B4E53] hover:text-black flex items-center gap-1 cursor-pointer"
                          >
                            <Check size={13} />
                            <span>
                              {isNew ? 'Markeer als behandeld' : 'Markeer als nieuw'}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteInquiry(inq.id);
                            }}
                            className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
                            title="Aanvraag direct verwijderen"
                          >
                            <Trash2 size={13} />
                            <span>Verwijder</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB: LOGO & ZOOM */}
          {activeTab === 'logo' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg text-[#2A2426]">
                  Logo Foto & Inzoomen
                </h3>
                <p className="text-xs text-[#786D71] mt-0.5">
                  Upload je logo en gebruik de schuifbalk om in of uit te zoomen. Jouw logo wordt tevens automatisch ingesteld als browser-tabblad favicon!
                </p>
              </div>

              {/* Logo Preview with live zoom */}
              <div className="p-6 border border-[#E8DDD2] bg-[#FAF8F5] rounded-xl flex flex-col sm:flex-row items-center gap-6">
                
                {/* Live simulation box */}
                <div className="text-center space-y-1 shrink-0">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center bg-transparent border border-[#DDD0C6]">
                    {data.logoImage ? (
                      <img
                        src={data.logoImage}
                        alt="Logo preview"
                        className="w-full h-full object-contain"
                        style={{
                          transform: `scale(${currentScale / 100})`
                        }}
                      />
                    ) : (
                      <span className="text-[10px] text-[#867B80] p-2">Nog geen foto</span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#786D71] block">
                    Menubalk & Favicon
                  </span>
                </div>

                <div className="space-y-4 flex-1 w-full">
                  {/* File picker */}
                  <div className="space-y-2">
                    <input
                      type="file"
                      ref={logoInputRef}
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={() => logoInputRef.current?.click()}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#2A2426] hover:bg-black rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Camera size={14} />
                      <span>Kies foto van je computer of telefoon</span>
                    </button>
                  </div>

                  {/* Zoom Slider */}
                  {data.logoImage && (
                    <div className="p-3 bg-white border border-[#E8DDD2] rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs font-medium text-[#463D40]">
                        <span className="flex items-center gap-1">
                          <ZoomIn size={14} />
                          <span>Logo Inzoomen / Schaal</span>
                        </span>
                        <span className="font-bold text-[#2A2426]">
                          {currentScale}%
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <ZoomOut size={14} className="text-[#887C80]" />
                        <input
                          type="range"
                          min="60"
                          max="250"
                          step="5"
                          value={currentScale}
                          onChange={(e) => updateLogoScale(Number(e.target.value))}
                          className="flex-1 accent-[#2A2426] cursor-pointer"
                        />
                        <ZoomIn size={14} className="text-[#887C80]" />
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => updateLogoScale(100)}
                          className="text-[11px] text-[#786D71] hover:underline cursor-pointer"
                        >
                          Herstel naar 100%
                        </button>
                      </div>
                    </div>
                  )}

                  {data.logoImage && (
                    <button
                      onClick={() => updateLogo('')}
                      className="text-xs text-red-600 block hover:underline cursor-pointer"
                    >
                      Verwijder deze foto
                    </button>
                  )}
                </div>
              </div>

              {/* Bedrijfsnaam & E-mail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-[#463D40] mb-1">
                    Bedrijfsnaam
                  </label>
                  <input
                    type="text"
                    value={data.brandName}
                    onChange={(e) => updateData({ brandName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#463D40] mb-1">
                    Ondertitel / Locatie
                  </label>
                  <input
                    type="text"
                    value={data.subtitle}
                    onChange={(e) => updateData({ subtitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#463D40] mb-1">
                    Jouw E-mailadres (waar klanten contact mee hebben)
                  </label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => updateData({ email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: HOME (TITEL & MOTTO) */}
          {activeTab === 'home' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-[#2A2426]">
                Home Pagina: Grote Titel & Motto
              </h3>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Grote Hoofdtitel (Super groot bovenaan)
                </label>
                <input
                  type="text"
                  value={data.home.heroBigTitle}
                  onChange={(e) => updateNested('home.heroBigTitle', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg font-serif text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Motto / Slogan (schuingedrukt eronder)
                </label>
                <input
                  type="text"
                  value={data.home.motto}
                  onChange={(e) => updateNested('home.motto', e.target.value)}
                  placeholder="bijv. Eenvoudig, stijlvol & betaalbaar online voor ondernemers."
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Aanspreektitel
                </label>
                <input
                  type="text"
                  value={data.home.introHeading}
                  onChange={(e) => updateNested('home.introHeading', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Introductietekst (waarom lage studentenprijzen)
                </label>
                <textarea
                  rows={3}
                  value={data.home.introText}
                  onChange={(e) => updateNested('home.introText', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#463D40] mb-1">
                    Prijs Titel
                  </label>
                  <input
                    type="text"
                    value={data.home.priceTitle}
                    onChange={(e) => updateNested('home.priceTitle', e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#463D40] mb-1">
                    Prijs Bedrag
                  </label>
                  <input
                    type="text"
                    value={data.home.priceAmount}
                    onChange={(e) => updateNested('home.priceAmount', e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Omschrijving van de One-Page landingspagina
                </label>
                <textarea
                  rows={3}
                  value={data.home.priceDescription}
                  onChange={(e) => updateNested('home.priceDescription', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Extra Notitie
                </label>
                <input
                  type="text"
                  value={data.home.extraNote}
                  onChange={(e) => updateNested('home.extraNote', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                />
              </div>
            </div>
          )}

          {/* TAB: ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-[#2A2426]">
                Over Mij Teksten
              </h3>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Pagina Titel
                </label>
                <input
                  type="text"
                  value={data.about.title}
                  onChange={(e) => updateNested('about.title', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Verhaal over de kloof bij ondernemers (alles via social media DM's regelen)
                </label>
                <textarea
                  rows={5}
                  value={data.about.story}
                  onChange={(e) => updateNested('about.story', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Waarom prijzen laag zijn als student (€79)
                </label>
                <textarea
                  rows={5}
                  value={data.about.reasonsText}
                  onChange={(e) => updateNested('about.reasonsText', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                />
              </div>
            </div>
          )}

          {/* TAB: WARRANTY */}
          {activeTab === 'warranty' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-[#2A2426]">
                Garantie & Tarieven Teksten
              </h3>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  3 Maanden Garantie Tekst (Gratis fixen als het stopt of lagt)
                </label>
                <textarea
                  rows={3}
                  value={data.warranty.threeMonthsText}
                  onChange={(e) => updateNested('warranty.threeMonthsText', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Na de 3 Maanden Garantie Tekst (€10 - €30 tarief)
                </label>
                <textarea
                  rows={3}
                  value={data.warranty.afterThreeMonthsText}
                  onChange={(e) => updateNested('warranty.afterThreeMonthsText', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Design- & Stijlveranderingen Uitleg
                </label>
                <textarea
                  rows={3}
                  value={data.warranty.designChangeText}
                  onChange={(e) => updateNested('warranty.designChangeText', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Tarievenoverzicht Designveranderingen (€20 - €60)
                </label>
                <textarea
                  rows={4}
                  value={data.warranty.pricingBreakdown}
                  onChange={(e) => updateNested('warranty.pricingBreakdown', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                />
              </div>
            </div>
          )}

          {/* TAB: HOW TO ORDER */}
          {activeTab === 'howToOrder' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-[#2A2426]">
                Hoe Bestellen Werkt (Zelf je tekst schrijven)
              </h3>
              <p className="text-xs text-[#786D71]">
                Hier kun je alle tekst en stappen intypen die jij aan je klanten wilt laten zien.
              </p>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Titel
                </label>
                <input
                  type="text"
                  value={data.howToOrder.title}
                  onChange={(e) => updateNested('howToOrder.title', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Tekst & Stappen
                </label>
                <textarea
                  rows={10}
                  value={data.howToOrder.content}
                  onChange={(e) => updateNested('howToOrder.content', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg font-sans"
                />
              </div>
            </div>
          )}

          {/* TAB: PORTFOLIO / WEBSITE BIBLIOTHEEK */}
          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-lg text-[#2A2426]">
                  Website Bibliotheek Beheer
                </h3>
                <p className="text-xs text-[#786D71] mt-0.5">
                  Voeg hier een gemaakte website toe of haal er eentje weg.
                </p>
              </div>

              {/* Form to add website */}
              <form
                onSubmit={handleAddWebsite}
                className="p-5 border border-[#E8DDD2] bg-[#FAF8F5] rounded-xl space-y-3"
              >
                <div className="font-semibold text-xs text-[#2A2426] flex items-center gap-1.5">
                  <Plus size={14} />
                  <span>Nieuwe website toevoegen</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#463D40] mb-1">
                      Titel van de website *
                    </label>
                    <input
                      type="text"
                      required
                      value={newSite.title}
                      onChange={(e) => setNewSite({ ...newSite, title: e.target.value })}
                      placeholder="bijv. Boutique Rotterdam"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#DDD0C6] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#463D40] mb-1">
                      Branche / Categorie
                    </label>
                    <input
                      type="text"
                      value={newSite.category}
                      onChange={(e) => setNewSite({ ...newSite, category: e.target.value })}
                      placeholder="bijv. Mode & Kleding"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#DDD0C6] rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#463D40] mb-1">
                    Foto van de website (screenshot uploaden of URL invullen)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={siteImageInputRef}
                      onChange={handleSiteImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => siteImageInputRef.current?.click()}
                      className="px-3 py-1.5 text-xs bg-[#2A2426] text-white rounded-lg cursor-pointer"
                    >
                      Kies foto
                    </button>
                    <input
                      type="text"
                      value={newSite.image}
                      onChange={(e) => setNewSite({ ...newSite, image: e.target.value })}
                      placeholder="Of plak foto link..."
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#DDD0C6] rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#463D40] mb-1">
                    Website Link / URL (waar bezoekers naartoe gaan als ze erop klikken)
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-white border border-[#DDD0C6] rounded-lg text-[#867B80]">
                      <Globe size={14} />
                    </div>
                    <input
                      type="text"
                      value={newSite.link || ''}
                      onChange={(e) => setNewSite({ ...newSite, link: e.target.value })}
                      placeholder="bijv. https://instagram.com/jouwnaam of https://jouwwebsite.nl"
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#DDD0C6] rounded-lg"
                    />
                  </div>
                  <p className="text-[10px] text-[#7A6E72] mt-0.5">
                    Als je dit leeg laat, blijft de bezoeker op deze website.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#463D40] mb-1">
                    Korte omschrijving
                  </label>
                  <textarea
                    rows={2}
                    value={newSite.description}
                    onChange={(e) => setNewSite({ ...newSite, description: e.target.value })}
                    placeholder="Wat voor website is dit en wat staat erop..."
                    className="w-full px-3 py-1.5 text-xs bg-white border border-[#DDD0C6] rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#2A2426] hover:bg-black rounded-lg transition-colors cursor-pointer"
                >
                  Toevoegen aan bibliotheek
                </button>

                {siteAddedSuccess && (
                  <div className="p-2.5 bg-[#E8F8EE] border border-[#BDE8CB] text-[#15803D] text-xs rounded-lg flex items-center gap-1.5 font-medium">
                    <CheckCircle2 size={14} />
                    <span>Website succesvol toegevoegd aan de bibliotheek!</span>
                  </div>
                )}
              </form>

              {/* Existing websites list */}
              <div className="space-y-2">
                <div className="font-semibold text-xs text-[#2A2426]">
                  Huidige websites in bibliotheek ({data.websites.length}):
                </div>
                {data.websites.map((w) => (
                  <div
                    key={w.id}
                    className="p-3 border border-[#E8DDD2] bg-white rounded-xl flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={w.image}
                        alt={w.title}
                        className="w-12 h-9 object-cover rounded-md border border-[#DDD0C6] shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#2A2426] truncate">{w.title}</div>
                        <div className="text-[11px] text-[#7A6E72] truncate">{w.category}</div>
                        {w.link && (
                          <div className="text-[10px] text-[#8C7E83] flex items-center gap-1 truncate">
                            <Globe size={10} className="shrink-0" />
                            <span className="truncate">{w.link}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {w.link && (
                        <a
                          href={w.link.startsWith('http') ? w.link : `https://${w.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-[#5A4F53] hover:text-black hover:bg-[#F2EDE8] rounded-md transition-colors"
                          title="Open website link"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteWebsite(w.id);
                        }}
                        className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-md cursor-pointer transition-colors"
                        title="Website direct verwijderen"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONTACT & DISCLAIMER */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-[#2A2426]">
                Aanvraagpagina & Juridische Disclaimer
              </h3>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Aanvraagpagina Uitlegtekst
                </label>
                <textarea
                  rows={3}
                  value={data.contact.text}
                  onChange={(e) => updateNested('contact.text', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Juridische Disclaimer & Algemene Bepalingen
                </label>
                <textarea
                  rows={8}
                  value={data.disclaimer.content}
                  onChange={(e) => updateNested('disclaimer.content', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg"
                />
              </div>
            </div>
          )}

          {/* TAB: SYNC MET CODE */}
          {activeTab === 'sync' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg text-[#2A2426]">
                  Synchronisatie met Website Code (AI Studio & Netlify)
                </h3>
                <p className="text-xs text-[#786D71] mt-0.5">
                  Zorg ervoor dat jouw teksten, prijzen en portfolio-aanpassingen definitief in de broncode bewaard blijven en nooit verloren gaan.
                </p>
              </div>

              {/* CARD 1: EXPORTEER NAAR AI STUDIO */}
              <div className="p-5 border border-[#DDD0C6] rounded-2xl bg-[#FAF8F5] space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-[#2A2426] text-white rounded-xl">
                    <Copy size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[#2A2426]">
                      1. Sla al je aanpassingen permanent op in de code
                    </h4>
                    <p className="text-xs text-[#63575B] mt-1 leading-relaxed">
                      Klik op de knop hieronder om al jouw huidige teksten, logo en websites te kopiëren. Plak dit vervolgens simpelweg in het chatvenster tegen AI Studio met de boodschap: <span className="font-semibold text-[#2A2426]">"Sla deze inhoud op in de code"</span>. Dan verwerk ik het direct in de broncode zodat elke bezoeker het ziet en het nooit meer overschreven wordt!
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 3500);
                    }}
                    className="px-4 py-2 bg-[#2A2426] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copiedCode ? '✓ Gekopieerd naar klembord!' : 'Kopieer alle inhoud voor AI Studio'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `ayas-web-corner-backup-${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-4 py-2 border border-[#D0C4BB] bg-white text-[#2A2426] text-xs font-semibold rounded-lg hover:bg-[#F2ECE6] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download back-up (.json)</span>
                  </button>
                </div>
              </div>

              {/* CARD 2: IMPORTEER INHOUD */}
              <div className="p-5 border border-[#DDD0C6] rounded-2xl bg-white space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-[#FAF7F2] text-[#2A2426] border border-[#E8DFD8] rounded-xl">
                    <Upload size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[#2A2426]">
                      2. Inhoud importeren op dit apparaat
                    </h4>
                    <p className="text-xs text-[#63575B] mt-1 leading-relaxed">
                      Heb je aanpassingen gedaan op een ander apparaat (bijv. iPad of telefoon) en wil je ze hier direct inladen? Plak de inhoudscode hieronder en klik op "Toepassen".
                    </p>
                  </div>
                </div>

                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Plak hier de inhoudscode (JSON)..."
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-lg font-mono"
                />

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        const parsed = JSON.parse(importJsonText.trim());
                        importData(parsed);
                        setImportStatus('Succesvol geïmporteerd!');
                        setImportJsonText('');
                        setTimeout(() => setImportStatus(null), 3000);
                      } catch (err) {
                        setImportStatus('Fout: ongeldige gegevens. Controleer de geplakte tekst.');
                      }
                    }}
                    disabled={!importJsonText.trim()}
                    className="px-4 py-2 bg-[#2A2426] text-white text-xs font-semibold rounded-lg hover:bg-black disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Upload size={14} />
                    <span>Inhoud Toepassen</span>
                  </button>

                  {importStatus && (
                    <span className={`text-xs font-medium ${importStatus.startsWith('Fout') ? 'text-red-600' : 'text-emerald-600'}`}>
                      {importStatus}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#FAF7F2] border-t border-[#E8DFD8] flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#2A2426] hover:bg-black rounded-lg cursor-pointer"
          >
            Sluiten & Terug naar Website
          </button>
        </div>

      </div>
    </div>
  );
};
