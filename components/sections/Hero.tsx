import DownloadButton from "@/components/ui/DownloadButton";

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

          {/* ── Mockup placeholder ────────────────────── */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div
              className="w-full max-w-[280px] rounded-card bg-surface"
              style={{ aspectRatio: "9 / 19.5" }}
              aria-label="Captura de pantalla de la app Bitácora Fit (próximamente)"
              role="img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
