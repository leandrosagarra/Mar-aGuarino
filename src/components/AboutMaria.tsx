/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award, Heart, Check, Compass, Star } from 'lucide-react';
import { ABOUT_IMAGE_URL } from '../data';

interface AboutMariaProps {
  onNavigate: (sectionId: string) => void;
}

export default function AboutMaria({ onNavigate }: AboutMariaProps) {
  const highlights = [
    'Masoterapeuta certificada con amplia experiencia holística.',
    'Servicio de pedicuría profesional para la salud y estética del pie.',
    'Atención estrictamente personalizada de principio a fin.',
    'Acondicionamiento térmico y sensorial exclusivo de la sesión.',
  ];

  return (
    <section id="about" className="py-24 bg-brand-sand/40 border-y border-brand-rose/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Premium Images & Stats Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-brand-dark/10 group">
              <img
                src={ABOUT_IMAGE_URL}
                alt="María Guarino aplicando masajes"
                className="w-full h-auto object-cover aspect-square scale-100 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Subtle warm tint overlay */}
              <div className="absolute inset-0 bg-brand-terracotta/10 mix-blend-multiply transition-opacity duration-500" />
            </div>

            {/* Overlaid Decorative Board with Local Trust Stats */}
            <div className="absolute -bottom-6 -right-6 bg-brand-beige p-5 rounded-xl shadow-xl border border-brand-rose/15 z-20 max-w-[220px]">
              <div className="flex items-center space-x-1.5 text-brand-gold mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-gold" />
                ))}
              </div>
              <p className="text-brand-dark font-serif text-lg font-bold">Reserva de Autor</p>
              <p className="text-brand-dark/70 text-xs mt-1 font-sans leading-relaxed">
                Espacio privado, calmo y climatizado en 25 de Mayo.
              </p>
            </div>

            {/* Background absolute decor elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-peach/80 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-brand-rose/40 rounded-full blur-3xl -z-10" />
          </div>

          {/* Right Column: Narrative Copywritten by Brand Specialist */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-brand-terracotta font-semibold block">
                La Profesional Detrás del Toque
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-dark leading-tight">
                María Guarino
              </h2>
              <p className="font-serif italic text-lg sm:text-xl text-brand-olive">
                "Un cuerpo relajado es el pilar de una mente lúcida y un espíritu en paz."
              </p>
            </div>

            <div className="space-y-6 text-brand-dark/80 text-sm leading-relaxed font-sans font-light">
              <p>
                Soy <strong className="font-medium text-brand-dark">María Guarino</strong>, especialista en masajes terapéuticos, masoterapia integral y <strong>pedicuría profesional</strong> en la ciudad de <strong>25 de Mayo</strong>. A lo largo de mi carrera, he comprendido que el cuidado corporal integral es indispensable para revitalizar la armonía total y recuperar la ligereza cotidiana.
              </p>
              <p>
                Me tomo el tiempo para escuchar tus necesidades antes de comenzar. Cada presión, cada técnica de masaje, servicio de pedicuría y la temperatura de la sala se modulan de acuerdo a lo que tu cuerpo y pies transmitan.
              </p>
            </div>

            {/* Check highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((text, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <div className="mt-1 p-0.5 rounded-full bg-brand-terracotta/10 text-brand-terracotta shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-brand-dark/85 font-medium">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA directly to schedule and booking */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => onNavigate('booking')}
                className="px-8 py-3.5 bg-brand-terracotta hover:bg-brand-clay text-white font-semibold rounded-full shadow-lg shadow-brand-terracotta/15 hover:scale-[1.02] active:scale-[0.98] transition-all text-center cursor-pointer"
              >
                Reservar Mi Sesión con María
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="px-6 py-3.5 bg-brand-sand hover:bg-brand-rose/20 text-brand-dark border border-brand-rose/30 font-medium rounded-full text-center transition-all cursor-pointer"
              >
                Explorar Técnicas
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
