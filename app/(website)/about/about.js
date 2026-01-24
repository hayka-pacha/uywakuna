"use client";

import Container from "@/components/container";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";

export default function About({ aboutData, faqs }) {
  const { locale } = useLanguage();
  const localizedFaqs = faqs?.[locale] || faqs?.es || [];
  
  // Fallback content if Sanity data is not available
  const title = aboutData?.[`title_${locale}`] || aboutData?.title_es || "About";
  const subtitle = aboutData?.[`subtitle_${locale}`] || aboutData?.subtitle_es || "";
  const content = aboutData?.[`content_${locale}`] || aboutData?.content_es || null;
  const imageProps = aboutData?.mainImage ? urlForImage(aboutData.mainImage) : null;

  return (
    <Container>
      <div className="mx-auto max-w-6xl py-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-brand-primary mb-4 text-3xl font-bold tracking-tight dark:text-white lg:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="mb-12 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700"></div>
        </div>

        {/* Two Column Layout: Image Left, Content Right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Image */}
          {imageProps && (
            <div className="flex items-start">
              <div className="w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={imageProps.src}
                  alt={aboutData.mainImage?.alt || title}
                  width={600}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full object-contain"
                  priority
                  {...(aboutData.mainImage?.blurDataURL && {
                    placeholder: "blur",
                    blurDataURL: aboutData.mainImage.blurDataURL
                  })}
                />
              </div>
            </div>
          )}

          {/* Right Column - Content */}
          <div className="flex items-start">
            <div className="w-full space-y-6">
              {content ? (
                <div className="prose prose-base dark:prose-invert
                  prose-headings:mb-4 prose-headings:mt-6 prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-white
                  prose-p:mb-4 prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300
                  prose-a:font-medium prose-a:text-blue-600 hover:prose-a:text-blue-700 dark:prose-a:text-blue-400
                  prose-strong:font-semibold prose-strong:text-gray-900 dark:prose-strong:text-white
                  prose-ul:my-4 prose-ul:space-y-2
                  prose-li:text-gray-700 dark:prose-li:text-gray-300">
                  <PortableText value={content} />
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
                  <svg
                    className="mx-auto mb-4 h-10 w-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <h3 className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-200">
                    {locale === "es" ? "Contenido no disponible" : "Contenu non disponible"}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {locale === "es"
                      ? "Cree su contenido en Sanity Studio"
                      : "Créez votre contenu dans Sanity Studio"}
                  </p>
                  <a
                    href="/studio"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    {locale === "es" ? "Ir al Studio" : "Aller au Studio"}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        {localizedFaqs && localizedFaqs.length > 0 && (
          <div className="mt-16">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {locale === "es" ? "Preguntas Frecuentes" : "Questions Fréquentes"}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {locale === "es"
                  ? "Encuentra respuestas a las preguntas más comunes"
                  : "Trouvez des réponses aux questions les plus courantes"}
              </p>
            </div>
            <div className="mx-auto max-w-3xl space-y-4">
              {localizedFaqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-gray-900 dark:text-white">
                    <span>{faq.question}</span>
                    <span className="ml-4 shrink-0 transition-transform duration-200 group-open:rotate-180">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="border-t border-gray-200 p-4 text-gray-600 dark:border-gray-700 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
