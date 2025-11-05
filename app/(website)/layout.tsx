import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
import Navbar from "@/components/navbar";

async function sharedMetaData(params) {
  const settings = await getSettings();
  
  // Default to Spanish
  const locale = "es";
  const title = settings?.[`title_${locale}`] || settings?.title_es || "Uywakuna";
  const description = settings?.[`description_${locale}`] || settings?.description_es || "Tu zoológico virtual";

  // Set metadataBase - use settings URL or default to production URL
  const baseUrl = settings?.url || 'https://uywakuna.info';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description: description,
    keywords: ["animales", "zoológico", "naturaleza", "fauna", "animals", "zoo", "nature", "wildlife"],
    authors: [{ name: "Uywakuna" }],
    alternates: {
      canonical: settings?.url,
      languages: {
        'es': settings?.url ? `${settings.url}/es` : undefined,
        'fr': settings?.url ? `${settings.url}/fr` : undefined,
      }
    },
    openGraph: {
      title: title,
      description: description,
      type: "website",
      locale: "es_ES",
      alternateLocale: ["fr_FR"],
      siteName: title,
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src ||
            "/img/opengraph.jpg",
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      title: title,
      description: description,
      card: "summary_large_image",
      images: [urlForImage(settings?.openGraphImage)?.src || "/img/opengraph.jpg"]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export async function generateMetadata({ params }) {
  return await sharedMetaData(params);
}

export default async function Layout({ children, params }) {
  const settings = await getSettings();
  return (
    <>
      <Navbar {...settings} />

      <div>{children}</div>

      <Footer {...settings} />
    </>
  );
}
// enable revalidate for all pages in this layout
export const revalidate = 60;
