import { Suspense } from "react";
import Container from "@/components/container";
import Archive from "./archive";
import Loading from "@/components/loading";
import { getPaginatedPosts } from "@/lib/sanity/client";

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
    limit: POSTS_PER_PAGE
  };

  const posts = await getPaginatedPosts(params);

  return (
    <>
      <Container className="relative">
        <h1 className="text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
          Archive
        </h1>
        <div className="text-center">
          <p className="mt-2 text-lg">
            See all posts we have ever written.
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
