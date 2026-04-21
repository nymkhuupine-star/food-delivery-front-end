"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const getTotalPrice = (price, qty) => +(Number(price) * qty).toFixed(2);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((cartItem) => cartItem._id === item._id);

      if (existing) {
        return prev.map((cartItem) =>
          cartItem._id === item._id
            ? {
                ...cartItem,
                qty: cartItem.qty + item.qty,
                totalPrice: getTotalPrice(
                  cartItem.price,
                  cartItem.qty + item.qty
                ),
              }
            : cartItem
        );
      }

      return [...prev, item];
    });

    setIsOrderOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const increaseCartItemQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              qty: item.qty + 1,
              totalPrice: getTotalPrice(item.price, item.qty + 1),
            }
          : item
      )
    );
  };

  const decreaseCartItemQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id !== id) return item;

        const nextQty = Math.max(1, item.qty - 1);

        return {
          ...item,
          qty: nextQty,
          totalPrice: getTotalPrice(item.price, nextQty),
        };
      })
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
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
