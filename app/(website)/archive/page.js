import { Suspense } from "react";
import Container from "@/components/container";
import Archive from "./archive";
import Loading from "@/components/loading";
import { getPaginatedPosts } from "@/lib/sanity/client";

export const dynamic = "force-dynamic";

export const runtime = "edge";

export default async function ArchivePage({ searchParams }) {
  const page = searchParams?.page;
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
          Archive
        </h1>
        <div className="text-center">
          <p className="mt-2 text-lg">
            See all posts we have ever written.
          </p>
        </div>
        <Suspense
          key={searchParams?.page || "1"}
          fallback={<Loading />}>
          <Archive posts={posts} searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}

// export const revalidate = 60;
