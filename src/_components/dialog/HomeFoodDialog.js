"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/_provider/CartProvider";

export default function HomeFoodDialog({ open, setOpen, food }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  if (!food) return null;

  const handleAddToCart = () => {
    addToCart({
      ...food,
      qty: qty,
      totalPrice: +(food.price * qty).toFixed(2),
    });
    setOpen(false);
  };
  useEffect(() => {
    if (open) setQty(1);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 rounded-2xl w-[760px] max-w-none">
        <DialogTitle className="sr-only">{food?.foodName}</DialogTitle>
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="relative w-full h-[250px] rounded-xl overflow-hidden">
            <Image
              src={food.image}
              alt={food.foodName}
              fill
              className="object-cover"
            />
          </div>

          <div className="pr-4 relative">
            <button
              className="absolute top-0 right-0 bg-white w-6 h-6 rounded-full flex items-center justify-center shadow"
              onClick={() => setOpen(false)}
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-red-500 text-xl font-semibold">
              {food.foodName}
            </h2>
            <p className="text-gray-600 mt-1 text-sm">{food.ingredients}</p>

            <div className="mt-6">
              <p className="text-sm text-gray-500">Total price</p>
              <p className="text-lg font-bold">
                ${(food.price * qty).toFixed(2)}
              </p>
            </div>

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

            <button
              className="mt-6 w-full bg-black text-white py-2 rounded-full"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
