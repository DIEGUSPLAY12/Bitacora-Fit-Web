import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import PageHero from "@/components/ui/PageHero";
import Footer from "@/components/sections/Footer";
import { NOVEDADES } from "@/data/novedades";

export const metadata: Metadata = {
  title: "Novedades — Bitácora Fit | Últimas actualizaciones de la app",
  description:
    "Descubre las últimas funciones y mejoras de Bitácora Fit. Feed de actualizaciones con fotos y descripciones de cada novedad.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NovedadesPage() {
  return (
    <>
      <PageHeader />
      <main>
        <PageHero
          tag="Novedades"
          title="Lo último de Bitácora Fit"
          subtitle="Cada actualización nace del feedback de atletas reales. Aquí puedes ver todo lo que hemos añadido."
        />

        <section className="pb-20 md:pb-32 px-5">
          <div className="mx-auto max-w-4xl flex flex-col gap-8 md:gap-12">
            {NOVEDADES.map((novedad) => (
              <article
                key={novedad.id}
                className="group p-1.5 md:p-2 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-lg"
              >
                <div className="rounded-[calc(2rem-0.375rem)] md:rounded-[calc(2rem-0.5rem)] border border-white/10 bg-surface/50 overflow-hidden transition-colors duration-500 group-hover:bg-surface/80">
                  {/* Image */}
                  <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-background overflow-hidden">
                    <Image
                      src={novedad.image}
                      alt={novedad.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-contain object-center p-4 md:p-8"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 -mt-6 relative z-10">
                    <span className="text-xs text-muted/60 mb-3 block">
                      {formatDate(novedad.date)}
                    </span>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight mb-3 leading-snug">
                      {novedad.title}
                    </h2>
                    <p className="text-sm md:text-base text-muted leading-relaxed max-w-2xl">
                      {novedad.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
