"use client";

import Container from "@/components/container";
import PostList from "@/components/postlist";
import { useLanguage } from "@/lib/i18n/context";
import { getLocalizedField } from "@/lib/i18n/utils";

export default function CategoryPage({ posts, slug }) {
  const { locale } = useLanguage();

  // Get category info from the first post
  const category = posts?.[0]?.categories?.find(
    (cat) => cat.slug?.current === slug
  );

  const categoryTitle = category
    ? getLocalizedField(category, "title", locale)
    : slug;

  const categoryDescription = category
    ? getLocalizedField(category, "description", locale)
    : "";

  return (
    <Container>
      <div className="mt-10">
        <h1 className="text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          {categoryTitle}
        </h1>
        {categoryDescription && (
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {categoryDescription}
          </p>
        )}
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {posts?.length > 0 ? (
          posts.map((post) => (
            <PostList
              key={post._id}
              post={post}
              aspect="square"
              preloadImage={false}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">
              {locale === "es"
                ? "No hay artículos en esta categoría."
                : "Aucun article dans cette catégorie."}
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}

