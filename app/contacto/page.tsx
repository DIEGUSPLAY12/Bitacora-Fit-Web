"use client";

import PageHeader from "@/components/ui/PageHeader";
import PageHero from "@/components/ui/PageHero";
import Footer from "@/components/sections/Footer";
import ContactForm from "@/components/sections/ContactForm";
import ContactCards from "@/components/sections/ContactCards";

export default function ContactoPage() {
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
                <ContactForm />
              </div>
            </div>

            {/* ── Tarjetas de contacto ── */}
            <ContactCards />

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
