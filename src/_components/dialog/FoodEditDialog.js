"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import DeleteIcon from "@/_icons/DeleteIcon";

export default function FoodEditDialog({
  open,
  setOpen,
  food,
  setFood,
  addToCart,
  categories,
}) {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[472px] h-[596px] bg-white rounded-lg p-5 shadow-xl">
        <DialogTitle className="sr-only">{food?.foodName}</DialogTitle>
        <div className=" relative">
          <div className="flex flex-col gap-[8px]">
            <div className="flex flex-row justify-between">
              <button
                className="absolute  right-4 p-1 rounded-full hover:bg-gray-200"
                onClick={() => setOpen(false)}
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <p className="text-lg font-semibold mb-4">Dishes info</p>
            </div>

            <div className="flex flex-row justify-between mb-3">
              <p className="text-gray-400 text-xs font-normal leading-4 font-inter">
                Dish name
              </p>
              <Input
                type="text"
                value={food.foodName}
                onChange={(e) => setFood({ ...food, foodName: e.target.value })}
                className="w-[288px] h-[36px]"
              />
            </div>

            <div className="flex flex-row justify-between mb-3">
              <p className="text-gray-400 text-xs font-normal leading-4 font-inter">
                Dish category
              </p>
              <Input
                type="text"
                value={food.category}
                onChange={(e) => setFood({ ...food, category: e.target.value })}
                className="w-[288px] h-[36px]"
              />
            </div>

            <div className="flex flex-row mb-3">
              <p className="text-gray-400 text-xs font-normal leading-4 font-inter">
                Ingredients
              </p>
              <textarea
                value={food.ingredients}
                onChange={(e) =>
                  setFood({ ...food, ingredients: e.target.value })
                }
                className="text-gray-600 w-[288px] h-[80px] text-sm ml-[100px] border rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <div className="flex flex-row justify-between mb-3">
              <p className="text-gray-400 text-xs font-normal leading-4 font-inter">
                Price
              </p>
              <Input
                type="text"
                value={food.price}
                onChange={(e) => setFood({ ...food, price: e.target.value })}
                className="w-[288px] h-[36px]"
              />
            </div>

            <div className="flex flex-row justify-between items-start mb-6">
              <p className="text-gray-400 text-xs font-normal leading-4 font-inter">
                Image
              </p>
              <div className="relative w-[288px] h-[118px] rounded-xl overflow-hidden border">
                {food.image ? (
                  <Image
                    src={food.image}
                    alt={food.foodName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500">
                    No image
                  </div>
                )}

                <button
                  className="absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-gray-200 shadow-md z-10"
                  onClick={() => setFood({ ...food, image: null })}
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setFood({ ...food, image: url });
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between pt-[48px]">
            <button className="rounded-md  border-red-500 bg-white">
              <DeleteIcon />
            </button>

            <button
              className="w-[126px] h-[40px] bg-black text-white py-2  rounded-full mb-2"
              onClick={handleAddToCart}
            >
              Save changes
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
