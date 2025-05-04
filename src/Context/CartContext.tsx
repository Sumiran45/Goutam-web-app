import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Failed to load cart from storage:', error);
      }
    };
    
    loadCart();
  }, []);
  
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to save cart to storage:', error);
      }
    };
    
    saveCart();
  }, [cart]);
  
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };
  
  const removeFromCart = (productId: string) => {
    const index = cart.findIndex(item => item.id === productId);
    
    if (index !== -1) {
      setCart((prevCart) => {
        const newCart = [...prevCart];
        newCart.splice(index, 1);
        return newCart;
      });
    }
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  const isInCart = (productId: string): boolean => {
    return cart.some(item => item.id === productId);
  };
  
  const getCartTotal = (): number => {
    return cart.reduce((total, item) => total + item.price, 0);
  };
  
  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    getCartTotal
  };
  
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;