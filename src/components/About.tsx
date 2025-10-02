import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Urban sweatshirt style"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500 rounded-full blur-xl opacity-20"></div>
          </div>
          
          {/* Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Hechos para la <span className="text-blue-500">Calle</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                En UrbanSwag creemos que la ropa debe ser una extensión de tu personalidad. 
                Cada buzo está diseñado con materiales premium que garantizan comodidad y durabilidad, 
                sin comprometer el estilo.
              </p>
              
              <p>
                Nuestra filosofía es simple: crear piezas auténticas que se adapten al ritmo 
                de la vida urbana. Desde el primer boceto hasta el producto final, cada detalle 
                está pensado para quienes viven y respiran la cultura de la calle.
              </p>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Algodón Premium</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Comodidad</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">∞</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Estilo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;