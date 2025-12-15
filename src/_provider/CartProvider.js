"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p._id === item._id);

      if (existing) {
        return prev.map((p) =>
          p._id === item._id
            ? {
                ...p,
                qty: p.qty + item.qty,
                totalPrice: +(p.totalPrice + item.totalPrice).toFixed(2),
              }
            : p
        );
      }

      return [...prev, item];
    });
    setIsOrderOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isOrderOpen,
        setIsOrderOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
