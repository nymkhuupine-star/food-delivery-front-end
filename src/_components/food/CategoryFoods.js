"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useApp } from "@/_provider/CategoryFoodProvider";
import { Button } from "@/components/ui/button";
import EditIcon from "@/_icons/EditIcon";
import FoodEditDialog from "../dialog/FoodEditDialog";
import { apiUrl } from "@/lib/api";
import { toast } from "sonner";

export const CategoryFoods = ({ categoryId, categories }) => {
  const [foods, setFoods] = useState([]);
  const { refresh, deleteFood, updateFood } = useApp();
  const [selectedFood, setSelectedFood] = useState(null);
  const [open, setOpen] = useState(false);

  const getCategoryFoods = async () => {
    try {
      const response = await axios.get(apiUrl(`/food/category/${categoryId}`));
      setFoods(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategoryFoods();
  }, [categoryId, refresh]);

  const handleOpenEdit = (food) => {
    setSelectedFood({ ...food });
    setOpen(true);
  };

  const handleCloseEdit = (nextOpen) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setSelectedFood(null);
    }
  };

  const handleSaveFood = async () => {
    if (!selectedFood?._id) return;

    const payload = {
      foodName: selectedFood.foodName?.trim(),
      price: Number(selectedFood.price),
      ingredients: selectedFood.ingredients?.trim() || "",
      image: selectedFood.image || "",
      category: selectedFood.category,
    };

    if (!payload.foodName) {
      toast.error("Dish name is required");
      return;
    }

    if (!payload.price || Number.isNaN(payload.price) || payload.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    try {
      await updateFood(selectedFood._id, payload);
      toast.success("Dish updated successfully");
      handleCloseEdit(false);
    } catch (error) {
      toast.error("Failed to update dish");
    }
  };

  const handleDeleteFood = async (foodId) => {
    try {
      await deleteFood(foodId);
      toast.success("Dish deleted successfully");
      if (selectedFood?._id === foodId) {
        handleCloseEdit(false);
      }
    } catch (error) {
      toast.error("Failed to delete dish");
    }
  };

  return (
    <>
      {foods.map((food) => (
        <div key={food._id}>
          <div className="relative flex h-[241px] w-full flex-col rounded-[20px] border border-neutral-200 bg-white p-3 shadow-sm">
            <div className="relative flex h-[129px] w-full justify-center overflow-hidden rounded-[16px]">
              <Image
                src={food.image}
                alt={food.foodName || "Food image"}
                fill
                className="object-cover"
              />
              <Button
                onClick={() => {
                  handleOpenEdit(food);
                }}
                className="absolute bottom-2 right-2 bg-white rounded-full w-9 h-9 p-0 flex items-center justify-center shadow-[0_8px_24px_rgba(15,23,42,0.18)] hover:bg-white"
              >
                <EditIcon className="w-4 h-4" />
              </Button>
            </div>

            <div className="px-1 pt-3">
              <div className="flex flex-row justify-between gap-3">
                <p className="text-sm font-medium text-[#EF4444]">
                  {food.foodName}
                </p>
                <p className="shrink-0 text-xs font-medium text-[#09090B]">
                  ${Number(food.price).toFixed(2)}
                </p>
              </div>
              <p className="mt-1.5 h-[42px] overflow-hidden text-sm leading-5 text-[#52525B]">
                {food.ingredients}
              </p>
            </div>
          </div>
        </div>
      ))}

      {selectedFood && (
        <FoodEditDialog
          open={open}
          setOpen={handleCloseEdit}
          food={selectedFood}
          setFood={setSelectedFood}
          categories={categories}
          onSave={handleSaveFood}
          onDelete={() => handleDeleteFood(selectedFood._id)}
        />
      )}
    </>
  );
};
