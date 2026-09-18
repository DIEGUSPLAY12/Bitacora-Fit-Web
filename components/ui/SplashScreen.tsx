"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "motion/react";
import Image from "next/image";
import { BASE_PATH } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // La pantalla de carga se oculta 600ms después de que la app se monte en el cliente
    // Esto es suficiente para ocultar cualquier FOUC (Flash of Unstyled Content) o layout shifts
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.6,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background"
        >
          <m.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="relative flex flex-col items-center"
          >
            {/* Logo o Icono animado */}
            <div className="w-20 h-20 md:w-24 md:h-24 relative mb-6">
              <Image
                src={`${BASE_PATH}/images/Logo.png`}
                alt="Cargando Bitácora Fit..."
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 80px, 96px"
              />
            </div>
            
            {/* Indicador de carga premium (glow) */}
            <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <m.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
                className="absolute inset-y-0 left-0 w-1/2 bg-accent shadow-[0_0_10px_rgba(57,255,20,0.8)] rounded-full"
              />
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
