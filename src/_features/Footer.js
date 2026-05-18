"use client";

import HeaderLogoIcon from "@/_icons/HeaderLogoIcon";
import SocialIcon from "@/_icons/SocialIcon";

export default function Footer() {
  return (
    <footer className="bg-slate-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-red-500">
          <div className="flex h-[92px] items-center whitespace-nowrap">
            <div className="flex gap-12 animate-marquee text-2xl font-semibold text-white">
              <p>Fresh fast delivered</p>
              <p>Fresh fast delivered</p>
              <p>Fresh fast delivered</p>
              <p>Fresh fast delivered</p>
              <p>Fresh fast delivered</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[auto_1fr_auto] md:items-start">
          <HeaderLogoIcon />

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-2 text-white">
              <p className="font-bold">NOMNOM</p>
              <p>Home</p>
              <p>Contact us</p>
              <p>Delivery zone</p>
            </div>

            <div className="flex flex-col gap-2 text-white">
              <p className="font-bold">Menu</p>
              <p>Appetizers</p>
              <p>Salads</p>
              <p>Pizzas</p>
            </div>

            <div className="flex flex-col gap-2 text-white">
              <p className="font-bold">More</p>
              <p>Side dish</p>
              <p>Brunch</p>
              <p>Desserts</p>
              <p>Beverages</p>
            </div>
          </div>

          <div className="md:justify-self-end">
            <SocialIcon />
          </div>
        </div>

        <div className="mt-12 border-t-4 border-slate-500 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-sm text-white">
            <p>Copyright 2024 Nomnom LLC</p>
            <p>Privacy policy</p>
            <p>Terms and condition</p>
            <p>Cookie policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
