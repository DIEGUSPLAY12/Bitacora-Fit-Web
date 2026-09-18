"use client";

import Link from "next/link";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { CONTACT_EMAIL } from "./ContactCards";
import { useContactForm, FieldErrors } from "@/hooks/useContactForm";

const inputBase =
  "w-full bg-background/50 border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 transition duration-300 disabled:opacity-50";
const inputIdle = "border-white/10 focus:ring-accent/50 focus:border-accent/50";
const inputError = "border-red-500/40 focus:ring-red-500/30 focus:border-red-500/40";

interface FieldProps {
  id: string;
  name: keyof FieldErrors;
  label: string;
  type?: "text" | "email" | "textarea";
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  fieldErrors: FieldErrors;
  touched: Record<string, boolean>;
  onBlur: (field: keyof FieldErrors, name: string, email: string, message: string) => void;
  onChange: (field: keyof FieldErrors, name: string, email: string, message: string) => void;
}

function ContactField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = true,
  disabled = false,
  fieldErrors,
  touched,
  onBlur,
  onChange,
}: FieldProps) {
  const isInvalid = !!(fieldErrors[name] && touched[name]);
  const errorId = isInvalid ? `err-${name}` : undefined;
  
  const handleEvent = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    action: typeof onBlur
  ) => {
    const f = e.currentTarget.form!;
    action(
      name,
      type === "text" && name === "name" ? e.target.value : ((f.elements.namedItem("name") as HTMLInputElement)?.value ?? ""),
      type === "email" ? e.target.value : ((f.elements.namedItem("email") as HTMLInputElement)?.value ?? ""),
      type === "textarea" ? e.target.value : ((f.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? "")
    );
  };

  const className = `${inputBase} ${type === "textarea" ? "resize-none" : ""} ${isInvalid ? inputError : inputIdle}`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-foreground mb-2">
        {label} {required && <span className="text-accent" aria-hidden="true">*</span>}
      </label>
      
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={5}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={isInvalid}
          aria-describedby={errorId}
          onBlur={(e) => handleEvent(e, onBlur)}
          onChange={(e) => handleEvent(e, onChange)}
          className={className}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={isInvalid}
          aria-describedby={errorId}
          onBlur={(e) => handleEvent(e, onBlur)}
          onChange={(e) => handleEvent(e, onChange)}
          className={className}
        />
      )}

      {isInvalid && (
        <p id={errorId} className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle className="size-3 shrink-0" />
          {fieldErrors[name]}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const {
    status,
    fieldErrors,
    touched,
    serverError,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useContactForm();

  if (status === "success") {
    return (
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
          onClick={resetForm}
          className="text-sm text-accent hover:underline mt-2 transition-opacity hover:opacity-80"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  const fieldProps = {
    disabled: status === "loading",
    fieldErrors,
    touched,
    onBlur: handleBlur,
    onChange: handleChange,
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

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

      <ContactField
        id="contact-name"
        name="name"
        label="Nombre"
        placeholder="Tu nombre"
        {...fieldProps}
      />

      <ContactField
        id="contact-email"
        name="email"
        label="Email"
        type="email"
        placeholder="tu@email.com"
        {...fieldProps}
      />

      <ContactField
        id="contact-message"
        name="message"
        label="Mensaje"
        type="textarea"
        placeholder="¿En qué podemos ayudarte?"
        {...fieldProps}
      />

      <div className="flex items-start gap-3 mt-2">
        <div className="flex items-center h-5">
          <input
            id="privacy-consent"
            name="privacy"
            type="checkbox"
            required
            className="w-4 h-4 rounded border-white/20 bg-background/50 text-accent focus:ring-accent/50 focus:ring-offset-background transition-colors"
          />
        </div>
        <div className="text-sm text-muted">
          <label htmlFor="privacy-consent" className="font-medium text-foreground">
            Privacidad y Protección de Datos <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <p className="mt-1 text-xs">
            He leído y acepto la{" "}
            <Link href="/privacidad" className="text-accent hover:underline">
              Política de Privacidad
            </Link>.
            Tus datos solo se usarán para responder a esta consulta.
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 font-bold rounded-button bg-accent text-background px-6 py-3 text-base hover:opacity-85 active:opacity-75 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
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
  );
}
