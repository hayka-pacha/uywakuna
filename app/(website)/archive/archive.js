"use client";

import PostList from "@/components/postlist";
import Pagination from "@/components/blog/pagination";
import { useLanguage } from "@/lib/i18n/context";

export default function Post({ posts, searchParams }) {
  const { t } = useLanguage();
  const page = searchParams?.page;
  const pageIndex = parseInt(page, 10) || 1;
  const POSTS_PER_PAGE = 6;
  
  const isFirstPage = pageIndex < 2;
  const isLastPage = posts?.length < POSTS_PER_PAGE;

  return (
    <>
      {posts && posts?.length === 0 && (
        <div className="flex h-40 items-center justify-center">
          <span className="text-lg text-gray-500">
            {t("error_not_found")}
          </span>
        </div>
      )}
      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {posts.map(post => (
          <PostList key={post._id} post={post} aspect="square" />
        ))}
      </div>

      <Pagination
        pageIndex={pageIndex}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  );
}
