/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { HeartHandshake, Sparkles, ShieldCheck, Flame, Compass } from 'lucide-react';
import { VALUES } from '../data';

// Helper to resolve icon by its name
const resolveIcon = (iconName: string) => {
  switch (iconName) {
    case 'HeartHandshake':
      return <HeartHandshake className="w-8 h-8 text-brand-terracotta" />;
    case 'Sparkles':
      return <Sparkles className="w-8 h-8 text-brand-terracotta" />;
    case 'ShieldCheck':
      return <ShieldCheck className="w-8 h-8 text-brand-terracotta" />;
    case 'FlameKindling':
    default:
      return <Flame className="w-8 h-8 text-brand-terracotta" />;
  }
};

export default function Values() {
  return (
    <section id="values" className="py-24 bg-brand-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-terracotta font-semibold">
            Nuestros Pilares Fundacionales
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-dark">
            Nuestra Identidad y Valores
          </h2>
          <div className="w-16 h-[2px] bg-brand-terracotta/40 mx-auto" />
          <p className="text-sm sm:text-base text-brand-dark/70 font-sans font-light leading-relaxed">
            Mi trabajo y el cariño con el que te recibo en 25 de Mayo se basan en la honestidad, el respeto absoluto y el cuidado genuino de tu salud y descanso de todos los días.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-brand-sand/55 border border-brand-rose/15 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Icon display inside therapeutic circle */}
                <div className="w-14 h-14 rounded-full bg-brand-rose/20 flex items-center justify-center shadow-inner">
                  {resolveIcon(val.iconName)}
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-brand-dark">
                    {val.title}
                  </h3>
                  <p className="text-sm text-brand-dark/70 leading-relaxed font-sans font-light">
                    {val.description}
                  </p>
                </div>
              </div>

              {/* Decorative accent mark */}
              <div className="pt-6 mt-4 border-t border-brand-rose/10 flex justify-end">
                <span className="font-serif text-xs italic text-brand-olive">
                  / María Guarino
                </span>
              </div>
            </motion.div>
          ))}
        </div>



      </div>
    </section>
  );
}
