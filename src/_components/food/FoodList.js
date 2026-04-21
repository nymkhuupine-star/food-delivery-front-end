"use client";

import AddFoodCard from "./AddFoodCard";
import { CategoryFoods } from "./CategoryFoods";
import { useApp } from "@/_provider/CategoryFoodProvider";

export default function FoodList({ categories, onOpenDishDialog }) {
  const { foods } = useApp();

  return (
    <div className="space-y-5 pb-8">
      {categories.map((cat) => (
        <div
          key={cat._id}
          className="rounded-[24px] border border-[#E4E4E7] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
        >
          <div className="flex items-center gap-2 pb-4">
            <p className="text-[22px] font-semibold leading-7 tracking-[-0.03em] text-[#18181B]">
              {cat.categoryName}
            </p>
            <p className="text-[22px] font-semibold leading-7 tracking-[-0.03em] text-[#18181B]">
              ({foods.filter((food) => food.category === cat._id).length})
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <AddFoodCard category={cat} onOpen={onOpenDishDialog} />
            <CategoryFoods categoryId={cat._id} categories={categories} />
          </div>
        </div>
      ))}
    </div>
  );
}
