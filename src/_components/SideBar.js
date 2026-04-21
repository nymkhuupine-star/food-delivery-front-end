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
  const navButtonClassName =
    "h-10 w-full justify-start gap-2.5 rounded-full px-4 text-sm font-medium shadow-none transition";

  return (
    <aside className="flex min-h-screen w-[180px] shrink-0 flex-col border-r border-[#E4E4E7] bg-white px-5 py-8">
      <div className="flex h-[44px] items-center">
        <HeaderLogoTwoIcon />
        <div className="pl-[10px]">
          <p className="text-lg font-semibold text-[#09090B]">NomNom</p>
          <p className="text-xs text-[#71717A]">Swift delivery</p>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-2">
        <Link href="/category" className="block w-full">
          <Button
            className={`${navButtonClassName}
            ${pathname === "/category" ? "bg-stone-950 text-white hover:bg-stone-950" : "bg-transparent text-black hover:bg-[#F4F4F5]"}
          `}
          >
            {pathname === "/category" ? <MenuIcon /> : <MenuIconBlack />}
            <p>Food menu</p>
          </Button>
        </Link>

        <Link href="/order" className="block w-full">
          <Button
            className={`${navButtonClassName}
            ${pathname === "/order" ? "bg-stone-950 text-white hover:bg-stone-950" : "bg-transparent text-black hover:bg-[#F4F4F5]"}
          `}
          >
            {pathname === "/order" ? <TruckIconWhite /> : <TruckIcon />}
            <p>Orders</p>
          </Button>
        </Link>
      </div>

      <Button
        className={`${navButtonClassName} mt-auto bg-transparent text-black hover:bg-[#F4F4F5]`}
      >
        <SettingsIcon />
        <p>Settings</p>
      </Button>
    </aside>
  );
}

