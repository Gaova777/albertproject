import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import brandLogo from "../assets/icon.png";
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

  const chromeClass = isScrolled
    ? "bg-white/95 backdrop-blur-md border-b border-stone-200"
    : "bg-gradient-to-b from-black/60 via-black/30 to-transparent border-b border-transparent backdrop-blur-[2px]";

  const linkColor = isScrolled
    ? "text-stone-700 hover:text-stone-950"
    : "text-white/90 hover:text-white";

  const logoTextColor = isScrolled ? "text-stone-950" : "text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${chromeClass}`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
        <button
          onClick={scrollTop}
          className={`group flex items-center gap-3 transition-opacity hover:opacity-80 ${logoTextColor}`}
        >
          <img
            src={brandLogo}
            alt="UrbanSwag"
            className="h-9 w-auto md:h-10"
            style={{ filter: isScrolled ? "none" : "drop-shadow(0 2px 8px rgba(0,0,0,0.6))" }}
          />
          <span className="text-lg font-semibold tracking-[0.2em] md:text-xl">
            URBANSWAG
          </span>
        </button>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className={`group relative text-xs font-medium uppercase tracking-[0.2em] transition-colors ${linkColor}`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#DC2626] to-[#2563EB] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={buildWhatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 md:inline-block ${
              isScrolled
                ? "border border-stone-950 bg-stone-950 text-white hover:bg-white hover:text-stone-950"
                : "border border-white bg-white text-stone-950 hover:bg-stone-950 hover:text-white hover:border-stone-950"
            }`}
          >
            Comprar
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex h-10 w-10 items-center justify-center md:hidden ${
              isScrolled ? "text-stone-950" : "text-white"
            }`}
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
            className="mt-2 rounded-full border border-stone-950 bg-stone-950 px-5 py-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-white"
          >
            Comprar por WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
