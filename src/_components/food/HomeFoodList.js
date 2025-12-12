// "use client";

// import { useApp } from "@/_provider/CategoryFoodProvider";
// import { CategoryFoods } from "./CategoryFoods";
// import FoodCard from "./FoodCard";

// export const HomeFoodList = () => {
//   const { categories } = useApp();

//   return (
//     <div className={"flex flex-row"}>
//       {categories.map((cat) => (
//         <div key={cat._id}>
//           <div className=" flex justify-center items-center w-[100%]  bg-neutral-700">
//             <div className=" ] bg-neutral-700  ">
//               <h2 className="text-xl font-bold text-white mb-4 bg-neutral-700 ">
//                 {cat.categoryName}
//               </h2>
//               <FoodCard categoryId={cat._id} />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

"use client";

import { useApp } from "@/_provider/CategoryFoodProvider";
import FoodCard from "./FoodCard";

export const HomeFoodList = () => {
  const { categories } = useApp();

  return (
    <div className="flex flex-col gap-8  bg-neutral-700 ">
      {categories.map((cat) => (
        <div key={cat._id} className="w-full   bg-neutral-700">
         
          <h2 className="text-xl font-bold text-white mb-4 w-[1264px] bg-neutral-700 p-4 rounded">
            {cat.categoryName}
          </h2>

         
          <FoodCard categoryId={cat._id} />
        </div>
      ))}
    </div>
  );
};
