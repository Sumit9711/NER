import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-slate-800 border-2 border-slate-600 rounded-lg p-0.5 text-xs font-bold shadow-sm">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
          language === 'en'
            ? 'bg-blue-600 text-white shadow font-black'
            : 'text-slate-300 hover:text-white'
        }`}
        title="Switch to English"
        aria-label="Switch interface language to English"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>EN</span>
      </button>

      <span className="text-slate-500 px-0.5">|</span>

      <button
        onClick={() => setLanguage('hi')}
        className={`px-2.5 py-1 rounded-md transition-all ${
          language === 'hi'
            ? 'bg-orange-600 text-white shadow font-black'
            : 'text-slate-300 hover:text-white'
        }`}
        title="हिन्दी में बदलें"
        aria-label="Switch interface language to Hindi"
      >
        <span>हिन्दी</span>
      </button>
    </div>
  );
};
