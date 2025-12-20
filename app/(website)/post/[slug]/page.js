import PostPage from "./default";

import { getAllPostsSlugs, getPostBySlug } from "@/lib/sanity/client";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const title = post?.title_es || post?.title_fr || 'Uywakuna Blog';
  const description = post?.excerpt_es || post?.excerpt_fr || '';
  
  return { 
    title,
    description,
  };
}

export default async function PostDefault({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return <PostPage post={post} />;
}

export const revalidate = 60;
