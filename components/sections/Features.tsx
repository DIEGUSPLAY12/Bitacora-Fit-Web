"use client";

import { Dumbbell, Flame, Timer, History } from "lucide-react";
import FeatureCard from "@/components/ui/FeatureCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const FEATURES = [
  {
    icon: Dumbbell,
    title: "Registra cada serie",
    description: "Peso, repeticiones y series de cada ejercicio, en segundos.",
  },
  {
    icon: Flame,
    title: "Mantén tu racha",
    description:
      "Un contador de días consecutivos entrenando para no perder la constancia.",
  },
  {
    icon: Timer,
    title: "Descansa con criterio",
    description:
      "Temporizador entre series con aviso cuando toca volver a la barra.",
  },
  {
    icon: History,
    title: "Revisa tu historial",
    description:
      "Todos tus entrenos pasados, con el volumen total de cada sesión.",
  },
] as const;

export default function Features() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useScrollReveal<HTMLElement>({
    staggerSelector: "[data-feature-card]",
    staggerDelay: 0.1,
    reducedMotion,
  });

  return (
    <section
      ref={sectionRef}
      id="funciones"
      className="py-section-mobile md:py-section-desktop"
    >
      <div className="mx-auto max-w-6xl px-5 relative z-10">
        <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-balance text-foreground mb-10 md:mb-14">
          Qué puedes hacer con Bitácora Fit
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} data-feature-card>
                <FeatureCard
                  icon={<Icon className="size-8 text-accent" strokeWidth={2} aria-hidden />}
                  title={feature.title}
                  description={feature.description}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
