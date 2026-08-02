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
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !mockupRef.current) return;

    const tween = gsap.to(mockupRef.current, {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: mockupRef.current,
        start: "top center",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion]);
  return (
    <section className="relative pt-20 md:pt-24 overflow-hidden">
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-accent/5 blur-[120px] rounded-[100%] pointer-events-none -z-10" aria-hidden />

      <div className="mx-auto max-w-6xl px-5 py-section-mobile md:py-section-desktop">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:gap-16 gap-10">
          {/* ── Texto ────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-6 relative z-10">
            <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] font-bold tracking-tighter text-foreground flex flex-col gap-1 text-balance">
              <span className="overflow-hidden block">
                <motion.span
                  className="block"
                  initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  Registra tus entrenos,
                </motion.span>
              </span>
              <span className="overflow-hidden block">
                <motion.span
                  className="block"
                  initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  entrena con criterio
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base leading-relaxed text-muted max-w-md"
            >
              Apunta peso, series y repeticiones en cada ejercicio y observa tu
              progreso real. Sin estimaciones, sin memoria: datos.
            </motion.p>

            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-2"
            >
              <DownloadButton />
            </motion.div>
          </div>

          {/* ── Mockup ────────────────────────────────── */}
          <div className="flex-1 flex justify-center md:justify-end" ref={mockupRef}>
            <div className="w-full max-w-[280px] rounded-[32px] border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
              <Image
                src={`${BASE_PATH}/screenshots/home.png`}
                alt="Pantalla de inicio de Bitácora Fit con racha de entrenos y accesos rápidos"
                width={487}
                height={1105}
                priority
                className="block w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
