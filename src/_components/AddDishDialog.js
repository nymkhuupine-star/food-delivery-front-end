"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CancelIcon from "@/_icons/CancelIcon";

export default function AddDishDialog({ isOpen, onClose, onSubmit, category }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white w-[420px] rounded-lg p-5 shadow-xl">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">
            Add Dish to "{category?.categoryName}"
          </h3>

          <button
            onClick={onClose}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <CancelIcon />
          </button>
        </div>

        <div className="mt-5">
          <p className="text-sm mb-2">Dish Name</p>
          <Input
            placeholder="Enter dish name..."
            className="mb-4"
            name="dishName"
          />

          <div className="flex justify-end gap-2">
            <Button onClick={onSubmit} className="bg-black text-white">
              Add Dish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
