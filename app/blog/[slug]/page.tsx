import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import DownloadButton from "@/components/ui/DownloadButton";
import Footer from "@/components/sections/Footer";
import { BLOG_POSTS } from "@/data/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Artículo no encontrado — Bitácora Fit" };

  return {
    title: `${post.title} — Blog Bitácora Fit`,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <PageHeader />
      <main>
        {/* Breadcrumb + Hero */}
        <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 px-5 overflow-hidden">


          <div className="mx-auto max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
              <Link href="/blog" className="hover:text-foreground transition-colors flex items-center gap-1">
                <ArrowLeft className="size-3.5" />
                Blog
              </Link>
              <ChevronRight className="size-3 text-muted/40" />
              <span className="text-foreground/60 truncate max-w-[200px] md:max-w-none">{post.title}</span>
            </nav>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs text-muted/60">{formatDate(post.date)}</span>
              <span className="text-muted/20">·</span>
              <span className="flex items-center gap-1 text-xs text-muted/60">
                <Clock className="size-3" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight font-bold text-foreground text-balance">
              {post.title}
            </h1>
          </div>
        </section>

        {/* Article content */}
        <section className="pb-16 md:pb-24 px-5">
          <div className="mx-auto max-w-3xl">
            <div
              className="
                prose-custom
                text-base md:text-lg text-muted leading-relaxed
                [&_h2]:font-display [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:tracking-tight [&_h2]:mt-12 [&_h2]:mb-4
                [&_p]:mb-6
                [&_ul]:mb-6 [&_ul]:pl-6 [&_ul]:space-y-2
                [&_li]:text-muted [&_li]:leading-relaxed
                [&_strong]:text-foreground [&_strong]:font-semibold
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 px-5 border-t border-white/5">
          <div className="mx-auto max-w-3xl text-center flex flex-col items-center gap-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Empieza a registrar tus entrenos hoy
            </h2>
            <p className="text-muted text-base max-w-lg">
              Bitácora Fit es completamente gratuita, sin anuncios y diseñada para gente que se toma en serio el gimnasio.
            </p>
            <DownloadButton />
          </div>
        </section>

        {/* Other posts */}
        {otherPosts.length > 0 && (
          <section className="py-12 md:py-16 px-5">
            <div className="mx-auto max-w-3xl">
              <h3 className="font-display text-xl font-bold text-foreground mb-6 tracking-tight">
                Otros artículos
              </h3>
              <div className="flex flex-col gap-4">
                {otherPosts.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/blog/${other.slug}`}
                    className="group flex items-center justify-between gap-4 p-5 bg-surface/30 border border-white/5 rounded-2xl hover:bg-surface/60 transition-colors duration-300"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-foreground group-hover:text-accent transition-colors duration-300 truncate">
                        {other.title}
                      </h4>
                      <span className="text-xs text-muted/60 mt-1 block">
                        {formatDate(other.date)} · {other.readTime}
                      </span>
                    </div>
                    <ChevronRight className="size-4 text-muted/40 group-hover:text-accent shrink-0 transition-colors duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
