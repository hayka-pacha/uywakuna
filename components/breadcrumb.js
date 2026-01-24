"use client";

import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/lib/i18n/context";

/**
 * Breadcrumb component for navigation and SEO
 * Displays visual breadcrumb trail matching Schema.org BreadcrumbList
 */
export default function Breadcrumb({ items }) {
  const { locale } = useLanguage();

  if (!items || items.length === 0) {
    return null;
  }

  const homeLabel = locale === "es" ? "Inicio" : "Accueil";

  return (
    <nav
      aria-label={locale === "es" ? "Navegación de migas de pan" : "Fil d'Ariane"}
      className="mb-4"
    >
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        {/* Home link */}
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center hover:text-blue-600 dark:hover:text-blue-400"
            aria-label={homeLabel}
          >
            <HomeIcon className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">{homeLabel}</span>
          </Link>
        </li>

        {/* Breadcrumb items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.url || index} className="flex items-center">
              <ChevronRightIcon
                className="mx-1 h-4 w-4 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {isLast ? (
                <span
                  className="font-medium text-gray-900 dark:text-white"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
