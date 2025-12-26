/**
 * Schema.org JSON-LD generators for SEO
 * Generates structured data for better search engine understanding
 */

import { urlForImage } from "@/lib/sanity/image";

/**
 * Generates Article schema for blog posts
 * @see https://schema.org/Article
 */
export function generateArticleSchema(post: any, locale: string = 'es') {
  if (!post) return null;

  const title = post[`title_${locale}`] || post.title_es || post.title_fr;
  const excerpt = post[`excerpt_${locale}`] || post.excerpt_es || post.excerpt_fr;
  const slug = post[`slug_${locale}`]?.current || post.slug_es?.current;

  const imageUrl = post.mainImage?.asset
    ? urlForImage(post.mainImage)?.src
    : 'https://uywakuna.info/img/opengraph.jpg';

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": excerpt,
    "image": imageUrl,
    "datePublished": post.publishedAt || post._createdAt,
    "dateModified": post._updatedAt || post.publishedAt || post._createdAt,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Uywakuna Team",
      "url": "https://uywakuna.info/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Uywakuna",
      "description": "Blog éducatif sur la faune et la biodiversité",
      "logo": {
        "@type": "ImageObject",
        "url": "https://uywakuna.info/img/logo.png",
        "width": 600,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://uywakuna.info/post/${slug}`
    },
    "articleSection": post.categories?.[0]?.[`title_${locale}`] || post.categories?.[0]?.title_es,
    "keywords": post.categories?.map((cat: any) =>
      cat[`title_${locale}`] || cat.title_es
    ).join(", "),
    "inLanguage": locale === 'fr' ? 'fr-FR' : 'es-ES'
  };
}

/**
 * Generates Organization schema for homepage
 * @see https://schema.org/Organization
 */
export function generateOrganizationSchema(settings: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Uywakuna",
    "description": "Blog éducatif bilingue (ES/FR) sur la faune et la biodiversité d'Amérique du Sud",
    "url": "https://uywakuna.info",
    "logo": {
      "@type": "ImageObject",
      "url": settings?.logo ? urlForImage(settings.logo)?.src : "https://uywakuna.info/img/logo.png"
    },
    "sameAs": [
      "https://github.com/hayka-pacha/uywakuna"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": settings?.email || "contact@uywakuna.info",
      "contactType": "Customer Support",
      "availableLanguage": ["Spanish", "French"]
    }
  };
}

/**
 * Generates BreadcrumbList schema
 * @see https://schema.org/BreadcrumbList
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * Generates FAQPage schema
 * @see https://schema.org/FAQPage
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generates WebSite schema with search action
 * @see https://schema.org/WebSite
 */
export function generateWebSiteSchema(settings: any) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Uywakuna",
    "description": settings?.description_es || "Tu zoológico virtual",
    "url": "https://uywakuna.info",
    "inLanguage": ["es-ES", "fr-FR"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://uywakuna.info/archive?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}
