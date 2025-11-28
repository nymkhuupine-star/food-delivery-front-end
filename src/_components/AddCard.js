"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function AddCard() {
  return (
    <div className="bg-white border border-indigo-600  w-[270.75px] h-[241px] rounded-xl flex flex-col">
      <div className="flex justify-center items-center pt-[16px] flex-col">
        <Button className="bg-red-500 h-[50px] w-[50px] rounded-4xl">
          {" "}
          <PlusIcon />
        </Button>
        <p>Add new Dish to Salads</p>
      </div>
    </div>
  );
}
