import CategoryPage from "./default";
import { getAllCategories, getPostsByCategory } from "@/lib/sanity/client";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    slug: cat.category,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const posts = await getPostsByCategory(slug);
  const category = posts?.[0]?.categories?.find(
    (cat) => cat.slug?.current === slug
  );

  const title = category?.title_es || category?.title_fr || 'Categoría';
  const titleFr = category?.title_fr || category?.title_es || 'Catégorie';
  const description = category?.description_es || category?.description_fr || `Descubre todos los artículos sobre ${title} en Uywakuna`;
  const descriptionFr = category?.description_fr || category?.description_es || `Découvrez tous les articles sur ${titleFr} chez Uywakuna`;
  const postCount = posts?.length || 0;

  return {
    title: `${title} (${postCount} artículos) - Uywakuna`,
    description: `${description}. ${postCount} artículos disponibles en español y francés.`,
    keywords: [title, titleFr, 'fauna sudamericana', 'animales', 'biodiversidad', slug],
    alternates: {
      canonical: `https://uywakuna.info/category/${slug}`,
      languages: {
        'es-ES': `/category/${slug}`,
        'fr-FR': `/category/${slug}`,
        'x-default': `/category/${slug}`,
      }
    },
    openGraph: {
      title: `${title} - Uywakuna`,
      description: `${description}. ${postCount} artículos disponibles.`,
      type: 'website',
      locale: 'es_ES',
      alternateLocale: ['fr_FR'],
      url: `https://uywakuna.info/category/${slug}`,
      siteName: 'Uywakuna',
    },
    twitter: {
      card: 'summary',
      title: `${title} - Uywakuna`,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      }
    }
  };
}

export default async function CategoryDefault({ params }) {
  const { slug } = await params;
  const posts = await getPostsByCategory(slug);
  
  return <CategoryPage posts={posts} slug={slug} />;
}

export const revalidate = 60;

