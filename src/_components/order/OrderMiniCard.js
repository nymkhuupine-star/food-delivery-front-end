"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";

export default function OrderMiniCard({
  item,
  removeFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
}) {
  return (
    <div className="border-b border-dashed border-[#D4D4D8] pb-5 last:border-b-0 last:pb-0">
      <div className="flex gap-3">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#F4F4F5]">
          <Image
            src={item.image}
            alt={item.foodName}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold leading-7 text-[#EF4444]">
                  {item.foodName}
                </p>
                <p className="mt-1 text-xs leading-4 text-[#52525B]">
                  {item.ingredients}
                </p>
              </div>

              <button
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#FCA5A5] text-[#EF4444] transition hover:bg-[#FEF2F2]"
                onClick={() => removeFromCart(item._id)}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex items-end justify-between gap-4">
              <div className="flex items-center gap-4 text-[#18181B]">
                <button
                  className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-[#F4F4F5] disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={item.qty <= 1}
                  onClick={() => decreaseCartItemQuantity(item._id)}
                  type="button"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-4 text-center text-2xl font-medium leading-none">
                  {item.qty}
                </span>
                <button
                  className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-[#F4F4F5]"
                  onClick={() => increaseCartItemQuantity(item._id)}
                  type="button"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <p className="shrink-0 text-[28px] font-semibold leading-none text-[#18181B]">
                ${Number(item.totalPrice).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
