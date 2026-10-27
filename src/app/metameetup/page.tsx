import type { Metadata } from "next";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { MetameetupApp } from "../../components/metameetup/MetameetupApp";

export const metadata: Metadata = {
  title: "Meta Meetup — Guía interactiva del workshop",
  alternates: { canonical: "/metameetup/" },
  description:
    "Laboratorio interactivo del Meta Meetup de Formosa.dev (viernes 30/10, 17 a 21 h): prepará tu caso, verificá tu entorno, entendé cómo viaja un mensaje por WhatsApp, Instagram o Facebook hasta el CRM, y generá los prompts para tu agente de IA.",
  openGraph: {
    title: "Meta Meetup — Formosa.dev",
    description:
      "Guía interactiva paso a paso para el workshop del 30/10: tu caso, tu entorno, tu canal y tus prompts, guardados en tu navegador.",
  },
};

export default function MetameetupPage() {
  return (
    <>
      <Header />
      <main>
        <MetameetupApp />
      </main>
      <Footer />
    </>
  );
}
