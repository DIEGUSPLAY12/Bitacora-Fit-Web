"use client";

import Link from "next/link";
import { Mail, HelpCircle, Clock } from "lucide-react";

export const CONTACT_EMAIL = "luismarianog858@gmail.com";

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

export default function ContactCards() {
  return (
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
  );
}
