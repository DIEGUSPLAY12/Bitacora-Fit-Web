"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function FeatureCard({ icon, title, description, className = "" }: FeatureCardProps) {
  const reducedMotion = usePrefersReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (reducedMotion) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col gap-4 rounded-[24px] bg-surface p-8 overflow-hidden border border-white/5 transition-colors hover:border-white/10 ${className}`}
    >
      {/* Glow Magnético */}
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                450px circle at ${mouseX}px ${mouseY}px,
                rgba(180, 240, 60, 0.08),
                transparent 80%
              )
            `,
          }}
        />
      )}
      
      {/* Contenido */}
      <div className="relative z-10 flex flex-col gap-4 h-full">
        <div className="size-12 rounded-[16px] bg-[#121212]/50 shadow-inner flex items-center justify-center border border-white/5 mb-2">
          {icon}
        </div>
        <div className="mt-auto">
          <h3 className="text-[1.35rem] font-bold tracking-tight text-foreground mb-2">{title}</h3>
          <p className="text-[1.05rem] leading-relaxed text-muted text-balance">{description}</p>
        </div>
      </div>
    </div>
  );
}
