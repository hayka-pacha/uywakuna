import { Suspense } from "react";
import Container from "@/components/container";
import Archive from "./archive";
import Loading from "@/components/loading";
import { getPaginatedPosts } from "@/lib/sanity/client";

export const metadata = {
  title: "Archivo | Todos los Artículos sobre Animales",
  description: "Explora todos nuestros artículos sobre la fauna de América del Sur. Descubre jaguares, anacondas, guacamayos, perezosos y mucho más en español y francés.",
  keywords: ["archivo", "todos los artículos", "fauna sudamericana", "animales", "blog educativo", "biodiversidad"],
  alternates: {
    canonical: "https://uywakuna.info/archive",
    languages: {
      'es-ES': '/archive',
      'fr-FR': '/archive',
    }
  },
  openGraph: {
    title: "Archivo Completo | Uywakuna",
    description: "Todos nuestros artículos sobre la fauna y biodiversidad de América del Sur",
    type: "website",
    locale: "es_ES",
    url: "https://uywakuna.info/archive",
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

// Static export: generate only the first page
export async function generateStaticParams() {
  return []; // Only generate the default page
}

export default async function ArchivePage({ searchParams }) {
  // Wait for searchParams to resolve (Next.js 15+)
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page;
  const pageIndex = parseInt(page, 10) || 1;
  const POSTS_PER_PAGE = 6;

  const params = {
    pageIndex: (pageIndex - 1) * POSTS_PER_PAGE,
    limit: pageIndex * POSTS_PER_PAGE
  };

  const posts = await getPaginatedPosts(params);

  return (
    <>
      <Container className="relative">
        <h1 className="text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
          Archivo
        </h1>
        <div className="text-center">
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Todos nuestros artículos sobre la fauna y biodiversidad de América del Sur.
          </p>
        </div>
        <Suspense
          key={pageIndex}
          fallback={<Loading />}>
          <Archive posts={posts} searchParams={resolvedSearchParams} />
        </Suspense>
      </Container>
    </>
  );
}

export const revalidate = 60;
