import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Collection from "../components/Collection";
import About from "../components/About";
import Location from "../components/Location";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-stone-950 antialiased">
      <Navbar />
      <main>
        <Hero />
        <Collection />
        <About />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default LandingPage;
