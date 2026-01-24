import { Suspense } from "react";
import Container from "@/components/container";
import Archive from "./archive";
import Loading from "@/components/loading";
import { getPaginatedPosts } from "@/lib/sanity/client";

export const metadata = {
  title: "Archivo | Archives | Tous les Articles",
  description: "Explora todos nuestros artículos sobre la fauna de América del Sur. Explorez tous nos articles sur la faune sud-américaine. Jaguares, anacondas, guacamayos y más.",
  keywords: [
    "archivo", "todos los artículos", "fauna sudamericana",
    "archives", "tous les articles", "faune sud-américaine",
    "animales", "blog educativo", "biodiversidad"
  ],
  alternates: {
    canonical: "https://uywakuna.info/archive",
    languages: {
      'es-ES': '/archive',
      'fr-FR': '/archive',
      'x-default': '/archive',
    }
  },
  openGraph: {
    title: "Archivo Completo | Archives | Uywakuna",
    description: "Todos nuestros artículos sobre la fauna de América del Sur. Tous nos articles sur la faune sud-américaine.",
    type: "website",
    locale: "es_ES",
    alternateLocale: ["fr_FR"],
    url: "https://uywakuna.info/archive",
    siteName: "Uywakuna",
  },
  twitter: {
    card: "summary",
    title: "Archivo | Uywakuna",
    description: "Todos los artículos sobre fauna sudamericana",
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
