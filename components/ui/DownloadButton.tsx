"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface DownloadButtonProps {
  compact?: boolean;
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

export default function DownloadButton({ compact = false }: DownloadButtonProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Magnetic hover physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowToast(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <motion.button
        type="button"
        ref={buttonRef}
        onClick={handleClick}
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
      </motion.button>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-10 left-1/2 px-4 py-3 text-sm font-medium text-foreground bg-surface border border-[#2A2A2A] rounded-full shadow-lg pointer-events-none z-[100]"
          >
            Disponible muy pronto
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
