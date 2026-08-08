"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STATEMENTS = [
  "SIN DISTRACCIONES",
  "TUS DATOS SON TUYOS",
  "OFFLINE FIRST",
  "GRATIS PARA SIEMPRE",
  "SOLO LEVANTAR",
];

export default function SocialProof() {
  const reducedMotion = usePrefersReducedMotion();

  // Multiplicamos para asegurar el loop perfecto en pantallas anchas
  const multipliedStatements = [
    ...STATEMENTS,
    ...STATEMENTS,
    ...STATEMENTS,
    ...STATEMENTS,
    ...STATEMENTS,
    ...STATEMENTS,
  ];

  return (
    <section className="w-full py-4 md:py-6 overflow-hidden bg-accent relative z-20">
      <div className="relative flex items-center">
        <motion.div
          className="flex gap-8 md:gap-12 items-center w-max"
          animate={reducedMotion ? {} : { x: [0, "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
        >
          {multipliedStatements.map((statement, idx) => (
            <div key={idx} className="flex items-center gap-8 md:gap-12">
              <span className="text-xl md:text-2xl font-display font-black text-background uppercase tracking-tighter whitespace-nowrap">
                {statement}
              </span>
              <span className="text-background/40 text-xl md:text-2xl">
                ✦
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
