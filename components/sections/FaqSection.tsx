"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const FAQS = [
  {
    question: "¿Es realmente gratis?",
    answer: "Sí, 100%. Bitácora Fit nació como una herramienta personal que he decidido compartir. No hay planes premium, ni funciones bloqueadas, ni anuncios que molesten mientras entrenas.",
  },
  {
    question: "¿En qué se diferencia de Hevy o Strong?",
    answer: "Es mucho más minimalista y directa. Mientras otras apps se centran en funciones sociales (seguidores, likes) o están saturadas de opciones de pago, Bitácora Fit está diseñada puramente para que anotes tus series rápido y vuelvas a la barra sin distracciones.",
  },
  {
    question: "¿Necesito conexión a internet en el gimnasio?",
    answer: "No. Sabemos que en muchos gimnasios la cobertura es pésima. Puedes registrar tu entrenamiento sin problemas y consultar tu historial. (Funciona de forma ágil independientemente de tu conexión).",
  },
];

export default function FaqSection() {
  const reducedMotion = usePrefersReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // El primero abierto por defecto

  const sectionRef = useScrollReveal<HTMLElement>({
    yOffset: 40,
    duration: 1,
    ease: "power3.out",
    reducedMotion
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={sectionRef} className="py-content-mobile md:py-content-desktop px-5 bg-background relative overflow-hidden">
      {/* Luz difusa superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-white/[0.02] blur-[120px] rounded-[100%] pointer-events-none -z-10" aria-hidden />

      <div className="mx-auto w-full max-w-3xl relative z-10">
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <div className="rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-muted bg-white/5 mb-6 border border-white/10">
            Soporte & Dudas
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1] font-bold tracking-tight text-foreground mb-6 text-balance">
            Preguntas Frecuentes
          </h2>
          <p className="text-base md:text-lg text-muted/90 max-w-xl mx-auto leading-relaxed text-balance">
            Todo lo que necesitas saber sobre Bitácora Fit. Transparencia total.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  backgroundColor: isOpen ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
                }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="p-1 md:p-1.5 bg-white/[0.02] border border-white/5 rounded-[1.5rem] shadow-lg"
              >
                {/* Inner Core (Double-Bezel) */}
                <div className={`rounded-[calc(1.5rem-0.375rem)] border transition-colors duration-500 ${
                  isOpen ? "bg-surface/50 border-white/10" : "bg-transparent border-transparent hover:bg-white/[0.02]"
                }`}>
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[calc(1.5rem-0.375rem)]"
                    aria-expanded={isOpen}
                  >
                    <span className={`text-base md:text-lg font-bold transition-colors duration-300 pr-8 ${
                      isOpen ? "text-foreground" : "text-muted"
                    }`}>
                      {faq.question}
                    </span>
                    
                    <motion.div
                      animate={{ 
                        rotate: isOpen ? 45 : 0,
                        backgroundColor: isOpen ? "rgba(57,255,20,0.1)" : "rgba(255,255,255,0.05)",
                        color: isOpen ? "rgb(57,255,20)" : "rgb(255,255,255)"
                      }}
                      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                      className="flex-shrink-0 flex items-center justify-center size-10 rounded-full"
                    >
                      <Plus className="size-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ 
                          duration: 0.5, 
                          ease: [0.32, 0.72, 0, 1]
                        }}
                      >
                        <div className="px-5 pb-6 md:px-6 md:pb-8 pt-0">
                          <p className="text-sm md:text-base text-muted leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
