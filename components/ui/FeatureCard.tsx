"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const hoverSpring = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.article
      whileHover={reducedMotion ? { opacity: 0.9 } : { y: -4 }}
      transition={hoverSpring}
      className="flex flex-col gap-4 rounded-card bg-surface p-7"
    >
      {icon}
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </motion.article>
  );
}
