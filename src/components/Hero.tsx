import React from "react";
import { ArrowRight } from "lucide-react";
import heroImage from "../assets/buzos.jpg";
import { buildWhatsappLink } from "../utils/whatsapp";

const Hero: React.FC = () => {
  const scrollToCollection = () => {
    document
      .getElementById("collection")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-end overflow-hidden bg-stone-100"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImage}
          alt="UrbanSwag — Streetwear Colombia"
          className="h-full w-full object-cover animate-hero-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />
      </div>

      <div className="absolute left-0 right-0 top-24 flex justify-between px-6 text-[10px] uppercase tracking-[0.3em] text-white/80 md:top-28 md:px-10">
        <span>Colección FW 2025</span>
        <span className="hidden md:inline">Edición Limitada</span>
      </div>

      <div className="relative z-10 w-full px-6 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.35em] text-white/80">
            Heavyweight · Hecho en Colombia
          </p>
          <h1 className="text-[12vw] font-light leading-[0.9] tracking-tight text-white md:text-[9vw] lg:text-[8rem]">
            Define tu estilo,
            <br />
            <span className="italic font-serif">viste tu actitud.</span>
          </h1>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button
              onClick={scrollToCollection}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-stone-900 transition-all duration-300 hover:bg-stone-100"
            >
              Ver Colección
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href={buildWhatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/40 px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              Comprar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
