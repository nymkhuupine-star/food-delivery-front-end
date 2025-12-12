"use client";

import SideBar from "@/_components/SideBar";
import DishesCategory from "@/_components/category/DishesCategory";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "sonner";
import { SnowCanvas } from "@/_components/SnowCanvas";
import { useEffect, useState } from "react";
import { useApp } from "@/_provider/CategoryFoodProvider";

export default function Category() {
  const { categories, createCategory, fetchCategories } = useApp();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);
  const formik = useFormik({
    initialValues: { categoryName: "" },
    onSubmit: async (values, { resetForm }) => {
      try {
        await createCategory({ categoryName: values.categoryName });
        toast.success("New Category added!");
        resetForm();
        setIsDialogOpen(false);
      } catch (err) {
        toast.error("Failed to add category");
      }
    },
  });

  return (
    <>
      <SnowCanvas />
      <div className="w-full flex justify-center bg-zinc-200 ">
        <div className="flex flex-row max-w-[1440px] bg-zinc-200 w-full">
          <SideBar />
          <div className="flex flex-col gap-[24px]">
            <DishesCategory
              formik={formik}
              categories={categories}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
}
