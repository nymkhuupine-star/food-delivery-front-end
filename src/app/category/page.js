"use client";

import FoodCard from "@/_components/FoodCard";
import MiniFoodCard from "@/_components/MiniFoodCard";
import HeaderLogoIcon from "@/_icons/HeaderLogoIcon";
import HeaderLogoTwoIcon from "@/_icons/HeaderLogoTwoIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MenuIcon, SettingsIcon, TruckIcon } from "lucide-react";

export default function Category() {
  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-row max-w-[1440px] bg-zinc-200 w-full">
        <div className="h-[1324px]  bg-white  w-[205px] flex flex-col">
          <div className="flex flex-row h-[44px] w-[165px] items-center">
            {" "}
            <HeaderLogoTwoIcon className=" ml-[20px] mt-[36px] " />
            <div className="flex flex-col mt-[36px]  pl-[10px] ">
              <p className="text-lg text-black">NomNom</p>
              <p className="text-xs text-gray-500 ">Swift delivery</p>
            </div>
          </div>

          <Button className="bg-stone-950 flex flex-row h-[40px] w-[165px]   ml-[20px]  mt-[40px] ">
            {" "}
            <MenuIcon /> <p className="text-white">Food menu</p>{" "}
          </Button>
          <Button className="flex flex-row h-[40px]   bg-white   text-black  w-[165px] ml-[20px] mt-[24px]">
            <TruckIcon />
            <p> Orders</p>
          </Button>
          <Button className="flex flex-row h-[40px] w-[165px]  bg-white   text-black  ml-[20px]  mt-[24px]">
            <SettingsIcon />
            <p> Settings</p>
          </Button>
        </div>
        <div className="pt-[84px] flex flex-col pl-[24px] gap-[24px] flex-1 ">
          <div className="h-[176px]  bg-white  w-full rounded-md p-6">
            <p className="text-xl"> Dishes category</p>
            <div className="grid grid-cols-8 gap-3  bg-white   text-black">
              <Badge className="border border-indigo-600  bg-white   text-black">
                Badge
              </Badge>
              <Badge className="border border-indigo-600   bg-white   text-black">
                Badge
              </Badge>
              <Badge className="border border-indigo-600  bg-white   text-black ">
                Badge
              </Badge>
              <Badge className="border border-indigo-600   bg-white   text-black">
                Badge
              </Badge>
              <Badge className="border border-indigo-600   bg-white   text-black">
                Badge
              </Badge>
              <Badge className="border border-indigo-600   bg-white   text-black">
                Badge
              </Badge>
              <Badge className="border border-indigo-600   bg-white   text-black">
                Badge
              </Badge>
              <Badge className="border border-indigo-600   bg-white   text-black">
                Badge
              </Badge>
              <Badge className="border border-indigo-600  bg-white   text-black ">
                Badge
              </Badge>
              <Badge className="border border-indigo-600   bg-white   text-black">
                Badge
              </Badge>
            </div>
          </div>
          <div className="h-[582px]  bg-white  w-full  p-6 rounded-md">
            <div className="grid grid-cols-4 gap-3 ">
              <MiniFoodCard />
              <MiniFoodCard />
              <MiniFoodCard />
              <MiniFoodCard />
              <MiniFoodCard />
              <MiniFoodCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
