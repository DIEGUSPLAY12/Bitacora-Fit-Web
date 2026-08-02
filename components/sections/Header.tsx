"use client";

import { useEffect, useState } from "react";
import DownloadButton from "@/components/ui/DownloadButton";

const SCROLL_THRESHOLD = 40;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll(); // check initial state
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "transition-[background-color,backdrop-filter] duration-300 ease-out",
        "border-b border-surface",
        scrolled
          ? "bg-background backdrop-blur-md"
          : "bg-transparent backdrop-blur-none",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-5 py-3">
        <span className="text-lg font-bold tracking-tight text-foreground">
          Bitácora Fit
        </span>
        <DownloadButton compact />
      </div>
    </header>
  );
}
