"use client";

import Link from "next/link";
import Label from "@/components/ui/label";
import { useLanguage } from "@/lib/i18n/context";
import { getLocalizedField } from "@/lib/i18n/utils";

export default function CategoryLabel({
  categories,
  nomargin = false
}) {
  const { locale } = useLanguage();

  return (
    <div className="flex gap-3">
      {categories?.length &&
        categories.slice(0).map((category, index) => {
          const title = getLocalizedField(category, "title", locale);
          return (
            <Link
              href={`/category/${category.slug?.current || category.slug}`}
              key={index}>
              <Label nomargin={nomargin} color={category.color}>
                {title}
              </Label>
            </Link>
          );
        })}
    </div>
  );
}
