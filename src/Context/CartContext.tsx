import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for a product in the cart
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

// Define the CartContextType, which includes the `cart` and `addToCart` function
type CartContextType = {
  cart: Product[]; // Array of products in the cart
  addToCart: (product: Product) => void; // Function to add a product to the cart
};

// Create the CartContext with an initial default value (empty cart and a no-op function)
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Create the CartProvider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
