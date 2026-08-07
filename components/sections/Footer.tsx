"use client";

import DownloadButton from "@/components/ui/DownloadButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-surface">
      <div className="mx-auto max-w-6xl px-5 py-10 md:py-14 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-lg font-bold tracking-tight text-foreground">
            Bitácora Fit
          </span>
          <p className="text-sm text-muted text-center md:text-left">
            App en desarrollo activo — más funciones próximamente
          </p>
          <p className="text-sm text-muted mt-4 md:mt-2">
            © {currentYear} Bitácora Fit.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <DownloadButton />
        </div>
      </div>
    </footer>
  );
}
