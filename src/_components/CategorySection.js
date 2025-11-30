"use client";

import AddCard from "./AddNewFood";
import MiniFoodCard from "./MiniFoodCard";


export default function DishGrid() {
  return (
 <div className="h-[582px]  bg-white   w-[1171px] p-6 rounded-md ml-[24px]">
    <p className="pb-[16px]">Appetizers</p>
   <div className="grid grid-cols-4 gap-3 ">
               <AddCard />
               <MiniFoodCard />
               <MiniFoodCard />
               <MiniFoodCard />
               <MiniFoodCard />
               <MiniFoodCard />
             </div>
</div>
  );
}


