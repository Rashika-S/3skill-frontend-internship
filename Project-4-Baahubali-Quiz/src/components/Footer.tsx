export function Footer() {
  return (
    <footer className="mt-16 border-t border-[color:var(--color-border)] bg-[rgba(15,15,15,0.6)] py-6 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-[color:var(--color-muted-foreground)] sm:px-6">
        <p className="font-display tracking-widest gold-text">JAI MAHISHMATI</p>
        <p className="mt-1">© {new Date().getFullYear()} Baahubali Quiz · Fan-made tribute.</p>
      </div>
    </footer>
  );
}
