import React, { useState, useEffect, useRef } from 'react';
import icon from '../assets/icon.png';
import logo from '../assets/logo.svg';
import { Menu, X, ShoppingBag } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  //estado para controlar la visibilidad del navbar al hacer scroll
  const [isVisible, setIsVisible] = useState(true);
  // Nuevo estado: ¿Hemos alcanzado la sección de anclaje?
  const [hasReachedSection, setHasReachedSection] = useState(false);
  // uso de useRef para almacenar la posición anterior del scroll
  const lastScrollY = useRef(0);
  // ----------------------------------------------------
  // Lógica del Intersection Observer (Anclaje a Sección)
  // ----------------------------------------------------
  useEffect(() => {
    // Busca el elemento de la sección de anclaje por su ID
    const targetElement = document.getElementById('collection');
    if (!targetElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // hasReachedSection será TRUE si el elemento está visible, FALSE si no.
        setHasReachedSection(entry.isIntersecting);
      },
      {
        // El threshold 0 significa que se activa apenas 1 píxel del elemento sea visible.
        threshold: 0
      }
    );

    observer.observe(targetElement);

    // Limpia el observador al desmontar el componente
    return () => {
      observer.disconnect();
    };
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Lógica para el fondo (isScrolled)
      setIsScrolled(currentScrollY > 50);

      // 2. Lógica para la visibilidad (Smart Header + Anclaje)
      let shouldBeVisible = true;
      const scrollingDown = currentScrollY > lastScrollY.current;

      // REGLA 1: Siempre visible en la parte superior
      if (currentScrollY < 50) {
        shouldBeVisible = true;
      }
      // REGLA 2: Si ya se alcanzó la sección de anclaje, se fija y se mantiene visible
      else if (hasReachedSection) {
        shouldBeVisible = true;
      }
      // REGLA 3: Si se baja el scroll (y no se ha anclado), ocultar
      else if (scrollingDown) {
        shouldBeVisible = false;
      }
      // REGLA 4: Si se sube el scroll (y no se ha anclado), mostrar
      else {
        shouldBeVisible = true;
      }

      setIsVisible(shouldBeVisible);

      // Actualizar posición de scroll anterior
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    // **Importante:** Añadimos hasReachedSection a las dependencias.
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasReachedSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const navItems = [
    { label: 'Inicio', action: scrollToTop },
    { label: 'Hero', action: () => scrollToSection('hero') },
    { label: 'Nosotros', action: () => scrollToSection('about') },
    { label: 'Colección', action: () => scrollToSection('collection') },
    { label: 'Ubicación', action: () => scrollToSection('location') },
  ];

  return (

    <nav className={`flex justify-between items-center w-full h-16 md:h-20 bg-transparent border-b border-white fixed z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isScrolled ? 'bg-black/10 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/5' : 'bg-transparent border-white/10'}`}>
      <div className="flex items-center gap-2 cursor-pointer px-4 py-2 hover:opacity-80 transition-opacity duration-300" onClick={scrollToTop}>
        <img 
          src={icon} 
          alt="Logo Icon" 
          className="h-8 w-8 md:h-10 md:w-10 object-contain"
        />
        <img 
          src={logo} 
          alt="Brand Logo" 
          className="h-6 md:h-8 w-auto object-contain max-w-[120px] md:max-w-[150px]"
        />
      </div>
      <div className={'flex items-center gap-4 px-4  '}>
        {navItems.map((item, index) => (
          <button key={index}
            onClick={item.action}
            className={`font-medium transition-all duration-300 hover:text-gray-300 relative group ${isScrolled ? 'text-white/90 hover:text-white' : 'text-white'}`}>
            {item.label}
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full'></span>
          </button>
        ))}
        
      </div>

      <div className={'flex items-center gap-4 px-4  '}>
        <button className={`flex  gap-4 p-2 rounded-lg bg-slate-600 transition-colors duration-300 ${isScrolled ? 'text-white hover:bg-white/20' : 'text-white hover:bg-white/20'}`}>
          Compra Ahora
          <ShoppingBag className="w-6 h-6" />
        </button>

      </div>
    
   
      
      {/* <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className={`font-medium transition-all duration-300 hover:text-blue-500 relative group ${
                  isScrolled ? 'text-white/90 hover:text-white' : 'text-white'
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

      
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled
                ? 'text-white hover:bg-white/20'
                : 'text-white hover:bg-white/20'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg mt-2 shadow-lg shadow-black/10">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/20 transition-colors duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;