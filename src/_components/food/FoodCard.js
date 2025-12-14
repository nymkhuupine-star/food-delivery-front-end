"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CancelIcon from "@/_icons/CancelIcon";
import { useApp } from "@/_provider/CategoryFoodProvider";
import PlusIcon from "@/_icons/PlusIcon";
import { Button } from "@/components/ui/button";
import RedPlusIcon from "@/_icons/RedPlusIcon";
import HomeFoodDialog from "@/_components/dialog/HomeFoodDialog";

export default function FoodCard({ categoryId }) {
  const [foods, setFoods] = useState([]);
  const { refresh, deleteFood, triggerRefresh } = useApp();

  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const getFoodCard = async () => {
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
    getFoodCard();
  }, [categoryId, refresh]);

  return (
    <div className="w-[1264px] mx-auto grid grid-cols-3 gap-[40px] ">
      {foods.map((food, index) => (
        <div
          key={index}
          className="bg-white border border-neutral-200 rounded-xl flex flex-col relative w-[397px] h-[342px]"
        >
          <div className="relative w-[365px] mx-auto h-[210px] mt-4 px-4">
            <Image
              src={food.image}
              fill
              className="object-cover rounded"
              alt={food.foodName}
            />

            <Button
              onClick={() => {
                setSelectedFood(food);
                setOpen(true);
              }}
              className="absolute bottom-2 right-2 bg-white rounded-full w-8 h-8 p-0 flex items-center justify-center shadow"
            >
              <RedPlusIcon className="w-1 h-1" />
            </Button>
            {selectedFood && (
              <HomeFoodDialog
                open={open}
                setOpen={setOpen}
                food={selectedFood}
              />
            )}
          </div>
          <div className="px-4 pt-4 pb-4">
            <div className="flex justify-between">
              <p className="text-red-500 text-sm">{food.foodName}</p>
              <p className="text-xs">${food.price}</p>
            </div>
            <p className="text-sm text-gray-600 mt-1">{food.ingredients}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
