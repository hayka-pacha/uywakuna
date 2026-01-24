import { getAboutPage } from "@/lib/sanity/client";
import { generateFAQSchema } from "@/lib/seo/schemas";
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

// Bilingual FAQs for rich snippets
const faqs = {
  es: [
    {
      question: "¿Qué es Uywakuna?",
      answer: "Uywakuna es un blog educativo bilingüe (español/francés) dedicado a la fauna y biodiversidad de América del Sur. Nuestro objetivo es sensibilizar sobre la conservación de la naturaleza a través de artículos detallados sobre las especies animales del continente."
    },
    {
      question: "¿Por qué el nombre Uywakuna?",
      answer: "Uywakuna es una palabra quechua que significa 'animales'. Elegimos este nombre para honrar las culturas andinas y su relación con la naturaleza, reflejando nuestro compromiso con la fauna sudamericana."
    },
    {
      question: "¿Cómo puedo contribuir?",
      answer: "Puedes contribuir compartiendo nuestros artículos, sugiriéndonos temas a través del formulario de contacto, o reportando errores. Valoramos todos los comentarios de nuestra comunidad."
    },
    {
      question: "¿La información es confiable?",
      answer: "Sí, todos nuestros artículos están basados en fuentes científicas y académicas. Citamos nuestras referencias y actualizamos regularmente el contenido para reflejar los últimos descubrimientos."
    }
  ],
  fr: [
    {
      question: "Qu'est-ce qu'Uywakuna?",
      answer: "Uywakuna est un blog éducatif bilingue (espagnol/français) dédié à la faune et à la biodiversité d'Amérique du Sud. Notre mission est de sensibiliser à la conservation de la nature à travers des articles détaillés sur les espèces animales."
    },
    {
      question: "Pourquoi le nom Uywakuna?",
      answer: "Uywakuna est un mot quechua qui signifie 'animaux'. Nous avons choisi ce nom pour honorer les cultures andines et leur relation avec la nature."
    },
    {
      question: "Comment puis-je contribuer?",
      answer: "Vous pouvez contribuer en partageant nos articles, en nous suggérant des sujets via le formulaire de contact, ou en nous signalant des erreurs. Nous apprécions tous les retours de notre communauté."
    },
    {
      question: "Les informations sont-elles fiables?",
      answer: "Oui, tous nos articles sont basés sur des sources scientifiques et académiques. Nous citons nos références et mettons à jour régulièrement le contenu pour refléter les dernières découvertes."
    }
  ]
};

export default async function AboutPage() {
  const aboutData = await getAboutPage();

  // Generate FAQ schema (using Spanish for structured data)
  const faqSchema = generateFAQSchema(faqs.es);

  return (
    <>
      {/* JSON-LD Structured Data - FAQPage */}
      {faqSchema && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
        >
          {JSON.stringify(faqSchema)}
        </script>
      )}

      <About aboutData={aboutData} faqs={faqs} />
    </>
  );
}

export const revalidate = 60;
