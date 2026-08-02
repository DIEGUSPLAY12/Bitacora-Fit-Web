import Image from "next/image";
import DownloadButton from "@/components/ui/DownloadButton";
import { BASE_PATH } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="pt-20 md:pt-24">
      <div className="mx-auto max-w-6xl px-5 py-section-mobile md:py-section-desktop">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:gap-16 gap-10">
          {/* ── Texto ────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] font-bold tracking-tight text-foreground">
              Registra tus entrenos,
              <br />
              entrena con criterio
            </h1>

            <p className="text-base leading-relaxed text-muted max-w-md">
              Apunta peso, series y repeticiones en cada ejercicio y observa tu
              progreso real. Sin estimaciones, sin memoria: datos.
            </p>

            <div className="pt-2">
              <DownloadButton />
            </div>
          </div>

          {/* ── Mockup ────────────────────────────────── */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="w-full max-w-[280px] rounded-[24px] border border-[#2A2A2A] overflow-hidden">
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
