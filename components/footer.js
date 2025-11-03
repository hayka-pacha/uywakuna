"use client";

import Container from "@/components/container";
import ThemeSwitch from "@/components/themeSwitch";
import { useLanguage } from "@/lib/i18n/context";

export default function Footer(props) {
  const { t } = useLanguage();
  
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-center text-sm">
        Copyright © {new Date().getFullYear()} {props?.copyright || "Uywakuna"}.{" "}
        {t("all_rights_reserved")}.
      </div>
      <div className="mt-4 flex items-center justify-center">
        <ThemeSwitch />
      </div>
    </Container>
  );
}
