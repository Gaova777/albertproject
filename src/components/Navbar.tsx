import React, { useState, useEffect, useRef } from 'react';
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
    { label: 'Nosotros', action: () => scrollToSection('about') },
    { label: 'Colección', action: () => scrollToSection('collection') },
    { label: 'Ubicación', action: () => scrollToSection('location') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 transform 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'} 
        ${
          isScrolled
            ? 'bg-black/10 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div
            onClick={scrollToTop}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-2 bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span
              className={`text-2xl md:text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-white'
              }`}
            >
              UrbanSwag
            </span>
          </div>

          {/* Desktop Navigation */}
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

          {/* Mobile Menu Button */}
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

        {/* Mobile Navigation */}
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
      </div>
    </nav>
  );
};

export default Navbar;