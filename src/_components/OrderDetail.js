"use client";

import CancelIcon from "@/_icons/CancelIcon";
import LineIcon from "@/_icons/LineIcon";
import ShoppingCardIcon from "@/_icons/ShoppingCartIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export default function OrderDetail({ open, setOpen, food, addToCart }) {
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      ...food,
      qty: qty,
      totalPrice: +(food.price * qty).toFixed(2),
    });
    setOpen(false);
  };
  return (
    <>
      <div className="bg-neutral-700 rounded-s-2xl  w-[535px] h-[1024px]  flex flex-col">
        <div className="flex flex-row pl-[34.5px] pt-[40px] ">
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

          <div className="flex gap-4">
            <img className="w-[124px] h-[120px]"></img>

            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                 <p> Sunshine Stackers </p>
                 <button className=" px-3 py-3 bg-gray-200  rounded-full">
              <CancelIcon />
            </button>
              </div>
              
              <p>
                {" "}
                Fluffy pancakes stacked with fruits, cream, syrup, and powdered
                sugar.
              </p>
              <div className="flex flex-row justify-between">
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <button
                    onClick={() => qty > 1 && setQty(qty - 1)}
                    className="w-6 h-6 rounded-full border flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="px-3">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-6 h-6 rounded-full border flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <p>$12.99</p>
              </div>
              </div>
            </div>
          </div>

          <LineIcon className=" mb-[20px] mt-[20px]"/>

           <div className="flex gap-4">
            <img className="w-[124px] h-[120px]"></img>

            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                 <p> Sunshine Stackers </p>
                 <button className=" px-3 py-3 bg-gray-200  rounded-full">
              <CancelIcon />
            </button>
              </div>
              
              <p>
                {" "}
                Fluffy pancakes stacked with fruits, cream, syrup, and powdered
                sugar.
              </p>
              <div className="flex flex-row justify-between">
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <button
                    onClick={() => qty > 1 && setQty(qty - 1)}
                    className="w-6 h-6 rounded-full border flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="px-3">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-6 h-6 rounded-full border flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <p>$12.99</p>
              </div>
              </div>
            </div>
          </div>
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
            <p>$25.98 </p>
          </div>
           <div className="flex flex-row justify-between pb-[20px]">
            <p>Shipping  </p>
            <p>$25.98 </p>
          </div>
          <LineIcon className/>
           <div className="flex flex-row justify-between pt-[20px] pb-[20px]">
            <p>Total  </p>
            <p>$25.98 </p>
          </div>
          </div>
          <button className=" bg-red-500 flex h-[44px] w-[439px] px-8 py-2 justify-center items-center gap-2 self-stretch rounded-full">
           <p className="text-white flex justify-center items-center">Checkout </p>


          </button>
          
        </div>
      </div>
    </>
  );
}
