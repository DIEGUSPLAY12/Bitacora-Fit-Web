"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DownloadButton from "@/components/ui/DownloadButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  
  // Magnetic Glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (reducedMotion) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Scroll reveal
  useScrollReveal({
    ref: sectionRef,
    yOffset: 60,
    duration: 1.2,
    ease: "power3.out",
    reducedMotion
  });

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-16 px-5 relative"
    >
      <div 
        className="mx-auto w-full max-w-5xl relative overflow-hidden rounded-[32px] md:rounded-[48px] bg-surface/50 border border-white/5"
        onMouseMove={handleMouseMove}
      >
        {/* Glow Magnético */}
        {!reducedMotion && (
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  600px circle at ${mouseX}px ${mouseY}px,
                  rgba(180, 240, 60, 0.15),
                  transparent 80%
                )
              `,
            }}
          />
        )}

        {/* Textura de ruido sutil */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 px-6 py-16 md:py-20 flex flex-col items-center text-center">
          
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-2 mb-6"
          >
            <div className="flex gap-1 text-accent">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-muted uppercase tracking-wider">Valorada con 4.9/5 por atletas reales</span>
          </motion.div>

          <motion.h2 
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight font-bold text-foreground max-w-3xl text-balance mb-6"
          >
            Deja de entrenar de memoria. Empieza a medir tu progreso hoy.
          </motion.h2>
          
          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-muted max-w-2xl text-balance mb-12"
          >
            Bitácora Fit es completamente gratuita, sin anuncios y diseñada por y para gente que se toma en serio el gimnasio.
          </motion.p>

          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.2 }}
            className="relative"
          >
            {/* Glow estático detrás del botón */}
            <div className="absolute inset-0 bg-accent/20 blur-[40px] rounded-full z-0 pointer-events-none animate-pulse" />
            <div className="relative z-10">
              <DownloadButton />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
