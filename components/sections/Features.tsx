import { Dumbbell, Flame, Timer, History } from "lucide-react";
import FeatureCard from "@/components/ui/FeatureCard";

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
  return (
    <section
      id="funciones"
      className="py-section-mobile md:py-section-desktop"
    >
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-2xl md:text-[1.75rem] font-bold text-foreground mb-10 md:mb-14">
          Qué puedes hacer con Bitácora Fit
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
