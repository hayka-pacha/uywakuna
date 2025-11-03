// Main export file for i18n functionality
export { LanguageProvider, useLanguage } from './context';
export { translations } from './translations';
export {
  getLocalizedField,
  getLocalizedSlug,
  hasTranslation,
  getPostContent,
  getBrowserLanguage,
  validateLocale
} from './utils';
