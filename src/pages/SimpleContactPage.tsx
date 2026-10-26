import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { CheckCircle2, Send, ClipboardList } from 'lucide-react';

export const SimpleContactPage: React.FC = () => {
  const { data, addInquiry } = useSiteContent();
  const { contact } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    category: 'Beauty & Nagelstudio',
    hasContent: 'Ik heb al foto’s en prijzen',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Vul alsjeblieft minimaal je naam en e-mailadres in.');
      return;
    }

    const fullMessage = [
      formData.businessName ? `Bedrijfsnaam: ${formData.businessName}` : '',
      `Status materiaal: ${formData.hasContent}`,
      formData.message ? `Wensen / Toelichting:\n${formData.message}` : ''
    ].filter(Boolean).join('\n\n');

    addInquiry({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      businessName: formData.businessName.trim(),
      category: formData.category,
      message: fullMessage
    });

    setError('');
    setSubmitted(true);
  };

  return (
    <div className="py-10 sm:py-16 space-y-10 max-w-2xl mx-auto text-left">
      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#2A2426] font-semibold mb-2">
          <ClipboardList size={15} />
          <span>Website Vragenlijst</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2A2426]">
          {contact.title}
        </h1>
        <p className="text-sm text-[#52464A] mt-2 leading-relaxed">
          {contact.text}
        </p>
      </div>

      <div className="border border-[#F0DDE3] bg-white rounded-2xl p-6 sm:p-8 shadow-xs">
        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#F8E2EA] text-[#2A2426] mx-auto flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="font-serif text-2xl text-[#2A2426]">
              Bedankt voor je inschrijving, {formData.name}!
            </h2>
            <p className="text-sm text-[#5A4E52] max-w-md mx-auto leading-relaxed">
              Jouw aanvraag is direct doorgestuurd naar het beheerpaneel van Aya. Ik bekijk je wensen en stuur je zo snel mogelijk een e-mail via <strong>{formData.email}</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    businessName: '',
                    category: 'Beauty & Nagelstudio',
                    hasContent: 'Ik heb al foto’s en prijzen',
                    message: ''
                  });
                }}
                className="text-xs underline text-[#2A2426] hover:text-black cursor-pointer font-medium"
              >
                Nog een aanvraag invullen
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="font-serif text-xl text-[#2A2426] border-b border-[#F7E1E8] pb-2">
              Inschrijven voor een One-Page Website (€79)
            </h2>

            {/* Naam & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Jouw Naam *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="bijv. Fatima of Emma"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FFF9FB] border border-[#E2CBD3] rounded-xl text-[#2A2426] focus:outline-none focus:border-[#2A2426]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  E-mailadres *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jouw@email.nl"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FFF9FB] border border-[#E2CBD3] rounded-xl text-[#2A2426] focus:outline-none focus:border-[#2A2426]"
                />
              </div>
            </div>

            {/* Bedrijfsnaam & Telefoon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Bedrijfsnaam of Idee (optioneel)
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="bijv. Studio Glow Rotterdam"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FFF9FB] border border-[#E2CBD3] rounded-xl text-[#2A2426] focus:outline-none focus:border-[#2A2426]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Telefoonnummer (optioneel)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="06 12345678"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FFF9FB] border border-[#E2CBD3] rounded-xl text-[#2A2426] focus:outline-none focus:border-[#2A2426]"
                />
              </div>
            </div>

            {/* Type & Content status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Branche / Soort Onderneming
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FFF9FB] border border-[#E2CBD3] rounded-xl text-[#2A2426] focus:outline-none focus:border-[#2A2426]"
                >
                  <option value="Beauty & Nagelstudio">Beauty, Nagels & Kapper</option>
                  <option value="Bakkerij & Food">Bakkerij, Sweets & Horeca</option>
                  <option value="Mode & Kleding">Mode, Vintage & Boetiek</option>
                  <option value="Coaching & Zzp">Coach, Trainer of Dienst</option>
                  <option value="Overig">Iets anders</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#463D40] mb-1">
                  Heb je al materiaal klaar?
                </label>
                <select
                  value={formData.hasContent}
                  onChange={(e) => setFormData({ ...formData, hasContent: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FFF9FB] border border-[#E2CBD3] rounded-xl text-[#2A2426] focus:outline-none focus:border-[#2A2426]"
                >
                  <option value="Ik heb al foto’s en prijzen">Ja, ik heb foto’s en prijzen</option>
                  <option value="Ben er nog mee bezig">Ik ben er nog mee bezig</option>
                  <option value="Nog niks, graag hulp">Nog niks, ik wil graag meedenken</option>
                </select>
              </div>
            </div>

            {/* Vragen / Wensen */}
            <div>
              <label className="block text-xs font-medium text-[#463D40] mb-1">
                Wat wil je graag op je website? (Diensten, openingstijden, prijzen...)
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Vertel kort wat voor pagina je voor ogen hebt..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#FFF9FB] border border-[#E2CBD3] rounded-xl text-[#2A2426] focus:outline-none focus:border-[#2A2426]"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 text-xs font-semibold text-white bg-[#2A2426] hover:bg-black rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Send size={14} />
              <span>Verstuur Inschrijving</span>
            </button>

            <p className="text-[11px] text-center text-[#786D71]">
              Vrijblijvende aanvraag · Ik stuur je binnenkort een reactie per mail
            </p>
          </form>
        )}
      </div>

      <div className="text-xs text-[#7A6E72]">
        E-mail contact: <a href={`mailto:${data.email}`} className="underline text-[#2A2426]">{data.email}</a> · Rotterdam
      </div>
    </div>
  );
};
