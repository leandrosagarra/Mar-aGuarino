/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import AboutMaria from './components/AboutMaria';
import Values from './components/Values';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Monitor user scrolling to highlight the active navigation link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'about', 'values', 'booking'];
      const scrollPosition = window.scrollY + 120; // offset for the sticky navbar

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll navigate helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Offset to clear sticky navbar nicely
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // When a user selects a service quick action from Services tab
  const handleSelectServiceAndScroll = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    handleNavigate('booking');
  };

  const handleClearSelectedService = () => {
    setSelectedServiceId(null);
  };

  return (
    <div className="bg-brand-beige min-h-screen text-brand-dark selection:bg-brand-rose selection:text-brand-dark antialiased">
      {/* Sticky header navigation */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Sections flow */}
      <main className="relative">
        {/* Welcome and brand intro */}
        <Hero onNavigate={handleNavigate} />

        {/* Informative services & pricing */}
        <Services onSelectService={handleSelectServiceAndScroll} />

        {/* Corporate identity and story of Maria Guarino */}
        <AboutMaria onNavigate={handleNavigate} />

        {/* Core values */}
        <Values />

        {/* Tactical turn scheduler with direct WhatsApp dispatch */}
        <section id="booking-section">
          {/* Lazy bundle loading wrapper container */}
          <React.Suspense fallback={<div className="py-20 text-center text-brand-dark/40 font-mono">Cargando turnador...</div>}>
            <BookingSystem_Lazy 
              selectedServiceId={selectedServiceId} 
              onClearSelectedService={handleClearSelectedService} 
            />
          </React.Suspense>
        </section>
      </main>

      {/* Footer information */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

// Lazy loaded booking component because it constructs dynamic dates on demand
const BookingSystem_Lazy = React.lazy(() => import('./components/BookingSystem'));
