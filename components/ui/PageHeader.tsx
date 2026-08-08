"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowLeft } from "lucide-react";
import DownloadButton from "@/components/ui/DownloadButton";
import Brand from "@/components/ui/Brand";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const NAV_LINKS = [
  { name: "Blog", href: "/blog" },
  { name: "Novedades", href: "/novedades" },
  { name: "Contacto", href: "/contacto" },
];

export default function PageHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <>
      <header className="fixed top-4 md:top-6 inset-x-4 z-50 flex flex-col items-center pointer-events-none gap-2">
        <nav className="pointer-events-auto flex items-center justify-between bg-surface/80 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 md:py-3 w-full max-w-5xl mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 relative z-20">
          {/* Logo → landing */}
          <Link
            href="/"
            className="flex items-center gap-2 pl-2 group transition-opacity hover:opacity-80"
          >
            <ArrowLeft className="size-4 text-muted group-hover:text-accent transition-colors duration-300" />
            <Brand iconClassName="w-5 h-5 md:w-6 md:h-6" textClassName="text-base md:text-lg font-bold tracking-tight text-foreground" />
          </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors block rounded-full hover:bg-white/5"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action / Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <DownloadButton compact />
          </div>

          <button
            className="md:hidden p-2 text-foreground rounded-full hover:bg-white/5 transition-colors focus-visible:outline-accent"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Abrir menú de navegación"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
    </header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[50] bg-black/60 backdrop-blur-sm pointer-events-auto"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Side Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={reducedMotion ? { opacity: 0, x: 20 } : { opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0, x: 20 } : { opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-surface border-l border-white/10 z-[60] shadow-2xl pointer-events-auto flex flex-col"
          >
            {/* Header del panel */}
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <span className="font-display font-bold text-lg text-foreground tracking-tight">Menú</span>
              <button
                className="p-2 text-foreground rounded-full hover:bg-white/5 transition-colors focus-visible:outline-accent"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Links */}
            <ul className="flex flex-col flex-1 p-6 gap-2 overflow-y-auto">
              <motion.li
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.32, 0.72, 0, 1] }}
              >
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-4 text-xl font-bold tracking-tight text-muted hover:text-foreground transition-colors border-b border-white/5"
                >
                  Inicio
                </Link>
              </motion.li>
              {NAV_LINKS.map((link, idx) => (
                <motion.li
                  key={link.href}
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: 0.1 + idx * 0.05, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-4 text-xl font-bold tracking-tight text-muted hover:text-foreground transition-colors border-b border-white/5"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
            {/* CTA en el footer del panel */}
            <div className="p-6 border-t border-white/5 flex justify-center">
              <DownloadButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
