import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
      >
        <Globe className="h-4 w-4" />
        <span>{currentLanguage.nativeName}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600 transition-colors ${
                i18n.language === language.code ? 'bg-primary-100 text-primary-700 font-medium' : 'text-gray-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{language.nativeName}</span>
                <span className="text-xs text-gray-500">{language.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;