"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';
import { getBrowserLanguage, validateLocale } from './utils';

const LanguageContext = createContext(undefined);

const STORAGE_KEY = 'uywakuna_locale';

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState('es');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize locale from localStorage or browser
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setLocaleState(validateLocale(stored));
      } else {
        const browserLang = getBrowserLanguage();
        setLocaleState(browserLang);
      }
    } catch (error) {
      console.warn('Failed to read locale from localStorage:', error);
      setLocaleState('es');
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Persist locale changes to localStorage
  const setLocale = (newLocale) => {
    const validLocale = validateLocale(newLocale);
    setLocaleState(validLocale);
    
    try {
      localStorage.setItem(STORAGE_KEY, validLocale);
    } catch (error) {
      console.warn('Failed to save locale to localStorage:', error);
    }
  };

  // Translation function
  const t = (key) => {
    return translations[locale]?.[key] || key;
  };

  const value = {
    locale,
    setLocale,
    t,
    isInitialized
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
}
