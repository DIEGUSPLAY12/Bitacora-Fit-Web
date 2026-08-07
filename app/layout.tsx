import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScroll from "@/components/ui/SmoothScroll";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bitácora Fit — Registra tus entrenos, entrena con criterio",
  description:
    "Bitácora Fit es la app para registrar peso, series y repeticiones en el gimnasio. Lleva el control real de tu progreso y entrena con datos, no con memoria.",
  openGraph: {
    title: "Bitácora Fit — Registra tus entrenos, entrena con criterio",
    description:
      "App de registro de entrenamientos para Android. Controla tu peso, series y repeticiones y mide tu progreso real en el gimnasio.",
    type: "website",
    locale: "es_ES",
    siteName: "Bitácora Fit",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground relative selection:bg-accent selection:text-background overflow-x-hidden">
        <NoiseOverlay />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
