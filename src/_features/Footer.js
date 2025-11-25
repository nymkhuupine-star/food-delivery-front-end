"use client";

import HeaderLogoIcon from "@/_icons/HeaderLogoIcon";
import SocialIcon from "@/_icons/SocialIcon";

export default function Footer() {
  return (
    <div className="bg-slate-950 h-[755px] pt-[60px] w-full ">
      <div className="w-[1280px] mx-auto flex justify-center items-center">
        <div className="bg-red-500 h-[92px] gap-[34px] flex flex-row justify-center items-center text-2xl text-white w-full">
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
        </div>
      </div>

      <div className="flex flex-row  w-[1280px] mx-auto justify-between justify-center items-center pt-[100px] gap-[112px] ">
        <HeaderLogoIcon />
        <div className="text-white flex flex-col">
          <p>NOMNOM </p>
          <p>Home </p>
          <p>Contact us</p>
          <p>Delivery zone</p>
        </div>
        <div className="text-white flex flex-col">
          <p>NOMNOM </p>
          <p>Appetizers </p>
          <p>Salads</p>
          <p>Pizzas</p>
        </div>
        <div className="text-white flex flex-col">
          <p>Side dish </p>
          <p>Brunch </p>
          <p>Desserts</p>
          <p>Beverages</p>
        </div>
        <SocialIcon />
      </div>
      <div className="pt-[184px] w-[1280px] mx-auto justify-center ">
        <div className="w-[1264px] h-[84px] border-t-4 border-slate-500 bg-slate-950 text-white flex flex-row gap-[48px] items-center">
          <p> Copy right 2024 Nomnom LLC</p>
          <p>Privacy policy </p>
          <p>Terms and conditoin</p>
          <p>Cookie policy</p>
        </div>
      </div>
    </div>
  );
}
