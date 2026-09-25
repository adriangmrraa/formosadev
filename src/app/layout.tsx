import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import Script from "next/script";
import { institutional } from "../lib/content";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const siteDescription =
  "Comunidad tecnológica de Formosa para personas interesadas en desarrollo de software, programación, innovación y emprendimiento digital: meetups, eventos, aprendizaje, proyectos y oportunidades desde la provincia.";

export const metadata: Metadata = {
  metadataBase: new URL("https://formosa.dev.ar"),
  title: {
    default: "Formosa.dev — Comunidad tecnológica de Formosa",
    template: "%s — Formosa.dev",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Formosa.dev — Comunidad tecnológica de Formosa",
    description: siteDescription,
    type: "website",
    locale: "es_AR",
    siteName: "Formosa.dev",
    images: [
      {
        url: "/assets/hero-formosa-collage.webp",
        width: 1600,
        height: 900,
        alt: "Paisajes y encuentros de Formosa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formosa.dev — Comunidad tecnológica de Formosa",
    description: siteDescription,
    images: ["/assets/hero-formosa-collage.webp"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR" className={`${manrope.variable} antialiased`}>
      <body className="min-h-screen bg-crema font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://formosa.dev.ar/#organization",
                  name: institutional.name,
                  url: "https://formosa.dev.ar/",
                  logo: "https://formosa.dev.ar/assets/logo-formosadev.webp",
                  description: institutional.valueProposition,
                  email: institutional.email,
                  areaServed: {
                    "@type": "AdministrativeArea",
                    name: "Formosa, Argentina",
                  },
                  sameAs: ["https://instagram.com/formosa.dev"],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://formosa.dev.ar/#website",
                  url: "https://formosa.dev.ar/",
                  name: institutional.name,
                  description: institutional.heroSubcopy,
                  inLanguage: "es-AR",
                  publisher: { "@id": "https://formosa.dev.ar/#organization" },
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <Script id="motion-js" strategy="beforeInteractive">
          {`document.documentElement.classList.add("js");`}
        </Script>
        {children}
      </body>
    </html>
  );
}
