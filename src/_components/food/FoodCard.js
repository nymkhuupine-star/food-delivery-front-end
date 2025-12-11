// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import CancelIcon from "@/_icons/CancelIcon";
// import { useApp } from "@/_provider/CategoryFoodProvider";

// export default function FoodCard({ categoryId }) {
//   const [foods, setFoods] = useState([]);
//   const { refresh, deleteFood, triggerRefresh } = useApp();

//   const getFoodCard = async () => {
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
//     getFoodCard();
//   }, [categoryId, refresh]);

//   return (
//     <>
//       {foods.map((food, index) => (
//         <div
//           key={index}
//           className="bg-white border border-neutral-200 w-[397.33px] h-[342px] rounded-xl flex flex-col relative"
//         >
//           <button
//             onClick={async () => {
//               await deleteFood(food._id);
//               triggerRefresh();
//             }}
//             className="absolute top-[-5px] right-[-5px] w-5 h-5 flex items-center justify-center bg-white rounded-full border border-gray-300"
//           >
//             <CancelIcon className="w-3 h-3" />
//           </button>

//           <div className="flex justify-center mt-[16px] ml-[16px] w-[365.33px] h-[210px] relative">
//             <Image
//               src={food.image}
//               fill
//               className="object-cover"
//               alt={food.foodName}
//             />
//           </div>

//           <div className="pt-[20px] pl-[15px] pr-[16px]">
//             <div className="flex flex-row justify-between">
//               <p className="text-red-500 text-sm">{food.foodName}</p>
//               <p className="text-xs">${food.price}</p>
//             </div>

//             <p className="text-sm text-gray-600 mt-1">{food.ingredients}</p>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CancelIcon from "@/_icons/CancelIcon";
import { useApp } from "@/_provider/CategoryFoodProvider";

export default function FoodCard({ categoryId }) {
  const [foods, setFoods] = useState([]);
  const { refresh, deleteFood, triggerRefresh } = useApp();

  const getFoodCard = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1000/food/category/${categoryId}`
      );
      setFoods(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFoodCard();
  }, [categoryId, refresh]);

  return (
    <div className="flex flex-wrap gap-4">
      {foods.map((food, index) => (
        <div
          key={index}
          className="w-[270px] h-[342px] bg-white border border-neutral-200 rounded-xl flex flex-col relative"
        >
          {/* Delete button */}
          <button
            onClick={async () => {
              await deleteFood(food._id);
              triggerRefresh();
            }}
            className="absolute top-[-5px] right-[-5px] w-5 h-5 flex items-center justify-center bg-white rounded-full border border-gray-300"
          >
            <CancelIcon className="w-3 h-3" />
          </button>

          {/* Image */}
          <div className="relative w-full h-[210px] mt-4 px-4">
            <Image
              src={food.image}
              fill
              className="object-cover rounded"
              alt={food.foodName}
            />
          </div>

          {/* Text */}
          <div className="px-4 pt-4">
            <div className="flex justify-between">
              <p className="text-red-500 text-sm">{food.foodName}</p>
              <p className="text-xs">${food.price}</p>
            </div>
            <p className="text-sm text-gray-600 mt-1">{food.ingredients}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
