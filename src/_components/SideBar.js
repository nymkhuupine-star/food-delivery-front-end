"use client";

import HeaderLogoTwoIcon from "@/_icons/HeaderLogoTwoIcon";
import MenuIcon from "@/_icons/MenuIcon";
import MenuIconBlack from "@/_icons/MenuIconBlack";
import SettingsIcon from "@/_icons/SettingsIcon";
import TruckIcon from "@/_icons/TruckIcon";
import TruckIconWhite from "@/_icons/TruckIconWhite";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();

  return (
   <div className="h-full bg-white w-[205px] flex flex-col shrink-0">
  <div className="flex flex-row h-[44px] w-[165px] items-center ml-[20px] mt-[36px]">
    <HeaderLogoTwoIcon />
    <div className="flex flex-col pl-[10px]">
      <p className="text-lg text-black">NomNom</p>
      <p className="text-xs text-gray-500">Swift delivery</p>
    </div>
  </div>

 {/* CATEGORY */}
      <Link href="/category">
        <Button
          className={`flex flex-row items-center justify-start gap-2 h-[40px] w-[165px] rounded-xl ml-[20px] mt-[40px]
            ${pathname === "/category" ? "bg-stone-950 text-white" : "bg-white text-black"}
          `}
        >
          
            {pathname === "/category" ? <MenuIcon /> : <MenuIconBlack />}
          <p>Food menu</p>
        </Button>
      </Link>

      {/* ORDER */}
      <Link href="/order">
        <Button
          className={`flex flex-row items-center justify-start gap-2 h-[40px] w-[165px] rounded-2xl ml-[20px] mt-[24px]
            ${pathname === "/order" ? "bg-stone-950 text-white" : "bg-white text-black"}
          `}
        >
            {pathname === "/order" ? <TruckIconWhite /> : <TruckIcon />}
          <p>Orders</p>
        </Button>
      </Link>

  <Button className="flex flex-row items-center justify-start gap-2 h-[40px] w-[165px] bg-white rounded-xl text-black ml-[20px] mt-[24px]">
    <SettingsIcon /><p>Settings</p>
  </Button>
</div>

  );
}

