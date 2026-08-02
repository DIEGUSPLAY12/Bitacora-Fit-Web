import DownloadButton from "@/components/ui/DownloadButton";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-5 py-3">
        <span className="text-lg font-bold tracking-tight text-foreground">
          Bitácora Fit
        </span>
        <DownloadButton compact />
      </div>
    </header>
  );
}
