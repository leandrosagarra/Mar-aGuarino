/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, Mail, Phone, MapPin, Clock, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-brand-beige border-t border-brand-rose/10 pt-20 pb-12 relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-terracotta/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-brand-rose/10">
          
          {/* Column 1: Brand description and slogan */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-serif text-2xl font-bold tracking-normal text-brand-beige">
                  María Guarino
                </span>
                <Sparkles className="w-4 h-4 text-brand-terracotta" />
              </div>
              <span className="text-[10px] tracking-widest text-brand-rose uppercase font-semibold">
                Masajes &amp; Pedicuría · 25 de Mayo
              </span>
            </div>

            <p className="font-serif italic text-base text-brand-rose/80 leading-relaxed">
              "Un momento para vos, un alivio para tu cuerpo."
            </p>

            <p className="text-xs sm:text-sm text-brand-sand/65 font-sans font-light leading-relaxed">
              Un consultorio pensado para restituir el reposo muscular y la paz mental. Cada terapia es administrada exclusivamente por María Guarino, garantizando confidencialidad absoluta, calidez humana y excelencia técnica en Veinticinco de Mayo, Buenos Aires.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-brand-rose">
              Navegación
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { label: 'Inicio / Bienvenida', id: 'hero' },
                { label: 'Carta de Masajes', id: 'services' },
                { label: 'Sobre María Guarino', id: 'about' },
                { label: 'Nuestros Valores', id: 'values' },
                { label: 'Agendar Turno Online', id: 'booking' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-left text-xs sm:text-sm text-brand-sand/75 hover:text-brand-terracotta transition-colors py-0.5 font-sans font-light cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Contacts and Location */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-bold text-brand-rose">
              Información de Interés
            </h4>
            
            <div className="space-y-4 text-xs sm:text-sm text-brand-sand/80 font-sans font-light">
              {/* Phone item click trigger to open booking directly */}
              <div className="flex items-start space-x-3 cursor-pointer group" onClick={() => onNavigate('booking')}>
                <MapPin className="w-5 h-5 text-brand-terracotta group-hover:scale-110 transition-transform shrink-0" />
                <div>
                  <p className="font-semibold text-brand-beige">Dirección Privada</p>
                  <p className="text-brand-sand/70 text-xs">Zona céntrica, 25 de Mayo (B6660), Provincia de Buenos Aires.</p>
                </div>
              </div>

              {/* Hours section */}
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-brand-terracotta shrink-0" />
                <div>
                  <p className="font-semibold text-brand-beige">Régimen de Horarios</p>
                  <p className="text-brand-sand/70 text-xs mt-0.5">Lunes a Sábados: 09:00 hs a 20:00 hs</p>
                  <p className="text-brand-sand/60 text-[10px] italic mt-0.5">Atención estricta con turno previo.</p>
                </div>
              </div>

              {/* Secure reservation note */}
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-brand-terracotta shrink-0" />
                <div>
                  <p className="font-semibold text-brand-beige">Seguridad Sanitaria</p>
                  <p className="text-brand-sand/70 text-xs mt-0.5">Higiene clínica minuciosa, sábanas desechables y ventilación entre sesiones.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Closing copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-sand/55 font-light font-mono gap-4">
          <p>
            &copy; {currentYear} María Guarino · Masajes &amp; Pedicuría. Todos los derechos reservados.
          </p>
          <p className="flex items-center space-x-1 font-sans">
            <span>Creado con</span>
            <Heart className="w-3 h-3 text-brand-terracotta fill-brand-terracotta" />
            <span>para Veinticinco de Mayo, Bs. As.</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
