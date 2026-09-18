import PageHeader from "@/components/ui/PageHeader";
import PageHero from "@/components/ui/PageHero";
import Footer from "@/components/sections/Footer";
import { ReactNode } from "react";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <>
      <PageHeader />
      <main>
        <PageHero tag="Legal" title={title} />
        <section className="pb-20 md:pb-32 px-5">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted/60 mb-12 text-center">
              Última actualización: {lastUpdated}
            </p>
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
