import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-card bg-surface p-7 transition-transform duration-300 ease-out hover:-translate-y-1">
      <Icon className="size-8 text-accent" strokeWidth={2} aria-hidden />
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </article>
  );
}
