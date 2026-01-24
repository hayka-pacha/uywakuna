import { getAboutPage } from "@/lib/sanity/client";
import About from "./about";

export const metadata = {
  title: "Acerca de Uywakuna | À propos | Sobre Nosotros",
  description: "Descubre Uywakuna, tu zoológico virtual dedicado a la educación sobre la fauna y biodiversidad de América del Sur. Découvrez Uywakuna, votre zoo virtuel dédié à la faune sud-américaine.",
  keywords: [
    "sobre uywakuna", "acerca de", "zoológico virtual", "educación ambiental",
    "à propos", "zoo virtuel", "éducation environnementale",
    "biodiversidad", "fauna sudamericana"
  ],
  alternates: {
    canonical: "https://uywakuna.info/about",
    languages: {
      'es-ES': '/about',
      'fr-FR': '/about',
      'x-default': '/about',
    }
  },
  openGraph: {
    title: "Acerca de Uywakuna | À propos",
    description: "Blog educativo bilingüe (ES/FR) sobre la fauna y biodiversidad de América del Sur. Blog éducatif bilingue sur la faune sud-américaine.",
    type: "website",
    locale: "es_ES",
    alternateLocale: ["fr_FR"],
    url: "https://uywakuna.info/about",
    siteName: "Uywakuna",
  },
  twitter: {
    card: "summary",
    title: "Acerca de Uywakuna",
    description: "Blog educativo bilingüe sobre la fauna sudamericana",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function AboutPage() {
  const aboutData = await getAboutPage();

  return <About aboutData={aboutData} />;
}

export const revalidate = 60;
