// Utility functions for internationalization

/**
 * Get a localized field from an object
 * @param {Object} object - The object containing localized fields
 * @param {string} fieldName - The base field name (without locale suffix)
 * @param {string} locale - The locale code ('es' or 'fr')
 * @returns {string} The localized field value or empty string
 */
export function getLocalizedField(object, fieldName, locale) {
  if (!object) return '';
  
  const localizedField = `${fieldName}_${locale}`;
  return object[localizedField] || object[fieldName] || '';
}

/**
 * Get a localized slug from a post object
 * @param {Object} post - The post object
 * @param {string} locale - The locale code ('es' or 'fr')
 * @returns {string} The localized slug or default slug
 */
export function getLocalizedSlug(post, locale) {
  if (!post) return '';
  
  const slugField = `slug_${locale}`;
  return post[slugField]?.current || post.slug?.current || '';
}

/**
 * Check if a translation exists for a given locale
 * @param {Object} object - The object to check
 * @param {string} locale - The locale code ('es' or 'fr')
 * @returns {boolean} True if translation exists
 */
export function hasTranslation(object, locale) {
  if (!object) return false;
  
  const titleField = `title_${locale}`;
  return !!object[titleField];
}

/**
 * Get post content with fallback logic
 * @param {Object} post - The post object
 * @param {string} locale - The preferred locale
 * @returns {Object} Content object with isFallback flag
 */
export function getPostContent(post, locale) {
  if (!post) return null;
  
  // Check if content exists in requested locale
  if (hasTranslation(post, locale)) {
    return {
      title: getLocalizedField(post, 'title', locale),
      excerpt: getLocalizedField(post, 'excerpt', locale),
      body: post[`body_${locale}`],
      slug: getLocalizedSlug(post, locale),
      isFallback: false,
      locale: locale
    };
  }
  
  // Fallback to other language
  const fallbackLocale = locale === 'es' ? 'fr' : 'es';
  if (hasTranslation(post, fallbackLocale)) {
    return {
      title: getLocalizedField(post, 'title', fallbackLocale),
      excerpt: getLocalizedField(post, 'excerpt', fallbackLocale),
      body: post[`body_${fallbackLocale}`],
      slug: getLocalizedSlug(post, fallbackLocale),
      isFallback: true,
      fallbackLocale: fallbackLocale,
      locale: fallbackLocale
    };
  }
  
  // No translation available
  return null;
}

/**
 * Get browser's preferred language
 * @returns {string} 'es' or 'fr', defaults to 'es'
 */
export function getBrowserLanguage() {
  if (typeof window === 'undefined') return 'es';
  
  const browserLang = navigator.language || navigator.userLanguage;
  
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('es')) return 'es';
  
  // Default to Spanish
  return 'es';
}

/**
 * Validate locale code
 * @param {string} locale - The locale to validate
 * @returns {string} Valid locale ('es' or 'fr')
 */
export function validateLocale(locale) {
  return ['es', 'fr'].includes(locale) ? locale : 'es';
}
