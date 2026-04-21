"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import DeleteIcon from "@/_icons/DeleteIcon";

const UPLOAD_PRESET = "food-delivery";
const CLOUD_NAME = "dxzpmljjs";

export default function FoodEditDialog({
  open,
  setOpen,
  food,
  setFood,
  categories = [],
  onSave,
  onDelete,
}) {
  const [isUploading, setIsUploading] = useState(false);

  if (!food) return null;

  const updateField = (key, value) => {
    setFood((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const imageUrl = await uploadToCloudinary(file);
      if (imageUrl) {
        updateField("image", imageUrl);
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[500px] max-w-[calc(100%-2rem)] border-none bg-transparent p-0 shadow-none sm:max-w-[500px]">
        <DialogTitle className="sr-only">{food.foodName}</DialogTitle>

        <div className="rounded-[24px] bg-white p-5 shadow-[0_32px_64px_rgba(15,23,42,0.18)]">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-[28px] font-semibold tracking-[-0.03em] text-[#09090B]">
                Dishes info
              </p>
            </div>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F4F5] text-[#71717A] transition hover:bg-[#E4E4E7]"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-[84px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-[#71717A]">
                Dish name
              </label>
              <Input
                type="text"
                value={food.foodName || ""}
                onChange={(e) => updateField("foodName", e.target.value)}
                className="h-10 rounded-xl border-[#E4E4E7] px-3 shadow-none"
              />
            </div>

            <div className="grid grid-cols-[84px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-[#71717A]">
                Dish category
              </label>
              <select
                value={food.category || ""}
                onChange={(e) => updateField("category", e.target.value)}
                className="h-10 w-full rounded-xl border border-[#E4E4E7] bg-white px-3 text-sm text-[#09090B] outline-none focus:border-[#F97316]"
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-[84px_1fr] items-start gap-4">
              <label className="pt-3 text-xs font-medium text-[#71717A]">
                Ingredients
              </label>
              <textarea
                value={food.ingredients || ""}
                onChange={(e) => updateField("ingredients", e.target.value)}
                className="min-h-[88px] w-full rounded-xl border border-[#E4E4E7] px-3 py-3 text-sm text-[#3F3F46] outline-none resize-none focus:border-[#F97316]"
              />
            </div>

            <div className="grid grid-cols-[84px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-[#71717A]">
                Price
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={food.price ?? ""}
                onChange={(e) => updateField("price", e.target.value)}
                className="h-10 rounded-xl border-[#E4E4E7] px-3 shadow-none"
              />
            </div>

            <div className="grid grid-cols-[84px_1fr] items-start gap-4">
              <label className="pt-2 text-xs font-medium text-[#71717A]">
                Image
              </label>

              <div>
                <label className="block cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <div className="relative h-[144px] overflow-hidden rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA]">
                    {food.image ? (
                      <Image
                        src={food.image}
                        alt={food.foodName || "Food image"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[#71717A]">
                        {isUploading ? "Uploading..." : "Click to upload image"}
                      </div>
                    )}

                    {food.image && (
                      <button
                        type="button"
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#71717A] shadow-md transition hover:bg-[#F4F4F5]"
                        onClick={(event) => {
                          event.preventDefault();
                          updateField("image", "");
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={onDelete}
              className="transition hover:opacity-80"
            >
              <DeleteIcon />
            </button>

            <button
              type="button"
              onClick={onSave}
              className="rounded-xl bg-[#18181B] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#27272A]"
            >
              Save changes
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
