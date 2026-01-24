"use client";

import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";
import { useLanguage } from "@/lib/i18n/context";
import { getLocalizedField, getLocalizedSlug } from "@/lib/i18n/utils";

/**
 * Related Posts component for internal linking and SEO
 * Displays up to 4 related posts based on shared categories
 */
export default function RelatedPosts({ posts, currentSlug }) {
  const { locale, t } = useLanguage();

  // Filter out current post and limit to 4
  const relatedPosts = posts
    ?.filter((post) => {
      const slugEs = post.slug_es?.current || post.slug_es;
      const slugFr = post.slug_fr?.current || post.slug_fr;
      return slugEs !== currentSlug && slugFr !== currentSlug;
    })
    ?.slice(0, 4);

  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  const sectionTitle = locale === "es"
    ? "Artículos Relacionados"
    : "Articles Similaires";

  return (
    <section className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
      <h2 className="mb-6 text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {sectionTitle}
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedPosts.map((post) => {
          const title = getLocalizedField(post, "title", locale);
          const slug = getLocalizedSlug(post, locale);
          const imageProps = post?.image ? urlForImage(post.image) : null;

          return (
            <Link
              key={slug}
              href={`/post/${slug}`}
              className="group block overflow-hidden rounded-lg bg-gray-50 transition-all hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {imageProps ? (
                  <Image
                    src={imageProps.src}
                    alt={title || "Related post"}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <span className="text-4xl">🦎</span>
                  </div>
                )}
              </div>

              <div className="p-3">
                <h3 className="line-clamp-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {title}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
