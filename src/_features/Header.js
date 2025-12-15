"use client";

import HeaderLineIcon from "@/_icons/HeaderLineIcon";
import HeaderLocationIcon from "@/_icons/HeaderLocationIcon";
import HeaderLogoIcon from "@/_icons/HeaderLogoIcon";
import HeaderShoppingIcon from "@/_icons/HeaderShoppingIcon";
import HeaderUserIcon from "@/_icons/HeaderUserIcon";
import { useCart } from "@/_provider/CartProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { setIsOrderOpen } = useCart();
  return (
    <div className="bg-slate-950 h-[68px] flex justify-center items-center w-[100%]">
      <div className="w-[1280px] flex flex-row justify-between">
        <HeaderLogoIcon />
        <div className="flex flex-row gap-[13px] items-center">
          <div className="flex flex-row">
            <Badge className=" bg-slate-50 w-[251px]  h-[36px]">
              <HeaderLocationIcon />{" "}
              <div className="text-rose-700"> Delivery address:</div>{" "}
              <div className="text-black"> Add Location</div> <HeaderLineIcon />{" "}
            </Badge>
          </div>
          <Button
            className=" bg-slate-50 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums w-[36px] h-[36px] flex items-center justify-center"
            onClick={() => setIsOrderOpen(true)}
          >
            <HeaderShoppingIcon />
          </Button>
          <Button className=" rounded-full w-[36px] h-[36px] p-0 flex items-center justify-center bg-red-600">
            <HeaderUserIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
