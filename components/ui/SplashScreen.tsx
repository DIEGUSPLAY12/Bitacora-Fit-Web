"use client";

import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "motion/react";
import { usePathname, useSearchParams } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import LogoIcon from "@/components/ui/LogoIcon";

const SECONDARY_PAGES = ["/blog", "/novedades", "/contacto"];

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    // Helper para comprobar si una ruta pertenece a las páginas secundarias
    const isSecondary = (path: string) => SECONDARY_PAGES.some(p => path.startsWith(p));

    // Si navegamos ENTRE páginas secundarias, evitamos mostrar la pantalla de carga
    if (
      prevPathname.current !== null && 
      isSecondary(prevPathname.current) && 
      isSecondary(pathname)
    ) {
      prevPathname.current = pathname;
      return;
    }

    // En cualquier otro caso, mostramos la pantalla de carga
    setIsVisible(true);
    
    // Ocultamos con una transición suave después de un instante
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 800); // 800ms permite ver exactamente 1 ciclo de la animación de latido

    prevPathname.current = pathname;

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.6,
            ease: [0.32, 0.72, 0, 1], // Fade out muy suave y premium
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background"
        >
          <m.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40"
          >
            {/* Anillo de carga (Spinner "Repetición") */}
            {!reducedMotion ? (
              <m.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "easeInOut", // easeInOut simula el esfuerzo concéntrico/excéntrico de una repetición
                }}
                className="absolute inset-0 rounded-full border-[3px] border-white/5 border-t-accent shadow-[0_0_15px_rgba(163,230,53,0.15)]"
              />
            ) : (
              <div className="absolute inset-0 rounded-full border-[3px] border-white/5 border-t-accent" />
            )}
            
            {/* Logo Central (Efecto Latido / Respiración) */}
            <m.div
              animate={
                !reducedMotion
                  ? { scale: [1, 1.08, 1] }
                  : { scale: 1 }
              }
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
              className="w-14 h-14 md:w-16 md:h-16 text-accent flex items-center justify-center"
            >
              <LogoIcon className="w-full h-full drop-shadow-[0_0_12px_rgba(163,230,53,0.3)]" />
            </m.div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
