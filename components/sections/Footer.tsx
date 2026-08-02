import DownloadButton from "@/components/ui/DownloadButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-surface">
      <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted text-center sm:text-left">
          © {currentYear} Bitácora Fit. Todos los derechos reservados.
        </p>
        <DownloadButton />
      </div>
    </footer>
  );
}
