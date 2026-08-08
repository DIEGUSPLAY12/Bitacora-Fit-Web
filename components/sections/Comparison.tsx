"use client";

import { motion } from "motion/react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Comparison() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useScrollReveal<HTMLElement>({
    yOffset: 40,
    duration: 1,
    ease: "power3.out",
    reducedMotion
  });

  return (
    <section id="comparison" ref={sectionRef} className="py-content-mobile md:py-content-desktop px-5 bg-surface/30 border-y border-white/5 relative overflow-hidden">


      <div className="mx-auto w-full max-w-5xl relative z-10">
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <div className="rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-muted bg-white/5 mb-6 border border-white/10">
            Cambio de paradigma
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1] font-bold tracking-tight text-foreground mb-6 text-balance">
            El problema vs La solución
          </h2>
          <p className="text-base md:text-lg text-muted/90 max-w-2xl mx-auto leading-relaxed text-balance">
            Deja atrás el caos de las aplicaciones de notas genéricas y da el salto a un sistema diseñado exclusivamente para el alto rendimiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Tarjeta Problema (Otras apps/Notas) */}
          <motion.div 
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="rounded-[32px] border border-white/5 bg-surface/30 p-8 md:p-10 relative overflow-hidden flex flex-col"
          >
            {/* Gradiente Rojo/Oscuro sutil de fondo */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="font-display text-xl font-bold text-white/60 mb-8 flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-400/50" />
                El método antiguo
              </h3>
              
              <ul className="space-y-6">
                {[
                  "Notas caóticas y desordenadas",
                  "No recuerdas qué peso usaste la semana pasada",
                  "Pierdes tiempo calculando el volumen total",
                  "Te distraes con notificaciones de otras apps sociales",
                  "Dependes de tener buena cobertura en el gimnasio"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted">
                    <span className="text-red-400/50 text-lg leading-none mt-1">×</span>
                    <span className="text-base leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Tarjeta Solución (Bitácora Fit) */}
          <motion.div 
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="rounded-[32px] border border-accent/20 bg-surface/80 p-8 md:p-10 relative overflow-hidden flex flex-col shadow-[0_0_50px_-12px_rgba(180,240,60,0.1)]"
          >
            {/* Gradiente Verde/Brillante de fondo */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="font-display text-xl font-bold text-foreground mb-8 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                Bitácora Fit
              </h3>
              
              <ul className="space-y-6">
                {[
                  "Interfaz ultra-rápida y a un solo toque",
                  "Historial inmediato de cada ejercicio",
                  "Gráficas automáticas de tu progreso real",
                  "Cero distracciones sociales. Solo tú y el hierro",
                  "Funciona 100% offline sin problemas"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-base font-medium leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
