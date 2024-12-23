import { Dumbbell, MessageCircle, Star, Calendar } from 'lucide-react';
import type { Membership } from '../types/memberships';

export const parseMembershipFeatures = (features: string | string[]): string[] => {
  if (Array.isArray(features)) {
    return features;
  }
  
  try {
    return typeof features === 'string' ? JSON.parse(features) : features;
  } catch (err) {
    console.error('Error parsing membership features:', err);
    return [];
  }
};

export const getMembershipPrice = (
  membership: Membership,
  interval: MembershipInterval
): number => {
  return interval === 'monthly' ? membership.price_monthly : membership.price_yearly;
};

export const getMembershipIcon = (index: number) => {
  switch (index) {
    case 0:
      return Dumbbell;
    case 1:
      return MessageCircle;
    case 2:
      return Star;
    default:
      return Calendar;
  }
};

export const formatPrice = (price: number, interval: 'monthly' | 'yearly'): string => {
  return `$${price.toFixed(2)}/${interval === 'monthly' ? 'mo' : 'yr'}`;
};

export const calculateYearlyPrice = (monthlyPrice: number): number => {
  return monthlyPrice * 12 * 0.8; // 20% discount for yearly
};