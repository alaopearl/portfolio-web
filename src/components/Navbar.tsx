import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, Sun, Moon, Lock, Sparkle } from "@phosphor-icons/react";
import { NAV_LINKS } from "@/constants";
import { usePortfolio } from "@/context/PortfolioContext";

export function Navbar() {
  const { theme, toggleTheme, openModal } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-border shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
        <button onClick={() => handleNav("#home")} className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-600/30">
            <Sparkle size={18} weight="fill" />
          </span>
          <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Abdullahi<span className="text-blue-500">.</span>
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleNav(l.href)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid size-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => openModal("admin")}
            aria-label="Admin portal"
            className="hidden size-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground sm:grid"
          >
            <Lock size={16} />
          </button>
          <button
            onClick={() => handleNav("#contact")}
            className="hidden rounded-lg bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.03] active:scale-95 sm:inline-flex"
          >
            Hire Me
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className="grid size-9 place-items-center rounded-lg border border-border bg-card lg:hidden"
          >
            {menuOpen ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => handleNav(l.href)}
                    className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li className="mt-2 flex gap-2 border-t border-border pt-3">
                <button
                  onClick={() => { setMenuOpen(false); openModal("admin"); }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm font-medium"
                >
                  <Lock size={14} /> Admin
                </button>
                <button
                  onClick={() => handleNav("#contact")}
                  className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-emerald-500 px-3 py-2.5 text-sm font-semibold text-white"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
