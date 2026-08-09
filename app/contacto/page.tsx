"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Clock,
  Send,
  HelpCircle,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PageHero from "@/components/ui/PageHero";
import Footer from "@/components/sections/Footer";

const CONTACT_EMAIL = "contacto@bitacorafit.app";

// Clave pública de Web3Forms — segura en el frontend por diseño.
// No da acceso a la cuenta, solo identifica el endpoint de destino.
const WEB3FORMS_KEY = "26f586e2-53ab-4e7f-b4c5-e5bb1d0528e1";

const CONTACT_CARDS = [
  {
    icon: Mail,
    title: "Email directo",
    description: "Escríbenos directamente si prefieres no usar el formulario.",
    actionLabel: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: HelpCircle,
    title: "Preguntas frecuentes",
    description: "Quizá tu duda ya tiene respuesta en nuestra sección de FAQ.",
    actionLabel: "Ver FAQ",
    href: "/#faq",
  },
  {
    icon: Clock,
    title: "Tiempo de respuesta",
    description: "Respondemos en menos de 48 horas. Normalmente mucho menos.",
    actionLabel: null,
    href: null,
  },
];

type FormStatus = "idle" | "loading" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(name: string, email: string, message: string): FieldErrors {
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

export default function ContactoPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [serverError, setServerError] = useState("");

  // Valida un campo individual al perder el foco
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string) ?? "";
    const email = (data.get("email") as string) ?? "";
    const message = (data.get("message") as string) ?? "";

    // Validación completa antes de enviar
    const errors = validate(name, email, message);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTouched({ name: true, email: true, message: true });
      return;
    }

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
        // Honeypot anti-spam: si un bot rellena este campo oculto, Web3Forms descarta el envío
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
    }
  };

  // CSS reutilizable para inputs
  const inputBase =
    "w-full bg-background/50 border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 transition-all duration-300 disabled:opacity-50";
  const inputIdle = "border-white/10 focus:ring-accent/50 focus:border-accent/50";
  const inputError = "border-red-500/40 focus:ring-red-500/30 focus:border-red-500/40";

  return (
    <>
      <PageHeader />
      <main>
        <PageHero
          tag="Soporte"
          title="¿Necesitas ayuda?"
          subtitle="Estamos aquí para resolver tus dudas. Escríbenos y te responderemos lo antes posible."
        />

        <section className="pb-20 md:pb-32 px-5">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

            {/* ── Formulario ── */}
            <div className="lg:col-span-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-surface p-6 md:p-10 shadow-lg">

                {/* ESTADO: ÉXITO */}
                {status === "success" ? (
                  <div className="text-center py-12 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/25 flex items-center justify-center">
                      <CheckCircle2 className="size-7 text-green-400" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-sm text-muted max-w-sm leading-relaxed">
                      Hemos recibido tu mensaje. Te responderemos en menos de 48&nbsp;h a{" "}
                      <span className="text-foreground font-medium">{CONTACT_EMAIL}</span>.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-sm text-accent hover:underline mt-2 transition-opacity hover:opacity-80"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  /* ESTADO: FORMULARIO (idle / loading / error) */
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

                    {/* Honeypot oculto para bots */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      className="hidden"
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    {/* Banner de error de servidor */}
                    {status === "error" && (
                      <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3">
                        <AlertCircle className="size-4 text-red-400 mt-0.5 shrink-0" />
                        <p className="text-sm text-red-300 leading-snug">
                          {serverError} Si el problema persiste, escríbenos directamente a{" "}
                          <a href={`mailto:${CONTACT_EMAIL}`} className="underline font-medium">
                            {CONTACT_EMAIL}
                          </a>
                          .
                        </p>
                      </div>
                    )}

                    {/* Campo: Nombre */}
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold text-foreground mb-2">
                        Nombre <span className="text-accent" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Tu nombre"
                        disabled={status === "loading"}
                        aria-invalid={!!(fieldErrors.name && touched.name)}
                        aria-describedby={fieldErrors.name && touched.name ? "err-name" : undefined}
                        onBlur={(e) => {
                          const f = e.currentTarget.form!;
                          handleBlur(
                            "name",
                            e.target.value,
                            (f.elements.namedItem("email") as HTMLInputElement)?.value ?? "",
                            (f.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? ""
                          );
                        }}
                        onChange={(e) => {
                          if (touched.name) {
                            const f = e.currentTarget.form!;
                            const errs = validate(
                              e.target.value,
                              (f.elements.namedItem("email") as HTMLInputElement)?.value ?? "",
                              (f.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? ""
                            );
                            setFieldErrors((prev) => ({ ...prev, name: errs.name }));
                          }
                        }}
                        className={`${inputBase} ${fieldErrors.name && touched.name ? inputError : inputIdle}`}
                      />
                      {fieldErrors.name && touched.name && (
                        <p id="err-name" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="size-3 shrink-0" />
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Campo: Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-semibold text-foreground mb-2">
                        Email <span className="text-accent" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="tu@email.com"
                        disabled={status === "loading"}
                        aria-invalid={!!(fieldErrors.email && touched.email)}
                        aria-describedby={fieldErrors.email && touched.email ? "err-email" : undefined}
                        onBlur={(e) => {
                          const f = e.currentTarget.form!;
                          handleBlur(
                            "email",
                            (f.elements.namedItem("name") as HTMLInputElement)?.value ?? "",
                            e.target.value,
                            (f.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? ""
                          );
                        }}
                        onChange={(e) => {
                          if (touched.email) {
                            const f = e.currentTarget.form!;
                            const errs = validate(
                              (f.elements.namedItem("name") as HTMLInputElement)?.value ?? "",
                              e.target.value,
                              (f.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? ""
                            );
                            setFieldErrors((prev) => ({ ...prev, email: errs.email }));
                          }
                        }}
                        className={`${inputBase} ${fieldErrors.email && touched.email ? inputError : inputIdle}`}
                      />
                      {fieldErrors.email && touched.email && (
                        <p id="err-email" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="size-3 shrink-0" />
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Campo: Mensaje */}
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-semibold text-foreground mb-2">
                        Mensaje <span className="text-accent" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        placeholder="¿En qué podemos ayudarte?"
                        disabled={status === "loading"}
                        aria-invalid={!!(fieldErrors.message && touched.message)}
                        aria-describedby={fieldErrors.message && touched.message ? "err-message" : undefined}
                        onBlur={(e) => {
                          const f = e.currentTarget.form!;
                          handleBlur(
                            "message",
                            (f.elements.namedItem("name") as HTMLInputElement)?.value ?? "",
                            (f.elements.namedItem("email") as HTMLInputElement)?.value ?? "",
                            e.target.value
                          );
                        }}
                        onChange={(e) => {
                          if (touched.message) {
                            const f = e.currentTarget.form!;
                            const errs = validate(
                              (f.elements.namedItem("name") as HTMLInputElement)?.value ?? "",
                              (f.elements.namedItem("email") as HTMLInputElement)?.value ?? "",
                              e.target.value
                            );
                            setFieldErrors((prev) => ({ ...prev, message: errs.message }));
                          }
                        }}
                        className={`${inputBase} resize-none ${fieldErrors.message && touched.message ? inputError : inputIdle}`}
                      />
                      {fieldErrors.message && touched.message && (
                        <p id="err-message" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="size-3 shrink-0" />
                          {fieldErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Botón de envío */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex items-center justify-center gap-2 font-bold rounded-button bg-accent text-background px-6 py-3 text-base hover:opacity-85 active:opacity-75 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Enviando…
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          Enviar mensaje
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* ── Tarjetas de contacto ── */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {CONTACT_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="p-5 md:p-6 bg-surface/30 border border-white/5 rounded-2xl"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                      <Icon className="size-4 text-accent" />
                    </div>
                    <h3 className="font-display text-base font-bold text-foreground mb-1.5 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-3">
                      {card.description}
                    </p>
                    {card.href && (
                      <Link
                        href={card.href}
                        className="text-sm font-semibold text-accent hover:underline"
                      >
                        {card.actionLabel}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
