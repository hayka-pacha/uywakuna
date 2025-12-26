import PostPage from "./default";

import { getAllPostsSlugs, getPostBySlug } from "@/lib/sanity/client";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { urlForImage } from "@/lib/sanity/image";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // Determine locale based on slug
  const isES = slug === post?.slug_es?.current;
  const locale = isES ? 'es' : 'fr';

  const title = post?.[`title_${locale}`] || post?.title_es || post?.title_fr || 'Uywakuna Blog';
  const description = post?.[`excerpt_${locale}`] || post?.excerpt_es || post?.excerpt_fr || '';
  const imageUrl = post?.mainImage?.asset
    ? urlForImage(post.mainImage)?.src
    : 'https://uywakuna.info/img/opengraph.jpg';

  // Define canonical as ES version, FR as alternate
  const canonicalSlug = post?.slug_es?.current || slug;
  const alternateSlug = post?.slug_fr?.current || slug;

  return {
    title,
    description,
    keywords: post?.categories?.map(cat => cat[`title_${locale}`] || cat.title_es).join(", "),
    authors: [{ name: post?.author?.name || "Uywakuna Team" }],

    // Canonical and language alternates (hreflang)
    alternates: {
      canonical: `https://uywakuna.info/post/${canonicalSlug}`,
      languages: {
        'es-ES': `/post/${post?.slug_es?.current}`,
        'fr-FR': `/post/${post?.slug_fr?.current}`,
        'x-default': `/post/${canonicalSlug}`,
      }
    },

    // Open Graph
    openGraph: {
      title,
      description,
      url: `https://uywakuna.info/post/${slug}`,
      type: 'article',
      locale: isES ? 'es_ES' : 'fr_FR',
      alternateLocale: isES ? ['fr_FR'] : ['es_ES'],
      publishedTime: post?.publishedAt || post?._createdAt,
      modifiedTime: post?._updatedAt,
      authors: [post?.author?.name || "Uywakuna Team"],
      section: post?.categories?.[0]?.[`title_${locale}`] || post?.categories?.[0]?.title_es,
      tags: post?.categories?.map(cat => cat[`title_${locale}`] || cat.title_es),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      }
    }
  };
}

export default async function PostDefault({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // Determine locale based on slug
  const isES = slug === post?.slug_es?.current;
  const locale = isES ? 'es' : 'fr';

  // Generate schemas
  const articleSchema = generateArticleSchema(post, locale);

  // Get category name for breadcrumb
  const categoryName = post?.categories?.[0]?.[`title_${locale}`] || post?.categories?.[0]?.title_es || 'Blog';
  const categorySlug = post?.categories?.[0]?.slug?.current || 'blog';

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: 'https://uywakuna.info' },
    { name: categoryName, url: `https://uywakuna.info/category/${categorySlug}` },
    { name: post?.[`title_${locale}`] || post?.title_es, url: `https://uywakuna.info/post/${slug}` }
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      {articleSchema && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
        >
          {JSON.stringify(articleSchema)}
        </script>
      )}

      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
        >
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      <PostPage post={post} />
    </>
  );
}

export const revalidate = 60;
