"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddNewCategory() {
  return (
    <div className="bg-white w-[460px] h-[272px] rounded-xl flex flex-col">
      <p>Category name</p>
      <Input type="name" placeholder="Type category name..." />

      <Button className="bg-black h-[40px] w-[123px] rounded-4xl">
        {" "}
        <p> Add category</p>
      </Button>
    </div>
  );
}
