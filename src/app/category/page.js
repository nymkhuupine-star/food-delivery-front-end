
"use client";

import SideBar from "@/_components/SideBar";
import DishesCategory from "@/_components/category/DishesCategory";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "sonner";
import { SnowCanvas } from "@/_components/SnowCanvas";
import { useEffect, useState } from "react";

export default function Category() {
  const [categories, setCategories] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getCategory = async () => {
    try {
      const result = await axios.get("http://localhost:1000/category");
      setCategories(result.data);
    } catch (err) {
      toast.error("Failed to load category");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const createCategory = async (categoryName) => {
    const token = localStorage.getItem("token");

    await axios.post(
      `http://localhost:1000/category`,
      { categoryName },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const formik = useFormik({
    initialValues: { categoryName: "" },
    onSubmit: async (values, { resetForm }) => {
      try {
        await createCategory(values.categoryName);
        await getCategory(); 
        toast.success("New Category added!");
        resetForm();
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
              getCategory={getCategory}
              isDialogOpen={isDialogOpen}
    setIsDialogOpen={setIsDialogOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
}
