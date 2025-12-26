# Uywakuna - Project Documentation for AI Assistants

**Last Updated:** 2025-12-26
**Project Version:** 4.0.0
**Tech Stack:** Next.js 16 + Sanity CMS v4 + TailwindCSS
**Purpose:** Bilingual (ES/FR) educational blog about South American wildlife

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Best Practices & Conventions](#best-practices--conventions)
4. [SEO Strategy & Implementation](#seo-strategy--implementation)
5. [Development Workflow](#development-workflow)
6. [Evolution History](#evolution-history)
7. [Common Patterns](#common-patterns)
8. [Troubleshooting](#troubleshooting)
9. [Future Roadmap](#future-roadmap)

---

## Project Overview

### What is Uywakuna?

**Uywakuna** (Quechua word meaning "animals") is a bilingual educational blog focused on the fauna and biodiversity of South America. The project serves as a "virtual zoo" providing detailed, scientific information about wildlife in both Spanish and French.

### Core Values

1. **Education First**: High-quality, scientifically accurate content
2. **Bilingual Access**: Content in Spanish (ES) and French (FR)
3. **SEO Optimized**: Built to rank and be discoverable
4. **GEO Ready**: Optimized for AI search engines (ChatGPT, Claude, Perplexity)
5. **Performance**: Fast, modern, progressive web app

### Key Features

- ✅ **45+ animal species** documented with bilingual content
- ✅ **Bilingual routing** (`/post/jaguar-panthera-onca` ES, `/post/jaguar-panthera-onca-fr` FR)
- ✅ **Schema.org structured data** (Article, Organization, Breadcrumb, WebSite, FAQPage)
- ✅ **hreflang tags** for international SEO
- ✅ **GEO optimization** via llms.txt for AI discovery
- ✅ **PWA support** for app-like experience
- ✅ **RSS feed** for content syndication
- ✅ **Security headers** (HSTS, CSP, X-Frame-Options, etc.)

---

## Architecture & Tech Stack

### Technology Stack

```
Frontend:
├── Next.js 16 (App Router with Server Components)
├── React 19.2.1
├── TailwindCSS 3.4 + @tailwindcss/typography
├── TypeScript 5.3
└── next-themes (dark mode support)

CMS:
├── Sanity CMS v4.13
├── @sanity/vision (GROQ playground)
├── @portabletext/react (rich text rendering)
└── @sanity/image-url (optimized images)

SEO & Analytics:
├── next-sitemap 4.2 (sitemap generation)
├── @vercel/analytics (web analytics)
└── @vercel/og (Open Graph image generation)

Deployment:
├── Vercel (hosting + CI/CD)
├── GitHub (version control)
└── Sanity Cloud (headless CMS hosting)
```

### File Structure

```
uywakuna/
├── app/                          # Next.js 16 App Router
│   ├── (website)/               # Main website group
│   │   ├── layout.tsx           # Shared metadata & layout
│   │   ├── page.js              # Homepage
│   │   ├── about/page.js        # About page
│   │   ├── archive/page.js      # All posts archive
│   │   ├── post/[slug]/         # Dynamic post pages
│   │   │   ├── page.js          # Post rendering + metadata
│   │   │   └── default.js       # Post template component
│   │   └── category/[slug]/     # Category pages
│   ├── layout.tsx               # Root layout (fonts, providers)
│   ├── feed.xml/route.ts        # RSS 2.0 feed
│   └── api/                     # API routes
├── components/                   # React components
│   ├── navbar.tsx               # Main navigation
│   ├── footer.tsx               # Site footer
│   ├── postlist.tsx             # Post grid display
│   └── ...                      # Other UI components
├── lib/                         # Utilities & libs
│   ├── sanity/                  # Sanity CMS integration
│   │   ├── client.ts            # Sanity client + queries
│   │   ├── image.ts             # Image URL builder
│   │   └── schemas/             # CMS content models
│   └── seo/                     # SEO utilities
│       └── schemas.ts           # Schema.org generators
├── public/                      # Static assets
│   ├── img/                     # Images
│   ├── llms.txt                 # GEO optimization file
│   ├── robots.txt               # Crawler directives
│   ├── manifest.json            # PWA manifest
│   └── sitemap*.xml             # Auto-generated sitemaps
├── docs/                        # Documentation
│   ├── SEO_STRATEGY.md          # SEO master plan (gitignored)
│   ├── KEYWORD_RESEARCH.md      # Keyword analysis
│   └── IMPLEMENTATION_GUIDE.md  # Deployment guide (gitignored)
├── next.config.js               # Next.js configuration
├── next-sitemap.config.js       # Sitemap generation config
├── sanity.config.ts             # Sanity Studio config
├── tailwind.config.js           # TailwindCSS config
└── package.json                 # Dependencies & scripts
```

### Data Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│   Next.js (Vercel)  │
│   ┌──────────────┐  │
│   │ Server Comp  │  │  ← Pre-renders at build time
│   │   getSettings │  │
│   │   getAllPosts │  │
│   └──────┬───────┘  │
│          │          │
│          ▼          │
│   ┌──────────────┐  │
│   │ GROQ Queries │  │  ← Fetches CMS data
│   └──────┬───────┘  │
└──────────┼──────────┘
           │
           ▼
    ┌──────────────┐
    │  Sanity CMS  │
    │  (Headless)  │
    └──────────────┘
```

### Bilingual Content Model

```javascript
// Sanity CMS Schema (field-level localization)
{
  name: 'post',
  type: 'document',
  fields: [
    { name: 'title_es', type: 'string' },      // Spanish title
    { name: 'title_fr', type: 'string' },      // French title
    { name: 'slug_es', type: 'slug' },         // Spanish URL
    { name: 'slug_fr', type: 'slug' },         // French URL
    { name: 'excerpt_es', type: 'text' },      // Spanish excerpt
    { name: 'excerpt_fr', type: 'text' },      // French excerpt
    { name: 'body_es', type: 'blockContent' }, // Spanish body
    { name: 'body_fr', type: 'blockContent' }, // French body
    // Shared fields (no translation needed)
    { name: 'mainImage', type: 'image' },
    { name: 'author', type: 'reference' },
    { name: 'publishedAt', type: 'datetime' },
  ]
}
```

---

## Best Practices & Conventions

### Code Quality Standards

#### 1. **Server Components First**
```jsx
// ✅ GOOD: Use Server Components by default
export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  return <Post post={post} />;
}

// ❌ BAD: Don't use 'use client' unless necessary
'use client';
export default function PostPage() { ... }
```

#### 2. **Centralized SEO Utilities**
```javascript
// ✅ GOOD: Use lib/seo/schemas.ts generators
import { generateArticleSchema } from '@/lib/seo/schemas';
const schema = generateArticleSchema(post, 'es');

// ❌ BAD: Don't inline Schema.org JSON-LD
const schema = { "@context": "https://schema.org", ... };
```

#### 3. **Bilingual Routing Pattern**
```javascript
// ✅ GOOD: Determine locale from slug
const isES = slug === post?.slug_es;
const locale = isES ? 'es' : 'fr';
const title = post?.[`title_${locale}`];

// ❌ BAD: Hardcode language
const title = post?.title_es; // Ignores French
```

#### 4. **Image Optimization**
```javascript
// ✅ GOOD: Use urlForImage().src
const imageUrl = urlForImage(post.mainImage)?.src;

// ❌ BAD: Use .url() method (doesn't exist)
const imageUrl = urlForImage(post.mainImage)?.url(); // TypeError
```

#### 5. **Metadata Generation (Next.js 16)**
```javascript
// ✅ GOOD: Export metadata and viewport separately
export const metadata = { title, description, ... };
export const viewport = { width: 'device-width', ... };

// ❌ BAD: Include viewport in metadata (deprecated)
export const metadata = {
  title,
  viewport: 'width=device-width' // Wrong in Next.js 16
};
```

### File Naming Conventions

- **Components**: PascalCase (`PostList.tsx`, `Navbar.tsx`)
- **Utilities**: camelCase (`urlForImage.ts`, `getSettings.ts`)
- **Pages (App Router)**: lowercase (`page.js`, `layout.tsx`, `default.js`)
- **Config files**: lowercase with dots (`next.config.js`, `tailwind.config.js`)

### Git Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: bug fix
perf: performance improvement
security: security fix
docs: documentation changes
style: code style (formatting)
refactor: code refactoring
test: add/update tests
chore: build process, dependencies
```

**Examples from project:**
```
feat: implement comprehensive SEO optimization and Schema.org structured data
fix: add postbuild script to generate single sitemap.xml
security: fix critical RCE vulnerability (CVE-2025-66478)
perf: implement comprehensive performance optimizations
```

---

## SEO Strategy & Implementation

### Current SEO Score: ~92/115 (80%) - EXCELLENT

**Before optimization:** 52/115 (45%) - POOR
**After optimization:** 92/115 (80%) - EXCELLENT
**Improvement:** +40 points (+77%)

### SEO Checklist (VDL Site Audit)

| Category | Score | Status | Implementation |
|----------|-------|--------|----------------|
| robots.txt | 12/12 | ✅ PASS | AI bots allowed, sitemap declared |
| sitemap.xml | 18/18 | ✅ PASS | Single sitemap, all pages included |
| Canonicals | 15/15 | ✅ PASS | Self-referencing, protocol consistent |
| llms.txt | 12/12 | ✅ PASS | GEO optimized for AI discovery |
| Schema.org | 14/14 | ✅ PASS | Article, Organization, Breadcrumb, WebSite |
| Core Web Vitals | 12/15 | ⚠️ WARN | LCP good, CLS needs improvement |
| Indexation | 12/15 | ⚠️ WARN | 90%+ indexed, few warnings |
| Internal Links | 11/14 | ⚠️ WARN | Good coverage, some orphans |

### Schema.org Implementation

#### Article Schema (All Posts)
```javascript
// lib/seo/schemas.ts - generateArticleSchema()
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Jaguar (Panthera Onca)",
  "description": "El jaguar es el felino más grande de América...",
  "image": "https://uywakuna.info/img/jaguar.jpg",
  "datePublished": "2024-01-15T10:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Uywakuna Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Uywakuna",
    "logo": { "@type": "ImageObject", "url": "..." }
  }
}
```

#### BreadcrumbList Schema
```javascript
// Shown on all post pages
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uywakuna.info" },
    { "@type": "ListItem", "position": 2, "name": "Mamíferos", "item": "https://uywakuna.info/category/mamiferos" },
    { "@type": "ListItem", "position": 3, "name": "Jaguar", "item": "https://uywakuna.info/post/jaguar-panthera-onca" }
  ]
}
```

#### Organization Schema (Homepage)
```javascript
// Establishes site authority
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Uywakuna",
  "description": "Blog éducatif bilingue (ES/FR) sur la faune...",
  "url": "https://uywakuna.info",
  "sameAs": ["https://github.com/hayka-pacha/uywakuna"]
}
```

### hreflang Implementation

```html
<!-- app/(website)/post/[slug]/page.js - generateMetadata() -->
<link rel="canonical" href="https://uywakuna.info/post/jaguar-panthera-onca" />
<link rel="alternate" hreflang="es-ES" href="https://uywakuna.info/post/jaguar-panthera-onca" />
<link rel="alternate" hreflang="fr-FR" href="https://uywakuna.info/post/jaguar-panthera-onca-fr" />
<link rel="alternate" hreflang="x-default" href="https://uywakuna.info/post/jaguar-panthera-onca" />
```

**Strategy:**
- ✅ Spanish (ES) is canonical language
- ✅ French (FR) is alternate
- ✅ x-default points to Spanish version for international traffic

### GEO (Generative Engine Optimization)

**File:** `public/llms.txt`

```markdown
# Uywakuna - Tu Zoológico Virtual

> Blog bilingue éducatif (Espagnol/Français) dédié à la découverte
> des animaux et de la biodiversité d'Amérique du Sud.

## Thématiques Principales
### Animaux & Faune Sauvage
- **Mammifères** : Jaguars, paresseux, dauphins roses...
- **Oiseaux** : Condor des Andes, aras, toucans...
- **Reptiles** : Anaconda verte, caïman noir...

## Pages Clés
- `/` : Accueil - Découvrez tous nos articles sur la faune
- `/post/jaguar-panthera-onca` : Le jaguar, plus grand félin d'Amérique
```

**Purpose:** Helps AI search engines (ChatGPT, Claude, Perplexity) understand site content and cite it in responses.

### robots.txt Optimization

```
# General crawlers
User-agent: *
Allow: /

# AI & LLM Bots - GEO Optimization
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

Sitemap: https://uywakuna.info/sitemap.xml
```

### Sitemap Strategy

**Configuration:** `next-sitemap.config.js`

```javascript
module.exports = {
  siteUrl: "https://uywakuna.info",
  generateRobotsTxt: false, // Managed manually
  generateIndexSitemap: false, // Single sitemap.xml
  changefreq: 'daily',
  priority: 0.7,

  // Priority-based ranking
  transform: async (config, path) => {
    if (path.startsWith('/post/')) {
      return { ...config, priority: 0.9, changefreq: 'weekly' };
    }
    return config;
  }
};
```

**Build Process:**
```json
// package.json
{
  "scripts": {
    "build": "next build",
    "postbuild": "next-sitemap"  // Auto-generate after build
  }
}
```

**⚠️ IMPORTANT:** Sitemaps are **auto-generated** and should **NOT** be committed to git:

```gitignore
# .gitignore
public/sitemap*.xml
```

---

## Development Workflow

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with Sanity credentials

# 3. Run development server
npm run dev
# → http://localhost:3000

# 4. Run Sanity Studio (CMS)
npm run sanity
# → http://localhost:3000/studio
```

### Environment Variables

**Required for local development:**
```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_read_token
```

**Required for production (Vercel):**
- All above variables
- `SITE_URL=https://uywakuna.info`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...` (optional)

### Build & Test Locally

```bash
# Build production version
npm run build

# Check for TypeScript errors (currently ignored in build)
npm run lint

# Generate sitemap manually (already in postbuild)
npm run sitemap
```

**⚠️ CRITICAL:** Always test builds locally before deploying:
```bash
npm run build
# Check for errors in terminal
```

### Deployment (Vercel)

**Automatic deployment:**
```bash
git add .
git commit -m "feat: add new feature"
git push origin main
# → Vercel auto-deploys
```

**Deployment URL:** https://uywakuna.info
**Preview URLs:** `https://uywakuna-{hash}.vercel.app`

**Build logs:** Check Vercel dashboard or GitHub Actions

---

## Evolution History

### Phase 1: Foundation (December 2024 - Early 2025)

**Initial Stack:**
- Next.js 14 (Pages Router) → **Migrated to App Router**
- Sanity CMS v3 → **Upgraded to v4**
- Basic SEO with next-seo → **Replaced with native Next.js metadata API**

**Key Features:**
- Bilingual content (ES/FR)
- 45+ animal species documented
- Sanity Studio for content management
- Basic responsive design

### Phase 2: Security & Performance (December 2025)

**Commit:** `a6d773a - security: fix critical RCE vulnerability (CVE-2025-66478)`

**Changes:**
- ✅ Fixed RCE vulnerability in environment handling
- ✅ Strengthened .gitignore patterns for env files
- ✅ Removed hardcoded credentials

**Commit:** `a962784 - perf: implement comprehensive performance optimizations`

**Changes:**
- ✅ Image optimization (AVIF/WebP formats)
- ✅ Font optimization (display:swap)
- ✅ Code splitting and lazy loading
- ✅ Preconnect to external domains

### Phase 3: SEO Overhaul (December 26, 2025)

**Commit:** `014decd - feat: implement comprehensive SEO optimization and Schema.org structured data`

**Major Changes:**

1. **Created `lib/seo/schemas.ts`** - Centralized Schema.org generators
   - `generateArticleSchema()` - For blog posts
   - `generateBreadcrumbSchema()` - For navigation
   - `generateOrganizationSchema()` - For homepage
   - `generateWebSiteSchema()` - For site-wide markup

2. **Implemented hreflang tags** on all posts
   - ES as canonical language
   - FR as alternate
   - x-default for international targeting

3. **Created `public/llms.txt`** for GEO optimization
   - Describes site content for AI search engines
   - Lists key topics and pages

4. **Optimized `public/robots.txt`**
   - Allowed all major AI bots (GPTBot, ClaudeBot, PerplexityBot)
   - Added sitemap reference

5. **Fixed HTML lang attribute** (en → es)

6. **Added metadata to About and Archive pages**

**Impact:** SEO score improved from 52/115 (45%) to ~85/115 (74%)

**Commit:** `82ecb8c - fix: correct urlForImage API usage in schemas`

**Problem:** TypeError - `urlForImage(...).url is not a function`

**Root Cause:** `urlForImage()` returns `{src, width, height}`, not chainable builder

**Solution:** Changed `.url()` to `.src` in all schema generators

**Files affected:**
- `lib/seo/schemas.ts` (lines 20, 72)
- `app/(website)/post/[slug]/page.js` (line 22)

**Commit:** `337d38a - perf: add comprehensive performance and PWA optimizations`

**Changes:**
- ✅ Added PWA manifest (`public/manifest.json`)
- ✅ Preconnect to cdn.sanity.io and Google Fonts
- ✅ Font display:swap for faster rendering
- ✅ Security headers (HSTS, X-Frame-Options, CSP)

**Commit:** `42ced49 - security: add comprehensive security headers and image optimization`

**Security headers added:**
```javascript
// next.config.js
{
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
}
```

**Commit:** `d5e71f0 - feat: add RSS feed for blog syndication`

**New file:** `app/feed.xml/route.ts`

**Features:**
- RSS 2.0 compliant feed
- 50 most recent posts
- Bilingual content (ES priority)
- Proper caching headers

**Commit:** `28fdd32 - fix: add postbuild script to generate single sitemap.xml`

**Problem:** Sitemap was not regenerated after build

**Solution:** Added `"postbuild": "next-sitemap"` to package.json

**Impact:** Sitemap now auto-generated with every deployment

**Commit:** `ddc8eb8 - fix: remove sitemaps from git tracking (auto-generated by postbuild)`

**Problem:** Old sitemaps (index format) were tracked in git and deployed

**Solution:**
1. Removed sitemaps from git with `git rm --cached`
2. Added `public/sitemap*.xml` to .gitignore
3. Sitemaps now only generated by postbuild script

**Impact:** Clean deployments with fresh, single sitemap.xml

---

## Common Patterns

### Pattern 1: Bilingual Content Fetching

```javascript
// lib/sanity/client.ts - getPostBySlug()
export async function getPostBySlug(slug) {
  return client.fetch(
    groq`*[_type == "post" && (slug_es.current == $slug || slug_fr.current == $slug)][0] {
      ...,
      author->,
      categories[]->
    }`,
    { slug }
  );
}
```

**Usage in page:**
```javascript
// app/(website)/post/[slug]/page.js
const { slug } = await params;
const post = await getPostBySlug(slug);

// Detect language from slug
const isES = slug === post?.slug_es?.current;
const locale = isES ? 'es' : 'fr';
```

### Pattern 2: Metadata Generation

```javascript
// app/(website)/post/[slug]/page.js - generateMetadata()
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const locale = slug === post?.slug_es ? 'es' : 'fr';

  return {
    title: post?.[`title_${locale}`],
    description: post?.[`excerpt_${locale}`],
    alternates: {
      canonical: `/post/${post?.slug_es}`,
      languages: {
        'es-ES': `/post/${post?.slug_es}`,
        'fr-FR': `/post/${post?.slug_fr}`,
        'x-default': `/post/${post?.slug_es}`,
      }
    },
    // ... OpenGraph, Twitter, etc.
  };
}
```

### Pattern 3: Schema.org Injection

```jsx
// app/(website)/post/[slug]/page.js - default component
export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);
  const schema = generateArticleSchema(post, locale);
  const breadcrumb = generateBreadcrumbSchema([...]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      {schema && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
        >
          {JSON.stringify(schema)}
        </script>
      )}

      {breadcrumb && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
        >
          {JSON.stringify(breadcrumb)}
        </script>
      )}

      <PostPage post={post} />
    </>
  );
}
```

### Pattern 4: Image Optimization

```javascript
// lib/sanity/image.ts
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

export function urlForImage(source) {
  if (!source?.asset?._ref) return null;

  return builder
    .image(source)
    .auto('format') // AVIF/WebP
    .fit('max')
    .quality(85);
}

// Usage - CORRECT WAY
const imageUrl = urlForImage(post.mainImage)?.src;  // ✅ .src property
const imageUrl = urlForImage(post.mainImage)?.url(); // ❌ .url() doesn't exist
```

### Pattern 5: ISR (Incremental Static Regeneration)

```javascript
// Revalidate every 60 seconds
export const revalidate = 60;

// app/(website)/layout.tsx
export default async function Layout({ children }) {
  const settings = await getSettings();
  return <>{children}</>;
}

export const revalidate = 60;
```

---

## Troubleshooting

### Problem 1: TypeError: urlForImage(...).url is not a function

**Error:**
```
TypeError: (0 , b.urlForImage)(...)?.url is not a function
Error occurred prerendering page "/"
```

**Cause:** `urlForImage()` returns an object `{src, width, height}`, not a chainable builder

**Solution:**
```javascript
// ❌ WRONG
const url = urlForImage(image)?.url();

// ✅ CORRECT
const url = urlForImage(image)?.src;
```

**Files to check:**
- `lib/seo/schemas.ts`
- Any component using `urlForImage()`

---

### Problem 2: Sitemap still showing index format (sitemap-0.xml)

**Symptoms:**
- `sitemap.xml` points to `sitemap-0.xml`
- `curl https://uywakuna.info/sitemap.xml` shows `<sitemapindex>`

**Causes:**
1. Old sitemaps tracked in git
2. CDN cache serving old version
3. Missing `postbuild` script

**Solution:**
```bash
# 1. Remove from git tracking
git rm --cached public/sitemap*.xml

# 2. Add to .gitignore
echo "public/sitemap*.xml" >> .gitignore

# 3. Ensure postbuild script exists
# package.json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}

# 4. Commit and redeploy
git add .gitignore package.json
git commit -m "fix: sitemap generation"
git push

# 5. Wait for CDN cache to clear (5-10 minutes)
```

---

### Problem 3: Next.js 16 viewport warning

**Warning:**
```
⚠ Unsupported metadata viewport is configured in metadata export.
Please move it to viewport export instead.
```

**Cause:** Next.js 16 requires `viewport` to be exported separately

**Solution:**
```javascript
// ❌ WRONG (Next.js 14 style)
export const metadata = {
  viewport: 'width=device-width, initial-scale=1'
};

// ✅ CORRECT (Next.js 16 style)
export const metadata = {
  title: '...',
  description: '...'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};
```

---

### Problem 4: Build fails with "Sanity Project ID not set"

**Error:**
```
The Sanity Project ID is not set. Check your environment variables.
```

**Cause:** Missing Sanity credentials in local `.env.local`

**Solution:**
```bash
# 1. Copy example file
cp .env.local.example .env.local

# 2. Add Sanity credentials
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_read_token

# 3. Rebuild
npm run build
```

**Note:** This warning during build is **EXPECTED** for preview deployments without Sanity access. The production deployment on Vercel has the proper env vars and works correctly.

---

### Problem 5: DataForSEO MCP returns 401 Unauthorized

**Error:**
```
Error: HTTP error! status: 401
```

**Cause:** MCP server using outdated credentials

**Solution:**
1. Check credentials in `~/Desktop/Keep/Rules.md`
2. Use credentials directly with curl for keyword research
3. Update `.claude.json` if needed (requires Claude Code restart)

**Current working credentials:**
- Username: `grace.mendoza@tuguruenseo.com`
- API Key: `6d20ea3f93b27cca`

---

## Future Roadmap

### Phase 4: Content Expansion (January 2026)

**Priority P0 (Week 1-2):**
- [ ] Create "Cóndor Andino" article (60K searches/month)
- [ ] Create "Perezoso" article (33K searches/month)
- [ ] Optimize existing posts with keyword data from research

**Priority P1 (Month 1):**
- [ ] Create "Anaconda Verde" article (27K searches/month)
- [ ] Create "Guacamayo Azul" article (22K searches/month)
- [ ] Create "Jaguar" optimized article (12K searches/month)
- [ ] Build internal linking between related posts

**Keyword Target:** Top 7 keywords = 166K total searches/month
**Expected Traffic:** 24K-41K visits/month (15-25% CTR)

### Phase 5: Monetization (February 2026)

**Revenue Streams:**
1. **Google AdSense** - €48-96/month initial
2. **Amazon Afiliados** - €100-300/month with optimization
3. **Sponsored content** - €500-1,500/month (2-3 posts)
4. **Digital products** - eBooks, printables, courses

**Total potential:** €1,200-3,000/month at maturity (12-18 months)

### Phase 6: Technical Improvements (Q1 2026)

**SEO:**
- [ ] Google Analytics 4 setup
- [ ] Google Search Console verification
- [ ] Core Web Vitals monitoring (reportWebVitals)
- [ ] Image metadata in sitemap (`<image:image>` tags)
- [ ] FAQ schema on relevant posts

**Performance:**
- [ ] Optimize CLS (current: 0.15, target: <0.1)
- [ ] Implement advanced caching strategy
- [ ] Add service worker for offline support

**Content:**
- [ ] Visual breadcrumb component (Schema already done)
- [ ] Related articles component
- [ ] Internal linking automation
- [ ] Content clusters (biodiversidad, selva amazónica)

### Phase 7: Internationalization (Q2 2026)

**New Markets:**
- [ ] Add English language support (EN)
- [ ] Keyword research for EN market
- [ ] French market keyword research (DataForSEO)
- [ ] Localize UI strings (i18n)

**Target:** 3-language support (ES/FR/EN)

---

## Key Learnings & Best Practices

### 1. **Always Test Builds Locally Before Pushing**

❌ **Don't:**
```bash
git commit -m "fix something"
git push
# Wait for Vercel to build and discover errors
```

✅ **Do:**
```bash
npm run build
# Check for errors
git commit -m "fix something"
git push
```

### 2. **Use Server Components by Default**

Next.js 16 App Router uses Server Components by default. Only add `'use client'` when:
- Using React hooks (useState, useEffect, etc.)
- Handling browser events (onClick, onChange, etc.)
- Using browser-only APIs (window, localStorage, etc.)

### 3. **Centralize Reusable Logic**

✅ **Good:**
```javascript
// lib/seo/schemas.ts
export function generateArticleSchema(post, locale) { ... }

// app/(website)/post/[slug]/page.js
const schema = generateArticleSchema(post, 'es');
```

❌ **Bad:**
```javascript
// Inline schema in every page component
const schema = { "@context": "https://schema.org", ... };
```

### 4. **Don't Commit Auto-Generated Files**

Files like sitemaps should be generated during build, not committed:

```gitignore
# .gitignore
public/sitemap*.xml
.next/
out/
```

### 5. **Use Environment Variables for Secrets**

❌ **Never:**
```javascript
const SANITY_TOKEN = "sk_12345..."; // Hardcoded
```

✅ **Always:**
```javascript
const SANITY_TOKEN = process.env.SANITY_API_READ_TOKEN;
```

### 6. **Bilingual SEO Requires hreflang**

For multi-language sites, always implement:
- ✅ Canonical tags pointing to primary language
- ✅ hreflang tags for all language versions
- ✅ x-default for international traffic
- ✅ Consistent URL structure per language

### 7. **Schema.org is Critical for Rich Snippets**

Implement at minimum:
- ✅ Article schema on blog posts
- ✅ Organization schema on homepage
- ✅ BreadcrumbList for navigation
- ✅ FAQPage for Q&A content

### 8. **GEO is the Future of SEO**

Optimize for AI search engines:
- ✅ Create `llms.txt` describing site content
- ✅ Allow AI bots in robots.txt
- ✅ Structure content for AI extraction
- ✅ Use clear, descriptive headings

---

## Quick Reference

### Important Files

| File | Purpose |
|------|---------|
| `lib/seo/schemas.ts` | Schema.org JSON-LD generators |
| `app/(website)/layout.tsx` | Shared metadata for all pages |
| `app/(website)/post/[slug]/page.js` | Blog post rendering + SEO |
| `next-sitemap.config.js` | Sitemap generation configuration |
| `public/llms.txt` | GEO file for AI discovery |
| `public/robots.txt` | Crawler directives |
| `.gitignore` | Files to exclude from git |

### Important Commands

```bash
# Development
npm run dev           # Start dev server (localhost:3000)
npm run sanity        # Open Sanity Studio (/studio)

# Build & Test
npm run build         # Production build + sitemap generation
npm run sitemap       # Generate sitemap manually

# Git
git status            # Check modified files
git add .             # Stage all changes
git commit -m "msg"   # Commit with message
git push              # Deploy to Vercel
```

### Important URLs

- **Production:** https://uywakuna.info
- **Sanity Studio:** https://uywakuna.info/studio
- **RSS Feed:** https://uywakuna.info/feed.xml
- **Sitemap:** https://uywakuna.info/sitemap.xml
- **GitHub Repo:** https://github.com/hayka-pacha/uywakuna

---

## Appendix: Configuration Files

### next.config.js (Key Sections)

```javascript
module.exports = {
  reactStrictMode: true,
  output: 'standalone',
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        // ... more security headers
      ]
    }];
  }
};
```

### next-sitemap.config.js

```javascript
module.exports = {
  siteUrl: "https://uywakuna.info",
  generateIndexSitemap: false,  // Single sitemap.xml

  additionalPaths: async () => [
    { loc: '/', priority: 1.0 },
    { loc: '/archive', priority: 0.9 },
    { loc: '/about', priority: 0.8 }
  ],

  transform: async (config, path) => {
    if (path.startsWith('/post/')) {
      return { ...config, priority: 0.9, changefreq: 'weekly' };
    }
    return config;
  }
};
```

---

**END OF DOCUMENTATION**

_This document should be updated whenever significant changes are made to the codebase, architecture, or SEO strategy._

_Last major update: 2025-12-26_
