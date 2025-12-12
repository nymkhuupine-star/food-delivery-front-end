"use client";

import { useState } from "react";
import CancelIcon from "@/_icons/CancelIcon";

const menuItems = [
  {
    id: 1,
    name: "Sunshine Stackers",
    description: "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: 12.99,
    image: "/images/sunshine-stackers1.jpg",
  },
  {
    id: 2,
    name: "Grilled Chicken with Veggies",
    description: "Tender grilled chicken served with vegetables and mashed potatoes.",
    price: 15.99,
    image: "/images/chicken-veggies.jpg",
  },
  {
    id: 3,
    name: "Veggie Burger",
    description: "Fresh veggie burger with lettuce, tomato, and basil.",
    price: 10.99,
    image: "/images/veggie-burger.jpg",
  },
];

export default function OrderDetail() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? {...c, qty: c.qty + 1} : c));
    } else {
      setCart([...cart, {...item, qty: 1}]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(c => c.id !== id));
  };

  const incrementQty = (id) => {
    setCart(cart.map(c => c.id === id ? {...c, qty: c.qty + 1} : c));
  };

  const decrementQty = (id) => {
    setCart(cart.map(c => c.id === id ? {...c, qty: Math.max(1, c.qty - 1)} : c));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="flex gap-4">
      {/* Menu */}
      <div className="grid grid-cols-2 gap-4 w-2/3">
        {menuItems.map(item => (
          <div key={item.id} className="border p-2 rounded shadow">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded"/>
            <h3 className="text-red-500 font-semibold mt-2">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
            <p className="font-semibold mt-1">${item.price}</p>
            <button
              className="mt-2 px-4 py-1 bg-red-500 text-white rounded"
              onClick={() => addToCart(item)}
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <div className="w-1/3 border p-4 rounded shadow bg-white">
        <h2 className="font-bold text-lg mb-4">Order detail</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded"/>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => decrementQty(item.id)} className="px-2 bg-gray-200 rounded">-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => incrementQty(item.id)} className="px-2 bg-gray-200 rounded">+</button>
                  <button onClick={() => removeFromCart(item.id)} className="ml-2 text-red-500">x</button>
                </div>
              </div>
            ))}
            <p className="font-bold mt-4">Total: ${total.toFixed(2)}</p>
            <button className="w-full mt-2 py-2 bg-red-500 text-white rounded">Checkout</button>
          </>
        )}
      </div>
    </div>
  );
}
