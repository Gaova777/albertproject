import React from 'react';
import { MapPin, Phone } from 'lucide-react';

const Location: React.FC = () => {
  return (
    <section id="location" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-blue-500">Encuéntranos</span>
          </h2>
          <p className="text-xl text-gray-600">
            Visita nuestra tienda física para vivir la experiencia UrbanSwag completa.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830921394!2d-74.119763!3d40.697670!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="UrbanSwag Store Location"
              ></iframe>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Dirección</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Av. Siempre Viva 742<br />
                    Springfield, NY 10001
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Phone className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Teléfono</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-500 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">Horarios de Atención</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lunes - Viernes</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados</span>
                  <span>10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos</span>
                  <span>12:00 PM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;