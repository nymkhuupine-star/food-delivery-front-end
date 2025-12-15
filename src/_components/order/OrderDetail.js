"use client";

import CancelIcon from "@/_icons/CancelIcon";
import LineIcon from "@/_icons/LineIcon";
import ShoppingCardIcon from "@/_icons/ShoppingCartIcon";

import { Input } from "@/components/ui/input";
import OrderMiniCard from "./OrderMiniCard";
import { useCart } from "@/_provider/CartProvider";

export default function OrderDetail() {
  const { cartItems, removeFromCart, isOrderOpen, setIsOrderOpen } = useCart();

  const grandTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = 5.99;
  const total = grandTotal + shipping;
  if (!isOrderOpen) return null;

  if (!cartItems.length) {
    return <p className="text-gray-400">No items in cart</p>;
  }

  return (
    <>
      <div className="bg-neutral-700 rounded-s-2xl  w-[535px] h-[1024px]  flex flex-col">
        <div>
          <button onClick={() => setIsOrderOpen(false)}></button>
        </div>

        <div className="flex flex-row pl-[34.5px] pt-[8px] ">
          <ShoppingCardIcon />
          <p className=" text-white ml-[10px]">Order detail</p>

          <button className=" px-3 py-3 bg-gray-200 ml-[320px] mb-[20px] rounded-full">
            <CancelIcon />
          </button>
        </div>
        <div className=" bg-white h-[44px] w-[471px] flex justify-center ml-[30px] items-center rounded-xl ">
          <button className="bg-red-500 w-[227.5px] h-[36px] rounded-xl text-white">
            {" "}
            Card
          </button>
          <button className="bg-white w-[227.5px] h-[36px] rounded-xl">
            Order
          </button>
        </div>
        <div className="w-[471px] h-[532px] bg-white rounded-lg ml-[30px] mt-[30px] p-[16px] ">
          <div className="mb-[20px]">
            {" "}
            <p>My cart</p>
          </div>

          {cartItems.map((item) => (
            <OrderMiniCard
              key={item._id}
              item={item}
              removeFromCart={removeFromCart}
            />
          ))}

          <div className="mt-[47px]">
            <p> Delivery location</p>
            <Input
              type="text"
              placeholder="Please share your complete address"
              className="w-[439px] h-[80px]  rounded-md border border-zinc-200 bg-white shadow-sm mt-[8px]"
            ></Input>
          </div>
        </div>

        <div className="w-[471px] h-[276px] bg-white rounded-lg ml-[30px] mt-[30px] p-[16px] ">
          <p className="pb-[20px]"> Payment info</p>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between pb-[8px]">
              <p>Items </p>

              <p>${grandTotal.toFixed(2)}</p>
            </div>
            <div className="flex flex-row justify-between pb-[20px]">
              <p>Shipping </p>

              <p>${shipping.toFixed(2)}</p>
            </div>
            <LineIcon className />
            <div className="flex flex-row justify-between pt-[20px] pb-[20px]">
              <p>Total </p>

              <p>${total.toFixed(2)}</p>
            </div>
          </div>
          <button className=" bg-red-500 flex h-[44px] w-[439px] px-8 py-2 justify-center items-center gap-2 self-stretch rounded-full">
            <p className="text-white flex justify-center items-center">
              Checkout{" "}
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
