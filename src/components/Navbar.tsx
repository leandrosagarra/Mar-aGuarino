/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Inicio', target: 'hero' },
    { label: 'Servicios', target: 'services' },
    { label: 'Sobre María', target: 'about' },
    { label: 'Nuestros Valores', target: 'values' },
  ];

  const handleLinkClick = (target: string) => {
    onNavigate(target);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-beige/90 backdrop-blur-md border-b border-brand-rose/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <div 
            onClick={() => handleLinkClick('hero')} 
            className="flex flex-col cursor-pointer group"
          >
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl font-bold tracking-normal text-brand-dark group-hover:text-brand-terracotta transition-colors">
                María Guarino
              </span>
              <Sparkles className="w-4 h-4 text-brand-terracotta animate-pulse" />
            </div>
            <span className="text-[10px] tracking-widest text-brand-olive uppercase font-semibold">
              Masajes &amp; Pedicuría · 25 de Mayo
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleLinkClick(item.target)}
                className={`font-sans text-sm font-medium tracking-wide transition-all relative py-2 cursor-pointer ${
                  activeSection === item.target
                    ? 'text-brand-terracotta'
                    : 'text-brand-dark/70 hover:text-brand-terracotta'
                }`}
              >
                {item.label}
                {activeSection === item.target && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-terracotta rounded-full" />
                )}
              </button>
            ))}
            
            <button
              onClick={() => handleLinkClick('booking')}
              className="px-5 py-2.5 bg-brand-terracotta hover:bg-brand-clay text-white rounded-full font-sans text-sm font-semibold shadow-md shadow-brand-terracotta/15 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Reservar Turno
            </button>
          </div>

          {/* Mobile hamburger icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-dark hover:text-brand-terracotta hover:bg-brand-sand transition-colors cursor-pointer"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-beige border-b border-brand-rose/25 py-4 px-4 transition-all duration-300">
          <div className="space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleLinkClick(item.target)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  activeSection === item.target
                    ? 'bg-brand-sand text-brand-terracotta font-semibold'
                    : 'text-brand-dark/80 hover:bg-brand-sand hover:text-brand-terracotta'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => handleLinkClick('booking')}
                className="block w-full text-center py-3 bg-brand-terracotta hover:bg-brand-clay text-white rounded-full font-medium shadow-md shadow-brand-terracotta/15 transition-all text-base"
              >
                Reservar Turno Online
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
