"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Divider() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="w-full flex justify-center py-8 md:py-12 pointer-events-none">
      <motion.div 
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0 }}
        whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent relative"
      >
        {/* Glow core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-[2px]" />
      </motion.div>
    </div>
  );
}
