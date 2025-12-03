"use client";

import CancelIcon from "@/_icons/CancelIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { PlusIcon } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";

export default function AddFoodCard({ category }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDish, setNewDish] = useState([]);

  const formik = useFormik({
    initialValues: {
      dishName: "",
      price: "",
      ingredients: "",
    },
    onSubmit: (values) => handleAddDish(values),
  });
  const { values, handleChange, handleBlur, handleSubmit, resetForm } = formik;

  const handleAddDish = async () => {
    handleSubmit(values);
    const dishName = values.dishName.trim();
    const price = values.price;
    const categoryId = category.id;

    if (dishName == "") {
      toast.error("Category name cannot be empty!");
      return;
    }
    if (!price || price <= 0) {
      toast.error("Price must be a valid number!");
      return;
    }
    const newDish = {
      dishName,
      price,
      categoryId,
    };
  };
  return (
    <div
      className="bg-white w-[270.75px] h-[241px] rounded-[20px] border flex flex-col  "
      style={{
        borderStyle: "dashed",
        borderColor: "#EF4444",
      }}
      // onClick={() => onOpen(category)}
    >
      <div className="flex  flex-col pl-[110px] pt-[70px]">
        <Button
          className="bg-red-500 h-[50px] w-[50px] rounded-4xl"
          onClick={() => setIsDialogOpen(true)}
        >
          <PlusIcon />
        </Button>
      </div>
      <p className="flex justify-center pt-[10px] items-center">
        Add new Dish to {category.categoryName}
      </p>
      {isDialogOpen && (
        <div className="fixed bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-[460px] h-[592px] bg-lime-200 rounded-lg p-5 w-96 shadow-xl">
            <div className="flex flex-row gap-[140px]">
              <h3 className="text-lg font-bold ">Add new Dish to Appetizers</h3>
              <button
                onClick={() => {
                  setIsDialogOpen(false);
                  setNewDish("");
                }}
                className="px-3 py-3 bg-gray-200 text-gray-700 rounded-full "
              >
                <CancelIcon />
              </button>
            </div>

            <div className="flex flex-row pt-[44px] gap-[24px]">
              <div>
                <p className="text-sm">Food name</p>
                <Input
                  type="text"
                  name="dishName"
                  value={values.dishName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Type food name"
                  className="w-[194px] h-[38px] px-4 py-2 border border-neutral-400 rounded-lg  mb-4"
                  autoFocus
                />
              </div>
              <div>
                <p className="text-sm">Food price</p>
                <Input
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter price..."
                  className=" w-[194px h-[38px] px-4 py-2 border border-neutral-400 rounded-lg  mb-4"
                  autoFocus
                />
              </div>
            </div>

            <p className="text-sm">Ingredients</p>
            <Input
              type="text"
              name="ingredients"
              value={values.ingredients}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="List ingredients..."
              className=" w-[412px] h-[90px]  mb-4"
              autoFocus
            />
            {/* <input
              type="file"
              width={412}
              height={160}
              accept="./Hero.png"
              onChange={(e) => {
                const file = e.target.files[0];
                console.log("Selected file:", file);
              }}
            /> */}
            <p className="text-sm">Food image</p>
            <img src="./Hero.png" width={412} height={160} className="" />

            <div className="flex gap-2 justify-end">
              <button
                onClick={handleAddDish}
                className="px-4 py-2 bg-black text-white rounded-lg mt-[58px] "
              >
                Add Dish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
