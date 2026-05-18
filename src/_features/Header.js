"use client";

import HeaderLineIcon from "@/_icons/HeaderLineIcon";
import HeaderLocationIcon from "@/_icons/HeaderLocationIcon";
import HeaderLogoIcon from "@/_icons/HeaderLogoIcon";
import HeaderShoppingIcon from "@/_icons/HeaderShoppingIcon";
import HeaderUserIcon from "@/_icons/HeaderUserIcon";
import { useCart } from "@/_provider/CartProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  const { setIsOrderOpen } = useCart();
  return (
    <header className="bg-slate-950">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <HeaderLogoIcon />

        <div className="flex items-center gap-2 sm:gap-3">
          <Badge className="hidden h-9 items-center gap-2 bg-slate-50 px-3 md:flex">
            <HeaderLocationIcon />
            <span className="text-rose-700">Delivery address:</span>
            <span className="text-black">Add Location</span>
            <HeaderLineIcon />
          </Badge>

          <Button
            type="button"
            aria-label="Open cart"
            className="h-9 w-9 rounded-full bg-slate-50 p-0 text-slate-950 hover:bg-slate-50/90"
            onClick={() => setIsOrderOpen(true)}
          >
            <HeaderShoppingIcon />
          </Button>

          <Button
            asChild
            className="h-9 w-9 rounded-full bg-red-600 p-0 hover:bg-red-700"
          >
            <Link href="/login" aria-label="Go to login page">
              <HeaderUserIcon />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
