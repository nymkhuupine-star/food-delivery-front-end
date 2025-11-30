"use client";

import AddCard from "./AddNewFood";


export default function AddNewCategory({ categories }) {
  return (
    <div className="h-[582px] bg-white w-[1171px] p-6 rounded-md ml-[24px]">
      {categories.map((cat, index) => (
        <div key={index} className="mb-6">
          <p className="pb-[16px]">{cat}</p>

          <div className="grid grid-cols-4 gap-3">
            <AddCard />
          </div>
        </div>
      ))}
    </div>
  );
}
