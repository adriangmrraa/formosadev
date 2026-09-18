import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://formosa.dev"),
  title: {
    default: "Formosa.dev — Comunidad tecnológica de Formosa",
    template: "%s — Formosa.dev",
  },
  description:
    "Comunidad tecnológica de Formosa para aprender, conectar personas, construir proyectos reales y acceder a eventos y oportunidades desde la provincia.",
  openGraph: {
    title: "Formosa.dev — Comunidad tecnológica de Formosa",
    description:
      "Comunidad tecnológica de Formosa para aprender, conectar personas, construir proyectos reales y acceder a eventos y oportunidades desde la provincia.",
    type: "website",
    locale: "es_AR",
    siteName: "Formosa.dev",
    images: [
      {
        url: "/assets/hero-estacion.jpg",
        width: 1280,
        height: 852,
        alt: "Estación de tren de Formosa Capital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formosa.dev — Comunidad tecnológica de Formosa",
    description: "Gente de acá construyendo también el futuro.",
    images: ["/assets/hero-estacion.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR" className={`${manrope.variable} antialiased`}>
      <body className="min-h-screen bg-crema font-sans text-ink">
        <Script id="motion-js" strategy="beforeInteractive">
          {`document.documentElement.classList.add("js");`}
        </Script>
        {children}
      </body>
    </html>
  );
}
