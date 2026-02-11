import React, { createContext, useContext, useState } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedSize: string, selectedColor: string, quantity: number) => void;
  removeFromCart: (id: number, size: string, color: string) => void;
  updateQuantity: (id: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (
    product: Product,
    selectedSize: string,
    selectedColor: string,
    quantity: number
  ) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem: CartItem) => 
          cartItem.id === product.id && 
          cartItem.selectedSize === selectedSize && 
          cartItem.selectedColor === selectedColor
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      }

      const newCartItem: CartItem = {
        ...product,
        quantity,
        selectedSize,
        selectedColor
      };

      return [...prevCart, newCartItem];
    });
  };

  const removeFromCart = (id: number, size: string, color: string) => {
    setCart((prevCart: CartItem[]) => 
      prevCart.filter(
        (item: CartItem) => !(item.id === id && item.selectedSize === size && item.selectedColor === color)
      )
    );
  };

  const updateQuantity = (id: number, size: string, color: string, quantity: number) => {
    setCart((prevCart: CartItem[]) => 
      prevCart.map((item: CartItem) => 
        (item.id === id && item.selectedSize === size && item.selectedColor === color)
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};