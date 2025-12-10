import { SnowCanvas } from "../SnowCanvas";
import { FoodCard } from "@/_components/food/FoodCard";

export default function HomeFoodList({}) {
  return (
    <>
      <SnowCanvas />
      <div className="w-full flex justify-center bg-neutral-700">
        <div className="w-[1280px] flex flex-col justify-between gap-[36px]">
          <p className="pt-[54px] ">Appetizers</p>
          <div className="flex justify-between gap-[36px]  pb-[54px]">
            <FoodCard />
            <FoodCard />
            <FoodCard />
          </div>
        </div>
      </div>
    </>
  );
}
