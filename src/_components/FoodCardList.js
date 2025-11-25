"use client";

import FoodCard from "./FoodCard";

export default function FoodCardList({ className }) {
  return (
    <div
      className={`bg-neutral-700 flex flex-col w-full gap-[36px] justify-center items-center ${className}`}
    >
      <div className="w-[1280px]  pt-[88px] pb-[18px] text-left text-white">
        Appetizers{" "}
      </div>
      <div className="flex flex-row gap-[36px]">
        <FoodCard />
        <FoodCard />
        <FoodCard />
      </div>
      <div className="flex flex-row gap-[36px]">
        <FoodCard />
        <FoodCard />
        <FoodCard />
      </div>
    </div>
  );
}
