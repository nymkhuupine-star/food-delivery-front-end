"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useApp } from "@/_provider/CategoryFoodProvider";
import { Button } from "@/components/ui/button";
import RedPlusIcon from "@/_icons/RedPlusIcon";
import HomeFoodDialog from "@/_components/dialog/HomeFoodDialog";

function FoodCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
      <div className="relative aspect-[4/3] w-full skeleton skeleton-soft" />

      <div className="space-y-3 p-4">
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
  const { foods, foodLoading } = useApp();

  const categoryFoods = useMemo(() => {
    if (!Array.isArray(foods)) return [];
    return foods.filter((food) => food.category === categoryId);
  }, [foods, categoryId]);

  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  // If the selected food is cleared externally, ensure the dialog closes.
  // (Prevents dialog from being "open" without content.)
  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setSelectedFood(null);
    }
  };

  const handleOpenDialog = (food) => {
    setSelectedFood(food);
    setOpen(true);
  };

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
        {foodLoading && categoryFoods.length === 0
          ? Array.from({ length: 3 }).map((_, idx) => (
              <FoodCardSkeleton key={`skeleton-${idx}`} />
            ))
          : categoryFoods.map((food) => (
              <div
                key={food._id}
                className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
              >
                <div
                  className="relative aspect-[4/3] w-full cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpenDialog(food)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleOpenDialog(food);
                    }
                  }}
                  aria-label={`Open ${food.foodName}`}
                >
                  <Image
                    src={food.image}
                    fill
                    className="object-cover"
                    alt={food.foodName}
                  />

                  <Button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenDialog(food);
                    }}
                    className="absolute bottom-2 right-2 h-9 w-9 rounded-full bg-white p-0 shadow-[0_8px_24px_rgba(15,23,42,0.18)] hover:bg-white"
                    aria-label={`Open ${food.foodName}`}
                  >
                    <RedPlusIcon />
                  </Button>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium text-red-500">{food.foodName}</p>
                    <p className="shrink-0 font-medium">${food.price}</p>
                  </div>
                  <p
                    className="mt-2 text-sm text-gray-600"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {food.ingredients}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {selectedFood && (
        <HomeFoodDialog open={open} setOpen={handleOpenChange} food={selectedFood} />
      )}
    </>
  );
}
