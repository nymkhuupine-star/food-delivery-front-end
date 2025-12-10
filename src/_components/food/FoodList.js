"use client";

import AddFoodCard from "./AddFoodCard";
import { CategoryFoods } from "./CategoryFoods";

export default function FoodList({ categories, onOpenDishDialog }) {
  return (
    <div className="bg-white w-[1171px] p-6 rounded-md  mt-[24px] mb-[24px] ">
      {categories.map((cat, index) => (
        <div key={index} className="mb-6">
          <p className="pb-[16px]">{cat.categoryName}</p>

          <div className="grid grid-cols-4 gap-3">
            <AddFoodCard category={cat} onOpen={onOpenDishDialog} />
            <CategoryFoods categoryId={cat._id} />
          </div>
        </div>
      ))}
    </div>
  );
}
