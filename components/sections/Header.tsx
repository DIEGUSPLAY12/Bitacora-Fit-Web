"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import DownloadButton from "@/components/ui/DownloadButton";
import Brand from "@/components/ui/Brand";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const NAV_LINKS = [
  { name: "Funciones", href: "#features" },
  { name: "Comparativa", href: "#comparison" },
  { name: "Galería", href: "#galeria" },
  { name: "FAQ", href: "#faq" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // Scrollspy logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Detecta cuando la sección cruza el tercio superior
      }
    );

    NAV_LINKS.forEach((link) => {
      // Usamos getElementById o querySelector
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else if (href === "body") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-4 md:top-6 inset-x-4 z-50 flex flex-col items-center pointer-events-none gap-2">
      {/* Desktop & Mobile Pill */}
      <nav className="pointer-events-auto flex items-center justify-between bg-surface/80 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 md:py-3 w-full max-w-5xl mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 relative z-20">
        
        {/* Logo */}
        <Link 
          href="#" 
          onClick={(e) => handleScrollTo(e as any, "body")}
          className="pl-2 transition-opacity hover:opacity-80"
        >
          <Brand iconClassName="w-5 h-5 md:w-6 md:h-6" textClassName="text-base md:text-lg font-bold tracking-tight text-foreground" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors block ${
                    isActive ? "text-background" : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.name}
                </a>
                {!reducedMotion && isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-accent rounded-full z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {reducedMotion && isActive && (
                  <div className="absolute inset-0 bg-accent rounded-full z-0" />
                )}
              </li>
            );
          })}
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
              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.li 
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className={`block py-4 text-xl font-bold tracking-tight transition-colors border-b border-white/5 ${
                        isActive 
                          ? "text-accent" 
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                );
              })}
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
