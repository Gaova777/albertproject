import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  X, 
  Play, 
  ArrowRight, 
  Globe, 
  Star,
  Menu
} from 'lucide-react';

interface Product {
  name: string;
  price: string;
  img: string;
}

/* --- ASSETS SIMULADOS --- 
  En tu proyecto real, mantén tus imports:
  import poster from '../assets/buzos.jpg'
  import videoBuzos from '../assets/Video_De_Buzos_A_La_Moda.mp4'
*/
const VIDEO_URL = "https://videos.pexels.com/video-files/4248225/4248225-hd_1920_1080_25fps.mp4"; 
const POSTER_URL = "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

// --- COMPONENTES UTILITARIOS ---

const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.02]" 
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

const Marquee = ({ text }) => (
  <div className="relative flex overflow-x-hidden bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 py-4 text-neutral-100 font-medium tracking-wide text-sm">
    <div className="animate-marquee whitespace-nowrap flex gap-12">
      {[...Array(10)].map((_, i) => (
        <span key={i} className="flex items-center gap-6 opacity-80">
          {text} <Star className="w-3 h-3 fill-neutral-400" />
        </span>
      ))}
    </div>
  </div>
);

// --- NAVBAR ---
const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-8 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
    <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
      <div className="w-2 h-2 bg-white rounded-full" />
      <span className="bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">14thKEY</span>
    </div>
    
    <div className="hidden md:flex gap-10 text-sm font-normal text-neutral-200">
      {['Colección', 'Lookbook', 'Historia', 'Drop 001'].map((item) => (
        <a key={item} href="#" className="hover:text-white transition-colors duration-300 relative group">
          {item}
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
        </a>
      ))}
    </div>

    <div className="flex gap-6 text-neutral-200">
      <Globe className="w-5 h-5 cursor-pointer hover:text-white transition-colors duration-300" />
      <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-white transition-colors duration-300" />
      <Menu className="w-5 h-5 md:hidden cursor-pointer hover:text-white transition-colors" />
    </div>
  </nav>
);

// --- HERO SECTION MEJORADO (Vintage Modern / Streetwear) ---
const Hero = () => {
  const videoRef = useRef(null);

  const scrollToCollection = () => {
    const collectionSection = document.getElementById('collection');
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white">
      
      {/* 1. Fondo de Video con Overlay Más Suave */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40 z-10" />
        
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          poster={POSTER_URL}
          className="h-full w-full object-cover opacity-90"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      {/* 2. Elementos Decorativos Minimalistas */}
      <div className="absolute inset-0 z-20 pointer-events-none p-8 md:p-16 flex flex-col justify-between">
        {/* Top Info */}
        <div className="flex justify-between items-start">
          <div className="font-mono text-[10px] text-white/40 tracking-wider">
            FW 2025 C OLLECTION
          </div>
          <div className="font-mono text-[10px] text-right text-white/40 tracking-wider">
            LIMITED EDITION
          </div>
        </div>

        {/* Bottom Info */}
        <div className="flex justify-between items-end">
          <div className="font-mono text-[10px] text-white/40 tracking-wider">
            © 2025 WORLDWIDE SHIPPING
          </div>
          {/* Scroll Indicator */}
          <div className="hidden md:flex flex-col items-center gap-3 text-white/30">
            <span className="text-[9px] tracking-[0.2em]">SCROLL</span>
            <div className="h-12 w-[1px] bg-white/20 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-6 bg-white/40 animate-scrolldown" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Contenido Principal */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6">
        
        {/* Badge Minimalista */}
        <div className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="text-xs font-medium tracking-wider text-white/80">Nueva Colección • Drop 001</span>
        </div>

        {/* Título Limpio y Moderno */}
        <h1 className="relative text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tight leading-[0.9] mb-6">
          <span className="block">Street</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-500">Wear</span>
        </h1>

        {/* Subtítulo y Botones */}
        <div className="mt-6 max-w-2xl space-y-10">
          <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed px-4">
            Redefiniendo el confort urbano con cortes oversize y texturas premium.
            <span className="text-white font-medium"> Edición Limitada.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={scrollToCollection}
              className="group relative px-10 py-4 bg-white hover:bg-neutral-100 text-black font-medium tracking-wide transition-all duration-300 rounded-full overflow-hidden"
            >
              <span className="relative flex items-center gap-2">
                Ver Colección 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>

            <button className="px-10 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-medium tracking-wide transition-all duration-300 backdrop-blur-xl rounded-full flex items-center gap-3">
              <Play className="w-4 h-4 fill-current" />
              Ver Campaña
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- PRODUCT GRID ---
const ProductCard = ({ name, price, img } : Product) => (
  <div className="group cursor-pointer">
    <div className="relative overflow-hidden bg-neutral-100 aspect-[3/4] mb-4 rounded-2xl">
      <div className="absolute top-4 right-4 z-10 bg-white text-black text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
        QUICK VIEW
      </div>
      <img 
        src={img} 
        alt={name} 
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    
    <div className="flex justify-between items-start pt-3">
      <div>
        <h3 className="text-lg font-semibold leading-tight mb-1">{name}</h3>
        <p className="text-xs text-neutral-500 font-light tracking-wide">Heavyweight Cotton</p>
      </div>
      <span className="font-medium text-neutral-900">${price}</span>
    </div>
  </div>
);

const Collection = () => (
  <section id="collection" className="py-32 px-6 bg-neutral-50 text-black">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16 pb-6 border-b border-neutral-200">
        <h2 className="text-5xl md:text-7xl font-light tracking-tight">
          Latest <br/> 
          <span className="font-semibold">Drop</span>
        </h2>
        <div className="text-right hidden md:block">
          <p className="font-medium tracking-wide text-sm text-neutral-600">Fall / Winter 2025</p>
          <p className="text-neutral-900 font-semibold mt-1">04 Items Available</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard name="Oversize Hoodie" price="89.00" img="https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=600" />
        <ProductCard name="Graphic Sweatshirt" price="75.00" img="https://images.pexels.com/photos/702350/pexels-photo-702350.jpeg?auto=compress&cs=tinysrgb&w=600" />
        <ProductCard name="Essential Zip-Up" price="95.00" img="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600" />
        <ProductCard name="Vintage Crewneck" price="82.00" img="https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?auto=compress&cs=tinysrgb&w=600" />
      </div>
    </div>
  </section>
);

// --- MAIN APP ---
const App = () => {
  return (
    <div className="font-sans bg-neutral-50 min-h-screen selection:bg-neutral-900 selection:text-white antialiased">
      <NoiseOverlay />
      
      <Navbar />
      <Hero />
      <Marquee text="Envíos gratis a todo el país • Nueva colección • Calidad premium" />
      <Collection />
      
      <footer className="bg-neutral-900 text-neutral-400 py-16 text-center font-light text-sm tracking-wide">
        <p>© 2025 14thKEY Clothing. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @keyframes scrolldown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scrolldown {
          animation: scrolldown 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;