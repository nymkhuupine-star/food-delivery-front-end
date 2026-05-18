
"use client";

import { useApp } from "@/_provider/CategoryFoodProvider";
import FoodCard from "./FoodCard";

export const HomeFoodList = () => {
  const { categories } = useApp();

  return (
    <div className="flex flex-col bg-neutral-700 pb-12">
      {categories.map((cat) => (
        <section key={cat._id} className="w-full bg-neutral-700">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 mt-10 text-xl font-bold text-white sm:text-2xl">
              {cat.categoryName}
            </h2>
          </div>
          <FoodCard categoryId={cat._id} />
        </section>
      ))}
    </div>
  );
};
