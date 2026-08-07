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
      className="min-h-dvh flex items-center overflow-hidden py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-5 relative z-10">
        {/* ── Layout 2 columnas (desktop) / stack (móvil) ── */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* ─── Columna izquierda: Texto sincronizado ─── */}
          <div className="w-full lg:w-2/5 text-center lg:text-left order-2 lg:order-1">
            {/* Encabezado de sección */}
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Así se ve
            </p>

            {/* Título y descripción animados */}
            <div className="relative min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
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
                    "h-2 rounded-full transition-all duration-300",
                    i === activeIndex
                      ? "w-8 bg-accent"
                      : "w-2 bg-white/20 hover:bg-white/40",
                  ].join(" ")}
                  aria-label={`Ir a la captura ${i + 1}: ${SCREENSHOTS[i].title}`}
                />
              ))}
            </div>

            {/* ── Flechas (solo desktop) ──────────────── */}
            <div className="hidden lg:flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Captura anterior"
                className="size-11 flex items-center justify-center rounded-full bg-surface/80 backdrop-blur-md text-foreground transition-all hover:scale-110 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent border border-white/10"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Captura siguiente"
                className="size-11 flex items-center justify-center rounded-full bg-surface/80 backdrop-blur-md text-foreground transition-all hover:scale-110 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent border border-white/10"
              >
                <ChevronRight className="size-5" />
              </button>
              <span className="text-xs text-muted ml-1">
                {activeIndex + 1} / {SCREENSHOTS.length}
              </span>
            </div>
          </div>

          {/* ─── Columna derecha: Carrusel coverflow ───── */}
          <div className="w-full lg:w-3/5 order-1 lg:order-2">
            <div className="relative w-full max-w-xl mx-auto">
              {/* Flechas en los bordes del carrusel (solo móvil/tablet) */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Captura anterior"
                className="flex lg:hidden absolute -left-2 top-1/2 -translate-y-1/2 z-20 size-10 items-center justify-center rounded-full bg-surface/80 backdrop-blur-md text-foreground transition-all hover:scale-110 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent shadow-xl border border-white/10"
              >
                <ChevronLeft className="size-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Captura siguiente"
                className="flex lg:hidden absolute -right-2 top-1/2 -translate-y-1/2 z-20 size-10 items-center justify-center rounded-full bg-surface/80 backdrop-blur-md text-foreground transition-all hover:scale-110 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent shadow-xl border border-white/10"
              >
                <ChevronRight className="size-5" />
              </button>

              {/* Contenedor del carrusel */}
              <div
                className="relative w-full h-[420px] md:h-[500px] flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[32px]"
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
                        x: "-125%",
                        y: "-50%",
                        scale: 0.78,
                        opacity: 0.35,
                        zIndex: 5,
                        filter: reducedMotion ? "none" : "blur(4px)",
                      },
                      right: {
                        x: "25%",
                        y: "-50%",
                        scale: 0.78,
                        opacity: 0.35,
                        zIndex: 5,
                        filter: reducedMotion ? "none" : "blur(4px)",
                      },
                      hiddenLeft: {
                        x: "-175%",
                        y: "-50%",
                        scale: 0.6,
                        opacity: 0,
                        zIndex: 1,
                        filter: reducedMotion ? "none" : "blur(8px)",
                      },
                      hiddenRight: {
                        x: "75%",
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
                          "w-[55vw] max-w-[190px] md:max-w-[220px]",
                          "h-[380px] md:h-[460px]",
                          "bg-[#121212] rounded-[28px] border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] overflow-hidden",
                          isCenter ? "cursor-default" : "cursor-pointer",
                        ].join(" ")}
                      >
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          width={shot.width}
                          height={shot.height}
                          priority={isCenter || isLeft || isRight}
                          className="block w-full h-full pointer-events-none object-contain object-top"
                        />
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
