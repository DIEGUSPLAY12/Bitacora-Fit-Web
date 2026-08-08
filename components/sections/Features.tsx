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
      className="py-content-mobile md:py-content-desktop relative overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-5 relative z-10">
        
        {/* Encabezado Premium */}
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <div className="rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-muted bg-white/5 mb-6 border border-white/10">
            Flujo de trabajo
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1] font-bold tracking-tight text-foreground mb-6 text-balance">
            Todo lo que necesitas, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted">nada más.</span>
          </h2>
        </div>

        {/* Bento Grid Layout Pro-Max */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            // Bento logic: first and last cards are wide on desktop
            const isWide = index === 0 || index === 3;

            return (
              <div 
                key={feature.title} 
                data-feature-card
                className={`relative group ${isWide ? "md:col-span-2" : "md:col-span-1"}`}
              >
                {/* Double-Bezel Glass Container */}
                <div className="h-full w-full rounded-[2rem] p-1.5 md:p-2 bg-white/[0.02] border border-white/5 shadow-2xl transition-transform duration-500 ease-out motion-safe:group-hover:scale-[0.98]">
                  <div className="relative h-full w-full rounded-[calc(2rem-0.375rem)] md:rounded-[calc(2rem-0.5rem)] border border-white/10 bg-surface/50 overflow-hidden flex flex-col justify-end p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-colors duration-500 group-hover:bg-surface/80">
                    
                    {/* Luces y Efectos de Fondo Específicos */}
                    {index === 0 && (
                      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                    )}
                    {index === 3 && (
                      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    )}

                    {/* Gráficos / Ilustraciones dentro de las tarjetas grandes */}
                    {index === 0 && (
                      <div className="absolute -top-12 -right-12 md:top-4 md:right-4 opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none">
                        {/* Mockup abstracto */}
                        <div className="w-48 h-64 border-2 border-white/20 rounded-2xl flex flex-col gap-3 p-4 rotate-12 scale-110">
                          <div className="w-full h-8 bg-white/20 rounded-lg" />
                          <div className="w-3/4 h-4 bg-white/20 rounded-sm" />
                          <div className="w-5/6 h-4 bg-white/20 rounded-sm" />
                        </div>
                      </div>
                    )}

                    {index === 3 && (
                      <div className="absolute top-8 right-8 flex items-end gap-2 opacity-10 group-hover:opacity-30 transition-all duration-700 group-hover:-translate-y-2 pointer-events-none">
                        {/* Gráfico de barras abstracto */}
                        <div className="w-6 h-12 bg-white/30 rounded-sm" />
                        <div className="w-6 h-20 bg-white/30 rounded-sm" />
                        <div className="w-6 h-32 bg-accent/40 rounded-sm" />
                      </div>
                    )}

                    {/* Contenido (Icono + Texto) */}
                    <div className="relative z-10 flex flex-col items-start mt-auto">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/10">
                        <Icon className="size-5 text-accent" strokeWidth={2} aria-hidden />
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed max-w-md">
                        {feature.description}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
