"use client";

import Image from "next/image";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";

export default function AuthorCard({ author }) {
  const { locale } = useLanguage();
  const imageProps = author?.image ? urlForImage(author.image) : null;
  const bio = author[`bio_${locale}`] || author.bio_es || author.bio;
  
  return (
    <div className="mt-3 rounded-2xl bg-gray-50 px-8 py-8 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
      <div className="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6">
        <div className="relative mt-1 h-24 w-24 flex-shrink-0 ">
          {imageProps && (
            <Link href={`/author/${author.slug?.current || author.slug}`}>
              <Image
                src={imageProps.src}
                alt={author.name}
                className="rounded-full object-cover"
                fill
                sizes="96px"
              />
            </Link>
          )}
        </div>
        <div>
          <div className="mb-3">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">
              {locale === "es" ? "Acerca de" : "À propos de"} {author.name}
            </h3>
          </div>
          <div>
            {bio && <PortableText value={bio} />}
          </div>
          <div className="mt-3">
            <Link
              href={`/author/${author.slug?.current || author.slug}`}
              className="bg-brand-secondary/20 rounded-full py-2 text-sm text-blue-600 dark:text-blue-500 ">
              {locale === "es" ? "Ver perfil" : "Voir le profil"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
