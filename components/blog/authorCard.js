"use client";

import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { useLanguage } from "@/lib/i18n/context";

export default function AuthorCard({ author }) {
  const { locale } = useLanguage();
  const imageProps = author?.image ? urlForImage(author.image) : null;
  
  return (
    <div className="mt-3 rounded-2xl bg-gray-50 px-8 py-8 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
      <div className="flex items-center space-x-4">
        <div className="relative h-20 w-20 flex-shrink-0">
          {imageProps && (
            <Image
              src={imageProps.src}
              alt={author.name}
              className="rounded-full object-cover"
              fill
              sizes="80px"
            />
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">
            {author.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-500">
            {locale === "es" ? "Autor" : "Auteur"}
          </p>
        </div>
      </div>
    </div>
  );
}
