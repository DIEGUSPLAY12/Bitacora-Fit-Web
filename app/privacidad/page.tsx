import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import PageHero from "@/components/ui/PageHero";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad — Bitácora Fit",
  description:
    "Política de privacidad de Bitácora Fit. Conoce qué datos recogemos, cómo los protegemos y cuáles son tus derechos como usuario.",
};

const SECTIONS = [
  {
    title: "1. Responsable del tratamiento",
    content: `
      <p>El responsable del tratamiento de tus datos personales es el desarrollador independiente de Bitácora Fit (en adelante, "nosotros" o "el desarrollador").</p>
      <p>Para cualquier consulta relacionada con la privacidad, puedes contactarnos a través del formulario de contacto disponible en esta web o mediante el correo electrónico indicado en la sección de contacto.</p>
    `,
  },
  {
    title: "2. Qué datos recogemos",
    content: `
      <p>Bitácora Fit está diseñada con la privacidad como prioridad. Los datos que se procesan son:</p>
      <ul>
        <li><strong>Datos de cuenta:</strong> dirección de correo electrónico utilizada para el registro (si aplica).</li>
        <li><strong>Datos de entrenamiento:</strong> ejercicios, series, repeticiones, pesos y fechas que tú introduces voluntariamente en la app.</li>
        <li><strong>Datos técnicos:</strong> información básica del dispositivo (modelo, versión del sistema operativo) para garantizar el correcto funcionamiento de la app.</li>
      </ul>
      <p><strong>No recogemos</strong> datos de ubicación, contactos, fotos, ni ningún dato personal más allá de los estrictamente necesarios para el funcionamiento del servicio.</p>
    `,
  },
  {
    title: "3. Cómo almacenamos tus datos",
    content: `
      <p>Bitácora Fit funciona con una arquitectura <strong>offline-first</strong>. Esto significa que tus datos de entrenamiento se almacenan principalmente en tu dispositivo local.</p>
      <p>Si la app utiliza sincronización en la nube, los datos se almacenan en servidores seguros con cifrado en tránsito (TLS) y en reposo. No vendemos, alquilamos ni compartimos tus datos con terceros con fines comerciales.</p>
    `,
  },
  {
    title: "4. Con quién compartimos tus datos",
    content: `
      <p><strong>Con nadie.</strong> No compartimos tus datos personales ni de entrenamiento con terceros, salvo que sea estrictamente necesario para:</p>
      <ul>
        <li>Cumplir con una obligación legal.</li>
        <li>Proteger nuestros derechos legales.</li>
        <li>Proveedores técnicos esenciales (hosting, analítica anónima) que actúan como encargados del tratamiento bajo contrato.</li>
      </ul>
    `,
  },
  {
    title: "5. Tus derechos (RGPD)",
    content: `
      <p>Si te encuentras en la Unión Europea, tienes derecho a:</p>
      <ul>
        <li><strong>Acceso:</strong> solicitar una copia de tus datos personales.</li>
        <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
        <li><strong>Supresión:</strong> solicitar la eliminación de tus datos ("derecho al olvido").</li>
        <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado y legible por máquina.</li>
        <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos en determinadas circunstancias.</li>
        <li><strong>Limitación:</strong> solicitar la restricción del tratamiento de tus datos.</li>
      </ul>
      <p>Para ejercer cualquiera de estos derechos, contáctanos a través del formulario de contacto de esta web.</p>
    `,
  },
  {
    title: "6. Cookies y analítica",
    content: `
      <p>Este sitio web puede utilizar cookies técnicas estrictamente necesarias para su funcionamiento. No utilizamos cookies publicitarias ni de rastreo de terceros.</p>
      <p>La app puede utilizar herramientas de analítica anónima para comprender el uso general y mejorar el producto. Estos datos son agregados y no permiten identificar a usuarios individuales.</p>
    `,
  },
  {
    title: "7. Modificaciones",
    content: `
      <p>Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios se publicarán en esta página con la fecha de última actualización. Te recomendamos revisarla periódicamente.</p>
    `,
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
                  <div
                    className="
                      text-sm md:text-base text-muted leading-relaxed
                      [&_p]:mb-4
                      [&_ul]:mb-4 [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:list-disc
                      [&_li]:text-muted [&_li]:leading-relaxed
                      [&_strong]:text-foreground [&_strong]:font-semibold
                    "
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
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
