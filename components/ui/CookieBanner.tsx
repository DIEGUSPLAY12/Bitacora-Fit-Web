"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const COOKIE_KEY = "bitacora-fit-cookie-consent";
const EXPIRATION_DAYS = 365;

type ConsentValue = "accepted" | "rejected";
interface ConsentData {
  status: ConsentValue;
  expiresAt: number;
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedStr = localStorage.getItem(COOKIE_KEY);
    if (storedStr) {
      try {
        // Soporte para formato antiguo (string plano "accepted")
        if (storedStr === "accepted" || storedStr === "rejected") {
          setConsent(storedStr as ConsentValue);
          return;
        }
        
        const stored: ConsentData = JSON.parse(storedStr);
        if (stored.expiresAt > Date.now()) {
          setConsent(stored.status);
        } else {
          // Caducado
          localStorage.removeItem(COOKIE_KEY);
        }
      } catch (e) {
        // En caso de error de parseo, ignoramos
      }
    }
  }, []);

  const saveConsent = (status: ConsentValue) => {
    const expiresAt = Date.now() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ status, expiresAt }));
    setConsent(status);
  };

  const handleAccept = () => saveConsent("accepted");
  const handleReject = () => saveConsent("rejected");

  // No renderizar hasta que el componente esté montado (evita hydration mismatch)
  if (!mounted || consent !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-4 left-4 right-4 z-[200] flex justify-center pointer-events-none"
        role="dialog"
        aria-label="Aviso de cookies"
        aria-live="polite"
      >
        <div className="pointer-events-auto w-full max-w-2xl bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">

          {/* Icon */}
          <div className="shrink-0 w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
            <Cookie className="w-4 h-4" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground font-medium leading-snug">
              Usamos cookies técnicas estrictamente necesarias para que el sitio funcione.
            </p>
            <p className="text-xs text-muted mt-0.5 leading-relaxed">
              No usamos cookies de rastreo ni publicidad.{" "}
              <Link
                href="/privacidad"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                Política de privacidad
              </Link>
              {" · "}
              <Link
                href="/aviso-legal"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                Aviso legal
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              id="cookie-reject-btn"
              onClick={handleReject}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium text-muted hover:text-foreground border border-white/10 rounded-lg transition-colors hover:border-white/20"
            >
              Rechazar
            </button>
            <button
              id="cookie-accept-btn"
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold bg-accent text-background rounded-lg hover:bg-accent/90 transition-colors"
            >
              Aceptar
            </button>
            <button
              onClick={handleReject}
              aria-label="Cerrar aviso de cookies"
              className="p-1.5 text-muted hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
