export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg/50 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-accent">&gt;_</span>
            <h3 className="font-mono text-text-h text-sm hover:text-accent transition-colors">
              Tomas Madariaga
            </h3>
          </div>

          <p className="font-mono text-text/40 text-xs">
            © {currentYear} secure by design, powered by ☕
          </p>
        </div>
      </div>
    </footer>
  );
};
