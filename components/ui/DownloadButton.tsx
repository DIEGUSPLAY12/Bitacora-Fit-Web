interface DownloadButtonProps {
  compact?: boolean;
}

export default function DownloadButton({ compact = false }: DownloadButtonProps) {
  return (
    <a
      href="#descargar"
      className={[
        "inline-flex items-center justify-center font-bold",
        "rounded-button bg-accent text-background",
        "transition-all duration-200 ease-out",
        "hover:opacity-85 active:opacity-75 active:scale-[0.97]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        compact
          ? "px-4 py-2 text-sm"
          : "px-6 py-3 text-base",
      ].join(" ")}
    >
      {compact ? "Descargar" : "Descargar para Android"}
    </a>
  );
}
