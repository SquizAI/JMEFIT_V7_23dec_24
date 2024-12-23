export type MembershipInterval = 'monthly' | 'yearly';
export type MembershipStatus = 'active' | 'inactive';
export type ProductStatus = 'active' | 'inactive' | 'out_of_stock';
export type ProgramCategory = 'transformation' | 'strength' | 'hypertrophy' | 'endurance';
export type ProgramDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Membership {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  priceMonthly: number;
  priceYearly: number;
  status: MembershipStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Program {
  id: string;
  title: string;
  category: ProgramCategory;
  description: string;
  price: number;
  duration: string;
  difficulty: ProgramDifficulty;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  price: number;
  images: string[];
  metadata: Record<string, any>;
  status: ProductStatus;
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  size?: string;
  color?: string;
  price?: number;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}