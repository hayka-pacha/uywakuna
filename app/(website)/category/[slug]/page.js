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
  const description = category?.description_es || category?.description_fr || '';
  
  return {
    title: `${title} - Uywakuna`,
    description,
  };
}

export default async function CategoryDefault({ params }) {
  const { slug } = await params;
  const posts = await getPostsByCategory(slug);
  
  return <CategoryPage posts={posts} slug={slug} />;
}

export const revalidate = 60;

