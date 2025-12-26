import { getAboutPage } from "@/lib/sanity/client";
import About from "./about";

export const metadata = {
  title: "Acerca de Uywakuna | Sobre Nosotros",
  description: "Descubre Uywakuna, tu zoológico virtual dedicado a la educación sobre la fauna y biodiversidad de América del Sur. Aprende sobre animales en español y francés.",
  keywords: ["sobre uywakuna", "acerca de", "zoológico virtual", "educación ambiental", "biodiversidad", "fauna sudamericana"],
  alternates: {
    canonical: "https://uywakuna.info/about",
    languages: {
      'es-ES': '/about',
      'fr-FR': '/about',
    }
  },
  openGraph: {
    title: "Acerca de Uywakuna | Tu Zoológico Virtual",
    description: "Blog educativo bilingüe (ES/FR) sobre la fauna y biodiversidad de América del Sur",
    type: "website",
    locale: "es_ES",
    url: "https://uywakuna.info/about",
  },
};

export default async function AboutPage() {
  const aboutData = await getAboutPage();

  return <About aboutData={aboutData} />;
}

export const revalidate = 60;
