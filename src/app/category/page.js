"use client";

import SideBar from "@/_components/SideBar";
import DishesCategory from "@/_components/category/DishesCategory";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useApp } from "@/_provider/CategoryFoodProvider";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/orderStorage";

export default function Category() {
  const { categories, createCategory, fetchCategories } = useApp();
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin()) {
      router.replace("/");
      return;
    }
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
    <div className="min-h-screen bg-[#F4F4F5]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1280px]">
        <SideBar />
        <div className="flex min-w-0 flex-1">
          <DishesCategory
            formik={formik}
            categories={categories}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      </div>
    </div>
  );
}
