"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface DownloadButtonProps {
  compact?: boolean;
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

export default function DownloadButton({ compact = false }: DownloadButtonProps) {
  const reducedMotion = usePrefersReducedMotion();
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Magnetic hover physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Move button 20% of the distance from the center to the cursor
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <>
      <motion.a
        href="https://expo.dev/accounts/diegusplay12/projects/Bitacora-Fit-App/builds/7f27eee3-d695-4d82-8ce5-be2e1afb278c"
        target="_blank"
        rel="noopener noreferrer"
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
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
    </>
  );
}
