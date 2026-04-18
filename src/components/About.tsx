import React from "react";
import buzosImg from "../assets/buzos.jpg";

const About: React.FC = () => {
  return (
    <section id="about" className="bg-stone-50 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-24">
        <div className="lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-stone-200">
            <img
              src={buzosImg}
              alt="UrbanSwag — Hecho en Colombia"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-stone-500">
            Nuestra Historia
          </p>
          <h2 className="mb-10 text-4xl font-light leading-tight tracking-tight text-stone-950 md:text-6xl">
            Hechos para la
            <br />
            <span className="italic font-serif">calle.</span>
          </h2>

          <div className="space-y-5 text-base leading-relaxed text-stone-600 md:text-lg">
            <p>
              En UrbanSwag diseñamos buzos que duran. Cada pieza parte de una
              idea simple: comodidad, calidad y un corte que te acompañe en
              cualquier contexto urbano.
            </p>
            <p>
              Trabajamos con algodón premium y fleece perchado, cosemos en
              talleres locales, y producimos en tiradas cortas para mantener el
              detalle y la identidad de cada prenda.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-8 border-t border-stone-200 pt-10">
            <div>
              <div className="text-3xl font-light text-stone-950 md:text-4xl">
                100%
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-stone-500">
                Algodón Premium
              </div>
            </div>
            <div>
              <div className="text-3xl font-light text-stone-950 md:text-4xl">
                06
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-stone-500">
                Piezas en Drop
              </div>
            </div>
            <div>
              <div className="text-3xl font-light text-stone-950 md:text-4xl">
                CO
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-stone-500">
                Hecho en Colombia
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
