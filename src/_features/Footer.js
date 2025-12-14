"use client";

import HeaderLogoIcon from "@/_icons/HeaderLogoIcon";
import SocialIcon from "@/_icons/SocialIcon";


export default function Footer() {
  return (
   
    <div className="pt-[54px]  bg-neutral-700 ">

      
    
    <div className="bg-slate-950 h-[755px] pt-[60px] w-full">
      
     
      <div className="w-[1280px] mx-auto overflow-hidden">
        <div className="bg-red-500 h-[92px] flex items-center whitespace-nowrap">
          
          <div className="flex gap-[48px] animate-marquee text-white text-2xl font-semibold">
            <p>Fresh fast delivered</p>
            <p>Fresh fast delivered</p>
            <p>Fresh fast delivered</p>
            <p>Fresh fast delivered</p>
            <p>Fresh fast delivered</p>
            
          </div>

        </div>
      </div>

     
      <div className="flex w-[1280px] mx-auto justify-between items-center pt-[100px] gap-[112px]">
        <HeaderLogoIcon />

        <div className="text-white flex flex-col gap-2">
          <p className="font-bold">NOMNOM</p>
          <p>Home</p>
          <p>Contact us</p>
          <p>Delivery zone</p>
        </div>

        <div className="text-white flex flex-col gap-2">
          <p className="font-bold">Menu</p>
          <p>Appetizers</p>
          <p>Salads</p>
          <p>Pizzas</p>
        </div>

        <div className="text-white flex flex-col gap-2">
          <p className="font-bold">More</p>
          <p>Side dish</p>
          <p>Brunch</p>
          <p>Desserts</p>
          <p>Beverages</p>
        </div>

        <SocialIcon />
      </div>

      
      <div className="pt-[184px] w-[1280px] mx-auto flex justify-center">
        <div className="w-[1264px] h-[84px] border-t-4 border-slate-500 bg-slate-950 text-white flex gap-[48px] items-center">
          <p>Copyright 2024 Nomnom LLC</p>
          <p>Privacy policy</p>
          <p>Terms and condition</p>
          <p>Cookie policy</p>
        </div>
      </div>
    </div>
    </div>
    
  );
}
