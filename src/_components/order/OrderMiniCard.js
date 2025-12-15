"use client";

import LineIcon from "@/_icons/LineIcon";
import Image from "next/image";
import CancelIcon from "@/_icons/CancelIcon";

export default function OrderMiniCard({ item, removeFromCart }) {
  return (
    <>
      <div className="flex gap-4">
        <div className="relative w-[124px] h-[120px] rounded overflow-hidden">
          <Image
            src={item.image}
            alt={item.foodName}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <p className="font-medium">{item.foodName}</p>
            <button
              onClick={() => removeFromCart(item._id)}
              className="bg-gray-200 rounded-full p-2"
            >
              <CancelIcon />
            </button>
          </div>

          <p className="text-sm text-gray-500">{item.ingredients}</p>

          <div className="flex justify-between mt-3">
            <p className="text-sm">
              {item.qty} x ${item.price}
            </p>
            <p className="font-semibold">${item.totalPrice}</p>
          </div>
        </div>
      </div>

      <LineIcon className="my-4" />
    </>
  );
}
