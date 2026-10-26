import React, { useState } from 'react';
import { X, Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ADMIN_PASSWORD = 'Instagramfashionaccount';

export const PasswordPromptModal: React.FC<PasswordPromptModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError('');
      setPassword('');
      onSuccess();
    } else {
      setError('Onjuist wachtwoord. Probeer het opnieuw.');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-[#E4D9D0] p-6 text-left space-y-4">
        
        <div className="flex items-center justify-between border-b border-[#F0E6DE] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F0EBE5] text-[#2A2426] flex items-center justify-center">
              <Lock size={15} />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2A2426]">
              Beheerpaneel Toegang
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-[#786D71] hover:text-[#2A2426] rounded-md cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-[#665B5F] leading-relaxed">
          Voer het beheerderswachtwoord in om teksten, foto's en websites te bewerken.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="Wachtwoord invoeren..."
              autoFocus
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#DDD0C6] rounded-xl text-[#2A2426] focus:outline-none focus:border-[#2A2426] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-[#8A7D82] hover:text-[#2A2426] cursor-pointer"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {error && (
            <p className="text-[11px] text-red-500 font-medium">
              {error}
            </p>
          )}

          <div className="pt-1 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-3.5 py-2 text-xs font-medium text-[#665B5F] hover:text-[#2A2426] rounded-lg cursor-pointer"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#2A2426] hover:bg-black rounded-xl transition-colors cursor-pointer"
            >
              Inloggen
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
