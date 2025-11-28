"use client";
import { useState } from "react";
// import { AvatarIcon } from "@/_icons/AvatarIcon";
// import { FoodMenuIcon } from "@/_icons/FoodMenuIcon";
// import { LogoIcon } from "@/_icons/logoIcon";
import { SettingsIcon } from "@/_icons/SettingsIcon";
import { TruckIcon } from "@/_icons/TruckIcon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import PlusIcon from "@/_icons/Plusicon";

export default function AdminPage() {
  const [categories, setCategories] = useState([
    "All dishes",
    "Appetizers",
    "Salads",
    "Pizzas",
    "Lunch favorites",
    "Main dishes",
    "Fish & Sea foods",
    "Brunch",
    "Side dish",
    "Desserts",
    "Beverages",
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
      setIsDialogOpen(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddCategory();
    }
  };

  return (
    <div className="w-full flex justify-center bg-[#F4F4F5]">
      <div className="max-w-[1440px] flex gap-[24px]">
        <div className="w-[205px] h-[1150px] p-[36px_20px] items-center bg-white">
          <div className="flex gap-[8px]">
            <div></div>
            <div>
              <div className="text-[18px] font-semibold">NomNom</div>
              <div className="text-[#71717A]">Swift delivery</div>
            </div>
          </div>

          <div className="mt-[40px] gap-[26px]">
            <Button className="bg-black w-[165px] h-[40px] rounded-full text-white items-center justify-center">
              <p>Food menu</p>
            </Button>
            <Button className="bg-white w-[165px] h-[40px] text-black rounded-full items-center justify-center gap-[10px]">
              <p>Orders</p>
            </Button>
            <Button className="bg-white w-[165px] h-[40px] text-black rounded-full items-center justify-center gap-[10px]">
              <p>Settings</p>
            </Button>
          </div>
        </div>

        <div className="w-[1300px] h-[1150px] items-center pt-[24px]">
          <div className="flex flex-row justify-end"></div>
          <div className="w-[1171px] h-[176px] p-[24px] bg-white rounded-[12px] mt-[24px]">
            <p className="text-[20px] font-semibold">Dishes category</p>

            <div className="flex flex-wrap gap-2 mt-4 ">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  className="bg-white h-[36px] p-[8px_16px] text-black border border-[E4E4E7] rounded-full"
                >
                  {category}
                  <Badge>1</Badge>
                </Button>
              ))}
              <Button onClick={() => setIsDialogOpen(true)}>
                <PlusIcon />
              </Button>
            </div>

            {isDialogOpen && (
              <div className="fixed bg-white bg-opacity-50 flex items-center justify-center z-50">
                <div className="w-[412px] h-[224px] bg-white rounded-lg p-6 w-96 shadow-xl">
                  <h3 className="text-xl font-bold mb-4">Add New Category</h3>

                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter category name..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    autoFocus
                  />

                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => {
                        setIsDialogOpen(false);
                        setNewCategory("");
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddCategory}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-[1171px] h-[582px] p-[20px] bg-white items-center justify-center mt-[24px] rounded-[12px]">
            <p className="text-[20px] font-semibold">Appetizers</p>

            <div className="w-[239px] h-[209px] border-dashed rounded-[20px] border-red-500">
              ihbjh
              <PlusIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
