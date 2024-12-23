import { supabase } from '../lib/supabase';
import type { CartItem } from '../types/cart';

export const CartService = {
  async getCart(userId: string) {
    const { data: cart, error } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error getting cart:', error);
      throw error;
    }
    return cart;
  },

  async createCart(userId: string) {
    try {
      const { data: cart, error } = await supabase
        .from('carts')
        .insert({ user_id: userId })
        .select()
        .single();

      if (error) throw error;
      return cart;
    } catch (err) {
      console.error('Error creating cart:', err);
      throw err;
    }
  },

  async getCartItems(cartId: string) {
    const { data: items, error } = await supabase
      .from('cart_items')
      .select('*, products:product_id (*)')
      .eq('cart_id', cartId);

    if (error) throw error;
    return items;
  },

  async addItem(cartId: string, productId: string, quantity: number) {
    const { data, error } = await supabase
      .from('cart_items')
      .upsert({
        cart_id: cartId,
        product_id: productId,
        quantity
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateQuantity(itemId: string, quantity: number) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async removeItem(itemId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) throw error;
  },

  async clearCart(cartId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId);

    if (error) throw error;
  }
};