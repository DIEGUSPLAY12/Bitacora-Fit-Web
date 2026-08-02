"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface DownloadButtonProps {
  compact?: boolean;
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

export default function DownloadButton({ compact = false }: DownloadButtonProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.a
      href="#descargar"
      whileHover={reducedMotion ? { opacity: 0.85 } : { scale: 1.03 }}
      whileTap={reducedMotion ? { opacity: 0.75 } : { scale: 0.97 }}
      transition={spring}
      className={[
        "inline-flex items-center justify-center font-bold",
        "rounded-button bg-accent text-background",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        compact ? "px-4 py-2 text-sm" : "px-6 py-3 text-base",
      ].join(" ")}
    >
      {compact ? "Descargar" : "Descargar para Android"}
    </motion.a>
  );
}
