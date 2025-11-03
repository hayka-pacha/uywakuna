"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useLanguage } from "@/lib/i18n/context";
import { ChevronDownIcon, LanguageIcon } from "@heroicons/react/24/solid";
import cx from "clsx";

export default function LanguageSelector({ mobile = false }) {
  const { locale, setLocale, t } = useLanguage();

  const languages = [
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" }
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <Menu
      as="div"
      className={cx("relative text-left", mobile && "w-full")}>
      {({ open }) => (
        <>
          <Menu.Button
            className={cx(
              "flex items-center gap-x-2 rounded-md px-4 py-2 text-sm font-medium outline-none transition-all focus:outline-none focus-visible:text-blue-500 focus-visible:ring-1 dark:focus-visible:bg-gray-800",
              open
                ? "text-blue-500 hover:text-blue-500"
                : "text-gray-600 dark:text-gray-400",
              mobile ? "w-full justify-between px-5 py-2" : "inline-block"
            )}>
            <div className="flex items-center gap-x-2">
              <LanguageIcon className="h-5 w-5" />
              <span>{currentLanguage?.flag}</span>
              <span>{currentLanguage?.label}</span>
            </div>
            <ChevronDownIcon className="h-4 w-4" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="lg:transition lg:ease-out lg:duration-100"
            enterFrom="lg:transform lg:opacity-0 lg:scale-95"
            enterTo="lg:transform lg:opacity-100 lg:scale-100"
            leave="lg:transition lg:ease-in lg:duration-75"
            leaveFrom="lg:transform lg:opacity-100 lg:scale-100"
            leaveTo="lg:transform lg:opacity-0 lg:scale-95">
            <Menu.Items
              className={cx(
                "z-20 origin-top-right rounded-md focus:outline-none lg:absolute lg:right-0 lg:w-48",
                !mobile && "bg-white shadow-lg dark:bg-gray-800"
              )}>
              <div className={cx(!mobile && "py-2")}>
                {languages.map(language => (
                  <Menu.Item key={language.code}>
                    {({ active }) => (
                      <button
                        onClick={() => setLocale(language.code)}
                        className={cx(
                          "flex w-full items-center gap-x-3 px-5 py-2 text-sm transition-colors",
                          active
                            ? "bg-gray-100 text-blue-500 dark:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700",
                          locale === language.code &&
                            "font-semibold text-blue-600 dark:text-blue-400"
                        )}>
                        <span className="text-xl">{language.flag}</span>
                        <span>{language.label}</span>
                        {locale === language.code && (
                          <span className="ml-auto text-blue-600 dark:text-blue-400">
                            ✓
                          </span>
                        )}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
