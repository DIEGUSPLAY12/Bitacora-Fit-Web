import type { Metadata } from "next";
import { ContentRenderer, Block } from "@/lib/content";
import LegalPageLayout from "@/components/ui/LegalPageLayout";

export const metadata: Metadata = {
  title: "Aviso Legal — Bitácora Fit",
  description:
    "Aviso legal de Bitácora Fit. Información sobre el responsable del sitio web, condiciones de uso y propiedad intelectual.",
};

interface Section {
  title: string;
  blocks: Block[];
}

const SECTIONS: Section[] = [
  {
    title: "1. Datos identificativos del responsable",
    blocks: [
      {
        t: "p",
        s: [
          "En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos identificativos del responsable del sitio web:",
        ],
      },
      {
        t: "ul",
        items: [
          [{ b: "Denominación:" }, " Bitácora Fit (desarrollador independiente)"],
          [{ b: "Actividad:" }, " Desarrollo de aplicaciones móviles"],
          [{ b: "País:" }, " España"],
          [
            { b: "Contacto:" },
            " A través del formulario disponible en la sección de Contacto de este sitio web.",
          ],
        ],
      },
    ],
  },
  {
    title: "2. Objeto y ámbito de aplicación",
    blocks: [
      {
        t: "p",
        s: [
          'El presente Aviso Legal regula el acceso y uso del sitio web de Bitácora Fit (en adelante, "el Sitio"), accesible a través de Internet. El acceso al Sitio implica la aceptación plena y sin reservas de las presentes condiciones.',
        ],
      },
      {
        t: "p",
        s: [
          "El Sitio tiene como finalidad informar sobre la aplicación móvil Bitácora Fit, facilitar su descarga y proporcionar contenidos de utilidad para el usuario en materia de entrenamiento y registro deportivo.",
        ],
      },
    ],
  },
  {
    title: "3. Propiedad intelectual e industrial",
    blocks: [
      {
        t: "p",
        s: [
          "Todos los contenidos del Sitio — incluyendo, a título enunciativo y no limitativo, textos, fotografías, gráficos, imágenes, iconos, tecnología, software, enlaces y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente — son propiedad intelectual del responsable o de terceros que han autorizado su uso, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación reconocidos por la normativa vigente en materia de propiedad intelectual.",
        ],
      },
      {
        t: "p",
        s: [
          "Queda expresamente prohibida la reproducción, distribución, comunicación pública y transformación, total o parcial, de los contenidos del Sitio sin la autorización expresa y por escrito del responsable.",
        ],
      },
    ],
  },
  {
    title: "4. Condiciones de uso",
    blocks: [
      {
        t: "p",
        s: [
          "El usuario se compromete a hacer un uso adecuado y lícito del Sitio, de conformidad con la legislación aplicable, las presentes condiciones, la moral y el orden público. Queda prohibido:",
        ],
      },
      {
        t: "ul",
        items: [
          ["Usar el Sitio con fines ilícitos o contrarios a las presentes condiciones."],
          ["Difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico o que atente contra los derechos humanos."],
          ["Introducir o difundir virus o cualquier otro sistema físico o lógico que sea susceptible de provocar daños."],
          ["Intentar acceder, utilizar y/o manipular los datos del responsable o de terceros."],
        ],
      },
    ],
  },
  {
    title: "5. Exclusión de garantías y responsabilidad",
    blocks: [
      {
        t: "p",
        s: [
          "El responsable no garantiza la disponibilidad y continuidad del funcionamiento del Sitio. Cuando ello sea razonablemente posible, el responsable advertirá previamente de las interrupciones en el funcionamiento del Sitio.",
        ],
      },
      {
        t: "p",
        s: [
          "El responsable no se responsabiliza de los daños y perjuicios de cualquier naturaleza que pudieran derivarse de la falta de disponibilidad o continuidad del Sitio, del engaño del usuario o la información contenida en el mismo.",
        ],
      },
      {
        t: "p",
        s: [
          "El Sitio puede contener enlaces a sitios web de terceros. El responsable no controla ni se hace responsable de los contenidos, políticas de privacidad o prácticas de dichos sitios.",
        ],
      },
    ],
  },
  {
    title: "6. Legislación aplicable y jurisdicción",
    blocks: [
      {
        t: "p",
        s: [
          "Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia derivada del acceso o uso del Sitio, las partes se someten a la jurisdicción de los juzgados y tribunales competentes de España.",
        ],
      },
    ],
  },
];

export default function AvisoLegalPage() {
  return (
    <LegalPageLayout title="Aviso Legal" lastUpdated="18 de septiembre de 2026">
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
    </LegalPageLayout>
  );
}
