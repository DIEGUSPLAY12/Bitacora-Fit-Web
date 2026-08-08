"use client";

import Link from "next/link";
import DownloadButton from "@/components/ui/DownloadButton";
import Brand from "@/components/ui/Brand";

const FOOTER_LINKS = {
  proyecto: [
    { name: "Sobre el proyecto", href: "/sobre" },
    { name: "Novedades", href: "/novedades" },
    { name: "Blog", href: "/blog" },
    { name: "Contacto", href: "/contacto" },
  ],
  legal: [
    { name: "Política de privacidad", href: "/privacidad" },
    { name: "Términos y condiciones", href: "/terminos" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-surface">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <Brand iconClassName="w-6 h-6 md:w-8 md:h-8" textClassName="text-xl md:text-2xl font-bold tracking-tight text-foreground" />
            </Link>
            <p className="text-sm text-muted text-center md:text-left max-w-xs leading-relaxed">
              App de registro de entrenamientos en desarrollo activo. Gratis, sin anuncios y diseñada para gente que se toma en serio el gimnasio.
            </p>
            <div className="mt-2">
              <DownloadButton compact />
            </div>
          </div>

          {/* Proyecto column */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted mb-1">
              Proyecto
            </span>
            {FOOTER_LINKS.proyecto.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Legal column */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted mb-1">
              Legal
            </span>
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted/60">
            © {currentYear} Bitácora Fit. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacidad" className="text-xs text-muted/60 hover:text-muted transition-colors">
              Privacidad
            </Link>
            <span className="text-muted/20 text-xs">·</span>
            <Link href="/terminos" className="text-xs text-muted/60 hover:text-muted transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
