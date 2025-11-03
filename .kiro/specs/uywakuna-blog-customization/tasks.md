# Implementation Plan - Uywakuna Blog

This implementation plan breaks down the transformation of the Stablo template into Uywakuna into discrete, actionable coding tasks. Each task builds incrementally on previous work, ensuring a systematic approach to implementing the bilingual animal blog.

## Task List

- [x] 1. Set up internationalization (i18n) infrastructure
  - Create language context provider with locale state management
  - Implement localStorage persistence for language preference
  - Create translation utility functions for UI strings
  - Add Spanish and French translation files for common UI elements
  - _Requirements: 2.1, 2.2, 2.4, 2.5_

- [x] 2. Update Sanity CMS schemas for bilingual content
  - [x] 2.1 Modify post schema to include Spanish and French fields
    - Add title_es, title_fr, slug_es, slug_fr fields
    - Add excerpt_es, excerpt_fr fields
    - Add body_es, body_fr fields with blockContent type
    - Update preview configuration to show both language titles
    - _Requirements: 3.1, 3.2, 9.2, 9.4_

  - [x] 2.2 Modify category schema for bilingual support
    - Add title_es, title_fr fields
    - Add description_es, description_fr fields
    - Keep shared slug and color fields
    - _Requirements: 3.5, 5.1, 5.2, 5.3_

  - [x] 2.3 Update settings schema with bilingual branding fields
    - Add title_es, title_fr for site name
    - Add tagline_es, tagline_fr fields
    - Add description_es, description_fr for meta descriptions
    - Update logo field configuration
    - _Requirements: 1.1, 1.2, 8.1, 8.2_

  - [x] 2.4 Update author schema with bilingual bio support
    - Add bio_es and bio_fr fields
    - Maintain shared name and image fields
    - _Requirements: 7.3, 9.2_

- [x] 3. Create language selector component
  - [x] 3.1 Build LanguageSelector component with dropdown UI
    - Implement dropdown menu with ES/FR options
    - Add visual indicator for current language
    - Style for both desktop and mobile views
    - Add smooth transition animations
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 3.2 Integrate LanguageSelector into navbar
    - Add component to desktop navigation (right side)
    - Add component to mobile menu
    - Connect to language context
    - _Requirements: 2.1, 2.2_

- [x] 4. Update Sanity GROQ queries for bilingual content
  - Modify postQuery to fetch both language versions
  - Update postsQuery to include all bilingual fields
  - Update categoryQuery for translated category names
  - Modify settingsQuery to fetch bilingual settings
  - Create helper function to filter content by locale
  - _Requirements: 3.2, 5.3, 5.4_

- [x] 5. Implement content localization utilities
  - Create getLocalizedField helper function
  - Implement getLocalizedSlug function for URL generation
  - Build hasTranslation checker function
  - Create getPostContent with fallback logic
  - Add translation availability indicator component
  - _Requirements: 3.2, 3.3, 7.2_

- [x] 6. Update navbar component with Uywakuna branding
  - Replace "Stablo" text with "Uywakuna"
  - Integrate custom logo from /images/logo.png
  - Add tagline display below logo
  - Update menu items with bilingual labels
  - Remove or update external template links
  - _Requirements: 1.1, 1.2, 1.3, 2.3_

- [x] 7. Update footer component with custom branding
  - Change copyright text to "Uywakuna"
  - Remove "Made by Web3Templates" attribution
  - Remove "Purchase Pro" backlink component
  - Add bilingual footer text support
  - Maintain theme switcher functionality
  - _Requirements: 1.5_

- [x] 8. Modify home page to display localized content
  - Update page component to use language context
  - Display post titles and excerpts in selected language
  - Show category names in current locale
  - Implement language-specific featured posts
  - Add category filter with translated labels
  - _Requirements: 3.2, 3.5, 6.1, 6.2, 6.3, 6.5_

- [x] 9. Update post list component for bilingual display
  - Accept and use locale prop
  - Display localized title and excerpt
  - Generate locale-specific post URLs
  - Show translation availability badge
  - Handle missing translations gracefully
  - _Requirements: 3.2, 3.3, 6.2_

