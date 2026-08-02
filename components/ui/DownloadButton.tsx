"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface DownloadButtonProps {
  compact?: boolean;
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

export default function DownloadButton({ compact = false }: DownloadButtonProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
      <motion.a
        href="#"
        onClick={handleClick}
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
