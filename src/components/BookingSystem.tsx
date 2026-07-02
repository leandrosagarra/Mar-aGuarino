/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, TIMESLOTS_AFTERNOON, TIMESLOTS_MORNING } from '../data';
import { BookingState } from '../types';
import { Calendar as CalendarIcon, Clock, User, Phone, FileText, Send, CheckCircle, Smartphone, MapPin, Sparkles } from 'lucide-react';

interface BookingSystemProps {
  selectedServiceId: string | null;
  onClearSelectedService: () => void;
}

export default function BookingSystem({ selectedServiceId, onClearSelectedService }: BookingSystemProps) {
  // State for form entries
  const [form, setForm] = useState<BookingState>({
    serviceId: selectedServiceId || SERVICES[0].id,
    date: '',
    timeSlot: '',
    clientName: '',
    clientPhone: '',
    notes: ''
  });

  // Track if booking is successfully sent or is being previewed
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [activeDateIndex, setActiveDateIndex] = useState<number | null>(null);

  // Generate date list for the upcoming 12 business days (excluding Sundays)
  const [nextAvailableDates, setNextAvailableDates] = useState<{ dayName: string; dayNum: number; monthName: string; isoString: string }[]>([]);

  useEffect(() => {
    const dates = [];
    const today = new Date();
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'];

    let count = 0;
    let offset = 1; // Start from tomorrow

    while (count < 10) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + offset);
      
      // Exclude Sunday (0)
      if (targetDate.getDay() !== 0) {
        dates.push({
          dayName: days[targetDate.getDay()],
          dayNum: targetDate.getDate(),
          monthName: months[targetDate.getMonth()],
          isoString: targetDate.toLocaleDateString('es-AR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })
        });
        count++;
      }
      offset++;
    }
    
    setNextAvailableDates(dates);
    
    // Set default date as the first available date
    if (dates.length > 0) {
      setForm(prev => ({ ...prev, date: dates[0].isoString }));
      setActiveDateIndex(0);
    }
  }, []);

  // Update service if changed externally (e.g. from service list quick select)
  useEffect(() => {
    if (selectedServiceId) {
      setForm(prev => ({ ...prev, serviceId: selectedServiceId }));
    }
  }, [selectedServiceId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const selectDate = (dateString: string, idx: number) => {
    setForm(prev => ({ ...prev, date: dateString }));
    setActiveDateIndex(idx);
  };

  const selectTimeSlot = (slot: string) => {
    setForm(prev => ({ ...prev, timeSlot: slot }));
  };

  const getSelectedService = () => {
    return SERVICES.find(s => s.id === form.serviceId) || SERVICES[0];
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.timeSlot) {
      alert('Por favor, selecciona un horario disponible para continuar.');
      return;
    }

    if (!form.clientName.trim()) {
      alert('Por favor, escribe tu nombre.');
      return;
    }

    // Prepare massage name
    const serviceName = getSelectedService().name;
    const duration = getSelectedService().duration;

    // Formatting physical WhatsApp request string
    // María's professional phone number (We make it clean, we direct it to a nice Argentine code)
    // Area code of 25 de Mayo, Prov. de Buenos Aires is 2345
    const phoneNumber = "5492345412345"; // Configurable or standard local formatting
    
    const formattedMessage = `¡Hola María! 👋 Me gustaría reservar un turno en tu espacio de 25 de Mayo.

✨ *Detalles de la Reserva:*
💆‍♀️ *Servicio:* ${serviceName} (${duration} minutos)
📅 *Fecha:* ${form.date}
⏰ *Horario Preferido:* ${form.timeSlot}

👤 *Mis Datos:*
📝 *Nombre:* ${form.clientName}
📱 *Celular:* ${form.clientPhone || 'No cargado'}
🎯 *Comentarios / Notas adicionales:* ${form.notes || 'Ninguna especificada'}

¡Muchísimas gracias! Aguardo tu confirmación de reserva. 😊`;

    const encodedText = encodeURIComponent(formattedMessage);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    // Open WhatsApp link
    window.open(waUrl, '_blank');
    setIsSuccess(true);
  };

  return (
    <section id="booking" className="py-24 bg-brand-peach/25 border-t border-brand-rose/20 relative">
      <div className="absolute top-4 left-4 right-4 text-center z-10">
        {/* Subtle decorative feedback glow */}
        <div className="absolute h-44 w-44 bg-brand-terracotta/5 rounded-full blur-3xl -top-12 -left-12 -z-10" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subheadings from branding expert view */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-terracotta font-semibold">
            Iniciá tu Relajación Aquí
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-dark">
            Sistema de Turnos Online
          </h2>
          <div className="w-16 h-[2px] bg-brand-terracotta/40 mx-auto" />
          <p className="text-sm text-brand-dark/70 font-sans font-light leading-relaxed">
            Completá los campos del programador táctil e inicia la reserva por WhatsApp de forma directa. Las sesiones se pautan con agenda cerrada bajo exclusividad absoluta de María Guarino en 25 de Mayo.
          </p>
        </div>

        {/* Main interactive booking machine */}
        <div className="bg-brand-beige border border-brand-rose/20 rounded-3xl overflow-hidden shadow-xl shadow-brand-dark/5">
          <div className="p-8 sm:p-10">
            
            <form onSubmit={handleBookingSubmit} className="space-y-8">
              
              {/* Highlight of Maria Guarino's sole intervention */}
              <div className="p-4 bg-brand-rose/20 border border-brand-rose/30 rounded-2xl flex items-start space-x-3 text-brand-dark">
                <Sparkles className="w-5 h-5 text-brand-terracotta mt-0.5 shrink-0" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold text-brand-dark">Compromiso profesional</p>
                  <p className="text-brand-dark/80 font-sans font-light mt-0.5">
                    Tu sesión de sanación corporal será atendida por <strong>María Guarino</strong> en su consultorio acondicionado especialmente para brindar un servicio de calidad como cada cliente se merece.
                  </p>
                </div>
              </div>

              {/* STEP 1: SELECT SERVICE */}
              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-dark/60 flex items-center space-x-1.5">
                  <span>Paso 1: Seleccioná el Masaje Ideal</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      name="serviceId"
                      value={form.serviceId}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-brand-sand/55 border border-brand-rose/25 rounded-2xl font-sans text-sm focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta leading-relaxed cursor-pointer"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.duration} min — {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(s.price)})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Selected service quick helper preview */}
                  <div className="p-4 rounded-2xl bg-brand-sand/30 border border-dashed border-brand-rose/20 flex flex-col justify-center">
                    <p className="text-[11px] font-semibold text-brand-olive uppercase tracking-wider">Características de la terapia:</p>
                    <p className="text-xs text-brand-dark/75 mt-1 font-sans font-light italic">
                      "{getSelectedService().description}"
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 2: SELECT DATE CAROUSEL */}
              <div className="space-y-4">
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-dark/60">
                  Paso 2: Elegí la Fecha de tu Visita
                </label>
                
                {/* Horizontal scrolling dynamic calendar widget */}
                <div className="flex space-x-3 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin">
                  {nextAvailableDates.map((d, index) => {
                    const isSelected = activeDateIndex === index;
                    return (
                      <button
                        type="button"
                        key={index}
                        onClick={() => selectDate(d.isoString, index)}
                        className={`flex-shrink-0 w-20 py-3.5 px-2 rounded-2xl border flex flex-col items-center justify-center transition-all duration-300 snap-start cursor-pointer ${
                          isSelected
                            ? 'bg-brand-terracotta border-brand-terracotta text-white shadow-md shadow-brand-terracotta/20 scale-105'
                            : 'bg-brand-sand/40 border-brand-rose/15 text-brand-dark/75 hover:bg-brand-sand hover:border-brand-terracotta/30'
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{d.dayName}</span>
                        <span className="text-2xl font-serif font-bold my-1">{d.dayNum}</span>
                        <span className="text-[10px] font-semibold opacity-90">{d.monthName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: CHOOSE TIME */}
              <div className="space-y-4">
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-dark/60">
                  Paso 3: Seleccioná tu Horario Preferido
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-brand-sand/30 p-5 rounded-2xl border border-brand-rose/15">
                  {/* MORNING TIME SLOTS */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-brand-olive block pb-1 border-b border-brand-rose/10 flex items-center space-x-1">
                      <span>🌞 Turno Mañana</span>
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {TIMESLOTS_MORNING.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => selectTimeSlot(slot)}
                          className={`py-2.5 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                            form.timeSlot === slot
                              ? 'bg-brand-terracotta text-white border-brand-terracotta font-semibold'
                              : 'bg-brand-beige text-brand-dark border-brand-rose/15 hover:bg-brand-sand'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* AFTERNOON TIME SLOTS */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-brand-olive block pb-1 border-b border-brand-rose/10 flex items-center space-x-1">
                      <span>🌇 Turno Tarde</span>
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {TIMESLOTS_AFTERNOON.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => selectTimeSlot(slot)}
                          className={`py-2.5 px-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                            form.timeSlot === slot
                              ? 'bg-brand-terracotta text-white border-brand-terracotta font-semibold'
                              : 'bg-brand-beige text-brand-dark border-brand-rose/15 hover:bg-brand-sand'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {form.timeSlot && (
                  <p className="text-xs text-brand-olive font-sans">
                    ✨ Horario seleccionado: <strong className="font-semibold text-brand-terracotta">{form.timeSlot}</strong> del <strong className="font-semibold text-brand-terracotta">{form.date}</strong>
                  </p>
                )}
              </div>

              {/* STEP 4: PATIENT DETAILS */}
              <div className="space-y-4">
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-dark/60">
                  Paso 4: Escribí Tus Datos de Contacto
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-terracotta/65">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="clientName"
                      required
                      value={form.clientName}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                      className="w-full pl-11 pr-5 py-4 bg-brand-sand/55 border border-brand-rose/25 rounded-2xl font-sans text-sm focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta placeholder-brand-dark/35"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-terracotta/65">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      name="clientPhone"
                      required
                      value={form.clientPhone}
                      onChange={handleInputChange}
                      placeholder="Tu teléfono (ej: 2345678901)"
                      className="w-full pl-11 pr-5 py-4 bg-brand-sand/55 border border-brand-rose/25 rounded-2xl font-sans text-sm focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta placeholder-brand-dark/35"
                    />
                  </div>
                </div>

                {/* Health concerns / Notes */}
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none text-brand-terracotta/65">
                    <FileText className="w-4 h-4" />
                  </div>
                  <textarea
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={handleInputChange}
                    placeholder="Contale a María (ej: contracturas cervicales severas, dolor ciático, prefiero presión fuerte, estado de embarazo, voucher de regalo)"
                    className="w-full pl-11 pr-5 py-4 bg-brand-sand/55 border border-brand-rose/25 rounded-2xl font-sans text-sm focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta placeholder-brand-dark/35 resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* ACTION CTA SENT TO WHATSAPP */}
              <div className="pt-6 border-t border-brand-rose/15 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-semibold text-sm text-brand-dark">¿Cómo funciona la reserva?</h4>
                  <p className="text-xs text-brand-dark/65 font-sans font-light leading-relaxed mt-0.5">
                    Al presionar el botón de reserva, nuestro sistema creará y formateará el mensaje con tus datos y abrirá tu aplicación de WhatsApp. Le enviarás el mensaje directo a María, y ella te reconfirmará la reserva en unos minutos.
                  </p>
                </div>

                <div className="w-full sm:w-auto shrink-0">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-2xl shadow-lg shadow-[#25D366]/20 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center space-x-3 cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    <span>Confirmar Turno en WhatsApp</span>
                  </button>
                </div>
              </div>

            </form>

            {/* CONFIRMATION ACCENT WITH TRANSITION */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="p-1 rounded-full bg-emerald-500 text-white shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-emerald-900">¡Mensaje de Reserva Agendado!</h4>
                      <p className="text-xs text-emerald-800 font-sans mt-0.5 font-light">
                        El turnador de María Guarino abrió WhatsApp correctamente. Si no lo has enviado, asegúrate de presionar "Enviar" en la conversación abierta para ultimar el agendamiento.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Location alert */}
        <div className="mt-10 p-6 rounded-2xl bg-brand-sand border border-brand-rose/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-brand-olive">
            <MapPin className="w-6 h-6 text-brand-terracotta shrink-0" />
            <div className="text-xs sm:text-sm">
              <p className="font-semibold text-brand-dark">Dirección de Consultorio</p>
              <p className="text-brand-dark/70 font-sans font-light mt-0.5">
                Zona residencial céntrica · 25 de Mayo, Provincia de Buenos Aires. (La dirección exacta se brinda junto con la confirmación de tu turno por razones de privacidad del resto de las sesiones).
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
