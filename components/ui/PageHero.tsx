"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface PageHeroProps {
  tag: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ tag, title, subtitle }: PageHeroProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-5 overflow-hidden">


      <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-muted bg-white/5 mb-6 border border-white/10"
        >
          {tag}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight font-bold text-foreground text-balance"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl text-balance"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
