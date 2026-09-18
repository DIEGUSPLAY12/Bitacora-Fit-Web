import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import PageHero from "@/components/ui/PageHero";
import Footer from "@/components/sections/Footer";
import { ContentRenderer, Block } from "@/lib/content";

export const metadata: Metadata = {
  title: "Términos y Condiciones — Bitácora Fit",
  description:
    "Términos y condiciones de uso de Bitácora Fit. Condiciones del servicio, limitaciones de responsabilidad y propiedad intelectual.",
};

interface Section {
  title: string;
  blocks: Block[];
}

const SECTIONS: Section[] = [
  {
    title: "1. Aceptación de los términos",
    blocks: [
      {
        t: "p",
        s: [
          'Al descargar, instalar o utilizar la aplicación Bitácora Fit (en adelante, "la App"), aceptas quedar vinculado por estos Términos y Condiciones. Si no estás de acuerdo con alguna parte, no deberías utilizar la App.',
        ],
      },
    ],
  },
  {
    title: "2. Descripción del servicio",
    blocks: [
      {
        t: "p",
        s: [
          "Bitácora Fit es una aplicación móvil de registro de entrenamientos que permite anotar ejercicios, series, repeticiones y pesos, así como visualizar el historial de sesiones y métricas de progreso.",
        ],
      },
      {
        t: "p",
        s: [
          "El servicio se ofrece ",
          { b: "de forma gratuita y sin publicidad" },
          ". No existen planes de pago ni funcionalidades bloqueadas detrás de un muro de pago.",
        ],
      },
    ],
  },
  {
    title: "3. Uso aceptable",
    blocks: [
      {
        t: "p",
        s: [
          "Te comprometes a utilizar Bitácora Fit exclusivamente para fines personales y legítimos. No está permitido:",
        ],
      },
      {
        t: "ul",
        items: [
          ["Intentar acceder a sistemas o datos de otros usuarios."],
          ["Realizar ingeniería inversa, descompilar o desensamblar la App."],
          ["Utilizar la App para fines ilícitos o que infrinjan derechos de terceros."],
          ["Distribuir o sublicenciar la App sin autorización expresa."],
        ],
      },
    ],
  },
  {
    title: "4. Limitación de responsabilidad",
    blocks: [
      {
        t: "p",
        s: [
          'Bitácora Fit se ofrece "tal cual" y "según disponibilidad". El desarrollador no garantiza que la App esté libre de errores, interrupciones o fallos técnicos.',
        ],
      },
      {
        t: "p",
        s: [
          { b: "Bitácora Fit no es un sustituto de consejo médico, deportivo ni nutricional profesional." },
          " Los datos de entrenamiento que registras son orientativos y no deben utilizarse como base para decisiones médicas o de salud.",
        ],
      },
      {
        t: "p",
        s: [
          "En la máxima medida permitida por la ley, el desarrollador no será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso de la App.",
        ],
      },
    ],
  },
  {
    title: "5. Propiedad intelectual",
    blocks: [
      {
        t: "p",
        s: [
          "Todos los derechos de propiedad intelectual sobre Bitácora Fit — incluyendo pero no limitado a código fuente, diseño, logotipos, marca y contenido — pertenecen al desarrollador.",
        ],
      },
      {
        t: "p",
        s: [
          "Los datos de entrenamiento que introduces en la App son de tu propiedad. El desarrollador no reclama ningún derecho sobre ellos.",
        ],
      },
    ],
  },
  {
    title: "6. Modificaciones del servicio y los términos",
    blocks: [
      {
        t: "p",
        s: [
          "El desarrollador se reserva el derecho de modificar, suspender o discontinuar la App (o cualquier parte de ella) en cualquier momento, con o sin previo aviso.",
        ],
      },
      {
        t: "p",
        s: [
          "Estos Términos y Condiciones pueden actualizarse periódicamente. Los cambios se publicarán en esta página con la fecha de última actualización. El uso continuado de la App tras la publicación de los cambios constituye la aceptación de los mismos.",
        ],
      },
    ],
  },
  {
    title: "7. Legislación aplicable",
    blocks: [
      {
        t: "p",
        s: [
          "Estos términos se rigen e interpretan de acuerdo con las leyes de España. Para la resolución de cualquier controversia derivada de estos términos, las partes se someten a la jurisdicción de los tribunales competentes de España.",
        ],
      },
    ],
  },
];

export default function TerminosPage() {
  return (
    <>
      <PageHeader />
      <main>
        <PageHero tag="Legal" title="Términos y Condiciones" />

        <section className="pb-20 md:pb-32 px-5">
          <div className="mx-auto max-w-3xl">
            {/* Last updated */}
            <p className="text-sm text-muted/60 mb-12 text-center">
              Última actualización: 8 de agosto de 2026
            </p>

            <div className="flex flex-col gap-10">
              {SECTIONS.map((section) => (
                <div key={section.title}>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight mb-4">
                    {section.title}
                  </h2>
                  <div className="text-sm md:text-base text-muted leading-relaxed">
                    <ContentRenderer blocks={section.blocks} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
