"use client";

import AddCard from "@/_components/AddCard";
import AddNewCategory from "@/_components/AddNewCategory";
import FoodCard from "@/_components/FoodCard";
import MiniFoodCard from "@/_components/MiniFoodCard";
import HeaderLogoIcon from "@/_icons/HeaderLogoIcon";
import HeaderLogoTwoIcon from "@/_icons/HeaderLogoTwoIcon";
import PlusIcon from "@/_icons/Plusicon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MenuIcon, SettingsIcon, TruckIcon } from "lucide-react";
import { useState } from "react";
import SideBar from "@/_components/SideBar";
export default function Category() {
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
    <div className="w-full flex justify-center bg-zinc-200 ">
      <div className="flex flex-row max-w-[1440px] bg-zinc-200 w-full">
        <SideBar />
        <div className="flex flex-col gap-[24px]">
          <div className="pt-[84px] flex flex-col pl-[24px] gap-[24px]  ">
            <div className="h-[176px]  bg-white  w-full rounded-md p-6">
              <p className="text-xl"> Dishes category</p>
              <div className="flex flex-wrap gap-2 mt-4 ">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    className="bg-white h-[36px] p-[8px_16px] text-black border border-[#E4E4E7] rounded-full"
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
          </div>
          <div className="h-[582px]  bg-white  w-full ml-[24px] p-6 rounded-md">
            <div className="grid grid-cols-4 gap-3 ">
              <AddCard />
              <MiniFoodCard />
              <MiniFoodCard />
              <MiniFoodCard />
              <MiniFoodCard />
              <MiniFoodCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
