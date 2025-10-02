import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">UrbanSwag</h3>
            <p className="text-gray-400 leading-relaxed">
              Redefiniendo el streetwear con diseños únicos y calidad premium para la nueva generación urbana.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Colección</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Sobre Nosotros</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Contacto</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Política de Devoluciones</a></li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 bg-gray-800 hover:bg-blue-500 rounded-lg transition-colors duration-300 group"
              >
                <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-800 hover:bg-blue-500 rounded-lg transition-colors duration-300 group"
              >
                <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-800 hover:bg-blue-500 rounded-lg transition-colors duration-300 group"
              >
                <div className="w-6 h-6 group-hover:scale-110 transition-transform duration-300 text-center font-bold">
                  T
                </div>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © 2025 UrbanSwag. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;