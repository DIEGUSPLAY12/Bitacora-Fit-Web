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
    <section id="faq" ref={sectionRef} className="py-16 md:py-24 px-5 bg-surface/30 border-y border-white/5">
      <div className="mx-auto w-full max-w-3xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-[2.5rem] font-bold tracking-tight text-foreground mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-muted">
            Todo lo que necesitas saber sobre Bitácora Fit.
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
                  backgroundColor: isOpen ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.02)",
                  borderColor: isOpen ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
                }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg md:text-xl font-semibold text-foreground pr-8">
                    {faq.question}
                  </span>
                  
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="flex-shrink-0 flex items-center justify-center size-8 rounded-full bg-white/5"
                  >
                    <Plus className="size-5 text-accent" />
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
                        type: "spring", 
                        stiffness: 400, 
                        damping: 40, 
                        opacity: { duration: 0.2 } 
                      }}
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0">
                        <p className="text-base md:text-lg leading-relaxed text-muted">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
