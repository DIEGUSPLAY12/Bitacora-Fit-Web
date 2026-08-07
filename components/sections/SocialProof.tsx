"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const WORKOUTS = [
  { name: "Carlos M.", routine: "Pecho y Tríceps", weight: "4.500 kg", time: "1h 15m" },
  { name: "Lucía G.", routine: "Pierna Pesada", weight: "8.200 kg", time: "1h 30m" },
  { name: "David R.", routine: "Espalda Densidad", weight: "5.100 kg", time: "55m" },
  { name: "Elena F.", routine: "Hombro y Brazo", weight: "3.200 kg", time: "1h 05m" },
  { name: "Marc P.", routine: "Full Body A", weight: "6.800 kg", time: "1h 20m" },
];

export default function SocialProof() {
  const reducedMotion = usePrefersReducedMotion();

  // Duplicamos para asegurar el loop perfecto en el marquee
  const multipliedWorkouts = [...WORKOUTS, ...WORKOUTS, ...WORKOUTS, ...WORKOUTS];

  return (
    <section className="w-full py-8 md:py-12 overflow-hidden bg-background relative z-20">
      <div className="mx-auto max-w-6xl px-5 mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold text-center md:text-left">
          En directo
        </p>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mt-2 text-center md:text-left">
          Miles de atletas están entrenando ahora
        </h3>
      </div>

      <div className="relative">
        {/* Máscaras de gradiente para suavizar los bordes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex gap-4 md:gap-6 items-center w-max pl-4"
          animate={reducedMotion ? {} : { x: [0, "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 60,
          }}
        >
          {multipliedWorkouts.map((workout, idx) => (
            <div 
              key={idx} 
              className="flex flex-col gap-2 bg-surface/30 border border-white/5 backdrop-blur-sm rounded-2xl p-4 min-w-[240px] md:min-w-[280px]"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-foreground">{workout.name}</span>
                <span className="text-xs text-accent/80 flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  Hace 2 min
                </span>
              </div>
              <p className="text-sm text-muted">{workout.routine}</p>
              <div className="flex gap-3 mt-2">
                <span className="text-xs text-muted/80 bg-black/20 px-2 py-1 rounded-md">{workout.weight}</span>
                <span className="text-xs text-muted/80 bg-black/20 px-2 py-1 rounded-md">{workout.time}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
