import { NavItem } from './types';

export const mainNavItems: NavItem[] = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'Programs',
    children: [
      { label: 'All Programs', path: '/programs' },
      { label: 'SHRED Program', path: '/programs/shred' },
      { label: 'App Workouts', path: '/programs/app-workouts' },
      { label: 'Nutrition Coaching', path: '/programs/nutrition' }
    ]
  },
  {
    label: 'Resources',
    children: [
      { label: 'Workout Library', path: '/resources/workouts' },
      { label: 'Meal Plans', path: '/resources/meal-plans' },
      { label: 'Macro Guide', path: '/resources/macros' },
      { label: 'Training Tips', path: '/resources/tips' },
      { label: 'Transformations', path: '/resources/transformations' },
      { label: 'Blog', path: '/blog' }
    ]
  },
  {
    label: 'Shop',
    path: '/shop',
    children: [
      { label: 'Memberships', path: '/shop/memberships' },
      { label: 'Apparel', path: '/shop/apparel' },
      { label: 'Supplements', path: '/shop/supplements' }
    ]
  },
  {
    label: 'About',
    children: [
      { label: 'Our Story', path: '/about' },
      { label: 'Services', path: '/services' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Contact', path: '/contact' }
    ]
  }
];