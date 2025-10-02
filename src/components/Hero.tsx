import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToCollection = () => {
    const collectionSection = document.getElementById('collection');
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center overflow-hidden pt-16">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Define tu <span className="text-blue-400">Estilo</span>
          <br />
          Viste tu <span className="text-blue-400">Actitud</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
          Buzos con diseños únicos, creados para el movimiento urbano.
        </p>
        
        <button
          onClick={scrollToCollection}
          className="group bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3 mx-auto"
        >
          Explorar Colección
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;