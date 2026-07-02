/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Compass, MapPin, ChevronDown } from 'lucide-react';
import { HERO_IMAGE_URL } from '../data';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-brand-dark">
      {/* Background image cover with warm overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE_URL}
          alt="Refugio de Masajes María Guarino"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transform animate-[pulse_8s_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/30" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-brand-dark/20 to-brand-dark/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Localization badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-terracotta/20 border border-brand-terracotta/35 text-brand-rose text-xs font-semibold uppercase tracking-widest mb-8"
        >
          <MapPin className="w-3.5 h-3.5 text-brand-terracotta" />
          <span>25 de Mayo, Prov. de Buenos Aires</span>
        </motion.div>

        {/* Elegant Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-brand-beige leading-[1.1] mb-6"
        >
          Un momento para vos, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-terracotta to-brand-rose">
            un alivio para tu cuerpo.
          </span>
        </motion.h1>

        {/* Highlight exclusive therapy by Maria Guarino */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif italic text-xl sm:text-2xl text-brand-rose/95 max-w-3xl mx-auto mb-6"
        >
          Sesiones de masajes y pedicuría por{' '}
          <strong className="text-brand-gold not-italic font-semibold tracking-wide border-b-2 border-brand-gold/30 pb-0.5">
            María Guarino
          </strong>
        </motion.p>

        {/* Slogan details and info */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg text-brand-sand/80 max-w-2xl mx-auto mb-10 leading-relaxed font-sans font-light"
        >
          Descubrí el equilibrio muscular, aliviá contracturas severas y recuperá tu descanso reparador bajo un cuidado artesanal y personalizado.
        </motion.p>

        {/* Call to actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
        >
          <button
            onClick={() => onNavigate('booking')}
            className="w-full sm:w-auto px-8 py-4 bg-brand-terracotta hover:bg-brand-clay text-white font-semibold rounded-full shadow-lg shadow-brand-terracotta/30 hover:shadow-brand-terracotta/50 transition-all hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <Calendar className="w-5 h-5" />
            <span>Reservar Turno Online</span>
          </button>

          <button
            onClick={() => onNavigate('services')}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-brand-beige font-semibold rounded-full border border-white/20 transition-all hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <span>Ver Servicios &amp; Tarifas</span>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={() => onNavigate('services')}
        >
          <span className="text-zinc-500 text-xs tracking-widest uppercase mb-1 font-sans">
            Explorar
          </span>
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        </motion.div>
      </div>
    </section>
  );
}
