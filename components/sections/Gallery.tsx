"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { BASE_PATH } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const SCREENSHOTS = [
  {
    src: `${BASE_PATH}/screenshots/login.png`,
    alt: "Pantalla de inicio de sesión con acceso rápido a la app",
    imageClassName: "object-contain object-center",
  },
  {
    src: `${BASE_PATH}/screenshots/home.png`,
    alt: "Pantalla de inicio con racha de entrenos y accesos rápidos",
    imageClassName: "object-cover object-center",
  },
  {
    src: `${BASE_PATH}/screenshots/entrenar.png`,
    alt: "Registro de ejercicio con peso, series y repeticiones",
    imageClassName: "object-contain object-center scale-[0.95]",
  },
  {
    src: `${BASE_PATH}/screenshots/historial.png`,
    alt: "Historial de entrenamientos con volumen total por sesión",
    imageClassName: "object-cover object-center",
  },
  {
    src: `${BASE_PATH}/screenshots/perfil.png`,
    alt: "Perfil del usuario con estadísticas y configuración",
    imageClassName: "object-cover object-center",
  },
];

const IMG_WIDTH = 487;
const IMG_HEIGHT = 1105;

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(1);

  // ── Scroll reveal ───────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, y: 24 });

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion]);

  // ── Carousel controls ───────────────────────────────────
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SCREENSHOTS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    },
    [handleNext, handlePrev],
  );

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="py-section-mobile md:py-section-desktop overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-5 relative z-10">
        {/* ── Encabezado ─────────────────────────────── */}
        <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-balance text-foreground">
          Así se ve
        </h2>
        <p className="mt-2 mb-10 md:mb-14 text-sm text-muted">
          Un vistazo rápido a la app
        </p>

        {/* ── Carrusel Coverflow ───────────────────────────────── */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Flechas de Navegación */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Captura anterior"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 size-12 items-center justify-center rounded-full bg-surface/80 backdrop-blur-md text-foreground transition-all hover:scale-110 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent shadow-xl border border-white/10"
          >
            <ChevronLeft className="size-6" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Captura siguiente"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 size-12 items-center justify-center rounded-full bg-surface/80 backdrop-blur-md text-foreground transition-all hover:scale-110 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent shadow-xl border border-white/10"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Contenedor de las tarjetas */}
          <div
            className="relative w-full h-[550px] md:h-[650px] flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[32px]"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="Galería interactiva de capturas de pantalla"
          >
            <AnimatePresence initial={false}>
              {SCREENSHOTS.map((shot, index) => {
                // Cálculo de posición circular
                let offset = index - activeIndex;
                if (offset < -2) offset += SCREENSHOTS.length;
                if (offset > 2) offset -= SCREENSHOTS.length;

                const isCenter = offset === 0;
                const isLeft = offset === -1;
                const isRight = offset === 1;

                let state = "hiddenRight";
                if (isCenter) state = "center";
                else if (isLeft) state = "left";
                else if (isRight) state = "right";
                else if (offset < 0) state = "hiddenLeft";

                const variants = {
                  center: {
                    x: "-50%",
                    y: "-50%",
                    scale: 1,
                    opacity: 1,
                    zIndex: 10,
                    filter: reducedMotion ? "none" : "blur(0px)",
                  },
                  left: {
                    x: "-130%",
                    y: "-50%",
                    scale: 0.8,
                    opacity: 0.4,
                    zIndex: 5,
                    filter: reducedMotion ? "none" : "blur(4px)",
                  },
                  right: {
                    x: "30%",
                    y: "-50%",
                    scale: 0.8,
                    opacity: 0.4,
                    zIndex: 5,
                    filter: reducedMotion ? "none" : "blur(4px)",
                  },
                  hiddenLeft: {
                    x: "-180%",
                    y: "-50%",
                    scale: 0.6,
                    opacity: 0,
                    zIndex: 1,
                    filter: reducedMotion ? "none" : "blur(8px)",
                  },
                  hiddenRight: {
                    x: "80%",
                    y: "-50%",
                    scale: 0.6,
                    opacity: 0,
                    zIndex: 1,
                    filter: reducedMotion ? "none" : "blur(8px)",
                  },
                };

                return (
                  <motion.div
                    key={shot.src}
                    initial={false}
                    animate={state}
                    variants={variants}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      mass: 0.8,
                    }}
                    onClick={() => {
                      if (isLeft) handlePrev();
                      if (isRight) handleNext();
                    }}
                    className={[
                      "absolute top-1/2 left-1/2",
                      "w-[70vw] max-w-[260px] md:max-w-[300px]",
                      "aspect-[487/1105]",
                      "bg-[#121212] rounded-[24px] border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] overflow-hidden",
                      isCenter ? "cursor-default" : "cursor-pointer",
                    ].join(" ")}
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={IMG_WIDTH}
                      height={IMG_HEIGHT}
                      priority={isCenter || isLeft || isRight}
                      className={`block w-full h-full pointer-events-none ${shot.imageClassName || "object-cover object-center"}`}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {/* Indicadores móviles */}
          <div className="flex md:hidden justify-center gap-2 mt-4">
            {SCREENSHOTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`size-2 rounded-full transition-colors ${
                  i === activeIndex ? "bg-accent" : "bg-surface"
                }`}
                aria-label={`Ir a la captura ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
