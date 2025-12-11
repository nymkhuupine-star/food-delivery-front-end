// import axios from "axios";
// import Image from "next/image";

// import { useEffect, useState } from "react";
// import { useApp } from "@/_provider/CategoryFoodProvider";
// import CancelIcon from "@/_icons/CancelIcon";

// export const CategoryFoods = ({ categoryId}) => {
//   const [foods, setFoods] = useState([]);
//   const { refresh, deleteFood, triggerRefresh } = useApp();

//   const getCategoryFoods = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:1000/food/category/${categoryId}`
//       );

//       setFoods(response.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getCategoryFoods();
//   }, [categoryId, refresh]);

//   return (
//     <>
//       {foods.map((food, index) => (
//         <div key={index}>
//           <div className="bg-white border border-neutral-200  w-[270.75px] h-[241px] rounded-xl flex flex-col">
//             <button
//               onClick={async () => {
//                 await deleteFood(food._id);
//                 triggerRefresh();
//               }}
//               className="absolute top-[-5px] right-[-5px] w-5 h-5 flex items-center justify-center bg-white rounded-full border border-gray-300"
//             >
//               <CancelIcon className="w-3 h-3" />
//             </button>

//             <div className="flex justify-center mt-[16px] ml-[16px] w-60 h-[135px] relative">
//               <Image src={food.image} fill className="object-cover" />
//             </div>
//             <div className="pt-[20px] pl-[15px] pr-[16px]">
//               <div className=" flex flex-row justify-between ">
//                 <p className="text-red-500 text-sm "> {food.foodName} </p>
//                 <p className="text-xs">${food.price}</p>
//               </div>

//               <p className="text-sm text-gray-600 mt-1">{food.ingredients}</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };
"use client";

import Image from "next/image";
import CancelIcon from "@/_icons/CancelIcon";
import { useApp } from "@/_provider/CategoryFoodProvider";

export const CategoryFoods = ({ categoryId, wrapperClass }) => {
  const { fetchFoodByCategory, deleteFood, triggerRefresh } = useApp();
  const foods = fetchFoodByCategory(categoryId);

  return (
 <div className={`flex flex-row flex-wrap gap-4 ${wrapperClass}`}>

      {foods.map(food => (
        <div key={food._id} className="relative w-[270px] h-[241px] bg-white border border-neutral-200 rounded-xl flex flex-col">
          <button
            onClick={async () => { await deleteFood(food._id); triggerRefresh(); }}
            className="absolute top-[-5px] right-[-5px] w-5 h-5 flex items-center justify-center bg-white rounded-full border border-gray-300 z-10"
          >
            <CancelIcon className="w-3 h-3" />
          </button>

          <div className="relative w-full h-[135px] mt-4">
            <Image src={food.image} fill className="object-cover rounded" alt={food.foodName} />
          </div>

          <div className="px-4 pt-2 flex flex-col">
            <div className="flex justify-between">
              <p className="text-red-500 text-sm">{food.foodName}</p>
              <p className="text-xs">${food.price}</p>
            </div>
            <p className="text-gray-600 text-sm mt-1">{food.ingredients}</p>
          </div>
        </div>
      ))}
    </div>
  );
};



