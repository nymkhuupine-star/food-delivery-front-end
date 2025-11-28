"use client";

import { useState } from "react";
import AddCategoryDialog from "@/components/AddCategoryDialog";

export default function CategoryPage() {
  const [categories, setCategories] = useState([
    "Appetizers",
    "Side dish",
    "Brunch",
    "Desserts",
    "Beverages",
  ]);

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  return (
    <div className="p-10">
      {/* Add Category Button + Dialog */}
      <AddCategoryDialog onAdd={addCategory} />

      {/* Category List */}
      <div className="mt-6 p-4 bg-white rounded-xl shadow w-[400px]">
        <h2 className="text-xl font-semibold mb-3">Categories</h2>

        <ul className="list-disc ml-6">
          {categories.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
