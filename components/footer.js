"use client";

import Link from "next/link";
import Container from "@/components/container";
import ThemeSwitch from "@/components/themeSwitch";
import { useLanguage } from "@/lib/i18n/context";
import { getLocalizedField } from "@/lib/i18n/utils";

export default function Footer(props) {
  const { locale, t } = useLanguage();
  const { categories = [] } = props;

  const quickLinksTitle = locale === "es" ? "Enlaces Rápidos" : "Liens Rapides";
  const categoriesTitle = locale === "es" ? "Categorías" : "Catégories";
  const homeLabel = locale === "es" ? "Inicio" : "Accueil";
  const aboutLabel = locale === "es" ? "Acerca de" : "À propos";
  const archiveLabel = locale === "es" ? "Archivo" : "Archives";

  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand & Description */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Uywakuna
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {locale === "es"
              ? "Tu zoológico virtual. Descubre la fauna y biodiversidad de América del Sur."
              : "Ton zoo virtuel. Découvre la faune et la biodiversité d'Amérique du Sud."}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
            {quickLinksTitle}
          </h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                {homeLabel}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                {aboutLabel}
              </Link>
            </li>
            <li>
              <Link
                href="/archive"
                className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                {archiveLabel}
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        {categories && categories.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              {categoriesTitle}
            </h3>
            <ul className="mt-4 space-y-2">
              {categories.slice(0, 5).map((category) => {
                const catTitle = getLocalizedField(category, "title", locale);
                const catSlug = category?.slug?.current;
                return (
                  <li key={category._id}>
                    <Link
                      href={`/category/${catSlug}`}
                      className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    >
                      <span>{catTitle}</span>
                      <span className="ml-1 w-8 text-xs text-gray-400 tabular-nums">
                        {category.count ? `(${category.count})` : ""}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col items-center justify-between border-t border-gray-200 py-6 dark:border-gray-700 sm:flex-row">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} {props?.copyright || "Uywakuna"}.{" "}
          {t("all_rights_reserved")}.
        </div>
        <div className="mt-4 sm:mt-0">
          <ThemeSwitch />
        </div>
      </div>
    </Container>
  );
}
