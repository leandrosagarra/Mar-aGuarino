/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MassageService {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  duration: number; // in minutes
  price: number; // in ARS
  benefits: string[];
  category: 'relax' | 'therapeutic' | 'special';
  featured?: boolean;
}

export interface BookingState {
  serviceId: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  notes: string;
}

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
  location: string;
}

export interface BrandValue {
  title: string;
  description: string;
  iconName: string;
}
