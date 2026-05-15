"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useApp } from "@/_provider/CategoryFoodProvider";
import { Button } from "@/components/ui/button";
import RedPlusIcon from "@/_icons/RedPlusIcon";
import HomeFoodDialog from "@/_components/dialog/HomeFoodDialog";
import { apiUrl } from "@/lib/api";

function FoodCardSkeleton() {
  return (
    <div className="bg-white border rounded-xl w-[397px] h-[342px]">
      <div className="relative w-[365px] mx-auto h-[210px] mt-4 rounded skeleton skeleton-soft" />

      <div className="px-4 pt-4 space-y-3">
        <div className="flex justify-between items-center gap-3">
          <div className="h-4 w-40 rounded-full skeleton" />
          <div className="h-4 w-14 rounded-full skeleton" />
        </div>
        <div className="h-3 w-full rounded-full skeleton" />
        <div className="h-3 w-5/6 rounded-full skeleton" />
      </div>
    </div>
  );
}

export default function FoodCard({ categoryId }) {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { refresh } = useApp();

  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    let isActive = true;
    const getFoodCard = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(apiUrl(`/food/category/${categoryId}`));
        if (!isActive) return;
        setFoods(Array.isArray(res.data) ? res.data : []);
      } catch {
        if (!isActive) return;
        setFoods([]);
      } finally {
        if (!isActive) return;
        setIsLoading(false);
      }
    };
    getFoodCard();
    return () => {
      isActive = false;
    };
  }, [categoryId, refresh]);

  const handleOpenDialog = (food) => {
    setSelectedFood(food);
    setOpen(true);
  };

  return (
    <>
      <div className="w-[1264px] mx-auto grid grid-cols-3 gap-[40px]">
        {isLoading && foods.length === 0
          ? Array.from({ length: 3 }).map((_, idx) => (
              <FoodCardSkeleton key={`skeleton-${idx}`} />
            ))
          : foods.map((food) => (
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
