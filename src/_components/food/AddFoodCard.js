"use client";

import CancelIcon from "@/_icons/CancelIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import Image from "next/image";
import AddImageIcon from "@/_icons/AddImageIcon";
import { useApp } from "@/_provider/CategoryFoodProvider";

const UPLOAD_PRESET = "food-delivery";
const CLOUD_NAME = "dxzpmljjs";

export default function AddFoodCard({ category }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const { createFood } = useApp();

  const [preview, setPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      dishName: "",
      price: "",
      ingredients: "",
      image: null,
    },
    onSubmit: async () => {
      await handleAddFood();
    },
  });
  const { values, handleChange, handleBlur } = formik;

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
      toast.success("Dish added!");
      // resetForm();
      setIsDialogOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add dish");
    }
  };

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
    <div>
      <div
        className="flex h-[241px] w-full flex-col items-center justify-center rounded-[20px] border bg-white px-6 text-center"
        style={{
          borderStyle: "dashed",
          borderColor: "#FCA5A5",
        }}
      >
        <Button
          className="mb-5 h-[48px] w-[48px] rounded-full bg-red-500 p-0 hover:bg-red-600"
          onClick={() => setIsDialogOpen(true)}
        >
          <PlusIcon className="h-5 w-5" />
        </Button>

        <p className="max-w-[142px] text-base font-medium leading-6 text-[#18181B]">
          Add new Dish to {category.categoryName}
        </p>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[2px] px-4 py-6">
          <div className="max-h-[calc(100vh-2rem)] w-full max-w-[460px] overflow-y-auto rounded-[24px] bg-white p-5 shadow-[0_32px_64px_rgba(15,23,42,0.16)]">
            <div className="flex flex-row justify-between">
              <h3 className="text-lg font-semibold">
                Add new Dish to {category.categoryName}
              </h3>

              <button
                onClick={() => setIsDialogOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F4F5] text-gray-700"
              >
                <CancelIcon />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-2">
              <div>
                <p className="text-sm">Food name</p>
                <Input
                  type="text"
                  name="dishName"
                  value={values.dishName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Type food name"
                  className="mb-4 h-10 w-full rounded-lg border border-neutral-300 px-4 py-2"
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
                  className="mb-4 h-10 w-full rounded-lg border border-neutral-300 px-4 py-2"
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
              className="mb-4 h-[90px] w-full rounded-lg border border-neutral-300 px-4 py-2"
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
                    w-full h-[138px]
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
                <div className="relative h-[138px] w-full">
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
