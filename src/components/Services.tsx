/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { MassageService } from '../types';
import { Clock, CheckSquare, Plus, Minus, ArrowRight, DollarSign } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'relax' | 'therapeutic' | 'special'>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>('relax'); // Keep first open by default for rich content density

  const filteredServices = selectedCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === selectedCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'relax': return 'Relajante';
      case 'therapeutic': return 'Terapéutico';
      case 'special': return 'Especial de Autor';
      default: return '';
    }
  };

  return (
    <section id="services" className="py-24 bg-brand-sand/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title elements */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-terracotta font-semibold">
            Carta de Servicios Profesionales
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-dark">
            Servicios y Sesiones Disponibles
          </h2>
          <div className="w-16 h-[2px] bg-brand-terracotta/40 mx-auto" />
          <p className="text-sm sm:text-base text-brand-dark/70 font-sans font-light leading-relaxed">
            Explorá nuestra variedad de técnicas diseñadas por María Guarino. Seleccioná el servicio que mejor responda a las necesidades de tu cuerpo para comenzar tu reserva online instantánea.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'all', label: 'Todos los Servicios' },
            { id: 'relax', label: 'Relajantes' },
            { id: 'therapeutic', label: 'Terapéuticos / Descontracturantes' },
            { id: 'special', label: 'Especiales / Pedicuría / Rituales de Autor' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-brand-terracotta text-white shadow-md shadow-brand-terracotta/20 font-semibold'
                  : 'bg-brand-beige text-brand-dark/80 hover:bg-brand-sand hover:text-brand-terracotta border border-brand-rose/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services List / Centered Layout */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* List of Services */}
          <div className="space-y-4">
            {filteredServices.map((service) => {
              const isExpanded = expandedServiceId === service.id;
              
              return (
                <div
                  key={service.id}
                  className={`border rounded-2xl bg-brand-beige transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? 'border-brand-terracotta/55 shadow-md shadow-brand-terracotta/5' 
                      : 'border-brand-rose/15 hover:border-brand-terracotta/30 hover:shadow-sm'
                  }`}
                >
                  {/* Service Header Row */}
                  <div
                    onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                    className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase ${
                          service.category === 'relax' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          service.category === 'therapeutic' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          'bg-amber-100 text-brand-clay border border-brand-rose/40'
                        }`}>
                          {getCategoryLabel(service.category)}
                        </span>
                        {service.featured && (
                          <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider">
                            ★ Recomendado
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark group-hover:text-brand-terracotta transition-colors">
                        {service.name}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-brand-dark/75 font-sans font-light line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Metadata & Toggle */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8 pt-3 sm:pt-0 border-t sm:border-t-0 border-brand-rose/10">
                      <div className="flex items-center space-x-5">
                        <div className="flex items-center space-x-1.5 text-brand-dark/60 font-sans text-xs sm:text-sm">
                          <Clock className="w-4 h-4 text-brand-terracotta/80" />
                          <span>{service.duration} min</span>
                        </div>
                        <div className="text-right">
                          <span className="text-brand-clay font-bold text-lg sm:text-xl font-serif">
                            {formatPrice(service.price)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-1.5 rounded-full bg-brand-sand text-brand-dark hover:text-brand-terracotta hover:bg-brand-rose/25 transition-colors">
                        {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details Container */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-6 sm:p-8 bg-brand-peach/25 border-t border-brand-rose/15 space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Deep description */}
                            <div className="space-y-3">
                              <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-dark/60">
                                Introducción a la Técnica
                              </h4>
                              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans font-light">
                                {service.longDescription}
                              </p>
                            </div>

                            {/* Benefits checklist */}
                            <div className="space-y-3">
                              <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-dark/60">
                                Beneficios Directos
                              </h4>
                              <div className="space-y-2">
                                {service.benefits.map((benefit, bIdx) => (
                                  <div key={bIdx} className="flex items-start space-x-2">
                                    <CheckSquare className="w-4 h-4 text-brand-terracotta/90 shrink-0 mt-0.5" />
                                    <span className="text-xs sm:text-sm text-brand-dark/80 font-sans font-light">
                                      {benefit}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>

                          {/* Quick reservation action */}
                          <div className="pt-4 border-t border-brand-rose/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <span className="text-[11px] text-brand-olive font-sans italic">
                              * Tarifa válida para el corriente mes. Pagos en efectivo, transferencia o Mercado Pago.
                            </span>
                            <button
                              onClick={() => onSelectService(service.id)}
                              className="w-full sm:w-auto px-6 py-2.5 bg-brand-terracotta hover:bg-brand-clay text-white font-semibold rounded-full text-xs sm:text-sm transition-all hover:scale-[1.02] flex items-center justify-center space-x-1.5 cursor-pointer"
                            >
                              <span>Reservar este Masaje</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Note on payment methods (now styled elegantly below the full services list) */}
          <div className="p-6 rounded-2xl bg-brand-sand border border-brand-rose/15 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-dark/70">
              Formas de Pago Aceptadas
            </h4>
            <p className="text-xs sm:text-sm text-brand-dark/70 leading-relaxed font-sans font-light">
              Para tu comodidad, aceptamos pagos en <strong>Efectivo</strong> tras concluir el turno, <strong>Transferencia Bancaria</strong> inmediata o saldo a través de tu billetera virtual de <strong>Mercado Pago</strong>.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
