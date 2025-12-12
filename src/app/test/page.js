"use client";

import CancelIcon from "@/_icons/CancelIcon";
import ShoppingCardIcon from "@/_icons/ShoppingCartIcon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function Test({ open, setOpen, food, addToCart }) {
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

          <button className=" px-3 py-3 bg-gray-200 ml-[320px] rounded-full">
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
        <div className="w-[471px] h-[532px] bg-white rounded-lg ml-[30px] mt-[30px]  ">
          <div className="flex justify-around">
            {" "}
            <p>My cart</p>
            <button className=" px-3 py-3 bg-gray-200 ml-[320px] rounded-full">
              <CancelIcon />
            </button>
          </div>

          <div className="flex gap-4">
            <img className="w-[124px] h-[120px]"></img>

            <div className="flex flex-col">
              <p> Sunshine Stackers </p>
              <p>
                {" "}
                Fluffy pancakes stacked with fruits, cream, syrup, and powdered
                sugar.
              </p>
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
            </div>
          </div>
        </div>

        <div className="w-[471px] h-[276px] bg-white rounded-lg ml-[30px] mt-[30px]"></div>
      </div>
    </>
  );
}
