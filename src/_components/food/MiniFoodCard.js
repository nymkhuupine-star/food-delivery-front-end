"use client";

import RedPlusIcon from "@/_icons/RedPlusIcon";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MiniFoodCard({ image, name, price, description }) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
      <div className="relative aspect-[4/3] w-full">
        <Image src={image} fill className="object-cover" alt={name} />
        {/* <Button
              onClick={() => {
                setSelectedFood(food);
                setOpen(true);
              }}
              className="absolute bottom-2 right-2 bg-white rounded-full w-8 h-8 p-0 flex items-center justify-center shadow"
            >
              <RedPlusIcon className="w-1 h-1" />
            </Button> */}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium text-red-500">{name}</p>
          <p className="shrink-0 text-xs font-medium">${price}</p>
        </div>

        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
