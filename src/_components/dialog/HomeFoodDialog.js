"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/_provider/CartProvider";

export default function HomeFoodDialog({ open, setOpen, food }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (open) setQty(1);
  }, [open]);

  if (!open || !food) return null;

  const handleAddToCart = () => {
    addToCart({
      ...food,
      qty,
      totalPrice: +(food.price * qty).toFixed(2),
    });
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label={food.foodName}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative max-h-[calc(100vh-2rem)] w-full max-w-[760px] overflow-y-auto rounded-2xl bg-white shadow-[0_32px_64px_rgba(15,23,42,0.18)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow"
          onClick={() => setOpen(false)}
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image
              src={food.image}
              alt={food.foodName}
              fill
              className="object-cover"
            />
          </div>

          <div className="relative sm:pr-4">
            <h2 className="text-xl font-semibold text-red-500">
              {food.foodName}
            </h2>
            <p className="mt-1 text-sm text-gray-600">{food.ingredients}</p>

            <div className="mt-6">
              <p className="text-sm text-gray-500">Total price</p>
              <p className="text-lg font-bold">
                ${(Number(food.price) * qty).toFixed(2)}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center rounded-full bg-gray-100 px-3 py-1">
                <button
                  type="button"
                  onClick={() => qty > 1 && setQty(qty - 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full border"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full border"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-full bg-black py-2 text-white hover:bg-black/90"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
