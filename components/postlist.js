"use client";

import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/all";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryLabel from "@/components/blog/category";
import { useLanguage } from "@/lib/i18n/context";
import { getLocalizedField, getLocalizedSlug, hasTranslation } from "@/lib/i18n/utils";

export default function PostList({
  post,
  aspect,
  minimal,
  pathPrefix,
  preloadImage,
  fontSize,
  fontWeight
}) {
  const { locale, t } = useLanguage();

  const imageProps = post?.mainImage
    ? urlForImage(post.mainImage)
    : null;
  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;

  const title = getLocalizedField(post, "title", locale);
  const excerpt = getLocalizedField(post, "excerpt", locale);
  const slug = getLocalizedSlug(post, locale);
  const isTranslated = hasTranslation(post, locale);
  return (
    <>
      <div
        className={cx(
          "group cursor-pointer",
          minimal && "grid gap-10 md:grid-cols-2"
        )}>
        <div
          className={cx(
            "relative overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 w-full",
            aspect === "landscape"
              ? "pb-[56.25%]"
              : aspect === "custom"
              ? "pb-[80%]"
              : "pb-[100%]"
          )}>
          <Link
            className="absolute inset-0 block"
            href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${slug}`}>
            {imageProps ? (
              <Image
                src={imageProps.src}
                {...(post.mainImage.blurDataURL && {
                  placeholder: "blur",
                  blurDataURL: post.mainImage.blurDataURL
                })}
                alt={post.mainImage.alt || "Thumbnail"}
                priority={preloadImage ? true : false}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                <PhotoIcon />
              </span>
            )}
          </Link>
        </div>

        <div className={cx(minimal && "flex items-center")}>
          <div>
            <div className="flex items-center gap-2 min-h-[24px]">
              <CategoryLabel
                categories={post.categories}
                nomargin={minimal}
              />
              <span
                className={cx(
                  "rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                  isTranslated && "invisible"
                )}
                aria-hidden={isTranslated}
              >
                {locale === "es" ? "En FR" : "En ES"}
              </span>
            </div>
            <h2
              className={cx(
                fontSize === "large"
                  ? "text-2xl"
                  : minimal
                  ? "text-3xl"
                  : "text-lg",
                fontWeight === "normal"
                  ? "line-clamp-2 font-medium  tracking-normal text-black"
                  : "font-semibold leading-snug tracking-tight",
                "mt-2    dark:text-white"
              )}>
              <Link
                href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${slug}`}>
                <span
                  className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
      bg-no-repeat
      transition-[background-size]
      duration-500
      hover:bg-[length:100%_3px]
      group-hover:bg-[length:100%_10px]
      dark:from-purple-800 dark:to-purple-900">
                  {title}
                </span>
              </Link>
            </h2>

            <div className="hidden">
              {excerpt && (
                <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  <Link
                    href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${slug}`}>
                    {excerpt}
                  </Link>
                </p>
              )}
            </div>

            <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                {post?.author?.image && (
                  <div className="relative h-5 w-5 flex-shrink-0">
                    <Image
                      src={AuthorimageProps.src}
                      alt={post?.author?.name}
                      className="rounded-full object-cover"
                      fill
                      sizes="20px"
                    />
                  </div>
                )}
                <span className="truncate text-sm">
                  {post?.author?.name}
                </span>
              </div>
              <span className="text-xs text-gray-300 dark:text-gray-600">
                &bull;
              </span>
              <time
                className="truncate text-sm"
                dateTime={post?.publishedAt || post._createdAt}>
                {format(
                  parseISO(post?.publishedAt || post._createdAt),
                  "MMMM dd, yyyy"
                )}
              </time>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
