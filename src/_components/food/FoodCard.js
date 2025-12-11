"use client";

import CancelIcon from "@/_icons/CancelIcon";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useApp } from "@/_provider/CategoryFoodProvider";
import axios from "axios";

export const FoodCard = ({ categoryId }) => {
  const [foods, setFoods] = useState([]);
  const { refresh, deleteFood, triggerRefresh } = useApp();

  const getCategoryFoods = async () => {
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
    getCategoryFoods();
  }, [categoryId, refresh]);
  return (
    <>
      {foods.map((food, index) => (
        <div key={index}>
          <div className="bg-gray-50  w-[397.33px] h-[342px] rounded-xl flex flex-col">
            <button
              onClick={async () => {
                await deleteFood(food._id);
                triggerRefresh();
              }}
              className="absolute top-[-5px] right-[-5px] w-5 h-5 flex items-center justify-center bg-white rounded-full border border-gray-300"
            >
              <CancelIcon className="w-3 h-3" />
            </button>

            <div className="flex justify-center pt-[16px]">
              <Image src={food.image} fill className="object-cover" />
            </div>
            <div className="pt-[20px] pl-[15px] pr-[16px]">
              <div className=" flex flex-row">
                <p> {food.foodName} </p>
                <p>${food.price}</p>
              </div>

              <p className="text-sm text-gray-600 mt-1">{food.ingredients}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};




