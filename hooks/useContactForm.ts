"use client";

import { useState, useRef } from "react";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "26f586e2-53ab-4e7f-b4c5-e5bb1d0528e1";
const SUBMIT_COOLDOWN_MS = 60_000;

export type FormStatus = "idle" | "loading" | "success" | "error";

export interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (name.trim().length < 2) {
    errors.name = "Introduce tu nombre (mínimo 2 caracteres).";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "Introduce un email válido.";
  }
  if (message.trim().length < 10) {
    errors.message = "El mensaje debe tener al menos 10 caracteres.";
  }
  return errors;
}

export function useContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [serverError, setServerError] = useState("");
  
  const lastSentRef = useRef<number | null>(null);
  
  // Ref for the re-entry guard
  const isSubmittingRef = useRef(false);

  const handleBlur = (
    field: keyof FieldErrors,
    name: string,
    email: string,
    message: string
  ) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const errs = validate(name, email, message);
    setFieldErrors((prev) => ({ ...prev, [field]: errs[field] }));
  };

  const handleChange = (
    field: keyof FieldErrors,
    name: string,
    email: string,
    message: string
  ) => {
    if (touched[field]) {
      const errs = validate(name, email, message);
      setFieldErrors((prev) => ({ ...prev, [field]: errs[field] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Canonical re-entry guard using useRef to synchronously prevent double-clicks
    if (isSubmittingRef.current) return;
    
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string) ?? "";
    const email = (data.get("email") as string) ?? "";
    const message = (data.get("message") as string) ?? "";

    const errors = validate(name, email, message);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTouched({ name: true, email: true, message: true });
      return;
    }

    if (lastSentRef.current !== null && Date.now() - lastSentRef.current < SUBMIT_COOLDOWN_MS) {
      const remaining = Math.ceil((SUBMIT_COOLDOWN_MS - (Date.now() - lastSentRef.current)) / 1000);
      setServerError(`Por favor espera ${remaining} segundos antes de volver a enviar.`);
      setStatus("error");
      return;
    }

    // Set synchronous lock
    isSubmittingRef.current = true;
    setStatus("loading");
    setServerError("");

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `Contacto Web — ${name.trim()}`,
        from_name: "Bitácora Fit Web",
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        botcheck: (data.get("botcheck") as string) || "",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("success");
        lastSentRef.current = Date.now();
        form.reset();
        setTouched({});
        setFieldErrors({});
      } else {
        throw new Error(result.message || "Error desconocido del servidor.");
      }
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Error de red. Inténtalo de nuevo."
      );
      setStatus("error");
    } finally {
      // Release synchronous lock
      isSubmittingRef.current = false;
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setServerError("");
  };

  return {
    status,
    fieldErrors,
    touched,
    serverError,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm
  };
}
