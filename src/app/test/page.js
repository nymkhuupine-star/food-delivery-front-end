"use client";

import CancelIcon from "@/_icons/CancelIcon";
import LineIcon from "@/_icons/LineIcon";
import ShoppingCardIcon from "@/_icons/ShoppingCartIcon";

import { useCart } from "@/_provider/CartProvider";
import OrderFoodIcon from "@/_icons/OrderFoodIcon";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import FoodIcon from "@/_icons/FoodIcon";

export default function Order() {
  const { cartItems, removeFromCart, isOrderOpen, setIsOrderOpen } = useCart();

  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const grandTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const total = grandTotal + shipping;

  useEffect(() => {
    setIsOrderOpen(true);
  }, []);

  if (!isOrderOpen) return null;

  return (
    <div className="bg-neutral-700 rounded-s-2xl w-[535px] h-[1050px] flex flex-col">

      <div className="flex items-center pl-[34.5px] pt-[8px]">
        <ShoppingCardIcon />
        <p className="text-white ml-[10px]">Order detail</p>

        <button
          onClick={() => setIsOrderOpen(false)}
          className="ml-auto mr-[20px] px-3 py-3 bg-gray-200 rounded-full"
        >
          <CancelIcon />
        </button>
      </div>


      <div className="bg-white h-[44px] w-[471px] flex ml-[30px] mt-[12px] rounded-xl">
        <button className="w-1/2 h-[36px] m-[4px] rounded-xl">
          Card
        </button>
        <button className="bg-red-500 w-1/2 h-[36px] m-[4px] rounded-xl text-white">
          Order
        </button>
      </div>

      <div className="w-[471px] bg-white rounded-lg ml-[30px] mt-[30px] p-[16px] flex flex-col h-[620px]">

        <div className="mb-[16px] flex justify-between items-center">
          <p>Order history</p>
          <Badge className="rounded-lg border border-red-500 bg-white text-black">
            Pending
          </Badge>
        </div>


        <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 pr-2">
          {cartItems.length === 0 ? (
            <div className="w-[439px]  p-[12px] h-[182px] bg-zinc-100 rounded-xl flex flex-col justify-center items-center
">
  <FoodIcon/>
  <p className="text-zinc-950 text-center text-base font-bold leading-7"> No Orders Yet?  </p>
  <p className="text-zinc-500 text-center text-xs font-normal leading-4" >🍕 "You haven't placed any orders yet. Start exploring our menu and satisfy your cravings!"</p>
</div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center"
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
            ))
          )}
        </div>


        <div className="pt-[15px] border-t mt-[16px]">
          <div className="flex justify-between font-semibold">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
      </div>


      <div className="w-[471px] bg-white rounded-lg ml-[30px] mt-[20px] p-[16px]">
        <p className="pb-[20px]">Payment info</p>

        <div className="flex justify-between pb-[8px]">
          <p>Items</p>
          <p>${grandTotal.toFixed(2)}</p>
        </div>

        <div className="flex justify-between pb-[20px]">
          <p>Shipping</p>
          <p>${shipping.toFixed(2)}</p>
        </div>

        <LineIcon />

        <div className="flex justify-between pt-[20px] pb-[20px]">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
