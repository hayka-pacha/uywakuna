"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { notFound } from "next/navigation";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";

import CategoryLabel from "@/components/blog/category";
import AuthorCard from "@/components/blog/authorCard";
import TranslationBadge from "@/components/translationBadge";
import RelatedPosts from "@/components/relatedPosts";
import Breadcrumb from "@/components/breadcrumb";
import { useLanguage } from "@/lib/i18n/context";
import { getLocalizedField, hasTranslation } from "@/lib/i18n/utils";

export default function Post(props) {
  const { loading, post } = props;
  const { locale, t } = useLanguage();

  const slug = post?.slug_es || post?.slug_fr;

  if (!loading && !slug) {
    notFound();
  }

  const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;

  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;
  
  const title = getLocalizedField(post, "title", locale);
  const body = post[`body_${locale}`] || post.body_es || post.body_fr;
  const estReadingTime = post[`estReadingTime_${locale}`] || post.estReadingTime_es || 5;

  // Get category info for breadcrumb
  const category = post?.categories?.[0];
  const categoryTitle = category
    ? getLocalizedField(category, "title", locale)
    : null;
  const categorySlug = category?.slug?.current;

  // Breadcrumb items for visual navigation
  const breadcrumbItems = [
    ...(categoryTitle && categorySlug
      ? [{ name: categoryTitle, url: `/category/${categorySlug}` }]
      : []),
    { name: title || post?.title_es || post?.title_fr, url: '#' }
  ];

  return (
    <>
      <Container className="!pt-0">
        <div className="mx-auto max-w-screen-md ">
          <Breadcrumb items={breadcrumbItems} />
          <TranslationBadge post={post} />

          <div className="flex justify-center">
            <CategoryLabel categories={post.categories} />
          </div>

          <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
            {title || post?.title_es || post?.title_fr || 'Sin título'}
          </h1>

          <div className="mt-3 flex justify-center space-x-3 text-gray-500 ">
            <div className="flex items-center gap-3">
              {AuthorimageProps && (
                <div className="relative h-10 w-10 flex-shrink-0">
                  <Image
                    src={AuthorimageProps.src}
                    alt={post?.author?.name}
                    className="rounded-full object-cover"
                    fill
                    sizes="40px"
                  />
                </div>
              )}
              <div>
                <p className="text-gray-800 dark:text-gray-400">
                  {post.author.name}
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <time
                    className="text-gray-500 dark:text-gray-400"
                    dateTime={post?.publishedAt || post._createdAt}>
                    {format(
                      parseISO(post?.publishedAt || post._createdAt),
                      "MMMM dd, yyyy"
                    )}
                  </time>
                  <span>· {estReadingTime} min {locale === "es" ? "de lectura" : "de lecture"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
        {imageProps && (
          <Image
            src={imageProps.src}
            alt={post.mainImage?.alt || "Thumbnail"}
            priority
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>

      <Container>
        <article className="mx-auto max-w-screen-md ">
          <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-600">
            {body && <PortableText value={body} />}
          </div>
          <div className="mb-7 mt-7 flex justify-center">
            <Link
              href="/"
              className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 ">
              ← {locale === "es" ? "Ver todos los artículos" : "Voir tous les articles"}
            </Link>
          </div>
          {post.author && <AuthorCard author={post.author} />}

          {/* Related Posts for internal linking */}
          {post.related && post.related.length > 0 && (
            <RelatedPosts
              posts={post.related}
              currentSlug={post?.slug_es?.current || post?.slug_fr?.current}
            />
          )}
        </article>
      </Container>
    </>
  );
}
