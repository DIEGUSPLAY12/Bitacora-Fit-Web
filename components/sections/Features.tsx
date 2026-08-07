"use client";

import { useRef } from "react";
import { Dumbbell, Flame, Timer, History } from "lucide-react";
import FeatureCard from "@/components/ui/FeatureCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const FEATURES = [
  {
    icon: Dumbbell,
    title: "Registra cada serie sin fricción",
    description: "Añade peso, repeticiones y series de cada ejercicio en segundos. Diseñado para que interactúes lo mínimo con el móvil y te centres en el entrenamiento.",
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
      "Temporizador integrado entre series con un aviso silencioso cuando toca volver a la barra.",
  },
  {
    icon: History,
    title: "Analiza tu historial y volumen",
    description:
      "Revisa todos tus entrenamientos pasados, observa la gráfica de tu volumen total por sesión y entiende realmente cómo estás progresando semana a semana.",
  },
] as const;

export default function Features() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  
  useScrollReveal({
    ref: containerRef,
    yOffset: 60,
    duration: 1,
    ease: "power3.out",
    reducedMotion,
    staggerSelector: "[data-feature-card]",
    staggerDelay: 0.1,
  });

  return (
    <section
      id="features"
      ref={containerRef}
      className="py-section-mobile md:py-section-desktop"
    >
      <div className="mx-auto max-w-6xl px-5 relative z-10">
        <h2 className="text-3xl md:text-[2.25rem] font-bold tracking-tight text-balance text-foreground mb-10 md:mb-16">
          Todo lo que necesitas, nada más
        </h2>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            // Bento logic: first and last cards are wide on desktop
            const isWide = index === 0 || index === 3;

            return (
              <div 
                key={feature.title} 
                data-feature-card
                className={isWide ? "md:col-span-2" : "md:col-span-1"}
              >
                <FeatureCard
                  icon={<Icon className="size-6 text-accent" strokeWidth={2} aria-hidden />}
                  title={feature.title}
                  description={feature.description}
                  className="h-full"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
