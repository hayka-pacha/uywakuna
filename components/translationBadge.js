"use client";

import { useLanguage } from "@/lib/i18n/context";
import { hasTranslation } from "@/lib/i18n/utils";

export default function TranslationBadge({ post }) {
  const { locale, t } = useLanguage();

  if (!post || hasTranslation(post, locale)) {
    return null;
  }

  const fallbackLocale = locale === "es" ? "fr" : "es";
  const fallbackLanguage = fallbackLocale === "es" ? "Español" : "Français";

  return (
    <div className="mb-4 rounded-md border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300">
      <p>
        {locale === "es"
          ? `Este contenido no está disponible en español. Mostrando en ${fallbackLanguage}.`
          : `Ce contenu n'est pas disponible en français. Affichage en ${fallbackLanguage}.`}
      </p>
    </div>
  );
}
