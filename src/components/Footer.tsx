import React from "react";
import { Instagram } from "lucide-react";
import { buildWhatsappLink } from "../utils/whatsapp";

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h3 className="text-2xl font-semibold tracking-[0.2em] text-white">
              URBANSWAG
            </h3>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-stone-400">
              Streetwear honesto. Piezas en edición limitada, hechas en
              Colombia.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500">
              Navegá
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="#collection" className="hover:text-white">
                  Colección
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white">
                  Historia
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white">
                  Ubicación
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500">
              Contacto
            </h4>
            <div className="mt-5 space-y-3 text-sm">
              <a
                href={buildWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white"
              >
                WhatsApp · +57 313 731 4694
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-stone-800 pt-8 text-xs text-stone-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} UrbanSwag. Todos los derechos reservados.</p>
          <p className="tracking-[0.2em] uppercase">Hecho en Colombia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
