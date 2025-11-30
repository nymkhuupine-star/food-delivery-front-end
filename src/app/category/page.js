"use client";



import SideBar from "@/_components/SideBar";
import CategorySection from "@/_components/CategorySection";
import DishesCategory from "@/_components/DishesCategory";


export default function Category() {
 

  return (
    <div className="w-full flex justify-center bg-zinc-200 ">
      <div className="flex flex-row max-w-[1440px] bg-zinc-200 w-full">
        <SideBar />
        <div className="flex flex-col gap-[24px]">
         <DishesCategory/>
          <CategorySection/>
           <CategorySection/>
            <CategorySection/>

        </div>
      </div>
    </div>
  );
}