- [x] 10. Modify post detail page for localized content
  - [x] 10.1 Update post page to fetch and display locale-specific content
    - Detect locale from context or URL
    - Fetch post with bilingual fields
    - Display title, content, and metadata in selected language
    - Show author information with localized bio
    - Display translated category tags
    - _Requirements: 3.2, 7.1, 7.2, 7.3_

  - [x] 10.2 Add language availability indicator
    - Show available language versions
    - Add links to switch between language versions
    - Display fallback notice when translation missing
    - _Requirements: 3.3, 7.2_

  - [x] 10.3 Implement related posts in current language
    - Filter related posts by locale
    - Display localized titles and excerpts
    - _Requirements: 7.4_

- [x] 11. Update archive page for bilingual support
  - Display page title in selected language
  - Show posts with localized content
  - Implement pagination with locale-aware URLs
  - Add category filter with translated names
  - _Requirements: 3.2, 6.4_

- [x] 12. Modify contact page with bilingual form labels
  - Translate form field labels based on locale
  - Update success/error messages for both languages
  - Translate page heading and description
  - _Requirements: 2.3_

- [x] 13. Implement SEO metadata for bilingual content
  - [x] 13.1 Add language-specific meta tags to layout
    - Generate title and description per locale
    - Add hreflang tags for alternate languages
    - Implement canonical URLs with locale
    - Add Open Graph tags with language attributes
    - _Requirements: 8.1, 8.2, 8.4_

  - [x] 13.2 Create structured data for articles
    - Generate Article schema with inLanguage property
    - Add author and publisher information
    - Include image and date metadata
    - _Requirements: 8.3_

  - [x] 13.3 Update sitemap configuration for multiple locales
    - Configure next-sitemap with language alternates
    - Generate separate sitemaps for ES and FR
    - Add hreflang annotations
    - _Requirements: 8.1_

- [x] 14. Customize Tailwind theme with Uywakuna colors
  - Add primary green color palette (nature theme)
  - Add accent yellow/orange colors
  - Update component styles to use new colors
  - Ensure colors work in dark mode
  - Test contrast ratios for accessibility
  - _Requirements: 4.1, 4.2, 4.4_

- [x] 15. Integrate and optimize custom logo
  - Copy logo from /images/logo.png to /public/img/
  - Optimize logo file size (convert to WebP if needed)
  - Implement responsive logo sizing
  - Add dark mode logo variant if necessary
  - Update alt text for accessibility
  - _Requirements: 1.3, 4.3_

- [x] 16. Configure Sanity Studio for content management
  - Update studio configuration with new schemas
  - Organize fields into logical fieldsets
  - Add helpful descriptions for bilingual fields
  - Configure preview panes for both languages
  - Set up validation rules for required translations
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 17. Implement responsive design optimizations
  - Test and adjust mobile layout for language selector
  - Optimize logo display on small screens
  - Ensure bilingual content displays properly on mobile
  - Test navigation menu on various screen sizes
  - Verify touch interactions work correctly
  - _Requirements: 10.1, 10.2_

- [x] 18. Add performance optimizations
  - Implement lazy loading for below-fold images
  - Optimize image formats (WebP/AVIF)
  - Configure ISR revalidation timing
  - Minimize translation file sizes
  - Test and optimize bundle size
  - _Requirements: 10.3, 10.5_

- [x] 19. Create environment configuration
  - Set up .env.local with required variables
  - Configure Sanity project ID and dataset
  - Add site URL and default locale settings
  - Document all environment variables
  - _Requirements: 9.5_

- [x] 20. Implement error boundaries and fallbacks
  - Add error boundary for language context failures
  - Create fallback UI for missing translations
  - Handle Sanity connection errors gracefully
  - Add user-friendly error messages in both languages
  - _Requirements: 3.3_

- [x] 21. Create content editor documentation
  - Write guide for adding bilingual posts
  - Document category creation process
  - Explain settings configuration
  - Provide translation workflow guidelines
  - _Requirements: 9.1, 9.2_

- [x] 22. Set up analytics and monitoring
  - Integrate analytics tracking (Google Analytics or alternative)
  - Track language preference selections
  - Monitor page load performance
  - Set up error logging service
  - _Requirements: 10.3_

- [x] 23. Final integration and testing
  - Verify all components work together
  - Test language switching across all pages
  - Validate SEO metadata in both languages
  - Check responsive design on multiple devices
  - Test with actual content in Spanish and French
  - Verify logo displays correctly in all contexts
  - _Requirements: All_

## Notes

- Tasks marked with * are optional and can be skipped for faster MVP delivery
- Each task should be completed and tested before moving to the next
- The requirements document and design document should be referenced during implementation
- Sanity Studio changes require redeployment to take effect
- Test in development environment before deploying to production
