import React from "react";
import { MapPin, MessageCircle, Clock } from "lucide-react";
import { buildWhatsappLink } from "../utils/whatsapp";

const Location: React.FC = () => {
  return (
    <section id="location" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 border-b border-stone-200 pb-10">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.35em] text-stone-500">
            Contacto
          </p>
          <h2 className="text-5xl font-light leading-[0.95] tracking-tight text-stone-950 md:text-7xl">
            Visítanos o
            <br />
            <span className="italic font-serif">escribinos.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="aspect-[4/3] overflow-hidden border border-stone-200 bg-stone-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254508.51050304466!2d-74.29732906773082!3d4.648625200000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2zQm9nb3TDoSwgQ3VuZGluYW1hcmNh!5e0!3m2!1ses!2sco!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación UrbanSwag"
              />
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-5">
            <div className="border border-stone-200 bg-stone-50 p-8">
              <div className="mb-6 flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-stone-950" />
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
                    Dirección
                  </h3>
                  <p className="mt-2 leading-relaxed text-stone-900">
                    Bogotá, Colombia
                    <br />
                    (Atención por cita previa)
                  </p>
                </div>
              </div>

              <div className="mb-6 flex items-start gap-4 border-t border-stone-200 pt-6">
                <MessageCircle className="mt-1 h-5 w-5 text-stone-950" />
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
                    WhatsApp
                  </h3>
                  <p className="mt-2 text-stone-900">+57 313 731 4694</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-stone-200 pt-6">
                <Clock className="mt-1 h-5 w-5 text-stone-950" />
                <div className="w-full">
                  <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
                    Horarios
                  </h3>
                  <div className="mt-3 space-y-1.5 text-sm text-stone-700">
                    <div className="flex justify-between">
                      <span>Lun – Vie</span>
                      <span>9:00 – 19:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábado</span>
                      <span>10:00 – 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingo</span>
                      <span>Cerrado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={buildWhatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-stone-950 px-8 py-5 text-xs font-medium uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-stone-800"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
