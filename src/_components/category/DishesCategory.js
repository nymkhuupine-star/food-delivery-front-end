
"use client";

import CancelIcon from "@/_icons/CancelIcon";
import ProfileAvatarButton from "@/_components/ProfileAvatarButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import FoodList from "../food/FoodList";
import { useApp } from "@/_provider/CategoryFoodProvider";

export default function DishesCategory({
  formik,
  isDialogOpen,
  setIsDialogOpen,
}) {
  const { categories, createCategory, deleteCategory, foods } = useApp();
  const { values, handleChange, handleBlur } = formik;
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!values.categoryName.trim()) {
      return toast.error("Category name cannot be empty!");
    }

    try {
      await createCategory({ categoryName: values.categoryName });
      toast.success("Category created!");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      toast.success("Deleted successfully");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const visibleCategories =
    selectedCategoryId === "all"
      ? categories
      : categories.filter((category) => category._id === selectedCategoryId);
  const getCategoryButtonClassName = (isActive) =>
    `flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition ${
      isActive
        ? "border-[#F87171] bg-white text-[#18181B]"
        : "border-[#E4E4E7] bg-white text-[#3F3F46]"
    }`;
  const getCountClassName = (isActive) =>
    `rounded-full px-2 py-0.5 text-xs ${
      isActive ? "bg-[#18181B] text-white" : "bg-[#18181B] text-white"
    }`;

  return (
    <div className="flex min-w-0 flex-1 flex-col px-5 py-8">
      <div className="mb-5 flex justify-end">
        <ProfileAvatarButton />
      </div>

      <div className="rounded-[24px] border border-[#E4E4E7] bg-white px-5 py-4 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
        <p className="text-[24px] font-semibold leading-none tracking-[-0.03em] text-[#18181B]">
          Dishes category
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setSelectedCategoryId("all")}
            className={getCategoryButtonClassName(selectedCategoryId === "all")}
          >
            <span>All Dishes</span>
            <span className={getCountClassName(selectedCategoryId === "all")}>
              {foods.length}
            </span>
          </button>

          {categories.map((category) => {
            const count = foods.filter(
              (food) => food.category === category._id
            ).length;

            return (
              <div key={category._id} className="group relative">
                <button
                  type="button"
                  onClick={() => setSelectedCategoryId(category._id)}
                  className={getCategoryButtonClassName(
                    selectedCategoryId === category._id
                  )}
                >
                  <span>{category.categoryName}</span>
                  <span
                    className={getCountClassName(
                      selectedCategoryId === category._id
                    )}
                  >
                    {count}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(category._id)}
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#D4D4D8] bg-white opacity-0 transition group-hover:opacity-100"
                >
                  <CancelIcon className="scale-75" />
                </button>
              </div>
            );
          })}

          <Button
            className="h-9 w-9 rounded-full bg-[#EF4444] p-0 text-white hover:bg-[#DC2626]"
            onClick={() => setIsDialogOpen(true)}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>

        {isDialogOpen && (
          <form onSubmit={handleAddCategory}>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[2px]">
              <div className="w-[412px] rounded-[24px] bg-white p-5 shadow-[0_32px_64px_rgba(15,23,42,0.16)]">
                <div className="flex justify-between">
                  <h3 className="text-xl font-semibold text-[#18181B]">
                    Add New Category
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F4F5]"
                  >
                    <CancelIcon />
                  </button>
                </div>

                <h5 className="pb-2 pt-8 text-sm text-[#3F3F46]">
                  Category name
                </h5>
                <Input
                  type="text"
                  name="categoryName"
                  value={values.categoryName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter category name..."
                  className="mb-4 h-10 w-full rounded-xl border-[#E4E4E7] px-4"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-xl bg-[#18181B] px-4 py-2 text-sm text-white"
                  >
                    Add category
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>

      <div className="mt-4">
        <FoodList categories={visibleCategories} />
      </div>
    </div>
  );
}
