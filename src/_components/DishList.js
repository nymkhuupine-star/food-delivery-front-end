"use client";

import CancelIcon from "@/_icons/CancelIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"

export default function DishList() {
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
           toast.success("New Category is being added to the menu",{
            className: "bg-black text-white"
           });
        } else{
             toast.error("Category name cannot be empty!");
        }
      };
    
      const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          handleAddCategory();
        }
      };
    
  return (
      <div className="pt-[84px] flex flex-col pl-[24px]  ">
            <div className="h-[176px]  bg-white  w-[1171px] rounded-md p-6">
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
                <Button  className="bg-red-500 w-[36px] h-[36px] rounded-3xl flex justify-center items-center "  onClick={() => setIsDialogOpen(true)}>
                  <PlusIcon />
                </Button>
              </div>

              {isDialogOpen && (
                <div className="fixed bg-white bg-opacity-50 flex items-center justify-center z-50">
                  <div className="w-[412px] h-[224px] bg-white rounded-lg p-5 w-96 shadow-xl">
                   <div className="flex flex-row gap-[160px]">
                    <h3 className="text-xl font-bold ">Add New Category</h3>
                    <button
                        onClick={() => {
                          setIsDialogOpen(false);
                          setNewCategory("");
                        }}
                        className="px-3 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        <CancelIcon/>
                      </button>
                      </div>
                    <h5 className="text-sm pt-[30px] pb-[8px] ">Category name </h5>

                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter category name..."
                      className="w-full px-4 py-2 border border-neutral-400 rounded-lg  mb-4"
                      autoFocus
                    />

                    <div className="flex gap-2 justify-end">
                     
                      <button
                        onClick={handleAddCategory}
                        className="px-4 py-2 bg-black text-white rounded-lg "
                      >
                       Add category
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
  );
}