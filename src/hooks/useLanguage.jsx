import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../data/translations/en';
import { hi } from '../data/translations/hi';

const LANGUAGE_STORAGE_KEY = 'ner_command_center_language';

const translations = {
  en,
  hi
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored === 'en' || stored === 'hi') {
        return stored;
      }
    } catch (e) {
      console.warn('Could not read language preference:', e);
    }
    return 'en';
  });

  const setLanguage = (lang) => {
    if (lang === 'en' || lang === 'hi') {
      setLanguageState(lang);
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      } catch (e) {
        console.warn('Could not store language preference:', e);
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  /**
   * Helper to retrieve nested translation keys, e.g. t('nav.dashboard') or t('header.portalTitle')
   */
  const t = (key, fallback = '') => {
    if (!key) return fallback;
    const keys = key.split('.');
    let current = translations[language];

    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        // Fallback to English dictionary if key missing in current language
        let fallbackCurrent = translations.en;
        for (const fk of keys) {
          if (fallbackCurrent && typeof fallbackCurrent === 'object' && fk in fallbackCurrent) {
            fallbackCurrent = fallbackCurrent[fk];
          } else {
            return fallback || key;
          }
        }
        return fallbackCurrent || fallback || key;
      }
    }

    return typeof current === 'string' ? current : fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
