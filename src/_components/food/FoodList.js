"use client";

import { Badge } from "@/components/ui/badge";
import AddFoodCard from "./AddFoodCard";
import { CategoryFoods } from "./CategoryFoods";
import { useApp } from "@/_provider/CategoryFoodProvider";

export default function FoodList({ categories, onOpenDishDialog }) {
  const { foods } = useApp();

  return (
    <div className="bg-white w-[1171px] p-6 rounded-md mt-[24px] mb-[24px]">
      {categories.map((cat, index) => (
        <div key={index} className="mb-6">
          <div className="flex items-center pb-[16px] gap-[8px] ">
            <p className="text-[#09090B] font-inter text-[20px] font-semibold leading-[28px] tracking-[-0.5px]">{cat.categoryName}</p>
            <p className="text-[#09090B] font-inter text-[20px] font-semibold leading-[28px] tracking-[-0.5px]">(
              {foods.filter((food) => food.category === cat._id).length})
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <AddFoodCard category={cat} onOpen={onOpenDishDialog} />
            <CategoryFoods categoryId={cat._id} categories={categories} />
          </div>
        </div>
      ))}
    </div>
  );
}
