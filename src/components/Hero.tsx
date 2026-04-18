import React from "react";
import { ArrowRight } from "lucide-react";
import { buildWhatsappLink } from "../utils/whatsapp";

const heroSlides = [
  "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/8217498/pexels-photo-8217498.jpeg?auto=compress&cs=tinysrgb&w=1920",
];

const Hero: React.FC = () => {
  const scrollToCollection = () => {
    document
      .getElementById("collection")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-end overflow-hidden bg-stone-950"
    >
      <div className="absolute inset-0">
        {heroSlides.map((src, i) => (
          <div
            key={src}
            className={`hero-slide absolute inset-0 overflow-hidden hero-slide-${i + 1}`}
          >
            <img
              src={src}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover animate-hero-zoom"
            />
          </div>
        ))}

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
      </div>

      <div className="absolute left-0 right-0 top-24 flex justify-between px-6 text-[10px] font-medium uppercase tracking-[0.3em] text-white/90 md:top-28 md:px-10">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#DC2626]" />
          Colección FW 2025
        </span>
        <span className="hidden items-center gap-2 md:flex">
          Edición Limitada
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
        </span>
      </div>

      <div className="relative z-10 w-full px-6 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.35em] text-white/85">
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
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-stone-950 transition-all duration-300 hover:bg-stone-100"
            >
              Ver Colección
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href={buildWhatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/50 bg-black/20 px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
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
