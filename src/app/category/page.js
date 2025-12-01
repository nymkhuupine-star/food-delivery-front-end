"use client";

import SideBar from "@/_components/SideBar";
import CategorySection from "@/_components/CategorySection";
import DishesCategory from "@/_components/DishesCategory";
import axios from "axios";
import { useFormik } from "formik";

export default function Category() {
  const createCategory = async (categoryName) => {
    try {
      const response = await axios.post("http://localhost:1000/category", {
        categoryName: categoryName,
      });
      router.push("/home");
      setMessage(response.data.message || "amjilttai bolloo");
      alert("amjilttai bolloo");
    } catch (error) {
      setMessage(error.response?.data?.message || "amjiltgui bolloo");
      alert("amjiltgui");
    }
  };
  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },

    onSubmit: async (values) => {
      const { categoryName } = values;
      await createCategory(categoryName);
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="w-full flex justify-center bg-zinc-200 ">
      <div className="flex flex-row max-w-[1440px] bg-zinc-200 w-full">
        <SideBar />
        <div className="flex flex-col gap-[24px]">
          <DishesCategory formik={formik} />
          <CategorySection />
          <CategorySection />
          <CategorySection />
        </div>
      </div>
    </div>
  );
}
