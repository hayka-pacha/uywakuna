import "@/styles/tailwind.css";
import { Providers } from "./providers";
import { cx } from "@/utils/all";
import { Inter, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import ServiceWorkerRegistration from "@/components/serviceWorkerRegistration";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Optimize font loading
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap", // Optimize font loading
});

export const metadata = {
  metadataBase: new URL('https://uywakuna.info'),
  icons: {
    icon: '/img/uywakuna-logo.png',
    apple: '/img/uywakuna-logo.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'BJ1nShDKs-t0Xb5mySGX5UkF3Hd80QD_15VS6JnLeys',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cx(inter.variable, lora.variable)}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical above-the-fold assets */}
        <link rel="preload" href="/img/uywakuna-logo.png" as="image" type="image/png" />
      </head>
      <body className="antialiased text-gray-800 dark:bg-black dark:text-gray-400">
        <Providers>{children}</Providers>
        <Analytics />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
