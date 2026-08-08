import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PageHero from "@/components/ui/PageHero";
import Footer from "@/components/sections/Footer";
import { BLOG_POSTS } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog — Bitácora Fit | Aprende a entrenar con datos",
  description:
    "Artículos sobre entrenamiento de fuerza, sobrecarga progresiva y cómo registrar tus entrenos para progresar de verdad en el gimnasio.",
};

/* Tag color map */
function getTagColor(tag: string) {
  switch (tag) {
    case "Progreso":
      return "text-accent bg-accent/10 border-accent/20";
    case "Entrenamiento":
      return "text-blue-400 bg-blue-400/10 border-blue-400/20";
    case "Guía":
      return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    default:
      return "text-muted bg-white/5 border-white/10";
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <PageHeader />
      <main>
        <PageHero
          tag="Blog"
          title="Aprende a entrenar con datos"
          subtitle="Artículos sobre entrenamiento, progreso y cómo sacar el máximo partido a tu registro de sesiones."
        />

        <section className="pb-20 md:pb-32 px-5">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  {/* Flat card */}
                  <div className="h-full rounded-[1.5rem] border border-white/10 bg-surface p-6 md:p-8 flex flex-col shadow-lg transition-all duration-500 ease-out motion-safe:group-hover:scale-[0.98] group-hover:bg-surface/80 group-hover:border-white/20">
                      {/* Tag + Meta */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border ${getTagColor(post.tag)}`}
                        >
                          {post.tag}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted/60">
                          <Clock className="size-3" />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-3 tracking-tight leading-snug group-hover:text-accent transition-colors duration-300">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <span className="text-xs text-muted/60">
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Leer
                          <ArrowRight className="size-3" />
                        </span>
                      </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
