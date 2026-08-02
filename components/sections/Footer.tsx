export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-surface">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <p className="text-sm text-muted">
          © {currentYear} Bitácora Fit. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
