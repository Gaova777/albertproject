import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Collection from '../components/Collection';
import Location from '../components/Location';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Collection />
      <Location />
      <Footer />
    </div>
  );
};

export default LandingPage;