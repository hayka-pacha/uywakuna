import Link from "next/link";
import Container from "@/components/container";

export const metadata = {
  title: "404 - Página no encontrada | Uywakuna",
  description: "La página que buscas no existe. Descubre nuestros artículos sobre fauna sudamericana.",
  robots: {
    index: false,
    follow: true
  }
};

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 text-center">
        {/* Emoji decorativo */}
        <div className="text-8xl mb-8">🦥</div>

        {/* Título */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          404
        </h1>

        {/* Mensaje */}
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-2">
          Página no encontrada
        </p>
        <p className="text-base md:text-lg text-gray-500 dark:text-gray-500 mb-8 max-w-md">
          Esta página se ha perdido como un perezoso en la selva. No te preocupes, te ayudamos a encontrar el camino.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            🏠 Volver al inicio
          </Link>

          <Link
            href="/archive"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
            📚 Ver todos los artículos
          </Link>
        </div>

        {/* Sugerencias */}
        <div className="mt-12 text-left max-w-md">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">
            Quizás te interese:
          </p>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-500">
            <li>
              <Link href="/archive" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                → Explorar todos los animales
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                → Sobre Uywakuna
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                → Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
