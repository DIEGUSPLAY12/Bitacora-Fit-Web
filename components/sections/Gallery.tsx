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
    width: 487,
    height: 925,
    title: "Acceso rápido",
    description:
      "Inicia sesión en segundos y empieza a registrar tu entreno sin perder tiempo.",
  },
  {
    src: `${BASE_PATH}/screenshots/home.png`,
    alt: "Pantalla de inicio con racha de entrenos y accesos rápidos",
    width: 487,
    height: 1105,
    title: "Tu panel de inicio",
    description:
      "Racha de entrenamientos, accesos directos y un resumen de tu semana en un solo vistazo.",
  },
  {
    src: `${BASE_PATH}/screenshots/entrenar.png`,
    alt: "Registro de ejercicio con peso, series y repeticiones",
    width: 487,
    height: 1293,
    title: "Registra cada serie",
    description:
      "Añade peso, repeticiones y series de cada ejercicio con unos pocos toques.",
  },
  {
    src: `${BASE_PATH}/screenshots/historial.png`,
    alt: "Historial de entrenamientos con volumen total por sesión",
    width: 487,
    height: 1467,
    title: "Historial completo",
    description:
      "Revisa cada sesión pasada con el volumen total y los ejercicios que hiciste.",
  },
  {
    src: `${BASE_PATH}/screenshots/perfil.png`,
    alt: "Perfil del usuario con estadísticas y configuración",
    width: 487,
    height: 1530,
    title: "Tu perfil",
    description:
      "Estadísticas personales, configuración de la cuenta y todo sobre tu progreso.",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Scroll reveal (GSAP Context for cleanup) ─────────────
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(sectionRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(sectionRef.current, { opacity: 0, y: 40 });

      gsap.to(sectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out", // Premium easing
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // ── Carousel controls ───────────────────────────────────
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SCREENSHOTS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + SCREENSHOTS.length) % SCREENSHOTS.length
    );
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
    [handleNext, handlePrev]
  );

  const activeShot = SCREENSHOTS[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="flex items-center py-content-mobile md:py-content-desktop"
    >
      <div className="mx-auto w-full max-w-6xl px-5 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* ─── Columna izquierda: Texto sincronizado ─── */}
          <div className="w-full lg:w-2/5 text-center lg:text-left order-2 lg:order-1">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-6">
              Así se ve
            </p>

            <div className="relative min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Taste skill premium easing
                >
                  <h2 className="font-display text-2xl md:text-3xl leading-[1.1] font-bold tracking-tight text-foreground mb-4">
                    {activeShot.title}
                  </h2>
                  <p className="text-base md:text-lg text-muted leading-relaxed max-w-md mx-auto lg:mx-0">
                    {activeShot.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Indicadores pill ─────────────────────── */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-8">
              {SCREENSHOTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={[
                    "h-1.5 rounded-full transition-all duration-500 ease-out",
                    i === activeIndex
                      ? "w-10 bg-accent"
                      : "w-2 bg-white/20 hover:bg-white/40",
                  ].join(" ")}
                  aria-label={`Ir a la captura ${i + 1}: ${SCREENSHOTS[i].title}`}
                />
              ))}
            </div>

            {/* ── Flechas (solo desktop) ──────────────── */}
            <div className="hidden lg:flex items-center gap-3 mt-10">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Captura anterior"
                className="size-12 flex items-center justify-center rounded-full bg-surface/80 backdrop-blur-md text-foreground transition-all hover:scale-105 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent border border-white/10"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Captura siguiente"
                className="size-12 flex items-center justify-center rounded-full bg-surface/80 backdrop-blur-md text-foreground transition-all hover:scale-105 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent border border-white/10"
              >
                <ChevronRight className="size-5" />
              </button>
              <span className="text-sm font-medium text-muted ml-3 tracking-widest">
                {activeIndex + 1} / {SCREENSHOTS.length}
              </span>
            </div>
          </div>

          {/* ─── Columna derecha: Carrusel coverflow ───── */}
          <div className="w-full lg:w-3/5 order-1 lg:order-2">
            <div className="relative w-full max-w-2xl mx-auto">
              
              {/* Flechas en móvil */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Captura anterior"
                className="flex lg:hidden absolute -left-4 top-1/2 -translate-y-1/2 z-20 size-12 items-center justify-center rounded-full bg-surface/90 backdrop-blur-md text-foreground transition-all focus-visible:outline-accent shadow-2xl border border-white/10"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Captura siguiente"
                className="flex lg:hidden absolute -right-4 top-1/2 -translate-y-1/2 z-20 size-12 items-center justify-center rounded-full bg-surface/90 backdrop-blur-md text-foreground transition-all focus-visible:outline-accent shadow-2xl border border-white/10"
              >
                <ChevronRight className="size-6" />
              </button>

              <div
                className="relative w-full h-[420px] md:h-[550px] flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[40px] perspective-[1200px]"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                aria-label="Galería interactiva de capturas de pantalla"
              >
                <AnimatePresence initial={false}>
                  {SCREENSHOTS.map((shot, index) => {
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
                        rotateY: 0,
                        scale: 1,
                        opacity: 1,
                        zIndex: 10,
                        filter: reducedMotion ? "none" : "blur(0px)",
                      },
                      left: {
                        x: "-110%",
                        y: "-50%",
                        rotateY: 15,
                        scale: 0.85,
                        opacity: 0.4,
                        zIndex: 5,
                        filter: reducedMotion ? "none" : "blur(6px)",
                      },
                      right: {
                        x: "10%",
                        y: "-50%",
                        rotateY: -15,
                        scale: 0.85,
                        opacity: 0.4,
                        zIndex: 5,
                        filter: reducedMotion ? "none" : "blur(6px)",
                      },
                      hiddenLeft: {
                        x: "-150%",
                        y: "-50%",
                        rotateY: 25,
                        scale: 0.7,
                        opacity: 0,
                        zIndex: 1,
                        filter: reducedMotion ? "none" : "blur(12px)",
                      },
                      hiddenRight: {
                        x: "50%",
                        y: "-50%",
                        rotateY: -25,
                        scale: 0.7,
                        opacity: 0,
                        zIndex: 1,
                        filter: reducedMotion ? "none" : "blur(12px)",
                      },
                    };

                    return (
                      <motion.div
                        key={shot.src}
                        initial={false}
                        animate={state}
                        variants={variants}
                        // Motion Design Principles: Crisp, fast, responsive spring
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 40,
                          mass: 0.8,
                        }}
                        onClick={() => {
                          if (isLeft) handlePrev();
                          if (isRight) handleNext();
                        }}
                        className={[
                          "absolute top-1/2 left-1/2",
                          "w-[60vw] max-w-[210px] md:max-w-[260px]",
                          "h-[400px] md:h-[520px]",
                          "bg-black rounded-[32px] md:rounded-[40px] border-[2px] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden",
                          isCenter ? "cursor-default" : "cursor-pointer",
                        ].join(" ")}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          width={shot.width}
                          height={shot.height}
                          priority={isCenter || isLeft || isRight}
                          className="block w-full h-full pointer-events-none object-contain object-top"
                        />
                        {/* Sutil gradiente sobre la imagen para emular reflejo 3D en los que no están en el centro */}
                        {!isCenter && (
                          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
