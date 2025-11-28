"use client";

import HeaderLogoTwoIcon from "@/_icons/HeaderLogoTwoIcon";
import MenuIcon from "@/_icons/MenuIcon";
import SettingsIcon from "@/_icons/SettingsIcon";
import TruckIcon from "@/_icons/TruckIcon";
import { Button } from "@/components/ui/button";

export default function SideBar() {
  return (
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
  );
}
