"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ITEMS = [
  "Más de 50.000 entrenos",
  "Sin distracciones sociales",
  "⭐⭐⭐⭐⭐ 4.9/5",
  "100% Gratuita y sin anuncios",
  "Diseñada para entrenar en serio",
];

export default function BottomMarquee() {
  const reducedMotion = usePrefersReducedMotion();

  // Duplicamos el array varias veces para asegurar que llene la pantalla holgadamente
  // y la animación al -50% sea un loop perfecto.
  const multipliedItems = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <section className="w-full py-6 md:py-8 overflow-hidden bg-surface/30 border-t border-white/5 relative z-20">
      {/* Máscaras de gradiente para suavizar los bordes izquierdo y derecho */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex whitespace-nowrap gap-8 md:gap-16 items-center w-max pl-4"
        animate={reducedMotion ? {} : { x: [0, "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 40, // Animación lenta y premium
        }}
      >
        {multipliedItems.map((msg, idx) => (
          <div key={idx} className="flex items-center gap-8 md:gap-16">
            <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-semibold text-accent/80">
              {msg}
            </span>
            <span className="text-white/10 text-xs">✦</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
