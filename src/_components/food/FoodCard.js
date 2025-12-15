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
  const { refresh } = useApp();

  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    const getFoodCard = async () => {
      const res = await axios.get(
        `https://food-delivery-back-end-gq7z.onrender.com/food/category/${categoryId}`
      );
      setFoods(res.data);
    };
    getFoodCard();
  }, [categoryId, refresh]);

  const handleOpenDialog = (food) => {
    setSelectedFood(food);
    setOpen(true);
  };

  return (
    <>
      <div className="w-[1264px] mx-auto grid grid-cols-3 gap-[40px]">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white border rounded-xl w-[397px] h-[342px]"
          >
            <div className="relative w-[365px] mx-auto h-[210px] mt-4">
              <Image
                src={food.image}
                fill
                className="object-cover rounded"
                alt={food.foodName}
              />

              <Button
                onClick={() => handleOpenDialog(food)}
                className="absolute bottom-2 right-2 bg-white rounded-full w-8 h-8"
              >
                <RedPlusIcon />
              </Button>
            </div>

            <div className="px-4 pt-4">
              <div className="flex justify-between">
                <p className="text-red-500">{food.foodName}</p>
                <p>${food.price}</p>
              </div>
              <p className="text-gray-600">{food.ingredients}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedFood && (
        <HomeFoodDialog open={open} setOpen={setOpen} food={selectedFood} />
      )}
    </>
  );
}
