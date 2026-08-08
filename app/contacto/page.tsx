"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MessageCircle, Clock, Send, HelpCircle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PageHero from "@/components/ui/PageHero";
import Footer from "@/components/sections/Footer";

const CONTACT_EMAIL = "contacto@bitacorafit.app";

const CONTACT_CARDS = [
  {
    icon: Mail,
    title: "Email directo",
    description: "Escríbenos directamente si prefieres no usar el formulario.",
    action: CONTACT_EMAIL,
    actionLabel: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: HelpCircle,
    title: "Preguntas frecuentes",
    description: "Quizá tu duda ya tiene respuesta en nuestra sección de FAQ.",
    action: "Ver FAQ",
    actionLabel: "Ver FAQ",
    href: "/#faq",
  },
  {
    icon: Clock,
    title: "Tiempo de respuesta",
    description: "Respondemos en menos de 48 horas. Normalmente mucho menos.",
    action: null,
    actionLabel: null,
    href: null,
  },
];

export default function ContactoPage() {
  const [formState, setFormState] = useState<"idle" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const subject = encodeURIComponent(`Contacto Web — ${name}`);
    const body = encodeURIComponent(`De: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setFormState("sent");
  };

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
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-surface p-6 md:p-10 shadow-lg">
                  {formState === "idle" ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-semibold text-foreground mb-2">
                          Nombre
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          placeholder="Tu nombre"
                          className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-semibold text-foreground mb-2">
                          Email
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          placeholder="tu@email.com"
                          className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-message" className="block text-sm font-semibold text-foreground mb-2">
                          Mensaje
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          required
                          rows={5}
                          placeholder="¿En qué podemos ayudarte?"
                          className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300 resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 font-bold rounded-button bg-accent text-background px-6 py-3 text-base hover:opacity-85 active:opacity-75 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all duration-200"
                      >
                        <Send className="size-4" />
                        Enviar mensaje
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-12 flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <MessageCircle className="size-7 text-accent" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        ¡Mensaje preparado!
                      </h3>
                      <p className="text-sm text-muted max-w-sm">
                        Se ha abierto tu cliente de email con el mensaje. Envíalo desde allí y te responderemos lo antes posible.
                      </p>
                      <button
                        onClick={() => setFormState("idle")}
                        className="text-sm text-accent hover:underline mt-2"
                      >
                        Enviar otro mensaje
                      </button>
                    </div>
                  )}
              </div>
            </div>

            {/* Contact cards */}
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
