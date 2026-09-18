import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import PageHero from "@/components/ui/PageHero";
import Footer from "@/components/sections/Footer";
import { ContentRenderer, Block } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de Privacidad — Bitácora Fit",
  description:
    "Política de privacidad de Bitácora Fit. Conoce qué datos recogemos, cómo los protegemos y cuáles son tus derechos como usuario.",
};

interface Section {
  title: string;
  blocks: Block[];
}

const SECTIONS: Section[] = [
  {
    title: "1. Responsable del tratamiento",
    blocks: [
      {
        t: "p",
        s: [
          'El responsable del tratamiento de tus datos personales es el desarrollador independiente de Bitácora Fit (en adelante, "nosotros" o "el desarrollador").',
        ],
      },
      {
        t: "p",
        s: [
          "Para cualquier consulta relacionada con la privacidad, puedes contactarnos a través del formulario de contacto disponible en esta web o mediante el correo electrónico indicado en la sección de contacto.",
        ],
      },
    ],
  },
  {
    title: "2. Qué datos recogemos",
    blocks: [
      {
        t: "p",
        s: ["Bitácora Fit está diseñada con la privacidad como prioridad. Los datos que se procesan son:"],
      },
      {
        t: "ul",
        items: [
          [{ b: "Datos de cuenta:" }, " dirección de correo electrónico utilizada para el registro (si aplica)."],
          [{ b: "Datos de entrenamiento:" }, " ejercicios, series, repeticiones, pesos y fechas que tú introduces voluntariamente en la app."],
          [{ b: "Datos técnicos:" }, " información básica del dispositivo (modelo, versión del sistema operativo) para garantizar el correcto funcionamiento de la app."],
        ],
      },
      {
        t: "p",
        s: [
          { b: "No recogemos" },
          " datos de ubicación, contactos, fotos, ni ningún dato personal más allá de los estrictamente necesarios para el funcionamiento del servicio.",
        ],
      },
    ],
  },
  {
    title: "3. Cómo almacenamos tus datos",
    blocks: [
      {
        t: "p",
        s: [
          "Bitácora Fit funciona con una arquitectura ",
          { b: "offline-first" },
          ". Esto significa que tus datos de entrenamiento se almacenan principalmente en tu dispositivo local.",
        ],
      },
      {
        t: "p",
        s: [
          "Si la app utiliza sincronización en la nube, los datos se almacenan en servidores seguros con cifrado en tránsito (TLS) y en reposo. No vendemos, alquilamos ni compartimos tus datos con terceros con fines comerciales.",
        ],
      },
    ],
  },
  {
    title: "4. Con quién compartimos tus datos",
    blocks: [
      {
        t: "p",
        s: [
          { b: "Con nadie." },
          " No compartimos tus datos personales ni de entrenamiento con terceros, salvo que sea estrictamente necesario para:",
        ],
      },
      {
        t: "ul",
        items: [
          ["Cumplir con una obligación legal."],
          ["Proteger nuestros derechos legales."],
          ["Proveedores técnicos esenciales (hosting, analítica anónima) que actúan como encargados del tratamiento bajo contrato."],
        ],
      },
    ],
  },
  {
    title: "5. Tus derechos (RGPD)",
    blocks: [
      {
        t: "p",
        s: ["Si te encuentras en la Unión Europea, tienes derecho a:"],
      },
      {
        t: "ul",
        items: [
          [{ b: "Acceso:" }, " solicitar una copia de tus datos personales."],
          [{ b: "Rectificación:" }, " corregir datos inexactos o incompletos."],
          [{ b: "Supresión:" }, ' solicitar la eliminación de tus datos ("derecho al olvido").'],
          [{ b: "Portabilidad:" }, " recibir tus datos en un formato estructurado y legible por máquina."],
          [{ b: "Oposición:" }, " oponerte al tratamiento de tus datos en determinadas circunstancias."],
          [{ b: "Limitación:" }, " solicitar la restricción del tratamiento de tus datos."],
        ],
      },
      {
        t: "p",
        s: ["Para ejercer cualquiera de estos derechos, contáctanos a través del formulario de contacto de esta web."],
      },
    ],
  },
  {
    title: "6. Cookies y analítica",
    blocks: [
      {
        t: "p",
        s: [
          "Este sitio web puede utilizar cookies técnicas estrictamente necesarias para su funcionamiento. No utilizamos cookies publicitarias ni de rastreo de terceros.",
        ],
      },
      {
        t: "p",
        s: [
          "La app puede utilizar herramientas de analítica anónima para comprender el uso general y mejorar el producto. Estos datos son agregados y no permiten identificar a usuarios individuales.",
        ],
      },
    ],
  },
  {
    title: "7. Modificaciones",
    blocks: [
      {
        t: "p",
        s: [
          "Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios se publicarán en esta página con la fecha de última actualización. Te recomendamos revisarla periódicamente.",
        ],
      },
    ],
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <PageHeader />
      <main>
        <PageHero tag="Legal" title="Política de Privacidad" />

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
