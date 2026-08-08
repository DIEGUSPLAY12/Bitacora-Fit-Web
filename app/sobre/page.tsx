import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Wifi, Heart } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PageHero from "@/components/ui/PageHero";
import DownloadButton from "@/components/ui/DownloadButton";
import Footer from "@/components/sections/Footer";
import { BASE_PATH } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sobre Bitácora Fit — La historia detrás de la app",
  description:
    "Conoce el origen de Bitácora Fit: por qué nació, qué problema resuelve y la filosofía de una app gratuita, sin anuncios y diseñada por y para gente que entrena en serio.",
};

const PRINCIPIOS = [
  {
    icon: Shield,
    title: "Tus datos son tuyos",
    description:
      "Bitácora Fit funciona offline. Tus datos de entrenamiento se guardan en tu dispositivo. Sin servidores que revender tu información, sin sorpresas.",
  },
  {
    icon: Wifi,
    title: "Sin distracciones",
    description:
      "Nada de feeds sociales, seguidores ni likes. Abres la app, apuntas tus series y vuelves a la barra. Así de simple.",
  },
  {
    icon: Heart,
    title: "Gratis para siempre",
    description:
      "Sin planes premium, sin funciones bloqueadas, sin anuncios. Bitácora Fit nació como una herramienta personal y seguirá siendo gratuita.",
  },
];

const ROADMAP = [
  "Exportar historial a CSV",
  "Récords personales por ejercicio",
  "Plantillas de entrenamiento",
  "Modo oscuro / modo claro",
];

export default function SobrePage() {
  return (
    <>
      <PageHeader />
      <main>
        <PageHero
          tag="Sobre el proyecto"
          title="De atleta a atleta"
          subtitle="Bitácora Fit nació de una frustración personal: ninguna app de registro de entrenamiento era lo suficientemente simple, rápida y honesta."
        />

        {/* Historia */}
        <section className="py-16 md:py-24 px-5">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                El problema que nadie resolvía bien
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted leading-relaxed">
                <p>
                  Probé las apps más populares del mercado. Unas estaban saturadas de funciones sociales que no necesitaba. Otras tenían planes de pago para cosas básicas. Y las apps de notas genéricas eran un caos imposible de analizar.
                </p>
                <p>
                  Así que construí la herramienta que quería usar yo mismo: una app que hace una sola cosa — registrar peso, series y repeticiones — y la hace excepcionalmente bien.
                </p>
                <p>
                  Después de usarla durante meses y ver la diferencia en mi propio progreso, decidí compartirla. Bitácora Fit es un proyecto personal, no una empresa. Por eso es gratis, por eso no tiene anuncios, y por eso cada decisión de diseño prioriza al atleta que está entre serie y serie.
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[260px] rounded-[36px] border-[2px] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
                <Image
                  src={`${BASE_PATH}/screenshots/home.png`}
                  alt="Pantalla principal de Bitácora Fit"
                  width={487}
                  height={1105}
                  className="block w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Principios */}
        <section className="py-16 md:py-24 px-5 bg-surface/30 border-y border-white/5">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.1]">
                Los principios que nos guían
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRINCIPIOS.map((principio) => {
                const Icon = principio.icon;
                return (
                  <div
                    key={principio.title}
                    className="p-1.5 md:p-2 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-lg"
                  >
                    <div className="h-full rounded-[calc(2rem-0.5rem)] border border-white/10 bg-surface/50 p-6 md:p-8">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                        <Icon className="size-5 text-accent" strokeWidth={2} />
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-3 tracking-tight">
                        {principio.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {principio.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-16 md:py-24 px-5">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 leading-[1.1]">
              Lo que viene
            </h2>
            <p className="text-base md:text-lg text-muted mb-12 leading-relaxed">
              Bitácora Fit está en desarrollo activo. Estas son algunas de las funciones en las que estamos trabajando.
            </p>
            <div className="flex flex-col gap-4 items-center">
              {ROADMAP.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 bg-surface/50 border border-white/5 rounded-2xl px-6 py-4 w-full max-w-md"
                >
                  <span className="text-[10px] uppercase tracking-widest font-bold text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                    Próximamente
                  </span>
                  <span className="text-base font-medium text-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 px-5">
          <div className="mx-auto max-w-3xl text-center flex flex-col items-center gap-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              ¿Listo para entrenar con datos?
            </h2>
            <DownloadButton />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
