"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "motion/react";
import { BASE_PATH } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STEPS = [
  {
    id: 1,
    title: "1. Entras al gym, abres la app",
    description: "De un vistazo sabes qué te toca hoy y cuál es tu racha actual. Sin tiempos de carga eternos ni distracciones.",
    image: `${BASE_PATH}/screenshots/home.png`,
    alt: "Pantalla principal de Bitácora Fit"
  },
  {
    id: 2,
    title: "2. Apuntas peso y repeticiones al vuelo",
    description: "Interfaz diseñada para que introduzcas tus series con el pulgar en 2 segundos y te centres en descansar para la siguiente.",
    image: `${BASE_PATH}/screenshots/entrenar.png`,
    alt: "Pantalla de registro de entrenamiento"
  },
  {
    id: 3,
    title: "3. Analizas el impacto de tu esfuerzo",
    description: "Revisa tu historial, observa gráficas de volumen total y comprende realmente si estás progresando a lo largo de las semanas.",
    image: `${BASE_PATH}/screenshots/historial.png`,
    alt: "Pantalla de historial y analíticas"
  }
];

function StepBlock({ 
  step, 
  index, 
  setActiveIndex 
}: { 
  step: typeof STEPS[0], 
  index: number, 
  setActiveIndex: (i: number) => void 
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Reducido el margen para que se active más fácilmente en viewports pequeños
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });
  
  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  return (
    <div ref={ref} className="min-h-[60vh] flex items-center justify-start py-16 relative">
      <div 
        className="max-w-md transition-opacity duration-500 ease-in-out"
        style={{ opacity: isInView ? 1 : 0.2 }}
      >
        <div className="mb-4 flex w-10 h-10 md:w-12 h-12 items-center justify-center rounded-2xl bg-accent text-background font-bold text-lg md:text-xl">
          {step.id}
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4 text-balance">
          {step.title}
        </h3>
        <p className="text-base md:text-lg leading-relaxed text-muted text-balance">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStep = STEPS[activeIndex];

  return (
    <section className="relative w-full bg-background pb-20">
      <div className="mx-auto w-full max-w-6xl px-5">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          
          {/* Columna Izquierda: Textos con Scroll (Mobile: Pasan por debajo, Desktop: Izquierda) */}
          <div className="w-full relative z-10">
            {STEPS.map((step, index) => (
              <StepBlock 
                key={step.id} 
                step={step} 
                index={index} 
                setActiveIndex={setActiveIndex} 
              />
            ))}
            {/* Espaciador final para asegurar que el último elemento pueda cruzar el centro */}
            <div className="h-[20vh]" />
          </div>

          {/* Columna Derecha: Mockup Anclado (Sticky) */}
          <div className="hidden lg:block w-full h-full">
            <div className="sticky top-0 h-screen flex items-center justify-center">
              <div 
                className="relative w-full max-w-[260px] aspect-[487/1105] rounded-[36px] border-[2px] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden bg-surface"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.id}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={activeStep.image}
                      alt={activeStep.alt}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 260px"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Reflejo estilo cristal premium */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-10" />
              </div>
            </div>
          </div>
          
          {/* Mobile Image (Sticky but behind text or in background) */}
          {/* We'll use a fixed position background just for mobile to keep the effect */}
          <div className="lg:hidden fixed inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
             <div className="relative w-full max-w-[280px] aspect-[487/1105] rounded-[36px] border border-white/10 overflow-hidden bg-surface mask-image-bottom">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={activeStep.image}
                      alt={activeStep.alt}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
