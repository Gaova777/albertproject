import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { buildWhatsappLink } from "../utils/whatsapp";

const navItems = [
  { label: "Colección", target: "collection" },
  { label: "Historia", target: "about" },
  { label: "Ubicación", target: "location" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-stone-200"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
        <button
          onClick={scrollTop}
          className="text-lg font-semibold tracking-[0.2em] text-stone-900 transition-opacity hover:opacity-70"
        >
          URBANSWAG
        </button>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className="text-xs font-medium uppercase tracking-[0.2em] text-stone-700 transition-colors hover:text-stone-950"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={buildWhatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-stone-900 bg-stone-900 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-stone-900 md:inline-block"
          >
            Comprar
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center text-stone-900 md:hidden"
            aria-label="Menú"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-stone-200 bg-white transition-[max-height] duration-500 md:hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className="py-3 text-left text-sm font-medium uppercase tracking-[0.2em] text-stone-700 hover:text-stone-950"
            >
              {item.label}
            </button>
          ))}
          <a
            href={buildWhatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 rounded-full border border-stone-900 bg-stone-900 px-5 py-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-white"
          >
            Comprar por WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
