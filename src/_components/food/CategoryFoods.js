"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useApp } from "@/_provider/CategoryFoodProvider";
import CancelIcon from "@/_icons/CancelIcon";
import { Button } from "@/components/ui/button";
import EditIcon from "@/_icons/EditIcon";
import FoodEditDialog from "../dialog/FoodEditDialog";

export const CategoryFoods = ({ categoryId, categories }) => {
  const [foods, setFoods] = useState([]);
  const { refresh, deleteFood, triggerRefresh } = useApp();
  const [selectedFood, setSelectedFood] = useState(null);
  const [open, setOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getCategoryFoods = async () => {
    try {
      const response = await axios.get(
        `https://food-delivery-back-end-gq7z.onrender.com/food/category/${categoryId}`
      );
      setFoods(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategoryFoods();
  }, [categoryId, refresh]);

  return (
    <>
      {foods.map((food, index) => (
        <div key={index}>
          <div className="bg-white border border-neutral-200 w-[270.75px] h-[241px] rounded-xl flex flex-col relative">
            <button
              onClick={async () => {
                await deleteFood(food._id);
              }}
              className="absolute top-[-5px] right-[-5px] w-5 h-5 flex items-center justify-center bg-white rounded-full border border-gray-300"
            >
              <CancelIcon className="w-3 h-3" />
            </button>

            <div className="flex justify-center mt-[16px] ml-[16px] w-60 h-[135px] relative">
              <Image
                src={food.image}
                alt={food.foodName || "Food image"}
                fill
                className="object-cover"
              />
              <Button
                onClick={() => {
                  setSelectedFood(food);
                  setOpen(true);
                }}
                className="absolute bottom-2 right-2 bg-white rounded-full w-8 h-8 p-0 flex items-center justify-center shadow"
              >
                <EditIcon className="w-4 h-4" />
              </Button>
            </div>

            <div className="pt-[20px] pl-[15px] pr-[16px]">
              <div className="flex flex-row justify-between">
                <p className="text-red-500 text-sm">{food.foodName}</p>
                <p className="text-xs">${food.price}</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">{food.ingredients}</p>
            </div>
          </div>
        </div>
      ))}

      {selectedFood && (
        <FoodEditDialog open={open} setOpen={setOpen} food={selectedFood} />
      )}
    </>
  );
};
