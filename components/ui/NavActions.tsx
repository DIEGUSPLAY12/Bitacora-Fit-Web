import { Menu, X } from "lucide-react";
import DownloadButton from "@/components/ui/DownloadButton";

interface NavActionsProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export default function NavActions({ isMobileMenuOpen, setIsMobileMenuOpen }: NavActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden md:block">
        <DownloadButton compact />
      </div>

      <button
        className="md:hidden p-2 text-foreground rounded-full hover:bg-white/5 transition-colors focus-visible:outline-accent"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-expanded={isMobileMenuOpen}
        aria-label="Abrir menú de navegación"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </div>
  );
}
