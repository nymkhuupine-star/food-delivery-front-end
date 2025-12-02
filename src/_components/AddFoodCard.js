"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function AddFoodCard({ category, onOpen }) {
  return (
    <div
      className="bg-white w-[270.75px] h-[241px] rounded-[20px] border flex flex-col  "
      style={{
        borderStyle: "dashed",
        borderColor: "#EF4444",
      }}
      onClick={() => onOpen(category)}
    >
      <div className="flex  flex-col pl-[110px] pt-[70px]">
        <Button className="bg-red-500 h-[50px] w-[50px] rounded-4xl">
          <PlusIcon />
        </Button>
      </div>
      <p className="flex justify-center pt-[10px] items-center">
        Add new Dish to {category.categoryName}
      </p>
    </div>
  );
}
