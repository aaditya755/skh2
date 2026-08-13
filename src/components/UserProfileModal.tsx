import React, { useState } from 'react';
import { X, User, Phone, MapPin, MessageCircle, MessageSquare, Bell, CheckCircle2, ShieldCheck, Save, Globe } from 'lucide-react';
import { Role, Language } from '../types';
import { translations } from '../i18n/translations';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  role,
  lang,
  onLanguageChange,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const isFarmer = role === 'farmer';

  // Profile Form State
  const [fullName, setFullName] = useState(isFarmer ? 'Rajesh Kadam' : 'Sahil Bhonsle');
  const [phone, setPhone] = useState('+91 98220 12345');
  const [village, setVillage] = useState(isFarmer ? 'Narayangaon, Junnar, Pune' : 'Sahyadri Cold Hub, Nashik');
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-[#E2E9E2] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#0C3830] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DCEBBA] text-[#0C3830] flex items-center justify-center font-black text-sm shadow-md shrink-0">
              {isFarmer ? 'RK' : 'SB'}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                {lang === 'hi' ? 'प्रोफ़ाइल और सूचना प्राथमिकताएं' : lang === 'mr' ? 'प्रोफाइल आणि सूचना सेटिंग्ज' : 'Profile & Alert Settings'}
              </h3>
              <p className="text-xs text-[#DCEBBA] font-medium">
                {lang === 'hi' ? 'WhatsApp और SMS सूचनाओं के लिए अपना संपर्क अपडेट करें' : lang === 'mr' ? 'व्हॉट्सॲप आणि एसएमएस अलर्टसाठी संपर्क अपडेट करा' : 'Update phone number for WhatsApp & SMS cold-chain alerts'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {savedSuccess && (
            <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-extrabold animate-in fade-in duration-200">
              <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
              <span>
                {lang === 'hi'
                  ? 'प्रोफ़ाइल और सूचना सेटिंग्स सफलतापूर्वक सहेजी गईं!'
                  : lang === 'mr'
                  ? 'प्रोफाइल आणि सूचना प्राधान्ये यशस्वीरित्या जतन केली!'
                  : 'Profile and notification preferences saved successfully!'}
              </span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-extrabold text-[#1A2D27] uppercase tracking-wider mb-1.5">
              {lang === 'hi' ? 'पूरा नाम' : lang === 'mr' ? 'पूर्ण नाव' : 'Full Name'}
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-3 text-gray-400" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F4] border border-[#E2E9E2] rounded-2xl text-xs sm:text-sm font-semibold text-[#1A2D27] focus:outline-none focus:ring-2 focus:ring-[#0C3830]"
              />
            </div>
          </div>

          {/* Mobile Phone Number (WhatsApp / SMS alerts) */}
          <div>
            <label className="block text-xs font-extrabold text-[#1A2D27] uppercase tracking-wider mb-1.5">
              {lang === 'hi' ? 'मोबाइल नंबर (WhatsApp और SMS के लिए)' : lang === 'mr' ? 'मोबाईल नंबर (व्हॉट्सॲप आणि एसएमएससाठी)' : 'Mobile Phone Number (WhatsApp & SMS)'}
            </label>
            <div className="relative">
              <Phone size={18} className="absolute left-3.5 top-3 text-gray-400" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98220 12345"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F4] border border-[#E2E9E2] rounded-2xl text-xs sm:text-sm font-semibold text-[#1A2D27] focus:outline-none focus:ring-2 focus:ring-[#0C3830]"
              />
            </div>
            <p className="text-[11px] text-[#5C736A] font-medium mt-1">
              {lang === 'hi'
                ? 'तापमान उल्लंघन और फसल खराब होने की सीधी चेतावनी इस नंबर पर भेजी जाएगी।'
                : lang === 'mr'
                ? 'तापमान वाढ आणि पीक नासाडीचे तातडीचे अलर्ट या नंबरवर पाठवले जातील.'
                : 'Spoilage risk and temperature breach alerts will be delivered directly to this number.'}
            </p>
          </div>

          {/* Location / Village */}
          <div>
            <label className="block text-xs font-extrabold text-[#1A2D27] uppercase tracking-wider mb-1.5">
              {lang === 'hi' ? 'गाँव / कोल्ड स्टोरेज का पता' : lang === 'mr' ? 'गाव / ठिकाण पत्ता' : 'Village / Location Address'}
            </label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3.5 top-3 text-gray-400" />
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F4] border border-[#E2E9E2] rounded-2xl text-xs sm:text-sm font-semibold text-[#1A2D27] focus:outline-none focus:ring-2 focus:ring-[#0C3830]"
              />
            </div>
          </div>

          {/* Preferred Portal Language */}
          <div>
            <label className="block text-xs font-extrabold text-[#1A2D27] uppercase tracking-wider mb-1.5">
              {lang === 'hi' ? 'पसंदीदा भाषा' : lang === 'mr' ? 'पसंतीची भाषा' : 'Preferred App Language'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { code: 'en', label: 'English' },
                  { code: 'hi', label: 'हिंदी' },
                  { code: 'mr', label: 'मराठी' },
                ] as const
              ).map((l) => (
                <button
                  type="button"
                  key={l.code}
                  onClick={() => onLanguageChange(l.code)}
                  className={`py-2 px-3 rounded-2xl text-xs font-extrabold border transition-all ${
                    lang === l.code
                      ? 'bg-[#0C3830] text-white border-[#0C3830] shadow-2xs'
                      : 'bg-white text-gray-700 border-[#E2E9E2] hover:bg-gray-50'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Alert Channel Toggles */}
          <div className="pt-2 border-t border-[#E2E9E2] space-y-3">
            <h4 className="text-xs font-extrabold text-[#1A2D27] uppercase tracking-wider">
              {lang === 'hi' ? 'सूचना चैनल सेटिंग्स' : lang === 'mr' ? 'सूचना चॅनेल प्राधान्ये' : 'Alert Channel Preferences'}
            </h4>

            {/* WhatsApp Alerts Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-[#F4F6F4] border border-[#E2E9E2] rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-[#1A2D27] block">
                    {lang === 'hi' ? 'WhatsApp चेतावनी संदेश' : lang === 'mr' ? 'व्हॉट्सॲप अलर्ट संदेश' : 'WhatsApp Instant Alerts'}
                  </span>
                  <span className="text-[10px] text-[#5C736A] font-medium">
                    {lang === 'hi' ? 'तापमान वृद्धि पर तुरंत WhatsApp संदेश पाएं' : lang === 'mr' ? 'तापमान वाढीवर तात्काळ व्हॉट्सॲप मेसेज मिळवा' : 'Receive instant status & temp breach reports via WhatsApp'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={whatsappAlerts}
                onClick={() => setWhatsappAlerts(!whatsappAlerts)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  whatsappAlerts ? 'bg-emerald-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                    whatsappAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* SMS Emergency Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-[#F4F6F4] border border-[#E2E9E2] rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-800 rounded-xl">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-[#1A2D27] block">
                    {lang === 'hi' ? 'SMS आपत्कालीन अलर्ट' : lang === 'mr' ? 'एसएमएस आपत्कालीन अलर्ट' : 'SMS Critical Risk Alerts'}
                  </span>
                  <span className="text-[10px] text-[#5C736A] font-medium">
                    {lang === 'hi' ? 'बिना इंटरनेट के भी SMS अलर्ट पाएं' : lang === 'mr' ? 'इंटरनेट नसतानाही एसएमएस द्वारे इशारा मिळावा' : 'Receive SMS warnings even when offline'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={smsAlerts}
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  smsAlerts ? 'bg-[#0C3830]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                    smsAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#0C3830] text-white rounded-2xl font-extrabold text-sm hover:bg-[#082822] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save size={16} />
              <span>{lang === 'hi' ? 'प्रोफ़ाइल सहेजें' : lang === 'mr' ? 'प्रोफाइल सेव्ह करा' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
