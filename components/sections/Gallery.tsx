"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BASE_PATH } from "@/lib/constants";

const SCREENSHOTS = [
  {
    src: `${BASE_PATH}/screenshots/login.png`,
    alt: "Pantalla de inicio de sesión con acceso rápido a la app",
  },
  {
    src: `${BASE_PATH}/screenshots/home.png`,
    alt: "Pantalla de inicio con racha de entrenos y accesos rápidos",
  },
  {
    src: `${BASE_PATH}/screenshots/entrenar.png`,
    alt: "Registro de ejercicio con peso, series y repeticiones",
  },
  {
    src: `${BASE_PATH}/screenshots/historial.png`,
    alt: "Historial de entrenamientos con volumen total por sesión",
  },
  {
    src: `${BASE_PATH}/screenshots/perfil.png`,
    alt: "Perfil del usuario con estadísticas y configuración",
  },
];

const IMG_WIDTH = 487;
const IMG_HEIGHT = 1105;
const SCROLL_AMOUNT = 300;

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const delta = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
    track.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scroll("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scroll("right");
      }
    },
    [scroll],
  );

  return (
    <section
      id="galeria"
      className="py-section-mobile md:py-section-desktop"
    >
      <div className="mx-auto max-w-6xl px-5">
        {/* ── Encabezado ─────────────────────────────── */}
        <h2 className="text-2xl md:text-[1.75rem] font-bold text-foreground">
          Así se ve
        </h2>
        <p className="mt-2 mb-10 md:mb-14 text-sm text-muted">
          Un vistazo rápido a la app
        </p>

        {/* ── Carrusel ───────────────────────────────── */}
        <div className="relative">
          {/* Flechas (solo puntero) */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Captura anterior"
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 size-10 items-center justify-center rounded-full bg-surface text-foreground transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Captura siguiente"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 size-10 items-center justify-center rounded-full bg-surface text-foreground transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            role="region"
            aria-label="Capturas de pantalla de Bitácora Fit"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className={[
              "flex gap-4 overflow-x-auto",
              "snap-x snap-mandatory md:snap-none",
              "scrollbar-none",                     
              "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
              "rounded-lg",
            ].join(" ")}
          >
            {SCREENSHOTS.map((shot) => (
              <div
                key={shot.src}
                className={[
                  "shrink-0 snap-center",
                  "w-[80vw] max-w-[220px] md:w-auto md:max-w-none md:flex-1",
                  "rounded-[24px] border border-[#2A2A2A] overflow-hidden",
                ].join(" ")}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={IMG_WIDTH}
                  height={IMG_HEIGHT}
                  className="block w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
