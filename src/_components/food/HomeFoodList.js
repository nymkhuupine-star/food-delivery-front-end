
"use client";

import { useApp } from "@/_provider/CategoryFoodProvider";
import FoodCard from "./FoodCard";

export const HomeFoodList = () => {
  const { categories } = useApp();

  return (
    <div className="flex flex-col  bg-neutral-700 ">
      {categories.map((cat) => (
        <div key={cat._id} className="w-full   bg-neutral-700">
         
          <h2 className="text-xl font-bold text-white mt-[54px]  mx-auto mb-[54px] w-[1264px] bg-neutral-700  rounded">
            {cat.categoryName}
          </h2>
          <FoodCard categoryId={cat._id} className="mb-[20px]" />
        </div>
      ))}
    </div>
  );
};
