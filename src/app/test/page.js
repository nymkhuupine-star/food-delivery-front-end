"use client";

import CancelIcon from "@/_icons/CancelIcon";
import LineIcon from "@/_icons/LineIcon";
import ShoppingCardIcon from "@/_icons/ShoppingCartIcon";

import { useCart } from "@/_provider/CartProvider";
import OrderFoodIcon from "@/_icons/OrderFoodIcon";
import OrderDateIcon from "@/_icons/OrderDateIcon";
import OrderMapIcon from "@/_icons/OrderMapIcon";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

export default function Order() {
  const { cartItems, removeFromCart, isOrderOpen, setIsOrderOpen } = useCart();

  const shipping = 5.99;
  const grandTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const total = grandTotal + shipping;

  useEffect(() => {
    setIsOrderOpen(true);
  }, []);

  if (!isOrderOpen) return null;

  return (
    <div className="bg-neutral-700 rounded-s-2xl w-[535px] h-[1024px] flex flex-col p-4">
      <div className="flex justify-end">
        <button
          onClick={() => setIsOrderOpen(false)}
          className="p-2 bg-gray-200 rounded-full"
        >
          <CancelIcon />
        </button>
      </div>

      <div className="flex flex-row items-center gap-2 mb-4">
        <ShoppingCardIcon />
        <p className="text-white text-lg">Order detail</p>
      </div>

      <div className="flex bg-white rounded-xl h-[44px] mb-4">
        <button className="bg-white w-1/2 text-black rounded-l-xl">Card</button>
        <button className="bg-red-500 w-1/2 text-white rounded-r-xl">
          Order
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 flex-1 overflow-y-auto">
        <div className="mb-4 flex justify-between items-center">
          <p>Order history</p>
          <Badge className="rounded-lg border border-red-500 bg-white text-black">
            Pending
          </Badge>
        </div>

        {cartItems.length === 0 && (
          <p className="text-gray-400">No items in cart</p>
        )}

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center mb-2"
          >
            <div className="flex items-center gap-2">
              <OrderFoodIcon />
              <p>{item.foodName}</p>
            </div>
            <p>x {item.qty}</p>
            <p>${item.totalPrice.toFixed(2)}</p>
            <button onClick={() => removeFromCart(item._id)}>
              <CancelIcon />
            </button>
          </div>
        ))}

        <LineIcon className="my-4" />

        <div className="flex justify-between font-bold text-lg">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
