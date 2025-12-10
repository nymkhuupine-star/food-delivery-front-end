"use client";

import CancelIcon from "@/_icons/CancelIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import Image from "next/image";
import AddImageIcon from "@/_icons/AddImageIcon";
import { useApp } from "@/_provider/CategoryFoodProvider";

import MiniFoodCard from "./MiniFoodCard";

const UPLOAD_PRESET = "food-delivery";
const CLOUD_NAME = "dxzpmljjs";

export default function AddFoodCard({ category }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDish, setNewDish] = useState([]);
  const [logoUrl, setLogoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const { Foods, createFood, deleteFood, fetchFood, triggerRefresh } = useApp();

  const [preview, setPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      dishName: "",
      price: "",
      ingredients: "",
      image: null,
    },
    onSubmit: async (values, { resetForm }) => {
      await handleAddFood(values, resetForm);
    },
  });
  const { values, handleChange, handleBlur, handleSubmit, resetForm } = formik;

  const handleAddFood = async () => {
    const dishName = values.dishName.trim();
    const price = values.price;

    if (!dishName) return toast.error("Food name cannot be empty!");
    if (!price || price <= 0) return toast.error("Price must be valid!");

    try {
      await createFood({
        dishName,
        price,
        description: values.ingredients,
        image: preview,
        category: category._id,
      });
      triggerRefresh();
      toast.success("Dish added!");
      // resetForm();
      setIsDialogOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add dish");
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      setLogoUrl(url);
      setPreview(url);
    } catch (err) {
      console.log("Failed to upload: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="">
      <div className="flex flex-row  gap-[13px]">
        <div
          className="bg-white w-[270.75px] h-[241px] rounded-[20px] border flex flex-col"
          style={{
            borderStyle: "dashed",
            borderColor: "#EF4444",
          }}
        >
          <div className="flex flex-col pl-[110px] pt-[70px] pr-[110px]">
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
        </div>
        <div className="flex flex-row  gap-[13px] ">
          {newDish.map((dish, index) => (
            <MiniFoodCard
              key={index}
              image={dish.image}
              name={dish.dishName}
              price={dish.price}
              description={dish.description}
            />
          ))}
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50">
          <div className="w-[460px] h-[592px] bg-white rounded-lg p-5 shadow-xl">
            <div className="flex flex-row justify-between">
              <h3 className="text-lg font-bold">
                Add new Dish to {category.categoryName}
              </h3>

              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-3 py-3 bg-gray-200 text-gray-700 rounded-full"
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
                  className="w-[194px] h-[38px] px-4 py-2 border border-neutral-400 rounded-lg mb-4"
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
                  className="w-[194px] h-[38px] px-4 py-2 border border-neutral-400 rounded-lg mb-4"
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
              className="w-[412px] h-[90px] mb-4"
            />

            <p className="text-sm mb-1">Food image</p>

            <div className="bg-white rounded-lg shadow">
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={uploading}
                className="hidden"
              />

              {!logoUrl && (
                <label
                  htmlFor="fileInput"
                  className="
                    w-[420px] h-[138px]
                    flex flex-col gap-2 justify-center items-center
                    rounded-md border border-dashed
                    border-[rgba(37,99,235,0.20)]
                    bg-[rgba(37,99,235,0.05)]
                    cursor-pointer  overflow-hidden
                  "
                >
                  <div className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center">
                    <AddImageIcon />
                  </div>

                  <p className="text-xs text-gray-500">Click to upload image</p>
                </label>
              )}

              {logoUrl && (
                <div className="relative w-[420px] h-[138px]">
                  <Image
                    src={logoUrl}
                    alt="Uploaded image"
                    fill
                    className="object-cover rounded "
                  />

                  <button
                    onClick={() => setLogoUrl(null)}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                  >
                    <CancelIcon className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={handleAddFood}
                className="px-4 py-2 bg-black text-white rounded-lg mt-[40px]"
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
