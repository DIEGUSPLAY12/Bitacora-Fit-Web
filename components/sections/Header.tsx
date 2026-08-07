"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import DownloadButton from "@/components/ui/DownloadButton";
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
    <header className="fixed top-4 md:top-6 inset-x-4 z-50 flex flex-col items-center pointer-events-none gap-2">
      {/* Desktop & Mobile Pill */}
      <nav className="pointer-events-auto flex items-center justify-between bg-surface/80 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 md:py-3 w-full max-w-5xl mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 relative z-20">
        
        {/* Logo */}
        <Link 
          href="#" 
          onClick={(e) => handleScrollTo(e as any, "body")}
          className="text-lg font-bold tracking-tight text-foreground pl-2"
        >
          Bitácora Fit
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

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-5xl p-4 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-[24px] shadow-2xl pointer-events-auto flex flex-col gap-4 md:hidden relative z-10"
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive 
                          ? "bg-accent/10 text-accent" 
                          : "text-muted hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="pt-2 border-t border-white/10 flex justify-center">
              <DownloadButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
