import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Dna, Instagram, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import christianPhoto from "@/assets/christian-milfont.png";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/ciencia", label: "Ciência da Hipertrofia" },
  { path: "/biomecanica", label: "Biomecânica" },
  { path: "/amplitude", label: "Amplitude" },
  { path: "/interativo", label: "Simulador" },
  { path: "/avancado", label: "Avançado" },
  { path: "/referencias", label: "Referências" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-xl bg-background/80">
        <div className="section-container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Dna className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Myo<span className="text-primary">Lab</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary text-foreground"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-border overflow-hidden bg-background"
            >
              <nav className="section-container py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16">{children}</main>

      <footer className="border-t border-border mt-20">
        <div className="section-container py-12">
          {/* Creator Section */}
          <div className="flex flex-col items-center mb-10 pb-10 border-b border-border">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Criado por</p>
            <img
              src={christianPhoto}
              alt="Christian Milfont"
              className="w-20 h-20 rounded-full object-cover border-2 border-primary/30 mb-3"
            />
            <h3 className="font-display font-bold text-lg text-foreground">Christian Milfont</h3>
            <div className="flex items-center gap-3 mt-3">
              <a
                href="https://www.instagram.com/chriss021_/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/christianmilfont/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Brand */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Dna className="w-5 h-5 text-primary" />
              <span className="font-display font-bold text-foreground">
                Myo<span className="text-primary">Lab</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Ciência aplicada à musculação. Conteúdo baseado em evidências científicas para otimizar seus treinos.
            </p>
            <p className="text-xs text-muted-foreground mt-4">© 2026 MyoLab. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
