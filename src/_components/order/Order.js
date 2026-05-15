"use client";

import FoodIcon from "@/_icons/FoodIcon";
import LineIcon from "@/_icons/LineIcon";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/_provider/CartProvider";
import Image from "next/image";
import { useMemo } from "react";

export default function Order() {
  const { cartItems } = useCart();

  const itemsCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.qty || 0), 0),
    [cartItems]
  );
  const itemsTotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0),
    [cartItems]
  );
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const total = itemsTotal + shipping;
  const badgeLabel = cartItems.length > 0 ? `${itemsCount} items` : "Empty";
  const badgeClassName =
    cartItems.length > 0
      ? "border-[#86EFAC] bg-white text-[#18181B]"
      : "border-[#E4E4E7] bg-white text-[#18181B]";

  return (
    <>
      <div className="mt-3 flex min-h-[620px] flex-col rounded-[24px] bg-white px-4 py-4 shadow-[0_16px_45px_rgba(15,23,42,0.14)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-[15px] font-semibold text-[#18181B]">
            Current order
          </p>
          <Badge
            className={`rounded-full px-3 py-1 shadow-none ${badgeClassName}`}
          >
            {badgeLabel}
          </Badge>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto overflow-x-hidden pr-1">
          {cartItems.length === 0 ? (
            <div className="flex h-[182px] flex-col items-center justify-center rounded-[20px] bg-[#F4F4F5] p-4 text-center">
              <FoodIcon />
              <p className="mt-3 text-base font-bold leading-7 text-zinc-950">
                Your cart is empty
              </p>
              <p className="text-xs leading-4 text-zinc-500">
                Add some dishes to your cart, then review them here before
                checkout.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-[#F4F4F5] px-3 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-[#F4F4F5]">
                      <Image
                        src={item.image || "/Hero.png"}
                        alt={item.foodName}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#18181B]">
                        {item.foodName}
                      </p>
                      <p className="mt-1 text-xs text-[#71717A]">
                        x {item.qty}
                      </p>
                    </div>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-[#18181B]">
                    ${Number(item.totalPrice).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-5 border-t border-[#E4E4E7] pt-4">
          <div className="flex items-center justify-between text-[15px] font-semibold text-[#18181B]">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[24px] bg-white px-4 py-5 shadow-[0_16px_45px_rgba(15,23,42,0.14)]">
        <p className="text-[15px] font-semibold text-[#71717A]">Payment info</p>

        <div className="mt-5 flex items-center justify-between text-base text-[#71717A]">
          <p>Items</p>
          <p className="font-semibold text-[#18181B]">
            ${itemsTotal.toFixed(2)}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between text-base text-[#71717A]">
          <p>Shipping</p>
          <p className="font-semibold text-[#18181B]">
            ${shipping.toFixed(2)}
          </p>
        </div>

        <LineIcon className="mt-5 w-full" />

        <div className="mt-5 flex items-center justify-between text-[15px]">
          <p className="text-[#71717A]">Total</p>
          <p className="text-[28px] font-semibold leading-none text-[#18181B]">
            ${total.toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
}
