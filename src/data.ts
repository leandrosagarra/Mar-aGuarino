/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MassageService, BrandValue, Review } from './types';

export const HERO_IMAGE_URL = '/src/assets/images/therapy_massage_hero_1781792953696.jpg';
export const ABOUT_IMAGE_URL = '/src/assets/images/therapist_hands_spa_1781792969705.jpg';

export const SERVICES: MassageService[] = [
  {
    id: 'relax',
    name: 'Masaje Relajante y Antiestrés',
    description: 'Liberación de tensiones con maniobras suaves y reflexología de pies, ideal para aquietar la mente nerviosa.',
    longDescription: 'Nuestra sesión insignia diseñada específicamente para calmar el sistema de alarma de tu cuerpo. Mediante frotaciones rítmicas, pases sedativos suaves y presiones lentas, logramos bajar los niveles de cortisol e inducir una relajación profunda de pies a cabeza.',
    duration: 60,
    price: 22000,
    benefits: [
      'Alivia el estrés mental y la ansiedad acumulada',
      'Mejora significativamente la calidad del sueño y descanso',
      'Estimula la producción de endorfinas y serotonina',
      'Alivia tensiones crónicas leves y rigidez articular'
    ],
    category: 'relax',
    featured: true
  },
  {
    id: 'descontract',
    name: 'Masaje Descontracturante Profundo',
    description: 'Manos y codos trabajando de forma localizada sobre nudos de rigidez y sobrecargas musculares posturales.',
    longDescription: 'Terapia física enfocada en disolver nudos de tensión o "contracturas" localizadas (por lo general en cuello, espalda baja, cuello y hombros). Aplicamos técnicas de presión graduada y fricción profunda que facilitan el retorno del rango óptimo de movilidad.',
    duration: 60,
    price: 25000,
    benefits: [
      'Disuelve nudos de tensión muscular rebeldes',
      'Restaura la elasticidad del tejido conectivo o fascia',
      'Alivia dolores posturales típicos del trabajo de escritorio',
      'Aumenta el flujo sanguíneo y la oxigenación celular muscular'
    ],
    category: 'therapeutic',
    featured: true
  },
  {
    id: 'drenaje',
    name: 'Drenaje Linfático Manual y Circulatorio',
    description: 'Maniobras rítmicas y ligeras que favorecen la circulación venosa y disminuyen notablemente la retención líquida.',
    longDescription: 'Técnica sumamente sutil realizada con presiones circulares, suaves y precisas que siguen la dirección de los canales linfáticos. Excelente para casos de pesadez, piernas cansadas, posoperatorios o si simplemente buscás liberar toxinas acumuladas.',
    duration: 60,
    price: 30000,
    benefits: [
      'Reduce notablemente la retención de líquidos e hinchazón',
      'Favorece la eliminación de toxinas en el cuerpo',
      'Mejora los síntomas asociados con piernas cansadas y varices',
      'Estimula y refina la respuesta del sistema inmune'
    ],
    category: 'therapeutic'
  },
  {
    id: 'pedicuria',
    name: 'Pedicuría Profesional Completa',
    description: 'Tratamiento integral y embellecimiento de pies, remoción experta de asperezas, pulido y un relajante masaje podal.',
    longDescription: 'Sesión dedicada por completo a la salud, confort y estética de tus pies. Incluye el correcto perfilado de uñas, remoción especializada de durezas y asperezas persistentes mediante torno y pulido, exfoliación renovadora profunda y un masaje final humectante que alivia la fatiga podal.',
    duration: 50,
    price: 30000,
    benefits: [
      'Elimina asperezas, resecamiento severo y durezas persistentes',
      'Previene dolencias comunes mediante corte y perfilado higiénico de uñas',
      'Estimula el retorno venoso y relaja las zonas de mayor peso del pie',
      'Devuelve suavidad e hidratación profunda con cremas nutritivas'
    ],
    category: 'special'
  }
];

export const VALUES: BrandValue[] = [
  {
    title: 'Cuidado Honesto',
    description: 'Diseño cada sesión a tu medida para responder exactamente a los requerimientos de tu musculatura y nivel de estrés de este momento.',
    iconName: 'HeartHandshake'
  },
  {
    title: 'Espacio de Calma',
    description: 'La salubridad, el aroma delicado, la música tenue y la temperatura controlada cooperan para construir un templo personal de descompresión.',
    iconName: 'Sparkles'
  },
  {
    title: 'Confidencialidad',
    description: 'Respeto absoluto por el silencio que tu cuerpo busca durante el masaje, en un entorno de entera seguridad física y emocional.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Pasión por Sanar',
    description: 'Entiendo el masaje no como una rutina, sino como una sincronía terapéutica donde el tacto profesional alivia y regenera al ser.',
    iconName: 'FlameKindling'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev1',
    author: 'Gabriela Fernández',
    text: 'María tiene unas manos mágicas. Me hice el Ritual Armonía y salí flotando. Su atención es muy cálida, vive cuidando cada detalle del ambiente.',
    rating: 5,
    date: '2026-05-12',
    location: '25 de Mayo, Bs. As.'
  },
  {
    id: 'rev2',
    author: 'Juan Ignacio Bruno',
    text: 'Sufría mucho de contracturas por trabajar sentado. El masaje descontracturante de María me cambió la postura y me sacó esa pesadez del cuello.',
    rating: 5,
    date: '2026-06-02',
    location: '25 de Mayo, Bs. As.'
  },
  {
    id: 'rev3',
    author: 'Marta Solís',
    text: 'Excelente profesional y una gran persona. El espacio es hermoso, huele riquísimo y es super pacífico. Los turnos por WhatsApp son facilísimos de agendar.',
    rating: 5,
    date: '2026-06-15',
    location: '25 de Mayo, Bs. As.'
  }
];

export const WEEKDAYS = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
];

export const TIMESLOTS_MORNING = [
  '09:00 hs',
  '10:30 hs',
  '12:00 hs'
];

export const TIMESLOTS_AFTERNOON = [
  '14:00 hs',
  '15:30 hs',
  '17:00 hs',
  '18:30 hs'
];
