// import { SnowCanvas } from "../SnowCanvas";
// import { FoodCard } from "@/_components/food/FoodCard";

// export default function HomeFoodList({}) {
//   return (
//     <>
//       <SnowCanvas />
//       <div className="w-full flex justify-center bg-neutral-700">
//         <div className="w-[1280px] flex flex-col justify-between gap-[36px]">
//           <p className="pt-[54px] ">Appetizers</p>
//           <div className="flex justify-between gap-[36px]  pb-[54px]">
//             <FoodCard categoryId={someCategoryId}  />
//             <FoodCard categoryId={someCategoryId} />
//             <FoodCard categoryId={someCategoryId} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



"use client";

import { useApp } from "@/_provider/CategoryFoodProvider";
import { CategoryFoods } from "./CategoryFoods";

export const HomeFoodList = () => {
  const { categories } = useApp();

  return (
    <div className="space-y-8">
      {categories.map(cat => (
        <div key={cat._id}>
          <h2 className="text-xl font-bold mb-4">{cat.categoryName}</h2>
          <CategoryFoods categoryId={cat._id} wrapperClass=""/>
        </div>
      ))}
    </div>
  );
};
