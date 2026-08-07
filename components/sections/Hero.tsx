"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DownloadButton from "@/components/ui/DownloadButton";
import { BASE_PATH } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !mockupRef.current) return;

    // React Doctor: usar gsap.context para limpiar animaciones
    const ctx = gsap.context(() => {
      // 1. Floating animation
      gsap.to(mockupRef.current, {
        y: -15,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // 2. Scroll Parallax sutil
      gsap.to(mockupRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mockupRef.current || reducedMotion) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    
    gsap.to(mockupRef.current, {
      rotationY: x * 12,
      rotationX: -y * 12,
      duration: 1,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!mockupRef.current || reducedMotion) return;
    gsap.to(mockupRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative pt-20 md:pt-24 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-[-5] opacity-20 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('${BASE_PATH}/hero-bg.png')`,
          maskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)'
        }}
        aria-hidden
      />

      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-accent/10 blur-[120px] rounded-[100%] pointer-events-none -z-10" aria-hidden />

      <div className="mx-auto max-w-6xl px-5 py-section-mobile md:py-section-desktop">
        <div className="flex flex-col md:flex-row md:items-center md:gap-16 gap-10">
          {/* ── Texto ────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-6 relative z-10 text-center md:text-left items-center md:items-start">
            <h1 className="text-[clamp(2.5rem,10vw,4.5rem)] md:text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] tracking-[-0.03em] font-bold text-foreground flex flex-col gap-1 text-balance">
              <span className="overflow-hidden block">
                <motion.span
                  className="block"
                  initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  Registra tus entrenos,
                </motion.span>
              </span>
              <span className="overflow-hidden block">
                <motion.span
                  className="block text-white/90"
                  initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  entrena con criterio
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-xl leading-relaxed text-muted max-w-md"
            >
              Apunta peso, series y repeticiones en cada ejercicio y observa tu
              progreso real. Sin estimaciones, sin memoria: datos.
            </motion.p>

            <motion.div
              initial={reducedMotion ? { opacity: 1, y: 10 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="pt-4"
            >
              <DownloadButton />
            </motion.div>
          </div>

          {/* ── Mockup ────────────────────────────────── */}
          <div className="flex-1 flex justify-center md:justify-end" style={{ transformStyle: "preserve-3d" }}>
            <motion.div 
              ref={mockupRef}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[300px] rounded-[38px] border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] overflow-hidden relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={`${BASE_PATH}/screenshots/home.png`}
                alt="Pantalla de inicio de Bitácora Fit con racha de entrenos y accesos rápidos"
                width={487}
                height={1105}
                priority
                className="block w-full h-auto"
              />
              
              {/* Glass reflection overlay for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
