"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Datos simulados para el gráfico de barras
const CHART_DATA = [
  { value: 20, label: "Sem 1" },
  { value: 35, label: "Sem 2" },
  { value: 30, label: "Sem 3" },
  { value: 55, label: "Sem 4" },
  { value: 45, label: "Sem 5" },
  { value: 70, label: "Sem 6" },
  { value: 90, label: "Sem 7" },
  { value: 100, label: "Sem 8" }, // Pico máximo
];

export default function ProgressChartSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const reducedMotion = usePrefersReducedMotion();

  // Curva de Bezier para animaciones físicas (estilo Apple/Linear)
  const customEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

  return (
    <section 
      ref={containerRef} 
      className="py-24 md:py-40 px-5 bg-background relative overflow-hidden"
    >
      {/* Luz ambiental difusa de fondo */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/5 blur-[120px] rounded-[100%] pointer-events-none -z-10" 
        aria-hidden 
      />
      
      <div className="mx-auto max-w-6xl relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Columna de Texto */}
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-accent bg-accent/10 mb-6 border border-accent/20">
            Analítica Avanzada
          </div>
          <h2 className="text-[2rem] md:text-[3rem] font-bold tracking-tight text-foreground mb-6 leading-[1.1] text-balance">
            Compite contra tus <br className="hidden md:block" /> propios datos
          </h2>
          <p className="text-lg md:text-xl text-muted/90 mb-10 leading-relaxed max-w-lg text-balance">
            La motivación real viene de ver cómo superas tus marcas. Bitácora Fit transforma tu esfuerzo en métricas tangibles y récords personales irrefutables.
          </p>
          
          <div className="flex flex-col gap-6 w-max mx-auto lg:mx-0">
            {[
              { num: "01", text: "Registra el tonelaje total" },
              { num: "02", text: "Observa la gráfica subir" },
              { num: "03", text: "Sube de rango estético" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="flex items-center gap-4 group"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.8, delay: 0.2 + idx * 0.1, ease: customEase }}
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent font-bold text-sm group-hover:scale-105 group-hover:bg-accent/10 transition-all duration-500">
                  {item.num}
                </div>
                <span className="text-foreground font-medium text-lg">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Columna del Gráfico (Double-Bezel Architecture) */}
        <div className="flex-1 w-full max-w-xl">
          {/* Outer Shell (Bisel exterior) */}
          <div className="p-2 md:p-3 bg-white/[0.02] border border-white/5 rounded-[2.5rem] shadow-2xl relative">
            
            {/* Elemento de destello en el borde */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50" />
            
            {/* Inner Core (Núcleo interno con el gráfico) */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-[calc(2.5rem-0.75rem)] p-6 md:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden h-[400px] flex flex-col justify-end">
              
              {/* Rejilla de fondo (Grid) */}
              <div className="absolute inset-0 p-10 flex flex-col justify-between opacity-[0.03] pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-px bg-white" />
                ))}
              </div>
              
              {/* Etiqueta flotante (Tooltip premium) */}
              <motion.div 
                className="absolute right-8 top-8 bg-surface/80 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full shadow-2xl z-20 flex items-center gap-2"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.8, delay: 1, ease: customEase }}
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-semibold tracking-wide">Récord Histórico</span>
              </motion.div>

              {/* Gráfico de Barras Animado */}
              <div className="relative w-full h-[250px] flex items-end justify-between gap-2 md:gap-4 z-10">
                {CHART_DATA.map((data, index) => {
                  const isMax = data.value === 100;
                  return (
                    <div key={index} className="relative flex flex-col items-center justify-end h-full w-full group">
                      
                      {/* Barra */}
                      <motion.div
                        className={`w-full rounded-t-sm md:rounded-t-md relative overflow-hidden cursor-pointer
                          ${isMax ? 'bg-accent shadow-[0_0_20px_rgba(57,255,20,0.3)]' : 'bg-white/10 group-hover:bg-white/20 transition-colors duration-500'}
                        `}
                        initial={reducedMotion ? { height: `${data.value}%` } : { height: "0%" }}
                        animate={isInView ? { height: `${data.value}%` } : { height: "0%" }}
                        transition={{ 
                          duration: 1, 
                          delay: 0.3 + (index * 0.05), // Cascada rápida de izquierda a derecha
                          ease: customEase 
                        }}
                      >
                        {/* Brillo superior interno de la barra */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20" />
                        
                        {/* Gradiente para la barra máxima */}
                        {isMax && (
                          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                        )}
                      </motion.div>
                      
                      {/* Etiqueta X Axis */}
                      <motion.span 
                        className="text-[10px] md:text-xs text-muted/50 mt-4 uppercase font-medium tracking-wider"
                        initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 + (index * 0.05) }}
                      >
                        {data.label.replace('Sem ', 'S')}
                      </motion.span>
                    </div>
                  );
                })}
              </div>

              {/* Suelo del gráfico con gradiente de desvanecimiento */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none z-0" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
